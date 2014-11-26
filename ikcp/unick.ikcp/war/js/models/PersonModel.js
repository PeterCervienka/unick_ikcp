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
    this.child = ko.observable( modelData.child || false );
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
    this.stornoObj = ko.observable( modelData.stornoObj || new StornoObj() )

    this.pet = ko.observable( modelData.pet || false );
    this.petType = ko.observable( modelData.petType || "d" );
    this.petOther = ko.observable( modelData.petOther || "" );
    this.petLicence = ko.observable( modelData.petLicence || "" );

    this.vacation = ko.observable( modelData.vacation || false );
    this.vacationObj = ko.observable( modelData.vacationObj || new AddressObj() );

    // HELPER METHODS
    this.birthDate = ko.computed(function() {
        return this.birthDateDay() + "." + this.birthDateMonth() + "." + this.birthDateYear();
    }, this);

    this.stornoEuro = ko.computed(function() {
        return formatEuro( this.storno() );
    }, this);

    this.stornoVisible = ko.computed(function () {
        return this.storno() > 0;
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
        } else if( this.discountCardCode().length > 50){
            return "Maximálna dĺžka čísla preukazu je 50 znakov.";
        } else {
            return false;
        }

    }, this );

}