var g_header;

var headerTpl = function() {
	g_header = this;
};

headerTpl.prototype = {
	headerUserNmae:{"username":""},
	headerStaticDatas: [],

	init: function(domPosition) {
		g_objsSwitchLanguage.push( this );
		var _this=this;
		domPosition.setTemplateURL( "../template/header.tpl?" + AppVersion );
		this.switchLanguage(domPosition);
		domPosition.processTemplate(this.headerUserNmae);
		if(headerlangs){
			$(".headertips").addClass("show");
		}
		else{
		$(".headertips").removeClass("show");
		}
		$("#header a").live( "click", function(){_this.clickevent($(this))});
		$("#searchblock input").live( "focus",function(){
			$("#searchblock").addClass("getblur");
		})
		$("#searchblock input").live( "blur",function(){
			$("#searchblock").removeClass("getblur");

			if ( $("#searchblock input").val() == "" ) {
				$(".searchblock .closesearch").hide();
			}
		});
		/*
		$("#searchblock input").live("keyup", function() {
			var strForSearch = $(this).val();
			g_mediaLibary.searchItemsInLibrary(strForSearch, function() {
				obj.searchResults = g_mediaLibary.searchResults;
				// TODO: implement ui
			});
		})
		*/
		$("#searchblock .closesearch").live("click",function(){
			$("#searchblock input").val("");
			$(".searchblock .closesearch").hide();
			g_header.closeSearch();

			g_siderBar.setAutoHide( false );
		})
		
		$("#searchblock .searchimg").live("click",function(){
			g_header.clickSearch();
		})
		$("#searchblock input").keydown(function(event) {
             if (event.keyCode == "13") {//keyCode=13是回车键
                 g_header.clickSearch();
             }
             $(".searchblock .closesearch").show();
         });
	},
	clickevent: function (elem) {
		 if(elem.attr("id")=="headerlogin"){
			g_loginControl.clickinit();
		}
	},
	updatePage: function() {
 		g_header.switchLanguage();
		$("#header").setParam("headerStaticDatas",this.headerStaticDatas);
		$("#header").processTemplate(this.headerUserNmae);
	},
	switchLanguage:function(){ 
		this.headerStaticDatas = {
			title_1:"",
			title_2:$.i18n.prop('index_49'),
			title_3:$.i18n.prop('index_50'),
			guide_1:$.i18n.prop('guide_4')
		};
		$("#header").setParam("headerStaticDatas",this.headerStaticDatas);
	},
	closeSearch:function(){
		// clear search result and show media page last selected;
		g_siderBar.freshCurPageData();
		$(".content_layer5").css("display", "none");
	},

	clickSearch:function(){
		$(".content_layer2").css("display","none");
		$(".content_layer3").css("display","none");
		$(".content_layer4").css("display","none");

		g_searchresult.clickinit();
	}

}
