package com.aston.basex;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.mail.Session;
import javax.naming.InitialContext;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.ServletException;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;
import javax.sql.DataSource;

import com.aston.basex.api.IApiFunction;
import com.aston.utils.StringHelper;

public class BasexListener implements ServletContextListener, HttpSessionListener {
	@Override
	public void contextDestroyed(ServletContextEvent event) {
	}

	public static AppConfig appConfig(ServletContext context) {
		return (AppConfig) context.getAttribute(AppConfig.class.getName());
	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		try {

			AppConfig appConfig = new AppConfig();
			event.getServletContext().setAttribute(AppConfig.class.getName(), appConfig);

			appConfig.setContext(event.getServletContext());

			String ppath = appConfig.getContext().getRealPath("WEB-INF/application.properties");
			System.out.println("app properties: " + ppath);
			Properties p = loadProperties(ppath);
			appConfig.setProperties(p);

			IBasexConfigFactory configFactory = null;
			String sconfigFactory = appConfig.getProperty("basex.configFactory");
			if (sconfigFactory != null) {
				try {
					Class<?> cl = Thread.currentThread().getContextClassLoader().loadClass(sconfigFactory);
					configFactory = (IBasexConfigFactory) cl.newInstance();
				} catch (Exception ee) {
					throw new ServletException("create configFactoryerror [" + sconfigFactory + "] " + ee.getMessage(), ee);
				}
			}

			if (configFactory != null)
				configFactory.afterLoadProperties(appConfig);

			initProperties(appConfig);

			String dbjndi = appConfig.getProperty("basex.db.jndi");
			if (dbjndi != null) {
				DataSource ds = (DataSource) loadJndi(dbjndi);
				appConfig.setDataSource(ds);
			}

			String mailjndi = appConfig.getProperty("basex.mail.jndi");
			if (mailjndi != null) {
				Session ms = (Session) loadJndi(mailjndi);
				appConfig.setMailSession(ms);
			}

			initApi(appConfig);

			if (configFactory != null)
				configFactory.afterConfig(appConfig);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected void initProperties(AppConfig appConfig) throws ServletException, IOException {

		Properties p = appConfig.getProperties();

		String envs = p.getProperty("basex.env.copy");
		if (envs != null) {
			for (String k : StringHelper.tokenizeTrimString(envs, ",")){
                String v = System.getenv(k);
                if(v!=null)
                    p.setProperty(k, v);
            }
		}

		String sysprops = p.getProperty("basex.sysprop.copy");
		if (sysprops != null) {
			for (String k : StringHelper.tokenizeTrimString(sysprops, ",")) {
                String v = System.getProperty(k);
                if (v != null)
                    p.setProperty(k, v);
            }
		}

		for (Map.Entry<Object, Object> e : p.entrySet()) {
			String v = parseStringValue((String) e.getValue(), p);
			if (v != null) {
				p.put(e.getKey(), v);
				System.out.println("rewrite app property[" + e.getKey() + "] to " + v);
			}
		}

        String sdataDir = p.getProperty("basex.data.dir");
        if (sdataDir != null) {
            File fd = new File(sdataDir);
            if (fd.exists()) {
                appConfig.setDataDir(fd.getCanonicalFile());
            }
        }
        if (appConfig.getDataDir() == null)
            throw new ServletException("basex.data.dir not exists " + sdataDir);

    }

	public static String parseStringValue(String strVal, Properties props) throws IOException {

		StringBuffer buf = new StringBuffer();
		int last = 0;
		while (true) {
			int startIndex = strVal.indexOf("${");
			if (startIndex < 0) {
				if (last == 0)
					return null;
				break;
			}
			int endIndex = strVal.indexOf("}", startIndex);
			if (endIndex < startIndex)
				break;
			String placeholder = strVal.substring(startIndex + 2, endIndex);
			String propVal = props.getProperty(placeholder);
			if (propVal == null)
				throw new IOException("Could not resolve placeholder '" + placeholder + "'");
			buf.append(strVal.substring(last, startIndex));
			buf.append(propVal);
			last = endIndex + 1;
			startIndex = strVal.indexOf("${", endIndex);
			if (startIndex < 0)
				break;
		}
		buf.append(strVal.substring(last));
		return buf.toString();
	}

	public static final String API_PROP_PREF = "api.";

	protected void initApi(AppConfig appConfig) throws ServletException {

		// load api by priority
		String spriority = appConfig.getProperty("api_priority");
		if (spriority != null) {
			for (String s : StringHelper.tokenizeTrimString(spriority, ",")) {
				String key = API_PROP_PREF + s;
				String clazz = appConfig.getProperty(key);
				if (clazz == null)
					throw new ServletException("api priority name [" + s + "] is undefined");
				loadApi(appConfig, key, clazz);
			}
		}

		// load other api
		for (Enumeration<Object> e = appConfig.getProperties().keys(); e.hasMoreElements();) {
			String key = (String) e.nextElement();
			String clazz = appConfig.getProperties().getProperty(key);
			if (key.startsWith(API_PROP_PREF)) {
				loadApi(appConfig, key, clazz);
			}
		}
	}

	protected void loadApi(AppConfig appConfig, String key, String clazz) throws ServletException {

		String name = key.substring(API_PROP_PREF.length());
		// load api only one
		if (appConfig.getApis().containsKey(name))
			return;

		try {
			Class<?> cl = Thread.currentThread().getContextClassLoader().loadClass(clazz);
			IApiFunction f = (IApiFunction) cl.newInstance();
			f.init(appConfig, name);
			appConfig.setApi(name, f);
		} catch (Exception ee) {
			throw new ServletException("create api function error [" + key + "=" + clazz + "] " + ee.getMessage(), ee);
		}
	}

	private static final String SESSION_FILES = "session.files.delete";

	@SuppressWarnings("unchecked")
	public static void addSessionFile(HttpSession session, File f) {
		if (f == null)
			return;
		List<File> files = (List<File>) session.getAttribute(SESSION_FILES);
		if (files == null) {
			files = new ArrayList<File>();
			session.setAttribute(SESSION_FILES, files);
		}
		files.add(f);
	}

	@Override
	public void sessionCreated(HttpSessionEvent event) {
	}

	@SuppressWarnings("unchecked")
	@Override
	public void sessionDestroyed(HttpSessionEvent event) {
		List<File> files = (List<File>) event.getSession().getAttribute(SESSION_FILES);
		if (files != null)
			for (File f : files)
				f.delete();
	}

	public static Properties loadProperties(String fname) throws ServletException {
		File f = new File(fname);
		if (!f.exists())
			throw new ServletException("properties file not found: " + f.getPath());

		Properties p = new Properties();
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(f);
			p.load(fis);
			fis.close();
		} catch (IOException e) {
			if (fis != null) {
				try {
					fis.close();
				} catch (Exception ee) {
				}
			}
			throw new ServletException("properties load file [" + f.getPath() + "]" + e.getMessage(), e);
		}
		return p;
	}

	public static Object loadJndi(String jndi) throws Exception {
		InitialContext cxt = new InitialContext();
		Object o = cxt.lookup("java:/comp/env/" + jndi);
		if (o == null)
			throw new Exception("Data source not found: " + jndi);
		return o;
	}

}
