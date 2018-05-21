var g_playwindowssetup;

var PlayWinowsSetup = function() {
	g_playwindowssetup = this;
	this.init();
};

PlayWinowsSetup.prototype = {
	multiLanguageStrings: {},
	onlineSubDone: false,

	mediaInfoDatas: {
		curAudio:{},
		curSubtitle:{},
		audios: [{
			title: "English-英语-AC3 5.1",
			id: 0,
			index: 1,
			state: "selected"
		}, {
			title: "English-英语-AC3 5.1",
			id: 0,
			index: 2,
			state: ""
		}, {
			title: "English-英语-AC3 5.1",
			id: 0,
			index: 3,
			state: ""
		}],
		subtitles: {
			inlineSub: [{
				title: "Chinese-中简",
				id: 0,
				index: 1,
				state: ""
			}, {
				title: "Chinese-中简",
				id: 0,
				index: 1,
				state: ""
			}, {
				title: "Chinese-中简",
				id: 0,
				index: 1,
				state: ""
			}],
			onlineSub: [{
				title: "English-英语-AC3 5.1",
				path: "",
				index: 1,
				state: "selected",
				type: "zip",
				subItems: [{
						title: "English-英语-AC3 5.1",
						path: "",
						index: 1,
						state: "selected"
					}, {
						title: "English-英语-AC3 5.1",
						path: "",
						index: 1,
						state: ""
					}]
			}, {
				title: "English-英语-AC3 5.1",
				path: "",
				index: 1,
				state: "",
				type: "file"
			}, {
				title: "English-英语-AC3 5.1",
				path: "",
				index: 1,
				state: "",
				type: "file"
			}]
		}
	},

	init: function() {
		g_objsSwitchLanguage.push( this );
		$(".playwinows-setup-popblock .left li").live("click", function() {
			$(this).addClass("selected").siblings().removeClass("selected");
			var tab_con = $(this).parents(".playwinows-setup-popblock").find(".tab_con");
			var index = $(this).index();
			tab_con.eq(index).show().siblings().hide();
			if (index == 1) {
				$(".subtitle-carousel-layer").animate({
					left: "0px"
				}, 500);
			}
		});

		$(".online-subtitle-btn").live("click", function() {
			var fileId = g_playwindows.curChannelInfo.fileId;
			var filePath = g_playwindows.curChannelInfo.filePath;

			showdiv('.loadingbg', 5);
			g_subtitleControl.ScrapeSubtitleList(1, fileId, filePath, function () { // now we have only one subtitle scraper
				close_box('.loadingbg', 5);
				g_playwindowssetup.mediaInfoDatas.subtitles.onlineSub.length = 0;

				var subtitleList = g_subtitleControl.subtitleList;

				for (var i = 0; i < subtitleList.length; ++i) {
					var item = {};

					item.subItems = [];
					item.title = subtitleList[i].title;
					item.id = subtitleList[i].id;
					item.files = subtitleList[i].files;

					if (item.files.length > 1) {
						item.type = 'zip';
						item.downloadUrl = ''

						for (var j = 0; j < item.files.length; ++j) {
							var subItem = {};

							subItem.title = item.files[j].name;
							subItem.id = item.id;
							subItem.downloadUrl = item.files[j].downloadurl;
							item.subItems.push(subItem);
						}
					} else {
						item.type = '';
						item.downloadUrl = item.files[0].downloadurl;
					}

					g_playwindowssetup.mediaInfoDatas.subtitles.onlineSub.push(item);
				}

				var objDom = $("#onlinesub_ul");
				var html = "";
				var onlineSub = g_playwindowssetup.mediaInfoDatas.subtitles.onlineSub;

				for (var i = 0; i < onlineSub.length; ++i) {
					if (onlineSub[i].files.length > 1) {
						html += '<li class="package-subtitle-btn" subtitleid="' + onlineSub[i].id + '" title="' + onlineSub[i].title + '">' + onlineSub[i].title + '</li>';
					} else {
						html += '<li subtitleid="' + onlineSub[i].id + '" downloadurl="' + onlineSub[i].downloadUrl + '" subtitletype="' + onlineSub[i].type + '" title="' + onlineSub[i].title + '">' + onlineSub[i].title + '</li>';
					}
				}

				objDom.html("");
				objDom.append(html);

				var slideWidth = $(".subtitle-carousel").width();
				$(".subtitle-carousel-layer").animate({
					left: -slideWidth
				}, 500);

				g_playwindowssetup.onlineSubDone = true;
			});
		});

		$(".online-subtitle-back-btn").live("click", function() {
			$(".subtitle-carousel-layer").animate({
				left: "0px"
			}, 500);
		});

		$(".online-subtitle-back-btn2").live("click", function() {
			var slideWidth = $(".subtitle-carousel").width();
			$(".subtitle-carousel-layer").animate({
				left: -slideWidth
			}, 500);
		});

		$(".local-audio-list li").live("click", function() {
			$(this).addClass("selected").siblings().removeClass("selected");

			var index = $(this).attr("cus_value");
			if (index) {
				index = Number(index);
				g_playwindowssetup.selectAudioByIndex( index );
			};
		});

		$(".subtitle-list li").live("click", function() {
			$(this).addClass("selected").siblings().removeClass("selected");

			var index = $(this).attr("cus_value");
			if (index) {
				index = Number(index);
				g_playwindowssetup.selectSubtitleByIndex(index);
			};

			if ($(this).hasClass("package-subtitle-btn")) {
				$("#zipsubtitle li").each(function () {
					$(this).remove();
				});
				var subtitleid = Number($(this).attr("subtitleid"));
				var subtitleList = g_playwindowssetup.mediaInfoDatas.subtitles.onlineSub;
				var zipSubtitle = [];
				for (var i = 0; i < subtitleList.length; ++i) {
					if (subtitleid == subtitleList[i].id) {
						zipSubtitle = subtitleList[i].subItems;
						break;
					}
				}

				for (var i = 0; i < zipSubtitle.length; ++i) {
					$("#zipsubtitle").append(
						'<li subtitleid="' + 
						zipSubtitle[i].id + 
						'" downloadurl="' + 
						zipSubtitle[i].downloadUrl + 
						'" title="' + 
						zipSubtitle[i].title + 
						'">' + zipSubtitle[i].title + 
						'</li>'
						);
				}

				var slideWidth = $(".subtitle-carousel").width();
				$(".subtitle-carousel-layer").animate({
					left: -2 * slideWidth
				}, 500);
			} else {
				if (!$(this).parents("ul").hasClass("local-subtitle-list")) {
					var downloadUrl = $(this).attr("downloadurl");
					var downloadName = downloadUrl.substr(downloadUrl.lastIndexOf("/") + 1);
					var ref = $(this);

					g_subtitleControl.DownloadSubtitleFile(1, // TODO: modify scraperid
						downloadName,
						downloadUrl,
						g_playwindows.curChannelInfo.fileId,
						g_playwindows.curChannelInfo.filePath,
						function (data) {
							var text = ref.text();
							var found = false;
							
							$(".local-subtitle-list li").each(function (index) {
								if (text == $(this).text()) {
									$(".local-subtitle-list li").eq(index).addClass("selected").siblings().removeClass("selected");
									found = true;
									return false;
								}
							});

							if (!!!found) {
								$(".local-subtitle-list").append('<li title="' + text + '">' + text + '</li>');
								var index = $(".local-subtitle-list li").index();
								$(".local-subtitle-list li").eq(index).addClass("selected").siblings().removeClass("selected");
							}

							g_playwindows.getAllSubs(function () {
								var subtitleList = g_playwindowssetup.mediaInfoDatas.subtitles.inlineSub;

								for (var i = 0; i < subtitleList.length; ++i) {
									if (unescape(data) == unescape(subtitleList[i].path))
									{
										g_playwindowssetup.selectSubtitleByIndex(i);
										break;
									}
								}
							});
					});
				}

			}
		});
		this.switchLanguage();
    	
    },
    updatePage: function() {
 		this.switchLanguage();
		$("#playwinows-setup-popblock").setParam("multiLanguageStrings", this.multiLanguageStrings );
		$("#playwinows-setup-popblock").processTemplate();
	},

	switchLanguage: function() {
		this.multiLanguageStrings={
		audio: $.i18n.prop('play_32'),
		subtitle:  $.i18n.prop('play_22'),
		onlineSub: $.i18n.prop('play_23'),
		closeSub:  $.i18n.prop('play_24'),
		zipSub: $.i18n.prop('play_25')
		}
		
	},

	clickint: function() {
		$("#playwinows-setup-popblock").setTemplateURL("../template/playwindows_setup.tpl?" + AppVersion);
		$("#playwinows-setup-popblock").setParam( "multiLang", g_playwindowssetup.multiLanguageStrings );
		$("#playwinows-setup-popblock").processTemplate( g_playwindowssetup.mediaInfoDatas );
		$(".playwinows-setup-popblock").fadeIn();
	},

	setCurAudioInfo: function(audioInfo) {
		this.mediaInfoDatas.curAudio = audioInfo;
		//audioInfo.audioCodec;
		//audioInfo.audioidx;
		//audioInfo.output_audio_list;
	},

	setCurSubtitleInfo: function(subtitleInfo) {
		this.mediaInfoDatas.curSubtitle = subtitleInfo;
		//subtitleInfo.subtitleidx;
		//subtitleInfo.subtitletype;
		//subtitleInfo.output_inside_subtitle_list;
		//subtitleInfo.outsubtitlepath;
	},

	addAudioInfo: function(audioInfos) {
		if (audioInfos) {
			var audioItems = [];
			for (var i = 0; i < audioInfos.length; i++) {
				var audioInfo = audioInfos[i];
				//audioInfo.audioCodec;
				//audioInfo.audiochannel;
				//audioInfo.audiochannels;
				//audioInfo.audioid;
				//audioInfo.audioidx;
				//audioInfo.audiolanguage;

				var audioItem = {};

				audioItem.title = audioInfo.audiolanguage + " " + audioInfo.audioCodec + " " + audioInfo.audiochannel + "-" + audioInfo.audiochannels;
				audioItem.id = audioInfo.audioid;
				audioItem.index = i;

				audioItem.state = "";
				if (this.mediaInfoDatas.curAudio && audioInfo.audioidx == this.mediaInfoDatas.curAudio.audioidx) {
					audioItem.state = "selected";
				}

				audioItems.push(audioItem);
			};

			this.mediaInfoDatas.audios = audioItems;
		};
	},

	addSubTitleInfo: function(subtitleInfos) {
		if (subtitleInfos) {
			var subItems = [];
			var index = -1;
			for (var i = 0; i < subtitleInfos.length; i++) {
				var subtitleInfo = subtitleInfos[i];
				//subtitleInfo.outsubtitlepath;
				//subtitleInfo.subtitlelanguage;
				//subtitleInfo.subtitleid;
				//subtitleInfo.subtitleidx;
				//subtitleInfo.subtitletype;

				var subItem = {};
				if ( subtitleInfo.subtilelanguage && subtitleInfo.subtilelanguage.length > 0) {
					subItem.title = subtitleInfo.subtilelanguage;
					if (typeof (subtitleInfo.subtitleidx) != 'undefined') {
						if (index == -1) {
							index = subtitleInfo.subtitleidx;
							++index;
						}
					}
				} else {
					subItem.title = (!!!subtitleInfo.subtitleid) ? subtitleInfo.outsubtitlename : subtitleInfo.subtitleid;
				}

				subItem.id = subtitleInfo.subtitleid;
				subItem.index = (typeof (subtitleInfo.subtitleidx) == 'undefined' || subtitleInfo.subtitleidx < 0) ? i : subtitleInfo.subtitleidx;
				subItem.type = subtitleInfo.subtitletype;

				subItem.state = "";

				if (this.mediaInfoDatas.curSubtitle && subtitleInfo.subtitleidx == this.mediaInfoDatas.curSubtitle.subtitleidx) {
					subItem.state = "selected";
				}

				subItem.path = unescape(subtitleInfo.outsubtitlepath);

				subItems.push(subItem);
			};

			this.mediaInfoDatas.subtitles.inlineSub = subItems;
		};
	},

	selectAudioByIndex: function(index) {
		var selectedAudio;
		for (var i = 0; i < this.mediaInfoDatas.audios.length; i++) {
			if ( i == index ) {
				this.mediaInfoDatas.audios[i].state = "selected";
				selectedAudio = this.mediaInfoDatas.audios[i];
			} else {
				this.mediaInfoDatas.audios[i].state = "";
			}
		};

		var audioId = selectedAudio.index;
		g_playwindows.setAudioChannel(audioId);
	},

	selectSubtitleByIndex: function(index){
		var selectedSubtitle;
		for (var i = 0; i < this.mediaInfoDatas.subtitles.inlineSub.length; i++) {
			if ( i == index ) {
				this.mediaInfoDatas.subtitles.inlineSub[i].state = "selected";
				selectedSubtitle = this.mediaInfoDatas.subtitles.inlineSub[i];
			} else {
				this.mediaInfoDatas.subtitles.inlineSub[i].state = "";
			}
		};

		g_playwindows.setSubChannel(selectedSubtitle);
	}
}