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
    this.baggage = ko.observable( modelData.baggage || "" );
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

    this.summary = ko.computed(function() {
        // TODO: compute summary price
        return formatEuro( 150 * Math.random() );
    }, this);

}