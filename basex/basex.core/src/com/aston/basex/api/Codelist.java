package com.aston.basex.api;

import java.io.IOException;

import com.google.gson.stream.JsonWriter;

public class Codelist {

	private String id;
	private String text;
	private String note;

	public Codelist(String id, String text, String note) {
		this.id = id;
		this.text = text;
		this.note = note;
	}

	public Codelist(String id, String text) {
		this.id = id;
		this.text = text;
		this.note = null;
	}

	public String getId() {
		return id;
	}

	public String getText() {
		return text;
	}

	public String getNote() {
		return note;
	}

	public void toJson(JsonWriter w) throws IOException {
		w.beginObject();
		w.name("id").value(id);
		w.name("text").value(text);
		if (note != null)
			w.name("note").value(note);
		w.endObject();
	}
}
