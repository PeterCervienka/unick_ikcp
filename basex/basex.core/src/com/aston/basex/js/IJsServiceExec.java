package com.aston.basex.js;

import java.io.File;

public interface IJsServiceExec {

	void setFile(File f);

	void addRootProperty(String name, Object val);

	String exec(String serviceName, String data) throws Exception;
}
