package com.aston.api;

import com.aston.basex.AppConfig;
import com.aston.basex.api.AApiFunction;
import com.aston.basex.api.ApiData;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.Reader;

/**
 * Created by Peter Cervienka on 10.10.2014.
 */
public class CreateJsonApi extends AApiFunction {

    protected File configDir = null;

    @Override
    public void init(AppConfig config, String name) {
        super.init(config, name);

        String tplDir = getProperty(name + ".dir");
        if (tplDir == null)
            tplDir = "WEB-INF/xml/";

        configDir = new File(config.getContext().getRealPath(tplDir));
    }

    @Override
    public void call(ApiData apiData) throws Exception {
        String template = apiData.getStr("template", true);

        StringBuffer xml = new StringBuffer();
        Reader reader = new InputStreamReader(new FileInputStream(
                new File(configDir, template)), "utf-8");
        try {
            char[] ch = new char[1024];
            int len = 0;
            while ((len = reader.read(ch)) != -1) {
                xml.append(ch, 0, len);
            }

            String json = org.json.XML.toJSONObject(xml.toString()).toString();
            apiData.write(ApiData.MIME_JSON, json);
        }catch (Exception e) {
            throw new Exception("generate JSON from XML error: " + e.getMessage(), e);
        } finally {
            reader.close();
        }

    }
}
