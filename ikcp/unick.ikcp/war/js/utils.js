/**
 * Created by Peter Cervienka on 26.9.2014.
 *
 * version: 1.0, date:  01.10.2014
 */

function Loader(){
    // for data-bind
    this.loading = ko.observable(false);

    // for model
    this.isLoading = function(){
      return this.loading.peek();
    };

    // for model
    this.startLoading = function(){
        this.loading(true);
    };

    // for model
    this.stopLoading = function(){
        this.loading(false);
    };
};

// ************** DATES *****************//
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

function makeDateFromMMYY( str ){

    var dateIn = str,
        year = dateIn.substring(3,7),
        mon = parseInt( dateIn.substring(0,2), 10)

    return new Date( year,mon-1, 1,0,0,0,0,0);
};

function dateAddMonth( date, value ) {

    date.setMonth( date.getMonth() + value );
    return date;
};

function dateToMMYYSK( date ){

    if( !date ){
        var date = new Date(0,0,0,0,0,0,0,0);
    }

    var year = date.getFullYear(),
        mon = padTime( date.getMonth() + 1 );

    return mon + "." + year;
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

function dateToMMMMYY( date ) {
    if( date ) {
        var month = date.getMonth(),
            year = date.getFullYear(),
            monthStr = "",
            arr = ["Jan.","Feb.", "Mar.", "Apr.","Máj", "Jún","Júl","Aug.","Sep.","Okt.","Nov.","Dec"];

        return arr[month] + " " + year;
    }

    return "";
};

function makeDateSK( str ){

    var dateIn = normalizeSKDateAsString( str ),
        year = dateIn.substring(6,10),
        mon = padTime( parseInt( dateIn.substring(3,5), 10) ),
        day = padTime( parseInt( dateIn.substring(0,2), 10) );

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

function normalizeSKDateAsString( stringDate ) {
    var arr = stringDate.split(".");
    if (arr && arr.length == 3) {

        arr[0] = padTime( parseInt( arr[0], 10) );
        arr[1] = padTime( parseInt( arr[1], 10) );

        return arr[0] + "." + arr[1] + "." + arr[2];
    }

    return stringDate;
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
};

function validDateSK( date ) {
    var regExp = /^(((0?[1-9]|[12]\d|3[01])\.(0[13578]|[13578]|1[02])\.((1[6-9]|[2-9]\d)\d{2}))|((0?[1-9]|[12]\d|30)\.(0[13456789]|[13456789]|1[012])\.((1[6-9]|[2-9]\d)\d{2}))|((0?[1-9]|1\d|2[0-8])\.0?2\.((1[6-9]|[2-9]\d)\d{2}))|(29\.0?2\.((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/,
        matches = regExp.test( date );

    return matches;
};

function validMonthYearDate( date ) {
    var regExp = /^(0[1-9]|1[012])[.](19|20)\d\d$/,
        matches = regExp.test( date );

    return matches;
};

function isGreaterOrEqualThenToday( date ) {
    if (date ) {
        var d;
        if ( typeof date == 'string' ) {
            d = makeDateSK( date );
        } else {
            d = date;
        }
        var today = makeDateSK( dateToSK( new Date() ) );

        return ( d >= today );
    }

    return false;
};

function isLowerOrEqualThenToday( date ) {
    if (date ) {
        var d;
        if ( typeof date == 'string' ) {
            d = makeDateSK( date );
        } else {
            d = date;
        }
        var today = makeDateSK( dateToSK( new Date() ) );

        return ( d <= today );
    }

    return false;
};

function getAge( dateBirth, dateNow ){
    var years= 0,
        dateBirthSK = parseDateSK( normalizeSKDateAsString( dateBirth ) ),
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

// ************** STRING *****************//

function formatEuro( num ){
    return ( Number( num ).toFixed(2) + " &euro;" ).replace(".",",");
};

function formatPercent( num ){
    return ( Number( num ).toFixed(2) + " %" ).replace(".",",");
};

function formatNumber( num ){
    return ( Number( num ).toFixed(2)).replace(".",",");
};

function formatTimeDuration( duration ) {
    if (duration) {
        var periodYears = Math.floor( duration / 12 );
        var months = parseFloat( duration % 12 );
        if (months < 1) {
            months = Math.ceil( months );
        } else {
            months = Math.round( months );
        }
        var periodMonths = ( months % 12 ).toFixed(0);

        var result = "";
        if (periodYears > 0) {
            result = periodYears + " r. ";
        }

        result += periodMonths + " m.";

        return result;
    }
    return "";
}

function validStringLength( input, min, max) {
    if (input != undefined && typeof input == 'string' ) {
        var length = input.length;
        if (min != undefined) {
            if (length <= min) return false;
        }
        if (max != undefined) {
            if (length > max) return false;
        }

        return true;
    }

    return false;

}


// ************** NUMBER ******************//
function validNumberFormat( input ) {
    var regExp = /^[0-9]{1,13}$/,
        matches = regExp.test( input );

    return matches;

}

function validPostalCodeFormat( input ) {
    var regExp = /^[0-9]{5}$/,
        matches = regExp.test( input );

    return matches;

}

// ************** DECIMAL *****************//
function validDecimalFormat( input ) {
    var regExp = /^\d+([\,\.]\d{1,2})?$/,
        matches = regExp.test( input );

    return matches;

}

function validRange( input, min, max) {
    if (input != undefined && !isNaN(input)) {
        input = parseFloat( input );
        if (min != undefined) {
            if (input <= min) return false;
        }
        if (max != undefined) {
            if (input >= max) return false;
        }

        return true;
    }

    return false;

}

// ***************** PHONE *************** //
this.validatePhone = function( phone ){

    if ( phone ) {

        var valid = true,
            phonePat = /^\+((421)|(420))[0-9]{9}$/,
            phoneVal = phone;

        if( phoneVal.substr( 0, 4 ) == "+421" || phoneVal.substr( 0, 4 ) == "+420"){
            // sk, cz
            phonePat = /^\+[0-9]{12}$/;
        } else {
            // zahranicne
            phonePat = /^\+[0-9]+$/;
        }

        if( phoneVal == '' || !phonePat.test( phoneVal ) ){
            valid = false;
        }

        return valid;
    } else {
        return false;
    }

};

// ***************** EMAIL *************** //
this.validateEmail = function( email ){

    if ( email ) {
        var valid = true,
            val = email,
            matchPat = /^[^\ ]{1,64}@[A-Za-z0-9\-\.]{2,64}\.[A-Za-z]{2,10}$/,
            valPat = /[\ \n\t\r]/g;

        val = val.replace(valPat,"");

        if( val.length < 1 || !matchPat.test( val ) ){
            valid = false;
        }

        return valid;
    } else {
        return false;
    }
};

// ***************** URL ***************** //
function createDataModelFromURL() {
    var modelData = {},
        type = getParameterByName("type"),
        i1, i2, i3,
        p1, p2, p3, p4,
        input, tv = "TV", da = "DA";

    if ( type == "" || ( type != tv && type != da ) ) {
        type = tv;
    }

    // set type of calculation
    modelData.typeOfCalculation = type;

    if ( type == tv ) {
        // by target value

        // set parameter of calculation
        var date = new Date();
        i1 = getParameterByName("i1", 50000);
        i2 = getParameterByName("i2", (date.getMonth()+1) + "." + (date.getFullYear() + 6) );
        i3 = getParameterByName("i3", "m");

        input = { targetValue: i1, endDate: i2, frequency: i3 };
        modelData.targetValueInput = input;
        modelData.depositAmountInput = {};
    } else if (type == da) {
        // by deposit amount

        // set parameter of calculation
        i1 = getParameterByName("i1", "m");
        i2 = getParameterByName("i2", 200);
        i3 = getParameterByName("i3", 6);

        input = { frequency: i1, deposit: i2, duration: i3 };
        modelData.depositAmountInput = input;
        modelData.targetValueInput = {};
    }

    // set product configurator
    p1 = getParameterByName("p1", 60);
    p2 = getParameterByName("p2", 0.6);
    p3 = getParameterByName("p3", 5);
    p4 = getParameterByName("p4", 1);

    modelData.productConfigurator = { minimalAmount: p1, loanPayment : p2, interestRate : p3, numberOfPersons : p4 };

    return modelData;
}

// rodne cislo validacie
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
