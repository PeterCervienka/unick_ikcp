package com.aston.api.mail;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.mail.util.ByteArrayDataSource;

public class MailFactory {

	public static class MailData {
		List<String> mailTo = new ArrayList<String>();
		String replyTo = null;
		String subject = null;
		String body = null;
		List<AttInfo> attInfos = new ArrayList<AttInfo>();
		boolean html = false;

		public void addMailTo(String mail) {
			mailTo.add(mail);
		}

		public void setReplyTo(String replyTo) {
			this.replyTo = replyTo;
		}

		public void setSubject(String subject) {
			this.subject = subject;
		}

		public void setBody(String body) {
			this.body = body;
		}

		public void setBody(File template, Object data) {

		}

		public void addAtt(String fileName, String mimeType, byte[] content) {
			attInfos.add(new AttInfo(fileName, mimeType, content, null));
		}

		public void addAtt(String fileName, File f) {
			attInfos.add(new AttInfo(fileName, null, null, f));
		}

		public void setHtml(boolean html) {
			this.html = html;
		}
	}

	private static class AttInfo {
		String fileName;
		String mimeType;
		byte[] content;
		File file;

		public AttInfo(String fileName, String mimeType, byte[] content, File file) {
			this.fileName = fileName;
			this.mimeType = mimeType;
			this.content = content;
			this.file = file;
		}
	}

	public void sendMail(MailData mailData) throws Exception {
		try {
			// create a message
			MimeMessage msg = new MimeMessage(session);
			msg.setFrom(new InternetAddress(mailFrom));
			InternetAddress[] addressTo = new InternetAddress[mailData.mailTo.size()];
			for (int i = 0; i < mailData.mailTo.size(); i++) {
				addressTo[i] = new InternetAddress(mailData.mailTo.get(i));
			}
			msg.setRecipients(Message.RecipientType.TO, addressTo);
			if (mailData.replyTo != null)
				msg.setReplyTo(new InternetAddress[] { new InternetAddress(mailData.replyTo) });

			msg.setSubject(mailData.subject, "UTF-8");

			// create and fill the first message part
			MimeBodyPart mbp1 = new MimeBodyPart();

			if (mailData.html) {
				mbp1.setContent(mailData.body, "text/html; charset=\"utf-8\"");
				mbp1.addHeader("MIME-Version", "1.0");
			} else {
				mbp1.setText(mailData.body);
			}

			// create the Multipart and add its parts to it
			Multipart mp = new MimeMultipart();
			mp.addBodyPart(mbp1);

			if (mailData.attInfos != null) {
				for (AttInfo ai : mailData.attInfos) {
					// create the second message part
					MimeBodyPart mbpa = new MimeBodyPart();

					if (ai.content != null) {
						// attach the byte[] to the message
						ByteArrayDataSource ds = new ByteArrayDataSource(ai.content, ai.mimeType);
						mbpa.setDataHandler(new DataHandler(ds));
						mbpa.setFileName(ai.fileName);
						mp.addBodyPart(mbpa);
					}
					if (ai.file != null) {
						// attach the byte[] to the message
						FileDataSource ds = new FileDataSource(ai.file);
						mbpa.setDataHandler(new DataHandler(ds));
						mbpa.setFileName(ai.fileName != null ? ai.fileName : ai.file.getName());
						mp.addBodyPart(mbpa);
					}
				}
			}

			// add the Multipart to the message
			msg.setContent(mp);

			// set the Date: header
			msg.setSentDate(new Date());

			// send the message
			Transport.send(msg);

		} catch (MessagingException mex) {
			Exception ex = null;
			if ((ex = mex.getNextException()) != null) {
				ex.printStackTrace();
			}
			throw new Exception("mail send error: " + mex.getMessage(), mex);
		}
	}

	private Session session;

	private String mailFrom;

	public void setSession(Session session) {
		this.session = session;
	}

	public void setMailFrom(String mailFrom) {
		this.mailFrom = mailFrom;
	}
}
