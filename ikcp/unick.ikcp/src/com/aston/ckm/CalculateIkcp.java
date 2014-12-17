package com.aston.ckm;

import com.aston.basex.AppConfig;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.IApiFunction;
import com.aston.utils.Json2Xml;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.stream.JsonWriter;
import oracle.jdbc.OracleTypes;
import oracle.jdbc.pool.OracleDataSource;
import org.json.JSONObject;
import org.json.XML;

import java.io.IOException;
import java.io.StringWriter;
import java.sql.*;
import java.util.Locale;

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
		String xml = createXml(o);
		callProc(xml, w);

	}


	protected static String createXml(JsonObject o) throws IOException {

        Json2Xml data = new Json2Xml("data");

        Json2Xml header = data.subEl("header", "header");
        header.el("partner");
        header.el("dpo");
        header.el("od");
        header.el("do");
        header.el("uzemie");
        header.el("platenie");

        header.subArr2("zlavy_zmluva", "zlava_zmluva", "zlavy_zmluva");

        Json2Xml person = data.subArr("persons", "person", "persons");
        person.el("id");
        person.el("vek");
        person.el("skupina");

        Json2Xml risk = person.subArr("skupiny_rizik", "skupina_rizika", "skupiny_rizik");
        risk.el("kod");
        risk.el("predmet");
        risk.el("percento");
        risk.el("suma");

        StringWriter w = new StringWriter();
        data.write(w, o.getAsJsonObject("data"));

        String xml = w.toString();

        xml = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + xml;

        return xml;
	}

	protected void callProc(String xml, JsonWriter w) throws Exception {

		Connection c = null;
		CallableStatement cs = null;

		try {

			Locale.setDefault(new Locale("sk"));
			c = ds.getConnection();

			cs = c.prepareCall("{ call ws.IKCP_PUB.IKCP_VYPOCET(?, ?, ?, ?, ?, ?) }");
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
				w.name("skupina_riziko").value(rs.getString(2));
				w.name("poistne_riziko").value(rs.getBigDecimal(3));
				w.name("poistne_osoba").value(rs.getInt(4));
				w.endObject();
			}
			w.endArray();
			rs.close();

			w.name("dv").beginArray();
			ResultSet rs2 = (ResultSet) cs.getObject(3);
			while (rs2.next()) {
				w.beginObject();
				w.name("id").value(rs2.getString(1));
				w.name("rizikoKod").value(rs2.getString(2));
				w.name("rizikoPoistne").value(rs2.getString(3));
                w.name("balik").value(rs2.getString(4));
                w.name("poistne_balik").value(rs2.getBigDecimal(5));
                w.name("poistne_zmluva").value(rs2.getBigDecimal(6));
                w.name("predmet_poist_ic").value(rs2.getBigDecimal(7));
                w.name("predmet_poist_mn").value(rs2.getString(8));
                w.name("poistna_suma").value(rs2.getBigDecimal(9));
                w.name("zlavy_os").value(rs2.getString(10));
                w.name("zlavy_zmluva").value(rs2.getString(11));
				w.endObject();
			}
			w.endArray();
			rs2.close();

		}
		w.endObject();
	}

	public static void main(String[] args) {

		/*try {

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
*/
        try {
            String json = "{\"data\":{\"header\":{\"partner\":\"Aston\",\"dpo\":\"701\",\"od\":\"08.12.2014\",\"do\":\"08.12.2014\",\"uzemie\":191,\"platenie\":4,\"zlavy_zmluva\":[\"RODINA\"]},\"persons\":[{\"id\":1,\"vek\":18,\"skupina\":\"T\",\"skupina_rizik\":[{\"kod\":\"B03\",\"predmet\":\"T\",\"suma\":700}]},{\"id\":2,\"vek\":18,\"skupina\":\"T\",\"skupina_rizik\":[{\"kod\":\"B03\",\"predmet\":\"T\",\"suma\":700}]},{\"id\":3,\"vek\":18,\"skupina\":\"T\",\"skupina_rizik\":[{\"kod\":\"B03\",\"predmet\":\"T\",\"suma\":700}]}]}}";
            JsonObject o = (new JsonParser()).parse(json).getAsJsonObject();

            String xml = createXml(o);
            System.out.println(o.toString());
            System.out.println(xml);
        } catch (Exception e) {

        }

	}
}
