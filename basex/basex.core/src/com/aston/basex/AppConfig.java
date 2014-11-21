package com.aston.basex;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import javax.mail.Session;
import javax.servlet.ServletContext;
import javax.sql.DataSource;

import com.aston.basex.api.IApiFunction;
import com.aston.basex.api.IDocStorage;

public class AppConfig {

	private ServletContext context;
	private Properties properties;
	private File dataDir;
	private DataSource dataSource;
	private Session mailSession;
	private IDocStorage docStorage;
	private Map<String, IApiFunction> apis = new HashMap<String, IApiFunction>();

	public ServletContext getContext() {
		return context;
	}

	public void setContext(ServletContext context) {
		this.context = context;
	}

	public Properties getProperties() {
		return properties;
	}

	public String getProperty(String name) {
		return properties.getProperty(name);
	}

	public void setProperties(Properties applicationProperties) {
		this.properties = applicationProperties;
	}

	public File getDataDir() {
		return dataDir;
	}

	public void setDataDir(File dataDir) {
		this.dataDir = dataDir;
	}

	public DataSource getDataSource() {
		return dataSource;
	}

	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public Session getMailSession() {
		return mailSession;
	}

	public IDocStorage getDocStorage() {
		return docStorage;
	}

	public void setMailSession(Session mailSession) {
		this.mailSession = mailSession;
	}

	public void setApi(String name, IApiFunction f) {
		apis.put(name, f);
		if (f instanceof IDocStorage)
			this.docStorage = (IDocStorage) f;
	}

	public Map<String, IApiFunction> getApis() {
		return apis;
	}
}
