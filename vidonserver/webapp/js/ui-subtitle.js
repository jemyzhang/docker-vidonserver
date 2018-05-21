var g_subtitleControl;

var subtitleControl = function () {
	g_subtitleControl = this;
}

subtitleControl.prototype = {
	subtitleScrapers: [],
	subtitleList: [],

	GetSubtitleScrapers: function(callbackFunc) {
		this.subtitleScrapers.length = 0;

		vidonme.rpc.request({
			'context': this,
			'method': 'VideoLibrary.GetSubtitleScrapers',
			'params': {},
			'success': function(data) {
				if (!!data && !!data.result) {
					var scrapers = data.result.scrapers;

					for (var i = 0; i < scrapers.length; ++i)
						this.subtitleScrapers.push(scrapers[i]);
				}

				if (!!callbackFunc)
					callbackFunc();
			}
		});
	},

	ScrapeSubtitleList: function(scraperId, playfileId, playfilePath, callbackFunc) {
		this.subtitleList.length = 0;

		vidonme.rpc.request({
			'context': this,
			'method': 'VideoLibrary.ScrapeSubtitleList',
			'params': {
				'scraperid': scraperId,
				'idplayfile': playfileId,
				'playfilepath': playfilePath
			},
			'success': function(data) {
				if (!!data && !!data.result) {
					var items = data.result.subtitlegroups;

					for (var i = 0; i < items.length; ++i) {
						var item = items[i];
						this.subtitleList.push(item);
					}
				}

				if (!!callbackFunc)
					callbackFunc();
			}
		});
	},

	DownloadSubtitleFile: function(scraperId, downloadFileName, downloadUrl, playfileId, playfilePath, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': 'VideoLibrary.DownloadSubtitleFile',
			'params': {
				'scraperid': scraperId,
				'downloadfilename': downloadFileName,
				'downloadurl': downloadUrl,
				'idplayfile': playfileId,
				'playfilepath': playfilePath
			},
			'success': function(data) {
				if (!!data && !!data.result.ret) {
					if (!!callbackFunc)
						callbackFunc(data.result.path);
				}
			}
		});
	}
}
