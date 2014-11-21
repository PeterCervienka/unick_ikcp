package com.aston.basex;

import java.io.File;
import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;

public class HtmlDebug {

	private File htmlFile;
	private Document doc;
	private Element body;

	public HtmlDebug(File htmlFile) throws IOException {
		this.htmlFile = htmlFile;
		this.doc = Jsoup.parse(htmlFile, "UTF-8");
		this.body = doc.body();
	}

	public void addScript(String name) {

		if (name.startsWith("*")) {
			String suf = name.substring(1);
			for (File f : htmlFile.getParentFile().listFiles()) {
				if (f.isFile() && f.getName().endsWith(suf))
					addScript(doc, body, f.getName());
			}
		} else if (name.endsWith("*")) {
			String pref = name.substring(0, name.length() - 1);
			for (File f : htmlFile.getParentFile().listFiles()) {
				if (f.isFile() && f.getName().startsWith(pref) && f.getName().endsWith(".js"))
					addScript(doc, body, f.getName());
			}
		} else {
			addScript(doc, body, name);
		}

	}

	@Override
	public String toString() {
		return doc.outerHtml();
	}

	protected void addScript(Document d, Element parent, String src) {
		Element js = d.createElement("script");
		js.attr("src", src);
		parent.appendChild(js);
	}
}
