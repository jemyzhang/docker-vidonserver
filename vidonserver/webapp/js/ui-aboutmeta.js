var g_aboutmeta;

var aboutMeta = function() {
	g_aboutmeta = this;
};

aboutMeta.prototype = {
	aboutMetaStaticDatas: {},
	aboutMetaDatas: {},
	init: function(domPosition) {
		var _this=this;
		$(".aboutmetabtn").live("click",function(event){
			var path = $(this).parents(".img").attr("filepath");
			_this.clickint(path);
			event.stopPropagation();
		})
		
		
	},
	clickint:function(path) {
		var _this = this;
		var _path = path;

		g_mediaLibary.getPlaylist(_path, function (obj) {
			if (!!obj && !!obj.items) {
				for (var i = 0; i < obj.items.length; ++i) {
					if (!!obj.items[i].IsMainTitle) {
						_path = obj.items[i].title;
						break;
					}
				}
			}

			g_mediaLibary.getMetaFromPath(_path, function (obj) {
				_this.dogetMetaFromPath(path, obj);
			});
		});
	},
	dogetMetaFromPath: function(path, obj) {
		if (!!path && !!obj) {
			var _this = this;
			var vinfo = (!!obj.meta ? obj.meta.data.video[0] : null);
			var ainfo = [];
			
			var aspect = (!!vinfo ? parseFloat(vinfo.width / vinfo.height) : 0);
			aspect = aspect.toString().substr(0, 5);
			if (aspect == "1.777") {
				aspect = "16:9";
			} else if (aspect == "1.333") {
				aspect = "4:3";
			} else if (aspect == "2.349") {
				aspect = "12:5";
			} else if (aspect == "0") {
				aspect = NaN;
			} else {
				aspect = "16:9";
			}

			var duration = (!!obj.meta ? formatTime(parseInt(obj.meta.data.fileinfo.duration_ms / 1000)) : NaN);
			var size = 0;
			if ( !!obj.meta && !! obj.meta.data.fileinfo ) {
				size = obj.meta.data.fileinfo.total_size;
			} else {
				size = NaN;
			}
			
			if (!!size) {
				if (size > 1048576) {
					var s = size;
					s = parseFloat(s / 1048576); // MB
					if (s > 1024) {
						s = parseFloat(s / 1024); // GB
						size = s.toString().substr(0, 5) + "GB";
					} else {
						size = s.toString().substr(0, 5) + "MB";
					}
				} else {
					size = size.toString().substr(0, 5) + "KB"; // KB
				}
			}

			if (!!obj.meta) {
				for (var i = 0; i < obj.meta.data.audio.length; ++i) {
					var it = obj.meta.data.audio[i];

					it.SampleRate /= 1000;
					var aitem = {};

					aitem.aboutMetaDatasAudioTitle = $.i18n.prop('about_10').format(i + 1);
					aitem.aboutMetaDatasAudioCoding = it.codec;
					aitem.aboutMetaDatasAudioChannels = it.channels;
					aitem.aboutMetaDatasAudioSampling = it.SampleRate.toString() + "KHz";
					aitem.aboutMetaDatasAudioLanguage = it.language;

					ainfo.push(aitem);
				}
			} else {
				var aitem = {};

				aitem.aboutMetaDatasAudioTitle = $.i18n.prop('about_10').format(1);
				aitem.aboutMetaDatasAudioCoding = null;
				aitem.aboutMetaDatasAudioChannels = NaN;
				aitem.aboutMetaDatasAudioSampling = NaN;
				aitem.aboutMetaDatasAudioLanguage = null;

				ainfo.push(aitem);
			}

			_this.aboutMetaDatas = {
				aboutMetaDatasPath: handleUrl(path, true, true),
				aboutMetaDatasVideoSize: size,
				aboutMetaDatasVideoMin: duration,
				aboutMetaDatasVideoCoding: (!!vinfo ? vinfo.codec : null),
				aboutMetaDatasVideoAspectratio: aspect,
				aboutMetaDatasVideoDPI: (!!vinfo ? (vinfo.width.toString() + "*" + vinfo.height.toString()) : NaN * NaN),
				aboutMetaDatasVideoFramerate: (!!vinfo ? vinfo.fps.toString().substr(0, 5) : NaN),
				aboutMetaDatasVideoKPBS: "",
				aboutMetaDatasAudio: ainfo
			};

			showdiv('.popaboutmeta', 1);
			$("#popaboutmeta").setTemplateURL("../template/popaboutmeta.tpl?" + AppVersion);
			this.switchLanguage();
			$("#popaboutmeta").processTemplate(this.aboutMetaDatas);
			$(".userdefined_scrollbar").mCustomScrollbar({
			  autoHideScrollbar:true
			});
		}
	},
	switchLanguage: function() {
		this.aboutMetaStaticDatas={
			aboutMetaStaticDatasStr_title:$.i18n.prop('about_title'),
			aboutMetaStaticDatasStr_path:$.i18n.prop('about_1'),
			aboutMetaStaticDatasStr_video:$.i18n.prop('about_2'),
			aboutMetaStaticDatasStr_size:$.i18n.prop('about_3'),
			aboutMetaStaticDatasStr_min:$.i18n.prop('about_4'),
			aboutMetaStaticDatasStr_coding:$.i18n.prop('about_5'),
			aboutMetaStaticDatasStr_aspectratio:$.i18n.prop('about_6'),
			aboutMetaStaticDatasStr_dpi:$.i18n.prop('about_7'),
			aboutMetaStaticDatasStr_framerate:$.i18n.prop('about_8'),
			aboutMetaStaticDatasStr_kpbs:$.i18n.prop('about_9'),
			aboutMetaStaticDatasStr_channels:$.i18n.prop('about_11'),
			aboutMetaStaticDatasStr_sampling:$.i18n.prop('about_12'),
			aboutMetaStaticDatasStr_language:$.i18n.prop('about_13')
		};
		$("#popaboutmeta").setParam('aboutMetaStaticDatas', this.aboutMetaStaticDatas);

	}

}
