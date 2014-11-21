package com.aston.basex.api;

import java.io.IOException;

import javax.servlet.http.HttpSession;

public interface IDocStorage {

	void saveDoc(HttpSession session, String name, byte[] content) throws IOException;

	byte[] loadDoc(HttpSession session, String name) throws IOException;
}
