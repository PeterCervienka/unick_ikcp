package com.aston.basex;

import java.io.File;
import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class BasexFilter implements Filter {

	public static final String DEBUG_TAG = "_debug";

	private boolean globalDebug = true;

	private ServletContext servletContext = null;

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		this.servletContext = filterConfig.getServletContext();
	}

	@Override
	public void doFilter(ServletRequest _request, ServletResponse _response, FilterChain chain) throws IOException, ServletException {

		HttpServletRequest request = (HttpServletRequest) _request;
		HttpServletResponse response = (HttpServletResponse) _response;
		String uri = BasexServiceServlet.uri(request);

		boolean debug = false;

		if (globalDebug) {

			if ((uri.equals("/") || uri.equals("/index.html"))) {
				debug = "1".equals(request.getParameter("debug"));
				request.getSession().setAttribute(DEBUG_TAG, debug);
			}
			debug = debug(request);
		}

		if (debug) {

			response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
			response.setDateHeader("Expires", 0);

			if ((uri.equals("/") || uri.equals("/index.html"))) {

				HtmlDebug hd = new HtmlDebug(new File(servletContext.getRealPath("index.html")));
				hd.addScript("service.*");
				response.setCharacterEncoding("UTF-8");
				response.setContentType("text/html");
				response.getWriter().write(hd.toString());
				return;
			}
		}

		if (uri.equals("/server.")) {
			response.sendError(403);
			return;
		}

		if (!debug) {
			if (uri.equals("/service.")) {
				response.sendError(403);
				return;
			}
		}

		if (uri.equals("/basex.js")) {
			String basexjs = debug ? "/WEB-INF/basex.debug.js" : "/WEB-INF/basex.prod.js";
			servletContext.getRequestDispatcher(basexjs).forward(_request, _response);
			return;
		}

		chain.doFilter(_request, _response);
	}

	@Override
	public void destroy() {
	}

	public static boolean debug(HttpServletRequest request) {
		return Boolean.TRUE.equals(request.getSession().getAttribute(DEBUG_TAG));
	}

}
