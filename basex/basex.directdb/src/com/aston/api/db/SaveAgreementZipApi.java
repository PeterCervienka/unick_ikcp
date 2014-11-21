package com.aston.api.db;

import java.io.File;

import javax.servlet.http.HttpSession;

import com.aston.basex.AppConfig;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.IApiFunction;
import com.aston.basex.api.IDocStorage;

public class SaveAgreementZipApi implements IApiFunction {

	protected IDocStorage docStrage = null;
	protected File zipDir;
	
	@Override
	public void init(AppConfig config, String name) {
		this.docStrage = config.getDocStorage();
		String sdir = config.getProperty("saveAgreementZipApi.dir");
		if(sdir==null) throw new RuntimeException("undefined property SaveAgreementZipApi.dir");
		this.zipDir = new File(sdir);
		if(!zipDir.exists() && !zipDir.isDirectory()) throw new RuntimeException("undefined dir "+sdir);
	}

	@Override
	public void call(ApiData apiData) {
//		return null;
	}
}
