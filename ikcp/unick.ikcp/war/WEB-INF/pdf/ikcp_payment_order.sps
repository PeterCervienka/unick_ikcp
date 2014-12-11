<?xml version="1.0" encoding="UTF-8"?>
<structure version="16" xsltversion="1" html-doctype="HTML4 Transitional" compatibility-view="IE9" relativeto="*SPS" encodinghtml="UTF-8" encodingrtf="ISO-8859-1" encodingpdf="UTF-8" useimportschema="1" embed-images="1" enable-authentic-scripts="1" authentic-scripts-in-debug-mode-external="0" generated-file-location="DEFAULT">
	<parameters/>
	<schemasources>
		<namespaces/>
		<schemasources>
			<xsdschemasource name="XML" main="1" schemafile="ikcp.xsd" workingxmlfile="ikcp.xml"/>
		</schemasources>
	</schemasources>
	<modules/>
	<flags>
		<scripts/>
		<mainparts/>
		<globalparts/>
		<designfragments/>
		<pagelayouts/>
		<xpath-functions/>
	</flags>
	<scripts>
		<script language="javascript"/>
	</scripts>
	<script-project>
		<Project version="2" app="AuthenticView"/>
	</script-project>
	<importedxslt/>
	<globalstyles/>
	<mainparts>
		<children>
			<globaltemplate subtype="main" match="/">
				<document-properties/>
				<styles font-family="Arial" font-size="14px" font-weight="normal"/>
				<children>
					<documentsection>
						<properties columngap="0.50in" headerfooterheight="fixed" pagemultiplepages="0" pagenumberingformat="1" pagenumberingstartat="auto" pagestart="next" paperheight="11.69in" papermarginbottom="0.2in" papermarginbottom-last="0.3in" papermarginfooter="0.0in" papermarginheader="0.0in" papermarginleft="0.40in" papermarginright="0.40in" papermargintop="1in" papermargintop-last="0.3in" paperwidth="8.27in"/>
						<children>
							<globaltemplate subtype="pagelayout" match="headerfirst"/>
						</children>
						<watermark>
							<image transparency="50" fill-page="1" center-if-not-fill="1"/>
							<text transparency="50"/>
						</watermark>
					</documentsection>
					<template subtype="source" match="XML">
						<children>
							<template subtype="element" match="agreement">
								<children>
									<paragraph paragraphtag="h4">
										<styles color="#D8002C" margin="0px" text-align="center"/>
										<children>
											<text fixtext="POŽIADAVKA NA PLATBU POISTNÉHO"/>
										</children>
									</paragraph>
									<paragraph>
										<styles line-height="16px"/>
										<children>
											<text fixtext="na základe poistnej zmluvy č. ">
												<styles font-size="14px"/>
											</text>
											<template subtype="element" match="variableSymbol">
												<children>
													<content subtype="regular">
														<styles font-size="14px" line-height="100%"/>
														<format basic-type="xsd" datatype="int"/>
													</content>
												</children>
												<variables/>
											</template>
											<text fixtext=" o individuálnom komplexnom cestovnom poistení Vás týmto žiadame o úhradu poistného: ">
												<styles font-size="14px"/>
											</text>
										</children>
									</paragraph>
									<newline/>
									<tgrid>
										<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
										<styles font-size="14px"/>
										<children>
											<tgridbody-cols>
												<children>
													<tgridcol>
														<properties width="20%"/>
													</tgridcol>
													<tgridcol>
														<properties width="36%"/>
													</tgridcol>
													<tgridcol>
														<properties valign="top" width="22%"/>
													</tgridcol>
													<tgridcol>
														<properties valign="top" width="22%"/>
													</tgridcol>
												</children>
											</tgridbody-cols>
											<tgridbody-rows>
												<children>
													<tgridrow>
														<children>
															<tgridcell>
																<styles padding-bottom="1px" padding-top="1px"/>
																<children>
																	<text fixtext="SUMA k úhrade"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<template subtype="element" match="totalPrice">
																		<children>
																			<content subtype="regular">
																				<styles font-size="14px" font-weight="bold"/>
																				<format basic-type="xsd" string="###,##0.00" datatype="decimal"/>
																			</content>
																		</children>
																		<variables/>
																	</template>
																	<text fixtext=" EUR">
																		<styles font-weight="bold"/>
																	</text>
																</children>
															</tgridcell>
															<tgridcell joinleft="1"/>
															<tgridcell joinleft="1"/>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<children>
																	<text fixtext="účet číslo "/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<text fixtext="6600547090/1111">
																		<styles font-weight="bold"/>
																	</text>
																	<text fixtext=", IBAN SK59 1111 0000 0066 0054 7090, BIC UNCRSKBX"/>
																</children>
															</tgridcell>
															<tgridcell joinleft="1"/>
															<tgridcell joinleft="1"/>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<properties valign="top"/>
																<children>
																	<text fixtext="banka "/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<text fixtext="UniCredit Bank Czech Republic and Slovakia, a.s., organizačná zložka: UniCredit Bank Czech Republic and Slovakia, a.s., pobočka zahraničnej banky"/>
																</children>
															</tgridcell>
															<tgridcell joinleft="1"/>
															<tgridcell joinleft="1"/>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell>
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell>
																<styles padding-bottom="1px" padding-top="10px"/>
															</tgridcell>
															<tgridcell>
																<styles padding-bottom="1px" padding-top="10px"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<properties valign="top"/>
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell>
																<properties valign="top"/>
																<styles padding-bottom="1px" padding-top="1px"/>
																<children>
																	<newline/>
																</children>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<properties valign="top"/>
																<styles padding-bottom="1px" padding-top="1px"/>
																<children>
																	<text fixtext="	"/>
																</children>
															</tgridcell>
															<tgridcell>
																<properties valign="top"/>
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<properties valign="top"/>
																<styles padding-bottom="1px" padding-top="1px"/>
																<children>
																	<text fixtext="variabilný symbol">
																		<styles font-weight="normal"/>
																	</text>
																</children>
															</tgridcell>
															<tgridcell>
																<properties valign="top"/>
																<styles padding-bottom="1px" padding-top="1px"/>
																<children>
																	<template subtype="element" match="variableSymbol">
																		<children>
																			<content subtype="regular">
																				<styles font-size="14px"/>
																				<format basic-type="xsd" datatype="int"/>
																			</content>
																		</children>
																		<variables/>
																	</template>
																</children>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<properties valign="top"/>
																<styles padding-bottom="1px" padding-top="1px"/>
																<children>
																	<text fixtext="konštantný symbol"/>
																</children>
															</tgridcell>
															<tgridcell>
																<properties valign="top"/>
																<styles padding-bottom="1px" padding-top="1px"/>
																<children>
																	<text fixtext="3558"/>
																</children>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<properties valign="top"/>
																<styles padding-bottom="1px" padding-top="1px"/>
																<children>
																	<text fixtext="dátum vystavenia požiadavky na platbu"/>
																</children>
															</tgridcell>
															<tgridcell>
																<properties valign="top"/>
																<styles padding-bottom="1px" padding-top="1px" vertical-align="bottom"/>
																<children>
																	<template subtype="element" match="signingDate">
																		<children>
																			<template subtype="attribute" match="sk">
																				<children>
																					<content subtype="regular"/>
																				</children>
																				<variables/>
																			</template>
																		</children>
																		<variables/>
																	</template>
																</children>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<properties valign="top"/>
																<styles padding-bottom="1px" padding-top="1px"/>
																<children>
																	<text fixtext="dátum splatnosti"/>
																</children>
															</tgridcell>
															<tgridcell>
																<properties valign="top"/>
																<styles padding-bottom="1px" padding-top="1px"/>
																<children>
																	<template subtype="element" match="insuredFrom">
																		<children>
																			<template subtype="attribute" match="sk">
																				<children>
																					<content subtype="regular"/>
																				</children>
																				<variables/>
																			</template>
																		</children>
																		<variables/>
																	</template>
																</children>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell>
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
															<tgridcell joinabove="1">
																<styles padding-bottom="1px" padding-top="1px"/>
															</tgridcell>
														</children>
													</tgridrow>
												</children>
											</tgridbody-rows>
										</children>
									</tgrid>
									<tgrid>
										<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
										<styles font-size="14px"/>
										<children>
											<tgridbody-cols>
												<children>
													<tgridcol>
														<properties width="20%"/>
													</tgridcol>
													<tgridcol>
														<properties width="40%"/>
													</tgridcol>
													<tgridcol>
														<properties width="40%"/>
													</tgridcol>
												</children>
											</tgridbody-cols>
											<tgridbody-rows>
												<children>
													<tgridrow>
														<children>
															<tgridcell>
																<styles padding-bottom="10px" padding-top="3px"/>
																<children>
																	<text fixtext="Ďalšie bankové účty pre úhradu poistného (pre prípad potreby):">
																		<styles font-weight="bold"/>
																	</text>
																</children>
															</tgridcell>
															<tgridcell joinleft="1"/>
															<tgridcell>
																<styles padding-bottom="10px" padding-top="3px"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<children>
																	<text fixtext="VÚB banka:"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<text fixtext="0008533012 / 0200, SK93 0200 0000 0000 0853 3012, SUBASKBX "/>
																</children>
															</tgridcell>
															<tgridcell joinleft="1">
																<styles text-align="left"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<children>
																	<text fixtext="Tatra banka:"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<text fixtext="2627080680 / 1100, SK82 1100 0000 0026 2708 0680, TATRSKBX"/>
																</children>
															</tgridcell>
															<tgridcell joinleft="1">
																<styles text-align="left"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<styles height="0,11in"/>
														<children>
															<tgridcell>
																<children>
																	<text fixtext="ČSOB"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<text fixtext="0002830243 / 7500, SK20 7500 0000 0000 0283 0243, CEKOSKBX"/>
																</children>
															</tgridcell>
															<tgridcell joinleft="1">
																<styles text-align="left"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<children>
																	<text fixtext="Slovenská sporiteľna"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<text fixtext="0174237753 / 0900, SK46 0900 0000 0001 7423 7753, GIBASKBX"/>
																</children>
															</tgridcell>
															<tgridcell joinleft="1">
																<styles text-align="left"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<children>
																	<text fixtext="Poštová banka"/>
																</children>
															</tgridcell>
															<tgridcell>
																<children>
																	<text fixtext="0020199619 / 6500, SK17 6500 0000 0000 2019 9619, POBNSKBA"/>
																</children>
															</tgridcell>
															<tgridcell joinleft="1">
																<styles text-align="left"/>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<styles padding-top="25px"/>
																<children>
																	<text fixtext="Ďakujeme Vám za včasné poukázanie platby.">
																		<styles font-size="14px"/>
																	</text>
																</children>
															</tgridcell>
															<tgridcell joinleft="1"/>
															<tgridcell>
																<styles padding-top="25px" text-align="left"/>
																<children>
																	<text fixtext="S pozdravom ">
																		<styles font-size="14px"/>
																	</text>
																	<text fixtext="Union poisťovňa, a.s."/>
																	<newline/>
																</children>
															</tgridcell>
														</children>
													</tgridrow>
												</children>
											</tgridbody-rows>
										</children>
									</tgrid>
									<text fixtext="---------------------------------------------------------------------------------------------------------------------------------------"/>
									<newline/>
									<paragraph>
										<styles font-size="14px" font-weight="bold" margin="0px" padding="0px" text-align="left"/>
										<children>
											<text fixtext="Príkaz na úhradu"/>
										</children>
									</paragraph>
									<tgrid>
										<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
										<styles font-size="14px"/>
										<children>
											<tgridbody-cols>
												<children>
													<tgridcol>
														<properties width="45%"/>
													</tgridcol>
													<tgridcol>
														<properties width="55%"/>
													</tgridcol>
												</children>
											</tgridbody-cols>
											<tgridbody-rows>
												<children>
													<tgridrow>
														<children>
															<tgridcell>
																<styles padding-top="5px"/>
																<children>
																	<text fixtext="Príkazca">
																		<styles font-size="14px" font-weight="bold"/>
																	</text>
																</children>
															</tgridcell>
															<tgridcell>
																<styles padding-top="5px"/>
																<children>
																	<text fixtext="Príjemca">
																		<styles font-size="14px" font-weight="bold"/>
																	</text>
																</children>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<styles padding-left="0px" vertical-align="top"/>
																<children>
																	<tgrid>
																		<properties border="0" cellpadding="3" cellspacing="0" width="80%"/>
																		<styles font-family="Arial"/>
																		<children>
																			<tgridbody-cols>
																				<children>
																					<tgridcol>
																						<properties width="65%"/>
																					</tgridcol>
																					<tgridcol>
																						<properties width="35%"/>
																						<styles border="1px solid black"/>
																					</tgridcol>
																				</children>
																			</tgridbody-cols>
																			<tgridbody-rows>
																				<children>
																					<tgridrow>
																						<children>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="číslo účtu"/>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="kód banky"/>
																								</children>
																							</tgridcell>
																						</children>
																					</tgridrow>
																					<tgridrow>
																						<children>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<newline/>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<newline/>
																								</children>
																							</tgridcell>
																						</children>
																					</tgridrow>
																				</children>
																			</tgridbody-rows>
																		</children>
																	</tgrid>
																</children>
															</tgridcell>
															<tgridcell>
																<styles padding-right="0px" vertical-align="top"/>
																<children>
																	<tgrid>
																		<properties border="0" cellpadding="3" cellspacing="0" width="100%"/>
																		<children>
																			<tgridbody-cols>
																				<children>
																					<tgridcol>
																						<properties width="55%"/>
																					</tgridcol>
																					<tgridcol>
																						<properties width="45%"/>
																					</tgridcol>
																				</children>
																			</tgridbody-cols>
																			<tgridbody-rows>
																				<children>
																					<tgridrow>
																						<children>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="číslo účtu">
																										<styles font-size="14px"/>
																									</text>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="kód banky">
																										<styles font-size="14px"/>
																									</text>
																								</children>
																							</tgridcell>
																						</children>
																					</tgridrow>
																					<tgridrow>
																						<children>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="6600547090">
																										<styles font-size="14px" font-weight="bold"/>
																									</text>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="1111">
																										<styles font-size="14px" font-weight="bold"/>
																									</text>
																								</children>
																							</tgridcell>
																						</children>
																					</tgridrow>
																				</children>
																			</tgridbody-rows>
																		</children>
																	</tgrid>
																</children>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell/>
															<tgridcell>
																<styles padding-top="10px"/>
																<children>
																	<text fixtext="Symboly platby">
																		<styles font-size="14px" font-weight="bold"/>
																	</text>
																</children>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<styles padding-left="0px" vertical-align="top"/>
																<children>
																	<tgrid>
																		<properties border="0" cellpadding="3" cellspacing="0" width="80%"/>
																		<children>
																			<tgridbody-cols>
																				<children>
																					<tgridcol>
																						<properties width="34%"/>
																					</tgridcol>
																					<tgridcol>
																						<properties width="33%"/>
																					</tgridcol>
																					<tgridcol>
																						<properties width="33%"/>
																					</tgridcol>
																				</children>
																			</tgridbody-cols>
																			<tgridbody-rows>
																				<children>
																					<tgridrow>
																						<children>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="čiastka">
																										<styles font-size="14px"/>
																									</text>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="mena">
																										<styles font-size="14px"/>
																									</text>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="splatnosť">
																										<styles font-size="14px"/>
																									</text>
																								</children>
																							</tgridcell>
																						</children>
																					</tgridrow>
																					<tgridrow>
																						<children>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<template subtype="element" match="totalPriceText">
																										<children>
																											<content subtype="regular"/>
																										</children>
																										<variables/>
																									</template>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="EUR">
																										<styles font-size="14px"/>
																									</text>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<template subtype="element" match="insuredFrom">
																										<children>
																											<template subtype="attribute" match="sk">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																										<variables/>
																									</template>
																								</children>
																							</tgridcell>
																						</children>
																					</tgridrow>
																				</children>
																			</tgridbody-rows>
																		</children>
																	</tgrid>
																	<newline/>
																</children>
															</tgridcell>
															<tgridcell>
																<styles padding-right="0px" vertical-align="top"/>
																<children>
																	<tgrid>
																		<properties border="0" cellpadding="3" cellspacing="0" width="100%"/>
																		<children>
																			<tgridbody-cols>
																				<children>
																					<tgridcol>
																						<properties width="33%"/>
																					</tgridcol>
																					<tgridcol>
																						<properties width="34%"/>
																					</tgridcol>
																					<tgridcol>
																						<properties width="33%"/>
																					</tgridcol>
																				</children>
																			</tgridbody-cols>
																			<tgridbody-rows>
																				<children>
																					<tgridrow>
																						<children>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="variabilný symbol">
																										<styles font-size="14px"/>
																									</text>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="konštantný symbol">
																										<styles font-size="14px"/>
																									</text>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="špecifický symbol">
																										<styles font-size="14px"/>
																									</text>
																								</children>
																							</tgridcell>
																						</children>
																					</tgridrow>
																					<tgridrow>
																						<children>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<template subtype="element" match="variableSymbol">
																										<children>
																											<content subtype="regular">
																												<format basic-type="xsd" datatype="int"/>
																											</content>
																										</children>
																										<variables/>
																									</template>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="3558">
																										<styles font-size="14px"/>
																									</text>
																								</children>
																							</tgridcell>
																							<tgridcell>
																								<styles border="1px solid black"/>
																								<children>
																									<text fixtext="0">
																										<styles font-size="14px"/>
																									</text>
																								</children>
																							</tgridcell>
																						</children>
																					</tgridrow>
																				</children>
																			</tgridbody-rows>
																		</children>
																	</tgrid>
																</children>
															</tgridcell>
														</children>
													</tgridrow>
													<tgridrow>
														<styles keep-together="always"/>
														<children>
															<tgridcell>
																<styles border="1px solid black" padding="5px"/>
																<children>
																	<text fixtext="Doplňujúci údaj banky">
																		<styles font-size="14px"/>
																	</text>
																	<newline/>
																	<newline/>
																	<newline/>
																</children>
															</tgridcell>
															<tgridcell joinleft="1"/>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<styles border="1px solid black" padding="5px"/>
																<children>
																	<text fixtext="Údaje pre vnútornú potrebu príkazcu">
																		<styles font-size="14px"/>
																	</text>
																	<newline/>
																	<newline/>
																	<newline/>
																</children>
															</tgridcell>
															<tgridcell joinleft="1"/>
														</children>
													</tgridrow>
													<tgridrow>
														<styles text-align="center"/>
														<children>
															<tgridcell>
																<styles text-align="center"/>
																<children>
																	<newline/>
																	<newline/>
																	<paragraph>
																		<styles font-size="14px" text-align="center"/>
																		<children>
																			<text fixtext="-----------------------------------------------">
																				<styles font-size="14px"/>
																			</text>
																			<newline/>
																			<text fixtext="miesto a dátum vystavenia">
																				<styles font-size="14px"/>
																			</text>
																		</children>
																	</paragraph>
																</children>
															</tgridcell>
															<tgridcell>
																<styles text-align="center"/>
																<children>
																	<newline/>
																	<newline/>
																	<text fixtext="-----------------------------------------------">
																		<styles font-size="14px"/>
																	</text>
																	<newline/>
																	<text fixtext="pečiatka a podpis príkazcu ">
																		<styles font-size="14px"/>
																	</text>
																</children>
															</tgridcell>
														</children>
													</tgridrow>
												</children>
											</tgridbody-rows>
										</children>
									</tgrid>
								</children>
								<variables/>
							</template>
						</children>
						<variables/>
					</template>
					<newline/>
				</children>
			</globaltemplate>
		</children>
	</mainparts>
	<globalparts/>
	<designfragments/>
	<xmltables/>
	<authentic-custom-toolbar-buttons/>
</structure>
