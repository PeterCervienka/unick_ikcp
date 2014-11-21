package com.aston.basex;

public interface IBasexConfigFactory {

	public void afterLoadProperties(AppConfig appConfig);

	public void afterConfig(AppConfig appConfig);
}
