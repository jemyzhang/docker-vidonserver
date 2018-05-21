
var g_scraperControl = null;

var ScraperControl = function() {
	g_scraperControl = this;
}

ScraperControl.prototype = {
	freshTimer: null,
	scrapingNum: 0,
	freshSeconds: 0,
	errorlogPath: "",
	curLibIndex: -1,
	freshEventInfo: [],//[{freshTimer: -1, libIndex: -1}],
	resultData: {},

	init: function() {
		this.freshEventInfo = [];
	},

	getFreshEventInfoByLibIndex: function(libIndex) {
		for (var i = 0; i < this.freshEventInfo.length; i++) {
			var tempEventInfo = this.freshEventInfo[i];
			if ( tempEventInfo.libIndex == libIndex ) {
				return tempEventInfo;
			}
		}

		return null;
	},

	delFreshEventInfoByLibIndex: function(libIndex) {
		var tempArray = [];
		for (var i = 0; i < this.freshEventInfo.length; i++) {
			var tempEventInfo = this.freshEventInfo[i];
			if ( tempEventInfo.libIndex != libIndex ) {
				tempArray.push(tempEventInfo);
			}
		}

		this.freshEventInfo = tempArray;
	},

	startScraper: function(libIndex) {
		var tempEventInfo = this.getFreshEventInfoByLibIndex( libIndex );

		if ( tempEventInfo ) {
			return;
		}

		tempEventInfo = {};
		tempEventInfo.libIndex = libIndex;
		tempEventInfo.freshTimer = setInterval( function(){
			g_scraperControl.getScraperStatus(libIndex);
		}, 2000 );

		this.freshEventInfo.push( tempEventInfo );

		g_siderBar.setFreshState( libIndex, 0 );
	},

	stopScraper: function(libIndex) {
		var tempEventInfo = this.getFreshEventInfoByLibIndex( libIndex );

		if ( tempEventInfo ) {
			this.delFreshEventInfoByLibIndex( libIndex );
			clearInterval( tempEventInfo.freshTimer );
			g_siderBar.setFreshState( libIndex, 1 );
		}
	},

	getScraperStatus: function(libIndex) {
		var libId = -1;
		if ( libIndex > -1 && libIndex < g_mediaLibary.libraryDatas.length ) {
			libId = g_mediaLibary.libraryDatas[libIndex].id;
		}

		if (libId > -1) {
			vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.GetCurrentScraperState',
				'params': {
					"idlibrary":libId
				},
				'success': function(data) {
					if (data && data.result) {
						var _this = g_scraperControl;
						var status = data.result.total.state;

						var libName = g_mediaLibary.libraryDatas[libIndex].name;

						var tips;
						if (status == "scanning") {
							tips = $.i18n.prop('index_42');
							tips = tips.format( libName );
							_this.scrapingNum = 0;
							_this.freshSeconds = 0;
						} else if (status == "scraping") {
							var tempData = data.result.total;
							//tips = "amounts {0}, finished {1}, movies {2}, tvshowfiles {3}, tvshows {4}, videos {5}";
							//tips = tips.format(tempData.amounts, tempData.finished, 
							//	tempData.movies, tempData.tvshowfiles, tempData.tvshows, tempData.videos);

							//扫描结束，在“{ 0 }”中共发现媒体 {1} ，其中 电影{2}，电视剧{3}部 {4}集 ，视频{5}。
							//正在给“{ 0 }”下载媒体信息，成功下载 电影{1}，电视剧{2}

							tips = $.i18n.prop('index_44');
							tips = tips.format( libName, tempData.movies, tempData.tvshows );
							_this.freshSeconds++;

							console.log( tips );

							if (_this.freshSeconds > 5 && _this.scrapingNum != tempData.finished ) {
								_this.scrapingNum = tempData.finished;
								_this.freshSeconds = 0;
								g_mediaLibary.freshLibary( libIndex );
							};
						} else if (status == "ready" || status == "finish") {
							_this.scrapingNum = 0;
							_this.freshSeconds = 0;
							_this.resultData = data.result.total;
							g_mediaLibary.freshLibary( libIndex );
							_this.getScraperResult( libIndex );
						} else {

						}

						if (tips) {
							g_commonPopDialog.showBottomTip(tips);
						};
					}
				}
			});
		}
	},

	getScraperResult: function(libIndex) {
		g_scraperControl.stopScraper(libIndex);

		// check if have fresh event
		if (this.freshEventInfo.length < 1) {
			setTimeout(function() {
				g_commonPopDialog.hideBottomTip();
			}, 5000);
		}
		
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetScraperLog',
			'params': {},
			'success': function(data1) {
				var path = global_download_url + encodeURI(data1.result.path);
				path = path + '?' + Math.random();

				var libName = g_mediaLibary.libraryDatas[libIndex].name;

				var resultData = g_scraperControl.resultData;
				tips = $.i18n.prop('index_4401');

				//“{ 0 }”下载媒体信息完成，成功下载 电影{1}，电视剧{2}， 失败 {3}  <a href="{4}">失败原因</a>
				tips = tips.format (libName, resultData.movies, resultData.tvshows, resultData.videos, path);
				//tips = "Scan stop, {0}";
				//tips = tips.format( path );
				
				g_commonPopDialog.showBottomTip(tips);
				g_siderBar.setMessageBtnStatu( true );
				g_scraperControl.errorlogPath = path;
			}
		});
		/*
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetLastScraperStatistics',
			'params': {},
			'success': function(data) {
				if (data) {
					var tips = $.i18n.prop('index_44');
					var totalNum = data.result.total.failed_amounts + data.result.total.success_amounts;
					var successNum = data.result.total.success_amounts;
					tips = tips.format(successNum, totalNum, data.result.total.failed_amounts, "");
					g_commonPopDialog.showBottomTip(tips);

					
				};
			}
		});*/
	}

}

function showErrorLog() {
	vidonme.rpc.request({
		'context': this,
		'method': 'VidOnMe.GetScraperLog',
		'params': {},
		'success': function(data1) {
			if (data1.result && data1.result.path) {
				var path = global_download_url + encodeURI(data1.result.path);
				path = path + '?' + Math.random();
				g_scraperControl.errorlogPath = path;
				window.open(g_scraperControl.errorlogPath);
			};
		}
	});
}

 var global_download_url = 'http://' + window.location.host + '/download/';