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
				<styles font-family="Arial" line-height="1.4"/>
				<children>
					<documentsection>
						<properties columngap="0.50in" headerfooterheight="fixed" pagemultiplepages="0" pagenumberingformat="1" pagenumberingstartat="auto" pagestart="next" paperheight="11.69in" papermarginbottom="2cm" papermarginfooter="0.8cm" papermarginheader="0.8cm" papermarginleft="2cm" papermarginright="2cm" papermargintop="2cm" papermargintop-first="1cm" paperwidth="8.27in"/>
						<children>
							<globaltemplate subtype="pagelayout" match="footerall">
								<children>
									<tgrid>
										<styles width="100%"/>
										<children>
											<tgridbody-cols>
												<children>
													<tgridcol>
														<styles width="90%"/>
													</tgridcol>
													<tgridcol>
														<styles width="10%"/>
													</tgridcol>
												</children>
											</tgridbody-cols>
											<tgridbody-rows>
												<children>
													<tgridrow>
														<children>
															<tgridcell>
																<properties align="left"/>
																<styles font-size="10pt" padding="0"/>
															</tgridcell>
															<tgridcell>
																<properties align="right"/>
																<styles font-size="10pt" padding="0"/>
																<children>
																	<field>
																		<styles font-family="Times New Roman" font-size="12.5pt" font-weight="bold"/>
																	</field>
																	<text fixtext="/ ">
																		<styles font-family="Times New Roman" font-size="12.5pt" font-weight="bold"/>
																	</text>
																	<field type="pagetotal">
																		<styles font-family="Times New Roman" font-size="12.5pt" font-weight="bold"/>
																	</field>
																</children>
															</tgridcell>
														</children>
													</tgridrow>
												</children>
											</tgridbody-rows>
										</children>
									</tgrid>
								</children>
							</globaltemplate>
							<globaltemplate subtype="pagelayout" match="footerfirst">
								<children>
									<tgrid>
										<styles width="100%"/>
										<children>
											<tgridbody-cols>
												<children>
													<tgridcol>
														<styles width="90%"/>
													</tgridcol>
													<tgridcol>
														<styles width="10%"/>
													</tgridcol>
												</children>
											</tgridbody-cols>
											<tgridbody-rows>
												<children>
													<tgridrow>
														<children>
															<tgridcell>
																<properties align="left"/>
																<styles font-size="10pt" padding="0"/>
																<children>
																	<text fixtext="1+098+02+07+1114">
																		<styles font-family="Times New Roman" font-size="12pt" font-weight="bold"/>
																	</text>
																</children>
															</tgridcell>
															<tgridcell>
																<properties align="right"/>
																<styles font-size="10pt" padding="0"/>
																<children>
																	<field>
																		<styles font-family="Times New Roman" font-size="12.5pt" font-weight="bold"/>
																	</field>
																	<text fixtext="/ ">
																		<styles font-family="Times New Roman" font-size="12.5pt" font-weight="bold"/>
																	</text>
																	<field type="pagetotal">
																		<styles font-family="Times New Roman" font-size="12.5pt" font-weight="bold"/>
																	</field>
																</children>
															</tgridcell>
														</children>
													</tgridrow>
												</children>
											</tgridbody-rows>
										</children>
									</tgrid>
								</children>
							</globaltemplate>
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
									<newline/>
									<tgrid>
										<properties cellpadding="0" cellspacing="0" width="100%"/>
										<styles margin-top="-1.2cm"/>
										<children>
											<tgridbody-cols>
												<children>
													<tgridcol>
														<styles width="50%"/>
													</tgridcol>
													<tgridcol>
														<styles width="50%"/>
													</tgridcol>
												</children>
											</tgridbody-cols>
											<tgridbody-rows>
												<children>
													<tgridrow>
														<children>
															<tgridcell>
																<children>
																	<image>
																		<styles height="55px" text-align="right" vertical-align="bottom"/>
																		<target>
																			<fixtext value="pdf_logo.jpg"/>
																		</target>
																	</image>
																</children>
															</tgridcell>
															<tgridcell>
																<styles text-align="right"/>
																<children>
																	<text fixtext="Číslo poistnej zmluvy "/>
																	<template subtype="source" match="XML">
																		<children>
																			<template subtype="element" match="agreement">
																				<children>
																					<template subtype="element" match="variableSymbol">
																						<children>
																							<content subtype="regular">
																								<styles font-family="Times New Roman" font-size="12.5pt" font-weight="bold"/>
																								<format basic-type="xsd" datatype="int"/>
																							</content>
																						</children>
																						<variables/>
																					</template>
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
									<tgrid>
										<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
										<children>
											<tgridbody-cols>
												<children>
													<tgridcol>
														<properties width="15%"/>
													</tgridcol>
													<tgridcol>
														<properties width="70%"/>
													</tgridcol>
													<tgridcol>
														<properties width="15%"/>
													</tgridcol>
												</children>
											</tgridbody-cols>
											<tgridbody-rows>
												<children>
													<tgridrow>
														<children>
															<tgridcell/>
															<tgridcell>
																<styles text-align="center"/>
																<children>
																	<text fixtext="NÁVRH NA UZAVRETIE POISTNEJ ZMLUVY">
																		<styles font-family="Arial" font-size="16pt" font-weight="bold" text-align="center"/>
																	</text>
																</children>
															</tgridcell>
															<tgridcell/>
														</children>
													</tgridrow>
													<tgridrow>
														<children>
															<tgridcell>
																<styles border-bottom="1px solid black" border-left="1px solid black" border-top="1px solid black"/>
															</tgridcell>
															<tgridcell>
																<styles border-bottom="1px solid black" border-top="1px solid black" padding="5px" text-align="center"/>
																<children>
																	<text fixtext="Individuálne komplexné cestovné poistenie ">
																		<styles font-size="14pt" font-weight="bold"/>
																	</text>
																	<newline/>
																</children>
															</tgridcell>
															<tgridcell>
																<styles border-bottom="1px solid black" border-right="1px solid black" border-top="1px solid black"/>
															</tgridcell>
														</children>
													</tgridrow>
												</children>
											</tgridbody-rows>
										</children>
									</tgrid>
									<paragraph paragraphtag="p">
										<styles font-size="14px" font-weight="normal" text-align="left"/>
										<children>
											<tgrid>
												<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
												<children>
													<tgridbody-cols>
														<children>
															<tgridcol>
																<properties width="15%"/>
															</tgridcol>
															<tgridcol/>
														</children>
													</tgridbody-cols>
													<tgridbody-rows>
														<children>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles vertical-align="top"/>
																		<children>
																			<text fixtext="Poisťovateľ:">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles line-height="14px" text-align="justify"/>
																		<children>
																			<text fixtext="Union poisťovňa, a. s., Bajkalská 29/A, 813 60 Bratislava, Slovenská republika, IČO: 31322051, DIČ:2020800353, zapísaná v Obchodnom registri Okresného súdu Bratislava I, odd. Sa, vl. č. 383/B, účet č.: 6600547090/1111, IBAN SK59 1111 0000 0066 0054 7090, BIC UNCRSKBX vedený v UniCredit Bank Czech Republic and Slovakia, a.s., pobočka zahraničnej banky"/>
																			<newline/>
																			<text fixtext="kontaktné údaje">
																				<styles font-weight="bold"/>
																			</text>
																			<newline/>
																			<text fixtext="internetová stránka: www.union.sk, telefón: 0850 111 211, e-mail: union@union.sk"/>
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
									</paragraph>
									<paragraph>
										<styles font-size="14px" line-height="1.2" margin="0" padding="0"/>
										<children>
											<newline/>
											<text fixtext="Poistník">
												<styles font-weight="bold"/>
											</text>
											<text fixtext=" (osoba, ktorá podpisuje poistnú zmluvu a platí poistné)"/>
											<newline/>
											<template subtype="element" match="insurer">
												<children>
													<tgrid>
														<properties border="0" cellpadding="5" cellspacing="0" width="100%"/>
														<styles border="1px solid black"/>
														<children>
															<tgridbody-cols>
																<children>
																	<tgridcol>
																		<styles width="18%"/>
																	</tgridcol>
																	<tgridcol>
																		<styles width="22%"/>
																	</tgridcol>
																	<tgridcol>
																		<styles width="14%"/>
																	</tgridcol>
																	<tgridcol>
																		<styles width="15%"/>
																	</tgridcol>
																	<tgridcol>
																		<styles width="31%"/>
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
																					<text fixtext="Meno a priezvisko / Názov">
																						<styles font-weight="bold"/>
																					</text>
																				</children>
																			</tgridcell>
																			<tgridcell>
																				<styles border="1px solid black"/>
																				<children>
																					<text fixtext="Adresa trvalého bydliska/ Adresa sídla">
																						<styles font-weight="bold"/>
																					</text>
																				</children>
																			</tgridcell>
																			<tgridcell>
																				<styles border="1px solid black"/>
																				<children>
																					<text fixtext="Dátum narodenia/IČO">
																						<styles font-weight="bold"/>
																					</text>
																				</children>
																			</tgridcell>
																			<tgridcell>
																				<styles border="1px solid black"/>
																				<children>
																					<text fixtext="Telefónne číslo">
																						<styles font-weight="bold"/>
																					</text>
																				</children>
																			</tgridcell>
																			<tgridcell>
																				<styles border="1px solid black"/>
																				<children>
																					<text fixtext="E-mailová adresa">
																						<styles font-weight="bold"/>
																					</text>
																				</children>
																			</tgridcell>
																		</children>
																	</tgridrow>
																	<tgridrow>
																		<children>
																			<tgridcell>
																				<styles border="1px solid black" white-space="normal"/>
																				<children>
																					<condition>
																						<children>
																							<conditionbranch xpath="typ=&apos;FO&apos;">
																								<children>
																									<template subtype="element" match="title">
																										<children>
																											<content subtype="regular"/>
																										</children>
																										<variables/>
																									</template>
																									<text fixtext="  "/>
																									<template subtype="element" match="name">
																										<children>
																											<content subtype="regular"/>
																											<text fixtext=" "/>
																										</children>
																										<variables/>
																									</template>
																									<text fixtext="  "/>
																									<template subtype="element" match="surname">
																										<children>
																											<content subtype="regular"/>
																										</children>
																										<variables/>
																									</template>
																								</children>
																							</conditionbranch>
																							<conditionbranch>
																								<children>
																									<template subtype="element" match="companyName">
																										<children>
																											<content subtype="regular"/>
																										</children>
																										<variables/>
																									</template>
																								</children>
																							</conditionbranch>
																						</children>
																					</condition>
																				</children>
																			</tgridcell>
																			<tgridcell>
																				<styles border="1px solid black" white-space="normal"/>
																				<children>
																					<template subtype="element" match="address">
																						<children>
																							<template subtype="element" match="street">
																								<children>
																									<content subtype="regular"/>
																								</children>
																								<variables/>
																							</template>
																							<text fixtext="  "/>
																							<template subtype="element" match="number">
																								<children>
																									<content subtype="regular">
																										<format basic-type="xsd" datatype="byte"/>
																									</content>
																								</children>
																								<variables/>
																							</template>
																							<text fixtext=", "/>
																							<template subtype="element" match="psc">
																								<children>
																									<content subtype="regular">
																										<format basic-type="xsd" datatype="int"/>
																									</content>
																								</children>
																								<variables/>
																							</template>
																							<text fixtext=" "/>
																							<template subtype="element" match="city">
																								<children>
																									<content subtype="regular"/>
																								</children>
																								<variables/>
																							</template>
																							<text fixtext=" "/>
																						</children>
																						<variables/>
																					</template>
																				</children>
																			</tgridcell>
																			<tgridcell>
																				<styles border="1px solid black"/>
																				<children>
																					<condition>
																						<children>
																							<conditionbranch xpath="typ=&apos;FO&apos;">
																								<children>
																									<template subtype="element" match="birthDate">
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
																							</conditionbranch>
																							<conditionbranch>
																								<children>
																									<template subtype="element" match="ico">
																										<children>
																											<content subtype="regular"/>
																										</children>
																										<variables/>
																									</template>
																								</children>
																							</conditionbranch>
																						</children>
																					</condition>
																				</children>
																			</tgridcell>
																			<tgridcell>
																				<styles border="1px solid black"/>
																				<children>
																					<template subtype="element" match="phone">
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
																				<styles border="1px solid black" white-space="normal"/>
																				<children>
																					<template subtype="element" match="email">
																						<children>
																							<content subtype="regular"/>
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
												</children>
												<variables/>
											</template>
											<template subtype="element" match="insurer">
												<children>
													<newline/>
													<text fixtext="Korešpondenčná adresa">
														<styles font-size="14px" font-weight="bold"/>
													</text>
													<text fixtext=" (adresa, na ktorú sa doručujú písomnosti)">
														<styles font-size="14px"/>
													</text>
													<tgrid>
														<properties border="0" cellpadding="5" cellspacing="0" width="100%"/>
														<styles border="1px solid black"/>
														<children>
															<tgridbody-cols>
																<children>
																	<tgridcol>
																		<properties width="25%"/>
																	</tgridcol>
																	<tgridcol/>
																</children>
															</tgridbody-cols>
															<tgridbody-rows>
																<children>
																	<tgridrow>
																		<children>
																			<tgridcell>
																				<styles border="1px solid black"/>
																				<children>
																					<text fixtext="Meno a priezvisko / Názov">
																						<styles font-size="14px" font-weight="bold"/>
																					</text>
																				</children>
																			</tgridcell>
																			<tgridcell>
																				<styles border="1px solid black"/>
																				<children>
																					<text fixtext="Korešpondenčná adresa">
																						<styles font-size="14px" font-weight="bold"/>
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
																					<condition>
																						<children>
																							<conditionbranch xpath="typ=&apos;FO&apos;">
																								<children>
																									<template subtype="element" match="title">
																										<children>
																											<content subtype="regular"/>
																										</children>
																										<variables/>
																									</template>
																									<text fixtext="  "/>
																									<template subtype="element" match="name">
																										<children>
																											<content subtype="regular"/>
																											<text fixtext=" "/>
																										</children>
																										<variables/>
																									</template>
																									<text fixtext="  "/>
																									<template subtype="element" match="surname">
																										<children>
																											<content subtype="regular"/>
																										</children>
																										<variables/>
																									</template>
																								</children>
																							</conditionbranch>
																							<conditionbranch>
																								<children>
																									<template subtype="element" match="companyName">
																										<children>
																											<content subtype="regular"/>
																										</children>
																										<variables/>
																									</template>
																								</children>
																							</conditionbranch>
																						</children>
																					</condition>
																				</children>
																			</tgridcell>
																			<tgridcell>
																				<styles border="1px solid black"/>
																				<children>
																					<condition>
																						<children>
																							<conditionbranch xpath="same=&apos;true&apos;">
																								<children>
																									<template subtype="element" match="address">
																										<children>
																											<template subtype="element" match="street">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																											<text fixtext="  "/>
																											<template subtype="element" match="number">
																												<children>
																													<content subtype="regular">
																														<format basic-type="xsd" datatype="byte"/>
																													</content>
																												</children>
																												<variables/>
																											</template>
																											<text fixtext=", "/>
																											<template subtype="element" match="psc">
																												<children>
																													<content subtype="regular">
																														<format basic-type="xsd" datatype="int"/>
																													</content>
																												</children>
																												<variables/>
																											</template>
																											<text fixtext=" "/>
																											<template subtype="element" match="city">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																											<text fixtext=" "/>
																										</children>
																										<variables/>
																									</template>
																								</children>
																							</conditionbranch>
																							<conditionbranch>
																								<children>
																									<template subtype="element" match="postalAddress">
																										<children>
																											<template subtype="element" match="street">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																										<variables/>
																									</template>
																									<text fixtext="  "/>
																									<template subtype="element" match="postalAddress">
																										<children>
																											<template subtype="element" match="number">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																										<variables/>
																									</template>
																									<text fixtext="  "/>
																									<template subtype="element" match="postalAddress">
																										<children>
																											<template subtype="element" match="psc">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																										<variables/>
																									</template>
																									<text fixtext="  "/>
																									<template subtype="element" match="postalAddress">
																										<children>
																											<template subtype="element" match="city">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																										<variables/>
																									</template>
																								</children>
																							</conditionbranch>
																						</children>
																					</condition>
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
											<newline/>
										</children>
									</paragraph>
									<newline/>
									<paragraph>
										<styles font-size="14px" line-height="1.2" margin="0" padding="0"/>
										<children>
											<text fixtext="Poistený/í">
												<styles font-weight="bold"/>
											</text>
											<tgrid>
												<properties border="0" cellpadding="5" cellspacing="0"/>
												<styles border="1px solid black"/>
												<children>
													<tgridbody-cols>
														<children>
															<tgridcol>
																<properties width="25%"/>
															</tgridcol>
															<tgridcol>
																<properties width="15%"/>
															</tgridcol>
															<tgridcol>
																<properties width="20%"/>
															</tgridcol>
															<tgridcol>
																<properties width="20%"/>
															</tgridcol>
															<tgridcol>
																<properties width="20%"/>
															</tgridcol>
														</children>
													</tgridbody-cols>
													<tgridheader-rows>
														<children>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles border="1px solid black" font-weight="bold" text-align="left"/>
																		<children>
																			<text fixtext="Meno a priezvisko">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border="1px solid black" font-weight="bold" text-align="left"/>
																		<children>
																			<text fixtext="Dátum narodenia"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border="1px solid black" font-weight="bold" text-align="left"/>
																		<children>
																			<text fixtext="Preukaz č.*"/>
																			<newline/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border="1px solid black" font-weight="bold" text-align="left"/>
																		<children>
																			<text fixtext="Riziková skupina"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border="1px solid black"/>
																		<children>
																			<text fixtext="Typ zľavy (na osobu)">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
														</children>
													</tgridheader-rows>
													<tgridbody-rows>
														<children>
															<template subtype="element" match="insuredPersons">
																<children>
																	<template subtype="element" match="person">
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles border="1px solid black"/>
																						<children>
																							<template subtype="element" match="name">
																								<children>
																									<content subtype="regular"/>
																								</children>
																								<variables/>
																							</template>
																							<text fixtext="  "/>
																							<template subtype="element" match="surname">
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
																							<template subtype="element" match="birthDate">
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
																					<tgridcell>
																						<styles border="1px solid black"/>
																						<children>
																							<condition>
																								<children>
																									<conditionbranch xpath="discountCard">
																										<children>
																											<template subtype="element" match="discountCardCode">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																											<text fixtext=" "/>
																											<template subtype="element" match="discountCardType">
																												<children>
																													<content subtype="regular"/>
																												</children>
																												<variables/>
																											</template>
																										</children>
																									</conditionbranch>
																									<conditionbranch>
																										<children>
																											<text fixtext="---">
																												<styles font-weight="bold"/>
																											</text>
																										</children>
																									</conditionbranch>
																								</children>
																							</condition>
																							<newline/>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border="1px solid black"/>
																						<children>
																							<condition>
																								<children>
																									<conditionbranch xpath="riskGroup=&apos;T&apos;">
																										<children>
																											<text fixtext="turista"/>
																										</children>
																									</conditionbranch>
																								</children>
																							</condition>
																							<condition>
																								<children>
																									<conditionbranch xpath="riskGroup=&apos;H&apos;">
																										<children>
																											<text fixtext="šport"/>
																										</children>
																									</conditionbranch>
																								</children>
																							</condition>
																							<condition>
																								<children>
																									<conditionbranch xpath="riskGroup=&apos;HD&apos;">
																										<children>
																											<text fixtext="osoba nad 70 rokov - šport "/>
																										</children>
																									</conditionbranch>
																								</children>
																							</condition>
																							<condition>
																								<children>
																									<conditionbranch xpath="riskGroup=&apos;PM&apos;">
																										<children>
																											<text fixtext="manuálna práca"/>
																										</children>
																									</conditionbranch>
																								</children>
																							</condition>
																							<condition>
																								<children>
																									<conditionbranch xpath="riskGroup=&apos;PN&apos;">
																										<children>
																											<text fixtext="nemanuálna práca"/>
																										</children>
																									</conditionbranch>
																								</children>
																							</condition>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border="1px solid black"/>
																						<children>
																							<condition>
																								<children>
																									<conditionbranch xpath="discountCard">
																										<children>
																											<condition>
																												<children>
																													<conditionbranch xpath="discountCardType=&apos;unionzp&apos;">
																														<children>
																															<text fixtext="poistenec Union zdravotnej poisťovne"/>
																														</children>
																													</conditionbranch>
																												</children>
																											</condition>
																											<condition>
																												<children>
																													<conditionbranch xpath="discountCardType=&apos;unionzp&apos; and discountCardType=&apos;&apos;">
																														<children>
																															<text fixtext="držiteľ karty "/>
																															<condition>
																																<children>
																																	<conditionbranch xpath="discountCardType=&apos;ISIC&apos;">
																																		<children>
																																			<text fixtext="ISIC"/>
																																		</children>
																																	</conditionbranch>
																																</children>
																															</condition>
																															<condition>
																																<children>
																																	<conditionbranch xpath="discountCardType=&apos;euro26&apos;">
																																		<children>
																																			<text fixtext="EURO&lt;26"/>
																																		</children>
																																	</conditionbranch>
																																</children>
																															</condition>
																															<condition>
																																<children>
																																	<conditionbranch xpath="discountCardType=&apos;go26&apos;">
																																		<children>
																																			<text fixtext="GO&lt;26"/>
																																		</children>
																																	</conditionbranch>
																																</children>
																															</condition>
																															<condition>
																																<children>
																																	<conditionbranch xpath="discountCardType=&apos;itic&apos;">
																																		<children>
																																			<text fixtext="ITIC"/>
																																		</children>
																																	</conditionbranch>
																																</children>
																															</condition>
																														</children>
																													</conditionbranch>
																												</children>
																											</condition>
																										</children>
																									</conditionbranch>
																									<conditionbranch>
																										<children>
																											<text fixtext="---">
																												<styles font-weight="bold"/>
																											</text>
																										</children>
																									</conditionbranch>
																								</children>
																							</condition>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																		<variables/>
																	</template>
																</children>
																<variables/>
															</template>
														</children>
													</tgridbody-rows>
												</children>
											</tgrid>
											<text fixtext="* preukaz poistenca zdravotnej poisťovne / EURO&lt;26, GO&lt;26, ISIC, ITIC, EYCA / člen OZPPaP"/>
											<newline/>
										</children>
									</paragraph>
									<newline/>
									<paragraph>
										<styles font-size="14px" line-height="1.2" margin="0" padding="0"/>
										<children>
											<tgrid>
												<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
												<styles border="1px solid black"/>
												<children>
													<tgridbody-cols>
														<children>
															<tgridcol>
																<properties width="25%"/>
															</tgridcol>
															<tgridcol>
																<properties width="35%"/>
															</tgridcol>
															<tgridcol>
																<properties width="20%"/>
															</tgridcol>
															<tgridcol>
																<properties width="20%"/>
															</tgridcol>
														</children>
													</tgridbody-cols>
													<tgridbody-rows>
														<children>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles border-bottom="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="Dátum a čas uzavretia ">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border-bottom="1px solid black" border-left="1px solid black" padding="5px"/>
																		<children>
																			<template subtype="element" match="signingDate">
																				<children>
																					<content subtype="regular">
																						<format basic-type="xsd" string="DD.MM.YYYY" datatype="date"/>
																					</content>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border-bottom="1px solid black" border-left="1px solid black" padding="5px"/>
																		<children>
																			<template subtype="element" match="signingDate">
																				<children>
																					<content subtype="regular">
																						<format basic-type="xsd" string="hh:mm" datatype="time"/>
																					</content>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridcell>
																	<tgridcell joinleft="1">
																		<styles padding="5px"/>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles padding="5px"/>
																		<children>
																			<text fixtext="Platnosť poistenia ">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border-left="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="od "/>
																			<template subtype="element" match="insuredFrom">
																				<children>
																					<content subtype="regular">
																						<format basic-type="xsd" string="DD.MM.YYYY" datatype="date"/>
																					</content>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border-left="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="do "/>
																			<template subtype="element" match="insuredTo">
																				<children>
																					<content subtype="regular">
																						<format basic-type="xsd" string="DD.MM.YYYY" datatype="date"/>
																					</content>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border-left="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="na "/>
																			<template subtype="element" match="insuredDays">
																				<children>
																					<content subtype="regular">
																						<format basic-type="xsd" datatype="byte"/>
																					</content>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles border-bottom="1px solid black" border-top="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="Územná platnosť poistenia">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border-bottom="1px solid black" border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																		<children>
																			<condition>
																				<children>
																					<conditionbranch xpath="country=&apos;E&apos;">
																						<children>
																							<text fixtext="Európa"/>
																						</children>
																					</conditionbranch>
																				</children>
																			</condition>
																			<condition>
																				<children>
																					<conditionbranch xpath="country=&apos;S&apos;">
																						<children>
																							<text fixtext="Svet"/>
																						</children>
																					</conditionbranch>
																				</children>
																			</condition>
																			<condition>
																				<children>
																					<conditionbranch xpath="country=&apos;SR&apos;">
																						<children>
																							<text fixtext="Slovensko"/>
																						</children>
																					</conditionbranch>
																				</children>
																			</condition>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border-bottom="1px solid black" border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="Krajina pobytu">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border-bottom="1px solid black" border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																	</tgridcell>
																</children>
															</tgridrow>
														</children>
													</tgridbody-rows>
												</children>
											</tgrid>
										</children>
									</paragraph>
									<newline/>
									<paragraph>
										<styles font-size="14px" line-height="1.2" margin="0" padding="0"/>
										<children>
											<text fixtext="POISTNÉ KRYTIE A POISTNÁ SUMA">
												<styles font-weight="bold"/>
											</text>
											<newline/>
											<text fixtext="** príloha k poistnej zmluve typu 701/702 je uvedená na str. 1 brožúry s názvom „Individuálne komplexné cestovné poistenie“">
												<styles font-weight="bold"/>
											</text>
										</children>
									</paragraph>
									<paragraph>
										<styles font-size="14px" line-height="1.2" margin="0" padding="0"/>
										<children>
											<condition>
												<children>
													<conditionbranch xpath="hasAnyoneMedical=&apos;true&apos;">
														<children>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
																<styles border="1px solid black" keep-together="always"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="25%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="35%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridbody-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="Poistenie">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px"/>
																						<children>
																							<text fixtext="poistenie liečebných nákladov v zahraničí">
																								<styles font-weight="bold" keep-together="always"/>
																							</text>
																							<newline/>
																							<text fixtext="časť B VPPIKCP/0114"/>
																							<newline/>
																							<text fixtext="a"/>
																							<newline/>
																							<text fixtext="asistenčné služby v zahraničí">
																								<styles font-weight="bold"/>
																							</text>
																							<newline/>
																							<text fixtext="časť A, čl. 13 VPPIKCP/0114"/>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="Poistná suma">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" text-align="right"/>
																						<children>
																							<text fixtext="je uvedená v prílohe k poistnej zmluve typu 701/702 **"/>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
															<newline/>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0"/>
																<styles border="1px solid black"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="80%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridheader-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Meno a priezvisko poisteného">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Dátum narodenia">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridheader-rows>
																	<tgridbody-rows>
																		<children>
																			<template subtype="source" match="XML">
																				<children>
																					<template subtype="element" match="agreement">
																						<children>
																							<template subtype="element" match="insuredPersons">
																								<children>
																									<template subtype="element" match="person">
																										<children>
																											<tgridrow conditional-processing="medical=&apos;true&apos;">
																												<children>
																													<tgridcell>
																														<styles border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="name">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext=" "/>
																															<template subtype="element" match="surname">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="birthDate">
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
																										<variables/>
																									</template>
																								</children>
																								<variables/>
																							</template>
																						</children>
																						<variables/>
																					</template>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
														</children>
													</conditionbranch>
												</children>
											</condition>
											<newline/>
											<newline/>
											<condition>
												<children>
													<conditionbranch xpath="hasAnyoneBaggage=&apos;true&apos;">
														<children>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
																<styles border="1px solid black" keep-together="always"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="25%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="35%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridbody-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="Poistenie">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="poistenie batožiny">
																								<styles font-weight="bold"/>
																							</text>
																							<newline/>
																							<text fixtext="časť C VPPIKCP/0114"/>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="Poistná suma">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" text-align="right"/>
																						<children>
																							<template subtype="element" match="baggage">
																								<children>
																									<template subtype="attribute" match="value">
																										<children>
																											<content subtype="regular"/>
																										</children>
																										<variables/>
																									</template>
																								</children>
																								<variables/>
																							</template>
																							<newline/>
																							<text fixtext="max. 350 EUR / 1 vec"/>
																							<newline/>
																							<text fixtext="spoluúčasť 15 EUR"/>
																							<newline/>
																							<text fixtext="sublimity uvedené v prílohe k poistnej zmluve typu 701/702 **"/>
																							<newline/>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
															<newline/>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0"/>
																<styles border="1px solid black"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="80%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridheader-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Meno a priezvisko poisteného">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Dátum narodenia">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridheader-rows>
																	<tgridbody-rows>
																		<children>
																			<template subtype="source" match="XML">
																				<children>
																					<template subtype="element" match="agreement">
																						<children>
																							<template subtype="element" match="insuredPersons">
																								<children>
																									<template subtype="element" match="person">
																										<children>
																											<tgridrow conditional-processing="baggage=&apos;true&apos;">
																												<children>
																													<tgridcell>
																														<styles border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="name">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext=" "/>
																															<template subtype="element" match="surname">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="birthDate">
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
																										<variables/>
																									</template>
																								</children>
																								<variables/>
																							</template>
																						</children>
																						<variables/>
																					</template>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
														</children>
													</conditionbranch>
												</children>
											</condition>
											<condition>
												<children>
													<conditionbranch xpath="hasAnyoneResponsibility=&apos;true&apos;">
														<children>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
																<styles border="1px solid black" keep-together="always"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="25%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="35%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridbody-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="Poistenie">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px"/>
																						<children>
																							<text fixtext="poistenie všeobecnej zodpovednosti za škodu">
																								<styles font-weight="bold"/>
																							</text>
																							<newline/>
																							<text fixtext="časť D VPPIKCP/0114"/>
																							<newline/>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="Poistná suma">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" text-align="right"/>
																						<children>
																							<text fixtext="je uvedená v prílohe k poistnej zmluve typu 701/702 **"/>
																							<newline/>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
															<newline/>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0"/>
																<styles border="1px solid black"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="80%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridheader-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Meno a priezvisko poisteného">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Dátum narodenia">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridheader-rows>
																	<tgridbody-rows>
																		<children>
																			<template subtype="source" match="XML">
																				<children>
																					<template subtype="element" match="agreement">
																						<children>
																							<template subtype="element" match="insuredPersons">
																								<children>
																									<template subtype="element" match="person">
																										<children>
																											<tgridrow>
																												<children>
																													<tgridcell>
																														<styles border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="name">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext=" "/>
																															<template subtype="element" match="surname">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="birthDate">
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
																										<variables/>
																									</template>
																								</children>
																								<variables/>
																							</template>
																						</children>
																						<variables/>
																					</template>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
														</children>
													</conditionbranch>
												</children>
											</condition>
											<condition>
												<children>
													<conditionbranch xpath="hasAnyoneAccident=&apos;true&apos;">
														<children>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
																<styles border="1px solid black" keep-together="always"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="25%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="35%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridbody-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="Poistenie">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px"/>
																						<children>
																							<text fixtext="úrazové poistenie">
																								<styles font-weight="bold"/>
																							</text>
																							<newline/>
																							<text fixtext="časť E VPPIKCP/0114"/>
																							<newline/>
																							<newline/>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="Poistná suma">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" text-align="right"/>
																						<children>
																							<text fixtext="je uvedená v prílohe k poistnej zmluve typu 701/702 **"/>
																							<newline/>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
															<newline/>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0"/>
																<styles border="1px solid black"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="80%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridheader-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Meno a priezvisko poisteného">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Dátum narodenia">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridheader-rows>
																	<tgridbody-rows>
																		<children>
																			<template subtype="source" match="XML">
																				<children>
																					<template subtype="element" match="agreement">
																						<children>
																							<template subtype="element" match="insuredPersons">
																								<children>
																									<template subtype="element" match="person">
																										<children>
																											<tgridrow>
																												<children>
																													<tgridcell>
																														<styles border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="name">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext=" "/>
																															<template subtype="element" match="surname">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="birthDate">
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
																										<variables/>
																									</template>
																								</children>
																								<variables/>
																							</template>
																						</children>
																						<variables/>
																					</template>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
														</children>
													</conditionbranch>
												</children>
											</condition>
											<condition>
												<children>
													<conditionbranch xpath="hasAnyoneTechnicalHelp=&apos;true&apos;">
														<children>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
																<styles border="1px solid black" keep-together="always"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="25%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="35%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridbody-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="Poistenie">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px"/>
																						<children>
																							<text fixtext="poistenie nákladov na technickú pomoc v prípade záchrannej akcie v horách v zahraničí">
																								<styles font-weight="bold"/>
																							</text>
																							<newline/>
																							<text fixtext="časť G VPPIKCP/0114"/>
																							<newline/>
																							<newline/>
																							<newline/>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="Poistná suma">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" text-align="right"/>
																						<children>
																							<text fixtext="je uvedená v prílohe k poistnej zmluve typu 701/702 **"/>
																							<newline/>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
															<newline/>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0"/>
																<styles border="1px solid black"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="80%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridheader-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Meno a priezvisko poisteného">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Dátum narodenia">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridheader-rows>
																	<tgridbody-rows>
																		<children>
																			<template subtype="source" match="XML">
																				<children>
																					<template subtype="element" match="agreement">
																						<children>
																							<template subtype="element" match="insuredPersons">
																								<children>
																									<template subtype="element" match="person">
																										<children>
																											<tgridrow>
																												<children>
																													<tgridcell>
																														<styles border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="name">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext=" "/>
																															<template subtype="element" match="surname">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="birthDate">
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
																										<variables/>
																									</template>
																								</children>
																								<variables/>
																							</template>
																						</children>
																						<variables/>
																					</template>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
														</children>
													</conditionbranch>
												</children>
											</condition>
											<condition>
												<children>
													<conditionbranch xpath="hasAnyoneRescueService=&apos;true&apos;">
														<children>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
																<styles border="1px solid black" keep-together="always"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="25%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="35%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridbody-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="Poistenie">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px"/>
																						<children>
																							<text fixtext="poistenie nákladov na zásah Horskej záchrannej služby ">
																								<styles font-weight="bold"/>
																							</text>
																							<newline/>
																							<text fixtext="časť H VPPIKCP/0114"/>
																							<newline/>
																							<newline/>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" vertical-align="top"/>
																						<children>
																							<text fixtext="Poistná suma">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" text-align="right"/>
																						<children>
																							<text fixtext="je uvedená v prílohe k poistnej zmluve typu 701/702 **"/>
																							<newline/>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
															<newline/>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0"/>
																<styles border="1px solid black"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="80%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridheader-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Meno a priezvisko poisteného">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Dátum narodenia">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridheader-rows>
																	<tgridbody-rows>
																		<children>
																			<template subtype="source" match="XML">
																				<children>
																					<template subtype="element" match="agreement">
																						<children>
																							<template subtype="element" match="insuredPersons">
																								<children>
																									<template subtype="element" match="person">
																										<children>
																											<tgridrow>
																												<children>
																													<tgridcell>
																														<styles border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="name">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext=" "/>
																															<template subtype="element" match="surname">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="birthDate">
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
																										<variables/>
																									</template>
																								</children>
																								<variables/>
																							</template>
																						</children>
																						<variables/>
																					</template>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
														</children>
													</conditionbranch>
												</children>
											</condition>
											<newline/>
											<condition>
												<children>
													<conditionbranch xpath="../storno=&apos;true&apos;">
														<children>
															<newline/>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0"/>
																<styles border="1px solid black"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="25%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="15%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="15%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="25%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridheader-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Poistenie storna objednanej služby (časť F VPPIKCP/0114)">
																								<styles font-weight="bold"/>
																							</text>
																							<text fixtext=", poistná suma je uvedená v prílohe k poistnej zmluve typu 701/702 **"/>
																						</children>
																					</tgridcell>
																					<tgridcell joinleft="1"/>
																					<tgridcell joinleft="1"/>
																					<tgridcell joinleft="1"/>
																					<tgridcell joinleft="1"/>
																				</children>
																			</tgridrow>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles border-top="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Meno a priezvisko poisteného">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" border-top="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Dátum narodenia">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" border-top="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Typ objednanej služby">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" border-top="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Dátum zakúpenia objednanej služby">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" border-top="1px solid black" padding="5px" text-align="right"/>
																						<children>
																							<text fixtext="Cena objednanej služby">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridheader-rows>
																	<tgridbody-rows>
																		<children>
																			<template subtype="source" match="XML">
																				<children>
																					<template subtype="element" match="agreement">
																						<children>
																							<template subtype="element" match="insuredPersons">
																								<children>
																									<template subtype="element" match="person">
																										<children>
																											<tgridrow conditional-processing="personData/stornoData">
																												<children>
																													<tgridcell>
																														<styles border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="name">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext=" "/>
																															<template subtype="element" match="surname">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="birthDate">
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
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="stornoObj">
																																<children>
																																	<template subtype="element" match="type">
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
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="stornoObj">
																																<children>
																																	<template subtype="element" match="date">
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
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px" text-align="right"/>
																														<children>
																															<template subtype="element" match="personData">
																																<children>
																																	<template subtype="element" match="stornoData">
																																		<children>
																																			<template subtype="element" match="priceText">
																																				<children>
																																					<content subtype="regular"/>
																																				</children>
																																				<variables/>
																																			</template>
																																		</children>
																																		<variables/>
																																	</template>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext=" EUR"/>
																														</children>
																													</tgridcell>
																												</children>
																											</tgridrow>
																										</children>
																										<variables/>
																									</template>
																								</children>
																								<variables/>
																							</template>
																						</children>
																						<variables/>
																					</template>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
																<styles border="1px solid black"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol/>
																		</children>
																	</tgridbody-cols>
																	<tgridbody-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px"/>
																						<children>
																							<text fixtext="Poistenia storna objednanej služby začína nasledujúcim dňom po uhradení poistného a končí dňom nástupu na cestu smerujúcu k využitiu objednanej služby."/>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
														</children>
													</conditionbranch>
												</children>
											</condition>
											<condition>
												<children>
													<conditionbranch xpath="../pet=&apos;true&apos;">
														<children>
															<newline/>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0"/>
																<styles border="1px solid black"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="25%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="15%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="40%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridheader-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Poistenie domáceho miláčika (časť I VPPIKCP/0114)">
																								<styles font-weight="bold"/>
																							</text>
																							<text fixtext=", poistná suma je uvedená v prílohe k poistnej zmluve typu 701/702 **"/>
																						</children>
																					</tgridcell>
																					<tgridcell joinleft="1"/>
																					<tgridcell joinleft="1"/>
																					<tgridcell joinleft="1"/>
																				</children>
																			</tgridrow>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles border-top="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Meno a priezvisko poisteného">
																								<styles font-weight="bold"/>
																							</text>
																							<newline/>
																							<text fixtext="(majiteľa domáceho miláčika)"/>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" border-top="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Dátum narodenia">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" border-top="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Druh">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" border-top="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Medzinárodný očkovací preukaz č.">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridheader-rows>
																	<tgridbody-rows>
																		<children>
																			<template subtype="source" match="XML">
																				<children>
																					<template subtype="element" match="agreement">
																						<children>
																							<template subtype="element" match="insuredPersons">
																								<children>
																									<template subtype="element" match="person">
																										<children>
																											<tgridrow conditional-processing="personData/pet">
																												<children>
																													<tgridcell>
																														<styles border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="name">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext=" "/>
																															<template subtype="element" match="surname">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="birthDate">
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
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="petType">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="petLicence">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																												</children>
																											</tgridrow>
																										</children>
																										<variables/>
																									</template>
																								</children>
																								<variables/>
																							</template>
																						</children>
																						<variables/>
																					</template>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
														</children>
													</conditionbranch>
												</children>
											</condition>
											<condition>
												<children>
													<conditionbranch xpath="../vacation=&apos;true&apos;">
														<children>
															<newline/>
															<tgrid>
																<properties border="0" cellpadding="0" cellspacing="0"/>
																<styles border="1px solid black"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="25%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="15%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="40%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="20%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridheader-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Poistenie dovolenkovej domácnosti (časť J VPPIKCP/0114)">
																								<styles font-weight="bold"/>
																							</text>
																							<text fixtext=", poistná suma je uvedená v prílohe k poistnej zmluve typu 701/702 **"/>
																						</children>
																					</tgridcell>
																					<tgridcell joinleft="1"/>
																					<tgridcell joinleft="1"/>
																					<tgridcell joinleft="1"/>
																				</children>
																			</tgridrow>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles border-top="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Meno a priezvisko poisteného">
																								<styles font-weight="bold"/>
																							</text>
																							<newline/>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" border-top="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Dátum narodenia">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" border-top="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Miesto poistenia - adresa">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" border-top="1px solid black" padding="5px" text-align="left"/>
																						<children>
																							<text fixtext="Č. bytu / podlažie/ č. domu">
																								<styles font-weight="bold"/>
																							</text>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridheader-rows>
																	<tgridbody-rows>
																		<children>
																			<template subtype="source" match="XML">
																				<children>
																					<template subtype="element" match="agreement">
																						<children>
																							<template subtype="element" match="insuredPersons">
																								<children>
																									<template subtype="element" match="person">
																										<children>
																											<tgridrow conditional-processing="personData/vacation">
																												<children>
																													<tgridcell>
																														<styles border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="name">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext=" "/>
																															<template subtype="element" match="surname">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="birthDate">
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
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="vacationObj">
																																<children>
																																	<template subtype="element" match="street">
																																		<children>
																																			<content subtype="regular"/>
																																		</children>
																																		<variables/>
																																	</template>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext="  "/>
																															<template subtype="element" match="vacationObj">
																																<children>
																																	<template subtype="element" match="streetNumber">
																																		<children>
																																			<content subtype="regular"/>
																																		</children>
																																		<variables/>
																																	</template>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext="  "/>
																															<template subtype="element" match="vacationObj">
																																<children>
																																	<template subtype="element" match="postalCode">
																																		<children>
																																			<content subtype="regular"/>
																																		</children>
																																		<variables/>
																																	</template>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext="  "/>
																															<template subtype="element" match="vacationObj">
																																<children>
																																	<template subtype="element" match="city">
																																		<children>
																																			<content subtype="regular"/>
																																		</children>
																																		<variables/>
																																	</template>
																																</children>
																																<variables/>
																															</template>
																															<newline/>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black" padding="5px"/>
																														<children>
																															<template subtype="element" match="vacationObj">
																																<children>
																																	<template subtype="element" match="buildingNr">
																																		<children>
																																			<content subtype="regular"/>
																																		</children>
																																		<variables/>
																																	</template>
																																</children>
																																<variables/>
																															</template>
																															<text fixtext=" "/>
																															<template subtype="element" match="vacationObj">
																																<children>
																																	<template subtype="element" match="floorNr">
																																		<children>
																																			<content subtype="regular"/>
																																		</children>
																																		<variables/>
																																	</template>
																																</children>
																																<variables/>
																															</template>
																															<newline/>
																														</children>
																													</tgridcell>
																												</children>
																											</tgridrow>
																										</children>
																										<variables/>
																									</template>
																								</children>
																								<variables/>
																							</template>
																						</children>
																						<variables/>
																					</template>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
														</children>
													</conditionbranch>
												</children>
											</condition>
											<condition>
												<children>
													<conditionbranch xpath="../hasAgreementDiscount=&apos;true&apos;">
														<children>
															<newline/>
															<tgrid>
																<properties border="0" cellpadding="5" cellspacing="0" width="100%"/>
																<styles border="1px solid black"/>
																<children>
																	<tgridbody-cols>
																		<children>
																			<tgridcol>
																				<properties width="40%"/>
																			</tgridcol>
																			<tgridcol>
																				<properties width="60%"/>
																			</tgridcol>
																		</children>
																	</tgridbody-cols>
																	<tgridheader-rows>
																		<children>
																			<tgridrow>
																				<children>
																					<tgridcell>
																						<styles border-top="1px solid black"/>
																						<children>
																							<text fixtext="Typ zľavy"/>
																						</children>
																					</tgridcell>
																					<tgridcell>
																						<styles border-left="1px solid black" border-top="1px solid black"/>
																						<children>
																							<text fixtext="Výška zľavy"/>
																						</children>
																					</tgridcell>
																				</children>
																			</tgridrow>
																		</children>
																	</tgridheader-rows>
																	<tgridbody-rows>
																		<children>
																			<template subtype="source" match="XML">
																				<children>
																					<template subtype="element" match="agreement">
																						<children>
																							<template subtype="element" match="discounts">
																								<children>
																									<template subtype="element" match="discount">
																										<children>
																											<tgridrow conditional-processing="persons=&apos;false&apos;">
																												<children>
																													<tgridcell>
																														<styles border-top="1px solid black"/>
																														<children>
																															<template subtype="element" match="type">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																													<tgridcell>
																														<styles border-left="1px solid black" border-top="1px solid black"/>
																														<children>
																															<template subtype="element" match="priceText">
																																<children>
																																	<content subtype="regular"/>
																																</children>
																																<variables/>
																															</template>
																														</children>
																													</tgridcell>
																												</children>
																											</tgridrow>
																										</children>
																										<variables/>
																									</template>
																								</children>
																								<variables/>
																							</template>
																						</children>
																						<variables/>
																					</template>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridbody-rows>
																</children>
															</tgrid>
														</children>
													</conditionbranch>
												</children>
											</condition>
											<newline/>
											<newline/>
											<newline/>
											<tgrid>
												<properties border="0" cellpadding="5" cellspacing="0" width="100%"/>
												<styles border="1px solid black"/>
												<children>
													<tgridbody-cols>
														<children>
															<tgridcol>
																<properties width="40%"/>
															</tgridcol>
															<tgridcol>
																<properties width="60%"/>
															</tgridcol>
														</children>
													</tgridbody-cols>
													<tgridbody-rows>
														<children>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles border-right-color="black" border-right-style="solid" border-right-width="thin"/>
																		<children>
																			<text fixtext="POISTNÉ SPOLU">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles text-align="right"/>
																		<children>
																			<template subtype="element" match="totalPriceText">
																				<children>
																					<content subtype="regular">
																						<styles font-weight="bold"/>
																					</content>
																				</children>
																				<variables/>
																			</template>
																			<text fixtext=" "/>
																			<text fixtext="EUR">
																				<styles font-weight="bold"/>
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
									</paragraph>
									<newline/>
									<paragraph>
										<styles font-size="14px" line-height="1.2" margin="0" padding="0"/>
										<children>
											<tgrid>
												<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
												<children>
													<tgridbody-cols>
														<children>
															<tgridcol>
																<styles width="50%"/>
															</tgridcol>
															<tgridcol>
																<styles width="50%"/>
															</tgridcol>
														</children>
													</tgridbody-cols>
													<tgridbody-rows>
														<children>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles border="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="Druh poistného">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="jednorazové"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles border="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="Splatnosť poistného">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="naraz"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles border="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="Dátum splatnosti">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border="1px solid black" padding="5px"/>
																		<children>
																			<template subtype="element" match="insuredFrom">
																				<children>
																					<content subtype="regular"/>
																				</children>
																				<variables/>
																			</template>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles border="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="Spôsob platby jednorazového poistného">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border="1px solid black" padding="5px"/>
																		<children>
																			<text fixtext="prevodným príkazom"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
														</children>
													</tgridbody-rows>
												</children>
											</tgrid>
										</children>
									</paragraph>
									<newline/>
									<paragraph>
										<styles font-size="14px" line-height="14px" text-align="justify"/>
										<children>
											<text fixtext="Zvláštne dojednania">
												<styles font-size="14px" font-weight="bold"/>
											</text>
											<newline/>
											<tgrid>
												<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
												<children>
													<tgridbody-cols>
														<children>
															<tgridcol>
																<properties width="5%"/>
															</tgridcol>
															<tgridcol>
																<properties width="95%"/>
															</tgridcol>
														</children>
													</tgridbody-cols>
													<tgridbody-rows>
														<children>
															<tgridrow>
																<children>
																	<tgridcell>
																		<children>
																			<text fixtext="A.">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="Poistenie storna objednanej služby">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<children>
																			<text fixtext="Pre prípad dojednania poistenia storna objednanej služby sa osobitne dojednáva, že poistné krytie v zmysle časti F, čl. 2 bod 1 a čl. 4 VPPIKCP/0114sa rozširuje takto:"/>
																		</children>
																	</tgridcell>
																	<tgridcell joinleft="1"/>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles vertical-align="top"/>
																		<children>
																			<text fixtext="1."/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="okrem dôvodov uvedených v časti F, čl. 2 bod 1 VPPIKCP/0114 je poistnou udalosťou aj stornovanie objednanej služby z dôvodu zamietnutia žiadosti o pridelenie víz príslušným zastupiteľským úradom krajiny, do ktorej chce poistený vycestovať."/>
																			<newline/>
																			<text fixtext="Maximálna výška poistného plnenia poisťovateľa je v tomto prípade 80% stornopoplatku uplatneného poskytovateľom služby, maximálne však 1.000 EUR / osoba."/>
																			<newline/>
																			<text fixtext="V tomto prípade je poistený, v súlade s časťou F, čl. 5, bod 3, písm. o) VPPIKCP/0114, povinný predložiť poisťovateľovi aj doklad preukazujúci zamietnutie žiadosti o pridelenie víz, potvrdený príslušným zastupiteľským úradom krajiny, ktorá mu túto žiadosť zamietla s uvedením dôvodu zamietnutia."/>
																			<newline/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles vertical-align="top"/>
																		<children>
																			<text fixtext="2."/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="okrem dôvodov uvedených v časti F, čl. 2 bod 1 VPPIKCP/0114 je poistnou udalosťou aj stornovanie objednanej služby z dôvodu zmeškania odchodu hromadného dopravného prostriedku do zahraničia z dôvodu dopravnej nehody, ktorej priamym účastníkom bol poistený, pričom k dopravnej nehode došlo počas prepravy poisteného na miesto odchodu hromadného dopravného prostriedku, ktorým mal poistený cestovať do zahraničia."/>
																			<newline/>
																			<text fixtext="Maximálna výška poistného plnenia poisťovateľa je v týchto prípadoch 50% stornopoplatku uplatneného poskytovateľom služby, maximálne však 500 EUR / osoba."/>
																			<newline/>
																			<text fixtext="V tomto prípade je poistený, v súlade s časťou F, čl. 5, bod 3, písm. o) VPPIKCP/0114, povinný predložiť poisťovateľovi aj záznam o dopravnej nehode vydaný príslušným Dopravným inšpektorátom."/>
																			<newline/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles vertical-align="top"/>
																		<children>
																			<text fixtext="3."/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="okrem dôvodov uvedených v časti F, čl. 2 bod 1 VPPIKCP/0114 je poistnou udalosťou aj stornovanie objednanej služby z dôvodu zmeškania odchodu hromadného dopravného prostriedku do zahraničia z dôvodu technickej poruchy dopravného prostriedku, ktorým sa poistený prepravoval na miesto odchodu hromadného dopravného prostriedku, ktorým mal poistený cestovať do zahraničia."/>
																			<newline/>
																			<text fixtext="Maximálna výška poistného plnenia poisťovateľa je v týchto prípadoch 50% stornopoplatku uplatneného poskytovateľom služby, maximálne však 500 EUR / osoba."/>
																			<newline/>
																			<text fixtext="V tomto prípade je poistený, v súlade s časťou F, čl. 5, bod 3, písm. o) VPPIKCP/0114, povinný predložiť poisťovateľovi aj doklad o vzniku a rozsahu technickej poruchy od príslušného dopravcu."/>
																			<newline/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles vertical-align="top"/>
																		<children>
																			<text fixtext="4."/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="4.	okrem dôvodov uvedených v časti F, čl. 2 bod 1 VPPIKCP/0114 je poistnou udalosťou aj stornovanie objednanej služby z dôvodu nepredvídanej zmeny pôvodného termínu skúšky z prevádzkových dôvodov školy alebo nepredvídanej zmeny pôvodného termínu skúšky zo strany skúšajúceho, ktorý mal skúšku vykonať, pokiaľ je poistený zapísaný ako študent riadneho denného štúdia na vysokej škole."/>
																			<newline/>
																			<text fixtext="Maximálna výška poistného plnenia poisťovateľa je v tomto prípade 50% stornopoplatku uplatneného poskytovateľom služby, maximálne však 500 EUR / osoba."/>
																			<newline/>
																			<text fixtext="V tomto prípade je poistený, v súlade s časťou F, čl. 5, bod 3, písm. o) VPPIKCP/0114, povinný predložiť poisťovateľovi aj potvrdenie vysokej školy, ktorej je poistený študentom riadneho denného štúdia o zmene pôvodného termínu skúšky z prevádzkových dôvodov školy alebo zo strany skúšajúceho, ktorý mal skúšku vykonať."/>
																			<newline/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles vertical-align="top"/>
																		<children>
																			<text fixtext="5."/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="okrem dôvodov uvedených v časti F, čl. 2 bod 1 VPPIKCP/0114 je poistnou udalosťou aj stornovanie objednanej služby z dôvodu nepredvídaného zrušenia služobnej cesty z dôvodu zrušenia konferencie, sympózia, kongresu, výstavy alebo iného dlhodobo plánovaného pracovného stretnutia, na ktorom sa mal poistený zúčastniť, zo strany organizátora tejto konferencie alebo sympózia, kongresu, výstavy alebo iného dlhodobo plánovaného pracovného stretnutia."/>
																			<newline/>
																			<text fixtext="Maximálna výška poistného plnenia poisťovateľa je v tomto prípade 50% stornopoplatku uplatneného poskytovateľom služby, maximálne však 500 EUR / osoba."/>
																			<newline/>
																			<text fixtext="V tomto prípade je poistený, v súlade s časťou F, čl. 5, bod 3, písm. o) VPPIKCP/0114, povinný predložiť poisťovateľovi aj doklad preukazujúci zrušenie konferencie alebo sympózia, kongresu, výstavy alebo iného dlhodobo plánovaného pracovného stretnutia, potvrdený príslušným organizátorom tejto konferencie alebo sympózia, kongresu, výstavy alebo iného dlhodobo plánovaného pracovného stretnutia, ktorý túto konferenciu alebo sympózium, kongres, výstavu alebo iné dlhodobo plánované pracovné stretnutie zrušil."/>
																			<newline/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
														</children>
													</tgridbody-rows>
												</children>
											</tgrid>
											<text fixtext="   "/>
											<tgrid>
												<properties border="0" cellpadding="0" cellspacing="0" width="100%"/>
												<children>
													<tgridbody-cols>
														<children>
															<tgridcol>
																<properties width="4%"/>
															</tgridcol>
															<tgridcol>
																<properties width="4%"/>
															</tgridcol>
															<tgridcol>
																<properties width="92%"/>
															</tgridcol>
														</children>
													</tgridbody-cols>
													<tgridbody-rows>
														<children>
															<tgridrow>
																<children>
																	<tgridcell>
																		<children>
																			<text fixtext="B.">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="Poistenia predčasného návratu a nečerpaných služieb">
																				<styles font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell joinleft="1"/>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<children>
																			<text fixtext="1."/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="Ak sa poistený vrátil z pobytu v zahraničí pred jeho ukončením z dôvodu:"/>
																		</children>
																	</tgridcell>
																	<tgridcell joinleft="1"/>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="a)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="jeho akútnej choroby, úrazu alebo náhleho zhoršenia zdravotného stavu, za podmienky, že ošetrujúci lekár v zahraničí odporučil návrat do vlasti alebo"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="b)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="že mu v čase po vycestovaní do zahraničia zomrela blízka osoba alebo"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="c)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="že počas doby trvania pobytu v zahraničí blízka osoba poisteného bola hospitalizovaná vo vlasti poisteného v dôsledku akútnej choroby alebo úrazu ohrozujúceho jej život, alebo"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<styles vertical-align="top"/>
																		<children>
																			<text fixtext="d)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="že počas doby trvania pobytu v zahraničí nastala živelná udalosť, ktorá spôsobila škodu na majetku poisteného v mieste jeho trvalého pobytu a vyžaduje si jeho návrat do miesta trvalého pobytu."/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<children>
																			<text fixtext="2."/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="Poisťovateľ poskytne poistenému:"/>
																		</children>
																	</tgridcell>
																	<tgridcell joinleft="1"/>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<styles vertical-align="top"/>
																		<children>
																			<text fixtext="a)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="poistné plnenie vo výške cestovného spojeného s predčasným návratom z miesta pobytu v zahraničí do miesta trvalého pobytu iným ako pôvodne predpokladaným dopravným prostriedkom. Poistná suma je v tomto prípade 350 EUR / osoba"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<styles vertical-align="top"/>
																		<children>
																			<text fixtext="b)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="poistné plnenie za nečerpané služby, ktoré sa vypočíta ako základná cena objednaných služieb v zahraničí (t.j. cena za ubytovanie a stravu) za ten počet nocí, o ktoré sa vrátil poistený z pobytu v zahraničí skôr. Poistná suma je v tomto prípade 700 EUR / osoba."/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<children>
																			<text fixtext="3."/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="Poistnou udalosťou je:"/>
																		</children>
																	</tgridcell>
																	<tgridcell joinleft="1"/>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="a)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="akútna choroba, úraz alebo náhle zhoršenie zdravotného stavu poisteného, ktoré si vyžiadali návrat do vlasti, za podmienky, že ošetrujúci lekár v zahraničí návrat do vlasti odporučil"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="b)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="smrť blízkej osoby poisteného vo vlasti poisteného, ktorá nastala po dni vycestovania do zahraničia"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="c)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="hospitalizácia blízkej osoby poisteného v dôsledku choroby alebo úrazu bezprostredne ohrozujúceho život, ak hospitalizácia prebieha vo vlasti poisteného"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="d)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="živelná udalosť, ktorá spôsobila škodu na majetku poisteného v mieste jeho trvalého pobytu."/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell>
																		<children>
																			<text fixtext="4."/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="V tomto prípade je poistený povinný predložiť poisťovateľovi aj originály nasledovných dokladov:"/>
																		</children>
																	</tgridcell>
																	<tgridcell joinleft="1"/>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<styles vertical-align="top"/>
																		<children>
																			<text fixtext="a)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="správa ošetrujúceho lekára v zahraničí o zdravotnom stave poisteného s uvedením diagnózy a s uvedením informácie o odporučení návratu do vlasti, ak je poistnou udalosťou okolnosť uvedená v časti B, bod 3, písm. a) týchto zvláštnych dojednaní"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="b)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="štatistické hlásenie o úmrtí blízkej osoby poisteného, ak je poistnou udalosťou okolnosť uvedená v časti B, bod 3, písm. b) týchto zvláštnych dojednaní"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<styles vertical-align="top"/>
																		<children>
																			<text fixtext="c)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="správa ošetrujúceho lekára v mieste trvalého pobytu poisteného, ktorý poisteného ošetril po návrate do vlasti, ak je poistnou udalosťou okolnosť uvedená v časti B, bod 3, písm. a) týchto zvláštnych dojednaní"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<styles vertical-align="top"/>
																		<children>
																			<text fixtext="d)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="správa ošetrujúceho lekára v mieste trvalého pobytu blízkej osoby o zdravotnom stave blízkej osoby, ak je poistnou udalosťou okolnosť uvedená v časti B, bod 3, písm. c) týchto zvláštnych dojednaní"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="e)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="doklad preukazujúci vznik živelnej udalosti, ktorá spôsobila škodu na majetku poisteného, ak je poistnou udalosťou okolnosť uvedená v časti B, bod 3, písm. d) týchto zvláštnych dojednaní"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="f)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="potvrdenie ubytovacieho zariadenia s uvedením termínu ukončenia ubytovania"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="g)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="cestovné lístky na hromadný dopravný prostriedok z miesta pobytu v zahraničí do vlasti"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="h)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="doklad poskytovateľa objednanej služby o skladbe ceny objednanej služby"/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
															<tgridrow>
																<children>
																	<tgridcell/>
																	<tgridcell>
																		<children>
																			<text fixtext="i)"/>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<children>
																			<text fixtext="iné doklady jednoznačne preukazujúce vznik poistnej udalosti alebo iné doklady nevyhnutné pre likvidáciu poistnej udalosti, o ktoré poisťovateľ požiada."/>
																		</children>
																	</tgridcell>
																</children>
															</tgridrow>
														</children>
													</tgridbody-rows>
												</children>
											</tgrid>
										</children>
									</paragraph>
									<newline/>
									<paragraph>
										<styles font-size="14px" line-height="14px" text-align="justify"/>
										<children>
											<text fixtext="Poistenie začína nultou hodinou dňa označeného ako „platnosť poistenia od“ a konči 24. hodinou dňa označeného ako „platnosť poistenia do“, avšak len za podmienky, že poistná zmluva bola platne uzavretá, t.j. poistné bolo poukázané najneskôr 5 dní od predloženia návrhu na uzavretie poistnej zmluvy, nie však neskôr ako v deň, ktorý je označený v návrhu na uzavretie poistnej zmluvy ako „platnosť poistenia od“ (posledný deň lehoty na prijatie návrhu). Za deň poukázania poistného sa považuje deň, kedy bolo poistné odpísané z účtu poistníka v prospech účtu sprostredkovateľa poisťovateľa alebo deň prijatia poistného v hotovosti sprostredkovateľom poisťovateľa splnomocneným na inkasovanie poistného v hotovosti. Pokiaľ poistné nebude odpísané z účtu poistníka najneskôr v posledný deň lehoty na prijatie návrhu alebo pokiaľ poistné nebude poistníkom zaplatené v hotovosti sprostredkovateľovi poisťovateľa, poisťovateľ nebude svojim návrhom viazaný a tento zanikne uplynutím lehoty na jeho prijatie."/>
											<newline/>
											<text fixtext="Poistenia storna objednanej služby začína nasledujúcim dňom po poukázaní poistného a končí sa dňom nástupu na cestu smerujúcu k využitiu objednanej služby."/>
											<newline/>
											<newline/>
											<text fixtext="Pre poistenie podľa tohto návrhu na uzavretie poistnej zmluvy platia Všeobecné poistné podmienky individuálneho komplexného cestovného poistenia VPPIKCP/0114, ktoré obsahujú rozsah poistenia a podmienky spracúvania osobných údajov (príloha tohto návrhu na uzavretie poistnej zmluvy) a príloha k poistnej zmluve typu 701/702 s názvom „Rozsah poistenia a výška poistného krytia pre individuálne komplexné cestovné poistenie“, v ktorej je uvedený obsah jednotlivých poistení, poistné krytie a poistné sumy a vyhlásenia poistníka a poisteného (príloha tohto návrhu na uzavretie poistnej zmluvy)."/>
											<newline/>
										</children>
									</paragraph>
									<paragraph>
										<styles font-size="14px" line-height="14px" text-align="justify"/>
										<children>
											<newline/>
											<text fixtext="Poistník poukázaním poistného na účet sprostredkovateľa poisťovateľa alebo zaplatením poistného poistníkom v hotovosti sprostredkovateľovi poistenia uzavrie poistnú zmluvu a potvrdzuje, že:">
												<styles font-weight="bold"/>
											</text>
											<list>
												<properties type="square"/>
												<children>
													<listrow>
														<children>
															<text fixtext="že mu boli oznámené a e-mailom doručené Všeobecné poistné podmienky individuálneho komplexného cestovného poistenia VPPIKCP/0114, a že s nimi súhlasí">
																<styles font-weight="bold"/>
															</text>
														</children>
													</listrow>
													<listrow>
														<children>
															<text fixtext="že mu bola oznámená a e-mailom doručená príloha k poistnej zmluve typu 701/702 s názvom „Rozsah poistenia a výška poistného krytia pre individuálne komplexné cestovné poistenie“, a že s ňou súhlasí">
																<styles font-weight="bold"/>
															</text>
														</children>
													</listrow>
													<listrow>
														<children>
															<text fixtext="že mu bol oznámený a e-mailom doručený formulár o dôležitých zmluvných podmienkach uzatváranej poistnej zmluvy a informácie pre spotrebiteľa pred uzavretím poistnej zmluvy na diaľku v zmysle § 4 zákona c. 266/2005 Z. z. o ochrane spotrebiteľa pri finančných službách na diaľku"/>
														</children>
													</listrow>
												</children>
											</list>
										</children>
									</paragraph>
									<newline/>
									<paragraph>
										<styles font-size="14px" line-height="14px" text-align="justify"/>
										<children>
											<text fixtext="Všeobecné poistné podmienky individuálneho komplexného cestovného poistenia VPPIKCP/0114 a prílohu k poistnej zmluve typu 701/702 s názvom „Rozsah poistenia a výška poistného krytia pre individuálne komplexné cestovné poistenie“ nájdete aj na www.union.sk a na 0850 111 211.">
												<styles font-weight="bold"/>
											</text>
											<text fixtext=" Formulár o dôležitých zmluvných podmienkach uzatváranej poistnej zmluvy, informácie pre spotrebiteľa pri finančných službách na diaľku a ďalšie informácie o poisťovateľovi a poistení nájdete aj na www.union.sk."/>
											<newline/>
										</children>
									</paragraph>
									<newline/>
									<paragraph>
										<styles font-size="14px" line-height="14px"/>
										<children>
											<text fixtext="Miesto uzatvorenia poistnej zmluvy : ">
												<styles font-weight="bold"/>
											</text>
											<newline/>
											<text fixtext="mandátna zmluva č. / zmluva o obchodnom zastúpení č .: ">
												<styles font-weight="bold"/>
											</text>
											<newline/>
											<text fixtext="dňa">
												<styles font-weight="bold"/>
											</text>
										</children>
									</paragraph>
									<newline/>
									<newline/>
									<paragraph>
										<styles font-size="14px" line-height="14px"/>
										<children>
											<text fixtext="Súhlas so spracúvaním osobných údajov na účely marketingových aktivít">
												<styles font-weight="bold"/>
											</text>
											<newline/>
											<newline/>
											<text fixtext="V  zmysle § 11 zákona č. 122/2013 Z.z. o ochrane osobných údajov v znení neskorších predpisov a v zmysle § 3 zákona č. 147/2001 Z.z. o reklame a o zmene a doplnení niektorých zákonov v znení neskorších predpisov súhlasím:"/>
											<newline/>
										</children>
									</paragraph>
									<paragraph>
										<styles font-size="14px" line-height="14px" margin-left="20px"/>
										<children>
											<text fixtext="-  so spracúvaním osobných údajov na účely marketingových aktivít, t.j. aby moje osobné údaje uvedené v tabuľke Poistník tejto poistky (okrem rodného čísla) boli spracúvané Union poisťovňou, a.s. na účely marketingových aktivít a to najmä ponúkanie produktov a s nimi súvisiacich služieb, zisťovanie názorov na spokojnosť s poskytovanými službami realizovaných Union poisťovňou, a.s. alebo jej zmluvnými partnermi. Súčasne súhlasím s použitím svojho telefónneho čísla a e-mailovej adresy  na zasielanie marketingových správ formou elektronickej pošty alebo formou služieb krátkych správ. Súhlas je poskytnutý na dobu počas trvania poistnej zmluvy a na dobu 10 rokov po ukončení platnosti poistného vzťahu."/>
											<newline/>
										</children>
									</paragraph>
									<paragraph>
										<styles margin-left="20px" margin-top="5px"/>
										<children>
											<tgrid>
												<properties border="0" width="100%"/>
												<styles font-size="12px"/>
												<children>
													<tgridbody-cols>
														<children>
															<tgridcol/>
															<tgridcol/>
															<tgridcol/>
															<tgridcol/>
														</children>
													</tgridbody-cols>
													<tgridbody-rows>
														<children>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles border="1px solid black" height="10px" padding="2px" text-align="center" vertical-align="middle" width="20px"/>
																		<children>
																			<condition>
																				<children>
																					<conditionbranch xpath="consentAndPaymentOption/agreeMarketingS=&apos;1&apos;">
																						<children>
																							<text fixtext="X"/>
																						</children>
																					</conditionbranch>
																				</children>
																			</condition>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles padding="2px" vertical-align="middle"/>
																		<children>
																			<text fixtext="   ">
																				<styles font-size="10px" font-weight="bold"/>
																			</text>
																			<text fixtext="áno (súhlasím)">
																				<styles font-size="12px" font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border="1px solid black" height="10px" padding="2px" text-align="center" vertical-align="middle" width="20px"/>
																		<children>
																			<condition>
																				<children>
																					<conditionbranch xpath="consentAndPaymentOption/agreeMarketingS=&apos;2&apos;">
																						<children>
																							<text fixtext="X"/>
																						</children>
																					</conditionbranch>
																				</children>
																			</condition>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles padding="2px" vertical-align="middle"/>
																		<children>
																			<text fixtext="   ">
																				<styles font-size="10px" font-weight="bold"/>
																			</text>
																			<text fixtext="nie (nesúhlasím)">
																				<styles font-size="12px" font-weight="bold"/>
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
									</paragraph>
									<newline/>
									<paragraph>
										<styles font-size="14px" line-height="14px" margin-left="20px"/>
										<children>
											<text fixtext="-  s poskytnutím osobných údajov spoločnosti Union zdravotná poisťovňa, a.s., t.j. aby moje osobné údaje v rozsahu meno, priezvisko, titul, adresa trvalého pobytu, dátum narodenia, kontaktné číslo (telefónne číslo, faxové číslo, e-mailová adresa) boli poskytnuté spoločnosti Union zdravotná poisťovňa, a.s. so sídlom Bajkalská ul. 29/A, 821 08 Bratislava pre marketingové účely. Súčasne súhlasím so  zasielaním marketingových správ formou elektronickej pošty alebo formou služieb krátkych správ. Súhlas je  poskytnutý  do konca kalendárneho roka po ukončení platnosti tejto poistnej zmluvy."/>
											<newline/>
										</children>
									</paragraph>
									<paragraph>
										<styles margin-left="20px" margin-top="5px"/>
										<children>
											<tgrid>
												<properties border="0" width="100%"/>
												<styles font-size="12px"/>
												<children>
													<tgridbody-cols>
														<children>
															<tgridcol/>
															<tgridcol/>
															<tgridcol/>
															<tgridcol/>
														</children>
													</tgridbody-cols>
													<tgridbody-rows>
														<children>
															<tgridrow>
																<children>
																	<tgridcell>
																		<styles border="1px solid black" height="10px" padding="2px" text-align="center" vertical-align="middle" width="20px"/>
																		<children>
																			<condition>
																				<children>
																					<conditionbranch xpath="consentAndPaymentOption/agreeUnionzpS=&apos;1&apos;">
																						<children>
																							<text fixtext="X"/>
																						</children>
																					</conditionbranch>
																				</children>
																			</condition>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles padding="2px" vertical-align="middle"/>
																		<children>
																			<text fixtext="   ">
																				<styles font-size="10px" font-weight="bold"/>
																			</text>
																			<text fixtext="áno (súhlasím)">
																				<styles font-size="12px" font-weight="bold"/>
																			</text>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles border="1px solid black" height="10px" padding="2px" text-align="center" vertical-align="middle" width="20px"/>
																		<children>
																			<condition>
																				<children>
																					<conditionbranch xpath="consentAndPaymentOption/agreeUnionzpS=&apos;2&apos;">
																						<children>
																							<text fixtext="X"/>
																						</children>
																					</conditionbranch>
																				</children>
																			</condition>
																		</children>
																	</tgridcell>
																	<tgridcell>
																		<styles padding="2px" vertical-align="middle"/>
																		<children>
																			<text fixtext="   ">
																				<styles font-size="10px" font-weight="bold"/>
																			</text>
																			<text fixtext="nie (nesúhlasím)">
																				<styles font-size="12px" font-weight="bold"/>
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
									</paragraph>
									<newline/>
									<paragraph>
										<styles font-size="14px" line-height="14px"/>
										<children>
											<text fixtext="Poskytnutie osobných údajov na vyššie uvedené účely nie je povinné. Poistník  berie na vedomie, že súhlas je možné kedykoľvek odvolať a že odvolanie nemá spätné účinky."/>
										</children>
									</paragraph>
								</children>
								<variables/>
							</template>
						</children>
						<variables/>
					</template>
					<newline/>
					<text fixtext=" "/>
					<paragraph>
						<styles font-size="14px" line-height="14px"/>
						<children>
							<text fixtext="dňa">
								<styles font-weight="bold"/>
							</text>
						</children>
					</paragraph>
					<text fixtext=" "/>
				</children>
			</globaltemplate>
		</children>
	</mainparts>
	<globalparts/>
	<designfragments>
		<children>
			<globaltemplate subtype="named" match="InsurerAddress">
				<parameters/>
				<children>
					<template subtype="element" match="address">
						<children>
							<template subtype="element" match="street">
								<children>
									<content subtype="regular"/>
								</children>
								<variables/>
							</template>
							<text fixtext=" , "/>
						</children>
						<variables/>
					</template>
				</children>
			</globaltemplate>
		</children>
	</designfragments>
	<xmltables/>
	<authentic-custom-toolbar-buttons/>
</structure>
