/**
 * Created by Peter Cervienka on 13.10.2014.
 */

function AddressObj( modelData ) {

    var self = this;
    modelData = modelData || {};

    // ********************** DEFINITION *************************//
    this.name = ko.observable( modelData.name || "" );

    this.street = ko.observable( modelData.street || "" );

    this.streetNumber = ko.observable( modelData.streetNumber || "" );

    this.buildingNr = ko.observable( modelData.buildingNr || "" );

    this.floorNr = ko.observable( modelData.floorNr || "" );

    this.city = ko.observable( modelData.city || "" );

    this.postalCode = ko.observable( modelData.postalCode || "" );

    this.country = ko.observable( modelData.country || "" );

    // ********************** VALIDATION *************************//
    this.nameError = ko.computed(function(){
        if( this.name() == "" ){ return "Opravte názov"; }
        else if ( validStringLength(this.name(), 1, 101) == false ) { return "Zadajte správnu dĺžku názvu"; }
        return false;
    }, this );

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

    this.buildingNrError = ko.computed(function(){
        if( this.buildingNr() != "" ){
            if ( validStringLength(this.buildingNr(), 0, 11) == false ) { return "Zadajte správnu dĺžku čísla bytu / domu"; }
        }
        return false;
    }, this );

    this.floorNrError = ko.computed(function(){
        if( this.floorNr() != "" ) {
            if ( validNumberFormat(this.floorNr()) == false ) { return "Zadajte správny formát čísla podlažia"; }
            else if ( validRange(this.floorNr(), -3, 50) == false ) { return "Hodnota podlažia je od -2 do 50" }
        }
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

    this.countryError = ko.computed(function(){
        if( this.country() == "" ){ return "Opravte štát"; }
        else if ( validStringLength(this.country(), 0, 100) == false ) { return "Zadajte správnu dĺžku štátu"; }
        return false;
    }, this );

    this.isValid = function() {
        var valid = true;

        if( self.nameError()){ valid = false; }
        if( self.streetError()){ valid = false; }
        if( self.streetNumberError()){ valid = false; }
        if( self.buildingNrError()){ valid = false; }
        if( self.floorNrError()){ valid = false; }
        if( self.cityError()){ valid = false; }
        if( self.postalCodeError()){ valid = false; }
        if( self.countryError()){ valid = false; }

        return valid;
    };
}