package com.aston.api.db;

import java.sql.SQLException;

import com.aston.basex.AppConfig;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.IApiFunction;
import com.aston.utils.BaseDbc;
import com.aston.utils.BaseDbc.IExec;
import com.aston.utils.Dbc;

public class GenerateVSApi implements IApiFunction {

	private BaseDbc dbc = null;
	private String vscode = null;

	@Override
	public void init(AppConfig config, String name) {
		if (config.getDataSource() == null)
			throw new RuntimeException("GenerateVSApi require datasource");
		this.dbc = new BaseDbc(config.getDataSource());

		this.vscode = config.getProperty(name + ".code");
		if (vscode == null)
			throw new RuntimeException("GenerateVSApi require code");
	}

	@Override
	public void call(ApiData apiData) throws Exception {

		String vs = generateVariableSymbol(vscode);
		apiData.write(ApiData.MIME_TEXT, vs);
	}

	protected String generateVariableSymbol(final String product) throws SQLException {

		String res = dbc.tr(new IExec<String>() {
			@Override
			public String exec(Dbc tr) throws SQLException {
				long aktValue = 0;
				while (aktValue == 0) {

					String sql1 = "select id, akt_value from gwt_agreement_sequences where agreement_type=? and akt_value<max_value and active=1 order by seq_priority desc, akt_value asc limit 1";
					Long[] row = tr.select1(Dbc.arrayLong, sql1, product);
					long id = row[0];
					long oldValue = row[1];
					aktValue = oldValue + 1;

					String sql2 = "update gwt_agreement_sequences set akt_value=?, modified=current_timestamp where id=? and akt_value=?";
					int executeUpdate = dbc.update(sql2, aktValue, id, oldValue);
					if (executeUpdate == 0) {
						aktValue = 0;
						System.out.println("reload update gwt_sequences: " + product);
						try {
							Thread.sleep(60 + (3 * (Thread.currentThread().getId() % 11)));
						} catch (Exception e) {
						}
					}
				}
				return String.valueOf(aktValue);
			}
		});
		return res;
	}

}
