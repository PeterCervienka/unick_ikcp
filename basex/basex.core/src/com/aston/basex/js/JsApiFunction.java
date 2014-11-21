package com.aston.basex.js;

import java.io.StringWriter;
import java.util.Map;

import org.mozilla.javascript.BaseFunction;
import org.mozilla.javascript.Context;
import org.mozilla.javascript.JavaScriptException;
import org.mozilla.javascript.Scriptable;

import com.aston.basex.BasexServiceServlet;
import com.aston.basex.api.ApiData;
import com.aston.basex.api.IApiFunction;

public class JsApiFunction extends BaseFunction {

	private static final long serialVersionUID = 1L;
	private Map<String, IApiFunction> apis;

	public JsApiFunction(Map<String, IApiFunction> apis) {
		this.apis = apis;
	}

	@Override
	public Object call(Context cx, Scriptable scope, Scriptable thisObj, Object[] args) {
		if (args == null || args.length == 0 || args[0] == null)
			throw new JavaScriptException("empty arguments in api function", "JsApiFunction", 1);
		String name = Context.toString(args[0]);
		IApiFunction f = apis.get(name);
		if (f == null)
			throw new JavaScriptException("undefined api " + name, "JsApiFunction", 1);

		StringWriter sw = new StringWriter();
		try {
			String sjson = args.length > 1 ? Context.toString(args[1]) : null;
			f.call(new ApiData(BasexServiceServlet.sessionThreadLocal.get(), sjson, sw));
		} catch (Exception e) {
			throw new JavaScriptException("[" + name + "]" + e.getMessage(), "JsApiFunction", 1);
		}
		return sw.toString();
	}
}
