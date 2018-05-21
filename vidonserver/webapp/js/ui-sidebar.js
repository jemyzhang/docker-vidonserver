var g_siderBar;

var siderBar = function() {
	g_siderBar = this;
};

siderBar.prototype = {
	divPosition: null,
	data: [],
	siderBarData: {},
	freshState: 1, // 0: freshing; 1. nomal
	curSelectType: -1,// 0: movie; 1: tvshow; 2: video; 3: photo; 4: channel
	curSelectLibIndex: -1,
	curSelectLibId: -1,
	siderBarStaticDatas:{},
	haveNewLog: false,

	init: function(domPosition) {
		g_objsSwitchLanguage.push( this );

		var _this = this;

		this.divPosition = domPosition;
		this.divPosition.setTemplateURL("../template/siderbar.tpl?" + AppVersion);
		this.divPosition.setParam("msgState", this.haveNewLog );
		this.switchLanguage();

		$(".libraryClick").find("dd").live("click", function() {
			$("#siderbar .libraryblock h3").removeClass( "selected" );

			g_siderBar.showTopbar(false);
			g_photoControl.siderClickEvent();
			//_this.clickevent($(this))
		});
		$("#siderbar .siderbarbtn a").live( "click", function(){_this.clickbotevent($(this))});
		$("#siderbar .siderbarbtn2 a").live( "click", function(){_this.clickbotevent($(this))});

		//²à±ßÀ¸ÊÕËõ
		$("#siderbar .libraryblock h3").live("click",  function() {
			var strLibId = $(this).find("span").attr("libid");
			if (strLibId) {
				var libIndex = g_siderBar.getLibIndexById( Number(strLibId) );

				if ( libIndex > -1 ) {
					g_siderBar.clickSelectLibrary( libIndex );
				}
			};
		});

		$("#fresh").live("click", function() {
			var libId = Number( $(this).attr("libid") );
			var libIndex = g_siderBar.getLibIndexById( libId );
			g_siderBar.clickFresh( libIndex );
		});

		$(".addlibrary").live("click", function() {
			g_addLibrary.clickAddLibrary();
		});
		
		$(".sidermenubtn_enter").live("click", function() {
			$(".siderbarblock").clearQueue().animate({
				left: '0px'
			})
		});

		$(".siderbarblock_leave").live("mouseleave", function() {
			$(".siderbarblock").clearQueue().animate({
				left: '-200px'
			})
		});

		$(".click_editlibphoto").live("click", function(){
			g_media_type_active = g_media_type_personal;
			g_addLibrary.clickEditLibrary(2, g_media_type_personal);
		});

		$(".click_editlibchannel").live("click", function(){
			g_media_type_active = g_media_type_addon;
			$("#channelPath").text("");
			showdiv('.addonChannel',2);
		});


	},

	getLibIndexById: function(libId) {
		var libraryDatas = g_mediaLibary.libraryDatas;
		for (var i = 0; i < libraryDatas.length; i++) {	
			var libaryData = libraryDatas[i];
			if ( libaryData.id == libId ) {
				return i;
			}
		}

		return -1;
	},

	freshSiderbar: function() {
		this.freshSiderBarData();

		if ( this.curSelectLibIndex > -1
		&& this.curSelectLibIndex < this.siderBarData.length ) {
			this.clickSelectLibrary( this.curSelectLibIndex );
			g_scraperControl.startScraper( this.curSelectLibIndex );
		} else {
			showHomePage( true );
		}

		this.divPosition.setParam( "FreshState", this.freshState );
		this.divPosition.processTemplate(this.siderBarData);
		$(".userdefined_scrollbar").mCustomScrollbar();
	},

	freshSiderBarData: function() {
		var libraryDatas = g_mediaLibary.libraryDatas;

		this.siderBarData.libaryData = [];
		this.siderBarData.hidesiderbar = false;//是否隐藏菜单
		for (var i = 0; i < libraryDatas.length; i++) {
			var libaryData = libraryDatas[i];

			var tempLibraryData = {};
			tempLibraryData.id = libaryData.id;
			tempLibraryData.name = libaryData.name;
			
			tempLibraryData.isCustom = libaryData.isCustom;
			tempLibraryData.isAutoClass = libaryData.isAutoClass

			if (libaryData.isAutoClass) {
				tempLibraryData.subLibaryData = [{
					iconclass: 'movies',
					id: 'movie',
					subid: 'siderbar_moive',
					title: $.i18n.prop('index_38'),
					selectclass: ''
				}, {
					iconclass: 'tvshows',
					id: 'teleplay',
					subid: 'siderbar_teleplay',
					title: $.i18n.prop('index_39'),
					selectclass: ''
				}, {
					iconclass: 'video',
					id: 'home_video',
					subid: 'siderbar_home_video',
					title: $.i18n.prop('index_40'),
					selectclass: ''
				}];
			}

			if (libaryData.isCustom) {
				this.siderBarData.libaryData.push(tempLibraryData);
			} else {
				// insert data to array begin.
				this.siderBarData.libaryData.unshift(tempLibraryData);
			}
		}

		this.siderBarData.photoData = {
			iconclass: 'photo',
			id: 'images',
			subid: 'siderbar_images',
			title: $.i18n.prop('index_41'),
			selectclass: ''
		};

		this.siderBarData.channelData = {
			iconclass: 'channel',
			id: 'channel',
			subid: 'siderbar_channel',
			title: $.i18n.prop('index_191'),
			selectclass: ''
		};

	},

	freshCount: function() {
		var libraryDatas = g_mediaLibary.libraryDatas;

		for (var i = 0; i < libraryDatas.length; i++) {
			var libaryData = libraryDatas[i];
			var isAutoClass = libaryData.isAutoClass;

			if (isAutoClass) {
				if (libaryData.movieCountNew != -1) {
					var strTitle = $.i18n.prop('index_38')
					strTitle = strTitle + " (" + libaryData.movieCountNew + ")";
					this.siderBarData.libaryData[i].subLibaryData[0].title = strTitle;
					//alert(libaryData.id);
					$(".libraryblock").eq(i).find(".libraryClick dd").eq(0).find("span").text(strTitle);
				};

				if (libaryData.tvshowCountNew != -1) {
					var strTitle = $.i18n.prop('index_39')
					strTitle = strTitle + " (" + libaryData.tvshowCountNew + ")";
					this.siderBarData.libaryData[i].subLibaryData[1].title = strTitle;
					$(".libraryblock").eq(i).find(".libraryClick dd").eq(1).find("span").text(strTitle);
				};

				if (libaryData.videoCountNew != -1) {
					var strTitle = $.i18n.prop('index_40')
					strTitle = strTitle + " (" + libaryData.videoCountNew + ")";
					this.siderBarData.libaryData[i].subLibaryData[2].title = strTitle;
					$(".libraryblock").eq(i).find(".libraryClick dd").eq(2).find("span").text(strTitle);
				};
			}
		}

		if (g_mediaLibary.photoCount != -1) {
			var strTitle = $.i18n.prop('index_41')
			strTitle = strTitle + " (" + g_mediaLibary.photoCount + ")";
			this.siderBarData.photoData.title = strTitle;
		};

		if (g_mediaLibary.channelCount != -1) {
			var strTitle = $.i18n.prop('index_191')
			strTitle = strTitle + " (" + g_mediaLibary.channelCount + ")";
			this.siderBarData.channelData.title = strTitle;
		};

		//this.divPosition.setParam( "FreshState", this.freshState );
		//this.divPosition.processTemplate(this.siderBarData);

		$(".userdefined_scrollbar").mCustomScrollbar();
	},

	freshCurPageData: function() {
		var curSelectType = this.curSelectType;

		if (curSelectType == 3) {
			g_photoControl.siderClickEvent();
		} else if (curSelectType == 4) {
			g_channelControl.siderClickEvent();
		} else {
			var libIndex = this.curSelectLibIndex;

			if (libIndex != -1) {
				var isAutoClass = this.siderBarData.libaryData[libIndex].isAutoClass;
				if (isAutoClass) {
					var curSelectType = this.siderBarData.libaryData[libIndex].curSelectType;
					this.curSelectType = curSelectType;

					if (curSelectType == 0) {
						g_movieControl.siderClickEvent(libIndex);
					} else if (curSelectType == 1) {
						g_tvshowControl.siderClickEvent(libIndex);
					} else if (curSelectType == 2) {
						g_video.siderClickEvent(libIndex);
					} else if (curSelectType == 3) {
						//g_photoControl.siderClickEvent();
					} else if (curSelectType == 4) {
						//g_channelControl.siderClickEvent();
					} else {
						this.curSelectType = 0;
						g_movieControl.siderClickEvent(libIndex);

						this.siderBarData.libaryData[libIndex].curSelectType = 0;
						this.siderBarData.libaryData[libIndex].subLibaryData[0].selectclass = '';
						this.siderBarData.libaryData[libIndex].subLibaryData[1].selectclass = '';
						this.siderBarData.libaryData[libIndex].subLibaryData[2].selectclass = '';
						this.siderBarData.libaryData[libIndex].subLibaryData[this.curSelectType].selectclass = 'selected';
					}
				} else {
					g_multiMediaControl.siderClickEvent(libIndex);
				}
			}

		}

	},

	clickevent: function(elem) {
		$(".content_layer2").css("display","none");
		$(".content_layer3").css("display","none");
		$(".content_layer4").css("display","none");
		$(".content_layer5").css("display","none");
		
		// hide edit library dialog
		if ( g_moveMediaControl ) {
			g_moveMediaControl.hideControl();
		}

		this.setAutoHide( false );

		$(".libraryClick").find("dd").removeClass("selected");
		elem.addClass("selected");//.siblings().removeClass("selected");

		var curSelectType;
		if (elem.attr("id") == "movie") {
			curSelectType = 0;
		} else if (elem.attr("id") == "teleplay") {
			curSelectType = 1;
		} else if (elem.attr("id") == "home_video") {
			curSelectType = 2;
		} else if (elem.attr("id") == "images") {
			curSelectType = 3;
		} else if (elem.attr("id") == "channel") {
			curSelectType = 4;
		} else {

		}

		this.siderBarData.photoData.selectclass = '';
		this.siderBarData.channelData.selectclass = '';
		
		if (curSelectType == 3) {
			this.siderBarData.photoData.selectclass = 'selected';
		} else if (curSelectType == 4) {
			this.siderBarData.channelData.selectclass = 'selected';
		} else {
			
		};

		var libIndex = this.curSelectLibIndex;

		if (libIndex != -1) {
			elem.addClass("selected").siblings().removeClass("selected");

			this.curSelectType = curSelectType;

			var isAutoClass = this.siderBarData.libaryData[libIndex].isAutoClass;
			if (isAutoClass) {
				this.siderBarData.libaryData[libIndex].curSelectType = curSelectType;
				this.siderBarData.libaryData[libIndex].subLibaryData[0].selectclass = '';
				this.siderBarData.libaryData[libIndex].subLibaryData[1].selectclass = '';
				this.siderBarData.libaryData[libIndex].subLibaryData[2].selectclass = '';

				if (curSelectType < 3) {
					this.siderBarData.libaryData[libIndex].subLibaryData[curSelectType].selectclass = 'selected';
				}
			}
		};

		this.freshCurPageData();
	},

	setFreshState: function(libIndex, state) {
		var libDatas = this.siderBarData.libaryData;
		var index=this.curSelectLibIndex;
		var libraryRefreshBtn=$("#topnavblocktitle .libraryRefreshBtn");
		if (libIndex > -1 && libIndex < libDatas.length) {
			libDatas[libIndex].freshState = state;

			//$(".libraryRefreshBtn").each(function(index, element) {
				if (index == libIndex) {
					if (state == 0) {
						libraryRefreshBtn.addClass("loading");
						libraryRefreshBtn.attr("title", $.i18n.prop('index_158'));
					} else if (state == 1) {
						libraryRefreshBtn.removeClass("loading");
						libraryRefreshBtn.attr("title", $.i18n.prop('index_48'));
					} else {

					}
				};
			//});
		}
	},

	clickFresh: function(libIndex) {
		var libDatas = this.siderBarData.libaryData;
		if (libIndex > -1 && libIndex < libDatas.length) {
			if ( libDatas[libIndex].freshState == 0 ) {
				g_scraperControl.stopScraper();
			} else if (libDatas[libIndex].freshState == 1) {
				g_scraperControl.startScraper();
			} else {

			}
		}
	},

	selectLibrary: function(libIndex) {
		if ( libIndex > -1 ) {
			for (var i = 0; i < this.siderBarData.libaryData.length; i++) {
				  this.siderBarData.libaryData[i].isShowSub = false;
			};

			if ( g_moveMediaControl ) {
				g_moveMediaControl.hideControl();
			}

			if ( g_delMediaControl ) {
				g_delMediaControl.hideControl();
			}

			this.setAutoHide( false );

			this.siderBarData.libaryData[libIndex].isShowSub = true;

			this.curSelectLibIndex = libIndex;
			this.curSelectLibId = this.siderBarData.libaryData[libIndex].id;
			this.curSelectType = this.siderBarData.libaryData[libIndex].curSelectType;
			var isAutoClass = g_mediaLibary.libraryDatas[libIndex].isAutoClass;
 
			console.log("select library: " + this.curSelectLibId + "-" + isAutoClass);
			g_topBarControl.initMainPage( isAutoClass );
		}
	},

	clickSelectLibrary: function(libIndex) {
		if (libIndex > -1) {
			g_siderBar.showTopbar(true);

			var sort = g_topBarControl.getSortControls(libIndex);
			var sortShow = sort.sortShow;
			var filterShow = sort.filterShow;

			if (sortShow)
				g_topBarControl.showSortControls(libIndex, true);
			else
				g_topBarControl.showSortControls(libIndex, false);

			if (filterShow) {
				$("#topnavblocktitle .libraryFilterBtn").addClass('close');
				$("#topnavblocktitle .libraryFilterBtn").addClass('down');
			} else {
				$("#topnavblocktitle .libraryFilterBtn").removeClass('close');
				$("#topnavblocktitle .libraryFilterBtn").removeClass('down');
			}

			$("#siderbar .libraryblock h3").removeClass("selected");
			$("#siderbar .libraryblock h3:eq("+ libIndex + ")").addClass("selected");
			$(".photochannel dd").removeClass("selected");

			$(".content_layer0").css("display", "none");
			$(".content_layer1").css("display", "block");
			$(".content_layer6").css("display", "none");
			$(".content_layer6").css("display", "none");
			
			g_siderBar.selectLibrary( libIndex );
		}
	},

	checkIsInMainPage: function() {
		// check is in main page.
		if ( !$(".content_layer0").is(":hidden")
			|| !$(".content_layer2").is(":hidden") 
			|| !$(".content_layer3").is(":hidden") 
			|| !$(".content_layer4").is(":hidden") 
			|| !$(".content_layer5").is(":hidden") ) {
			return false;
		} else {
			return true;
		}
	},

	checkIsFreshCurPage: function(libIndex, type) {
		if (libIndex == this.curSelectLibIndex) {
			var isAutoClass = this.siderBarData.libaryData[libIndex].isAutoClass;
			if (isAutoClass) {
				if (type == this.curSelectType) {
					return true;
				} else {
					return false;
				}
			} else {
				return true;
			}
		} else {
			return false;
		}
	},

	clickbotevent: function(elem) {
		if (elem.attr("id") == "btnMessages") {
			showErrorLog();

			if ($(elem).hasClass("hasMess")) {
				$(elem).removeClass("hasMess");

				this.haveNewLog = false;
				this.divPosition.setParam("msgState", this.haveNewLog );
			}
		} else if (elem.attr("id") == "btnSetting") {
			g_setup.clickinit();
		}
		else if (elem.attr("id") == "btnFeedback"){
			g_feedback.clickinit();

		}
	},

	setMessageBtnStatu: function( haveNewMsg ) {
		if ( haveNewMsg ) {
			$("#btnMessages").addClass("hasMess");
			this.haveNewLog = true;
			this.divPosition.setParam("msgState", this.haveNewLog );
		} else {
			$("#btnMessages").removeClass("hasMess");
			this.haveNewLog = false;
			this.divPosition.setParam("msgState", this.haveNewLog );
		}
	},

	setAutoHide: function(autoHide) {
		if (this.siderBarData.hidesiderbar != autoHide) {
			var isInSearchPage = !$(".content_layer5").is(":hidden");

			if (autoHide || isInSearchPage) {
				$(".sidermenubtn").addClass("sidermenubtn_enter");
				$(".siderbarblock").addClass("hideslderbar");
				$(".siderbarblock").addClass("siderbarblock_leave");
				$(".siderbarblock").css("left",-200);

				this.siderBarData.hidesiderbar = true;
			} else {
				$(".sidermenubtn").removeClass("sidermenubtn_enter");
				$(".siderbarblock").removeClass("hideslderbar");
				$(".siderbarblock").removeClass("siderbarblock_leave");
				$(".siderbarblock").css("left",0);

				this.siderBarData.hidesiderbar = false;
			}

			/*
			this.divPosition.setParam("FreshState", this.freshState);
			this.divPosition.processTemplate(this.siderBarData);

			$(".userdefined_scrollbar").mCustomScrollbar();
			*/
		};
	},

	setButtonState: function( status ) {
		// 0 : 
	},

	switchLanguage: function() {
		this.siderBarStaticDatas = {
			siderBarStaticDatas_transfer: $.i18n.prop('transfer_1'),
			siderBarStaticDatas_merge: $.i18n.prop('merge_1'),
			siderBarStaticDatas_loading: $.i18n.prop('index_48'),
			siderBarStaticDatas_stoploading: $.i18n.prop('index_158'),
			siderBarStaticDatas_setup: $.i18n.prop('index_49'),
			siderBarStaticDatas_messages: $.i18n.prop('siderbar_title_1'),
			siderBarStaticDatas_q: $.i18n.prop('index_251'),
			addlibrary_1: $.i18n.prop('addlibrary_1'),
			guide_1: $.i18n.prop('guide_1'),
			guide_2: $.i18n.prop('guide_2'),
			guide_3: $.i18n.prop('guide_3'),
			guide_5: $.i18n.prop('guide_5')
		};
		$("#siderbar").setParam('siderBarStaticDatas', this.siderBarStaticDatas);

		if (this.siderBarData.libaryData) {
			var libraryDatas = this.siderBarData.libaryData;
			for (var i = 0; i < libraryDatas.length; i++) {
				var libaryData = libraryDatas[i];

				if (libaryData.id == 1) {
					libaryData.name = $.i18n.prop("library_2");
					break;
				}
			}

			this.siderBarData.photoData.title = $.i18n.prop('index_41');
			this.siderBarData.channelData.title = $.i18n.prop('index_191');
		}
	},

	updatePage: function() {
		this.switchLanguage();
		this.divPosition.setParam( "FreshState", this.freshState );
		this.divPosition.processTemplate(this.siderBarData);

		$(".userdefined_scrollbar").mCustomScrollbar();
	},

	showTopbar: function(bShow) {
		if ( bShow ) {
			$("#topnavblocktitle").show();
			$(".topsortbar").show();

			$(".topnavblock").show();
		} else {
			$("#topnavblocktitle").hide();
			$(".topsortbar").hide();

			for (var i = 0; i < ((!!!g_mediaLibary.libraryDatas.length) ? 0 : g_mediaLibary.libraryDatas.length); ++i) {
				g_topfilter.showFilterControl( i, false );
				g_topBarControl.showSortControls( i, false );
			}

			$(".topnavblock").hide();
		}
		
	},

	setCurSelectedType: function(type) {
		var libIndex = this.curSelectLibIndex; 
		this.curSelectType = type;
		this.siderBarData.libaryData[libIndex].curSelectType = type;
	},

	isFreshingMainPage: false,
	cacheParams: null,
	scrollbarCallback: function(startPos, endPos) {
		var params = {};
		params.libIndex = g_siderBar.curSelectLibIndex;
		params.type = g_siderBar.curSelectType;
		params.startPos = startPos;
		params.endPos = endPos;
		params.callbackFunc = function(params){
			g_siderBar.mainPageCallback(params);
		}

		if ( this.isFreshingMainPage ) {
			this.cacheParams = params;
		} else {
			this.freshMainPage( params );
		}
	},

	mainPageCallback: function(params){
		if ( this.cacheParams ) {
			if ( this.cacheParams.libIndex != params.libIndex
			|| this.cacheParams.type != params.type
			|| this.cacheParams.startPos != params.startPos
			|| this.cacheParams.endPos != params.endPos ) {
				var tempParams = {};
				tempParams.libIndex = this.cacheParams.libIndex;
				tempParams.type = this.cacheParams.type;
				tempParams.startPos = this.cacheParams.startPos;
				tempParams.endPos = this.cacheParams.endPos;
				tempParams.callbackFunc = this.cacheParams.callbackFunc;

				this.cacheParams = null;
				this.freshMainPage( tempParams );
			} else {
				this.cacheParams = null;
				this.isFreshingMainPage = false;
			}	
		} else {
			this.isFreshingMainPage = false;
		}
	},

	freshMainPage: function(params) {
		var curSelectType = params.type;
		this.isFreshingMainPage = true;

		if (curSelectType == 0) {
			g_movieControl.freshByScrollbar(params);
		} else if (curSelectType == 1) {
			g_tvshowControl.freshByScrollbar(params);
		} else if (curSelectType == 2) {
			g_video.freshByScrollbar(params);
		} else if (curSelectType == 3) {
			g_multiMediaControl.freshByScrollbar(params);
		}
	}
}