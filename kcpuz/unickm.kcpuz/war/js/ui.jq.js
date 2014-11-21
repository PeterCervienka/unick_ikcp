/** jq Binders **/

var datepickerOptions = {
		firstDay: "1",
		dayNamesMin: [ "Ne", "Po", "Ut", "St", "Št", "Pi", "So" ],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'Máj', 'Jún', 'Júl', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec' ],
		monthNames: [ 'Január', 'Február', 'Marec', 'Apríl', 'Máj', 'Jún', 'Júl', 'August', 'September', 'Október', 'November', 'December' ],
		yearRange: "c-99:c+99"
	};

// jquery binders
ko.jq = ko.jq || {};

// datum narodenia poistnik a poistenci
ko.jq.birthDatePicker = function( element ){

    $( element ).datepicker({
    	dateFormat: 'dd.mm.yy',
    	changeMonth: true,
    	changeYear: true,
    	minDate: '-100Y',
    	maxDate: '+0D',
    	onSelect: function(){
    		$(this).change();
    	}
    }).datepicker("option", datepickerOptions);
};

// adresy
ko.jq.addressAutocomplete = function( element ){
	
	var parent = element;
	
	$( element ).find( "input[data-name]" ).autocomplete({
	      source: function(request, response){
	    	  var term = request.term,
	    	      name = $(this.element).attr("data-name"),
	    	  	  request = {},
	    	  	  $parent = $(parent),
	    	  	  $city = $parent.find("input[data-name=city]"),
	    	  	  $street = $parent.find("input[data-name=street]"),
	    	  	  $psc = $parent.find("input[data-name=psc]");
	    	  
	    	  if( name == "street" ){
	    		  request = { street:term, city: $city.val(), psc: $psc.val(), type:"street" };
	    	  }
	    	  else if( name == "city"){
	    		  request = { street: $street.val(), city:term, psc: $psc.val(), type:"city" };
	    	  }
	    	  else if( name == "psc"){
	    		  request = {city: $city.val(), psc: term, type: "psc" };
	    	  }
	    	  
	    	  $.ajax({
	    		  url: "api/address",
	    		  type: "post",
	    		  data: request,
	    		  dataType: "json",
	    		  success: response
	    	  });
	      },
	      minLength: 2,
	      select: function( event, ui ) {
	    	  
	    	  var $parent = $(parent);
	    	  if(ui.item.s){
	    		  $parent.find("input[data-name=street]").val(ui.item.s).change(); 
	    	  }
	    	  if(ui.item.c){
	    		  $parent.find("input[data-name=city]").val(ui.item.c).change();
	    	  }
	    	  if(ui.item.p){
	    		  $parent.find("input[data-name=psc]").val(ui.item.p).change();	    	  
	    	  }

	    	  $(this).val( ui.item.value ).change();
	      },
	      onSelect: function(){
	    	  
	    	  $(this).change();
	      }
	  });
};

ko.jq.landAutocomplete = function( element ){

    var parent = element;

    $( element ).autocomplete({
        source: countryList,
        minLength: 0,
        select: function( event, ui ) {

            $(this).val( ui.item.value ).change();

            $("#country").val( ui.item.area );
            ckZajazdy.country( ui.item.area );
            ckZajazdy.land( ui.item );
        },
        onSelect: function(){

            $(this).change();
        }
    }).focus(function(){
        if( $(this).val().length == 0) {
            $(this).autocomplete('option', 'source', getDefaultCountries());
        } else {
            $(this).autocomplete('option', 'source', getAllCountries());
        }

        $(this).autocomplete("search");
    }).keydown(function() {
        if( $(this).val().length == 0) {
            $(this).autocomplete('option', 'source', getDefaultCountries());
        } else {
            $(this).autocomplete('option', 'source', getAllCountries());
        }

        $(this).autocomplete("search");
    });
};

// datumovnik na poistenie od, do 1. krok
ko.jq.insuranceDatepicker = function( element ){
	
	$( element ).datepicker({
		dateFormat: 'dd.mm.yy', 
		minDate: new Date(),
		numberOfMonths: 3,
		onSelect: function(){
			$(this).change();
		}
	}).datepicker("option", datepickerOptions);
	
};


// titul
ko.jq.titleAutocomplete = function( element ){
	
	// init cache
	ko.jq.titleCache = ko.jq.titleCache || {};
	
	$( element ).autocomplete({
		source: function( request, response ) {

			var searchTerm = request.term;
			
			// filter input data for results
			function filterData( dataIn, term ){
				
				var re = $.ui.autocomplete.escapeRegex( term ),
            	matcher = new RegExp( "^" + re, "i" ),
            	filtered = $.grep(dataIn, function(item){return matcher.test(item.text);});

				return filtered;
			};
			
			if( ko.jq.titleCache.length > 0 ){

				response( filterData( ko.jq.titleCache, searchTerm ) );
				return;
			}
			
			// get from remote datasource
			$.ajax({
				url: "api/codelist",
				type: "post",
				data: {name: "Titul"},
				dataType: "json",
				success: function( data ) {

					$.each( data, function( index, item ) {
		        		item.value = item.text;
		        		item.label = item.text;
		        	});					
					
					ko.jq.titleCache = data;
					response( filterData( data, searchTerm ) );
	            }	            
			});
			
        }, 
		minLength: 1, 
		delay: 300,
		onSelect: function(a){
			$(this).change();
		}		
	});
	
};

