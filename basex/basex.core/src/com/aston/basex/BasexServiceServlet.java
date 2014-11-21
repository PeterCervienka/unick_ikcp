package com.aston.basex;

import java.io.File;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.aston.basex.api.ApiData;
import com.aston.basex.api.IApiFunction;
import com.aston.basex.js.IJsServiceExec;
import com.aston.basex.js.JsApiFunction;
import com.aston.basex.js.LoadFunction;
import com.aston.basex.js.SimpleJsServiceExec;
import com.aston.utils.StreamHelper;
import com.aston.utils.StringHelper;

public class BasexServiceServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	public static final String SERVICE_PREF = "/service/";
	public static final String API_PREF = "/api/";
	public static final String PROXY_PREF = "/proxy/";
	public static final String DOCUMENT_PREF = "/document/";

	protected AppConfig appConfig = null;
	protected IJsServiceExec serviceExec = null;

	@Override
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		try {
			this.appConfig = BasexListener.appConfig(getServletContext());

			File rootDir = new File(getServletContext().getRealPath(""));

			this.serviceExec = new SimpleJsServiceExec();
			this.serviceExec.setFile(new File(rootDir, "server.js"));
			this.serviceExec.addRootProperty("__api", new JsApiFunction(appConfig.getApis()));
			this.serviceExec.addRootProperty("__load", new LoadFunction(rootDir));

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		String uri = uri(req);
		String method = req.getMethod().toLowerCase();
		if ("post".equals(method) && uri.startsWith(SERVICE_PREF))
			runService(req, resp, uri.substring(SERVICE_PREF.length()));
		else if ("post".equals(method) && uri.startsWith(API_PREF))
			runApi(req, resp, uri.substring(API_PREF.length()));
		else if ("get".equals(method) && uri.startsWith(DOCUMENT_PREF))
			runDocument(req, resp, uri.substring(DOCUMENT_PREF.length()));
		else if (uri.startsWith(PROXY_PREF))
			runProxy(req, resp, uri.substring(PROXY_PREF.length()));
		else {
			super.service(req, resp);
		}

	}

	public static ThreadLocal<HttpSession> sessionThreadLocal = new ThreadLocal<HttpSession>();

	protected void runService(HttpServletRequest req, HttpServletResponse resp, String name) throws ServletException, IOException {
		try {

			String json = requestData(req);
			System.out.println("run service " + name + " " + json);
			sessionThreadLocal.set(req.getSession());

			String res = serviceExec.exec(name, json);

			resp.setCharacterEncoding("UTF-8");
			resp.setContentType("text/json");
			resp.getWriter().write(res != null ? res.toString() : "{}");

		} catch (Exception e) {
			throw new ServletException("run service " + name + ": " + e.getMessage(), e);
		}
	}

	protected void runDocument(HttpServletRequest req, HttpServletResponse resp, String name) throws ServletException, IOException {

		byte[] content = appConfig.getDocStorage().loadDoc(req.getSession(), name);
		if (content != null) {
			resp.setContentType(getServletContext().getMimeType(name));
			resp.getOutputStream().write(content);
		} else {
			getServletContext().getNamedDispatcher("base").forward(req, resp);
		}

	}

	protected void runApi(HttpServletRequest req, HttpServletResponse resp, String name) throws ServletException, IOException {

		String spublic = appConfig.getProperty(name + ".public");
		if (!BasexFilter.debug(req) && !("1".equals(spublic) || "true".equalsIgnoreCase(spublic))) {
			resp.sendError(403);
			return;
		}

		IApiFunction f = appConfig.getApis().get(name);
		if (f == null)
			throw new ServletException("undefined debug api '" + name + "'");

		try {
			String data = requestData(req);
			resp.setCharacterEncoding("UTF-8");
			f.call(new ApiData(req, resp, data));
		} catch (Exception e) {
			throw new ServletException("run api " + name + ": " + e.getMessage(), e);
		}
	}

	protected void runProxy(HttpServletRequest req, HttpServletResponse resp, String name) throws ServletException, IOException {
		int p = name.indexOf('/');
		String name2 = p > 0 ? name.substring(0, p) : name;
		String host = req.getHeader("Host");
		String url = appConfig.getProperty("proxy." + name2 + "." + host);
		if (url == null)
			url = appConfig.getProperty("proxy." + name2);
		if (url == null) {
			resp.setStatus(403);
			resp.getWriter().write("undefined proxy" + req.getRequestURI());
			return;
		}
		// url
		if (p > 0)
			url = url + name.substring(p);
		String query = req.getQueryString();
		if (query != null)
			url = url + "?" + query;
		System.out.println("url=" + url);
		URL ourl = new URL(url);
		HttpURLConnection conn = (HttpURLConnection) ourl.openConnection();
		conn.setConnectTimeout(1000);
		conn.setReadTimeout(3000);
		conn.setRequestMethod(req.getMethod());
		// headers
		String oauth = appConfig.getProperty("proxy." + name2 + ".oauth");
		if ("1".equals(oauth) || "true".equalsIgnoreCase(oauth)) {
			String accessToken = (String) req.getSession().getAttribute("oauth.access_token");
			if (accessToken == null) {
				resp.setStatus(403);
				resp.getWriter().write("only for oauth users");
				return;
			}
			conn.setRequestProperty("Authorization", "Bearer " + accessToken);
			System.out.println("Authorization: Bearer " + accessToken);
		}
		String scopyHeaders = appConfig.getProperty("proxy." + name2 + ".headers");
		if (scopyHeaders != null) {
			for (String hname : StringHelper.tokenizeTrimString(scopyHeaders, ",")) {
				String v = req.getHeader(hname);
				if (v != null)
					conn.setRequestProperty(hname, v);
				System.out.println(hname + ": " + v);
			}
		}
		String headerPref = "proxy." + name2 + ".header.";
		for (Object k : appConfig.getProperties().keySet()) {
			String kk = (String) k;
			if (kk.startsWith(headerPref))
				conn.setRequestProperty(kk.substring(headerPref.length()), appConfig.getProperty(kk));
		}
		// request body
		if (!"get".equalsIgnoreCase(req.getMethod())) {
			conn.setDoOutput(true);
			StreamHelper.copy(req.getInputStream(), conn.getOutputStream(), 512);
		}
		conn.connect();
		// status, content type, body
		resp.setStatus(conn.getResponseCode());
		System.out.println("status=" + conn.getResponseCode());
		String contentType = conn.getHeaderField("Content-Type");
		resp.setContentType(contentType);
		System.out.println("Content-Type=" + contentType);
		StreamHelper.copy(conn.getInputStream(), resp.getOutputStream(), 512);
	}

	protected String requestData(HttpServletRequest req) throws UnsupportedEncodingException, IOException {
		String data = null;
		if (req.getContentType() != null && req.getContentType().toLowerCase().startsWith("application/x-www-form-urlencoded")) {
			if (req.getCharacterEncoding() == null)
				req.setCharacterEncoding("utf-8");
			data = req.getParameter("$data");
		} else {
			data = StreamHelper.stream2String(req.getInputStream(), "UTF-8");
		}
		return data;
	}

	public static String uri(HttpServletRequest req) {
		String uri = req.getRequestURI();
		String cp = req.getContextPath();
		if (cp != null && cp.length() > 0)
			uri = uri.substring(cp.length());
		return uri;
	}
}
