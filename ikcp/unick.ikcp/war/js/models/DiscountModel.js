/**
 * Created by Peter Cervienka on 9.12.2014.
 */

function DiscountObj( modelData ) {

    this.price = ko.observable( modelData.price || "" );
    this.type = ko.observable( modelData.type || "" );

    this.priceText = ko.computed(function() {
        if (this.price() && !isNaN( this.price() )) {
            return formatEuro( this.price() );
        }
    }, this);
}