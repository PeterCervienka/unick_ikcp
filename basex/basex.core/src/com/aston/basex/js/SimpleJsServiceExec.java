package com.aston.basex.js;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import org.mozilla.javascript.BaseFunction;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

import com.aston.utils.StreamHelper;

public class SimpleJsServiceExec implements IJsServiceExec {

	private File rootFile = null;

	@Override
	public void setFile(File rootFile) {
		this.rootFile = rootFile;
	}

	List<Object[]> rootProps = new ArrayList<Object[]>();

	@Override
	public void addRootProperty(String name, Object val) {
		rootProps.add(new Object[] { name, val });
	}

	@Override
	public String exec(String serviceName, String data) throws Exception {

		Context cx = Context.enter();
		Scriptable scope = createRootScope(cx);
		scope.put("__print", scope, new PrintJs());
		for (Object[] row : rootProps)
			scope.put((String) row[0], scope, row[1]);
		String serverjs = StreamHelper.file2String(rootFile, "UTF-8");
		cx.evaluateString(scope, serverjs, rootFile.getName(), 1, null);
		scope.put("_name", scope, serviceName);
		scope.put("_json", scope, data);
		Object res = cx.evaluateString(scope, "_service_exec(_name, _json)", "_service_exec", 1, null);
		Context.exit();

		return res != null ? res.toString() : null;
	}

	private static String[] deleteRootScope = { "java", "javax", "org", "com", "edu", "net", "Packages", "getClass", "JavaAdapter", "JavaImporter", "Continuation" };

	public static Scriptable createRootScope(Context cx) {
		Scriptable scope = cx.initStandardObjects();
		for (String s : deleteRootScope)
			scope.delete(s);
		return scope;
	}

	public static class PrintJs extends BaseFunction {

		private static final long serialVersionUID = 1L;

		@Override
		public Object call(Context cx, Scriptable scope, Scriptable thisObj, Object[] args) {
			if (args != null) {
				for (Object o : args)
					System.out.println(o);
			}
			return null;
		}
	}

}
