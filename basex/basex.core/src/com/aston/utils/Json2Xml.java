package com.aston.utils;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class Json2Xml {

	String rootEl;
	List<JsonXmlItem> subItems = new ArrayList<Json2Xml.JsonXmlItem>();

	public Json2Xml(String rootEl) {
		this.rootEl = rootEl;
	}

	public void el(String elName, String jsonName) {
		subItems.add(new JsonXmlItem(elName, jsonName, JsonXmlType.EL, null));
	}

	public void el(String elName) {
		el(elName, elName);
	}

	public void att(String elName, String jsonName) {
		subItems.add(new JsonXmlItem(elName, jsonName, JsonXmlType.ATT, null));
	}

	public void att(String elName) {
		att(elName, elName);
	}

	public Json2Xml subEl(String elName, String jsonName) {
		Json2Xml sub = new Json2Xml(elName);
		subItems.add(new JsonXmlItem(elName, jsonName, JsonXmlType.SUB, sub));
		return sub;
	}

	public Json2Xml subArr(String elName, String itemElName, String jsonName) {
		Json2Xml sub = new Json2Xml(itemElName);
		subItems.add(new JsonXmlItem(elName, jsonName, JsonXmlType.ARR, sub));
		return sub;
	}

	public void subArr2(String elName, String itemElName, String jsonName) {
		Json2Xml sub = new Json2Xml(itemElName);
		subItems.add(new JsonXmlItem(elName, jsonName, JsonXmlType.ARR2, sub));
	}

	public void write(Writer w, JsonObject o) throws IOException {
		XmlWriter xml = new XmlWriter(w);
		// xml.startDocument("utf-8");
		xml.startEl(rootEl);
		writeItems(xml, subItems, o);
		xml.endEl(rootEl);
	}

	private static void writeItems(XmlWriter xml, List<JsonXmlItem> items, JsonObject o) throws IOException {
		for (JsonXmlItem i : items) {

			if (i.type.equals(JsonXmlType.EL)) {

				JsonElement e = o.get(i.jsonName != null ? i.jsonName : i.elName);
				String val = e != null && e.isJsonPrimitive() ? e.getAsString() : "";

				xml.startEl(i.elName);
				xml.text(val);
				xml.endEl(i.elName);
			} else if (i.type.equals(JsonXmlType.ATT)) {

				JsonElement e = o.get(i.jsonName != null ? i.jsonName : i.elName);
				String val = e != null && e.isJsonPrimitive() ? e.getAsString() : "";

				xml.attribute(i.elName, val);
			} else if (i.type.equals(JsonXmlType.SUB)) {

				JsonObject subObj = null;
				if (i.jsonName == null || i.jsonName.equals("*")) {
					subObj = o;
				} else {
					JsonElement e = o.get(i.jsonName);
					subObj = e != null && e.isJsonObject() ? e.getAsJsonObject() : null;
				}

				if (subObj != null) {
					xml.startEl(i.elName);
					writeItems(xml, i.subconf.subItems, subObj);
					xml.endEl(i.elName);
				}
			} else if (i.type.equals(JsonXmlType.ARR)) {

				JsonElement e = o.get(i.jsonName != null ? i.jsonName : i.elName);
				JsonArray subArr = e != null && e.isJsonArray() ? e.getAsJsonArray() : null;

				if (subArr != null) {
					xml.startEl(i.elName);
					for (int ii = 0; ii < subArr.size(); ii++) {
						JsonElement ee = subArr.get(ii);
						xml.startEl(i.subconf.rootEl);
						writeItems(xml, i.subconf.subItems, ee.getAsJsonObject());
						xml.endEl(i.subconf.rootEl);
					}
					xml.endEl(i.elName);
				}
			} else if (i.type.equals(JsonXmlType.ARR2)) {

				JsonElement e = o.get(i.jsonName != null ? i.jsonName : i.elName);
				JsonArray subArr = e != null && e.isJsonArray() ? e.getAsJsonArray() : null;

				if (subArr != null) {
					xml.startEl(i.elName);
					for (int ii = 0; ii < subArr.size(); ii++) {
						JsonElement ee = subArr.get(ii);
						if (ee != null && ee.isJsonPrimitive())
							xml.startEl(i.subconf.rootEl).text(ee.getAsString()).endEl(i.subconf.rootEl);
					}
					xml.endEl(i.elName);
				}
			}

		}

	}

	private static class JsonXmlItem {
		String elName;
		String jsonName;
		JsonXmlType type;
		Json2Xml subconf;

		public JsonXmlItem(String elName, String jsonName, JsonXmlType type, Json2Xml subconf) {
			this.elName = elName;
			this.jsonName = jsonName;
			this.type = type;
			this.subconf = subconf;
		}

	}

	private static enum JsonXmlType {
		EL, ATT, SUB, ARR, ARR2
	}
}
