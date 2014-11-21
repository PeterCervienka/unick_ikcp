package com.aston.api;

import java.io.File;

import com.aston.basex.AppConfig;
import com.aston.basex.api.AApiFunction;
import com.aston.basex.api.ApiData;

public class CreatePdfApi extends AApiFunction {

	protected PdfCreator pdfCreator = null;

	@Override
	public void init(AppConfig config, String name) {
		super.init(config, name);

		String tplDir = getProperty(name + ".dir");
		if (tplDir == null)
			tplDir = "WEB-INF/pdf/";
		this.pdfCreator = new PdfCreator(new File(config.getContext().getRealPath(tplDir)));
	}

	@Override
	public void call(ApiData apiData) throws Exception {

		String name = apiData.getStr("name", true);
		String template = apiData.getStr("template", true);
		String xml = apiData.getStr("data", true);

		if (xml.startsWith("@")) {
			byte[] bxml = getConfig().getDocStorage().loadDoc(apiData.getSession(), xml.substring(1));
			if (bxml == null)
				throw new Exception("undefined file " + xml);
			xml = new String(bxml, "utf-8");
		}

		try {
			byte[] pdf = pdfCreator.createPdf(xml.getBytes("utf-8"), template);
			getConfig().getDocStorage().saveDoc(apiData.getSession(), name, pdf);
			apiData.write(ApiData.MIME_TEXT, "\"" + name + "\"");
		} catch (Exception e) {
			throw new Exception("create pdf error " + e.getMessage(), e);
		}
	}
}
