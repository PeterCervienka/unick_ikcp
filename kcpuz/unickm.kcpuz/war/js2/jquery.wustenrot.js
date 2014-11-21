
$.wustenrot = {
	
	debug: false,
	opt : {
		'tabletWidth' : 1024,
		'phoneWidth' : 740,
		'mainNavSel' : "#mainNav",
		'listMenuItem' : [],
		'crossroadSlideSpeed' : '750'
	},
	
	initFE : function() {
		var self = this;
		
		//banner rotator
		var rotator = new $.wustenrot.SliderBanner();
		rotator.initRotator();
		
		//input radio & checkbox
		$("input:radio").addClass("radio");
		$("input:text").addClass("text");
		$("input:checkbox").addClass("checkbox");
		
		//click toggler
		$(".clickToggler").bind("click", function(e) {
			e.preventDefault();
			//if is unactive, hide all toggler elements
			var isActive = $(this).hasClass("active");
			if(!isActive) {
				$(".clickToggler").each(function(e) {
					var el = $(this).attr("href");
					if($(el).length > 0) {
						$(el).hide();
						$(this).removeClass("active");
					}
				});
			}
			//toggle element
			var el = $(this).attr("href");
			if($(el).length > 0) {
				if(isActive) {
					$(el).hide();
					$(this).removeClass("active");
				} else {
					$(el).show();
					$(this).addClass("active");
				}
			}
		});
		
		//generated left menu
		this.generateLeftMenu();//generuje lave submenu
		
		//roll left menu
		$(window).scroll($.proxy(function () { 
			this.rollLeftMenu();//zabezpecuje posun (vertikalny) laveho menu
			this.scrollHighlightLeftMenu();//zabezpecuje highlight laveho submenu
		},this));
		
		//resize - responsive
		$(window).resize($.proxy(function (e) { 
			var currWidth = $(document).width();
			if(currWidth >= this.opt.phoneWidth) {//table & desktop size
				$(".hidden-phone").show();
			}
			if(currWidth < this.opt.phoneWidth) {//mobile
				//$(".hidden-phone").hide();
			}
		},this));
		
		//news rotator
		if($(".newsRotatorItem").length > 1) {
		    $.newsAlertCurrent = 0;
		    $.newsAlertCount = $(".newsRotatorItem").length;
		    self.newsRotatorNext();
		}
		
		//crossroad enable
		this.setCrossroadWrapper();
		
		//scroll to content
		if($("#bc-result table").length > 0) {//calc was sended
			this.scrollToContent("#bc-result");
		} else if(this.isMobile() && $("#middleSubpage").length > 0 && $("input[type='hidden'].noScroll").length == 0) {//subpage
			this.scrollToContent("#middleSubpage");
		}
	},
	
	setCalendar : function() {
		$(".datepicker").datepicker({ 
			showOn: "both",
			changeMonth: true,
			changeYear: true,
			buttonImage: "/images2/icon_calendar.gif",
			buttonImageOnly: true,
			yearRange: "1900:",
			dateFormat: "dd.mm.yy"
		});
	},
	destroyCalendar : function() {
		$(".datepicker").datepicker("destroy");
	},
	
	newsRotatorNext : function() {
		var self = this;
    $.newsAlertCurrent = ($.newsAlertCurrent+1) % $.newsAlertCount;
    $(".newsRotatorItem").hide();
    $(".newsRotatorItem:eq("+($.newsAlertCurrent-1)+")").show(500);
    setTimeout($.proxy(function() { self.newsRotatorNext() }, this), window.cConfig.newsRotatorTimeSecond * 1000);
	},
		
	rollLeftMenu : function() {
		if($("#leftSubpage").length > 0 && $.trim($("#leftSubpage").html())!="") {
			//$(".mmodules-right").height($("#rightRollWrapper").height());
			
			if($(window).scrollTop() > $("#subpageWrapper").position().top) {
				$("#leftSubpage").css('position','fixed');
				var menuleft_bottom = $(window).scrollTop() + $("#leftSubpage").outerHeight(true);
				var bottom_max = $("#footerWrapper").position().top;
				if(menuleft_bottom > bottom_max) {
					$("#leftSubpage").css('top',bottom_max-menuleft_bottom);
				} else {
					$("#leftSubpage").css('top','0');
				}
			} else {
				$("#leftSubpage").css('position','absolute').css('top','0');
			}
			
			
		}
	},
	
	generateLeftMenu : function() {
		if($("#leftSubpage .leftMenu li a.active").length > 0) {
			var container = $("#leftSubpage .leftMenu li a.active").last().parent();
			var list = [];
			var i = 0;
			$("h1[title],h2[title],h3[title],h4[title],h5[title]").each(function() {
				i++;
				var title = $(this).attr("title");
				var id = "generatedHeader-"+i;
				var top = $(this).offset().top - 40;//tolerance
				$(this).attr("id",id);
				list.push({title: title, id: id, top: top});
			});
			if($(list).length > 0) {
				var ul = $("<ul>").addClass("generatedMenu");
				$(list).each(function(k,item) {
				    var a = $("<a>").attr("title",item.title).attr("href","#"+item.id).html(item.title).bind("click",function(e) {
							e.preventDefault();
							$.wustenrot.scrollToContent("#"+item.id);
						});
				    var li = $("<li>").append(a);
				    ul.append(li);
				});
				container.append(ul);
				this.opt.listMenuItem = list;
			}
		}
	},
	
	scrollHighlightLeftMenu : function() {
		if($(this.opt.listMenuItem).length > 0) {
			var top = $(window).scrollTop();
			var curr = null;
			$(this.opt.listMenuItem).each(function(k,item) {
				if(top > item.top) {
					if(curr == null || curr.top < item.top) curr = item;
				}
			});
			$("#leftSubpage .leftMenu li ul.generatedMenu li a.active").removeClass("active");
			if(curr != null) {
				$("a[href='#"+curr.id+"']").addClass("active");
			}
		}
	},
	
	scrollToContent : function(contentSel) {
		if(typeof contentSel === 'undefined') contentSel = "#mainWrapper";
		var content = $(contentSel);
		if($(content).length > 0) {
			$.scrollTo($(content).get(0));
		}
	},
	
	trackPage : function(url) {
		try {
			_gaq.push([ '_trackPageview', url ]);
		} catch (e) {
		}
	},
	
	setCrossroadWrapper : function() {
		var self = this;
		$(".semanticCrossroadWrapper").each(function() {
			var el = this;
			$(el).find(".semanticCrossroadNavig, .semanticCrossroadHeader").bind("click", function(e) {
				e.preventDefault();
				var isActive = $(el).find(".semanticCrossroadNavig a").hasClass("active");
				$(el).find(".semanticCrossroadNavig a").toggleClass("active");
				if(isActive) {
					$(el).find(".semanticCrossroadImage, .semanticCrossroadHtml").slideUp(self.opt.crossroadSlideSpeed);
				} else {
					$(el).find(".semanticCrossroadImage, .semanticCrossroadHtml").slideDown(self.opt.crossroadSlideSpeed);
				}
			});
		});
	},
	
	isMobile : function() {//detekujeme iba na zaklade sirky obrazovky
		return ($(document).width() < this.opt.phoneWidth);
	}
	
	
};


//banner slider
$.wustenrot.SliderBanner = function(opts) {
	this.opt = $.extend(this.opt,{
		"sb_selContainer" :  "",
		"sb_selTabs" :  ".slideTabs",
		"sb_selSlides" :  ".slides",
		"sb_selSlide" :  ".slide",
		"sb_classNameSlide" :  "slide",
		"sb_current" :  "current",
		"sb_slideInterval" :  10,//in second
		"sb_showMaxBanners" : -1,
		//"sb_json_url" : "/banner.js",//required
		"sb_json_param" : {}
	}, opts);
	
	this.tabsEl = $(this.opt.sb_selContainer+" "+this.opt.sb_selTabs);
	this.jsonUrl = this.opt.sb_json_url;
	this.jsonParam = this.opt.sb_json_param;
	this.slidesContainerEl = $(this.opt.sb_selContainer+" "+this.opt.sb_selSlides);
};

$.wustenrot.SliderBanner.prototype.initRotator = function() {
	var self = this;
	var b_autoplay = (self.opt.sb_slideInterval > 0) ? true : false;
	this.tabsEl.tabs(self.opt.sb_selSlides+" > "+self.opt.sb_selSlide, {
	    effect: 'fade',
	    fadeOutSpeed: "slow",
	    rotate: true,
	    current : self.opt.sb_current
	}).slideshow({
		clickable : false,
		autoplay: b_autoplay,
		interval: (self.opt.sb_slideInterval * 1000)//in milisecond
	});
};

$.wustenrot.SliderBanner.prototype.parseImages = function(images) {
	var self = this;
	var i = 0;
	$(images).each(function(i, item) {
		if(item.src) 
		{
			i++;
			//limit banners
			if((self.opt.sb_showMaxBanners >= 0) && (i > self.opt.sb_showMaxBanners)) {
				return;
			}
			
			//slide element
			var itemEl = $("<div>").addClass(self.opt.sb_classNameSlide).attr("id","cqc-bannerone-"+i);
			if(i==1) itemEl.addClass("firstSlide");
			if(item.mimeType=='application/x-shockwave-flash') {
				var objectEl = $("<object>").attr("type",item.mimeType).attr("data",item.src).attr("width",759).attr("height",257);
				objectEl.append($("<param>").attr("name","movie").attr("value",item.src));
				objectEl.append($("<param>").attr("name","wmode").attr("value","transparent"));
				itemEl.append(objectEl);
				
			} else {
				var imgEl = $("<img>").attr("src",item.src).attr("alt",item.title);
				itemEl.append(imgEl);
				if(item.url) {
					var aEl = $("<a>").attr("href",item.url);
					if(item.target) {
						aEl.attr("target",item.target);
					}
					itemEl.find("img").wrap(aEl);
				}
			}
			self.slidesContainerEl.append(itemEl);
			
			
			//tab element
			var navEl = $("<li>").append($("<a>").attr("href","#cqc-bannerone-"+i).append("&nbsp;"));
			self.tabsEl.append(navEl);
			
		}
	});
	
	//if only one item disable navigation
	if($(images).length==1) self.tabsEl.hide();
	
	return true;
};	

$.wustenrot.SliderBanner.prototype.loadJson = function() {
	
	var self = this;
	
	$.ajax({
		type: "GET",
		cache: false,
		async : true,
		url: self.jsonUrl,
		data: self.jsonParam,
		success: function(data) {
			if(data)
			{
				var images = $($.parseJSON(data));
				if (images.length > 0 && self.parseImages(images)) {
					if(images.length > 1) {
						self.initRotator();
					}
				}
			}
		}
	});
};


/*****
 * other
 */
 ($.scrollTo != undefined && (typeof($.scrollTo) == 'function')) || ($.scrollTo = function(el,offset) {
		if(offset == undefined) offset = 0;
		$('html, body').animate({
			scrollTop: $(el).offset().top + offset
		 }, 1000);
	});
