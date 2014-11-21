package com.aston.api.db;

import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.aston.basex.AppConfig;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.IApiFunction;
import com.aston.utils.AkcentHelper;
import com.aston.utils.BaseDbc;
import com.aston.utils.Dbc;
import com.google.gson.stream.JsonWriter;

public class AddressApi implements IApiFunction {

	private BaseDbc dbc = null;

	@Override
	public void init(AppConfig config, String name) {
		if (config.getDataSource() == null)
			throw new RuntimeException("AddressApi require datasource");
		this.dbc = new BaseDbc(config.getDataSource());
	}

	@Override
	public void call(ApiData apiData) throws Exception {
		String street = strim(apiData.getStr("street", false));
		String city = strim(apiData.getStr("city", false));
		String psc = strim(apiData.getStr("psc", false));
		String type = strim(apiData.getStr("type", false));

		List<String[]> l = select(street, city, psc, type);
		JsonWriter w = apiData.getJsonWriter();
		w.beginArray();
		if (l != null) {
			for (String[] r : l) {
				w.beginObject();
				if (r[0] != null)
					w.name("label").value(r[0]);
				if (r[1] != null)
					w.name("value").value(r[1]);
				if (r[2] != null)
					w.name("s").value(r[2]);
				if (r[3] != null)
					w.name("c").value(r[3]);
				if (r[4] != null)
					w.name("p").value(r[4]);
				w.endObject();
			}
		}
		w.endArray();
	}

	public String strim(String s) throws UnsupportedEncodingException {

		if (s == null)
			return null;
		s = s.trim();
		if (s.length() == 0)
			return null;
		s = AkcentHelper.deleteAkcent(s);
		s = s.toLowerCase();
		return s;
	}

	protected List<String[]> select(String street, String city, String psc, String type) throws SQLException {

		List<String[]> l = null;

		if ("street".equals(type)) {
			if (street == null || street.length() < 3)
				return null;
			String columns = "street||', '||city||' '||psc,street,null,city,psc,street0";
			if (city != null) {
				l = select2(AkcentHelper.deleteAkcent(street), AkcentHelper.deleteAkcent(city), "street0", "city0", columns);
			} else if (psc != null) {
				l = select2(AkcentHelper.deleteAkcent(street), psc, "street0", "psc", columns);
			} else {
				l = select2(AkcentHelper.deleteAkcent(street), null, "street0", null, columns);
			}

			if (l != null && l.size() > 20) {
				l = filterStreet(l);
			}

		} else if ("city".equals(type)) {
			if (city == null || city.length() < 2)
				return null;
			String columns = "city||' '||psc,city,null,null,psc,city0";
			if (street != null) {
				l = select2(AkcentHelper.deleteAkcent(city), AkcentHelper.deleteAkcent(street), "city0", "street0", columns);
			} else if (psc != null) {
				l = select2(AkcentHelper.deleteAkcent(city), psc, "city0", "psc", columns);
			} else {
				l = select2(AkcentHelper.deleteAkcent(city), null, "city0", null, columns);
			}
		} else if ("psc".equals(type)) {
			if (psc == null || psc.length() < 2)
				return null;
			String columns = "city||' '||psc,psc,null,city,null";
			if (city != null) {
				l = select2(psc, AkcentHelper.deleteAkcent(city), "psc", "city0", columns);
			} else {
				l = select2(psc, null, "psc", null, columns);
			}
		} else if ("valid".equals(type)) {
			l = dbc.select(Dbc.arrayString, "select null,null,street,city,psc from auto_address where street=? and city=? and psc=?", street, city, psc);
		}

		return l;
	}

	private List<String[]> filterStreet(List<String[]> l) {
		List<String[]> l2 = new ArrayList<String[]>(l.size());
		String last = null;
		for (String[] r : l) {
			if (last != null && last.equals(r[1]))
				continue;
			last = r[1];
			l2.add(new String[] { last, null, null, null, null });
		}
		return l2;
	}

	protected List<String[]> select2(String search, String filter, String searchField, String filterField, String selectFields) throws SQLException {

		List<String[]> l = null;
		List<Object> params = new ArrayList<Object>(2);
		StringBuilder sb = new StringBuilder();
		sb.append("select distinct ").append(selectFields).append(" from auto_address ");
		sb.append("where ").append(searchField).append(" ilike ? ");
		params.add(search + "%");
		if (filter != null && filterField != null) {
			sb.append("and ").append(filterField).append(" ilike ? ");
			params.add(filter);
		}
		sb.append("order by ").append(searchField).append(" asc ");

		l = dbc.select(Dbc.arrayString, sb.toString(), params.toArray());
		if (l.size() > 0)
			return l;

		l = dbc.select(Dbc.arrayString, "select distinct " + selectFields + " from auto_address where " + searchField + " ilike ? order by " + searchField + " asc", search + "%");
		return l;
	}
}
