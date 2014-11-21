/**
 * Created by Peter Cervienka on 21.11.2014.
 */

function IkcpModel( modelData ){

    // constants
    var self = this,
        now = new Date();

    this.today = new Date( now.getFullYear(), now.getMonth(), now.getDate() );

    modelData = modelData || {};

    this.insuredFrom = ko.observable( modelData.insuredFrom || dateToSK( this.today ) );
    this.insuredTo = ko.observable( modelData.insuredTo || dateToSK( this.today ) );
}
