package com.aston.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class StringHelper {

	public static List<String> tokenizeTrimString(String text, String delimiter) {
		List<String> l = new ArrayList<String>();
		StringTokenizer st = new StringTokenizer(text, delimiter);
		while (st.hasMoreElements()) {
			String el = st.nextToken();
			if (el == null)
				continue;
			el = el.trim();
			if (el.length() > 0)
				l.add(el);
		}
		return l;
	}

	public static String[] tokenizeTrimStringA(String text, String delimiter) {
		List<String> l = tokenizeTrimString(text, delimiter);
		return l.toArray(new String[l.size()]);
	}

}
