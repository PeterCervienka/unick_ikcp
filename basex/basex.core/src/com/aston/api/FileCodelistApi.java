package com.aston.api;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.aston.basex.AppConfig;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.Codelist;
import com.aston.basex.api.IApiFunction;
import com.google.gson.stream.JsonWriter;

public class FileCodelistApi implements IApiFunction {

	private Map<String, List<Codelist>> codelists = new HashMap<String, List<Codelist>>();

	@Override
	public void init(AppConfig config, String name) {
		String path = config.getProperty(name + ".file");
		if (path == null)
			throw new RuntimeException("undefined property " + name + ".file");
		if (!path.startsWith("/"))
			path = config.getContext().getRealPath(path);
		File f = new File(path);
		if (!f.exists())
			throw new RuntimeException("undefined codelist file " + f.getAbsolutePath());

		String lastName = null;
		List<Codelist> lastList = null;

		FileInputStream fis = null;
		try {
			fis = new FileInputStream(f);
			BufferedReader br = new BufferedReader(new InputStreamReader(fis, "utf-8"));
			String line = null;
			while ((line = br.readLine()) != null) {
				String[] row = line.split(";");
				if (row.length >= 3) {
					Codelist c = new Codelist(row[1], row[2], row.length >= 4 ? row[3] : null);
					if (lastName == null || !lastName.equals(row[0])) {
						lastList = codelists.get(row[0]);
						if (lastList == null)
							lastList = new ArrayList<Codelist>();
						this.codelists.put(row[0], lastList);
					}
					lastList.add(c);
				}
			}
			fis.close();
		} catch (Exception e) {
			try {
				if (fis != null)
					fis.close();
			} catch (Exception ee) {

			}
			throw new RuntimeException("read codelist file " + f.getAbsolutePath() + "" + e.getMessage(), e);
		}
	}

	@Override
	public void call(ApiData apiData) throws Exception {
		String name = apiData.getStr("name", true);
		String id = apiData.getStr("id", false);

		JsonWriter w = apiData.getJsonWriter();
		if (id != null && id.length() > 0) {
			Codelist cl = selectCodelistItem(name, id);
			if (cl != null)
				cl.toJson(w);
		} else {
			List<Codelist> l = selectCodelist(name);
			if (l != null) {
				w.beginArray();
				for (Codelist cl : l)
					cl.toJson(w);
				w.endArray();
			}
		}
	}

	public List<Codelist> selectCodelist(String name) {
		return codelists.get(name);
	}

	public Codelist selectCodelistItem(String name, String id) {
		if (id == null)
			return null;
		List<Codelist> l = codelists.get(name);
		if (l != null)
			for (Codelist c : l)
				if (id.equals(c.getId()))
					return c;
		return null;
	}
}
