package com.aston.api;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.servlet.http.HttpSession;

import com.aston.basex.AppConfig;
import com.aston.basex.BasexListener;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.IApiFunction;
import com.aston.basex.api.IDocStorage;
import com.aston.utils.StreamHelper;

public class LoadDocApi implements IApiFunction, IDocStorage {

	@Override
	public void init(AppConfig config, String name) {
	}

	@Override
	public void call(ApiData apiData) {
	}

	@Override
	public void saveDoc(HttpSession session, String name, byte[] content) throws IOException {

		File f = File.createTempFile("doc", ".bin");
		String key = "doc:" + name;
		session.setAttribute(key, f);
		BasexListener.addSessionFile(session, f);
		System.out.println("savedoc " + name + " " + f.getAbsolutePath());

		FileOutputStream fos = new FileOutputStream(f);
		fos.write(content);
		fos.close();
	}

	@Override
	public byte[] loadDoc(HttpSession session, String name) throws IOException {
		String key = "doc:" + name;
		File f = (File) session.getAttribute(key);
		if (f == null || !f.exists())
			return null;
		return StreamHelper.file2bytea(f);
	}
}
