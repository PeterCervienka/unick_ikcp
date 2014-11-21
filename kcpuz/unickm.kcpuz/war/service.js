// init service
window._service = {};

// service requests
window._service.calculateCoverage = function( data ) {

	var payload = {
		partner: "Aston",
		zdroj: "SR",
		od: "",
		do: "",
		balik: "",
		uzemie: "",
		skupina: "",
		osoby: []
	}, osobaId = 1;

	payload.od = data.insuredFrom + "T00:00:00";
	payload.do = data.insuredTo + "T00:00:00";
	payload.uzemie = data.country;

	for( var i = 0; i < data.childrenCount; i++ ){
		payload.osoby.push({
			id: osobaId,
			vek: 0
		});

		osobaId++;
	}

	for( var i = 0; i < data.adultsCount; i++ ){
		payload.osoby.push({
			id: osobaId,
			vek: 15
		});

		osobaId++;
	}

	var response = {
			coverage: {},
			dv: {}
	};

	for( var balikPos in data.baliky ){
		
		var balik = data.baliky[balikPos],
			total=0,
			osobaID = 0;

		payload.balik = balik;

		if( payload.uzemie == "SR" && (payload.balik == "A" || payload.balik == "B") ){

		 	if( data.riskGroupSport ){
		 		payload.skupina = "S";
		 	} else {
		 		payload.skupina = ".";
		 	}
		} else {
			payload.skupina = ( data.riskGroupSport ) ? "S" : "T";
		}

		var responseData = window._apiJson("calcKcpuz", payload);
		
		response.coverage[ "rateTotalAdults" + payload.balik ] = 0;
		response.coverage[ "rateTotalChildren" + payload.balik ] = 0;

		if (responseData &&
			responseData.hasOwnProperty("errCode") == true &&
			responseData.errCode > -1 &&
			responseData.hasOwnProperty("osoby") == true) {

			for( var i = 0; i < responseData.osoby.length; i++) {

				var osoba = responseData.osoby[i],
					key1 = "r" + osoba.skupinoveRizoko + "p" + balik;

				if( osoba.id != osobaID ){
					osobaID = osoba.id;
					response.coverage[ "totalOsoba" + payload.balik + osobaID ] = 0;
				}
				
				total += osoba.poistneOsoba;
				
				if( response.coverage.hasOwnProperty(key1) == true ){
					response.coverage[ key1 ] += osoba.poistneOsoba;
				} else {
					response.coverage[ key1 ] = osoba.poistneOsoba;
				}
				
				response.coverage[ "totalOsoba" + payload.balik + osobaID ] += osoba.poistneOsoba;
				
				if (payload.osoby[osobaID - 1].vek < 15) {
					response.coverage[ "rateTotalChildren" + payload.balik ] += osoba.poistneOsoba;
				} else {
					response.coverage[ "rateTotalAdults" + payload.balik ] += osoba.poistneOsoba;
				}
				
			}
			
			response.coverage[ "total" + payload.balik ] = total.toFixed(2);
			
			if (data.childrenCount != 0) {
				response.coverage[ "rateTotalChildren" + payload.balik ] = response.coverage[ "rateTotalChildren" + payload.balik ] / data.childrenCount;
			}
			if (data.adultsCount != 0) {
				response.coverage[ "rateTotalAdults" + payload.balik ] = response.coverage[ "rateTotalAdults" + payload.balik ] / data.adultsCount;
			}
			
			if( responseData.dv ){
				response.dv["dv" + payload.balik] = responseData.dv;	
			}
		}

	}

	return response;
};

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

	var model = new CKZajazdy( data ),
		step1Valid = false,
		step2Valid = false,
		vs = "",
		priceText = "",
		countryText = "",
		xml,
		pdf1,
		pdf2,
		pdf3,
		pdf4;

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
	model.watchCoverage();
	model.watchDV();
	model.watchPack();
	if (data.poistneSuma != model.poistneSuma) {
		return {status: "error", message: "Wrong price" };
	}
	
	//vs
	vs = window._apiRaw("generateKcpuzVS", "");
	model.variableSymbol = vs;
	
	// priceText 
	priceText = window._apiRaw("priceText", model.poistneSuma);
	model.poistneSumaText = priceText;

	//xml
	var modelJson = ko.toJSON(model);
	var xml = window._apiRaw("createKcpuzXml", modelJson);
	
	console.log("XML",modelJson, xml);
	
	pdf1 = window._apiJson("createPdf", { name: vs + "_zmluva.pdf", template:"ck_agreement.xslt", data: "@kcpuz.xml" } );
	pdf2 = window._apiJson("createPdf", { name: vs + "_poistna-karta.pdf", template:"ck_card.xslt", data: "@kcpuz.xml" } );
	pdf3 = window._apiJson("createPdf", { name: vs + "_poziadavka-na-platbu.pdf", template:"ck_payment_order.xslt", data: "@kcpuz.xml" } );
	pdf4 = window._apiJson("createPdf", { name: vs + "_prijmovy-pokladnickny-doklad.pdf", template:"ck_card_sr.xslt", data: "@kcpuz.xml" } );

	window._apiJson("saveKcpuzZip", {vs:vs, docs: [ 'kcpuz.xml', pdf1, pdf2, pdf3, pdf4 ] });

	return {
		status: "ok",
		vs: vs,
		pdf1: "document/" + pdf1,
		pdf2: "document/" + pdf2,
		pdf3: "document/" + pdf3,
		pdf4: "document/" + pdf4
	};
};