/**
 * Created by Peter Cervienka on 21.11.2014.
 */

function IkcpModel( modelData ){

    // constants
    var self = this,
        now = new Date();

    this.today = new Date( now.getFullYear(), now.getMonth(), now.getDate() );

    modelData = modelData || {};
    this.risks = [
        {value: "Turista", key: "T"},
        {value: "Šport", key: "S"},
        {value: "Prac. cesta - nemanuálna práca", key: "PN"},
        {value: "Prac. cesta - manuálna práca", key: "PM"},
    ];

    this.baggages = [
        {value: "Áno", key: 700},
        {value: "Nie", key: 1200},
        {value: "Maybe", key: 2000},
        {value: "I dont know yet", key: 2400}
    ];

    this.insuredFrom = ko.observable( modelData.insuredFrom || dateToSK( this.today ) );
    this.insuredTo = ko.observable( modelData.insuredTo || dateToSK( this.today ) );

    if( modelData.insuredPersons && modelData.insuredPersons.length > 0 ){

        this.insuredPersons = ko.observableArray( ko.utils.arrayMap( modelData.insuredPersons, function( item ){
            return new PersonObj( item );
        }));

    } else {
        this.insuredPersons = ko.observableArray();
        this.insuredPersons.push( new PersonObj( { editable: true } ) ); // insurer is present by default
        this.insuredPersons.push( new PersonObj( { name: "Jan", surname: "Gajdos" } ) ); // insurer is present by default
        this.insuredPersons.push( new PersonObj( { name: "Fero", surname: "Cech", pet: true } ) ); // insurer is present by default
    }
    
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

}
