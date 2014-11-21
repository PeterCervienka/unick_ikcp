package com.aston.utils;

import java.io.IOException;
import java.io.Writer;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;

import javax.xml.bind.DatatypeConverter;

public class XmlWriter {
	private Writer writer = null;
	private boolean insideStartEl = false;

	public XmlWriter(Writer writer) {
		this.writer = writer;
	}

	public void startDocument(String encoding) throws IOException {
		this.writer.write("<?xml version=\"1.0\" encoding=\"" + encoding + "\"?>\n");
	}

	public XmlWriter startEl(String elname) throws IOException {
		this.testInsideStartEl();
		this.writer.write("<");
		this.writer.write(elname);
		this.insideStartEl = true;
		return this;
	}

	public XmlWriter attribute(String name, String value) throws IOException {
		if (value != null) {
			this.writer.write(" ");
			this.writer.write(name);
			this.writer.write("=\"");
			this.writer.write(this.writeEsc(value, true));
			this.writer.write("\"");
		}
		return this;
	}

	public XmlWriter attribute(String name, boolean val) throws IOException {
		return this.attribute(name, DatatypeConverter.printBoolean(val));
	}

	public XmlWriter attribute(String name, int val) throws IOException {
		return this.attribute(name, DatatypeConverter.printInt(val));
	}

	public XmlWriter attribute(String name, long val) throws IOException {
		return this.attribute(name, DatatypeConverter.printLong(val));
	}

	public XmlWriter attribute(String name, double val) throws IOException {
		return this.attribute(name, DatatypeConverter.printDouble(val));
	}

	public XmlWriter attribute(String name, BigDecimal val) throws IOException {
		return this.attribute(name, DatatypeConverter.printDecimal(val));
	}

	public XmlWriter attribute(String name, Date val) throws IOException {
		if (val == null)
			return this.attribute(name, "");
		Calendar c = Calendar.getInstance();
		c.setTime(val);
		return this.attribute(name, DatatypeConverter.printDateTime(c));
	}

	public XmlWriter comment(String text) throws IOException {
		this.testInsideStartEl();
		this.writer.write("<!-- ");
		this.writer.write(this.writeEsc(text, false));
		this.writer.write(" -->");
		return this;
	}

	public XmlWriter text(String text) throws IOException {
		this.testInsideStartEl();
		this.writer.write(this.writeEsc(text, false));
		return this;
	}

	public XmlWriter text(boolean val) throws IOException {
		return this.text(DatatypeConverter.printBoolean(val));
	}

	public XmlWriter text(int val) throws IOException {
		return this.text(DatatypeConverter.printInt(val));
	}

	public XmlWriter text(long val) throws IOException {
		return this.text(DatatypeConverter.printLong(val));
	}

	public XmlWriter text(double val) throws IOException {
		return this.text(DatatypeConverter.printDouble(val));
	}

	public XmlWriter text(BigDecimal val) throws IOException {
		return this.text(DatatypeConverter.printDecimal(val));
	}

	public XmlWriter text(Date val) throws IOException {
		if (val == null)
			return this.text("");
		Calendar c = Calendar.getInstance();
		c.setTime(val);
		return this.text(DatatypeConverter.printDateTime(c));
	}

	public XmlWriter cdata(String text) throws IOException {
		this.testInsideStartEl();
		this.writer.write("<![CDATA[");
		this.writer.write(text);
		this.writer.write("]]>");
		return this;
	}

	public XmlWriter endEl(String elname) throws IOException {
		if (insideStartEl) {
			this.writer.write("/>");
			this.insideStartEl = false;
		} else {
			this.writer.write("</");
			this.writer.write(elname);
			this.writer.write(">");
		}
		return this;
	}

	public XmlWriter println() throws IOException {
		this.writer.write("\r\n");
		return this;
	}

	protected void testInsideStartEl() throws IOException {
		if (this.insideStartEl) {
			this.writer.write(">");
			this.insideStartEl = false;
		}
	}

	protected String writeEsc(String txt, boolean isAttVal) {
		if (txt == null)
			return "";
		StringBuffer sb = new StringBuffer();
		char buf[] = txt.toCharArray();
		int i, max = buf.length;
		for (i = 0; i < max; i++) {
			switch (buf[i]) {
			case '&':
				sb.append("&amp;");
				break;
			case '<':
				sb.append("&lt;");
				break;
			case '>':
				sb.append("&gt;");
				break;
			case '\"':
				if (isAttVal)
					sb.append("&quot;");
				else
					sb.append('"');
				break;
			default:
				if (buf[i] > '\u007f')
					sb.append("&#").append(Integer.toString(buf[i])).append(';');
				else
					sb.append(buf[i]);
			}
		}
		return sb.toString();
	}

	public void flush() throws IOException {
		this.writer.flush();
	}

	public void close() throws IOException {
		this.writer.close();
	}

}
