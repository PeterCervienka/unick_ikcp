/* Obsluha UI */
$(document).ready(function()	{

	// foxus na inputoch
	$(".required input").focus(function()	{
		$(this).parents(".required").addClass("has-focus");
	}).blur(function()	{
		$(this).parents(".required").removeClass("has-focus");
	});

	// help v tabulke
	/*$("[href=#show-help]").click(function()	{
		$(this).toggleClass("opened");
		$(".table-help").toggle();
	});*/

    $(".help-toggler").bind( "click", function () {
        var id = $(this).attr("href");
        id = id.replace("#", "");

        $("."+id).toggle();
        $(this).toggleClass("opened");
    });

	// error hlasky na inputoch
	$("input, select").bind("focus.basex, change.basex", function(){
		$(this).addClass("dirty");
	});

	// error hlasky na inputoch
	$(".resetDirty").bind("click.basex", function(){
		// remove old errors
		$("input, select").removeClass("dirty");

		$( this ).parents(".form-step").find("input,select").addClass("dirty").each(function( index, element){
			document.showElementErrors( element );
		});
	});

});

document.fixRawDomSelect = function(){
	window.setTimeout(function(){
		$("select:visible > option:selected").each(function( a, b ){
			if( $(b).css("display") == "none" ){

				var all = $(b).parent().find("option");

				$(b).prop( "disabled", true );

				for( var i = 0; i < all.length; i++){
					var $row = $( all[i] );
					if( $row.css("display") != "none") {
						$row.prop('selected', true);
						console.log("set option", $row.text());
						return true;
					}
				}
			}
		});
	},100);

};

document.showElementErrors = function( element ){

	var error = $( element ).attr("data-error");

	if( error){
		$( element ).parent().addClass("has-error").find("div.error").html( error );
	} else {
		$( element ).parent().removeClass("has-error").find("div.error").html("&nbsp;");
	}

};

ko.bindingHandlers.error = {
	update: function( element, valueAccessor, allBindings, viewModel, bindingContext ){

		var err = ko.utils.unwrapObservable( valueAccessor() );  //unwrap to get subscription

		if( typeof err == "string" && err.length > 0 ){
			$( element ).attr("data-error", err );
		} else {
			$( element ).removeAttr("data-error");
		}

		if( document.hasOwnProperty("showElementErrors") == true &&
			typeof document.showElementErrors == "function" ){
			document.showElementErrors( element );
		}
	}
};

ko.bindingHandlers.jq = {
	init: function( element, valueAccessor, allBindingsAccessor){
		if( !ko.jq ) throw "jq binding required ko.jq namespace";
		
		var funcName = valueAccessor(),
			func = ko.jq[ funcName ]; 
		
		if( !(func && typeof func =="function") ){ 
			throw "jq binding " + funcName + " is not function";
		}
		
		func(element);
	}
};

/*
ko.numericObservable = function(initialValue) {
    var _actual = ko.observable(initialValue);

    var result = ko.dependentObservable({
        read: function() {
            return _actual();
        },
        write: function(newValue) {
            _actual( parseInt(newValue,10) );
        }
    });

    return result;
};*/

function saveToLS( name, data ){
	if( localStorage ){
		localStorage.setItem(name, ko.toJSON(data) );
	}
};

function readFromLS( name ){
	if( localStorage && localStorage.getItem( name ) !== null && localStorage.getItem( name ) != "undefined" ){
		return JSON.parse( localStorage.getItem( name ) );
	} else {
		return {};
	}
};

// getuje parameter z url, pre zistenie index.html?debug=1
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}