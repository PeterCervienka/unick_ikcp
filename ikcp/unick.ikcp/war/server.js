window = {};
window._service = {};
window._apiRaw = function(name, data) { return __api(name, data); }
window._apiJson = function(name, data) { var r = __api(name, data ? JSON.stringify(data) : {}); return JSON.parse(r); }

window.service = function(name, data, success, failure){
	if(typeof(failure) != "function") failure = function(e){ throw e; }
	var sfunc = window._service[name];
	if(typeof(sfunc) != "function") throw "undefined service funtion "+name;
	try{
		var data2 = JSON.parse(JSON.stringify(data)); 
		var res = sfunc(data2);
		if(success) success(res);
	}catch(e){
		console.log(e);
		failure(e);
	}
}

console = {};
console.log = function(v1,v2){ __print(v1,v2); };

__load('service.js');
__load('js/countries.js');

function _service_exec(name, json){
	
	if(name=="save"){
		__load('server.ko.js');
		__load('js/countries.js');
		__load('model.js');
	}
	
	var sfunc = window._service[name];
	if(typeof(sfunc) != "function") throw "undefined service funtion "+name;
	var data = JSON.parse(json);
	res = sfunc(data);
	return JSON.stringify(res);
}