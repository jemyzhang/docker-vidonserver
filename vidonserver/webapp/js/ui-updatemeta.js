var g_metaInfoControl;

var MetaInfoControl = function() {
	g_metaInfoControl = this;
}; 

MetaInfoControl.prototype = {
	divPosition: {},
	curData: {},
	multilang: {},
	init: function(domPosition) {
		this.divPosition = domPosition;
		g_objsSwitchLanguage.push( this );

		this.switchLanguage();
		
		this.curData = {
			pageIndex: 0,
			firstPage: {
				path: 'D:/test.iso',
				name: 'test'

			},
			secondPage: [{
				imgsrc: 'http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/5/59e90418.jpg',
				name: 'Jurassic World',
				time: '2015-6-12'
			}, {
				imgsrc: 'http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/5/59e90418.jpg',
				name: 'Jurassic World',
				time: '2015-6-12'
			}, {
				imgsrc: 'http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/5/59e90418.jpg',
				name: 'Jurassic World',
				time: '2015-6-12'
			}, {
				imgsrc: 'http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/5/59e90418.jpg',
				name: 'Jurassic World',
				time: '2015-6-12'
			}, {
				imgsrc: 'http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/5/59e90418.jpg',
				name: 'Jurassic World',
				time: '2015-6-12'
			}]
		};

		domPosition.setTemplateURL("../template/updatemeta.tpl?" + AppVersion);
		domPosition.setParam('multilang', this.multilang);
		domPosition.processTemplate(this.curData);
		$(".userdefined_scrollbar").mCustomScrollbar({
		  autoHideScrollbar:true
        });

		//meta信息
		var updatemetablock = $(".updatemetablock");
		var updatemetainnerWidth = $(".updatemetainner").width();

		$("#updateType li").click(function() {
			if(!$(this).hasClass("disable")){
			
				$(this).addClass("selected").siblings().removeClass("selected");
				$("#videosearchbtn").removeClass("btn-disable");
			}
			
		})

		$("#videosearchbtn").click(function() {
			if ($(this).hasClass("btn-blue")) {
				if (!$(this).hasClass("btn-disable")) {
					if (!updatemetablock.is(":animated")) {
						updatemetablock.animate({
							left: -updatemetainnerWidth
						}, 500);
					}
				}
			}
		})
		$(".updatemeta .backbtn").click(function() {
			if (!updatemetablock.is(":animated")) {
				updatemetablock.animate({
					left: 0
				}, 500);
			}
		})

		$(".updatevideoblock").live("click", function() {
			$(this).addClass("selected").siblings().removeClass("selected");
			$("#updateMetaFinishBtn").removeClass("btn-disable");
		})

		$("#updatetoTVShow").live("click", function() {
			g_MetaInfo.setType("tvshow");
			g_metaInfoControl.changeMetaFixPageBtnStatus();
		});

		$("#videosearchbtn").click(function() {
			if ($(this).hasClass("btn-blue")) {
				g_metaInfoControl.searchScraperList();
			}
		});

		$("#videoname").bind("propertychange input", function() {
			g_metaInfoControl.changeMetaFixPageBtnStatus();
		});

		$(".updatemetabtn").live("click", function(event) {
			g_metaInfoControl.initMetaPage();

			var objDom = $(this).parents(".img");
			g_MetaInfo = new Vidon_MetaInfo();
			var mediaid = parseInt(objDom.attr("fileid"));
			var path = objDom.attr("filepath");
			path = handleUrl(path, true, true);
			var title = objDom.siblings(".imgname").attr("title");
			if (typeof(title) == "undefined") {
				title = $(this).parents(".details_poster").siblings(".details_title_block").children(".item_title").text();
			}

			var reg=new RegExp("[_.-]","g");
			title = title.replace(reg," ");
			title = title.replace(/\s+/g, " ");

			var mediaType = objDom.attr("mediatype");
			if ( !mediaType ) {
				mediaType = "video";
			}

			g_MetaInfo.SetOriginal(mediaid, title, path, mediaType);
			$("#updatemetapath").text(path);
			$("#videoname").val(title);
			showdiv('.updatemeta', 1);
			if (mediaType == "tvshow") {
				$("#updatetoMoive").addClass("disable");
				$("#updatetoVideo").addClass("disable");

				$("#updatetoMoive").die("click");
				$("#updatetoVideo").die("click");
			} else {
				$("#updatetoMoive").removeClass("disable");
				$("#updatetoVideo").removeClass("disable");

				$("#updatetoMoive").live("click", function() {
					g_MetaInfo.setType("movie");
					g_metaInfoControl.changeMetaFixPageBtnStatus();
				});
				
				$("#updatetoVideo").live("click", function() {
					g_MetaInfo.setType("video");
					g_metaInfoControl.changeMetaFixPageBtnStatus();
				});
			}

			$("#updateMetaFinishBtn").addClass("btn-white btn-disable").removeClass("btn-blue");
			event.stopPropagation();
		});

		$(".updatevideoblock").live("click", function() {
			var netid = $(this).attr("netid");
			var title = $(this).attr("title");
			g_MetaInfo.setNetID(parseInt(netid));
			g_MetaInfo.setTitle(title);
			g_metaInfoControl.changeMetaFixPageBtnStatus();
		});

		$("#updateMetaFinishBtn").click(function() {
			if ($(this).hasClass("btn-blue")) {
				g_metaInfoControl.doFixMetaInfo();
			}
		});

		$("#updateMetaCancelBtn").click(function() {
			g_MetaInfo = {};
		});

		$(".popupdatemetaClose").click(function() {
			g_MetaInfo = {};
		});

		$(".updatemeta .backbtn").click(function() {
			g_MetaInfo.back();
			g_metaInfoControl.changeMetaFixPageBtnStatus();
		});
	},
	
	switchLanguage: function() {
		this.multilang = {
				title_1: $.i18n.prop('index_77'),
				index_219: $.i18n.prop('index_219'),
				index_220: $.i18n.prop('index_220'),

				index_221: $.i18n.prop('index_221'),
				index_222: $.i18n.prop('index_222'),
				index_38: $.i18n.prop('index_38'),
				index_39: $.i18n.prop('index_39'),
				index_40: $.i18n.prop('index_40'),
				index_223: $.i18n.prop('index_223'),
				index_224: $.i18n.prop('index_224'),
				index_225: $.i18n.prop('index_225'),
				index_233: $.i18n.prop('index_233'),
				index_25: $.i18n.prop('index_25'),
				index_26: $.i18n.prop('index_26')
			};
	},

	initMetaPage: function(){
		$(".updatemetablock").css("left",0);
		$("#videoname").val("");
		$("#updateType li").removeClass("selected");
		$(".updatevideoblock").removeClass("selected");
		$("#videosearchbtn").addClass("btn-disable");
	},

	changeMetaFixPageBtnStatus: function() {
		var title = $("#videoname").val();
		var type = g_MetaInfo.scrapertype;
		var netid = g_MetaInfo.activeNetId;
		var scrapefrom = g_MetaInfo.scraperfrom;
		var seltitle = g_MetaInfo.newTitle;

		if (type == "video") {
			if (title) {
				$("#videosearchbtn").removeClass("btn-blue").addClass("btn-white btn-disable");
				$("#updateMetaFinishBtn").addClass("btn-blue").removeClass("btn-white btn-disable");
			} else {
				$("#videosearchbtn").removeClass("btn-blue").addClass("btn-white btn-disable");
				$("#updateMetaFinishBtn").removeClass("btn-blue").addClass("btn-white btn-disable");
			}
		} else if (type == "movie" || type == "tvshow") {
			if (title) {
				$("#videosearchbtn").addClass("btn-blue").removeClass("btn-white btn-disable");
			} else {
				$("#videosearchbtn").removeClass("btn-blue").addClass("btn-white btn-disable");
			}

			if (netid && scrapefrom && seltitle) {
				$("#updateMetaFinishBtn").addClass("btn-blue").removeClass("btn-white btn-disable");
			} else {
				$("#updateMetaFinishBtn").removeClass("btn-blue").addClass("btn-white btn-disable");
			}
		}
	},

	cbHandleScrapeByNetId: function(data,obj){
		if(data.result.ret){
			//关闭窗口
			g_metaInfoControl.closeMetaFixBox();
			//弹成功信息
			g_mediaLibary.startScanLibary( g_siderBar.curSelectLibIndex );
			//RefreshMediaLibrary("commercial");
			//g_mediaLibary.getLibraryDatas();
		}
		else{
			//弹出错信息
			//data.result.msg
			PopupAlert(data.result.msg);
		}
	},

	closeMetaFixBox: function() {
		close_box('.updatemeta',1);
		//g_MetaInfo.init();
		g_MetaInfo = {};
	},

	doFixMetaInfo: function() {
		var netid 		= g_MetaInfo.activeNetId;
		var scraperfrom = g_MetaInfo.scraperfrom;
		var scrapertype = g_MetaInfo.scrapertype;
		var title = (typeof (g_MetaInfo.newTitle) != "undefined" && g_MetaInfo.newTitle != "") ? g_MetaInfo.newTitle : $("#videoname").val();

		if ((g_MetaInfo.type == "movie" || g_MetaInfo.type == "video") && g_MetaInfo.scrapertype == "video") {
			var objParam = {
				//mediaid":204,"mediatype":"video","scrapername":"The Expendables 3","scrapertype":"movie
				"mediaid": g_MetaInfo.mediaid,
				"mediatype": g_MetaInfo.type,
				"scrapername": $("#videoname").val(),
				"scrapertype":scrapertype
			};

			RequestScraperDetails(objParam);
		} else {
			var objParam = {
				//"mediaid":204,"mediatype":"video","netid":138103,"scrapertype":"movie","scraperfrom":1
				"mediaid": g_MetaInfo.mediaid,
				"mediatype": g_MetaInfo.type,
				"scrapertype": scrapertype,
				"scraperfrom": scraperfrom,
				"netid": netid,
				"title": title
			};

			RequestScrapeByNetId(objParam);
		}
	},

	searchScraperList: function () {
		var objDom = $("#mCSB_9_container");
		objDom.html("");

		var refreshgif = '<img src="images/movie/refresh.gif" width="32" height="32"  style=" margin:235px 0px 0px 235px;"/>';
		objDom.append(refreshgif);


		var scrapertype = g_MetaInfo.scrapertype;
		var mediaid = g_MetaInfo.mediaid;

		var objParam = {
			//mediaid":204,"mediatype":"video","scrapername":"The Expendables 3","scrapertype":"movie
			"mediaid": mediaid,
			"mediatype": g_selected_type,
			"scrapername": $("#videoname").val(),
			"scrapertype":scrapertype
		};
		RequestScraperDetails(objParam);
	},

	cbHandleScraperList: function(data, objParam) {
		if (!!!data.result && (objParam.mediatype == "movie" || objParam.mediatype == "video")) {
			g_metaInfoControl.closeMetaFixBox();

			if (objParam.scrapertype != "video") {
				g_mediaLibary.startScanLibary(g_siderBar.curSelectLibIndex);
			}

			g_mediaLibary.getLibraryDatas();
			return;
		}

		var scraperfrom = data.result.scraperfrom;
		var html = "";
		var notFound = true;
		var objDom = $("#updatevideo");
		//var objDom = $("#updatevideo .mCSB_container");

		objDom.html("");
		//objParam .mediaid, mediatype, scrapername, scrapertype
		if(typeof(data.result.scraperinfolist) != undefined) {
			if(data.result.scraperinfolist != null){
				if(data.result.scraperinfolist.length != 0){
					notFound = false;
				}
			}
		}

		if(notFound){
			$(".updatevideo").removeClass("show");
			$(".updatevideoErr").addClass("show");
			return;
		}else{
			$(".updatevideoErr").removeClass("show");
			$(".updatevideo").addClass("show");
		}

		g_MetaInfo.setScrapeFrom(scraperfrom);

		$.each($(data.result.scraperinfolist), jQuery.proxy(function(i, item) {
			var netid = item.netid;
			//var svrpath = (item.poster == "") ? "" : encodeURI("http://image.tmdb.org/t/p/w185");
			var poster = (item.poster == "") ? "" : encodeURI(item.poster);
			var releasedate = item.releasedate;
			var title = item.title;
			var j = i;

			var left = (j%2 == 0)? "left" : "";

			html += '<div class="updatevideoblock ' +  left + '"' + 'netid="' + netid  + '" title="' + title + '">';
			html += '<div class="img"><img class="mCS_img_loaded" width="160px;" height="240" src="' + poster + '">';
			html += '</div>';
			html += '<div class="updatevideomes vertical"><div class="vertical_wrap"><div class="vertical_content">';
			html += '<p class="videoname">' + title + '</p>';
			html += '<p class="videotime">' + releasedate + '</p>';
			html += '</div></div></div>';
			html += '<div class="bg"></div><div class="clr"></div>';
			html += '</div>';
		}, this));

		objDom.append(html);
		return;
	},

	showPage: function(index) {
		this.curData = {
			pageIndex: index,
			firstPage: {
				path: 'D:/test.iso',
				name: 'test'

			},
			secondPage: [{
				imgsrc: 'http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/5/59e90418.jpg',
				name: 'Jurassic World',
				time: '2015-6-12'
			}, {
				imgsrc: 'http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/5/59e90418.jpg',
				name: 'Jurassic World',
				time: '2015-6-12'
			}, {
				imgsrc: 'http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/5/59e90418.jpg',
				name: 'Jurassic World',
				time: '2015-6-12'
			}, {
				imgsrc: 'http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/5/59e90418.jpg',
				name: 'Jurassic World',
				time: '2015-6-12'
			}, {
				imgsrc: 'http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/5/59e90418.jpg',
				name: 'Jurassic World',
				time: '2015-6-12'
			}]
		};

		this.divPosition.processTemplate( this.curData );
	},
	updatePage: function() {
		this.switchLanguage();
		this.divPosition.setParam( "multilang", this.multilang );
		this.divPosition.processTemplate(this.curData);
		$(".userdefined_scrollbar").mCustomScrollbar();
	}
}