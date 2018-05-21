var g_languageType = null;
var g_i18nType = null;
var g_media_type_invalid	= 0;
var g_media_type_commercial = 1;
var g_media_type_personal 	= 2;
var g_media_type_addon 		= 3;
var g_objsSwitchLanguage = [];

var g_getMediaRange = 30;
var console=console||{log:function(){return;}}
$(function() {
	/*
	loadHtml();

	new CoreServerSetting();
	g_coreSettings.getSystemSettings();
	g_coreSettings.startCheckUpgradeState();

	new MediaLibary;
	new CustomLibary;
	new ScrollBarControl;
	new ScraperControl;	

	var languageType = getCookie("languageType");
	if ( languageType != null ) {
		g_languageType = languageType;
		loadProperties(languageType);
		translateHtml();
	}else{
		loadProperties( "en" );
	}

	loadTemplate();

	g_mediaLibary.getLibraryDatas();
	g_commonPopDialog.hideBottomTip();

	getServerLanguage();
	*/

	//g_siderBar.selectLibrary( 0 );

	//var settings = new SettingService();
	//var settings = new SettingService();
	//下拉菜单
		$(".input_dropdown").live("click",function() {
			var dropdown=$(this).parents(".dropdown");
			var ul=$(this).parents(".dropdown").children("ul");
			if (dropdown.hasClass("disable")) {
				ul.hide();

			} else {
				if (ul.css("display") == "none") {
					ul.slideDown("fast");
				} else {
					ul.slideUp("fast");
				}
			}
		})
		$(".dropdown .jt").live("click",function() {
			var dropdown=$(this).parents(".dropdown");
			var ul=$(this).parents(".dropdown").children("ul");
			if (dropdown.hasClass("disable")) {
				ul.hide();
			} else {
				if (ul.css("display") == "none") {
					ul.slideDown("fast");
				} else {
					ul.slideUp("fast");
				}
			}
		})
		$(".dropdown li").live("click",function() {
			var input_dropdown = $(this).parents(".dropdown").find(".input_dropdown");
			var ul=$(this).parents(".dropdown").children("ul");
			var txt = $(this).text();
			var cusvalue = $(this).attr("cus_value");
			if (input_dropdown.hasClass("input")) {
				input_dropdown.val(txt);
				input_dropdown.attr("cus_value", cusvalue);
			} else {
				input_dropdown.find(".font").text(txt);
				input_dropdown.attr("cus_value", cusvalue);
			}
			$(this).addClass("selected").siblings().removeClass("selected");
			ul.hide();
		})
		$(".dropdown").live("mouseleave",function() {

				$(this).children("ul").hide();
		});
		//checkbox
		$(".checkbox").live("click",function(){
			$(this).toggleClass("selected");
		})
		//获取焦点
		$("input").live("focus",function(){
			$(this).addClass("focus");
		})
		$("input").live("blur",function(){
			$(this).removeClass("focus");
		})

		//评分
		var ratingNum = $(".rating .ratingnum").text();
		var ratingPercent = ratingNum / 5 * 100;
		$(".rating .ratingvalue").css({
			'width': ratingPercent + '%'
		});

		$("#header .setting").click(function() {
			showdiv(".popsetup", 1);
		})

		//设置
		
			//自动升级
		$("#autoUpdate .checkbox").click(function() {

				$(".autoupgrade").toggleClass("disable");
				$(".autoupgrade .dropdown").toggleClass("disable");
			})
			//按钮有灰色变亮
		$("#selectedMedia a").click(function() {
			$("#setUp3btn").removeClass("btn-disable").addClass("btn-blue");
		})
		$("#btnAddLibPathOK").click(function() {
			$("#btnWzdOK").removeClass("btn-disable").addClass("btn-blue");
		})
		
		// default is no hasMess
		$("#btnMessages").removeClass("hasMess");
		$("#btnMessages").click(function(){
			//添加要执行的函数
			showErrorLog();

			if($(this).hasClass("hasMess")){
				$(this).removeClass("hasMess");
			}
		})
		//返回顶部
		$(".backtotop").click(function(){
			$(".content_layer1 .scrollbar_movie").mCustomScrollbar("scrollTo","top");
			$(".content_layer0 .scrollbar_movie").mCustomScrollbar("scrollTo","top");
		})
		//演员列表切换
		var re;
		$(window).resize(function(){
			clearTimeout(re);
    		re = setTimeout(isShowStarsJt,100); 
		})
		$(".js-starsblockinner .jt").live("click",function(){

			var starsblockinner=$(".js-starsblockinner");
			if($(this).hasClass("fold")){
				$(this).removeClass("fold");
				starsblockinner.animate({
				height: "120px",
    				overflow:"auto"
  					}, 500);
			}
			else{
				$(this).addClass("fold");
				starsblockinner.animate({
    				height: getStarsBlockHeight(),
    				overflow:"auto"
  					}, 500);
			}
		})
		
})
function isShowStarsJt(){
	var fullWidth=$(".js-starsblockinner").width();
	var boxWidth=240;
	var boxheight=120;
	var size=parseInt(fullWidth/boxWidth);
	var jt=$(".js-starsblockinner .jt");
	if($(".js-starsblockinner .starsblock").length/size>1){
		jt.show();
		if(jt.hasClass("fold")){
			$(".js-starsblockinner").css("height",getStarsBlockHeight);
		}
		else{
			$(".js-starsblockinner").css("height","120px");
		}
	}
	else{
		
		$(".js-starsblockinner .jt").hide();
	}
}
function getStarsBlockHeight(){
		var fullWidth=$(".js-starsblockinner").width();
		var boxWidth=240;
		var boxheight=120;
		var size=parseInt(fullWidth/boxWidth);
		var height=Math.ceil($(".js-starsblockinner .starsblock").length/size)*boxheight;
		console.log(fullWidth);
		console.log(size);
		return height+"px";	
}

function JsonObject() {}

function showdiv(elem, index) {
	if (index == 1) {
		$(elem).before("<div class='tckuanglayer'></div>");
	}
	if (index == 2) {
		$(elem).before("<div class='tckuanglayer2'></div>");
	}
	if (index == 3) {
		$(elem).before("<div class='tckuanglayer3'></div>");
	}
	if (index == 4) {
		$(elem).before("<div class='tckuanglayer4'></div>");
	}
	if (index == 5) {
		$(elem).before("<div class='tckuanglayer5'></div>");
	}
	
	$("body", "html").css({
		height: "100%",
		width: "100%"
	});
	//$("html").css("overflow", "hidden");
	//$("body").css("overflow", "hidden");
	if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
		if((($(window).height() - $(elem).height()) / 2 + $(window).scrollTop())<20){
			$(elem).css("top","20px");
		}
		else{
			$(elem).css("top", ($(window).height() - $(elem).height()) / 2 + $(window).scrollTop() + "px");
		}
	} else {
		if((($(window).height() - $(elem).height()) / 2 + $(window).scrollTop())<20){
			$(elem).css("top","20px");
		}
		else{
			$(elem).css("top", ($(window).height() - $(elem).height()) / 2 + $(window).scrollTop() + "px");
		}
	}
	$(elem).css("left", ($(window).width() - $(elem).width()) / 2 + "px");
	$(elem).fadeIn("slow");
	$(window).resize(function() {
		if((($(window).height() - $(elem).height()) / 2 + $(window).scrollTop())<20){
			$(elem).css("top","20px");
		}
		else{
			$(elem).css("top", ($(window).height() - $(elem).height()) / 2 + $(window).scrollTop() + "px");
		}
		$(elem).css("left", ($(window).width() - $(elem).width()) / 2 + "px");
	});
}
function showfullscreen(elem,index) {
	if(index==10){
		$(elem).before("<div class='tckuanglayerfullscreen'></div>");
	}
	else{
		$(elem).before("<div class='tckuanglayer'></div>");
	}
	
	$("body", "html").css({
		height: "100%",
		width: "100%"
	});
	$(elem).css("top","0px");	
	$(elem).css("left", "0px");
	$(elem).fadeIn("slow");
}

function PopupAlert (info) {
	var text = '';
	if (!!!info) {
		text = $.i18n.prop('index_34');
	} else if (info == "Access is denied") {
		text = $.i18n.prop('error_1');
	} else if (info == "Unknown user name or bad password") {
		text = $.i18n.prop('error_2');
	} else if (info == "The network path was not found") {
		text = $.i18n.prop('error_3');
	} else if (info == "Bad password") {
		text = $.i18n.prop('error_4');
	} else if (info == "Multi connects by different username") {
		text = $.i18n.prop('error_5');
	} else if (info == "The local path Access is denied") {
		text = $.i18n.prop('error_6');
	} else if (info == "The nfs path Access is denied") {
		text = $.i18n.prop('error_7');
	} else {
		text = $.i18n.prop('index_34');
	}

    g_commonPopDialog.showSave(text);
    setTimeout(function(){close_box('.confirmSave',5);},2500);			
}


function loadHtml() {
	$.ajaxSetup({
		async: false //取消异步  
	});
	$(".addhtml").each(function() {
		var _this = $(this);
		var html = $(this).attr("url");
		$.get(html,
			function(data) {
				_this.append(data);
			});
	})

	$.ajaxSetup({
		async: true //取消异步  
	});
}

function loadTemplate(){
	$(".addTemplate").each(function() {
		var tplName = $(this).attr("tpl_name");
		if ( tplName ) {
			var creatFunc = eval(tplName);
			var tmp_Obj = new creatFunc;
			tmp_Obj.init( $(this) ) ;
		};
		
	})
}
function loadOneTemplate(elem){
	
		var tplName = elem.attr("tpl_name");
		if ( tplName ) {
			var creatFunc = eval(tplName);
			var tmp_Obj = new creatFunc;
			tmp_Obj.init( elem ) ;
		};

}

function translateHtml() {
	$("[trans_value]").each(function() {
		var _this = $(this);
		var originStr = $(this).attr("trans_value");
		originStr = $.i18n.prop(originStr);
		_this.html(originStr);
	})

	$("[trans_in_value]").each(function() {
		var _this = $(this);
		var originStr = $(this).attr("trans_in_value");
		originStr = $.i18n.prop(originStr);
		_this.attr("value", originStr);
	})

	$("[trans_title]").each(function() {
		var _this = $(this);
		var originStr = $(this).attr("trans_title");
		originStr = $.i18n.prop(originStr);
		_this.attr("title", originStr);
	})

	$("[trans_href]").each(function() {
		var _this = $(this);
		var originStr = $(this).attr("trans_href");
		originStr = $.i18n.prop(originStr);
		_this.attr("href", originStr);
	})
}

function close_box(elm, index) {
	if (index == 1) {
		$(".tckuanglayer").remove();
	}
	if (index == 2) {
		$(".tckuanglayer2").remove();
	}
	if (index == 3) {
		$(".tckuanglayer3").remove();
	}
	if (index == 4) {
		$(".tckuanglayer4").remove();
	}
	if (index == 5) {
		$(".tckuanglayer5").remove();
	}
	if (index == 10) {
		$(".tckuanglayerfullscreen").remove();
	}			
	$(elm).hide();
	$("html").css("overflow", "auto");
	$("body").css("overflow", "auto");
}

function loadProperties( languageType, callbackFunc ) {
	if ( g_i18nType != languageType ) {
		jQuery.i18n.properties({
			name: 'strings',
			path: 'i18n/',
			mode: 'map',
			language: languageType,
			callback: function() {
				if ( callbackFunc ) {
					callbackFunc();
				}
			}
		});
	}

	g_i18nType = languageType;
}

function getServerLanguage(callbackFunc) {
	vidonme.rpc.request({
		'context': this,
		'method': 'VidOnMe.GetSystemSetting',
		'params': {
			"key": "language.default"
		},
		'success': function(data) {
			if (data && data.result) {
				changeLanguage( data.result.val );
				getLanguage( data.result.val );
				if ( callbackFunc ) {
					callbackFunc();
				}
			} else{
				callbackFunc();
			}
		}
	});
}
var headerlangs="";
var currentLanguage="";
function getLanguage( language ) {
	if ( language == "Chinese (Simple)") {
		$(".headertips").addClass("show");
		headerlangs=true;
	}
		else{
			headerlangs=false;
		$(".headertips").removeClass("show");
		}
}
function changeLanguage( language ) {
	var locale = g_languageType;

	if ( language == "Chinese (Simple)") {
		locale = "zh-cn";
		currentLanguage="zh_CN";
		dynamicLoading.css("../css/global_zh.css");
	} else if ( language == "Chinese (Traditional)") {
		locale = "zh-tw";
		currentLanguage="zh_tw";
		dynamicLoading.css("../css/global_zh.css");
	} else if ( language == "German") {
		locale = "de";
		currentLanguage="de";
		dynamicLoading.css("../css/global_de.css");
	} else if ( language == "French") {
		locale = "fr";
		currentLanguage="fr";
		dynamicLoading.css("../css/global_fr.css");
	} else if ( language == "Japanese") {
		locale = "jp";
		currentLanguage="jp";
		dynamicLoading.css("../css/global_ja.css");
	} else if ( language == "Portuguese (Brazil)") {
		locale = "pt";
		currentLanguage="en_US";
		dynamicLoading.css("../css/global_pt.css");
	} else if ( language == "Spanish" || language == "Spanish (Mexico)") {
		locale = "es";
		currentLanguage="es";
		dynamicLoading.css("../css/global_es.css");
	} else if ( language == "Korean") {
		locale = "kr";
		currentLanguage="en_US";
		dynamicLoading.css("../css/global_ko.css");
	} else if ( language == "Swedish") {
		locale = "se";
		currentLanguage="en_US";
		dynamicLoading.css("../css/global_se.css");
	} else if ( language == "Thailand") {
		locale = "th";
		currentLanguage="en_US";
		dynamicLoading.css("../css/global_th.css");
	} else if ( language == "English" || language == "") {
		locale = "en";
		currentLanguage="en_US";
	}
	

	if (g_languageType != locale) {
		g_languageType = locale;
		setCookie("languageType", locale, 30);
		loadProperties( locale, function(){
			switchUILanguage();
		} );
	};
}

function switchUILanguage() {
	for (var i = 0; i < g_objsSwitchLanguage.length; i++) {
		var tempObj = g_objsSwitchLanguage[i];

		if (tempObj.updatePage) {
			tempObj.updatePage();
		};
	};
}

function findOtherVideos(obj) {
	var vtype = obj.attributes.vtype.value;
	var value = obj.textContent != "" ? obj.textContent : obj.attributes.vname.value;

	g_sortandfilter.getAllMediaDatasByType(vtype, value, 0, 20, function(data) {
		g_searchresult.dataProc(data);
	});
}

function formatTime(s) {
	var time = '00:00:00';
	
	if (!!s && s >= 0) {
		var h = parseInt(s / 3600);
		var hours = h.toString();
		if (hours.length == 1) {
			hours = "0" + hours;
		}

		var m = parseInt((s - hours * 3600) / 60);
		var minutes = m.toString();
		if (minutes.length == 1) {
			minutes = "0" + minutes;
		}

		var sec = (s - hours * 3600) % 60;
		var seconds = sec.toString();
		if (seconds.length == 1) {
			seconds = "0" + seconds;
		}

		time = hours + ":" + minutes + ":" + seconds;
	}

	return time;
}

String.prototype.format = function() {
	if (arguments.length == 0) return this;
	for (var s = this, i = 0; i < arguments.length; i++)
		s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
	return s;
};

function showFunctionGuidePage() {
	var bShowGuide = getCookie("functionguide");

	if ( bShowGuide == "false" ) {

	} else {
		introJs().start();
		setCookie("functionguide", "false", 365);
	}
}

//动态添加css文件
var dynamicLoading = {
    css: function(path){
		if(!path || path.length === 0){
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.href = path;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        head.appendChild(link);
    }
};
//ÆÀ·Ö
var ratingNum = $(".rating .ratingnum").text();
var ratingPercent = ratingNum / 5 * 100;
$(".rating .ratingvalue").css({
	'width': ratingPercent + '%'
});

//多行文本行自适应高度
$.fn.extend({
    textareaAutosize_dc:function(){
       var domSelf = this;
       var autoSizeFn=function(domSelf){
           this.domSelf=domSelf;
       }
        autoSizeFn.prototype={
            autosize:function(){
                var fontsize = $(this).css("font-size").replace("px","");//文字大小
                var fontrowcount = ($(this).width()/fontsize);//每行文字个数
                var textArray = $(this).val().split("\n");               
                var currentEnterCount=textArray.length;//获取行数
                $(textArray).each(function(){
                    //检查每行文字量是否超过行容量 如果超过 贼需要加行, 超几行加几行
                   if(this.length>fontrowcount){
                       currentEnterCount+=this.length/fontrowcount;
                   }
                });
                var lineHeight=Number($(this).css("line-height").replace("px",""));
                $(this).height( lineHeight*(currentEnterCount+1));
            },addEvent:function(){
                //注册事件监听
                var self=this;
                 $(this.domSelf).on("keyup",function(e){
                        self.autosize.call(this);
                 });
            },initHeight:function(){
                var self=this;
                //初始化所有高度
                $(this.domSelf).each(function(){
                     self.autosize.call(this);
                 });
            }
            ,init:function(){
                this.addEvent();
                this.initHeight();
            }
        }
       new autoSizeFn(domSelf).init();
    }
});

function showHomePage(bShow) {
	if (bShow) {
		$(".content_layer0").css("display", "block");
		$(".content_layer1").css("display", "none");
		$(".content_layer2").css("display", "none");
		$(".content_layer3").css("display", "none");
		$(".content_layer4").css("display", "none");
		$(".content_layer5").css("display", "none");
		$(".content_layer6").css("display", "none");

		$("#siderbar .libraryblock h3").removeClass( "selected" );
	} else {
		$(".content_layer0").css("display", "none");
	}
}

function isIE() {
	if (Object.hasOwnProperty.call(window, "ActiveXObject") && !window.ActiveXObject) {
		return true;
	}
	return false;
}