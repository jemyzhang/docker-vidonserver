var g_channelControl;

var ChannelControl = function() {
	g_channelControl = this;
}; 

ChannelControl.prototype = {
	divPosition: null,
	channelDatas: [],
	multilang: {},
	multilang_1: {},
    init: function(domPosition) {
    	this.divPosition = domPosition;
    	this.switchLanguage();

		$(".click_channel").live("click", function() {
			var strIndex = $(this).attr("channelindex");
			if (strIndex) {
				var channelIndex = Number(strIndex);
				g_channelControl.showChannelDetail(channelIndex);
			};
		});
		g_objsSwitchLanguage.push( this );
    },

    switchLanguage: function() {
        this.multilang = {
            index_199: $.i18n.prop('index_199'),
            index_200: $.i18n.prop('index_200'),
            index_201: $.i18n.prop('index_201'),
            index_202: $.i18n.prop('index_202'),
            index_203: $.i18n.prop('index_203'),
            index_204: $.i18n.prop('index_204')
        };

        this.multilang_1 = {
            index_205: $.i18n.prop('index_205'),
            index_206: $.i18n.prop('index_206'),
            index_207: $.i18n.prop('index_207'),
            index_208: $.i18n.prop('index_208'),
            index_209: $.i18n.prop('index_209'),
            index_210: $.i18n.prop('index_210')
        }
    },

	freshMainPage: function() {
		ChangeBackground("");

		$(".content_layer2").css("display", "none");
		$(".content_layer3").css("display", "none");
		$(".content_layer4").css("display", "none");
		$(".content_layer5").css("display", "none");

		$("#pl").setTemplateURL("../template/channel.tpl?" + AppVersion );
		$("#pl").setParam('multilang', this.multilang);
		$("#pl").processTemplate( this.channelDatas );
	},

	showChannelDetail: function(channelIndex) {
		if (channelIndex < this.channelDatas.length) {
			var addonDetailData = this.channelDatas[channelIndex];

			$(".addonDetail").setTemplateURL("../template/channeldetail.tpl?" + AppVersion);
			$(".addonDetail").setParam('multilang', this.multilang_1);
			$(".addonDetail").processTemplate(addonDetailData);

			showdiv('.addonDetail', 1);
			$(".addondetaildesBlock").mCustomScrollbar({});
		}
	},
	
	freshDetailPage: function() {
		$(".addonDetail #id_channelDetail").setTemplateURL("../template/channel_detail.tpl?" + AppVersion);
		$(".addonDetail #id_channelDetail").processTemplate( this.addonDetailData );
	},
	
	getDetailDatas: function(id) {
		var _this = this;
		var channelDatas = _this.channelDatas;
		
		if ( id < channelDatas.length ) {
			_this.addonDetailData = channelDatas[id];
	
			_this.freshDetailPage();
			showdiv( '.addonDetail', 1 );
			$(".addondetaildesBlock").mCustomScrollbar({
	
			});
			
			var languageType = getCookie("languageType");
			if ( languageType != null ) {
				g_languageType = languageType;
				loadProperties(languageType);
				translateHtml();
			};
	
			getServerLanguage();
		}
	},

    siderClickEvent: function() {
    	var _this = this;

		g_mediaLibary.getChannelDatas(function() {
			_this.channelDatas = g_mediaLibary.channelDatas;
			_this.freshMainPage();
		});
    },
    updatePage: function() {
		this.switchLanguage();
		$("#pl").setParam( "multilang", this.multilang );
		$("#pl").setParam( "multilang_1", this.multilang_1 );
		$("#pl").processTemplate(this.channelDatas);

		$(".userdefined_scrollbar").mCustomScrollbar();
	}
}