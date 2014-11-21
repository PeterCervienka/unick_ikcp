(function() {

	var to2 = function(v) {
			v = Math.round(v * 100) / 100;
			return v.toFixed(2);
	}
	
	var numberFormat = function (number) {
		return ((arguments[2] = number.toString().replace(new RegExp("(\\d+)(\\d{3})($|)"),'$1 $2$3')) == number) ? arguments[2] : arguments.callee(arguments[2]);
	}	
	
	var nf = function(number) {
		number = numberFormat(number);
		return number.replace('.', ',') + ' &euro;';
	}

	window.wcalc = function(settings, out) {
			this.s = settings;
			this.o = out;
		
			var self = this;
			
			this.err = document.getElementById(this.o['err']);
			this.err_text = document.getElementById(this.o['err_text']);			
			this.hideError();

			
			this.res = document.getElementById('bc-result-bonus');
			//this.hideResult();
			
			document.getElementById('bc-button').onclick = function() {
				self.calculate(2);
				self.calculate(3);				
				self.calculate(4);
				
			}
			
			document.getElementById('bc-deposit').onkeydown = function(e) {
				if (!e) var e = window.event;
				var keyCode = e.keyCode;
				if (keyCode == 13) {			
					self.calculate(2);
					self.calculate(3);				
					self.calculate(4);				
				}
			}			

			document.getElementById('bc-calc').onsubmit = function() {
				return false;
			}
	}
	
	wcalc.prototype.showError = function() {
		this.err.style.display = '';
		this.err_text.innerHTML = this.e;
	}	
	
	wcalc.prototype.hideError = function() {
		this.err.style.display = 'none';
		this.err_text.innerHTML = '';
		this.e = '';
	}	
	
	wcalc.prototype.showResult = function(r, t) {
		this.res.style.display = '';
		document.getElementById(this.o['urok'+t]).innerHTML = nf(r['urok']);
		document.getElementById(this.o['bonus'+t]).innerHTML = nf(r['bonus']);
		document.getElementById(this.o['vynos'+t]).innerHTML = nf(r['result']);
		$("#interesBoxBonus").show();
		$('input[name="deposit"]').val($('#bc-deposit').val());
	}	
	
	wcalc.prototype.hideResult = function(r) {
		this.res.style.display = 'none';
		$("#interesBoxBonus").hide();
	}	
	
	wcalc.prototype.check = function(v) {
		this.hideError();	
		this.hideResult();
		var r = true;
		
		if (isNaN(v)) {
			this.e = this.s['vkladError'];
			r = false;
		}
		if (v < 1000) {
			this.e = this.s['minError'];
			r = false;
		}
		if (v > 17000) {
			this.e = this.s['maxError'];
			r = false;
		}
		
		return r;
		}
		
		wcalc.prototype.getUrok = function(v, u) {
			return v * parseFloat(this.s[u]);
		}		
		
		wcalc.prototype.getBonus = function(v, t) {
			return v * parseFloat(this.s['bonus'+t]);
		}		
		
		wcalc.prototype.calculate = function(t) {
			var el = document.getElementById('bc-deposit');

			var v = parseInt(el.value, 10);
			var r = []; 

			if (this.check(v) == false) {
				this.showError();
				return false;
			}
			
			el.value = v;

			var urok1 = this.getUrok(v, 'urok1');
			var urok2 = this.getUrok(v+urok1, 'urok2');
			var urok3 = (t > 2) ? this.getUrok(v+urok1+urok2, 'urok3') : 0;
			var urok4 = (t > 3) ? this.getUrok(v+urok1+urok2+urok3, 'urok4') : 0;
			var bonus = this.getBonus(v, t);
			
			var res = v + urok1 + urok2 + urok3 + urok4 + bonus;

			r['result'] = to2(res);
			r['urok'] = to2(urok1 + urok2 + urok3 + urok4);
			r['bonus'] = to2(bonus);

			this.showResult(r, t);
			

			return false;
		}
	
})();