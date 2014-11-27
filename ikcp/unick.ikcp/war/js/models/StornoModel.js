/**
 * Created by Peter Cervienka on 13.10.2014.
 */

function StornoObj( modelData ) {

    var self = this,
        today = new Date();
    modelData = modelData || {};

    // ********************** DEFINITION *************************//
    this.type = ko.observable( modelData.type || "CL-L");

    this.typeOther = ko.observable( modelData.typeOther || "");

    var defaultDate = dateToSK( new Date( today.setDate( today.getDate() - 2 ) ) );
    this.date = ko.observable( modelData.date || defaultDate );

    // ********************** VALIDATION *************************//
    this.typeError = ko.computed(function(){
        if( this.type() == "" ){ return "Opravte typ objednávanej služby"; }
        return false;
    }, this );

    this.typeOtherError = ko.computed(function(){
        if( this.type() == "OTH" && this.typeOther() == "" ){ return "Opravte iný typ objednávanej služby"; }
        return false;
    }, this );

    this.dateError = ko.computed(function(){
        //TODO: validate range of date
        if( this.date() == "" ){ return "Zadajte dátum zakúpenia"; }
        else if ( validDateSK(this.date()) == false ) { return "Zadajte správny formát dátumu vo formáte dd.MM.yyyy"; }
        return false;
    }, this );

    this.stornoOtherVisible = ko.computed(function() {
        return this.type() == "OTH";
    }, this);

    this.isValid = function() {
        var valid = true;

        if( self.typeError()){ valid = false; }
        if( self.priceError()){ valid = false; }
        if( self.dateError()){ valid = false; }

        return valid;
    };
}