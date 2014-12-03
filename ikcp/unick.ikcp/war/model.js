/* Model pre CK Zajazdy 2014 Basex Knockout

   Celorocne cestovne poistenie */

function CKZajazdy( modelData ){

	// constants
	var self = this,
		now = new Date();

	this.today = new Date( now.getFullYear(), now.getMonth(), now.getDate() );
	
	modelData = modelData || {};
	modelData.insurer = modelData.insurer || {};
	modelData.documents = modelData.documents || {};

	// model
	this.stepsCount = 3;
	this.step = ko.observable(1);

	this.product = "711";
	this.predmet = ""; // nastavit pri vybere balika alebo po vypocte z dv parametra
	this.signingDate = dateTimeToSK(now); //terajsi cas, nastavit pri pokuse o uzavretie pojistky
	this.poistneSuma = 0;
	this.poistneSumaText = "";
	
	this.insuredFrom = ko.observable( modelData.insuredFrom || dateToSK( this.today ) );
	this.insuredTo = ko.observable( modelData.insuredTo || dateToSK( this.today ) );

	this.childrenCount = ko.observable( parseInt(modelData.childrenCount) || 0 );
	this.adultsCount = ko.observable( parseInt(modelData.adultsCount) || 1 );

    this.childrenCountByDate = ko.observable( parseInt(modelData.childrenCountByDate) || 0 );
    this.adultsCountByDate = ko.observable( parseInt(modelData.adultsCountByDate) || 0 );
	
	this.personBirthInvalid = ko.observable(false);
	this.riskGroup = ko.observable( modelData.riskGroup || "T");
    this.land = ko.observable( modelData.land );
    this.landDisable = ko.observable( false );
	this.country = ko.observable( modelData.country || "SR");
    this.areaDisable = ko.observable( true );
    this.sportsVisible = ko.observable( false );
	this.pack = ko.observable( modelData.pack || "A");
	this.slovakPack = ko.observable( modelData.pack || "A" );
	this.otherPack = ko.observable( modelData.pack || "A1" );
	this.packages = {
		slovak: ["A", "B"],
		other: ["A1", "A3", "B", "C", "D"]
	};
    this.packDescriptions = [
        {pack: "A", desc: "základný"},
        {pack: "Bi", desc: "jednodňové školské akcie"},             // internal
        {pack: "A1", desc: "základný"},
        {pack: "A3", desc: "vyššie storno"},
        {pack: "Be", desc: "bez liečebných nákladov"},    // external
        {pack: "C", desc: "jednodňové výlety"},
        {pack: "D", desc: "školy, seniori, deti"}
    ];
	this.insurerTypes = ko.observableArray([
		{forma: "FO", text: "Fyzická osoba"},
		{forma: "FOP", text: "Fyzická osoba - Podnikateľ"},
		{forma: "PO", text: "Právnická osoba"}

	]);
	this.risks = {
		R07:"poistenie liečebných nákladov v zahraničí",
		R02:"poistenie batožiny",
		R03:"poistenie všeobecnej zodpovednosti za škodu",
		R01:"úrazové poistenie",
		R08:"poistenie storna zájazdu",
		R16:"poistenie nevydarenej dovolenky",
		R17:"poistenie zvýšených nákladov na spätnú prepravu",
		R18:"poistenie doprovodu",
		R10:"poistenie predčasného návratu a nečerpaných služieb",
		R09:"poistenie nákladov na cestu blízkej osoby poisteného",
		R12:"poistenie nákladov v prípade choroby dieťaťa",
		R15:"poistenie cestovných nákladov v prípade nepojazdného vozidla",
		R20:"poistenie meškania hromadného dopravného prostriedku",
		R28:"poistenie oneskoreného nástupu na zájazd",
		R04:"denné odškodné počas hospitalizácie v dôsledku úrazu",
		R05:"denné odš. v dôsledku úrazu bez hospitalizácie",
		R06:"denné odš. v dôsledku ochorenia s hospitalizáciou",
		R11:"storno objednanej služby",
		R13:"batožina nad 350 E",
		R14:"náklady na cestu náhradného zamestnanca",
		R19:"storno zájazdu - pripoistenie",
		R21:"poistenie opatrovníka (sprevádzajúceho/privolaného)",
		R22:"transport liekov",
		R23:"insolventnosť-PCR",
		R24:"insolventnosť-DCR",
		R25:"insolventnosť letecká doprava",
		R26:"insolventnosť kombinovaná doprava",
		R27:"poistenie predčasného návratu a nečerpaných služieb",
		R29:"pripoistenie meškania lietadla"
	};
	this.selectedPackages = ko.observable( modelData.selectedPackages || this.packages.slovak );
	this.titleCache = {};
	this.variableSymbol = "";
	this.dv = ko.observable({});
	this.insurer = new Insurer( modelData.insurer );

	if( modelData.insuredPersons && modelData.insuredPersons.length > 0 ){

		this.insuredPersons = ko.observableArray( ko.utils.arrayMap( modelData.insuredPersons, function( item ){
			return new InsuredPerson( item );
		}));

	} else {
		this.insuredPersons = ko.observableArray();
		this.insuredPersons.push( new InsuredPerson() ); // insurer is present by default
	}

	this.coverage = ko.observable({});
	this.coveredRisks = ko.observableArray();
	this.coveredRisksPrice = ko.observable(0);
	this.coveredRisksPriceEuro = ko.computed(function(){
		return formatEuro( this.coveredRisksPrice());
	},this);
	this.rateAdults = ko.observable(0);
	this.rateChildren = ko.observable(0);
	this.documents = ko.observable(modelData.documents || {});

	this.step1Invalid = ko.observable(false);
	this.step2Invalid = ko.observable(false);
	this.step3Invalid = ko.observable(false);

	this.insuredDays = ko.computed(function(){
		var fromDate = makeDateSK( this.insuredFrom()),
			toDate = makeDateSK( this.insuredTo());

		return daydiff( fromDate, toDate ) + 1;
	}, this);

	this.insuredDaysText = ko.computed(function(){
		var days = this.insuredDays(),
			daysText = "";

		if( days == 1 ){
			daysText = days + " deň";
		} else if( days > 1 && days < 5 ){
			daysText = days + " dni"; 
		} else if( days > 4 || days == 0 ){
			daysText = days + " dní";
		}

		return daysText;
	}, this);
	
	// navigation
	this.goToStep1 = function(){

		window.location.hash = "step1";
		this.step(1);

	};

	this.goToStep2 = function(){

		var valid;

		if( this.step() != 2 ){
			valid = this.validateStep1();

			this.step1Invalid( !valid );

			if( valid ){
				window.location.hash = "step2";
				this.step(2);
			}
		}
	};

	this.goToStep3 = function(){

		var valid;

		if( this.step() != 3 ){

			valid = this.validateStep2();

			this.step2Invalid( !valid );

			if( valid ){
				self.step3Invalid(false);
				window.location.hash = "step3";
				this.step(3);
			}
		}
	};

	this.newInsurance = function() {
		
		// remove hash and redirect to index
		window.location.hash = "";
		window.location.href = window.location.href.substring(0, window.location.href.length -1);
	};
	
	// validation
	this.validateStep1 = function(){
		var valid = true;
		/* poisteny od
		 povinny, minimalne dnes
		 poisteny do
		 povinny, minimalne rovny od
		 pocet osob musi byt min 1 max 5 */
		if( this.insuredFromError() ) { valid = false; }
		if( this.insuredToError() ){ valid = false; }
		if( this.personCountError() ){ valid = false; }
        if( this.landError() ){ valid = false; }
        if( this.areaError() ){ valid = false; }

		return valid;
	};

	this.validateStep2 = function(){
		var valid = true,
			i;
		
		// poistnik
		if( this.insurer.isPerson() ){

			// potrebujeme aby sa spustili, v 1 ife by po prvom skoncili
			if( this.insurer.nameError()){ valid = false; }
			if( this.insurer.surnameError()){ valid = false; }
			if( this.insurer.isCzechoSlovak() && this.insurer.rcError()){ valid = false; }
			if( this.insurer.birthDateError()){ valid = false; }

		} else {
			// potrebujeme aby sa spustili, v 1 ife by po prvom skoncili
			if( this.insurer.companyNameError() ){ valid = false; }
			if( this.insurer.icoError() ){ valid = false; }
			
			// nemoze byt inak
			this.insurer.same( false );
		}

		if( this.insurer.citizenError()){ valid = false; }

		// validate persons birth dates vs. adult,elder,children count
        if ( this.validAgeOfPersons() == false ) {
            valid = false;
        }

		// validovat adresu
		if( this.insurer.addressPSCError() ){
			valid = false;
		}
		if( this.insurer.addressStreetError() ){
			valid = false;
		}
		if( this.insurer.addressNumberError() ){
			valid = false;
		}
		if( this.insurer.addressCityError() ){
			valid = false;
		}

		// validovat korespondencnu adresu
		if( !this.insurer.address.same() ){

			if( this.insurer.postalAddressPSCError() ){
				valid = false;
			}
			if( this.insurer.postalAddressStreetError() ){
				valid = false;
			}
			if( this.insurer.postalAddressNumberError() ){
				valid = false;
			}
			if( this.insurer.postalAddressCityError() ){
				valid = false;
			}
		}

		// ak je poistnik zaroven poistenou osobou, tak prvy poistenec ma zdedit jeho data
		if( this.insuredPersons().length > 0 && this.insurer.same() == true ){
			this.insuredPersons()[0].name( this.insurer.name() );
			this.insuredPersons()[0].surname( this.insurer.surname() );
			this.insuredPersons()[0].birthDate( this.insurer.birthDate() );
			this.insuredPersons()[0].citizen( this.insurer.citizen() );
		}
		
		// validovat data poistencov
		if( this.insuredPersons().length > 0 &&
			this.insuredPersons().length == ( parseInt( this.childrenCount(),10 ) + parseInt( this.adultsCount(), 10 ) ) ){

			for( i=0; i < this.insuredPersons().length; i++ ){

				if( this.insuredPersons()[ i ].nameError() ){
					valid = false;
				}
				if( this.insuredPersons()[ i ].surnameError() ){
					valid = false;
				}
				if( this.insuredPersons()[ i ].birthDateError() ){
					valid = false;
				}
				if( this.insuredPersons()[ i ].citizenError() ){
					valid = false;
				}
			}

		} else {
			valid = false;
		}

		return valid;
	};

	
	this.insuredFromInvalid = function( dateFrom, dateTo, today ){
		
		if( !validDateSK( dateFrom ) ) {
			return "Zadajte správny dátum začiatku poistenia";
		} else if( makeDateSK( dateFrom ) < today ) {
			return "Dátum začiatku poistenia je v minulosti";
		} else if( makeDateSK( dateFrom ) > makeDateSK( dateTo ) ) {
			return "Dátum začiatku poistenia je za koncom poistenia";
		} else {
			return false;
		}
	};	

	this.insuredToInvalid = function( dateFrom, dateTo, today ){
		if( !validDateSK( dateTo ) ) {
			return "Zadajte správny dátum konca poistenia";
		} else if( makeDateSK( dateTo ) < today ) {
			return "Dátum konca poistenia je v minulosti";
		} else if( makeDateSK( dateTo ) < makeDateSK( dateFrom ) ) {
			return "Dátum konca poistenia je pred začiatkom poistenia";
		} else {
			return false;
		}
	};

    this.landError = ko.computed(function(){
        if( this.land() == undefined || this.land().label.length == 0 ) {
            return "Zadajte krajinu";
        } else {
            return false;
        }
    }, this);

    this.areaError = ko.computed(function(){
        if( this.country() == undefined || this.country().length == 0 ) {
            return "Zadajte územnú platnosť";
        } else if( this.land() != undefined ) {
            var area = this.land().area;
            if(area == "E" && this.country() == "SR") {
                return "Zadajte správnu územnú platnosť";
            }
            if(area == "M" && (this.country() == "E" || this.country() == "SR")) {
                return "Zadajte správnu územnú platnosť";
            }
            if(area == "S" && this.country() != "S") {
                return "Zadajte správnu územnú platnosť";
            }
            return false;
        }
    }, this);
	
	this.insuredFromError = ko.computed(function(){
		return this.insuredFromInvalid( this.insuredFrom(), this.insuredTo(), this.today );
	}, this );
	
	this.insuredToError = ko.computed(function(){
		return this.insuredToInvalid( this.insuredFrom(), this.insuredTo(), this.today );
	}, this );
	
	this.insuredDatesValid = ko.computed(function() {
		return this.insuredDays() > 0 && makeDateSK( this.insuredFrom() ) >= this.today && makeDateSK( this.insuredTo() ) >= this.today;
	}, this);	
	
	this.personCountInvalid = function( childrenCount, adultsCount ){
		var totalCount = parseInt(childrenCount, 10) + parseInt( adultsCount,10);

		if( totalCount > 5 || totalCount < 1 ) {
			return "Maximálny počet poistených osôb spolu je 5 a minimálny je 1";
		} else {
			return false;
		}
	};	
	
	this.personCountError = ko.computed(function(){
		return this.personCountInvalid( this.childrenCount(), this.adultsCount() );

	}, this );
	
	// visibles
	this.insurerVisiblePerson = ko.computed(function(){
		if( this.insurer.isPerson() ){
			return true;
		} else {
			return false;
		}
	}, this);
	
	this.insurerNameLabel = ko.computed(function() {
		if (this.insurer.typ() == "FOP") {
			return "Názov";
		} else if (this.insurer.typ() == "PO") {
			return "Názov spoločnosti";
		}
	}, this);
	
	// disable checkbox 'same as insurer' if insurer is FOP or PO
	this.isSameEnable = ko.computed(function() {
		if( this.insurer.isPerson() ){
			return true;
		} else {
			return false;
		}
	}, this);

	this.countryVisibleSlovakia = ko.computed(function(){

		if( this.country() == "SR" ){
			return true;
		} else {
			return false;
		}
	}, this);

	// actions
	this.selectPack = function( data, event ){
		var $element = $( event.currentTarget );
		if( this.country() == "SR" ){
			this.slovakPack( $element.data("pack") );			
		} else {
			this.otherPack( $element.data("pack") );
		}
	};

    this.showRiskValue = function( data ) {
        if ( data ) {
            return "<img src='/unickm.kcpuz/css/img/icon_ok.gif'/>"/*data*/;
        } else {
            return "-";
        }
    };

    this.showPackDesription = function( data ) {
      if ( data ) {

          var pack = data;
          if (pack == "B") {
              pack += (this.countryVisibleSlovakia() ? "i" : "e");
          }

          for(var i = 0; i < this.packDescriptions.length; i++) {
              var item = this.packDescriptions[i];

              if (pack == item.pack) {
                  return item.desc;
              }

          }
      }
        return "";
    };

    this.showRiskLabel = function() {
        if (self.riskGroup() == "S") {
            return "Šport";
        } else {
            return "Turista";
        }
    };

    this.showAreaName = ko.computed(function() {
        if(this.country()) {
            for(var i = 0; i < areaList.length; i++) {
                var area = areaList[i];
                if (area.key == this.country()) {
                    return area.label;
                }
            }
        }
        return "";
    }, this);

    this.showLandName = function() {
        if(this.land()) {
            return this.land().label;
        }
        return "";
    };

    this.showAllSports = function() {
        this.sportsVisible( !this.sportsVisible() );
    };

    this.changeAreaDisable = function() {
        self.areaDisable( !self.areaDisable() );
        if(self.areaDisable() == false) {
            self.landDisable( true );
        } else {
            self.landDisable( false );
        }
    };
	
	this.insurerSameClick = function(data, event){
		//console.log(this.insurer.same(), data, event);
		
		if( this.insurer.same() && this.insuredPersons().length > 0 ){
			
			this.insuredPersons()[0].name( this.insurer.name() );
			this.insuredPersons()[0].surname( this.insurer.surname() );

			if( this.insurer.isPerson() ){

				if( this.insurer.isCzechoSlovak() ) {
					var birthDate = getDateFromRC( this.insurer.rc() );

					this.insuredPersons()[0].birthDate( birthDate );
				} else {
					this.insuredPersons()[0].birthDate( this.insurer.birthDate() );
				}
			}

			this.insuredPersons()[0].citizen( this.insurer.citizen() );
			
		} else if( !this.insurer.same() && this.insuredPersons().length > 0 ){
			
			this.insuredPersons()[0].name( "" );
			this.insuredPersons()[0].surname( "" );
			this.insuredPersons()[0].birthDate( "" );
			this.insuredPersons()[0].citizen( "703" );
		}		
		
		return true;
	};

	this.removeInsuredPersonClick = function(){
		self.insuredPersons.remove( this );
	};

	this.removeInsuredPerson = function(){
		self.insuredPersons.pop();
	};

	this.addInsuredPerson = function(){
		this.insuredPersons.push( new InsuredPerson() );
	};
	
	

	this.save = function(){

		var self = this;
		
		window.service('save', ko.toJS(ckZajazdy),
			function(data){
				console.log("SAVE RESULT", data);
				
				if (data.status.toLowerCase() != "ok") {
					self.step3Invalid(true);
					self.documents({});
				} else {
					self.step3Invalid(false);
					self.documents({
						pdf1: data.pdf1,
						pdf2: data.pdf2,
						pdf3: data.pdf3,
						status: data.status
					});
				}
			}
		);
	};

	// watchers
	this.watchCoverage = ko.computed(function(){

		// je tu vsetko potrebne, aby sa pri zmene automaticky volala tato funkcia
		var self = this;

		if( this.country() == "SR"){
			this.selectedPackages( this.packages.slovak );
		} else {
			this.selectedPackages( this.packages.other );
		}

		this.coverage({});
		
		var count = parseInt(self.childrenCount(), 10) + parseInt(self.adultsCount(), 10);
		if (count > 0 && count < 6 && self.insuredDatesValid() == true ) {
			this.step1Invalid( false );
		
			window.service('calculateCoverage', {
					country: self.country(),
					riskGroupSport: self.riskGroup() == "S",
					childrenCount: self.childrenCount(),
					adultsCount: self.adultsCount(),
					baliky: self.selectedPackages(),
					insuredFrom: skDatetoUs( self.insuredFrom() ),
					insuredTo: skDatetoUs( self.insuredTo() )
				},
				function(data){
					for( var risk in data.coverage ){
						data.coverage[ risk + "Euro" ] = formatEuro( data.coverage[ risk ] );
					}
					self.coverage( data.coverage );
					self.dv( data.dv );
				}
			);
		} else {
			this.step1Invalid( true );
		}

	}, this);

	this.watchPack = ko.computed(function(){

		var selectedPack = this.pack(),
			coverage = this.coverage(),
			pack,
			riskCode,
			total = 0,
			totalRateChildren = 0,
			totalRateAdults = 0;

		this.coveredRisks.removeAll();

		// fill coveredRisks on pack change
		for( var risk in coverage ){
			pack = risk.substring(risk.indexOf("p") + 1);
			riskCode = risk.substring(1, risk.indexOf("p"));
			if( pack == selectedPack ){
				this.coveredRisks.push(
					{
						code: riskCode ,
						name: this.risks[ riskCode ],
						amount: coverage[ risk ],
						//amountEuro: formatEuro( coverage[ risk ] )
                        amountEuro: self.showRiskValue( coverage[ risk ] )
					}
				);
			}

			if( risk == "total"+selectedPack ){
				total = coverage[risk];
			}
		}
		totalRateAdults = divideCurrency(coverage["rateTotalAdults"+selectedPack], this.insuredDays());
		totalRateChildren = divideCurrency(coverage["rateTotalChildren"+selectedPack], this.insuredDays());
		
		this.coveredRisksPrice( total );
		this.rateAdults( totalRateAdults );
		this.rateChildren( totalRateChildren );
	}, this);

	this.watchDV = ko.computed(function(){
		
		if( this.dv() && this.dv().hasOwnProperty( "dv" + this.pack() ) ){
			this.predmet = this.dv()[ "dv" + this.pack() ][0].predmet;	
		}
		
		this.poistneSuma = this.coverage()[ "total" + this.pack() ];
		
	}, this);
	
	// poistne per osoba
	this.watchPersonPoistne = ko.computed(function(){
		if( this.coverage() && this.coverage().hasOwnProperty("total" + this.pack()) ){
			for( var i=0; i < this.insuredPersons().length; i++ ){
				this.insuredPersons()[ i ].poistne = this.coverage()["totalOsoba" + this.pack() + (i+1)];
			}
		}
	},this);
	
	this.watchPersons = ko.computed(function(){

		// watch persons change
		var personsCount = parseInt(this.childrenCount(),10) + parseInt(this.adultsCount(),10),
			i= 0,
			actualLength = this.insuredPersons().length,
			difference = Math.abs( actualLength - personsCount );

		if( actualLength < personsCount ){
			for( i=0; i < difference; i++ ){
				this.addInsuredPerson();
			}
		} else if( actualLength > personsCount ){
			for( i=0; i < difference; i++ ) {
				this.removeInsuredPerson();
			}
		}

	}, this);


	this.watchInsurerType = ko.computed(function(){
		
		if( this.insurer.isPerson() == false ){
			this.insurer.same( false );
		}

	}, this);

	
	this.watchCountry = ko.computed(function(){
		
		if( this.country() == "SR" ){
			this.pack( this.slovakPack() );
		} else {
			this.pack( this.otherPack() );
		}
		
	}, this);
	
	this.findAgeCategory = function( ageFrom, ageTo, personCount ){
		var i,
			found = 0,
			personAge,
			birthDate,
			equal;

		for( i = 0; i < this.insuredPersons().length; i++ ){

			birthDate = this.insuredPersons()[ i ].birthDate();

			if( i == 0 ){
				if( birthDate == "" ){
					birthDate = getDateFromRC( this.insurer.rc() );
				}
			}

			if( birthDate && birthDate != "" ){
				personAge = getAge( birthDate, now );
				if( personAge >= ageFrom && personAge <= ageTo ){
					found++;
				}
			}
		};

		equal = (found == parseInt(personCount,10)); 
		
		this.personBirthInvalid( !equal );
		
		return equal;
	};

    this.validAgeOfPersons = function() {
        var numberOfAdults = 0,
            numberOfChildren = 0,
            persons = this.insuredPersons(),
            valid = true;

        if ( persons ) {
            for( var i = 0; i < persons.length; i++) {
                var p = persons[i];
                var bDate = p.birthDate();

                if (i == 0 && bDate == "") {
                    bDate = getDateFromRC( this.insurer.rc() );
                }

                var age = getAge(bDate, now);

                if ( parseInt( age ) < 15 ) {
                    numberOfChildren++;
                } else {
                    numberOfAdults++;
                }
            }
        }

        this.childrenCountByDate( numberOfChildren );
        this.adultsCountByDate ( numberOfAdults );

        if ( this.adultsCount() != numberOfAdults ) {
            valid = false
        }

        if ( this.childrenCount() != numberOfChildren ) {
            valid = false;
        }

        this.personBirthInvalid( !valid );

        return valid;
    };
};

function Insurer( modelData ){

	modelData = modelData || {};
	modelData.address = modelData.address || {};
	modelData.postalAddress = modelData.postalAddress || {};

	this.typ = ko.observable( modelData.typ || "FO");
	this.companyName = ko.observable( modelData.companyName || "");
	this.ico = ko.observable( modelData.ico || "");
	this.name = ko.observable( modelData.name || "");
	this.surname = ko.observable( modelData.surname || "");
	this.rc = ko.observable( modelData.rc || "");
	this.birthDate = ko.observable( modelData.birthDate || "");
	this.title = ko.observable( modelData.title || "");
	this.phone = ko.observable( modelData.phone || "");
	this.email = ko.observable( modelData.email || "");
	this.citizen = ko.observable( modelData.citizen || "703");
	this.citizenText = ko.observable( modelData.citizenText || "");
	this.same = ko.observable( (modelData.same == false ) ? false : true );

	this.address = {
		psc: ko.observable( modelData.address.psc || ""),
		street: ko.observable( modelData.address.street || ""),
		number: ko.observable( modelData.address.number || ""),
		city: ko.observable( modelData.address.city || ""),
		same: ko.observable( (modelData.address.same == false ) ? false : true)
	};
	this.postalAddress = {
		psc: ko.observable( modelData.postalAddress.psc || ""),
		street: ko.observable( modelData.postalAddress.street || ""),
		number: ko.observable( modelData.postalAddress.number || ""),
		city: ko.observable( modelData.postalAddress.city || "")
	};

	// tests for properties
	this.isCzechoSlovak = ko.computed(function(){
		//SK, CZ
		if( this.citizen() == "703" || this.citizen() == "203" ){
			return  true;
		} else {
			return false;
		}

	}, this);

	this.isPerson = ko.computed(function(){
		if( this.typ() == "FO" ){
			return  true;
		} else {
			return false;
		};
	}, this);

	// insurer
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

	this.rcError = ko.computed(function(){

		if( this.rc() == "" ){
			return "Zadajte rodné číslo";
			
		} else if( ! validFormatRC(this.rc()) ){
			return "Rodné číslo je nesprávne";
		} else {
			return false;
		}

	}, this );

	this.birthDateError = ko.computed(function(){

		if( !this.isCzechoSlovak() ){
			if( this.birthDate() == "" ){
				return "Opravte dátum narodenia";
			} else if( !validDateSK( this.birthDate() ) ) {
				return "Zadajte správny dátum narodenia";
			} else if( makeDateSK( this.birthDate() ) > new Date() ) {
				return "Dátum narodenia je v budúcnosti";
			}
		} else {
			return false;
		}

	}, this );

	this.companyNameError = ko.computed(function(){

		if( this.companyName() == "" ){
			return "Zadajte názov spolocnosti";
		} else {
			return false;
		}

	}, this );

	this.icoError = ko.computed(function(){

		if( this.ico() == "" ){
			return "Zadajte IČO";
		} else if ( !(this.ico()+"").match(/^[0-9]{8}$/) ) {
			return "Opravte IČO";
		} else {
			return false;
		}

	}, this );

	this.citizenError = ko.computed(function(){

		if( !(this.citizen()+"").match(/[0-9]+/) ){
			return "Zadajte štátnu príslušnosť";
		} else {
			return false;
		}

	}, this );

	// insurer address
	this.addressPSCError = ko.computed(function(){

		if( !( this.address.psc() +"" ).match(/^[0-9\ ]{5,6}$/)  ){
			return "Zadajte PSČ";
		} else {
			return false;
		}

	}, this );

	this.addressStreetError = ko.computed(function(){

		if( this.address.street() == "" ){
			return "Zadajte ulicu";
		} else {
			return false;
		}

	}, this );

	this.addressNumberError = ko.computed(function(){

		if( this.address.number() == "" ){
			return "Zadajte číslo";
		} else {
			return false;
		}

	}, this );

	this.addressCityError = ko.computed(function(){

		if( this.address.city() == "" ){
			return "Zadajte mesto";
		} else {
			return false;
		}

	}, this );

	// insurer postal address
	this.postalAddressPSCError = ko.computed(function(){

		if( !( this.postalAddress.psc() +"" ).match(/^[0-9\ ]{5,6}$/)  ){
			return "Zadajte PSČ";
		} else {
			return false;
		}

	}, this );

	this.postalAddressStreetError = ko.computed(function(){

		if( this.postalAddress.street() == "" ){
			return "Zadajte ulicu";
		} else {
			return false;
		}

	}, this );

	this.postalAddressNumberError = ko.computed(function(){

		if( this.postalAddress.number() == "" ){
			return "Zadajte číslo";
		} else {
			return false;
		}

	}, this );

	this.postalAddressCityError = ko.computed(function(){

		if( this.postalAddress.city() == "" ){
			return "Zadajte mesto";
		} else {
			return false;
		}

	}, this );
	
	// watch functions
	this.watchCitizen = ko.computed(function(){
		
		this.countryByCode( this.citizen() );
		
	}, this);

	this.watchRC = ko.computed(function(){
		
		if( this.isCzechoSlovak() == true ){
		
			if( this.rc() != "" ){
				this.birthDate( getDateFromRC( this.rc() ) );
			}
		}
		
	}, this);
};

function InsuredPerson( modelData ){

	var thisPerson = this;

	modelData = modelData || {};

	this.name = ko.observable( modelData.name || "");
	this.surname = ko.observable( modelData.surname || "");
	this.birthDate = ko.observable( modelData.birthDate || "");
	this.citizen = ko.observable( modelData.citizen || "703");
	this.citizenText = ko.observable( modelData.citizenText || "");
	
	this.poistne = 0;

	// treba lebo inak nema pristup ku konkretnemu objektu v poli
	this.nameError = ko.computed(function(){

		if( this.name() == "" ){
			return "Zadajte meno";
		} else {
			return false;
		}

	}, thisPerson );

	this.surnameError = ko.computed(function(){

		if( this.surname() == "" ){
			return "Zadajte priezvisko";
		} else {
			return false;
		}

	}, thisPerson );

	this.birthDateError = ko.computed(function(){

		if( this.birthDate() == "" ){
			return "Zadajte dátum narodenia";
		} else if( !validDateSK( this.birthDate() ) ) {
			return "Zadajte správny dátum narodenia";
		} else if( makeDateSK( this.birthDate() ) > new Date() ) {
			return "Dátum narodenia je v budúcnosti";
		} else {
			return false;
		}

	}, thisPerson );

	this.citizenError = ko.computed(function(){

		if( !(this.citizen()+"").match(/[0-9]+/) ){
			return "Zadajte štátnu príslušnosť";
		} else {
			return false;
		}

	}, thisPerson );

	this.countryByCode = function( code ){

		window.service('countryText', code,
			function(data){
				if (data && data != undefined) {
					thisPerson.citizenText( data.text );
				}
			}
		);
	};

	// watch funcitions
	this.watchCitizen = ko.computed(function(){
		this.countryByCode( this.citizen() );
	}, this);
};

function priceEUR(getset, owner){

	return ko.computed({
		read : function(){
			return getset()+" Eur";
		},
		write : function(value){
			getset( value.replace(/ Eur/g, "") );
		},
		owner : owner
	});
};

function dateToUS( date ){

	if( !date ){
		var date = new Date(0,0,0,0,0,0,0);
	}

	var year = date.getFullYear(),
		day = padTime( date.getDate() ),
		mon = padTime( date.getMonth() + 1 );

	return year + "-" + mon + "-" + day;
};

function dateToSK( date ){

	if( !date ){
		var date = new Date(0,0,0,0,0,0,0,0);
	}

	var year = date.getFullYear(),
		day = padTime( date.getDate() ),
		mon = padTime( date.getMonth() + 1 );

	return day + "." + mon + "." + year;
};

function dateTimeToSK( date ){

	if( !date ){
		var date = new Date(0,0,0,0,0,0,0,0);
	}

	var year = date.getFullYear(),
		day = padTime( date.getDate() ),
		mon = padTime( date.getMonth() + 1 ),
		hour = padTime( date.getHours() ),
		min = padTime( date.getMinutes() ),
		sec = padTime( date.getSeconds() );
	
	return day + "." + mon + "." + year + " " + hour + ":" + min + ":" + sec;
};

function makeDateSK( str ){

	var dateIn = str,
		year = dateIn.substring(6,10),
		mon = parseInt( dateIn.substring(3,5), 10),
		day = parseInt( dateIn.substring(0,2), 10);

	return new Date( year,mon-1, day,0,0,0,0,0);
};

function makeDateUS( str ){

	var dateIn = str,
		year = parseInt( dateIn.substring(0,4), 10),
		mon = parseInt( dateIn.substring(5,7), 10),
		day = parseInt( dateIn.substring(8,10), 10);

	return new Date(year, mon-1, day, 0,0,0,0,0);
};

function parseDateSK( str ){

	var dateIn = str,
		year = dateIn.substring(6,10),
		mon = dateIn.substring(3,5),
		day = dateIn.substring(0,2);

	return {
		year: year,
		month: mon,
		day: day
	};
};

function parseDateUS( str ){

	var dateIn = str,
		year = dateIn.substring(0,4),
		mon = dateIn.substring(5,7),
		day = dateIn.substring(8,10);

	return {
		year: year,
		month: mon,
		day: day
	};
};

function padTime( num ){
	if( num < 10 ){
		return "0"+num;
	} else {
		return num;
	}
}

function jsonDateToSK( str ){
	var sk = parseDateUS( str );
	return sk.day + "." + sk.month + "." + sk.year;
}

function skDatetoUs( str ){
	var sk = parseDateSK( str );
	return sk.year + "-" + sk.month + "-" + sk.day;
}

function daydiff( startDate, endDate ){
	return Math.round( (endDate - startDate ) / (1000*60*60*24) );
}

function divideCurrency(currency, divisor) {
	if (currency && currency != undefined && divisor && divisor != undefined && parseInt(divisor, 10) > 0) {
		var currencyNum = currency;
		currencyNum = ( currencyNum / divisor ).toFixed(2);
	
		return currencyNum + "";
	}
	
	return "";
}

function getAge( dateBirth, dateNow ){
	var years= 0,
		dateBirthSK = parseDateSK( dateBirth ),
		nowYear = dateNow.getFullYear(),
		nowMonth = dateNow.getMonth() + 1,
		nowDay = dateNow.getDate(),
		age = nowYear - dateBirthSK.year;

	if( nowMonth > dateBirthSK.month ){

	} else if( nowMonth == dateBirthSK.month ){
		 if( nowDay < dateBirthSK.day ){
			 age--;
		 }
	} else {
		age--;
	}

	return age;
};

function validDateSK( date ) {
	 var regExp = /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)\d\d$/,
     matches = regExp.test( date );
	 
	 return matches;
	 
}

function validFormatRC( rc ) {

    var regExp = /^\s*(\d\d)(\d\d)(\d\d)[ /]*(\d\d\d)(\d?)\s*$/,
        matches = regExp.exec( rc ),
		now = new Date();

    if ( !matches  || matches.length < 5) {
        return false;
    }

    var c = ( typeof matches[5] == "string" ) ? matches[5]  : "",
        year  = parseInt(matches[1],10),
        yearOrig  = matches[1],
        month = matches[2],
        monthOrig = month,
        day   = matches[3],
        ext   = matches[4];

    if ( c === '') {
		// bez kontrolnej cislice

        if( year > 54 ){
            return false;
        }
    } else {

        // kontrolna cislica
        var mod = parseInt(year + "" + month + "" + day + "" + ext, 10) % 11;
        if ( mod === 10) mod = 0;
        if ( mod !== parseInt( c, 10 ) ) {
            return false;
        }
    }

    // kontrola datumu
    if( c === '' )
        year += 1900;
    else {
		//year += year < 54 ? 2000 : 1900;

		if( 2000 + year > now.getFullYear() ){
			year += 1900;
		} else {
			year += 2000;
		}
	}

    month = parseInt( month, 10);

    // k mesiaci moze byt pripocitane 20, 50 alebo 70
    if( month > 70 && year > 2003) month -= 70;
    else if ( month > 50) month -= 50;
    else if ( month > 20 && year > 2003) month -= 20;

    //kontrola datumu
    var composedDate = new Date(year, month-1, day);
    var valid = (composedDate.getDate() == parseInt(day,10) &&
            composedDate.getMonth() == (month-1) &&
            composedDate.getFullYear() == year);

    return valid;
    
}

function getDateFromRC( rc ){

	if( rc && rc != "" && rc.length > 8 && validFormatRC(rc) ){

		var year,
			mon,
			day;

		year = parseInt( rc.substring(0,2), 10 );
		mon = parseInt( rc.substring(2,4), 10 );
		day = parseInt( rc.substring(4,6), 10 );

		if( mon > 12 ){
			mon -= 50
		}

		if( (year+2000) < new Date().getFullYear() ){
			year += 2000;
		} else {
			year += 1900;
		}

		if( day < 10 ){
			day = "0" + day;
		}

		if( mon < 10 ){
			mon = "0" + mon;
		}

		return day + "." + mon + "." + year;

	} else {
		return "";
	}
};

function formatEuro( num ){
	return ( Number( num ).toFixed(2) + " &euro;" ).replace(".",",");
};
