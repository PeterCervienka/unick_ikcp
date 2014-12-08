package com.aston.ckm;

import java.io.IOException;
import java.io.StringWriter;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Types;
import java.util.Locale;

import oracle.jdbc.OracleTypes;
import oracle.jdbc.pool.OracleDataSource;

import com.aston.basex.AppConfig;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.IApiFunction;
import com.aston.utils.Json2Xml;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonWriter;

public class CalculateIkcp implements IApiFunction {

	OracleDataSource ds = null;

	@Override
	public void init(AppConfig config, String name) {
		try {
			ds = new OracleDataSource();
			ds.setURL(config.getProperty("db.wsusr.url"));
			ds.setUser(config.getProperty("db.wsusr.user"));
			ds.setPassword(config.getProperty("db.wsusr.password"));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void call(ApiData apiData) throws Exception {

		JsonObject o = apiData.getRoot();
		JsonWriter w = apiData.getJsonWriter();
		String xml = creaeXml(o);
		callProc(xml, w);

	}

	protected String creaeXml(JsonObject o) throws IOException {

        Json2Xml data = new Json2Xml("data");

        Json2Xml header = data.subEl("header", "*");
        header.el("partner");
        header.el("dpo");
        header.el("od");
        header.el("do");
        header.el("uzemie");
        header.el("platenie");
        header.el("zlavy_zmluva");

        Json2Xml discount = header.subArr("zlavy_zmluva", "zlava_zmluva", "zlava_zmluva");
        discount.el("zlava_zmluva");

        Json2Xml person = data.subArr("persons", "person", "person");
        person.att("id");
        person.att("vek");
        person.att("skupina");

        Json2Xml risk = person.subArr("skupiny_rizik", "skupina_rizika", "skupina_rizika");
        risk.att("kod");
        risk.att("predmet");
        risk.att("percento");
        risk.att("suma");

        StringWriter w = new StringWriter();
        data.write(w, o);
        return w.toString();
	}

	protected void callProc(String xml, JsonWriter w) throws Exception {

		Connection c = null;
		CallableStatement cs = null;

		try {

			Locale.setDefault(new Locale("sk"));
			c = ds.getConnection();

			cs = c.prepareCall("{ call ws.kcpuz_pub.kcpuz_vypocet(?, ?, ?, ?, ?, ?) }");
			cs.setString(1, xml);
			cs.registerOutParameter(2, OracleTypes.CURSOR);
			cs.registerOutParameter(3, OracleTypes.CURSOR);
			cs.registerOutParameter(4, Types.NUMERIC);
			cs.registerOutParameter(5, Types.NUMERIC);
			cs.registerOutParameter(6, Types.VARCHAR);
			cs.execute();

			resultCs(cs, w);

			cs.close();
			c.commit();
			c.close();

		} catch (Exception e) {
			if (c != null) {
				try {
					c.close();
				} catch (SQLException ee) {
				}
			}
			throw e;
		}
	}

	private void resultCs(CallableStatement cs, JsonWriter w) throws IOException, SQLException {

		int errCode = cs.getInt(5);

		w.beginObject();
		w.name("errCode").value(errCode);
		w.name("errMsg").value(cs.getString(6));

		if (errCode == 0) {
			w.name("poistne").value(cs.getBigDecimal(4));

			w.name("osoby").beginArray();
			ResultSet rs = (ResultSet) cs.getObject(2);
			while (rs.next()) {
				w.beginObject();
				w.name("id").value(rs.getString(1));
				w.name("skupinoveRizoko").value(rs.getString(2));
				w.name("poistneOsoba").value(rs.getBigDecimal(3));
				w.name("pocetDni").value(rs.getInt(4));
				w.endObject();
			}
			w.endArray();
			rs.close();

			w.name("dv").beginArray();
			ResultSet rs2 = (ResultSet) cs.getObject(3);
			while (rs2.next()) {
				w.beginObject();
				w.name("id").value(rs2.getString(1));
				w.name("produktKod").value(rs2.getString(2));
				w.name("predmet").value(rs2.getString(3));
				w.endObject();
			}
			w.endArray();
			rs2.close();

		}
		w.endObject();
	}

	public static void main(String[] args) {

		try {

			String json = "{ 'partner': 'Aston', 'zdroj': 'SR', ";
			json += "'od': '2014-09-08T00:00:00', 'do': '2014-09-13T00:00:00', ";
			json += "'balik': 'A1', 'uzemie': 'e', 'skupina': 'T',  ";
			json += "'osoby':[";
			json += " {   'id': '1',   'vek': 70  },";
			json += " {   'id': '2',   'vek': 70  }";
			json += "] }";

			CalculateIkcp c = new CalculateIkcp();
			c.init(null, null);
			StringWriter sw = new StringWriter();
			c.call(new ApiData(null, json, sw));
			System.out.println(sw.toString());

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
