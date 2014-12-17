// init service
window._service = {};

var getPredmetCode = function( riskGroup, age ) {
    // T, H, P, HD, TD

    var risk = riskGroup;
    if (risk.length > 1) {
        risk = risk.substring(0, 1);
    }

    if ( age == "R" ) {
        risk += "D";
    }

    return risk;

};

window._service.calcIkcp = function ( data ) {
    var input = {},
        output = {};

    if ( data ) {

        // init input object
        input.data = {}

        // init header's data
        input.data.header = {
            partner: "Aston",
            dpo: data.predmet,
            od: data.insuredFromUS + "T00:00:00",
            do: data.insuredToUS + "T00:00:00",
            uzemie: data.land.key,
            platenie: 4,
            zlavy_zmluva: []
        };

        // set all discounts
        var dis = data.discounts;
        if ( dis && dis.length > 0 ) {
            for( var i = 0; i < dis.length; i++) {
                var d = dis[i];
                if ( d ) {
                    input.data.header.zlavy_zmluva.push(d.type );
                }
            }
        }

        // init array of insured persons
        input.data.persons = [];

        // fill insured persons
        var today = new Date();
        for(var i = 0; i < data.insuredPersons.length; i++) {
            var personModel = data.insuredPersons[i];

            var predmet = getPredmetCode( personModel.riskGroup, personModel.age );

            var personObj = { id: (i + 1) };

            // set age
            if ( personModel.age == "CH" ) {
                personObj.vek = 10;
            } else if ( personModel.age = "A" ) {
                personObj.vek = 18;
            } else {
                personObj.vek = 75;
            }

            personObj.skupiny_rizik = [];
            // set risk group
            personObj.skupina = personModel.riskGroup;

            // set array of risks
            var arr_skupina_rizika = [];

            if ( data.isDomesticalTrip == false ) {
                if ( personModel.medical ) {
                    var riskGroup = {
                        kod: "B02",
                        predmet: predmet
                    };
                    personObj.skupiny_rizik.push( new skupina_rizika( riskGroup ) );
                }
            }

            if ( personModel.baggage > 0 ) {
                var riskGroup = {
                    kod: "B03",
                    predmet: predmet,
                    suma: personModel.baggage
                };
                personObj.skupiny_rizik.push( new skupina_rizika( riskGroup ) );
            }

            if ( personModel.responsibility ) {
                var riskGroup = {
                    kod: "B04",
                    predmet: predmet
                };
                personObj.skupiny_rizik.push( new skupina_rizika( riskGroup ) );
            }

            if ( personModel.accident ) {
                var riskGroup = {
                    kod: "B01",
                    predmet: predmet
                };

                personObj.skupiny_rizik.push( new skupina_rizika( riskGroup ) );
            }

            if ( data.isDomesticalTrip == true ) {
                if (personModel.rescueService) {
                    var riskGroup = {
                        kod: "B05",
                        predmet: predmet
                    };
                    personObj.skupiny_rizik.push(new skupina_rizika(riskGroup));
                }
            }

            if ( data.isDomesticalTrip == false ) {
                if (personModel.technicalHelp) {
                    var riskGroup = {
                        kod: "B06",
                        predmet: predmet
                    };
                    personObj.skupiny_rizik.push(new skupina_rizika(riskGroup));
                }
            }

            if ( personModel.storno > 0) {
                // TODO: now only 30. This info has to be filled by server.
                var riskGroup = {
                    kod: "R02",
                    predmet: personModel.stornoObj.type + "_30",
                    percento: 30,
                    suma: personModel.storno
                };
                personObj.skupiny_rizik.push( new skupina_rizika( riskGroup ) );
            }


            if ( data.isDomesticalTrip == false ) {
                if (personModel.pet) {
                    var riskGroup = {
                        kod: "R01",
                        predmet: personModel.petType
                    };
                    personObj.skupiny_rizik.push(new skupina_rizika(riskGroup));
                }
            }

            if ( personModel.vacation ) {
                var riskGroup = {
                    kod: "R04",
                    predmet: "PS20tis",
                    suma: 20000
                };
                personObj.skupiny_rizik.push( new skupina_rizika( riskGroup ) );
            }

            // set discount card
            if(personModel.discountCard == true) {
                personObj.zlava_osoba = personModel.discountCardType;
            } else {
                personObj.zlava_osoba = "";
            }

            input.data.persons.push( new person( personObj ) );
        }

        output = window._apiJson("calcIkcp", input);
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
	
	countryText = window._apiJson("codelist", { name: 'Stat_krajina', id: data } );
	
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
	
	pdf1 = window._apiJson("createPdf", { name: vs + "_zmluva.pdf", template:"ikcp_agreement.xslt", data: "@ikcp.xml" } );
    pdf2 = window._apiJson("createPdf", { name: vs + "_zmluva_navrh.pdf", template:"ikcp_agreement_ckm.xslt", data: "@ikcp.xml" } );
	pdf3 = window._apiJson("createPdf", { name: vs + "_poistna-karta.pdf", template:"ikcp_card.xslt", data: "@ikcp.xml" } );
	pdf4 = window._apiJson("createPdf", { name: vs + "_prijmovy-pokladnickny-doklad.pdf", template:"ikcp_payment_order.xslt", data: "@ikcp.xml" } );

	window._apiJson("saveIkcpZip", {vs:vs, docs: [ 'ikcp.xml', pdf1, pdf2, pdf3 ] });

	return {
		status: "ok",
		vs: vs,
		pdf1: "document/" + pdf1,
        pdf2: "document/" + pdf2,
		pdf2: "document/" + pdf3,
		pdf3: "document/" + pdf4
	};
};