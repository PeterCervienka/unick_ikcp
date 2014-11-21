package com.aston.utils;

import java.util.Arrays;

public class AkcentHelper {

	public static String deleteAkcent(String txt) {
		int i2, max2 = akcent_sk.length;

		StringBuffer sb = new StringBuffer(txt.length());
		char[] chars = txt.toCharArray();
		int i, max = chars.length;
		for (i = 0; i < max; i++) {
			char ch = chars[i];
			if (ch == ' ')
				sb.append(' ');
			else if (ch >= 'a' && ch <= 'z')
				sb.append(ch);
			else if (ch >= 'A' && ch <= 'Z')
				sb.append(ch);
			else if (ch >= '0' && ch <= '9')
				sb.append(ch);
			else if (Arrays.binarySearch(specUriChars, ch) >= 0)
				sb.append(ch);
			else {
				for (i2 = 0; i2 < max2; i2++)
					if (ch == akcent_sk[i2]) {
						sb.append(akcent_en[i2]);
						break;
					}
			}

		}
		return sb.toString();
	}

	// UPOZORNENIE: znaky musia byt usporiadane, preto po pridani novych
	// spustite metodu main na usporiadanie pola
	private static final char[] specUriChars = "!'*-._|~".toCharArray();
	private static final char[] specUriChars2 = "!'*-./_|~".toCharArray();
	private static final char[] akcent_sk = "\u00e9\u011b\u00c9\u011a\u0159\u0158\u0165\u0164\u017e\u017d\u00fa\u00da\u016f\u016e\u00fc\u00dc\u00ed\u00cd\u00f3\u00d3\u00e1\u00c1\u0161\u0160\u010f\u010e\u00fd\u00dd\u010d\u010c\u0148\u0147\u00e4\u00c4\u013a\u0139\u013e\u013d\u0155\u0154\u00f6\u00d6\u00f4"
			.toCharArray();
	private static final char[] akcent_en = "eeEErRtTzZuUuUuUiIoOaAsSdDyYcCnNaAlLlLrRoOo".toCharArray();

	public static void main(String[] args) {
		Arrays.sort(specUriChars2);
		System.out.println("*** sorted array:");
		for (int i = 0; i < specUriChars2.length; i++) {
			System.out.print(specUriChars2[i]);
		}
	}

}
