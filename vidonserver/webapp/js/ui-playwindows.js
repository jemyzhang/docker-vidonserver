var g_playwindows;

var PlayWindows = function() {
	g_playwindows = this;
};  

PlayWindows.prototype = {
	playerCoreReady: false,
	curChannelInfo: {
		filePath: "",
		fileId: -1,
		id: "",
		url: "",
		title: "",
		poster: "",
		autoPlay: "true",
		startPos: 0,
		filemd5: 0
	},
	clientInfo: {
		clientname: "server web app",
		clientvision: AppVersion,
		devicename: navigator.appName,
		devicetype: "web",
		deviceversion: navigator.appVersion,
		screenSize: ""
	},
	qualitys: [],
	curQualityIndex: 3,

	init: function( domPosition ) {
	 	g_objsSwitchLanguage.push( this );
	 	this.switchLanguage();
	 	$("#popPlayWindows").setTemplateURL( "../template/popplaywindows.tpl?" + AppVersion );
	 	$("#popPlayWindows").setParam( "qualityInfos", this.qualitys );
	 	$("#popPlayWindows").setParam( "curQualityInfo", this.qualitys[this.curQualityIndex] );
		$("#popPlayWindows").processTemplate();

		this.initSewisePlayer();
		this.bindControls();
    },

	initSewisePlayer: function() {
    	SewisePlayer.setup({
			server: "vod",
			type: "m3u8",
			autostart: "false",
			poster: "",//this.curChannelInfo.poster
			videourl: "",//this.curChannelInfo.url
			skin: "vodFlowPlayer",
			title: "",//this.curChannelInfo.title,
			logo: "",//http://www.dvdfab.cn/images/logo_new.png",
			lang: "en_US",
			customdatas: {
			"langtype": currentLanguage
		 	},
			claritybutton: 'disable'
		}, "PlayWindowsBlock");

		SewisePlayer.onPlayTime(function(time, id) {
			g_playwindows.curChannelInfo.curPos = time;
		});

		SewisePlayer.onStart(function(id) {
			$(".popPlayWindows").css("background-image", "");
			$(".PlayWindowsBlockBg").hide();
			$("#PlayWindowsBlock").show();
		});
    },
	
	bindControls: function(){
    	$(".player-dropdown a").live("click",function(){
			var player_dropdown=$(this).parents(".player-dropdown");
			var player_dropdown_list=$(this).parents(".player-dropdown").children(".player-dropdown-list");
			if (player_dropdown_list.css("display") == "none") {
				player_dropdown_list.slideDown("fast");
			} else {
				player_dropdown_list.slideUp("fast");
			}	
		});
		$(".player-dropdown li").live("click",function(){
			var player_dropdown_selected = $(this).parents(".player-dropdown").find(".player-dropdown-selected");
			var player_dropdown_list=$(this).parents(".player-dropdown").children(".player-dropdown-list");
			var cusvalue = $(this).attr("cus_value");
			cusvalue = Number(cusvalue);

			player_dropdown_list.hide();

			if (cusvalue >= 0 && cusvalue < g_playwindows.qualitys.length ) {
				var txt = g_playwindows.qualitys[cusvalue].shortTitle;
				player_dropdown_selected.text(txt);
				player_dropdown_selected.attr("cus_value", cusvalue);
				g_playwindows.curQualityIndex = cusvalue;
				g_playwindows.changeQuality(cusvalue);
			};
		});
		
		$(".playwinows-setup").live("click",function(){
			if ( !g_playwindowssetup ) {
				g_playwindowssetup = new PlayWinowsSetup;
				g_playwindowssetup.init();
			};

			g_playwindowssetup.clickint();
		});

		$("#click_btn_playwindow").live("click", function(){
			SewisePlayer.doStop();
			close_box('.popPlayWindows',1);
			g_playwindows.stopPlay();
		});
    },

    updatePage: function() {
 		this.switchLanguage();
		$("#popPlayWindows").setParam( "qualityInfos", this.qualitys );
		$("#popPlayWindows").processTemplate();

		this.initSewisePlayer();
		
	},

	switchLanguage:function(){
		this.qualitys=[
		{
			title: $.i18n.prop('play_11'),
			shortTitle:$.i18n.prop('play_11'),
			key: "fullhd",
			bitrate: 3000,
			index: 0
		}, {
			title: $.i18n.prop('play_12'),
			shortTitle:$.i18n.prop('play_12'),
			key: "hd",
			bitrate: 2000,
			index: 1
		},{
			title: $.i18n.prop('play_13'),
			shortTitle:$.i18n.prop('play_13'),
			key: "sd",
			bitrate: 1000,
			index: 2
		},{
			title: $.i18n.prop('play_14'),
			shortTitle:$.i18n.prop('play_14'),
			key: "sd",
			bitrate: 1000,
			index: 3
		}
	]
		
	},
    playFile: function(fileId, filePath, title, poster) {
    	if ( this.clientInfo.screenSize == "" ) {
    		this.clientInfo.screenSize = window.screen.width + "x" + window.screen.height;
    	};
    	
		this.curChannelInfo.title = title;
		this.curChannelInfo.poster = poster;

		console.log("start get channel id: " + filePath );
		this.curChannelInfo.fileId = fileId;
		this.curChannelInfo.filePath = filePath;
		filePath = encodeURIComponent(filePath);

		var selectedQuality = this.qualitys[this.curQualityIndex];
		var params = {
			"profile": {
				"breakpoint": false,
				"device": {
					"clientname": this.clientInfo.clientname,
					"clientvision": this.clientInfo.clientvision,
					"devicename": this.clientInfo.devicename,
					"deviceresolution": this.clientInfo.screenSize,
					"devicetype": this.clientInfo.devicetype,
					"deviceversion": this.clientInfo.deviceversion,
					"fps": 23.97599983215332,
					"max_resolution": this.clientInfo.screenSize,
					"networkmode": "wifi",
					"vdplayervision": "1.0.0.0"
				},
				"file": filePath,
				"mode": "hls",
				"originalchannelid": "",
				"settings": {
					"audiolanguage": "English",
					"max_bitrate_kbps": selectedQuality.bitrate,
					"output_audio_list": "",
					"output_audio_remove_hd": false,
					"output_inside_subtitle_list": "",
					"outsubtitleCodePage": "GB18030",
					"outsubtitlepath": "",
					"quality": selectedQuality.key,
					"subtilelanguage": "Chinese",
					"subtitletype": 1
				}
			}
		};


		this.curChannelInfo.filemd5 = $.md5( this.curChannelInfo.filePath );
		var extendParams = {
			id: this.curChannelInfo.filemd5
		};

		var picPath = poster;
		picPath = 'url(' + picPath + ')';
		$(".PlayWindowsBlockBg").css("background-image", picPath);
		$(".PlayWindowsBlockBg").show();

		showfullscreen('.popPlayWindows');

		$("#PlayWindowsBlock").html("");
		this.initSewisePlayer();

		this.playerCoreReady = false;
		SewisePlayer.playerReady(function(id) {
			console.log("SewisePlayer.playerReady is ok.")
			g_playwindows.playerCoreReady = true;
		});

		//$("#PlayWindowsBlock").hide();

		vidonme.rpc.play({
			'context': this,
			'method': "GetChannel",
			'params': params,
			exparams: extendParams,
			'success': function(data) {
				if (data && data.result) {
					if (data.result.flag) {
						var channelid = data.result.ret.channelid;

						if (data.id == g_playwindows.curChannelInfo.filemd5) {
							g_playwindows.curChannelInfo.id = channelid
							var playURL = getChannelPlayURL(channelid);

							console.log("create play url success: " + playURL);
							g_playwindows.curChannelInfo.url = playURL;
							g_playwindows.curChannelInfo.curPos = 0;

							g_playwindows.startPlay();

							g_playwindowssetup.setCurAudioInfo( data.result.ret.curaudio );
							g_playwindowssetup.setCurSubtitleInfo( data.result.ret.cursubtitle );
							g_playwindows.getAllSubs();
							g_playwindows.getAllAudios();
						} else {
							console.log("this channel id is invalid: " + channelid);
							g_playwindows.closeChannel( channelid );
						}
					} else {
						console.log("create play url failed: " + g_playwindows.curChannelInfo.title);
						close_box('.popPlayWindows',1)
					}
				};
			}
		});
	},

	changeQuality: function(index) {
		var selectedQuality = this.qualitys[index];
		console.log("get channel id for new quality: " + selectedQuality);

		filePath = encodeURIComponent(this.curChannelInfo.filePath);
		var params = {
			"profile": {
				"breakpoint": true,
				"device": {
					"clientname": this.clientInfo.clientname,
					"clientvision": this.clientInfo.clientvision,
					"devicename": this.clientInfo.devicename,
					"deviceresolution": this.clientInfo.screenSize,
					"devicetype": this.clientInfo.devicetype,
					"deviceversion": this.clientInfo.deviceversion,
					"fps": 23.97599983215332,
					"max_resolution": this.clientInfo.screenSize,
					"networkmode": "wifi",
					"vdplayervision": "1.0.0.0"
				},
				"file": filePath,
				"mode": "hls",
				"originalchannelid": "",
				"settings": {
					"audiolanguage": "English",
					"max_bitrate_kbps": selectedQuality.bitrate,
					"output_audio_list": "",
					"output_audio_remove_hd": false,
					"output_inside_subtitle_list": "",
					"outsubtitleCodePage": "GB18030",
					"outsubtitlepath": "",
					"quality": selectedQuality.key,
					"subtilelanguage": "Chinese",
					"subtitletype": 1
				}
			}
		};

		vidonme.rpc.play({
			'context': this,
			'method': "GetChannel",
			'params': params,
			'success': function(data) {
				if (data && data.result) {
					if (data.result.flag) {
						var oldChannelID = g_playwindows.curChannelInfo.id;
						if ( oldChannelID ) {
							g_playwindows.closeChannel( oldChannelID );
						};

						var channelid = data.result.ret.channelid;
						g_playwindows.curChannelInfo.id = channelid
						var playURL = getChannelPlayURL(channelid);

						console.log("create play url success: " + playURL);
						g_playwindows.curChannelInfo.url = playURL;

						SewisePlayer.toPlay(g_playwindows.curChannelInfo.url, g_playwindows.curChannelInfo.title, g_playwindows.curChannelInfo.curPos, true); 
					} else {
						console.log("create play url failed: " + g_playwindows.curChannelInfo.title);
					}
				};
			}
		});
	},

	startPlay: function() {
		/*
		$("#PlayWindowsBlock").html("");
		$(".PlayWindowsBlockBg").css("background-image", "");
		$(".PlayWindowsBlockBg").hide();

		SewisePlayer.setup({
			server: "vod",
			type: "m3u8",
			autostart: this.curChannelInfo.autoPlay,
			poster: "",//this.curChannelInfo.poster
			videourl: "",//this.curChannelInfo.url
			skin: "vodFlowPlayer",
			title: this.curChannelInfo.title,
			logo: "",//http://www.dvdfab.cn/images/logo_new.png",
			lang: "en_US",//en_US:英语   zh_CN:中文   de:德语 fr es jp zh_tw:繁中。。。。。
			claritybutton: 'disable'
		}, "PlayWindowsBlock");
		*/

		if (this.playerCoreReady) {
			console.log("start play: " + g_playwindows.curChannelInfo.title);
			SewisePlayer.toPlay(g_playwindows.curChannelInfo.url, g_playwindows.curChannelInfo.title, 0, true);
		} else {
			SewisePlayer.playerReady(function(id) {
				console.log("start play: " + g_playwindows.curChannelInfo.title);
				SewisePlayer.toPlay(g_playwindows.curChannelInfo.url, g_playwindows.curChannelInfo.title, 0, true);
			});
		}

		//SewisePlayer.toPlay(this.curChannelInfo.url, this.curChannelInfo.title, 10, true); 
		//$("#popPlayWindows").show();
		//showfullscreen('.popPlayWindows');
	},

	closeChannel: function(channelID) {
		var params = {
			"channelid": channelID
		};

		vidonme.rpc.play({
			'context': this,
			'method': "Stop",
			'params': params,
			'success': function(data) {
				if ( data && data.result ) {
				};			
			}
		});
	},

	stopPlay: function(){
		console.log("stop play: " + g_playwindows.curChannelInfo.url );
		this.setBookMark();
		this.closeChannel( g_playwindows.curChannelInfo.id );
	},

	getAllSubs: function(callbackFunc) {
		var params = {
			"channelid": g_playwindows.curChannelInfo.id
		};

		vidonme.rpc.play({
			'context': this,
			'method': "GetAllSubtitle",
			'params': params,
			'success': function(data) {
				if ( data && data.result ) {
					if (data.result.flag) {
						g_playwindowssetup.addSubTitleInfo(data.result.ret.subtitle);
						/*
						var subtitleInfos = data.result.ret.subtitle;
						for (var i = 0; i < subtitleInfos.length; i++) {
							var subtitleInfo = subtitleInfos[i];
							//subtitleInfo.outsubtitlepath;
							//subtitleInfo.subtitlelanguage;
							//subtitleInfo.subtitleid;
							//subtitleInfo.subtitleidx;
							//subtitleInfo.subtitletype;
						};
						*/
					}

					if (!!callbackFunc)
						callbackFunc();
				}
			}
		});
		
	},

	getAllAudios: function() {
		var params = {
			"channelid": g_playwindows.curChannelInfo.id
		};
		
		vidonme.rpc.play({
			'context': this,
			'method': "GetAllAudio",
			'params': params,
			'success': function(data) {
				if ( data && data.result ) {
					if ( data.result.flag ) {
						g_playwindowssetup.addAudioInfo( data.result.ret.audio );
						/*
						var audioInfos = data.result.ret.audio;
						for (var i = 0; i < audioInfos.length; i++) {
							var audioInfo = audioInfos[i];
							//audioInfo.audioCodec;
							//audioInfo.audiochannel;
							//audioInfo.audiochannels;
							//audioInfo.audioid;
							//audioInfo.audioidx;
							//audioInfo.audiolanguage;
						};
						*/
					};
				};			
			}
		});
		
	},

	getMediaInfo: function() {
		var params = {
			path: this.curChannelInfo.filePath
		};

		vidonme.rpc.request({
			'context': this,
			'method': "VidOnMe.GetStreamDetailsFromPath",
			'params': params,
			'success': function(data) {
				if ( data && data.result ) {
					if ( data.result.flag ) {
						
					};
				};			
			}
		});
	},

	setAudioChannel: function(id) {
		var params = {
			"channelid": g_playwindows.curChannelInfo.id,
			"audiochannel": id
		};

		var exparams = {
			"audiochannel": id
		};
		
		vidonme.rpc.play({
			'context': this,
			'method': "SetAudioChannel",
			"audiochannel": id,
			'params': params,
			'exparams': exparams,
			'success': function(data) {
				if ( data && data.result ) {
					if ( data.result.flag ) {
						
					};
				};			
			}
		});
	},

	setSubChannel: function(subItem) {
		var params = {
			"channelid": g_playwindows.curChannelInfo.id,
			"subtitleid": subItem.id,
			"subtitletype": subItem.type,
			outsubtitlepath: subItem.path
		};

		var exparams = {
			subtitleid: subItem.id,
			subtitletype: subItem.type,
			outsubtitlepath: subItem.path
		};
		
		vidonme.rpc.play({
			'context': this,
			'method': "SetSubtitle",
			'params': params,
			'exparams': exparams,
			'success': function(data) {
				if ( data && data.result ) {
					if ( data.result.flag ) {
						
					};
				};			
			}
		});
	},

	setBookMark: function() {
		var params = {
			"filepath": g_playwindows.curChannelInfo.filePath,
			offsetTimeInFile: g_playwindows.curChannelInfo.curPos,
			subtitle: "1",
			audio: "1",
			playtime: "1"
		};

		vidonme.rpc.request({
			'context': this,
			'method': "VideoLibrary.SetBookmark",
			'params': params,
			'success': function(data) {
				if ( data && data.result ) {
					if ( data.result.flag ) {
						
					};
				};			
			}
		});
	}

}

function getChannelPlayURL(channelid){
	var hostName = "http://" + window.location.hostname + ":" + g_coreSettings.settingData.tcpserverPort;
	var playURL = hostName + "/vod/" + channelid + "/index.m3u8";

	return playURL;
}