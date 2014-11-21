window.location.contextPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

window.service = function(name, data, success, failure){
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

window._apiRaw = function(){
	throw "run apiRaw only inside services";
}

window._apiJson = function(){
	throw "run apiJson only inside services";
}
