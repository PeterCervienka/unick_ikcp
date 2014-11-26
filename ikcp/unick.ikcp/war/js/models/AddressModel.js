/**
 * Created by Peter Cervienka on 13.10.2014.
 */

function AddressObj( modelData ) {

    var self = this;
    modelData = modelData || {};

    // ********************** DEFINITION *************************//
    this.street = ko.observable( modelData.street );

    this.streetNumber = ko.observable( modelData.streetNumber );

    this.city = ko.observable( modelData.city );

    this.postalCode = ko.observable( modelData.postalCode );

    // ********************** VALIDATION *************************//
    this.streetError = ko.computed(function(){
        if( this.street() == "" ){ return "Opravte ulicu"; }
        else if ( validStringLength(this.street(), 1, 101) == false ) { return "Zadajte správnu dĺžku ulice"; }
        return false;
    }, this );

    this.streetNumberError = ko.computed(function(){
        if( this.streetNumber() == "" ){ return "Opravte popisné čislo"; }
        else if ( validStringLength(this.streetNumber(), 0, 11) == false ) { return "Zadajte správnu dĺžku popisného čísla"; }
        return false;
    }, this );

    this.cityError = ko.computed(function(){
        if( this.city() == "" ){ return "Opravte mesto"; }
        else if ( validStringLength(this.city(), 1, 61) == false ) { return "Zadajte správnu dĺžku mesta"; }
        return false;
    }, this );

    this.postalCodeError = ko.computed(function(){
        if( this.postalCode() == "" ){ return "Opravte PSČ"; }
        else if ( validPostalCodeFormat( this.postalCode() ) == false ) { return "Zadajte správny formát PSČ"; }
        else if ( validStringLength( this.postalCode(), 1, 6) == false ) { return "Zadajte správnu dĺžku PSČ"; }
        return false;
    }, this );

    this.isValid = function() {
        var valid = true;

        if( self.streetError()){ valid = false; }
        if( self.streetNumberError()){ valid = false; }
        if( self.cityError()){ valid = false; }
        if( self.postalCodeError()){ valid = false; }

        return valid;
    };
}