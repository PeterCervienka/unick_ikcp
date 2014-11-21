package com.aston.api.db;

import java.io.Writer;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.aston.basex.AppConfig;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.Codelist;
import com.aston.basex.api.IApiFunction;
import com.aston.basex.api.ICodelistStorage;

public class CodelistApi implements IApiFunction, ICodelistStorage {

	@Override
	public void init(AppConfig config, String name) {
	}

	@Override
	public void call(ApiData apiData) {

	}

	@Override
	public void selectCodelistJson(String name, Writer writer) {
		// TODO Auto-generated method stub

	}

	@Override
	public List<Codelist> selectCodelist(String name) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Codelist selectCodelistItem(String name, String id) {
		// TODO Auto-generated method stub
		return null;
	}
}
