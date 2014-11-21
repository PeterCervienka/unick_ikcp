package com.aston.api;

import com.aston.basex.AppConfig;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.IApiFunction;

public class EchoApi implements IApiFunction {

	@Override
	public void init(AppConfig config, String name) {

		System.out.println("init EchoApi");
	}

	@Override
	public void call(ApiData apiData) throws Exception {
		apiData.write(ApiData.MIME_TEXT, apiData.getRaw());
	}

}
