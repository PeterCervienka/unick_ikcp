package com.aston.ckm;

import java.io.File;

import javax.sql.DataSource;

import com.aston.basex.AppConfig;
import com.aston.basex.BasexListener;
import com.aston.basex.IBasexConfigFactory;

public class CkmConfigFactory implements IBasexConfigFactory {

	@Override
	public void afterLoadProperties(AppConfig appConfig) {

		File f = new File("/edata/ikcp");
		if (f.exists())
			appConfig.getProperties().setProperty("basex.data.dir", f.getAbsolutePath());
		System.out.println("use data.dir " + f.getAbsolutePath());

		DataSource wsusr = null;
		try {
			wsusr = (DataSource) BasexListener.loadJndi("jdbc/wsusr");
			wsusr.getConnection().close();
		} catch (Exception e) {
			wsusr = null;
		}

		if (wsusr != null) {
			System.out.println(wsusr.getClass());
			appConfig.getContext().setAttribute("jdbc/wsusr", wsusr);
			appConfig.getProperties().setProperty("api.calcIkcp", "com.aston.ckm.CalculateIkcp");
			appConfig.getProperties().remove("calcIkcp.url");
			appConfig.getProperties().remove("calcIkcp.header.Authorization");
		}
		System.out.println("use api.calcIkcp " + appConfig.getProperty("api.calcIkcp"));
	}

	@Override
	public void afterConfig(AppConfig appConfig) {
	}

}
