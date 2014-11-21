package com.aston.basex.api;

import java.io.Writer;
import java.util.List;

public interface ICodelistStorage {

	public void selectCodelistJson(String name, Writer writer);

	public List<Codelist> selectCodelist(String name);

	public Codelist selectCodelistItem(String name, String id);
}
