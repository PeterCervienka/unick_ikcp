package com.aston.basex.api;

import com.aston.basex.AppConfig;

public abstract class AApiFunction implements IApiFunction {

	private AppConfig config = null;
	private String name = null;

	public void init(AppConfig config, String name) {
		this.config = config;
		this.name = name;
	};

	protected AppConfig getConfig() {
		return config;
	}

	protected String getName() {
		return name;
	}

	protected String getProperty(String name) {
		return config.getProperty(name);
	}
}
