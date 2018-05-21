var g_searchresult;

var searchResult = function() {
	g_searchresult = this;
};

searchResult.prototype = {
	searchResultStaticDatas:{},
	searchKeyword:"",
	init: function(domPosition) {
		this.switchLanguage();
		this.updateTopBar();

		$(".searchlibraryblock h3").live("click", function() {
			var searchresultblock = $(this).parents(".searchlibraryblock").children(".searchresultblock");
			if (searchresultblock.is(":visible")) {
				if (!searchresultblock.eq(0).is(":animated")) {
					searchresultblock.slideUp();
				}
			} else {
				if (!searchresultblock.eq(0).is(":animated")) {
					searchresultblock.slideDown();
				}
			}
		});

		$(".click_searchBackBtn").live( "click", function() {
			$(".content_layer5").css("display", "none");
			g_siderBar.setAutoHide( false );
		});
		$(".searchlibraryMoveBtn").live("click", function() {
			//var libraryName = "搜索结果";
			//g_editlibrary.librarySearchMove(libraryName);

			var config = {};
			config.srcLibName = $.i18n.prop('index_241');
			config.mediaContain = $("#pl_layer5");
			config.controlContain = $("#moveMediaControl_searchPage");
			config.itemsWithTag = $("#pl_layer5 .box,#pl_layer5 .box2");

			if (!g_moveMediaControl) {
				new moveMediaControl;
			};

			g_moveMediaControl.initControl(config);
		});
	},

	/*
	dataProc:function(results) {
		if (!!results) {
			var movie = {}, tvshow = {}, video = {}, r = {};
			movie.items = [];
			movie.title = $.i18n.prop('index_38');
			tvshow.items = [];
			tvshow.title = $.i18n.prop('index_39');
			video.items = [];
			video.title = $.i18n.prop('index_40');

			r.movie = movie;
			r.tvshow = tvshow;
			r.video = video;

			var rs = results;

			for (var i = 0; i < rs.length; ++i) {
				rs[i].thumbnail = encodeImage(rs[i].thumbnail);
				rs[i].checked = false;

				if (!!!rs[i].id && !!rs[i].mediaid) {
					rs[i].id = rs[i].mediaid;
				}
			}

			for (var i = 0; i < rs.length; ++i) {
				if (rs[i].checked == false && rs[i].mediatype == "movie") {
					rs[i].checked = true;

					r.movie.items.push(rs[i]);
				}
			}

			for (var i = 0; i < rs.length; ++i) {
				if (rs[i].checked == false && rs[i].mediatype == "tvshow") {
					rs[i].checked = true;

					r.tvshow.items.push(rs[i]);
				}
			}

			for (var i = 0; i < rs.length; ++i) {
				if (rs[i].checked == false && rs[i].mediatype == "video") {
					rs[i].checked = true;

					r.video.items.push(rs[i]);
				}
			}

			$("#pl_layer5").setTemplateURL("../template/searchresult.tpl?" + AppVersion);
			$("#pl_layer5").processTemplate(r);

			g_siderBar.setAutoHide( false );

			$(".content_layer2").css("display", "none");
			$(".content_layer3").css("display", "none");
			$(".content_layer5").css("display", "block");
		}
	},
	*/

	dataProc:function(results) {
		if (!!results) {
			var libraries = [];
			var index = -1;

			var rs = results;

			for (var i = 0; i < rs.length; ++i) {
				rs[i].thumbnail = encodeImage(rs[i].thumbnail);

				if (!!rs[i].filecount && rs[i].filecount > 1) {
					rs[i].setflag = true;
				}

				if (!!!rs[i].id && !!rs[i].mediaid) {
					rs[i].id = rs[i].mediaid;
				}

				if (!!!rs[i].path && !!rs[i].file) {
					rs[i].path = rs[i].file;
				}
			}

			for (var i = 0; i < rs.length; ++i) {
				if (libraries.length == 0) {
					var library = {}, movies = [], tvshows = [], videos = [];
					library.movies = movies;
					library.tvshows = tvshows;
					library.videos = videos;

					if (rs[i].mediatype == "movie") {
						library.movies.push(rs[i]);
					} else if (rs[i].mediatype == "tvshow") {
						library.tvshows.push(rs[i]);
					} else {
						library.videos.push(rs[i]);
					}

					libraries.push(library);
					libraries[0].id = rs[i].idlibrary;
					index = 0;
				} else {
					var j = 0;
					for (; j < libraries.length; ++j) {
						if (rs[i].idlibrary == libraries[j].id) {
							if (rs[i].mediatype == "movie") {
								libraries[j].movies.push(rs[i]);
							} else if (rs[i].mediatype == "tvshow") {
								libraries[j].tvshows.push(rs[i]);
							} else {
								libraries[j].videos.push(rs[i]);
							}

							break;
						}
					}

					if (j == libraries.length) {
						var library = {}, movies = [], tvshows = [], videos = [];
						library.movies = movies;
						library.tvshows = tvshows;
						library.videos = videos;

						if (rs[i].mediatype == "movie") {
							library.movies.push(rs[i]);
						} else if (rs[i].mediatype == "tvshow") {
							library.tvshows.push(rs[i]);
						} else {
							library.videos.push(rs[i]);
						}

						libraries.push(library);
						libraries[j].id = rs[i].idlibrary;
					}

					index = j;
				}

				for (var idx = 0; idx < g_mediaLibary.libraryDatas.length; ++idx) {
					if (g_mediaLibary.libraryDatas[idx].id == libraries[index].id) {
						libraries[index].title = g_mediaLibary.libraryDatas[idx].name;
						break;
					}
				}
			}

			this.updateTopBar();
			
			$("#pl_layer5").setTemplateURL("../template/searchresult.tpl?" + AppVersion);
			$("#pl_layer5").processTemplate(libraries);

			g_siderBar.setAutoHide(true);

			$(".content_layer2").css("display", "none");
			$(".content_layer3").css("display", "none");
			$(".content_layer5").css("display", "block");
		}
	},

	clickinit:function(){
		var ref = this;
		var strForSearch = $("#searchblock input").val();
		if(strForSearch==""){
			//g_siderBar.freshCurPageData();
		//$(".content_layer5").css("display", "none");
		$(".searchblock .closesearch").hide();
			g_header.closeSearch();

			g_siderBar.setAutoHide( false );
		}
		else{
		g_mediaLibary.searchItemsInLibrary(strForSearch, function() {
			ref.dataProc(g_mediaLibary.searchResults);
			g_siderBar.setAutoHide( true );
		});
		this.searchKeyword=strForSearch;
	}
	},

	updateTopBar: function() {
		var tips=this.searchResultStaticDatas.searchResultStaticDatasStr_1;
		tips = tips.format(this.searchKeyword);

		$(".searchtopbar").setTemplateElement("topbar_search");
		$(".searchtopbar").setParam('searchKey', tips);
		$(".searchtopbar").processTemplate();
	},

	switchLanguage:function(){
		var tips=$.i18n.prop('index_245');
		//var searchkeyword=this.getSearchKeyword();
		this.searchResultStaticDatas={
			searchResultStaticDatasStr_1:tips
		};
		
	}
}
