var g_tvshowControl;

var TvshowControl = function() {
	g_tvshowControl = this;
}; 

TvshowControl.prototype = {
	tvshowDatas: [],
	curTvshowId: -1,
	curTvshowIndex: -1,
	curGetSeasonTvshowId: -1, // tvshow have getten seasons data.
	curSeasonIndex: -1,
	isSuccessGetDetail: false,
	isSuccessGetSeason: false,
	curLibIndex: -1,
	curEpisode: -1,

    init: function() {
    	var _this = this;
    	this.switchLanguage();

		$(".click_backtvshow").live("click", function() {
			$(".content_layer2").css("display", "none");
			$(".content_layer3").css("display", "none");
			$(".content_layer4").css("display", "none");

			g_siderBar.setAutoHide(false);
			//g_tvshowControl.freshMainPage();
		});

		$(".click_backtvshowseason").live("click", function() {
			_this.freshSeasonPage();
		});

		$(".click_backtvshowdetail").live("click", function() {
			_this.freshDetailPage();
		});

		$(".click_tvshow .img").live("click", function() {
			if(!$(this).parents(".box").hasClass("waitselect")){
				var strFileid = $(this).attr("fileid");
				var strFileIndex = $(this).attr("fileindex");

				if (strFileid) {
					var __this = g_tvshowControl;
					__this.isSuccessGetDetail = false;
					__this.isSuccessGetSeason = false;

					__this.curTvshowId = Number(strFileid);
					__this.curTvshowIndex = Number(strFileIndex);

					g_mediaLibary.getTVShowDetail(__this.curTvshowId, function() {
						__this.isSuccessGetDetail = true;
						__this.freshDetailPage();
					});

					if (_this.curLibIndex == -1) { 
						// in case of searching
						var it = g_mediaLibary.libraryDatas;
						var idlibrary = Number($(this).attr("libraryid"));

						for (var i = 0; i < it.length; ++i) {
							if (idlibrary == it[i].id) {
								_this.curLibIndex = i;
								break;
							}
						}
					}

					g_mediaLibary.getSeasonDatas(_this.curLibIndex, __this.curTvshowId, function() {
						__this.isSuccessGetSeason = true;
						__this.freshDetailPage();
					});
				};
			}
		});

		$(".click_episode .img").live("click", function() {
			var ref = g_tvshowControl;
			var fileid = $(this).attr("fileid");
			ref.curEpisode = $(this).attr("numepisode");

			if (!!fileid && !!ref.curEpisode) {
				g_mediaLibary.getEpisodeDetails(Number(fileid), g_mediaLibary.curTVShowSeason[ref.curSeasonIndex].iseason, Number(ref.curEpisode), function() {
					ref.freshEpisodePage();
				});
			}
		});

		$(".click_season").live("click", function() {
			var ref = g_tvshowControl;
			var strSeasonIndex = $(this).attr("seasonindex");
			if ( strSeasonIndex ) {
				ref.curSeasonIndex = Number(strSeasonIndex);
				var curTVShowSeasonId = g_mediaLibary.curTVShowSeason[ref.curSeasonIndex].iseason;

				g_mediaLibary.getSeasonDetails(ref.curTvshowId, curTVShowSeasonId, ref.curSeasonIndex, function() {
					ref.freshSeasonPage();
				});
			}
		} );

		$("#tvshow_detail_jt .right").live("click", function() {
			g_tvshowControl.getNextPreDetail(true);
		});

		$("#tvshow_detail_jt .left").live("click", function() {
			g_tvshowControl.getNextPreDetail(false);
		});
    },

    switchLanguage: function() {
		this.multilang = {
			"index_39": $.i18n.prop('index_39'),
			"director": $.i18n.prop('index_161'),
			"year": $.i18n.prop('index_235'),
			"genre": $.i18n.prop('index_162'),
			"time": $.i18n.prop('index_237'),
			"country": $.i18n.prop('index_163'),
			"mpaa": $.i18n.prop('index_238'),
			"cast": $.i18n.prop('index_236'),
			"plot": $.i18n.prop('index_165'),
			"stars": $.i18n.prop('index_236')
		};
	},

	freshMainPage: function(libIndex) {
		if (g_siderBar.checkIsFreshCurPage(libIndex, 1) != true) {
			return;
		}

		var fresh = false;

		if (!g_siderBar.checkIsInMainPage()) {
			$(".content_layer2").css("display", "none");

			if (!this.checkIsInDetailPage()) {
				$(".content_layer3").css("display", "none");
				fresh = true;
			}
			
			if (!this.checkIsInSeasonPage()) {
				$(".content_layer4").css("display", "none");
				fresh = true;
			}

			$(".content_layer5").css("display", "none");
			if (!fresh) {
				g_siderBar.setAutoHide( false );
			}
			g_index.freshMainPage();
		}

		$("#pl").setTemplateURL("../template/tvshow.tpl?" + AppVersion);
		$("#pl").processTemplate(this.tvshowDatas);

		g_scrollBarControl.freshMoviePage();

		g_topBarControl.changeMediaNum(g_mediaLibary.libraryDatas[libIndex].tvshowCount);
	},

	freshMainPageFilter: function(libIndex) {
		g_mediaLibary.getTVShowDatas(libIndex, 4, 0, 20, function(index) {
			$("#pl").setTemplateURL("../template/tvshow.tpl?" + AppVersion);
			$("#pl").processTemplate( g_mediaLibary.libraryDatas[libIndex].tvshowDatasFilter );

			g_scrollBarControl.freshMoviePage();

			g_topBarControl.changeMediaNum(g_mediaLibary.libraryDatas[libIndex].tvshowCountFilter);
		});
	},

	freshMainPageSort: function( libIndex ) {
		g_mediaLibary.getTVShowDatas(libIndex, 4, 0, 20, function(index) {
			$("#pl").setTemplateURL("../template/tvshow.tpl?" + AppVersion);
			$("#pl").processTemplate( g_mediaLibary.libraryDatas[libIndex].tvshowDatasFilter );

			g_scrollBarControl.freshMoviePage();
			
			g_topBarControl.changeMediaNum(g_mediaLibary.libraryDatas[libIndex].tvshowCountFilter);
		});
	},
	
	freshDetailPage: function() {
		if (this.isSuccessGetSeason && this.isSuccessGetDetail) {

			var tempBackDrop = g_mediaLibary.curTVShowDetail.backdrop
			if (tempBackDrop) {
				var urlImage = 'url(' + tempBackDrop + ')';
				//$(".videobg").css("background-image", urlImage );

				ChangeBackground(urlImage);
			} else {
				ChangeBackground(null);
			}

			$(".content_layer2").css("display", "none");
			$(".content_layer3").css("display", "block");
			$(".content_layer4").css("display", "none");

			g_siderBar.setAutoHide( true );

			$("#pl_layer3").setTemplateURL("../template/tvshow_season.tpl?" + AppVersion);
			this.multilang.index_39 = $.i18n.prop('index_39');
			$("#pl_layer3").setParam('title', this.multilang);
			$("#pl_layer3").setParam('seasons', g_mediaLibary.curTVShowSeason);
			$("#pl_layer3").setParam('flag', g_multiMediaControl.flag);
			$("#pl_layer3").processTemplate(g_mediaLibary.curTVShowDetail);
			isShowStarsJt();
		}
	},

	freshSeasonPage: function() {
		var tempBackDrop = g_mediaLibary.curTVShowSeasonDetail.backdrop
		if (!!tempBackDrop) {
			var urlImage = 'url(' + tempBackDrop + ')';
			ChangeBackground(urlImage, 4);
		} else {
			ChangeBackground(null, 4);
		}

		$(".content_layer2").css("display", "none");
		$(".content_layer3").css("display","none");
		$(".content_layer4").css("display","block");

		g_siderBar.setAutoHide(true);

		$("#pl_layer4").setTemplateURL("../template/tvshow_episode.tpl?" + AppVersion);
		this.multilang.index_39 = g_mediaLibary.curTVShowDetail.title;
		$("#pl_layer4").setParam('title', this.multilang);
		$("#pl_layer4").setParam('staticTitle', g_tvshowControl.multilang);
		// $("#pl_layer3").setParam('seasonflag', false);
		// $("#pl_layer3").setParam('episodeflag', true);
		$("#pl_layer4").processTemplate(g_mediaLibary.curTVShowSeasonDetail);
	},

	freshEpisodePage: function() {
		$(".content_layer2").css("display","none");
		$(".content_layer3").css("display","block");
		$(".content_layer4").css("display","none");

		g_siderBar.setAutoHide(true);

		$("#pl_layer3").setTemplateURL("../template/tvshow_episodedetails.tpl?" + AppVersion);
		this.multilang.index_39 = g_mediaLibary.curTVShowSeasonDetail.title;
		$("#pl_layer3").setParam('title', this.multilang);
		$("#pl_layer3").setParam('seasonflag', true);
		$("#pl_layer3").setParam('episodeflag', false);
		$("#pl_layer3").processTemplate(g_mediaLibary.curTVShowEpisodeDetail);
	},

    siderClickEvent: function(libIndex) {
    	var _this = this;

		_this.curLibIndex = libIndex;

		if (g_sortandfilter.sortfilterInfo[libIndex].filterShow) {
			_this.freshMainPageFilter(libIndex);
		} else {
			if (g_mediaLibary.libraryDatas[libIndex].tvshowCount > 0 
				&& g_mediaLibary.libraryDatas[libIndex].tvshowCount == g_mediaLibary.libraryDatas[libIndex].tvshowCountNew) {
				_this.tvshowDatas = g_mediaLibary.libraryDatas[libIndex].tvshowDatas;
				_this.freshMainPage(libIndex);
				return;
			}

			$("#pl").empty();

			g_mediaLibary.getTVShowDatas(libIndex, 0, 0, 20, function(index) {
				_this.tvshowDatas = g_mediaLibary.libraryDatas[libIndex].tvshowDatas;
				_this.freshMainPage(index);

				g_mediaLibary.libraryDatas[libIndex].tvshowCount = g_mediaLibary.libraryDatas[libIndex].tvshowCountNew;
				//g_siderBar.freshCount();
			});
		}
    },

	freshAfterEditMeta: function(type) {
		if (typeof (type) == "undefined") {
			return;
		}

		if (type == "tvshow") {
			g_mediaLibary.getTVShowDetail(g_editmeta.curFileId, function() {
				var isInDetailPage = g_tvshowControl.checkIsInDetailPage();

				if (isInDetailPage) {
					
					var tempBackDrop = g_mediaLibary.curTVShowDetail.backdrop
					if (tempBackDrop) {
						var urlImage = 'url(' + tempBackDrop + ')';

						ChangeBackground(urlImage);
					} else {
						ChangeBackground(null);
					}

					$("#pl_layer3").processTemplate(g_mediaLibary.curTVShowDetail);
				}
			});
		} else if (type == "episode") {
			var curTvshowIndex = this.curTvshowIndex;
			var tvshowDatas = this.tvshowDatas;

			g_mediaLibary.getEpisodeDetails(g_editmeta.curFileId,
				g_mediaLibary.curTVShowSeason[g_tvshowControl.curSeasonIndex].iseason,
				Number(g_tvshowControl.curEpisode),
				function() {
				tvshowDatas[curTvshowIndex].title = g_mediaLibary.curTVShowEpisodeDetail.title;
				tvshowDatas[curTvshowIndex].thumbnail = g_mediaLibary.curTVShowEpisodeDetail.thumbnail;

				$("#pl").processTemplate(tvshowDatas);
				g_scrollBarControl.freshMoviePage();
			});
		} else if (type == "episodedetails") {
			g_mediaLibary.getEpisodeDetails(g_editmeta.curFileId,
				g_mediaLibary.curTVShowSeason[g_tvshowControl.curSeasonIndex].iseason,
				Number(g_tvshowControl.curEpisode),
				function() {
				var tempBackDrop = g_mediaLibary.curTVShowDetail.backdrop
				if (tempBackDrop) {
					var urlImage = 'url(' + tempBackDrop + ')';

					ChangeBackground(urlImage);
				} else {
					ChangeBackground(null);
				}

				$("#pl_layer3").processTemplate(g_mediaLibary.curTVShowEpisodeDetail);
			});
		}
	},

	checkIsInDetailPage: function() {
		// check is in detail page.
		if ($(".content_layer3").is(":hidden")) {
			return false;
		} else {
			return true;
		}
	},

	checkIsInSeasonPage: function() {
		if ($(".content_layer4").is(":hidden")) {
			return false;
		} else {
			return true;
		}
	},

	getNextPreDetail: function(bNext) {
		var _this = this;
		var tempTVshowId = -1;
		var tempTVshowIndex = this.curTvshowIndex;

		if (bNext) {
			tempTVshowIndex = tempTVshowIndex + 1;
		} else {
			tempTVshowIndex = tempTVshowIndex - 1;
		}

		if (tempTVshowIndex > -1 && tempTVshowIndex < this.tvshowDatas.length) {
			tempTVshowId = this.tvshowDatas[tempTVshowIndex].idtvshow;
		}

		if (tempTVshowId == -1 ) {
			return;
		}

		this.curTvshowIndex = tempTVshowIndex;
		this.freshLeftOrRightClickPage(tempTVshowId);
	},

	freshLeftOrRightClickPage: function(tvshowId) {
		if (!!!tvshowId) {
			return;
		}

		var _this = this;
		_this.isSuccessGetDetail = false;
		_this.isSuccessGetSeason = false;

		g_mediaLibary.getTVShowDetail(tvshowId, function() {
			_this.isSuccessGetDetail = true;
			_this.freshDetailPage();
		});

		if (_this.curLibIndex == -1) { 
			// in case of searching
			var it = g_mediaLibary.libraryDatas;
			var idlibrary = Number($(this).attr("libraryid"));

			for (var i = 0; i < it.length; ++i) {
				if (idlibrary == it[i].id) {
					_this.curLibIndex = i;
					break;
				}
			}
		}

		g_mediaLibary.getSeasonDatas(_this.curLibIndex, tvshowId, function() {
			_this.isSuccessGetSeason = true;
			_this.freshDetailPage();
		});
	},
}
