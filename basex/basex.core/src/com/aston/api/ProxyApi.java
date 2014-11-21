package com.aston.api;

import java.io.InputStream;
import java.io.OutputStream;
import java.io.StringWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Properties;

import com.aston.basex.AppConfig;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.IApiFunction;
import com.aston.utils.StreamHelper;

public class ProxyApi implements IApiFunction {

	String url = null;
	List<String[]> headers = new ArrayList<String[]>();

	@Override
	public void init(AppConfig config, String name) {
		String prefHeader = name + ".header.";
		this.url = config.getProperty(name + ".url");

		for (Enumeration<Object> e = config.getProperties().keys(); e.hasMoreElements();) {
			String n = (String) e.nextElement();
			if (n.startsWith(prefHeader))
				headers.add(new String[] { n.substring(prefHeader.length()), config.getProperty(n) });
		}
	}

	@Override
	public void call(ApiData apiData) throws Exception {

		try {

			URL ourl = new URL(url);
			HttpURLConnection conn = (HttpURLConnection) ourl.openConnection();
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-type", "text/json");
			for (String[] h : headers)
				conn.addRequestProperty(h[0], h[1]);
			conn.setDoInput(true);
			conn.setDoOutput(true);
			OutputStream os = conn.getOutputStream();
			if (apiData.getRaw() != null)
				os.write(apiData.getRaw().getBytes("utf-8"));
			os.close();
			conn.connect();
			if (conn.getResponseCode() == 200) {
				InputStream is = conn.getInputStream();
				String res = StreamHelper.stream2String(is, "utf-8");
				conn.disconnect();
				apiData.getWriter(conn.getContentType()).write(res);
			} else {
				InputStream eis = conn.getErrorStream();
				if (eis == null)
					conn.getInputStream();
				String err = StreamHelper.stream2String(eis, "utf-8");
				conn.disconnect();
				throw new Exception(err);
			}

		} catch (Exception e) {
			throw new Exception("call prxoy error " + url + " " + e.getMessage(), e);
		}
	}

	public static void main(String[] args) {
		try {

			AppConfig c = new AppConfig();
			c.setProperties(new Properties());
			c.getProperties().setProperty("api.test.url", "https://app.test5.aston.sk/kcpuz-service/api/codelist");
			c.getProperties().setProperty("api.test.header.Authorization", "Basic YXBwOkVjbG9pYmJvcg==");
			ProxyApi a = new ProxyApi();
			a.init(c, "test");
			StringWriter sw = new StringWriter();
			a.call(new ApiData(null, "{'name': 'Stat_krajina'}", sw));
			System.out.println(sw.toString());

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
