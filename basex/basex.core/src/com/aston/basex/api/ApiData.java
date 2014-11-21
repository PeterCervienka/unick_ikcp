package com.aston.basex.api;

import java.io.IOException;
import java.io.Writer;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonWriter;

public class ApiData {

	public static final String MIME_JSON = "text/json";
	public static final String MIME_XML = "text/xml";
	public static final String MIME_TEXT = "text/plain";

	HttpServletRequest request = null;
	HttpServletResponse response = null;
	HttpSession session = null;
	Writer writer = null;
	String data = null;
	JsonObject root = null;

	public ApiData(HttpServletRequest request, HttpServletResponse response, String data) throws IOException {
		this.request = request;
		this.response = response;
		this.session = request.getSession();
		response.setCharacterEncoding("utf-8");
		this.writer = response.getWriter();
		this.data = data;
	}

	public ApiData(HttpSession session, String data, Writer writer) {
		this.session = session;
		this.data = data;
		this.writer = writer;
	}

	public JsonObject getRoot() {
		if (root == null && data != null) {
			JsonParser p = new JsonParser();
			JsonElement e = p.parse(data);
			if (!e.isJsonObject())
				throw new RuntimeException("request data isn't json object " + data);
			root = e.getAsJsonObject();
		}
		return root;
	}

	protected Object getObj(String name) {
		JsonObject oo = getRoot();
		if (oo != null)
			return oo.get(name);
		if (request != null)
			return request.getParameter(name);
		return null;
	}

	public String getStr(String name, boolean required) {
		Object o = getObj(name);
		if (o instanceof String)
			return (String) o;
		if (o instanceof JsonElement && ((JsonElement) o).isJsonPrimitive())
			return ((JsonElement) o).getAsString();
		if (required)
			throw new RuntimeException("undfined json element " + name);
		return null;
	}

	public Long getLong(String name, boolean required) {
		Object o = getObj(name);
		if (o instanceof Long)
			return (Long) o;
		if (o instanceof String) {
			try {
				return Long.getLong((String) o);
			} catch (Exception e) {
				throw new RuntimeException("can't parse property " + name + " " + e.getMessage());
			}
		}
		if (o instanceof JsonElement && ((JsonElement) o).isJsonPrimitive())
			return ((JsonElement) o).getAsLong();
		if (required)
			throw new RuntimeException("undfined json element " + name);
		return null;
	}

	public BigDecimal getBigDecimal(String name, boolean required) {
		Object o = getObj(name);
		if (o instanceof BigDecimal)
			return (BigDecimal) o;
		if (o instanceof String) {
			try {
				return new BigDecimal((String) o);
			} catch (Exception e) {
				throw new RuntimeException("can't parse property " + name + " " + e.getMessage());
			}
		}
		if (o instanceof JsonElement && ((JsonElement) o).isJsonPrimitive())
			return ((JsonElement) o).getAsBigDecimal();
		if (required)
			throw new RuntimeException("undfined json element " + name);
		return null;
	}

	public Boolean getBool(String name, boolean required) {
		Object o = getObj(name);
		if (o instanceof Boolean)
			return (Boolean) o;
		if (o instanceof String) {
			return "1".equals(o) || "true".equalsIgnoreCase((String) o);
		}
		if (o instanceof JsonElement && ((JsonElement) o).isJsonPrimitive())
			return ((JsonElement) o).getAsBoolean();
		if (required)
			throw new RuntimeException("undfined json element " + name);
		return null;
	}

	private static String dayPattern = "yyyy-MM-dd'T'HH:mm:ss";

	public Date getDate(String name, boolean required) {
		Object o = getObj(name);
		if (o instanceof Date)
			return (Date) o;
		if (o instanceof JsonElement && ((JsonElement) o).isJsonPrimitive())
			o = ((JsonElement) o).getAsString();
		if (o instanceof String) {
			try {
				String s = (String) o;
				SimpleDateFormat sdf = new SimpleDateFormat(dayPattern);
				return sdf.parse(s);
			} catch (Exception e) {
				throw new RuntimeException("can't parse property " + name + " " + e.getMessage());
			}
		}
		if (required)
			throw new RuntimeException("undfined json element " + name);
		return null;
	}

	public String[] getStrArr(String name) {
		JsonObject oo = getRoot();
		if (oo != null) {
			JsonElement e = oo.get(name);
			if (e == null || !e.isJsonArray())
				return null;
			JsonArray ja = e.getAsJsonArray();
			List<String> l = new ArrayList<String>(ja.size());
			for (int i = 0; i < ja.size(); i++) {
				JsonElement ee = ja.get(i);
				if (ee.isJsonPrimitive())
					l.add(ee.getAsString());
			}
			return l.toArray(new String[l.size()]);
		}
		if (request != null)
			return request.getParameterValues(name);
		return null;
	}

	public Long[] getLongArr(String name) {
		JsonObject oo = getRoot();
		if (oo != null) {
			JsonElement e = oo.get(name);
			if (e == null || !e.isJsonArray())
				return null;
			JsonArray ja = e.getAsJsonArray();
			List<Long> l = new ArrayList<Long>(ja.size());
			for (int i = 0; i < ja.size(); i++) {
				JsonElement ee = ja.get(i);
				if (ee.isJsonPrimitive())
					l.add(ee.getAsLong());
			}
			return l.toArray(new Long[l.size()]);
		}
		if (request != null) {
			String[] sa = request.getParameterValues(name);
			if (sa != null) {
				try {
					Long[] la = new Long[sa.length];
					for (int i = 0; i < la.length; i++)
						la[i] = Long.getLong(sa[i]);
					return la;
				} catch (Exception e) {
					throw new RuntimeException("can't parse property array " + name + " " + e.getMessage());
				}

			}
		}
		return null;
	}

	public String getRaw() {
		return data;
	}

	public Writer getWriter(String mimeType) {
		if (response != null) {
			response.setContentType(mimeType);
		}
		return writer;
	}

	public void write(String mimeType, String str) throws IOException {
		if (response != null) {
			response.setContentType(mimeType);
		}
		writer.write(str);
	}

	public JsonWriter getJsonWriter() {
		if (response != null) {
			response.setContentType(MIME_JSON);
		}
		JsonWriter jw = new JsonWriter(writer);
		jw.setIndent(" ");
		return jw;
	}

	public HttpSession getSession() {
		return session;
	}
}
