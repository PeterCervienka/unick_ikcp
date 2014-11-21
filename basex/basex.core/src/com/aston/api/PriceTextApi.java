package com.aston.api;

import java.util.HashMap;
import java.util.Map;

import com.aston.basex.AppConfig;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.IApiFunction;

public class PriceTextApi implements IApiFunction {

	@Override
	public void init(AppConfig config, String name) {
	}

	@Override
	public void call(ApiData apiData) throws Exception {
		String s = getTextFromPrice(apiData.getRaw(), "SK");
		apiData.write(ApiData.MIME_TEXT, s);
	}

	private static Map<Integer, String> cislovky = new HashMap<Integer, String>() {
		/**
											 * 
											 */
		private static final long serialVersionUID = 1L;

		{
			put(0, "nula");
			put(1, "jeden");
			put(2, "dva");
			put(3, "tri");
			put(4, "štyri");
			put(5, "päť");
			put(6, "šesť");
			put(7, "sedem");
			put(8, "osem");
			put(9, "deväť");
			put(10, "desať");
			put(14, "štrnásť");
			put(15, "päťnásť");
			put(19, "deväťnásť");
			put(20, "dvadsať");
			put(30, "tridsať");
			put(40, "štyridsať");
			put(50, "päťdesiat");
			put(60, "šesťdesiat");
			put(70, "sedemdesiat");
			put(80, "osemdesiat");
			put(90, "deväťdesiat");
			put(100, "sto");
			put(200, "dvesto");
			put(300, "tristo");
			put(400, "štyristo");
			put(500, "paťsto");
			put(600, "šesťsto");
			put(700, "sedemto");
			put(800, "osemsto");
			put(900, "deväťsto");
			put(1000, "tisíc");
			put(2000, "dvetisíc");
			put(3000, "tritisíc");
			put(4000, "štyritisíc");
			put(5000, "päťtisíc");
			put(6000, "šesťtisíc");
			put(7000, "sedemtisíc");
			put(8000, "osemtisíc");
			put(9000, "deväťtisíc");
			put(10000, "desaťtisíc");
			put(20000, "dvadsaťtisíc");
			put(30000, "tridsaťtisíc");
			put(40000, "štyridsaťtisíc");
			put(50000, "päťdesiattisíc");
			put(60000, "šesťdesiattisíc");
			put(70000, "sedemdesiattisíc");
			put(80000, "osemdesiattisíc");
			put(90000, "deväťdesiattisíc");
		}

	};

	private static Map<Integer, String> cislovky_cz = new HashMap<Integer, String>() {
		/**
											 * 
											 */
		private static final long serialVersionUID = 1L;

		{
			put(0, "nula");
			put(1, "jeden");
			put(2, "dva");
			put(3, "tři");
			put(4, "čtyři");
			put(5, "pět");
			put(6, "šest");
			put(7, "sedm");
			put(8, "osm");
			put(9, "devět");
			put(10, "deset");
			put(14, "čtrnáct");
			put(15, "patnáct");
			put(19, "devatenáct");
			put(20, "dvacet");
			put(30, "třicet");
			put(40, "čtyřicet");
			put(50, "padesát");
			put(60, "šedesát");
			put(70, "sedmdesát");
			put(80, "osmdesát");
			put(90, "devadesát");
			put(100, "sto");
			put(200, "dvěstě");
			put(300, "třista");
			put(400, "štyřista");
			put(500, "pětiset");
			put(600, "šestset");
			put(700, "sedmset");
			put(800, "osmset");
			put(900, "devětset");
			put(1000, "tisíc");
			put(2000, "dvatisíce");
			put(3000, "třitisíce");
			put(4000, "štyřitisíce");
			put(5000, "pěťtisíc");
			put(6000, "šesttisíc");
			put(7000, "sedmtisíc");
			put(8000, "osmtisíc");
			put(9000, "devěttisíc");
			put(10000, "desettisíc");
			put(20000, "dvacettisíc");
			put(30000, "třiceti");
			put(40000, "čtyřicettisíc");
			put(50000, "padesáttisíc");
			put(60000, "šedesát");
			put(70000, "sedmdesáttisíc");
			put(80000, "osmdesáttisíc");
			put(90000, "deväťdesiattisíc");
		}
	};

	private static Map<Integer, String> pripony = new HashMap<Integer, String>() {
		/**
											 * 
											 */
		private static final long serialVersionUID = 1L;

		{
			put(0, "násť");
			put(1, "dsať");
			put(5, "desiat");
			put(10, "desať");
			put(100, "sto");
			put(1000, "tisíc");
		}
	};

	private static Map<Integer, String> pripony_cz = new HashMap<Integer, String>() {
		/**
											 * 
											 */
		private static final long serialVersionUID = 1L;

		{
			put(0, "náct");
			put(1, "cet");
			put(5, "desát");
			put(10, "deset");
			put(100, "set");
			put(1000, "tisíc");
		}
	};

	// prevedie cislo do textu SK a CZ verzia
	public static String getTextFromPrice(String suma, String lang) {

		// overenie ci je suma v korektnom formate
		if (suma == null || lang == null)
			return null;
		String testSuma = suma.replace(",", ".");
		int count = testSuma.split(".").length;
		if (count > 1 || count < 0)
			return null;

		testSuma = testSuma.replace(".", "");

		if (!testSuma.matches("[0-9]+"))
			return null;

		suma = suma.replace(",", ".");

		// ak suma nema desatinne miesto, tak pridaj
		if (suma.indexOf(".") == -1)
			suma = suma + ".00";

		int len = suma.indexOf(".");

		// ak existuje desatinne miesto, orez na max 3 cifry
		if (len > 0 && suma.substring(len, suma.length()).length() > 2) {
			suma = suma.substring(0, len + 3);
		}

		Map<Integer, String> prip;
		Map<Integer, String> cislo;
		String mena;

		// ak je cz inak da slovenske
		if (lang.equals("CZK")) {
			prip = pripony_cz;
			cislo = cislovky_cz;
			mena = "korun českých";
		} else {
			prip = pripony;
			cislo = cislovky;
			mena = "Eur";
		}

		int cifra = 1;
		String slovami = "";
		boolean desatinne = suma.contains(".") ? true : false;

		if (!desatinne) {
			slovami = " " + mena;
		} else {
			int a = suma.length() - (suma.indexOf(".") + 1);
			if (a == 1)
				cifra = 10;
			else if (a == 0)
				cifra = 1;
		}

		String[] price1 = suma.split("");
		String[] price = new String[price1.length - 1];

		for (int i = 1; i < price1.length; i++) {
			price[i - 1] = price1[i];
		}

		for (int i = price.length - 1; i >= 0; i--) {

			if (!price[i].equals(".")) {
				if (cifra == 1) { // jednotky
					if (price[i].equals("0")) {
						if (!desatinne) {
							if (suma.indexOf(".") == 1) {
								slovami = cislo.get(Integer.valueOf(price[i])) + slovami;
							} else if (price[i - 1].equals("1")) {
								slovami = cislo.get(10) + slovami; // je to
																	// desiatka
							}
							desatinne = true;
						} else if (price[i - 1].equals("1")) {
							slovami = cislo.get(10) + slovami;
						}
					} else {
						// TODO isset?
						if (i - 1 >= 0) {
							if (!price[i - 1].equals("1")) {
								slovami = cislo.get(Integer.valueOf(price[i])) + slovami;
							} else if (price[i].equals("1")) {
								slovami = "jede" + prip.get(0) + slovami; // ak
																			// je
																			// jedenast
							} else {
								if (price[i].equals("4")) {
									slovami = cislo.get(14) + slovami;
								} else if (price[i].equals("5")) {
									slovami = cislo.get(15) + slovami;
								} else if (price[i].equals("9")) {
									slovami = cislo.get(19) + slovami;
								} else {
									slovami = cislo.get(Integer.valueOf(price[i])) + prip.get(0) + slovami; // ak
																											// je
																											// prednim
																											// jednotka
																											// musim
																											// vyrobit
																											// hned
																											// dvojciferne
								}
							}
						} else {
							slovami = price[i].equals("2") ? "dve" + slovami : cislo.get(Integer.valueOf(price[i])) + slovami;
						}
					}
				} else { // desiatky a vyssie
					if (!price[i].equals("0")) {
						// print "cifra: " . cifra;
						// print ", suma: " . price[i];
						// print ", cislovky: " . (price[i] * 10);
						if (cifra == 10) {
							if (!price[i].equals("1")) {
								slovami = cislo.get(Integer.valueOf(price[i]) * 10) + "" + slovami;
							} else {
								// TODO !isset?
								if ((i + 1) < 0 || (i + 1) > (price.length - 1)) {
									slovami = cislo.get(Integer.valueOf(price[i]) * 10) + "" + slovami;
								}
							}
						} else {
							if (!price[i].equals("0")) {
								if (cifra == 10) {
									if (!price[i].equals("1")) {
										slovami = cislo.get(Integer.valueOf(price[i]) * 10) + "" + slovami;
									} else {
										// TODO !isset?
										if ((i + 1) < 0 || (i + 1) > (price.length - 1)) {
											slovami = cislo.get(Integer.valueOf(price[i]) * 10) + "" + slovami;
										}
									}
								} else {
									if (cifra == 1000) {
										// TODO isset?
										if (i - 1 >= 0) {
											if (!price[i - 1].equals("1")) {
												if (price[i].equals("1"))
													slovami = "jedna" + cislo.get(Integer.valueOf(price[i]) * 1000) + slovami;
												else
													slovami = cislo.get(Integer.valueOf(price[i]) * 1000) + slovami;
											} else {

												if (price[i].equals("1"))
													slovami = "jede" + prip.get(0) + "tisíc" + slovami; // ak
																										// je
																										// jedenast
												else {
													if (price[i].equals("4")) {
														slovami = cislo.get(14) + "tisíc" + slovami;
													} else if (price[i].equals("5")) {
														slovami = cislo.get(15) + "tisíc" + slovami;
													} else if (price[i].equals("9")) {
														slovami = cislo.get(19) + "tisíc" + slovami;
													} else {
														slovami = cislo.get(Integer.valueOf(price[i])) + prip.get(0) + "tisíc" + slovami; // ak
																																			// je
																																			// prednim
																																			// jednotka
																																			// musim
																																			// vyrobit
																																			// hned
																																			// dvojciferne
													}
												}

											}
										} else {
											slovami = cislo.get(Integer.valueOf(price[i]) * 1000) + slovami;
										}
									} else {

										if (cifra < 100000) {
											if (cifra == 10000) {
												if (price[i + 1].equals("0")) {
													// slovami = "tisíc" .
													// slovami;
													if (price[i].equals("1")) {
														slovami = cislo.get(10 * Integer.valueOf(price[i])) + slovami;
													}
												}
												if (!price[i].equals("1")) {
													slovami = cislo.get(10 * Integer.valueOf(price[i])) + slovami;
												}
												// else slovami =
												// cislo.get(10].slovami;
											} else {
												slovami = cislo.get(cifra * Integer.valueOf(price[i])) + slovami;
											}
										} else {
											if (cifra < 1000000) {
												slovami = cislo.get(100 * Integer.valueOf(price[i])) + slovami;
											} else
												return "iba hodnoty mensie ako 1000000";
										}
									}
								}
							}
						}
					} else {
						if (cifra == 1000)
							slovami = "tisíc" + slovami;
					}
				}
				cifra = cifra * 10;
			} else {
				cifra = 1;
				if (slovami == "")
					slovami = " " + mena + " ";
				else {
					if (Integer.valueOf(price[suma.indexOf(".") + 1]) == 0)
						// TODO isset
						if (((suma.indexOf(".") + 2) < (price.length - 1)) && Integer.valueOf(price[suma.indexOf(".") + 2]) == 1)
							slovami = " " + mena + " a " + slovami + " cent";
						else
						// TODO isset
						if (((suma.indexOf(".") + 2) < (price.length - 1)) && Integer.valueOf(price[suma.indexOf(".") + 2]) > 4)
							slovami = " " + mena + " a " + slovami + " centov";
						else
							slovami = " " + mena + " a " + slovami + " centy";
					else {
						if (!lang.equals("CZK"))
							slovami = " " + mena + " a " + slovami + " centov";
						else
							slovami = " " + mena + " a " + slovami + " halierov";
					}
				}
				desatinne = false;
			}
		}

		if ((suma.indexOf(".") == 1) && (Integer.valueOf(price[0]) <= 4) && (Integer.valueOf(price[0]) > 1))
			slovami = slovami.replace("Eur", "Eurá");
		else if ((suma.indexOf(".") == 1) && (Integer.valueOf(price[0]) == 1)) {
			slovami = slovami.replace("Eur", "Euro");
			slovami = slovami.replace("jeden", "jedno");
		}

		return slovami;
	}
}
