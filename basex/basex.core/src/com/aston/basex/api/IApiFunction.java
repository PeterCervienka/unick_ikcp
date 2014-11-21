package com.aston.basex.api;

import com.aston.basex.AppConfig;

public interface IApiFunction {

	public void init(AppConfig config, String name);

	public void call(ApiData apiData) throws Exception;
}
