package com.aston.api;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStream;

import javax.xml.transform.Result;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.sax.SAXResult;
import javax.xml.transform.stream.StreamSource;

import org.apache.fop.apps.FOUserAgent;
import org.apache.fop.apps.Fop;
import org.apache.fop.apps.FopFactory;
import org.apache.fop.apps.MimeConstants;

import com.aston.utils.StreamHelper;

public class PdfCreator
{
	private File configDir;

	public PdfCreator(File configDir)
	{
		this.configDir = configDir;
	}

	public byte[] createPdf(byte[] xml, String template) throws Exception
	{
		ByteArrayOutputStream bos = new ByteArrayOutputStream();

		try
		{
			OutputStream out = new java.io.BufferedOutputStream(bos);

			FopFactory fopFactory = FopFactory.newInstance();
			FOUserAgent foUserAgent = fopFactory.newFOUserAgent();
			foUserAgent.setBaseURL(configDir.toURI().toString());

			fopFactory.getFontManager().setFontBaseURL(configDir.toURI().toString());
			fopFactory.setUserConfig(new File(configDir, "fop.xml"));
			Fop fop = fopFactory.newFop(MimeConstants.MIME_PDF, foUserAgent, out);

			TransformerFactory factory = TransformerFactory.newInstance();

			Transformer transformer = factory.newTransformer(new StreamSource(new File(configDir, template)));
			Source src = new StreamSource(new ByteArrayInputStream(xml));
			Result res = new SAXResult(fop.getDefaultHandler());
			transformer.transform(src, res);
			out.close();
		}
		catch(Exception e)
		{
			throw new Exception("create pdf error: " + e.getMessage(), e);
		}
		return bos.toByteArray();
	}

	public static void main(String[] args)
	{
		try
		{
			String path = "../unickm.kcpuz/war/WEB-INF/pdf";

			File f = new File(path + "/cz_kcp.xml");
			byte[] xml = StreamHelper.file2bytea(f);

			PdfCreator c = new PdfCreator(new File(path));
			byte[] out = c.createPdf(xml, "cz_kcp.xslt");

			FileOutputStream fos = new FileOutputStream("out.pdf");
			fos.write(out);
			fos.close();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}

	}
}
