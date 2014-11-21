package com.aston.basex.js;

import java.io.File;
import java.io.IOException;

import org.mozilla.javascript.BaseFunction;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.Scriptable;

import com.aston.utils.StreamHelper;

public class LoadFunction extends BaseFunction {

	private static final long serialVersionUID = 1L;
	private File rootDir;

	public LoadFunction(File rootDir) throws IOException {
		this.rootDir = rootDir.getCanonicalFile();
	}

	@Override
	public Object call(Context cx, Scriptable scope, Scriptable thisObj, Object[] args) {
		if (args == null || args.length == 0 || args[0] == null) {
			System.out.println("empty arguments");
			return null;
		}
		String name = args[0].toString();

		File f = new File(rootDir, name);

		try {
			if (!f.getCanonicalFile().getAbsolutePath().startsWith(rootDir.getAbsolutePath())) {
				throw new Exception("outside root path " + rootDir.getPath());
			}
			if (!f.exists()) {
				throw new Exception("file not found " + f.getPath());
			}

			String js = StreamHelper.file2String(f, "UTF-8");
			cx.evaluateString(scope, js, f.getName(), 1, null);

		} catch (Exception ex) {
			System.out.println("load " + ex.getMessage());
			return null;
		}

		return null;
	}
}
