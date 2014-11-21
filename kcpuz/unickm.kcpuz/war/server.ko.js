ko = {};
ko.observable = function(def){
	var v = def;
	var ff =  function(){
		if(arguments.length==0) return v;
		else v = arguments[0]; 
	};
	ff.kogetset=true;
	return ff;
};

ko.observableArray = function(a){
	a = a || [];
	var ff = function() { return a};
	ff.kogetset = true;
	ff.removeAll = function(){ a = []; };
	ff.push = function(item) { a.push(item); };
	return ff;
};

ko.computed = function(f, self){
	var ff = function(){
		return f.apply(self, arguments);
	};
	ff.kogetset = true;
	return ff;
};

ko.isObservable = function(val){
	return (val && (typeof val === 'function') && val.kogetset);
};

ko.toJSON = function(obj){
	return JSON.stringify(obj, function(key, value){
		if(key=='watchCoverage' || key=='watchPack'){
			return undefined;
		}
		if (typeof value === 'function'){
			return ko.isObservable(value) ? value() : undefined;
		} else {
			return value;
		}
	});
}

ko.utils = {};
ko.utils.arrayMap = function(array, mapping){
	array = array || [];
    var result = [];
    for (var i = 0, j = array.length; i < j; i++)
        result.push(mapping(array[i], i));
    return result;
};
