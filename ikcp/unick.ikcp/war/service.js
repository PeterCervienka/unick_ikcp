// init service
window._service = {};

var getPredmetCode = function( riskGroup, isRetiree ) {
    if ( riskGroup && isRetiree != undefined ) {

        var risk = riskGroup;
        if (risk.length > 1) {
            risk = risk.substring(0, 1);
        }

        if ( isRetiree ) {
            risk += "D";
        }

        return risk;
    }
    return "";
};

window._service.calcIkcp = function ( data ) {
    var input = {},
        output = {
            // TODO: only tmp
            summary: 90 * Math.random().toFixed(2),
            persons : [
                { price: ( 10 * Math.random().toFixed(2) ) },
                { price: ( 10 * Math.random().toFixed(2) ) },
                { price: ( 10 * Math.random().toFixed(2) ) },
                { price: ( 10 * Math.random().toFixed(2) ) },
                { price: ( 10 * Math.random().toFixed(2) ) },
                { price: ( 10 * Math.random().toFixed(2) ) },
                { price: ( 10 * Math.random().toFixed(2) ) },
                { price: ( 10 * Math.random().toFixed(2) ) },
                { price: ( 10 * Math.random().toFixed(2) ) }
            ]
        };


    if ( data ) {

        input = {
            partner: "Aston",
            dpo: data.predmet,
            od: data.insuredFrom,
            do: data.insuredTo,
            uzemie: data.land.key,
            platenie: 4,
            zlavy_zmluva: [],
            persons: []
        };

        var today = new Date();
        for(var i = 0; i < data.insuredPersons.length; i++) {
            var personModel = data.insuredPersons[i];

            // TODO: change parameter false, when retiree will be implemented. Now input is always adult
            var predmet = getPredmetCode( personModel.riskGroup, false );

            var person = { id: (i + 1) };

            // set age
            if ( personModel.child ) {
                person.vek = 10;
            } else {
                person.vek = 18;
            }

            // set risk group
            person.skupina = personModel.riskGroup;

            // set array of risks
            person.skupiny_rizik = [];

            if ( personModel.medical ) {
                var skupina_rizika = {
                    kod: "B02",
                    predmet: predmet,
                    suma: 0 /* personModel.medicalPrice */
                };
                person.skupiny_rizik.push( skupina_rizika );
            }

            if ( personModel.baggage ) {
                var skupina_rizika = {
                    kod: "B03",
                    predmet: predmet,
                    suma: 0 /* personModel.baggagePrice */
                };
                person.skupiny_rizik.push( skupina_rizika );
            }

            if ( personModel.responsibility ) {
                var skupina_rizika = {
                    kod: "B04",
                    predmet: predmet,
                    suma: 0 /* personModel.responsibilityPrice */
                };
                person.skupiny_rizik.push( skupina_rizika );
            }

            if ( personModel.accident ) {
                var skupina_rizika = {
                    kod: "B01",
                    predmet: predmet,
                    suma: 0 /* personModel.accidentPrice */
                };
                person.skupiny_rizik.push( skupina_rizika );
            }

            if ( personModel.technicalHelp ) {
                var skupina_rizika = {
                    kod: "B05",
                    predmet: predmet,
                    suma: 0 /* personModel.technicalHelpPrice */
                };
                person.skupiny_rizik.push( skupina_rizika );
            }

            if ( personModel.storno > 0) {
                // TODO: now only 30. This info has to be filled by server.
                var skupina_rizika = {
                    kod: "R02",
                    predmet: personModel.stornoObj.type + "_30",
                    percento: 30,
                    suma: personModel.storno
                };
                person.skupiny_rizik.push( skupina_rizika );
            }

            if ( personModel.pet ) {
                var skupina_rizika = {
                    kod: "R01",
                    predmet: personModel.petType,
                    suma: 0 /* personModel.petPrice */
                };
                person.skupiny_rizik.push( skupina_rizika );
            }

            if ( personModel.vacation ) {
                var skupina_rizika = {
                    kod: "R04",
                    predmet: "PS20tis",
                    suma: 0 /* personModel.vacationPrice */
                };
                person.skupiny_rizik.push( skupina_rizika );
            }

            // set discount card
            if(personModel.discountCard == true) {
                person.zlava_osoba = personModel.discountCardType;
            } else {
                person.zlava_osoba = "";
            }

            input.persons.push( person );
        }


        // output = window._apiJson("calcIkcp", input);
    }

    return output;
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