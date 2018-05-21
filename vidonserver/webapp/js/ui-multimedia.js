var g_multiMediaControl;

var MultiMediaControl = function() {
	this.init();
	g_multiMediaControl = this;
}; 

MultiMediaControl.prototype = {
	mediaDatas: [],
	/*
	  filecount = 1;
	  mediaid = 342675;
	  mediatype = "movie";
	  thumbnail = "";
	  title = ""
	*/
	curMediaId: -1,
	curMediaSetId: -1,
	curMediaSetName: "",
	multilang: {},
	multilang_1: {},
	multilang_2: {},
	curLibIndex: -1,
	pageItems:{},
	curMode: 0,
	flag: {},

    init: function( domPosition ) {
		var _this = this;

		this.switchLanguage();
		flag = new Object();
		flag.classify = false;

		// movie item
		$(".click_movieset_inmultipage .img").live( "click", function() {
			if(!$(this).parents(".box").hasClass("waitselect")){
				var strFileid = $(this).attr( "fileid" );
				if ( strFileid ) {
					g_multiMediaControl.flag.classify = false;
					_this.curMovieSetName = $(".imgname", this).attr( "title" );
					_this.curMovieSetId = Number(strFileid);
					_this.freshSetPage();
				};
			}
		} );

		$(".click_movie_inmultipage .img").live( "click", function() {
			if(!$(this).parents(".box").hasClass("waitselect")){
				var strFileid = $(this).attr( "fileid" );
				if ( strFileid ) {
					g_multiMediaControl.flag.classify = false;
					_this.curMovieId = Number(strFileid);
					_this.freshMovieDetailPage(false);
				};
			}			
		});

		// tvshow item
		$(".click_tvshow_inmultipage .img").live("click", function() {
			if(!$(this).parents(".box").hasClass("waitselect")){
				var strFileid = $(this).attr("fileid");
				if (strFileid) {
					var __this = g_tvshowControl;
					g_multiMediaControl.flag.classify = false;
					__this.isSuccessGetDetail = false;
					__this.isSuccessGetSeason = false;

					__this.curTvshowId = Number(strFileid);

					g_mediaLibary.getTVShowDetail( __this.curTvshowId, function() {
						__this.isSuccessGetDetail = true;
						g_multiMediaControl.freshTVShowDetailPage();
						
					});
					g_mediaLibary.getSeasonDatas(_this.curLibIndex, __this.curTvshowId, function() {
						__this.isSuccessGetSeason = true;
						g_multiMediaControl.freshTVShowDetailPage();
					});
				};
			}
		});

		// video item
    },

	switchLanguage: function() {
		this.multilang = {
			index_38: $.i18n.prop('index_38')
		};

		this.multilang_1 = {
			index_38: $.i18n.prop('index_38')
		};

		this.multilang_2 = {
			index_38: $.i18n.prop('index_38'),
			"director": $.i18n.prop('index_161'),
			"year": $.i18n.prop('index_235'),
			"genre": $.i18n.prop('index_162'),
			"time": $.i18n.prop('index_237'),
			"country": $.i18n.prop('index_163'),
			"mpaa": $.i18n.prop('index_238'),
			"cast": $.i18n.prop('index_236'),
			"plot": $.i18n.prop('index_165'),
			"stars": $.i18n.prop('index_236')
		}
	},

	freshMainPage: function(libIndex) {
		if ( g_siderBar.checkIsFreshCurPage( libIndex, 3 ) != true ) {
			return;
		}

		$(".content_layer2").css("display", "none");
		$(".content_layer3").css("display", "none");
		$(".content_layer4").css("display", "none");

		g_siderBar.setAutoHide( false );

		this.mediaDatas = g_mediaLibary.libraryDatas[libIndex].mediaDatas;

		$("#pl").setTemplateURL("../template/multimedia.tpl?" + AppVersion);
		$("#pl").setParam( "multilang", this.multilang );
		$("#pl").processTemplate( this.mediaDatas );

		this.pageItems = $("#pl .lazyload_item");
		g_scrollBarControl.freshMoviePage();

		g_topBarControl.changeMediaNum(g_mediaLibary.libraryDatas[libIndex].mediaCount);
	},

	freshMainPageFilter: function(libIndex) {
		this.curMode = 4;

		g_mediaLibary.libraryDatas[libIndex].mediaDatasFilter = [];

		g_mediaLibary.getAllMediaDatas(libIndex, 4, 0, g_getMediaRange, function(index) {
			$("#pl").setTemplateURL("../template/multimedia.tpl?" + AppVersion);
			$("#pl").setParam( "multilang", this.multilang );
			$("#pl").processTemplate( g_mediaLibary.libraryDatas[libIndex].mediaDatasFilter );

			g_multiMediaControl.mediaDatas = g_mediaLibary.libraryDatas[libIndex].mediaDatasFilter;

			g_multiMediaControl.pageItems = $("#pl .lazyload_item");
			g_scrollBarControl.freshMoviePage();

			g_topBarControl.changeMediaNum(g_mediaLibary.libraryDatas[libIndex].mediaCountFilter);
		});
	},

	freshMainPageSort: function( libIndex ) {
		this.curMode = 4;
		g_mediaLibary.libraryDatas[libIndex].mediaDatasFilter = [];

		g_mediaLibary.getAllMediaDatas(libIndex, 4, 0, g_getMediaRange, function(index) {
			$("#pl").setTemplateURL("../template/multimedia.tpl?" + AppVersion);
			$("#pl").setParam( "multilang", this.multilang );
			$("#pl").processTemplate( g_mediaLibary.libraryDatas[libIndex].mediaDatasFilter );

			g_multiMediaControl.mediaDatas = g_mediaLibary.libraryDatas[libIndex].mediaDatasFilter;

			g_multiMediaControl.pageItems = $("#pl .lazyload_item");
			g_scrollBarControl.freshMoviePage();

			g_topBarControl.changeMediaNum(g_mediaLibary.libraryDatas[libIndex].mediaCountFilter);
		});
	},

	freshSetPage: function() {
		var _this = this;
		g_mediaLibary.getMovieSetDatas(this.curLibIndex, this.curMovieSetId, function() {
			//$(".content_layer1").css("display", "none");
			$(".content_layer2").css("display", "block");
			g_siderBar.setAutoHide( false );

			$("#pl_layer2").setTemplateURL("../template/movie_set.tpl?" + AppVersion);
			$("#pl_layer2").setParam("multilang", g_movieControl.multilang_1);
			$("#pl_layer2").setParam("flag", g_multiMediaControl.flag);
			$("#pl_layer2").processTemplate(g_mediaLibary.movieSetDatas);
		});
	},

	freshMovieDetailPage: function(fromSetPage) {
		var _this = this;
		this.multilang_2.fromSetPage = fromSetPage;

		if ( fromSetPage ) {
			this.multilang_2.index_38 = this.curMovieSetName;
		} else {
			this.multilang_2.index_38 = $.i18n.prop('index_38');
		}

		g_mediaLibary.getMovieDetail( this.curMovieId, function() {
			//$(".content_layer1").css("display","none");
			//$(".content_layer2").css("display","none");
			$(".content_layer3").css("display","block");
			$(".content_layer3").addClass("videobg");
			g_siderBar.setAutoHide( true );

			var tempBackDrop = g_mediaLibary.curMovieDetail.backdrop
			if (tempBackDrop) {
				var urlImage = 'url(' + tempBackDrop + ')';
				//$(".videobg").css("background-image", urlImage );

				ChangeBackground(urlImage);
			} else {
				ChangeBackground(null);
			}

			$("#pl_layer3").setTemplateURL("../template/movie_detail.tpl?" + AppVersion);
			$("#pl_layer3").setParam('title', g_movieControl.multilang_2);
			$("#pl_layer3").setParam('flag', g_multiMediaControl.flag);
			$("#pl_layer3").processTemplate(g_mediaLibary.curMovieDetail);
			isShowStarsJt();
		});
	},

	freshTVShowDetailPage: function() {
		if (g_tvshowControl.isSuccessGetDetail) {
			$(".content_layer2").css("display", "none");
			$(".content_layer3").css("display", "block");
			$(".content_layer4").css("display", "none");

			g_siderBar.setAutoHide( true );

			var tempBackDrop = g_mediaLibary.curTVShowDetail.backdrop
			if (tempBackDrop) {
				var urlImage = 'url(' + tempBackDrop + ')';

				ChangeBackground(urlImage);
			} else {
				ChangeBackground(null);
			}

			$("#pl_layer3").setTemplateURL("../template/tvshow_season.tpl?" + AppVersion);
			$("#pl_layer3").setParam('title', g_tvshowControl.multilang);
			$("#pl_layer3").setParam('seasons', g_mediaLibary.curTVShowSeason);
			$("#pl_layer3").setParam('flag', g_multiMediaControl.flag);
			$("#pl_layer3").processTemplate(g_mediaLibary.curTVShowDetail);
			isShowStarsJt();
		};
	},

	siderClickEvent: function(libraryIndex) {
		var _this = this;
		this.curLibIndex = libraryIndex;
		this.curMode = 0;

		//$(".content_layer1").css("display","block");
		$(".content_layer2").css("display", "none");
		$(".content_layer3").css("display", "none");

		if (g_sortandfilter.sortfilterInfo[libraryIndex].filterShow) {
			_this.freshMainPageFilter(libraryIndex);
		} else {
			if (g_mediaLibary.libraryDatas[libraryIndex].mediaCount == g_mediaLibary.libraryDatas[libraryIndex].mediaCountNew 
				&& g_mediaLibary.libraryDatas[libraryIndex].movieCount > 0) {
				_this.mediaDatas = g_mediaLibary.libraryDatas[libraryIndex].mediaDatas;
				_this.freshMainPage(libraryIndex);
				return;
			}

			$("#pl").empty();

			g_mediaLibary.getAllMediaDatas(libraryIndex, 0, 0, g_getMediaRange, function(index) {
				_this.mediaDatas = g_mediaLibary.libraryDatas[libraryIndex].mediaDatas;
				_this.freshMainPage(index);

				g_mediaLibary.libraryDatas[libraryIndex].mediaCount = g_mediaLibary.libraryDatas[libraryIndex].mediaCountNew;
				//g_siderBar.freshCount();
			});
		}
	},

	freshByScrollbar: function(params){
		var startPos = -1;
		for (var i = params.startPos; i <= params.endPos; i++) {
			var data = this.mediaDatas[i];
			if ( !data.bInit ) {
				startPos = i;
				break;
			};
		};

		if (startPos != -1) {
			var nStartPos = startPos;
			var nEndPos = nStartPos + 30;
			var libraryIndex = params.libIndex;

			var curMode = this.curMode;
			g_mediaLibary.getAllMediaDatas( libraryIndex, curMode, nStartPos, nEndPos, function(index) {
				if ( curMode == 0 ) {
					g_multiMediaControl.mediaDatas = g_mediaLibary.libraryDatas[libraryIndex].mediaDatas;
				} else if ( curMode == 4 ) {
					g_multiMediaControl.mediaDatas = g_mediaLibary.libraryDatas[libraryIndex].mediaDatasFilter;
				}
				
				if (params.libIndex == g_siderBar.curSelectLibIndex && params.type == g_siderBar.curSelectType) {
					for (var i = nStartPos; i < nEndPos; i++) {
						g_multiMediaControl.freshDataByIndex(i);
					}
				}

				params.callbackFunc( params );
			});
		} else {
			params.callbackFunc( params );
		}
	},

	freshDataByIndex: function(nIndex) {
		if (nIndex > -1 && this.pageItems && nIndex < this.pageItems.length) {
			var curPageItem = this.pageItems[nIndex];
			var curData = this.mediaDatas[nIndex];

			var lazyImgItem = $(".lazyload_img", curPageItem);
			lazyImgItem.attr("fileindex", curData.fileindex);
			lazyImgItem.attr("fileid", curData.mediaid);
			lazyImgItem.attr("filepath", curData.file);

			var picPath = curData.thumbnail;
			lazyImgItem.attr("tempPath", picPath);
			picPath = 'url(' + picPath + ')';
			lazyImgItem.css("background-image", picPath);

			if (curData.mediatype == "movie") {
				if (curData.setflag) {
					$(curPageItem).attr( "class", "box collectionmovie click_movieset_inmultipage lazyload_item" );
					lazyImgItem.attr("mediatype", "movieset");

					$(".singleimgbg", curPageItem).hide();
					$(".collectionbg", curPageItem).show();

					$(".Moviescount", curPageItem).text(curData.filecount);
				}
			} else if (curData.mediatype == "tvshow") {
				$(curPageItem).attr( "class", "box singlemovie click_tvshow_inmultipage lazyload_item" );
				lazyImgItem.attr("mediatype", "tvshow");

				$(".editbtn", curPageItem).attr( "class", "editbtn type_movie" );
			} else if (curData.mediatype == "video") {
				$(curPageItem).attr( "class", "box singlemovie click_video_inmultipage lazyload_item" );
				lazyImgItem.attr("mediatype", "video");

				$(".editbtn", curPageItem).attr( "class", "editbtn type_video" );
			}

			var imgnameItem = $(".imgname", curPageItem);
			imgnameItem.attr("title", curData.title);
			imgnameItem.text(curData.title);
		}
	}
}