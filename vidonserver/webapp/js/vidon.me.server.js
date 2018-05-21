var g_ScrapingNum = 0;
var g_FreshSeconds = 0;
var g_errorlogPath;

function getLastScraperResult() {
	vidonme.rpc.request({
		'context': this,
		'method': 'VidOnMe.GetLastScraperStatistics',
		'params': {},
		'success': function(data) {
			if (data) {
				var tips = '<p>' + $.i18n.prop('index_44') + '</p>';
				var totalNum = data.result.total.failed_amounts + data.result.total.success_amounts;
				var successNum = data.result.total.success_amounts;

				vidonme.rpc.request({
					'context': this,
					'method': 'VidOnMe.GetScraperLog',
					'params': {},
					'success': function(data1) {
						var path = global_image_url + encodeURI( data1.result.path );
						tips = tips.format( successNum, totalNum, data.result.total.failed_amounts, path );
						$(".movieTips").html(tips);
						$("#fresh").removeClass("loading");
						$("#fresh").attr("title", $.i18n.prop('index_48') );
						//$('#scrapertest').html( tips );

						$("#btnMessages").addClass("hasMess");
						g_errorlogPath = path;

						setTimeout(function() {
							$(".movieTips").hide();
							//$('#scrapertest').hide();
						}, 5000);

					}
				});
			};
		}
	});
}

var freshScraperStatus = -1;

function getScraperStatus() {
	vidonme.rpc.request({
		'context': this,
		'method': 'VidOnMe.GetCurrentScraperState',
		'params': {},
		'success': function(data) {
			if (data) {
				var status = data.result.total.state;

				if (status == "finish" && freshScraperStatus > 0) {
					clearInterval(freshScraperStatus);
					freshScraperStatus = -1;
				} else if (status != "finish" && freshScraperStatus <= 0) {
					freshScraperStatus = setInterval(getScraperStatus, 1000);
					$("#fresh").addClass("loading");
					$("#fresh").attr("title", $.i18n.prop('index_158') );
				}

				g_FreshSeconds++;

				var tips;
				if (status == "ready") {
					tips = '<p>' + $.i18n.prop('index_42') + '<p>';
				} else if (status == "scanning") {
					tips = '<p>' + $.i18n.prop('index_42') + '<p>';
					g_ScrapingNum = 0;
					g_FreshSeconds = 0;
				} else if (status == "scraping") {
					tips = '<p>' + $.i18n.prop('index_43') + '<p>';
					tips = tips.format(data.result.total.amounts, data.result.total.finished );

					if (g_FreshSeconds > 5 && g_ScrapingNum != data.result.total.finished) {
						g_ScrapingNum = data.result.total.finished;
						g_FreshSeconds = 0;
						FreshMedias();
					};
				} else if (status == "finish") {
					g_ScrapingNum = 0;
					g_FreshSeconds = 0;
					FreshMedias();
					getLastScraperResult();
				} else {

				};

				if (tips) {
					$(".movieTips").html(tips);
					$(".movieTips").show();

					//$('#scrapertest').html( tips );
					//$('#scrapertest').show();
				};
			} else {
				alert(data.result.err);
			}
		}
	});
}


function stopGetScrapingStatus() {
	clearInterval(freshScraperStatus);
	freshScraperStatus = -1;
	$(".movieTips").hide();

	FreshMedias();
}