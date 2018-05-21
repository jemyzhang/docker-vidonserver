var g_index;

var indexControl = function() {
	g_index = this;
}; 

indexControl.prototype = {
	indexDatas:{},
	indexStaticDatas:{},
	domPosition: null,

	init: function(domPosition) {
		g_objsSwitchLanguage.push( this );
		var _this = this;

		this.domPosition = domPosition;

		function getNewAddHeight(){
			var fullWidth=$("#pl_layer0").width();
			var boxWidth=180;
			var boxheight=300;
			var size=parseInt(fullWidth/boxWidth);
			var height=Math.ceil(_this.indexDatas.recentlyAddedVideos.length/size)*boxheight;
			return height+"px";	
		};	
		
		$("#pl_layer0 .newaddbtn").live("click",function(){
			$(this).toggleClass("unfold");
			if($("#pl_layer0 .newaddbtn").hasClass("unfold")){
				$(this).parents(".newaddblocklayer").find(".newaddblockinner").animate({ 
					overflow:"auto",
					height: getNewAddHeight()
  				}, 1000 );
			}
			else{
				$(this).parents(".newaddblocklayer").find(".newaddblockinner").animate({ 
					overflow:"hidden",
					height: "300px"
  				}, 1000 );
			}
		});

		$(".newviewbtn").live("click", function() {
			g_coreHomePage.issueRawHistoryData(g_coreHomePage.rawHistoryMedias, function() {
				$(".content_layer6").show();
				g_loginhistory.switchLanguage();
				g_loginhistory.domPos.setTemplateURL("../template/loginhistory.tpl?" + AppVersion);
				g_loginhistory.domPos.setParam("loginHistoryStaticDatas", g_loginhistory.loginHistoryStaticDatas );
				g_loginhistory.domPos.processTemplate(g_coreHomePage.historyMedias);
			});
		});

		$(".click_movieset_inmainpage .img").live( "click", function() {
			if(!$(this).parents(".box").hasClass("waitselect")){
				var strFileid = $(this).attr( "fileid" );
				if ( strFileid ) {
					g_movieControl.curMovieSetName = $(".imgname", this).attr( "title" );
					g_movieControl.curMovieSetId = Number(strFileid);
					g_movieControl.curLibIndex = g_mediaLibary.getLibIndexByLibId(Number($(this).attr("idlibrary")));
					g_movieControl.freshSetPage();
				};
			}
		});

		$(".content_layer6 .backbtn").live("click", function() {
			$(".content_layer6").hide();
			_this.freshPage();
		});
	},

	freshPage: function() {
		this.domPosition.setTemplateURL("../template/index.tpl?" + AppVersion);
		this.switchLanguage();
		this.domPosition.setParam("indexStaticDatas", this.indexStaticDatas );
		this.domPosition.processTemplate(this.indexDatas);
	},
	updatePage: function() {
 		g_index.switchLanguage();
		this.domPosition.setParam("indexStaticDatas", this.indexStaticDatas );
		this.domPosition.processTemplate(this.indexDatas);
	},

	switchLanguage:function(){
		this.indexStaticDatas={
			
			indexStaticDatas_1:$.i18n.prop('home_2'),
			indexStaticDatas_2:$.i18n.prop('home_3')
		}
	},

	freshMainPage: function() {
		var _this = this;
		var timer_id = 0;
		var recentlyAddedVideosReady = false, historyMediasReady = false;

		g_coreHomePage.getRecentlyAddedVideos(0, 30, function(data) { // only 30
			_this.indexDatas.recentlyAddedVideos = data;
			recentlyAddedVideosReady = true;
		});

		g_coreHomePage.getHistoryMedias(0, 20, function(data) { // all
			_this.indexDatas.historyMedias = data;
			historyMediasReady = true;
		});

		timer_id = setInterval(function() {
				if (recentlyAddedVideosReady && historyMediasReady) {
					_this.freshPage();
					clearInterval(timer_id);
				}
			}, 50);
	}
}