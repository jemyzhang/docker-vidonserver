function getBrowserInfo() {
	var agent = navigator.userAgent.toLowerCase();

	var regStr_ie = /msie [\d.]+;/gi;
	var regStr_ff = /firefox\/[\d.]+/gi
	var regStr_chrome = /chrome\/[\d.]+/gi;
	var regStr_saf = /safari\/[\d.]+/gi;
	//IE
	if (agent.indexOf("msie") > 0) {
		return agent.match(regStr_ie);
	}

	//firefox
	if (agent.indexOf("firefox") > 0) {
		return agent.match(regStr_ff);
	}

	//Chrome
	if (agent.indexOf("chrome") > 0) {
		return agent.match(regStr_chrome);
	}

	//Safari
	if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
		return agent.match(regStr_saf);
	}

	return ["unknown"];
}

(function(document) {
	"use strict";
	var browserinfo = getBrowserInfo() + "";
	var i,
		script,
		debug = false,
		/* Set to true to disable cached javascript */
		version = (debug ? Math.random() : AppVersion ),
		scripts;
	if (browserinfo.match("msie"))
		scripts = [
			"js/jquery-1.8.2.min.js",
			"js/json2.js",
			"js/jquery-ui.js",
			"js/jquery-jtemplates.js",
			"js/jquery.ajaxfileupload.js",
			"js/vidon.me.core.js",
			"js/vidon.me.rpc.js",
			"js/vidon.me.utils.js",
			"js/jquery.i18n.properties-1.0.9.js",
			"js/jquery.md5.js",
			"js/core-library.js",
			"js/core-homepage.js",
			"js/core-pathbrowser.js",
			"js/ui-video.js",
			"js/ui-movie.js",
			"js/ui-channel.js",
			"js/ui-tvshow.js",
			"js/ui-multimedia.js",
			"js/ui-sidebar.js",
			"js/ui-addlibrary.js",
			"js/ui-header.js",
			"js/ui-poplogin.js",			
			"js/ui-setup.js",
			"js/ui-editmeta.js",
			"js/ui-aboutmeta.js",
			"js/ui-commonpopdialog.js",
			"js/ui-updatemeta.js",
			"js/ui-photo.js",
			
			"js/ui-index.js",
			"js/ui-loginhistory.js",
			"js/ui-editlibrary.js",
			"js/ui-searchresult.js",
			"js/ui-scrollbar.js",
			"js/ui-playwinowssetup.js",
			"js/ui-playwindows.js",
			"js/ui-moveMedia.js",
			"js/ui-deleteMedia.js",
			"js/ui-feedback.js",
			"js/core-setup.js",
			"js/core-scraper.js",
			"js/global.js",
			"js/commfunc.js",
			"js/getjson.js",
			"js/ui-pathbrowser.js",
			"js/ui-topbar.js",
			"js/ui-topfilter.js",
			"js/ui-RSSorder.js",
			"js/vidon.me.customlib.js",
			"js/vidon.me.mediashowinit.js",
			"js/vidon.me.mediashow.js",
			"js/vidon.me.sortandfilter.js",
			"js/vidon.me.metafix.js",
			"js/ui-subtitle.js"
		];
	else
		scripts = [
			"js/jquery-1.8.2.min.js",
			"js/json2.js",
			"js/jquery-ui.js",
			"js/jquery-jtemplates.js",
			"js/jquery.ajaxfileupload.js",
			"js/vidon.me.core.js",
			"js/vidon.me.rpc.js",
			"js/vidon.me.utils.js",
			"js/jquery.i18n.properties-1.0.9.js",
			"js/jquery.md5.js",
			"js/core-library.js",
			"js/core-homepage.js",
			"js/core-pathbrowser.js",
			"js/ui-video.js",
			"js/ui-movie.js",
			"js/ui-channel.js",
			"js/ui-tvshow.js",
			"js/ui-multimedia.js",
			"js/ui-sidebar.js",
			"js/ui-addlibrary.js",
			"js/ui-header.js",
			"js/ui-poplogin.js",			
			"js/ui-setup.js",
			"js/ui-editmeta.js",
			"js/ui-aboutmeta.js",
			"js/ui-commonpopdialog.js",
			"js/ui-updatemeta.js",
			"js/ui-photo.js",
			"js/ui-RSSorder.js",
			"js/ui-index.js",
			"js/ui-loginhistory.js",
			"js/ui-editlibrary.js",
			"js/ui-searchresult.js",
			"js/ui-topbar.js",
			"js/ui-topfilter.js",
			"js/ui-scrollbar.js",
			"js/ui-playwinowssetup.js",
			"js/ui-playwindows.js",
			"js/ui-moveMedia.js",
			"js/ui-deleteMedia.js",
			"js/ui-feedback.js",
			"js/core-setup.js",
			"js/core-scraper.js",
			"js/global.js",
			"js/commfunc.js",
			"js/getjson.js",
			"js/ui-pathbrowser.js",

			"js/vidon.me.customlib.js",
			"js/vidon.me.mediashowinit.js",
			"js/vidon.me.mediashow.js",
			"js/vidon.me.sortandfilter.js",
			"js/vidon.me.metafix.js",
			"js/ui-subtitle.js"
		];

	for (i = 0; i < scripts.length; i += 1) {
		script = '<script type="text/javascript" src="';
		script += scripts[i] + '?' + version;
		script += '"><\/script>';
		document.write(script);
	}

}(window.document));
