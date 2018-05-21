var g_topBarControl;

var TopBarControl = function() {
	g_topBarControl = this;
}; 

TopBarControl.prototype = {
	curSelectedType: "all", //0: all media; 1: movie; 2: tvshow; 3: video
	sortDatas: [{
			method: "title",
			title: $.i18n.prop('sort_2'),
			order: "",
			selected: true
		}, {
			method: "dateadded",
			title: $.i18n.prop('sort_4'),
			order: "",
			selected: false
		}, {
			method: "modifiedtime",
			title: $.i18n.prop('sort_7'),
			order: "",
			selected: false
		}, {
			method: "rating",
			title: $.i18n.prop('sort_3'),
			order: "",
			selected: false
		}
		/*{
			method: "date",
			title: "日期",
			order: "",
			selected: true
		},
		 {
			method: "label",
			title: "标签",
			order: "",
			selected: false
		},*/
	],
	topBarStaticDatas:{},
	sortfilterInfo: [],

	init: function(domPosition) {
		this.switchLanguage();
		$(".topbtnblock").setTemplateElement("topbar_btns");
		
		$(".topbtnblock").setParam('topBarStaticDatas', this.topBarStaticDatas);
		$(".topbtnblock").processTemplate();

		$(".topshowcontent").setTemplateElement("topbar_mediatab");
		$(".topshowcontent").setParam('topBarStaticDatas', this.topBarStaticDatas);
		$(".topshowcontent").processTemplate();

		$(".topsortbar").setTemplateElement("topbar_sort");
		$(".topsortbar").setParam('topBarStaticDatas', this.topBarStaticDatas);
		$(".topsortbar").processTemplate(this.sortDatas);

		$(".topshowcontent a").live( "click", function() {
			$(this).addClass("selected").siblings().removeClass( "selected" );
			
			if ( $(this).hasClass("libraryshowmovie") ) {
				g_topBarControl.clickMediaTab( "movie" );
				$(".topbtnblock a.libraryFilterBtn").show();
			} else if ( $(this).hasClass("libraryshowtv") ) {
				g_topBarControl.clickMediaTab( "tvshow" );
				$(".topbtnblock a.libraryFilterBtn").show();
			} else if ( $(this).hasClass("libraryshowvideo") ) {
				g_topBarControl.clickMediaTab( "video" );
				$(".topbtnblock a.libraryFilterBtn").hide();
				$("#topnavblock .topfiltercontent").hide();
			}
		});

		$("#topnavblocktitle .librarySortBtn").live("click", function() {
			var libIndex = g_siderBar.curSelectLibIndex;

			if ($(this).hasClass("selected")) {
				g_topBarControl.setSortControls(libIndex, true);
				g_topBarControl.showSortControls(libIndex, true);
			} else {
				g_topBarControl.setSortControls(libIndex, false);
				g_topBarControl.showSortControls(libIndex, false);
			}

			g_topBarControl.showSortResult();
		});
		
		// click event filter buttontopfilterctx
		$("#topnavblocktitle .libraryFilterBtn").live("click", function() {
			var topfiltercontent = $("#topnavblock .topfiltercontent");
			
			if (topfiltercontent.is(":hidden")) {
				topfiltercontent.slideDown();
				g_sortandfilter.sortfilterInfo[g_siderBar.curSelectLibIndex].filterShow = true;

				$(this).addClass("close");
				$(this).addClass("down");
				
			} else {
				topfiltercontent.slideUp();

				g_sortandfilter.selectFilter(g_siderBar.curSelectLibIndex, g_topBarControl.curSelectedType, "genre", "");
				g_sortandfilter.selectFilter(g_siderBar.curSelectLibIndex, g_topBarControl.curSelectedType, "country", "");
				g_sortandfilter.selectFilter(g_siderBar.curSelectLibIndex, g_topBarControl.curSelectedType, "year", "");
				g_sortandfilter.sortfilterInfo[g_siderBar.curSelectLibIndex].filterShow = false;

				$(this).removeClass("down");
				$(this).removeClass("close");

				g_topfilter.resetFilterPage();
				g_topfilter.getFilterResult();
			}
		});

		// change show mode
		$("#topnavblocktitle .showtypeblock li").live("click", function() {
			$(this).addClass("selected").siblings().removeClass("selected");
			var showtypeblock = $("#topnavblocktitle .showtypeblock");
			var topshowcontent = $("#topnavblocktitle .topshowcontent");
			showtypeblock.hide();
			if ($(this).hasClass("isAutoClass")) {
				topshowcontent.fadeIn();
				g_multiMediaControl.flag.classify = true;

				g_addLibrary.changeLibraryViewMode(g_siderBar.curSelectLibId, true);
				g_topBarControl.changeViewMode(0);
			} else {
				topshowcontent.fadeOut();
				g_multiMediaControl.flag.classify = false;

				delete g_sortandfilter.sortfilterInfo[g_siderBar.curSelectLibIndex].filterForAllMedia.genre;
				delete g_sortandfilter.sortfilterInfo[g_siderBar.curSelectLibIndex].filterForAllMedia.country;
				delete g_sortandfilter.sortfilterInfo[g_siderBar.curSelectLibIndex].filterForAllMedia.year;

				// save view mode to server
				g_addLibrary.changeLibraryViewMode(g_siderBar.curSelectLibId, false);
				g_topBarControl.changeViewMode(1);
			}
		});

		$("#topnavblock .topsortcontent a").live("click", function() {
			$(this).siblings().removeClass("selectedbot").removeClass("selectedtop");
			var sortMethod = $(this).attr("method");
			var sortOrder;
			if ($(this).hasClass("selectedbot")) {
				$(this).addClass("selectedtop").removeClass("selectedbot");
				sortOrder = "ascending";
			} else {
				$(this).addClass("selectedbot").removeClass("selectedtop");
				sortOrder = "descending";
			}

			g_sortandfilter.setSortMethod( g_siderBar.curSelectLibIndex, sortMethod );
			g_sortandfilter.setSortOrder( g_siderBar.curSelectLibIndex, sortOrder );

			g_topBarControl.showSortResult();
		});

		$(".libraryEditBtn").live("click", function(event) {
			var strLibId = g_siderBar.curSelectLibId;
			if (strLibId) {
				g_addLibrary.clickEditLibrary(Number(strLibId), g_media_type_commercial);
			};

			event.stopPropagation();
		});
		$(".libraryMoveBtn").live("click", function() {
			var libraryName=g_mediaLibary.libraryDatas[g_siderBar.curSelectLibIndex].name;
			//console.log(libraryName);
			//g_editlibrary.libraryMove(libraryName);

			var config = {};
			config.srcLibName = libraryName;
			config.mediaContain = $("#pl");
			config.controlContain =$("#editlibrary");
			config.itemsWithTag = $("#pl .box,#pl .box2");

			if ( !g_moveMediaControl ) {
				new moveMediaControl;
			};

			g_moveMediaControl.initControl( config );
		});

		$(".libraryDeleteBtn").live("click", function() {
			var libraryName=g_mediaLibary.libraryDatas[g_siderBar.curSelectLibIndex].name;
			//console.log(libraryName);
			//g_editlibrary.libraryMove(libraryName);

			var config = {};
			config.srcLibName = libraryName;
			config.mediaContain = $("#pl");
			config.controlContain =$("#editlibrary");
			config.itemsWithTag = $("#pl .box,#pl .box2");

			if ( !g_delMediaControl ) {
				new deleteMediaControl;
			};

			g_delMediaControl.initControl( config );
		});

		$(".libraryCombineBtn").live("click", function() {
			var libraryName=g_mediaLibary.libraryDatas[g_siderBar.curSelectLibIndex].name;
			g_editlibrary.editCombine(libraryName);
		});
		$(".libraryRefreshBtn").live("click", function(){
			var strLibId = g_siderBar.curSelectLibId;

			if (strLibId) {
				var libIndex = g_siderBar.getLibIndexById( Number(strLibId) );

				if ( libIndex > -1 ) {
					g_mediaLibary.startScanLibary( libIndex );
				}
			};
		});
	},

	// movie\ tvshow\ video
	clickMediaTab: function(mediaType) {
		var libIndex = g_siderBar.curSelectLibIndex;

		this.curSelectedType = mediaType;
		g_topfilter.loadFilterDatas();

		if ( mediaType == "movie" ) {
			$(".topshowcontent .libraryshowmovie").addClass( "selected" );

			g_siderBar.setCurSelectedType( 0 );
			g_movieControl.siderClickEvent(libIndex);		
		} else if ( mediaType == "tvshow" ) {
			$(".topshowcontent .libraryshowtv").addClass( "selected" );

			g_siderBar.setCurSelectedType( 1 );
			g_tvshowControl.siderClickEvent(libIndex);
		} else if ( mediaType == "video" ) {
			$(".topshowcontent .libraryshowvideo").addClass( "selected" );

			g_siderBar.setCurSelectedType( 2 );
			g_video.siderClickEvent(libIndex);
		} else if ( mediaType == "all" ) {
			$(".topshowcontent a").removeClass( "selected" );
			
			g_siderBar.setCurSelectedType( 3 );
			g_multiMediaControl.siderClickEvent(libIndex);
		}
	},

	freshCurMediaTab:function() {
		this.clickMediaTab( this.curSelectedType );
	},

	// filter with type, all media
	changeViewMode: function(mode) {
		if ( mode == 0 ) {
			var curSelectType = g_siderBar.curSelectType;
			var curMediaType = "movie";
			if ( curSelectType == 0 ) {
				curMediaType = "movie";
			} else if ( curSelectType == 1 ) {
				curMediaType = "tvshow";
			} else if ( curSelectType == 2 ) {
				curMediaType = "video";
			} else {
				curMediaType = "movie";
			}

			this.clickMediaTab( curMediaType );
		} else if ( mode == 1 ) {
			this.clickMediaTab( "all" );

			// hide media type tab
		}
	},

	initMainPage: function( bAutoClass ) {
		var topshowcontent = $("#topnavblocktitle .topshowcontent");
		if ( bAutoClass ) {
			$(".topshowcontent a").removeClass( "selected" );

			$(".showtypeblock .viewMode").removeClass( "selected" );
			$(".showtypeblock .isAutoClass").addClass( "selected" );
			g_topBarControl.changeViewMode(0);

			topshowcontent.slideDown();
		} else {
			$(".topshowcontent a").removeClass( "selected" );

			$(".showtypeblock .viewMode").addClass( "selected" );
			$(".showtypeblock .isAutoClass").removeClass( "selected" );
			g_topBarControl.changeViewMode(1);

			topshowcontent.slideUp();
		}
	},

	setSortControls: function(libIndex, bShow) {
		var item = g_sortandfilter.sortfilterInfo[libIndex];

		if (bShow)
			item.sortShow = true;
		else
			item.sortShow = false;
	},

	getSortControls: function(libIndex) {
		var sortandfilter = g_sortandfilter.sortfilterInfo[libIndex];

		if (typeof (sortandfilter) == 'undefined') {
			// 将媒体转移到新的库中时，新的库没有sortandfilter
			var sortfilterInfo = {};
			sortfilterInfo.libId = g_mediaLibary.libraryDatas[libIndex].id;
			sortfilterInfo.sort = new JsonObject();
			sortfilterInfo.sort.method = 'title';
			sortfilterInfo.sort.order = 'ascending';
			sortfilterInfo.sortShow = false;
			sortfilterInfo.filter = new JsonObject();
			sortfilterInfo.filter.movieFilter = new Filter();
			sortfilterInfo.filter.tvshowFilter = new Filter();
			sortfilterInfo.filterForAllMedia = new JsonObject();
			sortfilterInfo.filterShow = false;
			g_sortandfilter.sortfilterInfo.push(sortfilterInfo);

			return g_sortandfilter.sortfilterInfo[g_sortandfilter.sortfilterInfo.length - 1];
		}

		return sortandfilter;
	},

	showSortControls: function(libIndex, bShow) {
		var topsortcontent = $("#topnavblock .topsortcontent");
		
		if ( bShow ) {
			topsortcontent.show();
			this.setSortSelected(libIndex);
			$("#topnavblocktitle .librarySortBtn").removeClass("selected");
		} else {
			topsortcontent.hide();
			this.resetSortSelected(libIndex);
			$("#topnavblocktitle .librarySortBtn").addClass("selected");
		}
	},

	setSortSelected: function(libIndex) {
		$("#topnavblock .topsortcontent a").each(function() {
			$(this).removeClass("selectedbot").removeClass("selectedtop");
		});

		var sortfilter = this.getSortControls(libIndex);

		if (sortfilter.sort.method == 'title') {
			if (sortfilter.sort.order == 'ascending') {
				$("#topnavblock .topsortcontent a").eq(0).addClass("selectedtop");
			} else {
				$("#topnavblock .topsortcontent a").eq(0).addClass("selectedbot");
			}
		} else if (sortfilter.sort.method == 'dateadded') {
			if (sortfilter.sort.order == 'ascending') {
				$("#topnavblock .topsortcontent a").eq(1).addClass("selectedtop");
			} else {
				$("#topnavblock .topsortcontent a").eq(1).addClass("selectedbot");
			}
		} else if (sortfilter.sort.method == 'modifiedtime') {
			if (sortfilter.sort.order == 'ascending') {
				$("#topnavblock .topsortcontent a").eq(2).addClass("selectedtop");
			} else {
				$("#topnavblock .topsortcontent a").eq(2).addClass("selectedbot");
			}
		} else if (sortfilter.sort.method == 'rating') {
			if (sortfilter.sort.order == 'ascending') {
				$("#topnavblock .topsortcontent a").eq(3).addClass("selectedtop");
			} else {
				$("#topnavblock .topsortcontent a").eq(3).addClass("selectedbot");
			}
		} else {

		}
	},

	resetSortSelected: function(libIndex) {
		$("#topnavblock .topsortcontent a").each(function() {
			$(this).removeClass("selectedbot").removeClass("selectedtop");
		});

		g_sortandfilter.sortfilterInfo[libIndex].sort.method = 'title';
		g_sortandfilter.sortfilterInfo[libIndex].sort.order = 'ascending';
		$("#topnavblock .topsortcontent a").eq(0).addClass("selectedtop");
	},

	changeMediaNum: function(num) {
		$(".librarynum span").html(num);
	},

	showSortResult: function() {
		var curTabType = g_topBarControl.curSelectedType;
		var libIndex = g_siderBar.curSelectLibIndex;

		if (curTabType == "movie") {
				g_movieControl.freshMainPageSort( libIndex );
			} else if (curTabType == "tvshow") {
				g_tvshowControl.freshMainPageSort( libIndex );
			} else if (curTabType == "video") {
				g_video.freshMainPageSort( libIndex );
			} else if (curTabType == "all") {
				g_multiMediaControl.freshMainPageSort( libIndex );
		}
	},

	clickSortControls: function(sortType) {

	},

	clickMoveMediaBtn: function() {

	},

	clickFreshBtn: function() {

	},

	clickEditLibraryBtn: function() {

	},
	switchLanguage:function(){
		this.topBarStaticDatas={
			libraryEditBtnTitle:$.i18n.prop('addlibrary_2'),
			libraryMoveBtnTitle:$.i18n.prop('transfer_1'),
			libraryFilterBtnTitle:$.i18n.prop('filter_9'),
			librarySortBtnTitle:$.i18n.prop('sort_1'),
			libraryShowBtnTitle:$.i18n.prop('index_242'),
			libraryShowStr_1:$.i18n.prop('index_243'),
			libraryShowStr_2:$.i18n.prop('index_244'),
			libraryShowStr_3:$.i18n.prop('index_38'),
			libraryShowStr_4:$.i18n.prop('index_39'),
			libraryShowStr_5:$.i18n.prop('index_40'),
			librarySortStr_1:$.i18n.prop('sort_6'),
			librarySortStr_2:$.i18n.prop('sort_1'),	
			libraryDeleteBtnTitle:$.i18n.prop('delete_1')
		};
		this.sortDatas[0].title=$.i18n.prop('sort_2');
		this.sortDatas[1].title=$.i18n.prop('sort_4');
		this.sortDatas[2].title=$.i18n.prop('sort_7');
		this.sortDatas[3].title=$.i18n.prop('sort_3');

	}

}