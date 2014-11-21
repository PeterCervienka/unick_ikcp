package com.aston.api;

import java.io.File;
import java.io.FileOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import com.aston.basex.AppConfig;
import com.aston.basex.api.AApiFunction;
import com.aston.basex.api.ApiData;

public class SaveAsZipApi extends AApiFunction {

	protected File zipDir = null;

	@Override
	public void init(AppConfig config, String name) {
		super.init(config, name);
		String sdir = config.getProperty(name + ".dir");
		if (sdir == null)
			throw new RuntimeException("undefined property SaveAgreementZipApi.dir");
		this.zipDir = new File(sdir);
		if (!zipDir.exists() && !zipDir.isDirectory())
			throw new RuntimeException("undefined dir " + sdir);
	}

	@Override
	public void call(ApiData apiData) throws Exception {

		String vs = apiData.getStr("vs", true);
		String[] docs = apiData.getStrArr("docs");

		File f = new File(zipDir, vs + ".zip");
		FileOutputStream fos = new FileOutputStream(f);
		ZipOutputStream zos = new ZipOutputStream(fos);
		for (String doc : docs) {
			byte[] content = getConfig().getDocStorage().loadDoc(apiData.getSession(), doc);
			if (content == null)
				System.out.println("--undefined file content " + doc);
			zos.putNextEntry(new ZipEntry(doc));
			zos.write(content);
			zos.closeEntry();
		}
		zos.finish();
		zos.close();
		apiData.write(ApiData.MIME_JSON, "\""+f.getName()+"\"");

		System.out.println("save agreement to zip " + f.getAbsolutePath());
	}
}
