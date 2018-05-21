var g_video;

var Video = function() {
	g_video = this;
}; 

Video.prototype = {
	videoDatas:[],
	curVideoId: -1,
	curVideoIndex: -1,
	pageItems:{},
	curMode: 0,

	init: function( domPosition ) {
		var _this = this;

		this.switchLanguage();

		$(".click_video .img").live( "click", function() {
			if(!$(this).parents(".box2").hasClass("waitselect")){
				var strFileid = $(this).attr( "fileid" );
				var strFileIndex = $(this).attr( "fileindex" );
				
				if ( strFileid ) {
					g_multiMediaControl.flag.classify = true;
					_this.curVideoId = Number(strFileid);
					_this.curVideoIndex = Number( strFileIndex );
					_this.freshDetailPage();
				};
			}			
		});

		$(".click_video_inmultipage .img").live( "click", function() {
			if(!$(this).parents(".box").hasClass("waitselect")){
				var strFileid = $(this).attr( "fileid" );
				var strFileIndex = $(this).attr( "fileindex" );
				
				if ( strFileid ) {
					g_multiMediaControl.flag.classify = false;
					_this.curVideoId = Number(strFileid);
					_this.curVideoIndex = Number( strFileIndex );
					_this.freshDetailPage();
				};
			}			
		});

		$(".click_backvideo").live("click", function() {
			$(".content_layer2").css("display", "none");
			$(".content_layer3").css("display", "none");
			g_siderBar.setAutoHide(false);
		});

		$("#video_detail_jt .right").live("click", function() {
			g_video.getNextPreDetail(true);
		});

		$("#video_detail_jt .left").live("click", function() {
			g_video.getNextPreDetail(false);
		});
	},

	getNextPreDetail: function( bNext ) {
		var _this = this;
		var tempVideoId = -1;
		var tempVideoIndex = this.curVideoIndex;

		if (bNext) {
			tempVideoIndex = tempVideoIndex + 1;
		} else {
			tempVideoIndex = tempVideoIndex - 1;
		}

		if (tempVideoIndex > -1 && tempVideoIndex < this.videoDatas.length) {
			tempVideoId = this.videoDatas[tempVideoIndex].idfile;
		}

		if (tempVideoId == -1 ) {
			return;
		}

		this.curVideoIndex = tempVideoIndex;
		this.freshLeftOrRightClickPage(tempVideoId);
	},

	freshLeftOrRightClickPage: function(videoId) {
		if (!!!videoId) {
			return;
		}

		g_mediaLibary.getVideoDetail( videoId, function() {
			var tempBackDrop = g_mediaLibary.curVideoDetail.backdrop
			if (tempBackDrop) {
				var urlImage = 'url(' + tempBackDrop + ')';
				ChangeBackground(urlImage);
			} else {
				ChangeBackground(null);
			}

			$(".content_layer3").css("display","block");
	
			g_siderBar.setAutoHide( true );

			$("#pl_layer3").setTemplateURL("../template/video_detail.tpl?" + AppVersion);
			$("#pl_layer3").setParam('title', g_video.multilang_2);
			g_multiMediaControl.flag.classify = true;
			$("#pl_layer3").setParam('flag', g_multiMediaControl.flag);
			$("#pl_layer3").processTemplate(g_mediaLibary.curVideoDetail);
			isShowStarsJt();
		});
	},

	freshPage: function(libIndex) {
		if (g_siderBar.checkIsFreshCurPage(libIndex, 2) != true) {
			return;
		}

		if ( !g_siderBar.checkIsInMainPage() ) {
			$(".content_layer2").css("display", "none");
			$(".content_layer3").css("display", "none");
			$(".content_layer4").css("display", "none");
			$(".content_layer5").css("display", "none");

			g_siderBar.setAutoHide( false );
			g_index.freshMainPage();
		}

		$("#pl").setTemplateURL("../template/video.tpl?" + AppVersion);
		$("#pl").processTemplate(this.videoDatas);

		this.pageItems = $("#pl .lazyload_item");
		g_scrollBarControl.freshMoviePage();

		g_topBarControl.changeMediaNum(g_mediaLibary.libraryDatas[libIndex].videoCount);
	},

	freshMainPageSort: function( libIndex ) {
		g_mediaLibary.libraryDatas[libIndex].videoDatas = [];
		g_mediaLibary.getVideoDatas(libIndex, 0, 0, g_getMediaRange, function(index) {
			$("#pl").processTemplate( g_mediaLibary.libraryDatas[libIndex].videoDatas );

			g_video.videoDatas = g_mediaLibary.libraryDatas[libIndex].videoDatas;

			this.pageItems = $("#pl .lazyload_item");
			g_scrollBarControl.freshMoviePage();

			g_topBarControl.changeMediaNum(g_mediaLibary.libraryDatas[libIndex].videoCount);
		});
	},

    siderClickEvent: function(libIndex) {
    	this.curMode = 0;
    	if ( g_mediaLibary.libraryDatas[libIndex].videoCount > 0
    	&& g_mediaLibary.libraryDatas[libIndex].videoCount == g_mediaLibary.libraryDatas[libIndex].videoCountNew ) {
    		this.videoDatas = g_mediaLibary.libraryDatas[libIndex].videoDatas;
			this.freshPage(libIndex);
			return;
    	}

    	$("#pl").empty();

    	g_mediaLibary.getVideoDatas(libIndex, 0, 0, g_getMediaRange, function(index) {
			g_video.videoDatas = g_mediaLibary.libraryDatas[libIndex].videoDatas;
			g_video.freshPage(libIndex);

			g_mediaLibary.libraryDatas[libIndex].videoCount = g_mediaLibary.libraryDatas[libIndex].videoCountNew;

			//g_siderBar.freshCount();
		});
	},

	freshAfterEditMeta: function() {
		var curVideoIndex = this.curVideoIndex;
		var videoDatas = this.videoDatas;

		if (curVideoIndex > -1 && curVideoIndex < videoDatas.length) {
			var curFileId = videoDatas[curVideoIndex].idfile;

			g_mediaLibary.getVideoDetail(curFileId, function() {
				videoDatas[curVideoIndex].title = g_mediaLibary.curVideoDetail.title;
				videoDatas[curVideoIndex].thumbnail = g_mediaLibary.curVideoDetail.thumbnail;
				
				var isInDetailPage = g_tvshowControl.checkIsInDetailPage();

				if (isInDetailPage) {
					var tempBackDrop = g_mediaLibary.curVideoDetail.backdrop;
					if (tempBackDrop) {
						var urlImage = 'url(' + tempBackDrop + ')';

						ChangeBackground(urlImage);
					} else {
						ChangeBackground(null);
					}

					$("#pl_layer3").processTemplate(g_mediaLibary.curVideoDetail);
				} else {
					$("#pl").processTemplate(videoDatas);
					g_scrollBarControl.freshMoviePage();
				}
			});
		};
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
			var data = this.videoDatas[i];
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
			g_mediaLibary.getVideoDatas( libraryIndex, curMode, nStartPos, nEndPos, function(index) {
				g_video.videoDatas = g_mediaLibary.libraryDatas[libraryIndex].videoDatas;
				
				if (params.libIndex == g_siderBar.curSelectLibIndex && params.type == g_siderBar.curSelectType) {
					for (var i = nStartPos; i < nEndPos; i++) {
						g_video.freshDataByIndex(i);
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
			var curData = this.videoDatas[nIndex];

			var lazyImgItem = $(".lazyload_img", curPageItem);
			lazyImgItem.attr("fileindex", curData.fileindex);
			lazyImgItem.attr("fileid", curData.idfile);
			lazyImgItem.attr("filepath", curData.file);

			var picPath = curData.thumbnail;
			lazyImgItem.attr("tempPath", picPath);
			picPath = 'url(' + picPath + ')';
			lazyImgItem.css("background-image", picPath);

			var imgnameItem = $(".imgname", curPageItem);
			imgnameItem.attr("title", curData.title);
			imgnameItem.text(curData.title);
		}
	},

	freshDetailPage: function() {
		g_mediaLibary.getVideoDetail(this.curVideoId, function() {
			var tempBackDrop = g_mediaLibary.curVideoDetail.backdrop
			if (!!tempBackDrop) {
				var urlImage = 'url(' + tempBackDrop + ')';
				ChangeBackground(urlImage);
			} else {
				ChangeBackground(null);
			}

			$(".content_layer3").css("display", "block");
	
			g_siderBar.setAutoHide(true);

			$("#pl_layer3").setTemplateURL("../template/video_detail.tpl?" + AppVersion);
			$("#pl_layer3").setParam('title', g_video.multilang_2);
			$("#pl_layer3").setParam('flag', g_multiMediaControl.flag);
			$("#pl_layer3").processTemplate(g_mediaLibary.curVideoDetail);

			$(".content_layer3 .mainblock").focus();
		})
	},

	switchLanguage: function() {
		this.multilang = {
			"index_40": $.i18n.prop('index_40')
		};

		this.multilang_1 = {
			"index_40": $.i18n.prop('index_40')
		};

		this.multilang_2 = {
			"index_40": $.i18n.prop('index_40'),
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
	}
}