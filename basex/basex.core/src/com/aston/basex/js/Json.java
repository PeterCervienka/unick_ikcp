package com.aston.basex.js;

import java.math.BigDecimal;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

public class Json {

	public static JsonObject obj(JsonObject o, String name) {
		JsonElement e = o.get(name);
		return e != null && e.isJsonObject() ? (JsonObject) e : null;
	}

	public static JsonArray arr(JsonObject o, String name) {
		JsonElement e = o.get(name);
		return e != null && e.isJsonArray() ? (JsonArray) e : null;
	}

	public static String str(JsonObject o, String name) {
		JsonElement e = o.get(name);
		return e != null && e.isJsonPrimitive() ? e.getAsString() : null;
	}

	public static BigDecimal bigDecimal(JsonObject o, String name) {
		JsonElement e = o.get(name);
		return e != null && e.isJsonPrimitive() ? e.getAsBigDecimal() : null;
	}

	public static Integer integer(JsonObject o, String name) {
		JsonElement e = o.get(name);
		return e != null && e.isJsonPrimitive() ? e.getAsInt() : null;
	}

	public static JsonObject[] objA(JsonArray a) {
		if (a == null)
			return null;
		JsonObject[] ss = new JsonObject[a.size()];
		for (int i = 0; i < ss.length; i++) {
			JsonElement e = a.get(i);
			ss[i] = e != null && e.isJsonObject() ? e.getAsJsonObject() : null;
		}
		return ss;
	}

	public static String[] strA(JsonArray a) {
		if (a == null)
			return null;
		String[] ss = new String[a.size()];
		for (int i = 0; i < ss.length; i++) {
			JsonElement e = a.get(i);
			ss[i] = e != null && e.isJsonPrimitive() ? e.getAsString() : null;
		}
		return ss;
	}

	public static BigDecimal[] bigDecimalA(JsonArray a) {
		if (a == null)
			return null;
		BigDecimal[] ss = new BigDecimal[a.size()];
		for (int i = 0; i < ss.length; i++) {
			JsonElement e = a.get(i);
			ss[i] = e != null && e.isJsonPrimitive() ? e.getAsBigDecimal() : null;
		}
		return ss;
	}

	public static int[] integerA(JsonArray a) {
		if (a == null)
			return null;
		int[] ss = new int[a.size()];
		for (int i = 0; i < ss.length; i++) {
			JsonElement e = a.get(i);
			ss[i] = e != null && e.isJsonPrimitive() ? e.getAsInt() : 0;
		}
		return ss;
	}
}
