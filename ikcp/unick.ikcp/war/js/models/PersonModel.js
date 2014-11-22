/**
 * Created by Peter Cervienka on 21.11.2014.
 */

function PersonObj( modelData ) {

    // constants
    var self = this;

    var modelData = modelData || {};

    this.editable = ko.observable( modelData.editable || false );

    // personal data
    this.name = ko.observable( modelData.name || "");
    this.surname = ko.observable( modelData.surname || "");
    this.birthDateDay = ko.observable( modelData.birthDateDay|| "");
    this.birthDateMonth = ko.observable( modelData.birthDateMonth|| "");
    this.birthDateYear = ko.observable( modelData.birthDateYear || "");
    this.riskGroup = ko.observable( modelData.riskGroup || "T" );
    this.discountCard = ko.observable( modelData.discountCard || false );
    this.discountCardType = ko.observable( modelData.discountCardType || "" );
    this.discountCardCode = ko.observable( modelData.discountCardCode || "" );

    // insurance
    this.medical = ko.observable( modelData.medical || false );
    this.baggage = ko.observable( modelData.baggage || 700 );
    this.responsibility = ko.observable( modelData.responsibility || false );
    this.accident = ko.observable( modelData.accident || false );
    this.technicalHelp = ko.observable( modelData.technicalHelp || false );

    this.storno = ko.observable( modelData.storno || 0 );
    this.pet = ko.observable( modelData.pet || false );
    this.vacation = ko.observable( modelData.vacation || false );

    // HELPER METHODS
    this.birthDate = ko.computed(function() {
        return this.birthDateDay() + "." + this.birthDateMonth() + "." + this.birthDateYear();
    }, this);

    this.stornoEuro = ko.computed(function() {
        return formatEuro( this.storno() );
    }, this);

    this.totalPersonPrice = ko.computed(function() {
        // TODO: compute summary price
    	var spolu=10;
    	if(this.medical()) spolu+=10;
    	if(this.baggage()) spolu+=11.2;
    	if(this.responsibility()) spolu+=12.3;
    	if(this.accident()) spolu+=14.5;
    	
        return spolu;
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

		if( this.birthDate() == "" ){
			return "Opravte dátum narodenia";
		} else if( !validDateSK( this.birthDate() ) ) {
			return "Zadajte správny dátum narodenia";
		} else if( makeDateSK( this.birthDate() ) > new Date() ) {
			return "Dátum narodenia je v budúcnosti";
		}
		return false;

	}, this );

	this.stornoError = ko.computed(function(){

		if( !validDecimalFormat(this.storno())  ){
			return "Zadajte správnu cenu";
		} else {
			return false;
		}

	}, this );

}