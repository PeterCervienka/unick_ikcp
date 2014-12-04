// init service
window._service = {};

window._service.codelistTitle = function( data ) {
	
	var result = window._apiJson("codelist", data ),
		i;

	for( i=0; i < result.length; i++ ){
		result[i]["value"] = result[i].text;
	}
	
	return result;
};

window._service.countryText = function ( data ) {
	
	var	countryText = "";
	
	countryText = window._apiJson("codelist", { name: 'Stat_krajina', 'id': data } );
	
	return countryText;
};

window._service.save = function( data ) {

	var model = new IkcpModel( data ),
		step1Valid = false,
		step2Valid = false,
		vs = "",
		priceText = "",
		countryText = "",
		xml,
		pdf1,
		pdf2,
		pdf3;

	//valid
	step1Valid = model.validateStep1();
	step2Valid = model.validateStep2();


	if( !step1Valid || !step2Valid ){
		return { status:"error", message:"Validation failed" };
	}
	
	/*
	 * zavolat vsetky funckie, aby sme mohli dopocitat model (hodnoty: poistneSuma, rateAdults, rateChildren)
	 * - robi sa to kovli spustaniu na serveri, lebo vtedy su hodnoty atributov 0
	 */
	if (data.totalPrice != model.totalPrice()) {
		return {status: "error", message: "Wrong price" };
	}
	
	//vs
	vs = window._apiRaw("generateIkcpVS", "");
	model.variableSymbol = vs;
	
	// priceText 
	priceText = window._apiRaw("priceText", model.totalPrice());
	model.poistneSumaText = priceText;

	//xml
	var modelJson = ko.toJSON(model);
	var xml = window._apiRaw("createIkcpXml", modelJson);
	
	console.log("XML",modelJson, xml);
	
	pdf1 = window._apiJson("createPdf", { name: vs + "_zmluva.pdf", template:"ck_agreement.xslt", data: "@ikcp.xml" } );
	pdf2 = window._apiJson("createPdf", { name: vs + "_poistna-karta.pdf", template:"ck_card.xslt", data: "@ikcp.xml" } );
	pdf3 = window._apiJson("createPdf", { name: vs + "_prijmovy-pokladnickny-doklad.pdf", template:"ck_payment_order.xslt", data: "@ikcp.xml" } );

	window._apiJson("saveIkcpZip", {vs:vs, docs: [ 'ikcp.xml', pdf1, pdf2, pdf3 ] });

	return {
		status: "ok",
		vs: vs,
		pdf1: "document/" + pdf1,
		pdf2: "document/" + pdf2,
		pdf3: "document/" + pdf3
	};
};