package com.aston.api;

import java.io.File;
import java.io.FileInputStream;
import java.io.StringWriter;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Properties;

import com.aston.basex.AppConfig;
import com.aston.basex.api.AApiFunction;
import com.aston.basex.api.ApiData;
import com.aston.utils.StreamHelper;
import com.aston.utils.XmlWriter;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class CreateXmlApi extends AApiFunction {

	private XVal rootXval = null;

	@Override
	public void init(AppConfig config, String name) {
		super.init(config, name);

		String xdef = getProperty(getName() + ".root");
		if (xdef == null)
			throw new RuntimeException(getName() + ".root");
		rootXval = parse(xdef);
		if (rootXval.name == null || rootXval.type == null || rootXval.arrayItem != null)
			throw new RuntimeException("root expression must by object 'name:type' " + xdef);

	}

	@Override
	public void call(ApiData apiData) throws Exception {

		JsonObject root = apiData.getRoot();
		if (root == null)
			throw new Exception("json is null");

		StringWriter sw = new StringWriter();
		XmlWriter w = new XmlWriter(sw);
		w.startDocument("utf-8");
		writeObj(w, root, rootXval);
		w.flush();
		String res = sw.toString();
		apiData.getWriter(ApiData.MIME_XML).write(res);

		String docName = getProperty(getName() + ".docName");
		if (docName != null)
			getConfig().getDocStorage().saveDoc(apiData.getSession(), docName, res.getBytes("utf-8"));
	}

	protected void writeObj(XmlWriter w, JsonObject o, XVal xparent) throws Exception {

		String xtype = getProperty("xml." + xparent.type);
		if (xtype == null)
			throw new Exception("undefined property xml." + xparent.type);

		w.startEl(xparent.name);
		String[] items = xtype.split(",");
		for (String item : items) {
			XVal xv = parse(item);
			JsonElement e = o.get(xv.name);
			if (e == null || e.isJsonNull())
				continue;
			if (xv.arrayItem != null) {
				if (!e.isJsonArray())
					throw new Exception("array expresion hasn't array value " + item + " - " + e.toString());
				writeArr(w, e.getAsJsonArray(), xv);
			} else if ("date".equals(xv.type)) {
				if (!e.isJsonPrimitive())
					throw new Exception("date expresion hasn't primitive value " + item + " - " + e.toString());
				writeDate(w, xv.name, e.getAsString());
			} else if ("dateTime".equals(xv.type)) {
				if (!e.isJsonPrimitive())
					throw new Exception("date expresion hasn't primitive value " + item + " - " + e.toString());
				writeDateTime(w, xv.name, e.getAsString());
			} else if (xv.type != null) {
				if (!e.isJsonObject())
					throw new Exception("object expresion hasn't object value " + item + " - " + e.toString());
				writeObj(w, e.getAsJsonObject(), xv);
			} else {
				if (!e.isJsonPrimitive())
					throw new Exception("date expresion hasn't primitive value " + item + " - " + e.toString());
				w.startEl(xv.name);
				w.text(e.getAsString());
				w.endEl(xv.name);
			}
		}
		w.endEl(xparent.name);
	}

	protected void writeArr(XmlWriter w, JsonArray a, XVal xarr) throws Exception {
		XVal xitem = new XVal();
		xitem.name = xarr.arrayItem;
		xitem.type = xarr.type;

		w.startEl(xarr.name);
		int max = a.size();
		for (int i = 0; i < max; i++) {
			JsonElement e = a.get(i);
			if (!e.isJsonObject())
				throw new Exception("object expresion hasn't object value " + xarr.name + "[" + xarr.name + ":" + xarr.type + "] - " + e.toString());
			writeObj(w, e.getAsJsonObject(), xitem);
		}
		w.endEl(xarr.name);
	}

	protected void writeDate(XmlWriter w, String name, String sdate) throws Exception {

		if (sdate == null || sdate.trim().length() == 0)
			return;

		SimpleDateFormat sdfsk = new SimpleDateFormat("d.M.yyyy");
		SimpleDateFormat sdfxml = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

		Date d = null;
		try {
			d = sdfsk.parse(sdate);
		} catch (Exception e1) {
			try {
				d = sdfxml.parse(sdate);
			} catch (Exception e2) {
				throw new Exception("undefined date format[" + name + "] " + sdate);
			}
		}

		String dateSk = sdfsk.format(d);
		String dateXml = sdfxml.format(d);
		w.startEl(name).attribute("sk", dateSk).text(dateXml).endEl(name);
	}

	protected void writeDateTime(XmlWriter w, String name, String sdate) throws Exception {

		if (sdate == null || sdate.trim().length() == 0)
			return;

		SimpleDateFormat sdfsk = new SimpleDateFormat("d.M.yyyy HH:mm:ss");
		SimpleDateFormat sdfxml = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");

		Date d = null;
		try {
			d = sdfsk.parse(sdate);
		} catch (Exception e1) {
			try {
				d = sdfxml.parse(sdate);
			} catch (Exception e2) {
				throw new Exception("undefined date format[" + name + "] " + sdate);
			}
		}

		String dateSk = sdfsk.format(d);
		String dateXml = sdfxml.format(d);
		w.startEl(name).attribute("sk", dateSk).text(dateXml).endEl(name);
	}

	public static XVal parse(String s) {
		s = s.trim();
		XVal xval = new XVal();

		int posa1 = s.indexOf('[');
		int post = s.indexOf(':', posa1 + 1);
		if (s.endsWith("]")) {
			if (!(posa1 > 0 && posa1 + 1 < post & post + 1 < s.length() - 1))
				throw new RuntimeException("bad array expression, use name[itemName:itemType]: " + s);
			xval.name = s.substring(0, posa1);
			xval.arrayItem = s.substring(posa1 + 1, post);
			xval.type = s.substring(post + 1, s.length() - 1);
		} else if (post > 0) {
			xval.name = s.substring(0, post);
			xval.type = s.substring(post + 1);
		} else {
			xval.name = s;
		}
		return xval;
	}

	static class XVal {
		String name;
		String type;
		String arrayItem;
	}

	public static void main(String[] args) {
		try {
			System.out.println(new File("../unickm.kcpuz/new3.js").getAbsolutePath());
			String json = StreamHelper.file2String(new File("../unickm.kcpuz/new3.js"), "utf-8");
			Properties pp = new Properties();
			FileInputStream fis = new FileInputStream("../unickm.kcpuz/war/WEB-INF/application.properties");
			pp.load(fis);
			fis.close();

			AppConfig c = new AppConfig();
			c.setProperties(pp);
			CreateXmlApi a = new CreateXmlApi();
			a.init(c, "");
			StringWriter sw = new StringWriter();
			a.call(new ApiData(null, json, sw));
			System.out.println(sw.toString());

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
