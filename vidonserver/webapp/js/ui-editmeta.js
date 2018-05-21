var g_editmeta;

var editMeta = function() {
	g_editmeta = this;
}; 

editMeta.prototype = {
	titles: {},
	metaDatas: {
		mediaType: 1,
		geninfo: {
			movieName: "",
			collectionLabel: "",
			director: "",
			year: "",
			country: "",
			type: "",
			mpaa: "",
			rate: "",
			details: ""
		},
		selectedPoster: 1,
		posterList: [],
		selectedBackgrund: 0,
		backgroundList: [],
		aboutUrl: ""
	},
	metaStaticDatas: {},
	curFileId: -1,
	curSetId: -1,
	curDom: {},
	curMediaType: "",
	localPicForUpload: [],

    init: function( domPosition ) {
    	this.bindControls();
    },

	getMediaPictures: function() {
		vidonme.rpc.request({
			'context': this,
			'method': "VideoLibrary.GetMediaPictures",
			'params': {
				"mediaid": g_editmeta.curFileId,
				"mediatype": g_editmeta.curMediaType
			},
			'success': function(data) {
				if (data && data.result.pictures ) {
					var posters = [];
					var backdrops = [];

					for (var i = 0; i <  data.result.pictures.backdrops.length; i++) {
						 var backdrop = {};
						 backdrop.picid = data.result.pictures.backdrops[i].picid;

						 if ( backdrop.picid == data.result.pictures.activebackdrop ) {
						 	backdrop.actived = true;
						 } else {
						 	backdrop.actived = false;
						 }

						 backdrop.url = encodeImage( data.result.pictures.backdrops[i].path );
						 backdrops.push( backdrop );
					};

					for (var i = 0; i <  data.result.pictures.posters.length; i++) {
						 var poster = {};
						 poster.picid = data.result.pictures.posters[i].picid;

						 if ( poster.picid == data.result.pictures.activeposter ) {
						 	poster.actived = true;
						 } else {
						 	poster.actived = false;
						 }

						 poster.url = encodeImage( data.result.pictures.posters[i].path );
						 posters.push( poster );
					};

					g_editmeta.metaDatas.selectedPoster = data.result.pictures.activeposter;
					g_editmeta.metaDatas.posterList = posters;
					g_editmeta.metaDatas.selectedBackgrund = data.result.pictures.activebackdrop;
					g_editmeta.metaDatas.backgroundList = backdrops;
				}
				else {
					g_editmeta.metaDatas.selectedPoster = -1;
					g_editmeta.metaDatas.posterList = [];
					g_editmeta.metaDatas.selectedBackgrund = -1;
					g_editmeta.metaDatas.backgroundList = [];
				}

				g_editmeta.clickinit( 1 );
			}
		});
	},

    clickMovieItem: function(){
    	g_mediaLibary.getMovieDetail( this.curFileId, function() {
			var tempDetailData = g_mediaLibary.curMovieDetail;

			g_editmeta.metaDatas.mediaType = 1;
			g_editmeta.metaDatas.geninfo.movieName = tempDetailData.title;
			g_editmeta.metaDatas.geninfo.director = tempDetailData.director;
			g_editmeta.metaDatas.geninfo.year = tempDetailData.year;
			g_editmeta.metaDatas.geninfo.country = tempDetailData.country;
			g_editmeta.metaDatas.geninfo.type = tempDetailData.genre;
			g_editmeta.metaDatas.geninfo.mpaa = tempDetailData.mpaa;
			g_editmeta.metaDatas.geninfo.rate = tempDetailData.strrating;
			g_editmeta.metaDatas.geninfo.details = tempDetailData.plot;
			g_editmeta.metaDatas.aboutUrl = handleUrl(tempDetailData.filepath, true, true);

			g_editmeta.getMediaPictures();
		});
    },

    clickTVShowItem: function(type) {
    	if (typeof (type) == "undefined") {
    		return;
    	}

    	if (type == "tvshow") {
	    	g_mediaLibary.getTVShowDetail( this.curFileId, function() {
				var tempDetailData = g_mediaLibary.curTVShowDetail;

				g_editmeta.metaDatas.mediaType = 1;
				g_editmeta.metaDatas.geninfo.movieName = tempDetailData.title;
				g_editmeta.metaDatas.geninfo.director = tempDetailData.director;
				g_editmeta.metaDatas.geninfo.year = tempDetailData.year;
				g_editmeta.metaDatas.geninfo.country = tempDetailData.country;
				g_editmeta.metaDatas.geninfo.type = tempDetailData.genre;
				g_editmeta.metaDatas.geninfo.mpaa = tempDetailData.mpaa;
				g_editmeta.metaDatas.geninfo.rate = tempDetailData.strrating;
				g_editmeta.metaDatas.geninfo.details = tempDetailData.plot;
				g_editmeta.metaDatas.aboutUrl = handleUrl(g_editmeta.curFilePath, true, true);

				g_editmeta.getMediaPictures();
			});
    	} else if (type == "episode" || type == "episodedetails") {
			var curTVShowSeasonId = g_mediaLibary.curTVShowSeason[g_tvshowControl.curSeasonIndex].iseason;
			var episode = g_tvshowControl.curEpisode;

	    	g_mediaLibary.getEpisodeDetails(this.curFileId, curTVShowSeasonId, Number(episode), function() {
				var tempDetailData = g_mediaLibary.curTVShowEpisodeDetail;

				var seasonTitle = $.i18n.prop('index_179');
				seasonTitle = seasonTitle.format(curTVShowSeasonId);

				var episodeTitle = $.i18n.prop('index_240');
				episodeTitle = episodeTitle.format(Number(episode));

				g_editmeta.metaDatas.mediaType = 1;
				g_editmeta.metaDatas.geninfo.movieName = tempDetailData.title + " " + seasonTitle + " " + episodeTitle;
				g_editmeta.metaDatas.geninfo.director = tempDetailData.director;
				g_editmeta.metaDatas.geninfo.year = tempDetailData.year;
				g_editmeta.metaDatas.geninfo.country = tempDetailData.country;
				g_editmeta.metaDatas.geninfo.type = tempDetailData.genre;
				g_editmeta.metaDatas.geninfo.mpaa = tempDetailData.mpaa;
				g_editmeta.metaDatas.geninfo.rate = tempDetailData.strrating;
				g_editmeta.metaDatas.geninfo.details = tempDetailData.plot;
				g_editmeta.metaDatas.aboutUrl = handleUrl(g_editmeta.curFilePath, true, true);

				g_editmeta.getMediaPictures();
			});
    	}
    },

	clickVideoItem: function() {
		g_mediaLibary.getVideoDetail(this.curFileId, function() {
			var tempDetailData = g_mediaLibary.curVideoDetail;

			g_editmeta.metaDatas.mediaType = 1;
			g_editmeta.metaDatas.geninfo.movieName = tempDetailData.title;
			g_editmeta.metaDatas.geninfo.director = tempDetailData.director;
			g_editmeta.metaDatas.geninfo.year = tempDetailData.year;
			g_editmeta.metaDatas.geninfo.country = tempDetailData.country;
			g_editmeta.metaDatas.geninfo.type = tempDetailData.genre;
			g_editmeta.metaDatas.geninfo.mpaa = tempDetailData.mpaa;
			g_editmeta.metaDatas.geninfo.rate = tempDetailData.strrating;
			g_editmeta.metaDatas.geninfo.details = tempDetailData.plot;
			g_editmeta.metaDatas.aboutUrl = handleUrl(g_editmeta.curFilePath, true, true);

			g_editmeta.getMediaPictures();
		});
	},

	clickinit: function(mediatype) { //mediaType 1电影、电视剧单集   2电视剧季集
		/*
		if (mediatype == 1) {
			this.metaDatas = {
				mediaType: 1,
				geninfo: {
					movieName: "aa",
					collectionLabel: "tetet",
					director: "etefdf",
					year: "dfdf",
					country: "dfdf",
					type: "dfdf",
					mpaa: "dfdf",
					rate: "dfdf",
					details: "aaaaa",
				},
				selectedPoster: 1,
				posterList: [{
					url: "../images/temp/poster_bg.jpg"
				}, {
					url: "../images/temp/poster_bg.jpg"
				}, {
					url: "../images/temp/poster_bg.jpg"
				}, {
					url: "../images/temp/poster_bg.jpg"
				}],
				slectedBackgrund: 0,
				backgroundList: [{
					url: "../images/temp/backgroundimg.jpg"
				}, {
					url: "../images/temp/backgroundimg.jpg"
				}, {
					url: "../images/temp/backgroundimg.jpg"
				}],
				aboutUrl: "about",
			}
		} else if (mediatype == 2) {
			this.metaDatas = {
				mediaType: 2,
				geninfo: {
					details: "",
				},
				selectedPoster: 0,
				posterList: [{
					url: "../images/temp/poster_bg.jpg"
				}, {
					url: "../images/temp/poster_bg.jpg"
				}, {
					url: "../images/temp/poster_bg.jpg"
				}, {
					url: "../images/temp/poster_bg.jpg"
				}],
				slectedBackgrund: 0,
				backgroundList: [{
					url: "../images/temp/backgroundimg.jpg"
				}, {
					url: "../images/temp/backgroundimg.jpg"
				}, {
					url: "../images/temp/backgroundimg.jpg"
				}],
				aboutUrl: "about",
			}
		}
		*/

		$("#popeditmeta").setTemplateURL("../template/popeditmeta.tpl?" + AppVersion);
		this.switchLanguage();
		$("#popeditmeta").processTemplate(this.metaDatas);
		showdiv('.popeditmeta', 1);
		$("#details").textareaAutosize_dc();
		this.updateScrollPosition();

		if (this.metaDatas.posterList.length != 0) {
			var selectIndex = 0;
			for (var i = 0; i < this.metaDatas.posterList.length; i++) {
				if ( this.metaDatas.posterList[i].actived ) {
					selectIndex = i;
					break; 
				};
			};
			$("#posterinner .posterblock").eq(selectIndex).addClass("selected");
		}

		if (this.metaDatas.backgroundList.length != 0) {
			var selectIndex = 0;
			for (var i = 0; i < this.metaDatas.backgroundList.length; i++) {
				if ( this.metaDatas.backgroundList[i].actived ) {
					selectIndex = i;
					break; 
				};
			};

			$("#backgroundinner .backgroundblock").eq(selectIndex).addClass("selected");
		}
	},

	getUploadPicPath: function( fileObj, callbackFunc ) {
		vidonme.rpc.request({
			'context': this,
			'method': "VideoLibrary.GetUploadPicPath",
			'params': {
				"mediaid": this.curFileId,
				"mediatype": this.curMediaType,
				"pictype": fileObj.type, // poster; backdrop 
				"path": fileObj.name,
				"size": fileObj.size
			},
			'success': function(data) {
				if ( data && data.result.upload ) {
					fileObj.picid = data.result.upload.picid;
					fileObj.path = data.result.upload.path;
					g_editmeta.localPicForUpload.push( fileObj );

					callbackFunc( fileObj );
				};
			}
		});
	},

	ajaxFileUpload: function(fileObj, callbackFunc) {
		$.ajaxFileUpload({
			url: '/posterupload/', //用于文件上传的服务器端请求地址
			secureuri: false, //一般设置为false
			fileElementId: fileObj.ctlid, //文件上传空间的id属性  <input type="file" id="file" name="file" />
			dataType: 'json', //返回值类型 一般设置为json
			data: {
				"path": fileObj.name,
				"mediaid": this.curFileId,
				"mediatype": this.curMediaType,
				"pictype": fileObj.type, // poster; backdrop
				"iseason": fileObj.isSeason
			},
			success: function(data, status) //服务器成功响应处理函数
			{
				if (data && data.ret) {
					fileObj.path = data.upload.path;
					fileObj.picid = data.upload.picid;
				} else {
					cansole.log("ajaxFileUpload failed.");
				}

				callbackFunc(fileObj);
			},
			error: function(data, status, e) //服务器响应失败处理函数
			{
				cansole.log("ajaxFileUpload failed.");
				callbackFunc(fileObj);
			}
		});
		return false;
	},

	bindControls: function() {
		$(".editbtn.type_movie").live("click", function(event) {
			event.stopPropagation();
			var objDom = $(this).parents(".img");
			var mediaid = parseInt(objDom.attr("fileid"));
			var path = objDom.attr("filepath");
			path = handleUrl(path, true, true);
			var title = objDom.siblings(".imgname").attr("title");
			if (typeof(title) == "undefined") {
				title = $(this).parents(".details_poster").siblings(".details_title_block").children(".item_title").text();
			}

			var fileIndex = parseInt(objDom.attr("fileindex"));
			if ( fileIndex ) {
				g_movieControl.curMovieIndex = fileIndex;
			}

			g_editmeta.curMediaType = "movie";
			g_editmeta.curFileId = mediaid;
			g_editmeta.curFilePath = path;
			g_editmeta.curFileTitle = title;
			g_editmeta.clickMovieItem();
		});

		$(".editbtn.type_tvshow").live("click", function(event) {
			event.stopPropagation();
			var objDom = $(this).parents(".img");
			var tvshowid = parseInt(objDom.attr("tvshowid"));
			var path = objDom.attr("filepath");
			path = handleUrl(path, true, true);
			var title = objDom.siblings(".imgname").attr("title");
			if (typeof(title) == "undefined") {
				title = $(this).parents(".details_poster").siblings(".details_title_block").children(".item_title").text();
			}

			var fileIndex = parseInt(objDom.attr("fileindex"));
			if ( fileIndex ) {
				g_tvshowControl.curTvshowIndex = fileIndex;
			}

			g_editmeta.curMediaType = "tvshow";
			g_editmeta.curFileId = tvshowid;
			g_editmeta.curFilePath = path;
			g_editmeta.curFileTitle = title;
			g_editmeta.clickTVShowItem(g_editmeta.curMediaType);
		});

		$(".editbtn.type_tvshow_episode").live("click", function(event) {
			event.stopPropagation();
			var objDom = $(this).parents(".img");
			var mediaid = parseInt(objDom.attr("fileid"));
			var path = objDom.attr("filepath");
			path = handleUrl(path, true, true);
			var title = objDom.siblings(".imgname").attr("title");
			if (typeof(title) == "undefined") {
				title = $(this).parents(".details_poster").siblings(".details_title_block").children(".item_title").text();
			}

			var fileIndex = parseInt(objDom.attr("fileindex"));
			if ( fileIndex ) {
				g_tvshowControl.curTvshowIndex = fileIndex;
			}

			g_editmeta.curMediaType = "episode";
			g_editmeta.curFileId = mediaid;
			g_editmeta.curFilePath = path;
			g_editmeta.curFileTitle = title;
			g_tvshowControl.curEpisode = objDom.attr("numepisode");
			g_editmeta.clickTVShowItem(g_editmeta.curMediaType);
		});

		$(".editbtn.type_tvshow_episodedetails").live("click", function(event) {
			event.stopPropagation();
			var objDom = $(this).parents(".img");
			var mediaid = parseInt(objDom.attr("fileid"));
			var path = objDom.attr("filepath");
			path = handleUrl(path, true, true);
			var title = objDom.siblings(".imgname").attr("title");
			if (typeof(title) == "undefined") {
				title = $(this).parents(".details_poster").siblings(".details_title_block").children(".item_title").text();
			}

			var fileIndex = parseInt(objDom.attr("fileindex"));
			if ( fileIndex ) {
				g_tvshowControl.curTvshowIndex = fileIndex;
			}

			g_editmeta.curMediaType = "episodedetails";
			g_editmeta.curFileId = mediaid;
			g_editmeta.curFilePath = path;
			g_editmeta.curFileTitle = title;
			g_editmeta.clickTVShowItem(g_editmeta.curMediaType);
		});

		$(".editbtn.type_video").live("click", function(event) {
			event.stopPropagation();
			var objDom = $(this).parents(".img");
			var mediaid = parseInt(objDom.attr("fileid"));
			var path = objDom.attr("filepath");
			path = handleUrl(path, true, true);
			var title = objDom.siblings(".imgname").attr("title");
			if (typeof(title) == "undefined") {
				title = $(this).parents(".details_poster").siblings(".details_title_block").children(".item_title").text();
			}

			var fileIndex = parseInt(objDom.attr("fileindex"));
			if ( fileIndex ) {
				g_video.curVideoIndex = fileIndex;
			}

			g_editmeta.curMediaType = "video";
			g_editmeta.curFileId = mediaid;
			g_editmeta.curFilePath = path;
			g_editmeta.curFileTitle = title;
			g_editmeta.clickVideoItem();
		});

		$("#selectFilePoster").live( "change", function() {
			var file = this;
			var tempFileObj = {};
			tempFileObj.type = "poster";
			tempFileObj.name = file.files[0].name;
			tempFileObj.size = file.files[0].size;
			tempFileObj.ctlid = 'selectFilePoster';
			tempFileObj.isSeason = 0;

			g_editmeta.ajaxFileUpload(tempFileObj, function(fileObj) {
				var picUrl = encodeImage( fileObj.path );
				$("#posterinner").append('<div class="mr20 posterblock"><div class="img"><img picid="' + fileObj.picid + '" src="' + picUrl + '" width="160" height="240"></div><div class="bg"></div></div>');
				$(".userdefined_scrollbar_meta").mCustomScrollbar("update");
				block1Height = $("#editmetacontent .editmetacon1").outerHeight();
				block2Height = $("#editmetacontent .editmetacon2").outerHeight();
				block3Height = $("#editmetacontent .editmetacon3").outerHeight();
			});

			/*
			g_editmeta.getUploadPicPath(tempFileObj, function( fileObj ) {
				g_editmeta.ajaxFileUpload( fileObj );
				
				if (file["files"] && file["files"][0]) {
					var reader = new FileReader();
					reader.onload = function(evt) {
						console.log(g_editmeta.metaDatas.backgroundList);
						$("#posterinner").append('<div class="mr20 posterblock"><div class="img"><img picid="' + fileObj.picid + '" src="' + evt.target.result + '" width="160" height="240"></div><div class="bg"></div></div>');
						$(".userdefined_scrollbar_meta").mCustomScrollbar("update");
						block1Height = $("#editmetacontent .editmetacon1").outerHeight();
						block2Height = $("#editmetacontent .editmetacon2").outerHeight();
						block3Height = $("#editmetacontent .editmetacon3").outerHeight();
					}
					reader.readAsDataURL(file.files[0]);
				}
			});
			*/
		});

		$("#selectFileBackground").live( "change", function() {
			var file = this;
			var tempFileObj = {};
			tempFileObj.type = "backdrop";
			tempFileObj.name = file.files[0].name;
			tempFileObj.size = file.files[0].size;
			tempFileObj.ctlid = "selectFileBackground";
			tempFileObj.isSeason = 0;

			g_editmeta.ajaxFileUpload(tempFileObj, function(fileObj) {
				var picUrl = encodeImage( fileObj.path );
				$("#backgroundinner").append('<div class="mr20 backgroundblock"><div class="img"><img picid="' + fileObj.picid + '" src="' + picUrl + '" width="250" height="137"></div><div class="bg"></div></div>');
				$(".userdefined_scrollbar_meta").mCustomScrollbar("update");
				block1Height = $("#editmetacontent .editmetacon1").outerHeight();
				block2Height = $("#editmetacontent .editmetacon2").outerHeight();
				block3Height = $("#editmetacontent .editmetacon3").outerHeight();
			});

			/*
			g_editmeta.getUploadPicPath(tempFileObj, function( fileObj ) {
				g_editmeta.ajaxFileUpload( fileObj );

				if (file["files"] && file["files"][0]) {
					var reader = new FileReader();
					reader.onload = function(evt) {
						console.log(g_editmeta.metaDatas.backgroundList);
						$("#backgroundinner").append('<div class="mr20 backgroundblock"><div class="img"><img picid="' + fileObj.picid + '" src="' + evt.target.result + '" width="250" height="137"></div><div class="bg"></div></div>');
						$(".userdefined_scrollbar_meta").mCustomScrollbar("update");
						block1Height = $("#editmetacontent .editmetacon1").outerHeight();
						block2Height = $("#editmetacontent .editmetacon2").outerHeight();
						block3Height = $("#editmetacontent .editmetacon3").outerHeight();
					}
					reader.readAsDataURL(file.files[0]);
				}
			});
			*/
		});

		/*
		//临时测试用
		$(".uploadPoster").live("click", function() {
			var url = "../images/temp/poster_bg.jpg";
			g_editmeta.metaDatas.posterList.push({
				url: url
			});
			console.log(g_editmeta.metaDatas.posterList);
			$("#posterinner").append('<div class="mr20 posterblock"><div class="img"><img src="' + url + '"width="160" height="240"></div><div class="bg"></div></div>');
			$(".userdefined_scrollbar_meta").mCustomScrollbar("update");
			block1Height = $("#editmetacontent .editmetacon1").outerHeight();
			block2Height = $("#editmetacontent .editmetacon2").outerHeight();
			block3Height = $("#editmetacontent .editmetacon3").outerHeight();

		});

		$(".uploadBg").live("click", function() {
			var url = "../images/temp/backgroundimg.jpg";

			var reader = new FileReader();
			reader.onload = function(evt) {
				console.log(g_editmeta.metaDatas.backgroundList);
				$("#backgroundinner").append('<div class="mr20 backgroundblock"><div class="img"><img src="' + evt.target.result + '" width="250" height="137"></div><div class="bg"></div></div>');
				$(".userdefined_scrollbar_meta").mCustomScrollbar("update");
				block1Height = $("#editmetacontent .editmetacon1").outerHeight();
				block2Height = $("#editmetacontent .editmetacon2").outerHeight();
				block3Height = $("#editmetacontent .editmetacon3").outerHeight();
			}
			reader.readAsDataURL(url);
			g_editmeta.metaDatas.backgroundList.push({
				url: url
			});
		});
		*/

		//点击海报
		$("#posterinner .posterblock").live("click", function() {
			$(this).addClass("selected").siblings().removeClass("selected");
			g_editmeta.metaDatas.selectedPoster = Number( $("img", this).attr( "picid" ) );
			console.log(g_editmeta.metaDatas.selectedPoster);
		});

		$("#backgroundinner .backgroundblock").live("click", function() {
			$(this).addClass("selected").siblings().removeClass("selected");
			g_editmeta.metaDatas.selectedBackgrund = Number( $("img", this).attr( "picid" ) );
			console.log(g_editmeta.metaDatas.selectedBackgrund);
		});

		var siderbar = $("#editmetaleft");
		
		siderbar.find(".geninfo").live( "click", function() {
			$(".userdefined_scrollbar_meta").mCustomScrollbar("scrollTo", ".editmetacon1");

		})
		siderbar.find(".poster").live( "click", function() {
			$(".userdefined_scrollbar_meta").mCustomScrollbar("scrollTo", ".editmetacon2");
		})
		siderbar.find(".background").live( "click", function() {
			$(".userdefined_scrollbar_meta").mCustomScrollbar("scrollTo", ".editmetacon3");
		})
		siderbar.find(".about").live( "click", function() {
			$(".userdefined_scrollbar_meta").mCustomScrollbar("scrollTo", ".editmetacon4");
		})

		$("#editMetaOk").live( "click", function() { //#editMetaCancel
			var mediatype = g_editmeta.metaDatas.mediaType;
			if (mediatype == 1) {
				g_editmeta.metaDatas.geninfo.movieName = $("#movieName").val();
				g_editmeta.metaDatas.geninfo.collectionLabel = $("#collectionLabel").val();
				g_editmeta.metaDatas.geninfo.director = $("#director").val();
				g_editmeta.metaDatas.geninfo.year = $("#year").val();
				g_editmeta.metaDatas.geninfo.country = $("#country").val();
				g_editmeta.metaDatas.geninfo.type = $("#type").val();
				g_editmeta.metaDatas.geninfo.mpaa = $("#mpaa").val();
				g_editmeta.metaDatas.geninfo.rate = $("#rate").val();
				g_editmeta.metaDatas.geninfo.details = $("#details").val();
				g_editmeta.metaDatas.aboutUrl = $("#aboutUrl").val();
				console.log(g_editmeta.metaDatas);

				g_editmeta.saveMetaChanges();
			} else if (mediatype == 2) {
				g_editmeta.metaDatas.geninfo.details = $("#details").val();
				g_editmeta.metaDatas.aboutUrl = $("#aboutUrl").val();
			} else if (mediatype == 3) {
				g_editmeta.SetMovieSetAlias(g_editmeta.curSetId, $("#movieName").val(), function() {
					g_editmeta.curDom.siblings('p').text($("#movieName").val());
				});
			}

			close_box('.popeditmeta',1);
		});

		$("#editMetaCancel").live( "click", function() { 
			close_box('.popeditmeta', 1);
		});
	},

	updateScrollPosition: function() {
		this.block1Height = $("#editmetacontent .editmetacon1").outerHeight();
		this.block2Height = $("#editmetacontent .editmetacon2").outerHeight();
		this.block3Height = $("#editmetacontent .editmetacon3").outerHeight();

		$(".userdefined_scrollbar_meta").mCustomScrollbar({
			autoHideScrollbar: true,

			callbacks: {
				whileScrolling: function(el) {
					g_editmeta.scrollingFunc(this);
				}
			}
		});
	},

	scrollingFunc: function(el) {
		var siderbar = $("#editmetaleft");

		if (el.mcs.top == 0) {
			siderbar.find(".geninfo").addClass("selected").siblings().removeClass("selected");
		}
		if (-el.mcs.top >= this.block1Height) {
			siderbar.find(".poster").addClass("selected").siblings().removeClass("selected");
		}
		if (-el.mcs.top >= (this.block1Height + this.block2Height)) {
			siderbar.find(".background").addClass("selected").siblings().removeClass("selected");
		}
		if (-el.mcs.top >= (this.block1Height + this.block2Height + this.block3Height)) {
			siderbar.find(".about").addClass("selected").siblings().removeClass("selected");
		}
	},

    freshPage: function() { 
    	
    },

    switchLanguage:function(){ 
    	this.titles = {
		 	"metatitle":$.i18n.prop('editmeta_title'),
		 	"sider_1":$.i18n.prop('editmeta_1'),
		 	"sider_2":$.i18n.prop('editmeta_2'),
		 	"sider_3":$.i18n.prop('editmeta_3'),
		 	"sider_4":$.i18n.prop('editmeta_4')
	 	};
	 	this.metaStaticDatas={ 
	 			geninfoStr_1:$.i18n.prop('editmeta_5'),
	 			geninfoStr_3:$.i18n.prop('editmeta_6'),
	 			geninfoStr_4:$.i18n.prop('editmeta_7'),
	 			geninfoStr_5:$.i18n.prop('editmeta_8'),
	 			geninfoStr_6:$.i18n.prop('editmeta_9'),
	 			geninfoStr_7:$.i18n.prop('editmeta_10'),
	 			geninfoStr_8:$.i18n.prop('editmeta_11'),
	 			geninfoStr_9:$.i18n.prop('editmeta_12'),
	 			geninfoStr_10:$.i18n.prop('editmeta_14'),
	 			geninfoStr_11:$.i18n.prop('editmeta_13'),
	 			btn_1:$.i18n.prop('index_81'),
	 			btn_2:$.i18n.prop('index_25')
	 		};
	 	$("#popeditmeta").setParam('title', this.titles);
    	$("#popeditmeta").setParam('metaStaticDatas', this.metaStaticDatas);
    },

    saveMetaChanges: function() {
    	var infos = {};

    	infos.title = g_editmeta.metaDatas.geninfo.movieName;
    	infos.setname = "";
    	infos.directors = stringToArray( g_editmeta.metaDatas.geninfo.director );
    	infos.year = Number( g_editmeta.metaDatas.geninfo.year );
    	infos.countrys = stringToArray( g_editmeta.metaDatas.geninfo.country );
    	infos.genres = stringToArray( g_editmeta.metaDatas.geninfo.type );
    	infos.mpaarating = g_editmeta.metaDatas.geninfo.mpaa;
    	infos.rating = g_editmeta.metaDatas.geninfo.rate;
    	infos.plot = g_editmeta.metaDatas.geninfo.details;
    	infos.activeposter = g_editmeta.metaDatas.selectedPoster;
    	infos.activebackdrop = g_editmeta.metaDatas.selectedBackgrund;
    	infos.tagline = "";

    	vidonme.rpc.request({
			'context': this,
			'method': "VideoLibrary.EditBasicInfos",
			'params': {
				"mediaid": this.curFileId,
				"mediatype": (this.curMediaType == "episodedetails") ? "episode" : this.curMediaType,
				"infos": infos
			},
			'success': function(data) {
				if (data && data.result) {
					if ( g_editmeta.curMediaType == "movie" ) {
						g_movieControl.freshAfterEditMeta();
					} else if ( g_editmeta.curMediaType == "tvshow" ) {
						g_tvshowControl.freshAfterEditMeta("tvshow");
					} else if ( g_editmeta.curMediaType == "video" ) {
						g_video.freshAfterEditMeta();
					} else if (g_editmeta.curMediaType == "episode") {
						g_tvshowControl.freshAfterEditMeta("episode");
					} else if (g_editmeta.curMediaType == "episodedetails") {
						g_tvshowControl.freshAfterEditMeta("episodedetails");
					}
				}
			}
		});
    },

	SetMovieSetAlias: function(setId, alias, callbackFunc) {
		if ((setId < 0) || (typeof(setId) == "undefined")
		 || (alias == "" ) || (typeof (alias) == "undefined"))
		{
			return;
		}

    	vidonme.rpc.request({
			'context': this,
			'method': "VidOnMe.SetMovieSetAlias",
			'params': {
				"setId": setId,
				"alias": alias
			},
			'success': function(data) {
				if (!!callbackFunc)
				{
					callbackFunc();
				}
			}
		});
	}
   
}

function stringToArray(inputStr) {
	var tempArray = inputStr.split(",");
	var resultArray = [];
	for (var i = 0; i < tempArray.length; i++) {
		var str = tempArray[i];
		str = str.replace(/^\s+|\s+$/g,"");
		resultArray.push( str );
	}

	return resultArray;
}