package com.aston.utils;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

public class BaseDbc extends Dbc {

	private DataSource ds = null;

	public BaseDbc(DataSource ds) {
		this.ds = ds;
	}

	public DataSource getDataSource() {
		return ds;
	}

	public <T> T tr(IExec<T> exec) throws SQLException {
		T res = null;
		Connection c = null;
		try {
			c = ds.getConnection();
			c.setAutoCommit(false);
			res = exec.exec(new TrDbc(c));
			c.commit();
			c.close();
		} catch (SQLException e) {
			if (c != null) {
				try {
					c.rollback();
				} catch (Exception e2) {
				}
				try {
					c.close();
				} catch (Exception e2) {
				}
			}
			throw e;
		}
		return res;
	}

	@Override
	public Connection getConnection() throws SQLException {
		return ds.getConnection();
	}

	@Override
	protected void closeConnection(Connection c, PreparedStatement ps, ResultSet rs) {
		super.closeConnection(c, ps, rs);
		try {
			c.close();
		} catch (SQLException e) {
		}
	}

	public static interface IExec<T> {

		public T exec(Dbc dbc) throws SQLException;
	}

	private static class TrDbc extends Dbc {

		protected Connection c;

		private TrDbc(Connection c) {
			this.c = c;
		}

		@Override
		protected Connection getConnection() throws SQLException {
			return c;
		}
	}
}
