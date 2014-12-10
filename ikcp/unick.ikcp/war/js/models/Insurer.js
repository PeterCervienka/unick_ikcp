function InsurerObj( modelData ){

	modelData = modelData || {};
	modelData.address = modelData.address || {};
	modelData.postalAddress = modelData.postalAddress || {};

	this.typ = ko.observable( modelData.typ || "FO");
	this.companyName = ko.observable( modelData.companyName || "");
	this.ico = ko.observable( modelData.ico || "");
	this.name = ko.observable( modelData.name || "");
	this.surname = ko.observable( modelData.surname || "");
	this.rc = ko.observable( modelData.rc || "");
	this.birthDate = ko.observable( modelData.birthDate || "");
	this.title = ko.observable( modelData.title || "");
	this.phone = ko.observable( modelData.phone || "");
	this.email = ko.observable( modelData.email || "");
	this.citizen = ko.observable( parseInt( modelData.citizen ) || 703 );
	this.citizenText = ko.observable( modelData.citizenText || "");
	this.same = ko.observable( (modelData.same == false ) ? false : true );

	this.address = {
		psc: ko.observable( modelData.address.psc || ""),
		street: ko.observable( modelData.address.street || ""),
		number: ko.observable( modelData.address.number || ""),
		city: ko.observable( modelData.address.city || ""),
		same: ko.observable( (modelData.address.same == false ) ? false : true)
	};
	this.postalAddress = {
		psc: ko.observable( modelData.postalAddress.psc || ""),
		street: ko.observable( modelData.postalAddress.street || ""),
		number: ko.observable( modelData.postalAddress.number || ""),
		city: ko.observable( modelData.postalAddress.city || "")
	};


    this.fullName = ko.computed(function() {
        return this.name() + " " + this.surname();
    }, this);

	// tests for properties
	this.isCzechoSlovak = ko.computed(function(){
		//SK, CZ
		if( this.citizen() == 703 || this.citizen() == 203 ){
			return  true;
		} else {
			return false;
		}

	}, this);

	this.isPerson = ko.computed(function(){
		if( this.typ() == "FO" ){
			return  true;
		} else {
			return false;
		};
	}, this);

	// insurer
	this.countryByCode = function( code ){

		var self = this;

		window.service('countryText', code,
			function(data){
				if (data && data != undefined) {
					self.citizenText( data.text );
				}
			}
		);
	};
	
	this.nameError = ko.computed(function(){

		if( this.name() == "" ){
			return "Zadajte meno";
		} else {
			return false;
		}

	}, this );

	this.surnameError = ko.computed(function(){

		if( this.surname() == "" ){
			return "Zadajte priezvisko";
		} else {
			return false;
		}

	}, this );

	this.rcError = ko.computed(function(){

		if( this.rc() == "" ){
			return "Zadajte rodné číslo";
			
		} else if( ! validFormatRC(this.rc()) ){
			return "Rodné číslo je nesprávne";
		}

        if ( this.birthDate() != "" ) {
            var age = getAge( this.birthDate(), new Date() );
            if ( age < 15 ) {
                return "Vek musí byť minimálne 15 rokov vrátane";
            }
        }


        return false;

	}, this );

	this.birthDateError = ko.computed(function(){

		if( !this.isCzechoSlovak() ){
			if( this.birthDate() == "" ){
				return "Opravte dátum narodenia";
			} else if( !validDateSK( this.birthDate() ) ) {
				return "Zadajte správny dátum narodenia";
			} else if( makeDateSK( this.birthDate() ) > new Date() ) {
				return "Dátum narodenia je v budúcnosti";
			}

            var age = getAge( this.birthDate(), new Date() );
            if ( age < 15 ) {
                return "Vek musí byť minimálne 15 rokov vrátane";
            }
		}
        return false;

	}, this );

	this.companyNameError = ko.computed(function(){

		if( this.companyName() == "" ){
			return "Zadajte názov spolocnosti";
		} else {
			return false;
		}

	}, this );

	this.icoError = ko.computed(function(){

		if( this.ico() == "" ){
			return "Zadajte IČO";
		} else if ( !(this.ico()+"").match(/^[0-9]{8}$/) ) {
			return "Opravte IČO";
		} else {
			return false;
		}

	}, this );

	this.citizenError = ko.computed(function(){

		if( !(this.citizen()+"").match(/[0-9]+/) ){
			return "Zadajte štátnu príslušnosť";
		} else {
			return false;
		}

	}, this );

	// insurer address
	this.addressPSCError = ko.computed(function(){

		if( !( this.address.psc() +"" ).match(/^[0-9\ ]{5,6}$/)  ){
			return "Zadajte PSČ";
		} else {
			return false;
		}

	}, this );

	this.addressStreetError = ko.computed(function(){

		if( this.address.street() == "" ){
			return "Zadajte ulicu";
		} else {
			return false;
		}

	}, this );

	this.addressNumberError = ko.computed(function(){

		if( this.address.number() == "" ){
			return "Zadajte číslo";
		} else {
			return false;
		}

	}, this );

	this.addressCityError = ko.computed(function(){

		if( this.address.city() == "" ){
			return "Zadajte mesto";
		} else {
			return false;
		}

	}, this );

	// insurer postal address
	this.postalAddressPSCError = ko.computed(function(){

		if( !( this.postalAddress.psc() +"" ).match(/^[0-9\ ]{5,6}$/)  ){
			return "Zadajte PSČ";
		} else {
			return false;
		}

	}, this );

	this.postalAddressStreetError = ko.computed(function(){

		if( this.postalAddress.street() == "" ){
			return "Zadajte ulicu";
		} else {
			return false;
		}

	}, this );

	this.postalAddressNumberError = ko.computed(function(){

		if( this.postalAddress.number() == "" ){
			return "Zadajte číslo";
		} else {
			return false;
		}

	}, this );

	this.postalAddressCityError = ko.computed(function(){

		if( this.postalAddress.city() == "" ){
			return "Zadajte mesto";
		} else {
			return false;
		}

	}, this );
	
	// watch functions
	this.watchCitizen = ko.computed(function(){
		
		this.countryByCode( this.citizen() );
		
	}, this);

	this.watchRC = ko.computed(function(){
		
		if( this.isCzechoSlovak() == true ){
		
			if( this.rc() != "" ){
				this.birthDate( getDateFromRC( this.rc() ) );
			}
		}
		
	}, this);
};
