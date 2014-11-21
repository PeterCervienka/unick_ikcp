window.location.contextPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

document.service = function(name, data, success, failure){
	if(typeof(failure) != "function") failure = function(data){ alert(data.responseText); }
	$.ajax({
        type: "POST",
        url: window.location.contextPath+"/service/"+name,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: success,
        failure: failure
  });	
}

var _api = function(){
	throw "run api only inside services";
}

document.codelist = function(name, data, success){
	var failure = function(data){ alert(data.responseText); }
	$.ajax({
        type: "GET",
        url: window.location.contextPath+"/codelist/"+name,
        dataType: "json",
        success: success,
        failure: failure 
  });	
}
