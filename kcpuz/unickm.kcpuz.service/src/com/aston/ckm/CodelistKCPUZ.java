package com.aston.ckm;

import java.io.Writer;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Types;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import oracle.jdbc.OracleTypes;
import oracle.jdbc.driver.OracleConnection;
import oracle.jdbc.pool.OracleDataSource;

import com.aston.basex.AppConfig;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.Codelist;
import com.aston.basex.api.IApiFunction;
import com.aston.utils.StringHelper;
import com.google.gson.stream.JsonWriter;

public class CodelistKCPUZ implements IApiFunction {

	OracleDataSource ds = null;
	Map<String, List<Codelist>> codelistCache = new ConcurrentHashMap<String, List<Codelist>>();
	List<String> allowedCodelists = null;

	@Override
	public void init(AppConfig config, String name) {
		try {
			ds = new OracleDataSource();
			ds.setURL(config.getProperty("db.app_etrans.url"));
			ds.setUser(config.getProperty("db.app_etrans.user"));
			ds.setPassword(config.getProperty("db.app_etrans.password"));
		} catch (Exception e) {
			e.printStackTrace();
		}

		String sallowed = config.getProperty(name + ".allowed");
		if (sallowed == null)
			throw new RuntimeException("require property " + name + ".allowed");
		this.allowedCodelists = StringHelper.tokenizeTrimString(sallowed, ",");
	}

	@Override
	public void call(ApiData apiData) throws Exception {

		String name = apiData.getStr("name", true);
		String id = apiData.getStr("id", false);

		JsonWriter w = apiData.getJsonWriter();
		if (id != null) {
			Codelist cl = selectCodelistItem(name, id);
			if (cl != null)
				cl.toJson(w);
		} else {
			List<Codelist> l = selectCodelist(name);
			if (l != null) {
				w.beginArray();
				for (Codelist cl : l)
					cl.toJson(w);
				w.endArray();
			}
		}
	}

	private long last = 0;
	private long day = 1000 * 60 * 60 * 24;

	protected void checkCacheExpire() {
		long akt = System.currentTimeMillis() / day;
		if (last < akt) {
			codelistCache.clear();
			last = akt;
		}
	}

	public List<Codelist> selectCodelist(String name) {

		if (!allowedCodelists.contains(name))
			return null;

		checkCacheExpire();

		List<Codelist> res = codelistCache.get(name);
		if (res != null)
			return res;
		res = new ArrayList<Codelist>();
		try {
			_select(name, res);
			codelistCache.put(name, res);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return res;
	}

	public Codelist selectCodelistItem(String name, String id) {
		if (id == null)
			return null;
		List<Codelist> res = selectCodelist(name);
		if (res == null)
			return null;
		for (Codelist cl : res)
			if (id.equals(cl.getId()))
				return cl;
		return null;
	}

	protected void _select(String codelistName, List<Codelist> array) throws Exception {

		OracleConnection oc = null;
		try {
			Locale.setDefault(new Locale("sk"));
			oc = (OracleConnection) ds.getConnection();
			String schema = "N";
			String dn = "uid=klucarova,ou=union,ou=people,dc=opensso,dc=union,dc=sk";
			String sso = "token";
			_initSession(oc, schema, dn, sso);
			_r31_ciselniky(oc, sso, schema, codelistName, array, null);
			_closeSession(oc, sso);
			oc.close();

		} catch (Exception e) {
			if (oc != null) {
				try {
					oc.close();
				} catch (Exception ee) {
				}
			}
			throw e;
		}

	}

	protected void _r31_ciselniky(Connection con, String token, String schema, String codelistName, List<Codelist> array, Writer ww) throws Exception {
		long t1 = System.currentTimeMillis();
		CallableStatement cs = null;
		ResultSet rs = null;
		try {
			String sql = "{ call ai.r31_ciselniky_" + schema + ".INQ(?,?,?,?,?,?,?,?,?,?,?) }";
			cs = con.prepareCall(sql);
			cs.registerOutParameter(1, Types.DATE);
			cs.registerOutParameter(2, Types.VARCHAR);
			cs.registerOutParameter(3, Types.VARCHAR);
			cs.registerOutParameter(4, Types.VARCHAR);
			cs.registerOutParameter(5, OracleTypes.CURSOR);
			cs.setString(6, token);
			cs.setNull(7, Types.VARCHAR);
			cs.setString(8, "LOCAL");
			cs.setNull(9, Types.TIMESTAMP);
			cs.setInt(10, 0);
			cs.setInt(11, 10000);

			System.out.println("start");

			cs.execute();
			if ("0".equals(cs.getString(4))) {
				int i = 0;
				rs = (ResultSet) cs.getObject(5);
				while (rs.next()) {
					if (ww != null)
						ww.write(rs.getString("codelistCode") + "|" + rs.getLong("valueId") + "|" + rs.getString("valueCode") + "|" + rs.getString("value") + "\n");

					if (codelistName != null && codelistName.equals(rs.getString("codelistCode"))) {
						array.add(new Codelist(rs.getString("valueCode"), rs.getString("value")));
					}
					i++;
				}
				System.out.println("count: " + i);
			} else {
				System.out.println(cs.getString(1) + " " + cs.getString(2) + " " + cs.getString(3) + " " + cs.getString(4));
			}
		} finally {
			try {
				if (rs != null)
					rs.close();
			} catch (Exception e2) {
			}
			try {
				if (cs != null)
					cs.close();
			} catch (Exception e2) {
			}
		}
		long t2 = System.currentTimeMillis();
		System.out.println("timelog|sql|" + (t2 - t1) + "|r31_ciselniky");
	}

	protected void _initSession(OracleConnection oc, String schmema, String dn, String sso) throws Exception {

		java.util.Properties prop = new java.util.Properties();
		prop.put(OracleConnection.PROXY_USER_NAME, "APP_ETRANS_" + schmema);
		oc.openProxySession(OracleConnection.PROXYTYPE_USER_NAME, prop);

		CallableStatement cs1 = oc.prepareCall("{ call ai.setup(?, ?) }");
		cs1.setString(1, sso);
		cs1.setString(2, dn);
		cs1.execute();
		cs1.close();
	}

	protected void _closeSession(OracleConnection oc, String sso) throws Exception {
		CallableStatement cs3 = oc.prepareCall("{ call ai.teardown(?) }");
		cs3.setString(1, sso);
		cs3.execute();
		cs3.close();

		oc.close(OracleConnection.PROXY_SESSION);
		oc.close();
	}

	public static void main(String[] args) {

		try {
			CodelistKCPUZ clapi = new CodelistKCPUZ();
			clapi.init(null, null);
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
