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
    
    this.step = ko.observable(1);
    
    this.risks = [
        {value: "Turista", key: "T"},
        {value: "Šport", key: "S"},
        {value: "Prac. cesta - nemanuálna práca", key: "PN"},
        {value: "Prac. cesta - manuálna práca", key: "PM"},
    ];

    this.baggages = [
        {value: "700 €", key: 700},
        {value: "1 400 €", key: 1400},
        {value: "2 100 €", key: 2100},
        {value: "2 800 €", key: 2800}
    ];

    this.insuredFrom = ko.observable( modelData.insuredFrom || dateToSK( this.today ) );
    this.insuredTo = ko.observable( modelData.insuredTo || dateToSK( this.today ) );
    this.land = ko.observable( modelData.land );
    this.landDisable = ko.observable( false );
	this.country = ko.observable( modelData.country || "SR");
    this.areaDisable = ko.observable( true );
	this.step1Invalid = ko.observable(false);
	this.step2Invalid = ko.observable(false);
	this.step3Invalid = ko.observable(false);

    if( modelData.insuredPersons && modelData.insuredPersons.length > 0 ){

        this.insuredPersons = ko.observableArray( ko.utils.arrayMap( modelData.insuredPersons, function( item ){
            return new PersonObj( item );
        }));

    } else {
        this.insuredPersons = ko.observableArray();
        this.insuredPersons.push( new PersonObj( { editable: true } ) ); // insurer is present by default
        this.insuredPersons.push( new PersonObj( {  } ) ); // insurer is present by default
        this.insuredPersons.push( new PersonObj( {  } ) ); // insurer is present by default
    }

    this.totalPrice = ko.computed(function() {
        // TODO: compute total price
    	var spolu=0;
    	for(var i=0; i<this.insuredPersons().length; i++)
    	{
    		spolu+=this.insuredPersons()[i].totalPersonPrice();
    	}
        return spolu;
    }, this);
    
    this.totalPriceText = ko.computed(function() {
    	return formatEuro(this.totalPrice());
    }, this);

    // step 2
	this.insurerTypes = ko.observableArray([
		{forma: "FO", text: "Fyzická osoba"},
		{forma: "FOP", text: "Fyzická osoba - Podnikateľ"},
		{forma: "PO", text: "Právnická osoba"}

	]);
	this.insurer = new Insurer( modelData.insurer );    

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

	
    // validacie
	this.insuredFromInvalid = function( dateFrom, dateTo, today ){
		
		if( !validDateSK( dateFrom ) ) {
			return "Zadajte správny dátum začiatku poistenia";
		} else if( makeDateSK( dateFrom ) < today ) {
			return "Dátum začiatku poistenia je v minulosti";
		} else if( makeDateSK( dateFrom ) > makeDateSK( dateTo ) ) {
			return "Dátum začiatku poistenia je za koncom poistenia";
		} else {
			return false;
		}
	};	

	this.insuredToInvalid = function( dateFrom, dateTo, today ){
		if( !validDateSK( dateTo ) ) {
			return "Zadajte správny dátum konca poistenia";
		} else if( makeDateSK( dateTo ) < today ) {
			return "Dátum konca poistenia je v minulosti";
		} else if( makeDateSK( dateTo ) < makeDateSK( dateFrom ) ) {
			return "Dátum konca poistenia je pred začiatkom poistenia";
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
        if( this.land() == undefined || this.land().label.length == 0 ) {
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
		/* poisteny od
		 povinny, minimalne dnes
		 poisteny do
		 povinny, minimalne rovny od
		 pocet osob musi byt min 1 max 5 */
		if( this.insuredFromError() ) { valid = false; }
		if( this.insuredToError() ){ valid = false; }
        if( this.landError() ){ valid = false; }
        if( this.areaError() ){ valid = false; }
    	for(var i=0; i<this.insuredPersons().length; i++)
    	{
    		if( this.insuredPersons()[i].stornoError() ) { valid = false; }
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

		// validate persons birth dates vs. adult,elder,children count
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

    	for(var i=0; i<this.insuredPersons().length; i++)
    	{
    		if( this.insuredPersons()[i].nameError() ) { valid = false; }
    		if( this.insuredPersons()[i].surnameError()) { valid = false; }
    		if( this.insuredPersons()[i].birthDateError() ) { valid = false; }
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
    this.addPerson=function(){
        if(this.insuredPersons().length<9)
        	this.insuredPersons.push( new PersonObj(  ) );
    };
    
    this.showAddPerson=ko.computed(function(){
    	return this.insuredPersons().length<9;
    }, this);

    this.removePerson=function(person){
        if(self.insuredPersons().length>1)
        	return self.insuredPersons.remove(person);
    };

    this.showRemovePerson=ko.computed(function(){
    	return this.insuredPersons().length>1;
    }, this);


    this.changeAreaDisable = function() {
        self.areaDisable( !self.areaDisable() );
        if(self.areaDisable() == false) {
            self.landDisable( true );
        } else {
            self.landDisable( false );
        }
    };
	
}
