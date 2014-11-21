window.location.contextPath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

window._service = {};

window.service = function(name, data, success, failure){
	if(typeof(failure) != "function") failure = function(data){ alert(data.responseText); }
	var sfunc = window._service[name];
	if(typeof(sfunc) != "function") throw "undefined service funtion "+name;
	try{
		var data2 = JSON.parse(JSON.stringify(data)); 
		var res = sfunc(data2);
		if(success) success(res);
	}catch(e){
		failure(e);
	}
}

window._apiRaw = function(name, data){
	var a = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	a.open("POST", window.location.contextPath+"/api/"+name, false);
	a.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	a.send(data);
	return a.responseText;                                         
}                                             

window._apiJson = function(name, data){
	var a = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	a.open("POST", window.location.contextPath+"/api/"+name, false);
	a.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	a.send(JSON.stringify(data));
	return JSON.parse(a.responseText);                                         
}                                             
