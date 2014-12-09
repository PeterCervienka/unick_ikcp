/**
 * Created by Peter Cervienka on 21.11.2014.
 */

function IkcpModel( modelData ){

    // constants
    var self = this,
        now = new Date();

    this.today = new Date( now.getFullYear(), now.getMonth(), now.getDate() );

    modelData = modelData || {};
	modelData.insurer = modelData.insurer || {};
    modelData.documents = modelData.documents || {};

    this.step = ko.observable(1);

    this.risks = [
        {value: "Turista", key: "T"},
        {value: "Šport", key: "H"},
        {value: "Prac. cesta - nemanuálna práca", key: "PN"},
        {value: "Prac. cesta - manuálna práca", key: "PM"}
    ];

    this.baggages = [
        {value: "Žiadna", key: 0},
        {value: "700 €", key: 700},
        {value: "1 400 €", key: 1400},
        {value: "2 100 €", key: 2100},
        {value: "2 800 €", key: 2800}
    ];

    this.discountCardTypes = [
        {value: "ISIC", key: "ISIC"},
        {value: "EURO 26", key: "EURO26"},
        {value: "GO 26", key: "GO26"},
        {value: "ITIC", key: "ITIC"},
        {value: "RODINA", key: "RODINA"},
        {value: "UZP", key: "UZP"},
        {value: "Obchodná zľava", key: "Obchodná zlava"},
        {value: "PGP", key: "PGP"}
    ];

    this.stornoTypes = [
        {value: "Cestovný lískok - letenka", key: "let"},
        {value: "Cestovný lískok - autobus", key: "bus"},
        {value: "Cestovný lískok - loď, trajekt", key: "lod"},
        {value: "Cestovný lískok - vlak", key: "vlak"},
        {value: "Ubytovanie", key: "ybyt"},
        {value: "Zájazd", key: "zaj"},
        {value: "Študijný program", key: "stprog"},
        {value: "Iné", key: "ine"}

    ];

    this.petTypes = [
        {value: "Pes", key: "pes"},
        {value: "Mačka", key: "macka"},
        {value: "Vták", key: "vtak"},
        {value: "Zajac", key: "zajac"},
        {value: "Iné", key: "ine"}
    ];

    this.signingDate = dateTimeToSK(now); //terajsi cas, nastavit pri pokuse o uzavretie pojistky
    this.variableSymbol = "";
    this.predmet = "701";

    this.insuredFrom = ko.observable( modelData.insuredFrom || dateToSK( this.today ) );
    this.insuredTo = ko.observable( modelData.insuredTo || dateToSK( this.today ) );
    this.insuredDays = ko.computed(function(){
        var fromDate = makeDateSK( this.insuredFrom()),
            toDate = makeDateSK( this.insuredTo());

        return daydiff( fromDate, toDate ) + 1;
    }, this);

    if ( modelData.discounts && modelData.discounts.length > 0) {
        this.discounts = ko.observableArray( ko.utils.arrayMap( modelData.discounts, function( item ){
            return new DiscountObj( item );
        }));
    } else {
        this.discounts = ko.observableArray();
    }

    this.land = ko.observable( modelData.land );
    this.landDisable = ko.observable( false );
	this.country = ko.observable( modelData.country || "SR");
    this.areaDisable = ko.observable( true );
	this.step1Invalid = ko.observable(false);
	this.step2Invalid = ko.observable(false);
	this.step3Invalid = ko.observable(false);

    this.documents = ko.observable(modelData.documents || {});

    this.childrenCount = ko.observable( parseInt(modelData.childrenCount) || 0 );
    this.adultsCount = ko.observable( parseInt(modelData.adultsCount) || 1 );
    this.summaryPersonsCount = ko.computed(function() {
        var count = parseInt(self.childrenCount(), 10) + parseInt(self.adultsCount(), 10);
        return count;
    }, this);

    this.childrenCountByDate = ko.observable( parseInt(modelData.childrenCountByDate) || 0 );
    this.adultsCountByDate = ko.observable( parseInt(modelData.adultsCountByDate) || 0 );

    this.personsBirthInvalid = ko.observable(false);

    this.insurer = new InsurerObj( modelData.insurer );

    if( modelData.insuredPersons && modelData.insuredPersons.length > 0 ){

        this.insuredPersons = ko.observableArray( ko.utils.arrayMap( modelData.insuredPersons, function( item ){
            return new PersonObj( item );
        }));

    } else {
        this.insuredPersons = ko.observableArray();
        // 3 insurers are present by default and first is editable
        this.insuredPersons.push( new PersonObj( { editable: true } ) );
        this.insuredPersons.push( new PersonObj( {  } ) );
        this.insuredPersons.push( new PersonObj( {  } ) );
    }
    this.totalPrice = ko.observable( parseFloat( modelData.totalPrice ) || 0 );


    this.watchAgesCount = ko.computed(function() {
        var sum = 0;
        for(var i=0; i<this.insuredPersons().length; i++)
        {
            var person = this.insuredPersons()[i];
            if (person.child()) {
                sum++;
            }
        }

        this.childrenCount( sum );
        this.adultsCount( this.insuredPersons().length - sum );
    }, this);

    this.isDomesticalTrip = ko.computed(function() {
        return this.country() == "SR";
    }, this);


    this.childrenSuffix = function( count ) {
        if (count && !isNaN(count)) {
            if (count == 0 || count >= 5) {
                return 'detí';
            } else if (count == 1) {
                return 'dieťa';
            } else if (count >= 2 || count <= 4) {
                return 'deti';
            }
        }
        return "";
    };

    this.adultsSuffix = function ( count ) {
        if (count && !isNaN(count)) {
            if (count == 0 || count >= 2) {
                return 'dospelých';
            } else if (count == 1) {
                return 'dospelého';
            }
        }
        return "";
    };

    this.childrenSuffixText1 = ko.computed(function () {
        return this.childrenSuffix( this.childrenCount() );
    }, this);

    this.childrenSuffixText2 = ko.computed(function () {
        return this.childrenSuffix( this.childrenCountByDate() );
    }, this);

    this.adultsSuffixText1 = ko.computed(function () {
        return this.adultsSuffix( this.adultsCount() );
    }, this);

    this.adultsSuffixText2 = ko.computed(function () {
        return this.adultsSuffix( this.adultsCountByDate() );
    }, this);


    this.insuredDays = ko.computed(function(){
        var fromDate = makeDateSK( this.insuredFrom()),
            toDate = makeDateSK( this.insuredTo());

        return daydiff( fromDate, toDate ) + 1;
    }, this);

    this.insuredDaysText = ko.computed(function(){
        var days = this.insuredDays(),
            daysText = "";

        if( days == 1 ){
            daysText = days + " deň";
        } else if( days > 1 && days < 5 ){
            daysText = days + " dni";
        } else if( days > 4 || days == 0 ){
            daysText = days + " dní";
        }

        return daysText;
    }, this);

    this.totalPriceText = ko.computed(function() {
    	return formatEuro(this.totalPrice());
    }, this);


    this.summaryText = ko.computed(function () {
        if ( this.isDomesticalTrip() ) {
            return "Rekapitulacia poistenia účastníkov domácich zájazdov ";
        } else {
            return "Rekapitulacia poistenia účastníkov zahraničných zájazdov";
        }
    }, this);

    // step 2
	this.insurerTypes = ko.observableArray([
		{forma: "FO", text: "Fyzická osoba"},
		{forma: "FOP", text: "Fyzická osoba - Podnikateľ"},
		{forma: "PO", text: "Právnická osoba"}

	]);

	this.insurerVisiblePerson = ko.computed(function(){
		if( this.insurer.isPerson() ){
			return true;
		} else {
			return false;
		}
	}, this);
	
	this.insurerNameLabel = ko.computed(function() {
		if (this.insurer.typ() == "FOP") {
			return "Názov";
		} else if (this.insurer.typ() == "PO") {
			return "Názov spoločnosti";
		}
	}, this);

    // disable checkbox 'same as insurer' if insurer is FOP and PO or if count of adults is zero.
    this.isSameEnable = ko.computed(function() {
        if( this.insurer.isPerson() && this.adultsCount() > 0){
            return true;
        } else {
            return false;
        }
    }, this);

    this.insurerSameClick = function(data, event){

        if( this.insurer.same() && this.insuredPersons().length > 0 ){

            var firstPerson = this.insuredPersons()[0];

            firstPerson.name( this.insurer.name() );
            firstPerson.surname( this.insurer.surname() );

            if( this.insurer.isPerson() ){

                var jsonDate = "";
                if( this.insurer.isCzechoSlovak() ) {
                    var birthDate = getDateFromRC( this.insurer.rc() );
                    jsonDate = parseDateSK( birthDate ) ;
                } else {
                    jsonDate = parseDateSK( this.insurer.birthDate()) ;
                }

                firstPerson.birthDateDay( jsonDate.day );
                firstPerson.birthDateMonth( jsonDate.month );
                firstPerson.birthDateYear( jsonDate.year );

            }

            firstPerson.citizen( this.insurer.citizen() );

        } else if( !this.insurer.same() && this.insuredPersons().length > 0 ){
            var firstPerson = this.insuredPersons()[0];

            firstPerson.name( "" );
            firstPerson.surname( "" );
            firstPerson.birthDateDay( "" );
            firstPerson.birthDateMonth( "" );
            firstPerson.birthDateYear( "" );
            firstPerson.citizen( "703" );
        }

        return true;
    };
	
    // validacie
	this.insuredFromInvalid = function( dateFrom, dateTo, today ){

        var maxDate = new Date( today.getTime() );
        maxDate.setFullYear( maxDate.getFullYear() + 1 );
        maxDate.setDate( maxDate.getDate() - 1 );

		if( !validDateSK( dateFrom ) ) {
			return "Zadajte správny dátum začiatku poistenia";
		} else if( makeDateSK( dateFrom ) < today ) {
			return "Dátum začiatku poistenia je v minulosti";
		} else if( makeDateSK( dateFrom ) > makeDateSK( dateTo ) ) {
			return "Dátum začiatku poistenia je za koncom poistenia";
		} else if( makeDateSK( dateFrom ) > maxDate ) {
            return "Dátum začiatku poistenia nesmie byť neskôr ako jeden rok";
        } else {
			return false;
		}
	};	

	this.insuredToInvalid = function( dateFrom, dateTo, today ){

        var maxDate = makeDateSK( dateFrom );
        maxDate.setFullYear( maxDate.getFullYear() + 1 );

		if( !validDateSK( dateTo ) ) {
			return "Zadajte správny dátum konca poistenia";
		} else if( makeDateSK( dateTo ) < today ) {
			return "Dátum konca poistenia je v minulosti";
		} else if( makeDateSK( dateTo ) < makeDateSK( dateFrom ) ) {
			return "Dátum konca poistenia je pred začiatkom poistenia";
		} else if( makeDateSK( dateTo ) > maxDate ) {
            return "Dátum konca poistenia nesmie byť neskôr ako rok od začiatku poistenia";
        } else {
			return false;
		}
	};
    
	// chybove atributy
	this.insuredFromError = ko.computed(function(){
		return this.insuredFromInvalid( this.insuredFrom(), this.insuredTo(), this.today );
	}, this );
	
	this.insuredToError = ko.computed(function(){
		return this.insuredToInvalid( this.insuredFrom(), this.insuredTo(), this.today );
	}, this );
	    
    this.landError = ko.computed(function(){
        if( this.land() == undefined || this.land().label.length == 0 || this.land().key == 0) {
            return "Zadajte krajinu";
        } else {
            return false;
        }
    }, this);

    this.areaError = ko.computed(function(){
        if( this.country() == undefined || this.country().length == 0 ) {
            return "Zadajte územnú platnosť";
        } else if( this.land() != undefined ) {
            var area = this.land().area;
            if(area == "E" && this.country() == "SR") {
                return "Zadajte správnu územnú platnosť";
            }
            if(area == "M" && (this.country() == "E" || this.country() == "SR")) {
                return "Zadajte správnu územnú platnosť";
            }
            if(area == "S" && this.country() != "S") {
                return "Zadajte správnu územnú platnosť";
            }
            return false;
        }
    }, this);

	this.validateStep1 = function(){
		var valid = true;

		if( this.insuredFromError() ) { valid = false; }
		if( this.insuredToError() ){ valid = false; }
        if( this.landError() ){ valid = false; }
        if( this.areaError() ){ valid = false; }
    	for(var i=0; i<this.insuredPersons().length; i++)
    	{
    		if( this.insuredPersons()[i].stornoError() ) { valid = false; break; }
    	}
        
		return valid;
	};

	this.goToStep1 = function(){

		window.location.hash = "step1";
		this.step(1);

	};


	this.goToStep2 = function(){

		var valid;

		if( this.step() != 2 ){
			valid = this.validateStep1();

			this.step1Invalid( !valid );

			if( valid ){
				window.location.hash = "step2";
				this.step(2);
			}
		}
	};

	this.validateStep2 = function(){
		var valid = true,
			i;
		
		// poistnik
		if( this.insurer.isPerson() ){

			// potrebujeme aby sa spustili, v 1 ife by po prvom skoncili
			if( this.insurer.nameError()){ valid = false; }
			if( this.insurer.surnameError()){ valid = false; }
			if( this.insurer.isCzechoSlovak() && this.insurer.rcError()){ valid = false; }
			if( this.insurer.birthDateError()){ valid = false; }

		} else {
			// potrebujeme aby sa spustili, v 1 ife by po prvom skoncili
			if( this.insurer.companyNameError() ){ valid = false; }
			if( this.insurer.icoError() ){ valid = false; }
			
			// nemoze byt inak
			this.insurer.same( false );
		}

		if( this.insurer.citizenError()){ valid = false; }

		// validate persons birth dates vs. adult and children count
        if ( this.validAgeOfPersons() == false ) {
            valid = false;
        }

		// validovat adresu
		if( this.insurer.addressPSCError() ){
			valid = false;
		}
		if( this.insurer.addressStreetError() ){
			valid = false;
		}
		if( this.insurer.addressNumberError() ){
			valid = false;
		}
		if( this.insurer.addressCityError() ){
			valid = false;
		}

		// validovat korespondencnu adresu
		if( !this.insurer.address.same() ){

			if( this.insurer.postalAddressPSCError() ){
				valid = false;
			}
			if( this.insurer.postalAddressStreetError() ){
				valid = false;
			}
			if( this.insurer.postalAddressNumberError() ){
				valid = false;
			}
			if( this.insurer.postalAddressCityError() ){
				valid = false;
			}
		}

        // ak je poistnik zaroven poistenou osobou, tak prvy poistenec ma zdedit jeho data
        if( this.insuredPersons().length > 0 && this.insurer.same() == true ){
            this.insuredPersons()[0].name( this.insurer.name() );
            this.insuredPersons()[0].surname( this.insurer.surname() );
            this.insuredPersons()[0].citizen( this.insurer.citizen() );
            var jsonDate = parseDateSK( this.insurer.birthDate());
            this.insuredPersons()[0].birthDateDay( jsonDate.day );
            this.insuredPersons()[0].birthDateMonth( jsonDate.month );
            this.insuredPersons()[0].birthDateYear( jsonDate.year );
        }

        // validovat data poistencov
        if( this.insuredPersons().length > 0 &&
            this.insuredPersons().length == ( parseInt( this.childrenCount(),10 ) + parseInt( this.adultsCount(), 10 ) ) ){

            for( i=0; i < this.insuredPersons().length; i++ ){

                if( this.insuredPersons()[ i ].nameError() ){
                    valid = false;
                }
                if( this.insuredPersons()[ i ].surnameError() ){
                    valid = false;
                }
                if( this.insuredPersons()[ i ].birthDateError() ){
                    valid = false;
                }
            }

        } else {
            valid = false;
        }

    	return valid;
	};

	this.goToStep3 = function(){

		var valid;

		if( this.step() != 3 ){

			valid = this.validateStep2();

			this.step2Invalid( !valid );

			if( valid ){
				self.step3Invalid(false);
				window.location.hash = "step3";
				this.step(3);
			}
		}
	};

	

    // functions
    this.resetPrice = function() {
        self.totalPrice( 0 );
        for( var i = 0; i < self.insuredPersons().length; i++ ) {
            self.insuredPersons()[i].totalPersonPrice( 0 );
        }
    };

    this.watchTotalPrice = ko.computed(function() {
        var self = this;

        if ( this.validateStep1() ) {

            window.service('calcIkcp', ko.toJS( self ),
                function(data){
                    console.log("calcIkcp", data);

                    self.totalPrice( parseFloat( data.poistne ) );
                    var persons = data.osoby;
                    if( persons ) {
                        for( var i = 0; i < persons.length; i++ ) {

                            if (i < self.insuredPersons().length ) {
                                self.insuredPersons()[i].totalPersonPrice( persons[i].poistne_osoba );
                            }
                        }
                    }
                }
            );
        } else {
            this.resetPrice();
        }

    }, this);


    this.newInsurance = function() {

        // remove hash and redirect to index
        window.location.hash = "";
        window.location.href = window.location.href.substring(0, window.location.href.length -1);
    };

    this.save = function(){

        var self = this;

        window.service('save', ko.toJS(self),
            function(data){
                console.log("SAVE RESULT", data);

                if (data.status.toLowerCase() != "ok") {
                    self.step3Invalid(true);
                    self.documents({});
                } else {
                    self.step3Invalid(false);
                    self.documents({
                        pdf1: data.pdf1,
                        pdf2: data.pdf2,
                        pdf3: data.pdf3,
                        status: data.status
                    });
                }
            }
        );
    };

    this.addPerson=function(){
        if(this.insuredPersons().length<9)
        	this.insuredPersons.push( new PersonObj(  ) );
    };
    
    this.showAddPerson=ko.computed(function(){
    	return this.insuredPersons().length<9;
    }, this);

    this.showAreaName = ko.computed(function() {
        if(this.country()) {
            for(var i = 0; i < areaList.length; i++) {
                var area = areaList[i];
                if (area.key == this.country()) {
                    return area.label;
                }
            }
        }
        return "";
    }, this);

    this.showLandName = function() {
        if(this.land()) {
            return this.land().label;
        }
        return "";
    };

    this.removePerson=function(person){
        if(self.insuredPersons().length>1)
        	return self.insuredPersons.remove(person);
    };

    this.showRemovePerson=ko.computed(function(){
    	return this.insuredPersons().length>1;
    }, this);

    this.showVacationRow = ko.computed(function() {
        if (this.insuredDays() > 30) {
            var persons = this.insuredPersons();
            for( var i = 0; i < persons.length; i++) {
                var p = persons[i];
                p.vacation( false );
            }
            return false;
        }

        return true;
    }, this);

    this.showPetRow = ko.computed(function () {
        if ( this.isDomesticalTrip() ) {
            var persons = this.insuredPersons();
            for( var i = 0; i < persons.length; i++) {
                var p = persons[i];
                p.pet( false );
            }
            return false;
        }
        return true;
    }, this);

    this.showMedicalRow = ko.computed(function () {
        if ( this.isDomesticalTrip() ) {
            var persons = this.insuredPersons();
            for( var i = 0; i < persons.length; i++) {
                var p = persons[i];
                p.medical( false );
            }
            return false;
        }
        return true;
    }, this);

    this.showRescueServiceRow = ko.computed(function () {
        if ( this.isDomesticalTrip() == false ) {
            var persons = this.insuredPersons();
            for( var i = 0; i < persons.length; i++) {
                var p = persons[i];
                p.rescueService( false );
            }
            return false;
        }
        return true;
    }, this);

    this.showFamilyDiscount = ko.computed(function() {
        return ( self.summaryPersonsCount() > 2 && self.adultsCount() > 0 );
    }, this);

    this.createClassForDatePicker = ko.computed(function ( data ) {
        console.log( data );
        return 'stornoDate' + data;
    }, this);

    this.hasAnyoneMedical = ko.computed(function() {
        var persons = this.insuredPersons();
        if ( persons && persons.length > 0) {
            for( var i = 0; i < persons.length; i++ ) {
                var p = persons[i];
                if ( p.medical() == true ) {
                    return true;
                }
            }
        }

        return false;
    }, this);

    this.hasAnyoneBaggage = ko.computed(function() {
        var persons = this.insuredPersons();
        if ( persons && persons.length > 0) {
            for( var i = 0; i < persons.length; i++ ) {
                var p = persons[i];
                if ( p.baggage() > 0) {
                    return true;
                }
            }
        }

        return false;
    }, this);

    this.hasAnyoneResponsibility = ko.computed(function() {
        var persons = this.insuredPersons();
        if ( persons && persons.length > 0) {
            for( var i = 0; i < persons.length; i++ ) {
                var p = persons[i];
                if ( p.responsibility() == true ) {
                    return true;
                }
            }
        }

        return false;
    }, this);

    this.hasAnyoneAccident = ko.computed(function() {
        var persons = this.insuredPersons();
        if ( persons && persons.length > 0) {
            for( var i = 0; i < persons.length; i++ ) {
                var p = persons[i];
                if ( p.accident() == true ) {
                    return true;
                }
            }
        }

        return false;
    }, this);

    this.hasAnyoneTechnicalHelp = ko.computed(function() {
        var persons = this.insuredPersons();
        if ( persons && persons.length > 0) {
            for( var i = 0; i < persons.length; i++ ) {
                var p = persons[i];
                if ( p.technicalHelp() == true ) {
                    return true;
                }
            }
        }

        return false;
    }, this);

    this.hasAnyoneRescueService = ko.computed(function() {
        var persons = this.insuredPersons();
        if ( persons && persons.length > 0) {
            for( var i = 0; i < persons.length; i++ ) {
                var p = persons[i];
                if ( p.rescueService() == true ) {
                    return true;
                }
            }
        }

        return false;
    }, this);

    this.changeAreaDisable = function() {
        self.areaDisable( !self.areaDisable() );
        if(self.areaDisable() == false) {
            self.landDisable( true );
        } else {
            self.landDisable( false );
        }
    };

    this.getAge = function( dateBirth, dateNow ){
        var years= 0,
            dateBirthSK = parseDateSK( normalizeSKDateAsString( dateBirth ) ),
            nowYear = dateNow.getFullYear(),
            nowMonth = dateNow.getMonth() + 1,
            nowDay = dateNow.getDate(),
            age = nowYear - dateBirthSK.year;

        if( nowMonth > dateBirthSK.month ){

        } else if( nowMonth == dateBirthSK.month ){
            if( nowDay < dateBirthSK.day ){
                age--;
            }
        } else {
            age--;
        }

        return age;
    };

    this.validAgeOfPersons = function() {
        var numberOfAdults = 0,
            numberOfChildren = 0,
            persons = this.insuredPersons(),
            valid = true;

        if ( persons ) {
            for( var i = 0; i < persons.length; i++) {
                var p = persons[i];
                var bDate = p.birthDate();

                if (i == 0 && bDate == "") {
                    bDate = getDateFromRC( this.insurer.rc() );
                }

                var age = self.getAge(bDate, now);

                if ( parseInt( age ) < 15 ) {
                    numberOfChildren++;
                } else {
                    numberOfAdults++;
                }
            }
        }

        this.childrenCountByDate( numberOfChildren );
        this.adultsCountByDate ( numberOfAdults );

        if ( this.adultsCount() != numberOfAdults ) {
            valid = false
        }

        if ( this.childrenCount() != numberOfChildren ) {
            valid = false;
        }

        this.personsBirthInvalid( !valid );

        return valid;
    };

    var prepareCheckboxForPersonProperty = function (propertyName, self) {
        var attrSame = propertyName + 'Same';
        (self[attrSame]) = ko.observable(modelData[attrSame] == undefined ? true : modelData[attrSame]);
        ko.computed(function () {
            if ((self[attrSame])()) {
                var persons = self.insuredPersons();
                var val = (persons[0][propertyName])();
                for (var i = 1; i < persons.length; i++) {
                    (persons[i][propertyName])(val)
                }
            }
            return true;
        }, self);
    };

    prepareCheckboxForPersonProperty('riskGroup', this);
    prepareCheckboxForPersonProperty('discountCard', this);
    prepareCheckboxForPersonProperty('medical', this);
    prepareCheckboxForPersonProperty('baggage', this);
    prepareCheckboxForPersonProperty('responsibility', this);
    prepareCheckboxForPersonProperty('accident', this);
    prepareCheckboxForPersonProperty('technicalHelp', this);
    prepareCheckboxForPersonProperty('rescueService', this);
    prepareCheckboxForPersonProperty('storno', this);
    prepareCheckboxForPersonProperty('pet', this);
    prepareCheckboxForPersonProperty('vacation', this);


}
