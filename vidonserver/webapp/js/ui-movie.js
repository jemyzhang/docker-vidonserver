var g_movieControl;

var MovieControl = function() {
	g_movieControl = this;
}; 

MovieControl.prototype = {
	movieDatas: [],
	curMovieId: -1,
	curMovieIndex: -1,
	curMovieSetId: -1,
	curMovieSetIndex: -1,
	curMovieSetName: "",
	multilang: {},
	multilang_1: {},
	multilang_2: {},
	curLibIndex: -1,
	pageItems:{},
	movieSetControl: {},
	curMode: 0,

    init: function( domPosition ) {
		var _this = this;

		this.switchLanguage();
		this.movieSetControl.isMovieSet = false;
		this.movieSetControl.curIndexInSet = -1;
		this.movieSetControl.left = false;
		this.movieSetControl.right = false;
		this.movieSetControl.setDatas = new Array();

		$(".click_movieset .img").live( "click", function() {
			if(!$(this).parents(".box").hasClass("waitselect")){
				var strFileid = $(this).attr( "fileid" );
				var strFileIndex = $(this).attr( "fileindex" );

				if ( strFileid ) {
					g_multiMediaControl.flag.classify = true;
					_this.curMovieSetName = $(".imgname", this).attr( "title" );
					_this.curMovieSetId = Number(strFileid);
					_this.curMovieIndex = Number(strFileIndex);
					_this.freshSetPage();
				};
			}
		} );

		$(".click_movie .img").live( "click", function() {
			if(!$(this).parents(".box").hasClass("waitselect")){
				var strFileid = $(this).attr( "fileid" );
				var strFileIndex = $(this).attr( "fileindex" );
				
				if ( strFileid ) {
					g_multiMediaControl.flag.classify = true;
					_this.curMovieId = Number(strFileid);
					_this.curMovieIndex = Number( strFileIndex );
					_this.freshDetailPage(false);
				}

				_this.movieSetControlReset();
			}
		});

		$(".click_moviesetdetail").live( "click", function() {
			var strFileid = $(".img", this).attr( "fileid" );
			// _this.curMovieIndex = parseInt($(".img", this).attr("fileindex"));

			if ( strFileid ) {
				_this.curMovieId = Number(strFileid);
				g_multiMediaControl.flag.classify = false;
				_this.freshDetailPage(true);
			}

			_this.movieSetControlReset();
			_this.movieSetControl.curIndexInSet = parseInt($(".img", this).attr("fileindex"));
		} );

		$(".click_backmovie").live( "click", function() {
			//_this.freshMainPage();

			//$(".content_layer1").show();//css("display", "block");
			$(".content_layer2").css("display", "none");
			$(".content_layer3").css("display", "none");
			_this.movieSetControlReset();
			g_siderBar.setAutoHide( false );
		} );

		$(".click_backmovieset").live( "click", function() {
			//_this.freshSetPage();

			//$(".content_layer1").css("display","none");
			$(".content_layer2").css("display","block");
			$(".content_layer3").css("display","none");
			_this.movieSetControlReset();
			g_siderBar.setAutoHide( true );
		} );

		//不支持播放
		$(".posterList .img .playerbtn").live("click", function(event) {
			//g_commonPopDialog.showNoPlay();
			var mediaType = $(this).parent().parent().attr("mediatype");
			if (mediaType == "tvshow_episode") {
				var fileid = $(this).parent().parent().attr("fileid");
				var filepath = $(this).parent().parent().attr("filepath");
				var poster = $(this).parent().parent().attr("tempPath");

				var mainTitle = $(this).parent().parent().attr("mainTitle");
				var subTitle = $(this).parent().parent().attr("playTitle");
				subTitle = mainTitle + "-" + subTitle;

				g_playwindows.playFile(Number(fileid), filepath, subTitle, poster);
			} else {
				var fileid = $(this).parent().parent().attr("fileid");
				if (fileid) {
					g_mediaLibary.getMovieDetail(Number(fileid), function() {
						var name = g_mediaLibary.curMovieDetail.title;
						var filepath = g_mediaLibary.curMovieDetail.filepath;
						var poster = g_mediaLibary.curMovieDetail.backdrop;

						var result = filepath.substr(filepath.lastIndexOf(".")).toLowerCase();

						if (result == ".iso") {
							g_mediaLibary.getMainTitleInfo(filepath, function(titleInfo) {
								var titlePath = titleInfo.title;
								var titlePoster = encodeImage(titleInfo.movieimage);

								g_playwindows.playFile(Number(fileid), titlePath, name, poster);
							});
						} else {
							g_playwindows.playFile(Number(fileid), filepath, name, poster);
						}
					});
				};
			}
			
			
			event.stopPropagation();
		});
		
		$(".posterList .img .morebtn").live("click", function(event) {
			var mediatype=$(this).parents(".img").attr("mediatype");
			g_commonPopDialog.showMediaActionsDropdown($(this),mediatype);
			event.stopPropagation();
		});

		$("#movie_detail_jt .right").live("click", function() {
			g_movieControl.getNextPreDetail(true);
		});

		$("#movie_detail_jt .left").live("click", function() {
			g_movieControl.getNextPreDetail(false);
		});

		$(".content_layer3 .mainblock").live("keydown", function(event) {
			if (event.keyCode == "39") {
				g_movieControl.getNextPreDetail(true);
			}
		});

		$(".content_layer3 .mainblock").live("keydown", function(event) {
			if (event.keyCode == "37") {
				g_movieControl.getNextPreDetail(false);
			}
		});
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
		if ( g_siderBar.checkIsFreshCurPage( libIndex, 0 ) != true ) {
			return;
		}

		if (!g_siderBar.checkIsInMainPage()) {
			$(".content_layer2").css("display", "none");
			$(".content_layer3").css("display", "none");
			$(".content_layer4").css("display", "none");
			$(".content_layer5").css("display", "none");

			g_siderBar.setAutoHide( false );
			g_index.freshMainPage();
		}

		this.movieDatas = g_mediaLibary.libraryDatas[libIndex].movieDatas;

		$("#pl").setTemplateURL("../template/movie.tpl?" + AppVersion);
		$("#pl").setParam( "multilang", this.multilang );
		$("#pl").processTemplate( this.movieDatas );

		this.pageItems = $("#pl .lazyload_item");

		g_scrollBarControl.freshMoviePage();

		g_topBarControl.changeMediaNum(g_mediaLibary.libraryDatas[libIndex].movieCount);
	},

	freshMainPageFilter: function(libIndex) {
		this.curMode = 4;
		g_mediaLibary.libraryDatas[libIndex].movieDatasFilter = [];
		g_mediaLibary.getMovieDatas(libIndex, 4, 0, g_getMediaRange, function(index) {
			$("#pl").setTemplateURL("../template/movie.tpl?" + AppVersion);
			$("#pl").setParam( "multilang", this.multilang );
			$("#pl").processTemplate( g_mediaLibary.libraryDatas[libIndex].movieDatasFilter );

			g_movieControl.movieDatas = g_mediaLibary.libraryDatas[libIndex].movieDatasFilter;

			g_movieControl.pageItems = $("#pl .lazyload_item");
			g_scrollBarControl.freshMoviePage();

			g_topBarControl.changeMediaNum(g_mediaLibary.libraryDatas[libIndex].movieCountFilter);
		});
	},

	freshMainPageSort: function( libIndex ) {
		this.curMode = 4;
		g_mediaLibary.libraryDatas[libIndex].movieDatasFilter = [];
		g_mediaLibary.getMovieDatas(libIndex, 4, 0, g_getMediaRange, function(index) {
			$("#pl").setTemplateURL("../template/movie.tpl?" + AppVersion);
			$("#pl").setParam( "multilang", this.multilang );
			$("#pl").processTemplate( g_mediaLibary.libraryDatas[libIndex].movieDatasFilter );

			g_movieControl.movieDatas = g_mediaLibary.libraryDatas[libIndex].movieDatasFilter;

			g_movieControl.pageItems = $("#pl .lazyload_item");
			g_scrollBarControl.freshMoviePage();

			g_topBarControl.changeMediaNum(g_mediaLibary.libraryDatas[libIndex].movieCountFilter);
		});
	},

	freshSetPage: function() {
		var _this = this;
		g_mediaLibary.getMovieSetDatas(this.curLibIndex, this.curMovieSetId, function() {
			$(".content_layer2").css("display", "block");
			$(".content_layer5").css("display", "none");
			g_siderBar.setAutoHide( true );

			$("#pl_layer2").setTemplateURL("../template/movie_set.tpl?" + AppVersion);
			$("#pl_layer2").setParam("multilang", g_movieControl.multilang_1);
			$("#pl_layer2").processTemplate(g_mediaLibary.movieSetDatas);
		});
		
	},

	freshAfterEditMeta: function() {
		var curMovieIndex = this.curMovieIndex;
		var movieDatas = this.movieDatas;

		if (curMovieIndex > -1 && curMovieIndex < movieDatas.length) {
			var curMovieId = movieDatas[curMovieIndex].fileid;

			g_mediaLibary.getMovieDetail(curMovieId, function() {
				movieDatas[curMovieIndex].name = g_mediaLibary.curMovieDetail.title;
				movieDatas[curMovieIndex].thumbnail = g_mediaLibary.curMovieDetail.thumbnail;

				var isInDetailPage = g_movieControl.checkIsInDetailPage();

				if (isInDetailPage) {
					
					var tempBackDrop = g_mediaLibary.curMovieDetail.backdrop
					if (tempBackDrop) {
						var urlImage = 'url(' + tempBackDrop + ')';
						//$(".videobg").css("background-image", urlImage );

						ChangeBackground(urlImage);
					} else {
						ChangeBackground(null);
					}

					$("#pl_layer3").processTemplate(g_mediaLibary.curMovieDetail);
				} else {
					$("#pl").processTemplate(movieDatas);
					g_scrollBarControl.freshMoviePage();
				}
			});
		};
	},

	freshDetailPage: function(fromSetPage) {
		var _this = this;
		this.multilang_2.fromSetPage = fromSetPage;

		if ( fromSetPage ) {
			this.multilang_2.index_38 = this.curMovieSetName;
		} else {
			this.multilang_2.index_38 = $.i18n.prop('index_38');
		}

		g_mediaLibary.getMovieDetail( this.curMovieId, function() {

			var tempBackDrop = g_mediaLibary.curMovieDetail.backdrop
			if (tempBackDrop) {
				var urlImage = 'url(' + tempBackDrop + ')';
				//$(".videobg").css("background-image", urlImage );

				ChangeBackground(urlImage);
			} else {
				ChangeBackground(null);
			}

			$(".content_layer3").css("display","block");
	
			g_siderBar.setAutoHide( true );

			$("#pl_layer3").setTemplateURL("../template/movie_detail.tpl?" + AppVersion);
			$("#pl_layer3").setParam('title', g_movieControl.multilang_2);
			$("#pl_layer3").setParam('flag', g_multiMediaControl.flag);
			$("#pl_layer3").processTemplate(g_mediaLibary.curMovieDetail);

			$(".content_layer3 .mainblock").focus();
			isShowStarsJt();
		});
	},

	getNextPreDetail: function( bNext ) {
		var _this = this;
		var tempMovieId = -1;
		var tempMovieIndex = this.curMovieIndex;

		this.movieSetControl.isMovieSet = this.movieDatas[tempMovieIndex].setflag;

		if (this.movieSetControl.isMovieSet) {
			if (this.movieSetControl.curIndexInSet == -1) {
				this.movieSetControl.curIndexInSet = 0;
			}

			if (bNext) {
				this.movieSetControl.curIndexInSet = this.movieSetControl.curIndexInSet + 1;
			} else {
				this.movieSetControl.curIndexInSet = this.movieSetControl.curIndexInSet - 1;
			}

			var index = this.movieSetControl.curIndexInSet;
			if (index < 0 || index  == this.movieSetControl.setDatas.length) {
				this.movieSetControlReset(index);

				if (bNext) {
					tempMovieIndex = tempMovieIndex + 1;
				} else {
					tempMovieIndex = tempMovieIndex - 1;
				}
			}
		} else {
			if (bNext) {
				tempMovieIndex = tempMovieIndex + 1;
			} else {
				tempMovieIndex = tempMovieIndex - 1;
			}
		}

		if (tempMovieIndex > -1 && tempMovieIndex < this.movieDatas.length) {
			tempMovieId = this.movieDatas[tempMovieIndex].fileid;
			this.movieSetControl.isMovieSet = this.movieDatas[tempMovieIndex].setflag;
		}

		if (tempMovieId == -1 ) {
			return;
		}

		if (this.movieSetControl.isMovieSet) {
			this.curMovieIndex = tempMovieIndex;

			if (this.movieSetControl.curIndexInSet == -1) {
				if (this.movieSetControl.left) {
					this.movieSetControl.curIndexInSet = this.movieDatas[tempMovieIndex].filecount - 1;
				}

				if (this.movieSetControl.right) {
					this.movieSetControl.curIndexInSet = 0;
				}

				if (this.movieSetControl.curIndexInSet == -1) {
					this.movieSetControl.curIndexInSet = 0;
				}
			}

			if (this.movieSetControl.setDatas.length == 0) {
				g_mediaLibary.getMovieSetDatas(this.curLibIndex, tempMovieId, function() {
					_this.movieSetControl.setDatas = g_mediaLibary.movieSetDatas;
					tempMovieId = _this.movieSetControl.setDatas[_this.movieSetControl.curIndexInSet].fileid;
					_this.freshLeftOrRightClickPage(tempMovieId);
				});
			} else if (this.movieSetControl.curIndexInSet > -1 && this.movieSetControl.curIndexInSet < this.movieSetControl.setDatas.length) {
				tempMovieId = this.movieSetControl.setDatas[index].fileid;
				_this.freshLeftOrRightClickPage(tempMovieId);
			} else {
				g_mediaLibary.getMovieSetDatas(this.curLibIndex, tempMovieId, function() {
					_this.movieSetControl.setDatas = g_mediaLibary.movieSetDatas;

					if (bNext) {
						tempMovieId = _this.movieSetControl.setDatas[0].fileid;
						_this.movieSetControl.curIndexInSet = 0
					} else {
						tempMovieId = _this.movieSetControl.setDatas[_this.movieSetControl.setDatas.length - 1].fileid;
						_this.movieSetControl.curIndexInSet = _this.movieSetControl.setDatas.length - 1;
					}

					_this.freshLeftOrRightClickPage(tempMovieId);
				});
			}
		} else {
			this.curMovieIndex = tempMovieIndex;
			this.freshLeftOrRightClickPage(tempMovieId);
		}
	},

	freshLeftOrRightClickPage: function(movieId) {
		if (!!!movieId) {
			return;
		}

		g_mediaLibary.getMovieDetail( movieId, function() {
			var tempBackDrop = g_mediaLibary.curMovieDetail.backdrop
			if (tempBackDrop) {
				var urlImage = 'url(' + tempBackDrop + ')';
				//$(".videobg").css("background-image", urlImage );

				ChangeBackground(urlImage);
			} else {
				ChangeBackground(null);
			}

			$(".content_layer3").css("display","block");
	
			g_siderBar.setAutoHide( true );

			$("#pl_layer3").setTemplateURL("../template/movie_detail.tpl?" + AppVersion);
			$("#pl_layer3").setParam('title', g_movieControl.multilang_2);
			$("#pl_layer3").setParam('flag', g_multiMediaControl.flag);
			$("#pl_layer3").processTemplate(g_mediaLibary.curMovieDetail);
			isShowStarsJt();
		});
	},

	movieSetControlReset: function(index) {
		this.movieSetControl.isMovieSet = false;
		this.movieSetControl.curIndexInSet = -1;
		this.movieSetControl.left = false;
		this.movieSetControl.right = false;

		if (typeof (index) == "undefined") {
			this.movieSetControl.setDatas.length = 0;
			return;
		}

		if (index < 0) {
			this.movieSetControl.left = true;
		}

		if (index == this.movieSetControl.setDatas.length) {
			this.movieSetControl.right = true;
		}

		this.movieSetControl.setDatas.length = 0;
	},

    siderClickEvent: function(libraryIndex) {
		var _this = this;
		this.curLibIndex = libraryIndex;
		this.curMode = 0;

		if (g_sortandfilter.sortfilterInfo[libraryIndex].filterShow) {
			_this.freshMainPageFilter(libraryIndex);
		} else {
			if (g_mediaLibary.libraryDatas[libraryIndex].movieCount == g_mediaLibary.libraryDatas[libraryIndex].movieCountNew 
				&& g_mediaLibary.libraryDatas[libraryIndex].movieCount > 0) {
				_this.movieDatas = g_mediaLibary.libraryDatas[libraryIndex].movieDatas;
				_this.freshMainPage(libraryIndex);
				return;
			}

			$("#pl").empty();

			g_mediaLibary.getMovieDatas(libraryIndex, 0, 0, g_getMediaRange, function(index) {
				_this.movieDatas = g_mediaLibary.libraryDatas[libraryIndex].movieDatas;
				_this.freshMainPage(index);

				g_mediaLibary.libraryDatas[libraryIndex].movieCount = g_mediaLibary.libraryDatas[libraryIndex].movieCountNew;
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

	freshByScrollbar: function(params){
		var startPos = -1;
		for (var i = params.startPos; i < params.endPos; i++) {
			var data = this.movieDatas[i];
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
			g_mediaLibary.getMovieDatas( libraryIndex, curMode, nStartPos, nEndPos, function(index) {
				if ( curMode == 0 ) {
					g_movieControl.movieDatas = g_mediaLibary.libraryDatas[libraryIndex].movieDatas;
				} else if ( curMode == 4 ) {
					g_movieControl.movieDatas = g_mediaLibary.libraryDatas[libraryIndex].movieDatasFilter;
				}
				
				if (params.libIndex == g_siderBar.curSelectLibIndex && params.type == g_siderBar.curSelectType) {
					for (var i = nStartPos; i < nEndPos; i++) {
						g_movieControl.freshDataByIndex(i);
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
			var curData = this.movieDatas[nIndex];

			var lazyImgItem = $(".lazyload_img", curPageItem);
			lazyImgItem.attr("fileindex", curData.fileindex);
			lazyImgItem.attr("fileid", curData.fileid);
			lazyImgItem.attr("filepath", curData.filepath);

			var picPath = curData.thumbnail;
			lazyImgItem.attr("tempPath", picPath);
			picPath = 'url(' + picPath + ')';
			lazyImgItem.css("background-image", picPath);

			if (curData.setflag) {
				lazyImgItem.attr("mediatype", "movieset");

				$(curPageItem).removeClass("singlemovie click_movie");
				$(curPageItem).addClass("collectionmovie click_movieset");

				$(".singleimgbg", curPageItem).hide();
				$(".collectionbg", curPageItem).show();

				$(".Moviescount", curPageItem).text(curData.filecount);
			}

			var imgnameItem = $(".imgname", curPageItem);
			imgnameItem.attr("title", curData.name);
			imgnameItem.text(curData.name);
		}
	}
}