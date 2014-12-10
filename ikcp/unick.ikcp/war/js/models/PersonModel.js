/**
 * Created by Peter Cervienka on 21.11.2014.
 */

function PersonObj( modelData ) {

    // constants
    var self = this;

    var modelData = modelData || {};

    this.editable = ko.observable( modelData.editable || false );
    this.totalPersonPrice = ko.observable( parseFloat( modelData.totalPersonPrice ) || 0 );

    // personal data
    this.name = ko.observable( modelData.name || "");
    this.surname = ko.observable( modelData.surname || "");
    this.age = ko.observable( modelData.age || "A"); // valid choices: CH(ild), A(dult), R(etiere)
    this.birthDateDay = ko.observable( modelData.birthDateDay|| "");
    this.birthDateMonth = ko.observable( modelData.birthDateMonth|| "");
    this.birthDateYear = ko.observable( modelData.birthDateYear || "");
    this.riskGroup = ko.observable( modelData.riskGroup || "T" );
    this.discountCard = ko.observable( modelData.discountCard || false );
    this.discountCardType = ko.observable( modelData.discountCardType || "" );
    this.discountCardCode = ko.observable( modelData.discountCardCode || "" );

    // insurance
    this.medical = ko.observable( modelData.medical || false );
    this.baggage = ko.observable( modelData.baggage || 0 );
    this.responsibility = ko.observable( modelData.responsibility || false );
    this.accident = ko.observable( modelData.accident || false );
    this.technicalHelp = ko.observable( modelData.technicalHelp || false );
    this.rescueService = ko.observable( modelData.rescueService || false );

    this.storno = ko.observable( modelData.storno || 0 );
    this.stornoObj = ko.observable( modelData.stornoObj || new StornoObj() )

    this.pet = ko.observable( modelData.pet || false );
    this.petType = ko.observable( modelData.petType || "pes" );
    this.petOther = ko.observable( modelData.petOther || "" );
    this.petLicence = ko.observable( modelData.petLicence || "" );

    this.vacation = ko.observable( modelData.vacation || false );
    this.vacationObj = ko.observable( modelData.vacationObj || new AddressObj() );

    this.citizen = ko.observable( parseInt( modelData.citizen ) || 703 );
    this.citizenText = ko.observable( modelData.citizenText || "" );

    // HELPER METHODS

    this.fullName = ko.computed(function() {
        return this.name() + " " + this.surname();
    }, this);

    this.birthDate = ko.computed(function() {
        if (this.birthDateDay() != "" && this.birthDateMonth() != "" && this.birthDateYear() != "") {
            return this.birthDateDay() + "." + this.birthDateMonth() + "." + this.birthDateYear();
        } else {
            return "";
        }
    }, this);

    this.stornoEuro = ko.computed(function() {
        return formatEuro( this.storno() );
    }, this);

    this.stornoVisible = ko.computed(function () {
        return this.storno() > 0;
    }, this);

    this.petVisible = ko.computed(function () {
        return this.pet();
    }, this);

    this.vacationVisible = ko.computed(function () {
        return this.vacation();
    }, this);

    this.totalPersonPriceText = ko.computed(function() {
    	return formatEuro(this.totalPersonPrice());
    }, this);
    

    this.baggageEuro = ko.computed(function() {
        if ( this.baggage() ) {
            return formatEuro( this.baggage() );
        }

        return "";
    }, this);

    //error attributes
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

	this.birthDateError = ko.computed(function(){

        var date = new Date();

        if (this.birthDateDay() == "" && this.birthDateMonth() == "" && this.birthDateYear() == "" ) {
            return "Opravte dátum narodenia";
        }

        else if( this.birthDateDay() == "" ){
            return "Opravte deň narodenia";
        } else if( validRange(this.birthDateDay(), 0, 32) == false ) {
            return "Zadajte správny deň narodenia";
        }

        else if( this.birthDateMonth() == "" ){
            return "Opravte mesiac narodenia";
        } else if( validRange(this.birthDateMonth(), 0, 13) == false ) {
            return "Zadajte správny mesiac narodenia";
        }

        else if( this.birthDateYear() == "" ){
            return "Opravte rok narodenia";
        } else if( validRange(this.birthDateYear(), date.getFullYear() - 101, date.getFullYear() + 1) == false ) {
            return "Zadajte správny rok narodenia";
        }

        else if( this.birthDate() == "" ){
            return "Opravte dátum narodenia";
        } else if( !validDateSK( this.birthDate() ) ) {
			return "Zadajte správny dátum narodenia";
		} else if( makeDateSK( this.birthDate() ) > new Date() ) {
			return "Dátum narodenia je v budúcnosti";
		}
		return false;

	}, this );

	this.stornoError = ko.computed(function(){

        if( isNaN( parseFloat(this.storno() ) ) || !validDecimalFormat(this.storno()) ) {
            return "Zadajte správnu cenu";
        } else if( this.storno() < 0 ){
			return "Zadajte správnu cenu objednanej služby. Cena nesmie byť menšia ako 0 &euro;";
		} else {
			return false;
		}

	}, this );

    this.discountCardTypeError = ko.computed(function(){

        if( this.discountCardType() == "" ){
            return "Zadajte typ preukazu";
        } else {
            return false;
        }

    }, this );

    this.discountCardCodeError = ko.computed(function(){

        if( this.discountCardType() != "" && this.discountCardCode() == ""){
            return "Zadajte číslo preukazu";
        } else if( validStringLength(this.discountCardCode().length, 5, 11) == false ){
            return "Povolená dĺžka je 6 až 10 znakov.";
        } else {
            return false;
        }

    }, this );

    this.petOtherError = ko.computed(function(){
        if( this.petType() == "ine" && this.petOther() == "" ){ return "Opravte iný druh domáceho miláčika"; }
        return false;
    }, this );

    this.petOtherVisible = ko.computed(function() {
        return this.petType() == "ine";
    }, this);

    this.petLicenceError = ko.computed(function(){

        if( this.petLicence() == "" ){
            return "Zadajte číslo medzinárodného očkovacieho preukazu / pasu";
        } else if( this.petLicence().length > 50){
            return "Maximálna dĺžka je 50 znakov.";
        } else {
            return false;
        }

    }, this );

    // HELPERS
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

    this.watchCitizen = ko.computed(function(){

        this.countryByCode( this.citizen() );

    }, this);


}