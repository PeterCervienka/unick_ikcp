package com.aston.utils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public abstract class Dbc {

	protected abstract Connection getConnection() throws SQLException;

	protected void closeConnection(Connection c, PreparedStatement ps, ResultSet rs) {
		try {
			if (rs != null)
				rs.close();
		} catch (Exception e) {
		}
		try {
			if (ps != null)
				ps.close();
		} catch (Exception e) {
		}
	}

	protected void fillPs(PreparedStatement ps, Object[] params) throws SQLException {
		if (params != null)
			for (int i = 0; i < params.length; i++) {
				Object v = params[i];
				if (v instanceof Date) {
					v = new Timestamp(((Date) v).getTime());
				} else if (v != null && v.getClass().isArray()) {
					v = ps.getConnection().createArrayOf("text", (Object[]) v);
				}

				ps.setObject(i + 1, v);
			}
	}

	public Object insert(String sql, Object... params) throws SQLException {
		long l1 = System.nanoTime();
		Object oid = null;
		Connection c = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			c = getConnection();
			ps = c.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
			fillPs(ps, params);
			ps.executeUpdate();
			rs = ps.getGeneratedKeys();
			if (rs.next())
				oid = rs.getObject(1);
		} finally {
			closeConnection(c, ps, rs);
		}
		long l2 = System.nanoTime();
		System.out.println(sql + " " + ((l2 - l1) / 1000));
		return oid;
	}

	public int update(String sql, Object... params) throws SQLException {
		System.out.println(sql);
		long l1 = System.nanoTime();
		int r = 0;
		Connection c = null;
		PreparedStatement ps = null;
		try {
			c = getConnection();
			ps = c.prepareStatement(sql);
			fillPs(ps, params);
			r = ps.executeUpdate();
		} finally {
			closeConnection(c, ps, null);
		}
		long l2 = System.nanoTime();
		System.out.println(sql + " " + ((l2 - l1) / 1000));
		return r;
	}

	public <T> List<T> select(IRow<T> row, String sql, Object... params) throws SQLException {
		long l1 = System.nanoTime();
		List<T> l = new ArrayList<T>();
		Connection c = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			c = getConnection();
			ps = c.prepareStatement(sql);
			fillPs(ps, params);
			rs = ps.executeQuery();
			while (rs.next()) {
				l.add(row.row(rs));
			}
		} catch (SQLException e) {
			e.printStackTrace();
			throw e;
		} finally {
			closeConnection(c, ps, rs);
		}
		long l2 = System.nanoTime();
		System.out.println(sql + " " + ((l2 - l1) / 1000));
		return l;
	}

	public <T> T select1(IRow<T> row, String sql, Object... params) throws SQLException {
		long l1 = System.nanoTime();
		T val = null;
		Connection c = null;
		PreparedStatement ps = null;
		ResultSet rs = null;
		try {
			c = getConnection();
			ps = c.prepareStatement(sql);
			fillPs(ps, params);
			rs = ps.executeQuery();
			if (rs.next())
				val = row.row(rs);
		} finally {
			closeConnection(c, ps, rs);
		}
		long l2 = System.nanoTime();
		System.out.println(sql + " " + ((l2 - l1) / 1000));
		return val;
	}

	public static interface IRow<T> {
		T row(ResultSet rs) throws SQLException;
	}

	public static IRow<Integer> singleInt = new IRow<Integer>() {

		@Override
		public Integer row(ResultSet rs) throws SQLException {
			Object o = rs.getObject(1);
			if (o instanceof Integer)
				return (Integer) o;
			if (o instanceof Number)
				return new Integer(((Number) o).intValue());
			return null;
		}
	};

	public static IRow<Long> singleLong = new IRow<Long>() {

		@Override
		public Long row(ResultSet rs) throws SQLException {
			Object o = rs.getObject(1);
			if (o instanceof Long)
				return (Long) o;
			if (o instanceof Number)
				return new Long(((Number) o).longValue());
			return null;
		}
	};

	public static IRow<String> singleString = new IRow<String>() {

		@Override
		public String row(ResultSet rs) throws SQLException {
			return rs.getString(1);
		}
	};

	public static IRow<Boolean> singleBoolean = new IRow<Boolean>() {

		@Override
		public Boolean row(ResultSet rs) throws SQLException {
			Object o = rs.getObject(1);
			if (o instanceof Boolean)
				return (Boolean) o;
			if (o instanceof Number)
				return ((Number) o).intValue() != 0;
			return null;
		}
	};

	public static IRow<Object[]> array = new IRow<Object[]>() {

		@Override
		public Object[] row(ResultSet rs) throws SQLException {
			int max = rs.getMetaData().getColumnCount();
			Object[] a = new Object[max];
			for (int i = 0; i < max; i++)
				a[i] = rs.getObject(i + 1);
			return a;
		}
	};
	public static IRow<Long[]> arrayLong = new IRow<Long[]>() {

		@Override
		public Long[] row(ResultSet rs) throws SQLException {
			int max = rs.getMetaData().getColumnCount();
			Long[] a = new Long[max];
			for (int i = 0; i < max; i++)
				a[i] = rs.getLong(i + 1);
			return a;
		}
	};

	public static IRow<String[]> arrayString = new IRow<String[]>() {

		@Override
		public String[] row(ResultSet rs) throws SQLException {
			int max = rs.getMetaData().getColumnCount();
			String[] a = new String[max];
			for (int i = 0; i < max; i++)
				a[i] = rs.getString(i + 1);
			return a;
		}
	};
}
