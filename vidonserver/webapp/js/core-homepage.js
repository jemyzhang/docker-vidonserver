var g_coreHomePage;

var CoreHomePage = function() {
	g_coreHomePage = this;
};

CoreHomePage.prototype = {
	recentAddMedias: [],
	historyMedias: [],
	rawHistoryMedias: [],

	getRecentlyAddedVideos: function(start, end, callbackFunc) {
		var __start = (!!arguments[0] && arguments[0] > -1) ? start : 0;
		var __end = (!!arguments[1] && arguments[1] > -1) ? end : 20;

		var obj = new JsonObject();
		var getMethod = 'VideoLibrary.GetAllVideoItems';
		obj.limits = new Limits(__start, __end);

		var tempSort = {};
		tempSort.method = 'dateadded';
		tempSort.order = 'descending';
		obj.sort = tempSort;

		this.recentAddMedias.length = 0;

		vidonme.rpc.request({
			'context': this,
			'method': getMethod,
			'params': obj,
			'success': function(data) {
				if (!!data && !!data.result ) {
					if (data.result.limits.total > 0) {
						var tempDatas = data.result.mediainfo;
						var count = tempDatas.length;

						if (count > 0) {
							var resultDatas = [];
							for (var i = 0; i < tempDatas.length; i++) {
								var tempData = {};
								tempData = tempDatas[i];
								tempData.filepath = tempData.file;
								tempData.thumbnail = encodeImage(tempData.thumbnail);
								tempData.fileindex = data.result.limits.start + i;
								resultDatas.push(tempData);
							}

							this.recentAddMedias = this.recentAddMedias.concat(resultDatas);

							/*
							if (data.result.limits.total > data.result.limits.end) {
								this.getRecentlyAddedVideos(data.result.limits.end, data.result.limits.end + 20, callbackFunc);
							} else {
								if (!!callbackFunc) {
									callbackFunc(this.recentAddMedias);
								}
							}
							*/
						}
					}

					if (!!callbackFunc) {
						callbackFunc(this.recentAddMedias);
					}
				}
			}
		});
	},

	getHistoryMedias: function(start, end, callbackFunc) {
		var __start = (!!arguments[0] && arguments[0] > -1) ? start : 0;
		var __end = (!!arguments[1] && arguments[1] > -1) ? end : 20;

		var obj = new JsonObject();
		var getMethod = 'VideoLibrary.GetHistoryRecords';
		obj.limits = new Limits(__start, __end);

		this.rawHistoryMedias.length = 0;

		vidonme.rpc.request({
			'context': this,
			'method': getMethod,
			'params': obj,
			'success': function(data) {
				if (!!data && !!data.result) {
					if (data.result.limits.total > 0) {
						var tempDatas = data.result.Records;
						var count = tempDatas.length;

						if (count > 0) {
							var resultDatas = [];

							for (var i = 0; i < tempDatas.length; i++) {
								var tempData = {};
								tempData = tempDatas[i];
								tempData.thumbnail = encodeImage(tempData.thumbnail);
								tempData.fileindex = data.result.limits.start + i;
								resultDatas.push(tempData);
							}

							this.rawHistoryMedias = this.rawHistoryMedias.concat(resultDatas);

							if (data.result.limits.total > data.result.limits.end) {
								this.getHistoryMedias(data.result.limits.end, data.result.limits.end + 20, callbackFunc);
							}
						}
					}

					if (!!callbackFunc) {
						callbackFunc(this.rawHistoryMedias);
					}
				}
			}
		});
	},

	delHistoryMedias: function(fileid, callbackFunc) {
		if (!!!fileid) {
			return;
		}

		vidonme.rpc.request({
			'context': this,
			'method': 'VideoLibrary.DelHistoryRecord',
			'params': {
				'fileID' : fileid
			},
			'success': function(data) {
				if (!!data && !!data.result) {
					if (data.result.ret) {
						if (!!callbackFunc) {
							callbackFunc();
						}
					}
				}
			}
		});	
	},

	getFullYearOnNow: function(date) {
		var year = 1970;

		if (!!date) {
			year = date.getFullYear();
		}

		return year;
	},

	getMonthOnNow: function(date) {
		var month = 1;

		if (!!date) {
			month = date.getMonth();
		}

		return month;
	},

	getDateOnNow: function(date) {
		var day = 1;

		if (!!date) {
			day = date.getDate();
		}

		return day;
	},

	getLastMonthYesterday: function(date) {
		var daysInMonth = new Array([0], [31], [28], [31], [30], [31], [30], [31], [31], [30], [31], [30], [31]);
		var year = date.getFullYear();
		var month = date.getMonth();
		var date = date.getDate();

		if (year%4 == 0 && year%100 != 0) {
			daysInMonth[2] = 29;
		}

		if (month - 1 == 0) {
			year -= 1;
			month = 12;
		} else {
			month -= 1;
		}

		date = daysInMonth[month] >= date ? date : daysInMonth[month];

		return Date.UTC(year, month, date, 0, 0, 0);
	},

	listSortBy: function(arr, field, order) {
	    var refer = [], result = [], order = order == 'asc' ? 'asc' : 'desc', index;
	    for (i = 0; i < arr.length; ++i) {
	        refer[i] = arr[i][field] + ':' + i;
	    }

	    refer.sort();
	    if (order == 'desc') {
	    	refer.reverse();
	    }

	    for (i = 0; i < refer.length; ++i) { 
	        index = refer[i].split(':')[1]; 
	        result[i] = arr[index]; 
	    }

	    return result;
	},

	issueRawHistoryData: function(data, callbackFunc) {
		if (!!!data) {
			return;
		}

		this.historyMedias.length = 0;
		var records = this.listSortBy(data, 'lastplayedtime', 'desc');
		var record = {};
		var time_array = [];

		var today = {};
		today.time = $.i18n.prop("home_4");
		today.historyList = new Array();

		var yesterday = {};
		yesterday.time = $.i18n.prop("home_12");
		yesterday.historyList = new Array();		

		var in_lastest_week = {};
		in_lastest_week.time = $.i18n.prop("home_5");
		in_lastest_week.historyList = new Array();

		/*
		var in_lastest_month = {};
		in_lastest_month.time = $.i18n.prop("home_6");
		in_lastest_month.historyList = new Array();
		*/

		var in_earlier_time = {};
		in_earlier_time.time = $.i18n.prop("home_7");
		in_earlier_time.historyList = new Array();

		var date = new Date();
		var start_time_of_today = Date.UTC(this.getFullYearOnNow(date), this.getMonthOnNow(date), this.getDateOnNow(date), 0, 0, 0) / 1000;
		var end_time_of_today = Date.UTC(this.getFullYearOnNow(date), this.getMonthOnNow(date), this.getDateOnNow(date), 23, 59, 59) / 1000;

		for (var i = 0; i < records.length; ++i) {
			var item = records[i];

			if (item.lastplayedtime >= start_time_of_today && item.lastplayedtime <= end_time_of_today) {
				today.historyList.push(item);
			} else {
				var lastest_time = parseInt(item.lastplayedtime);

				/*
				if (lastest_time >= start_time_of_today - 604800) {
					in_lastest_week.historyList.push(item);
				} else if (lastest_time >= this.getLastMonthYesterday(date)) {
					in_lastest_month.historyList.push(item);
				} else {
					in_earlier_time.historyList.push(item);
				}
				*/

				if (lastest_time >= start_time_of_today - 86400 && lastest_time <= end_time_of_today) {
					yesterday.historyList.push(item);
				} else if (lastest_time >= start_time_of_today - 604800 && lastest_time <= end_time_of_today) {
					in_lastest_week.historyList.push(item);
				} else {
					in_earlier_time.historyList.push(item);
				}
			}
		}

		if (today.historyList.length > 0) {
			this.historyMedias.push(today);
		}

		if (yesterday.historyList.length > 0) {
			this.historyMedias.push(yesterday);
		}

		if (in_lastest_week.historyList.length > 0) {
			this.historyMedias.push(in_lastest_week);
		}

		/*
		if (in_lastest_month.historyList.length > 0) {
			this.historyMedias.push(in_lastest_month);
		}
		*/

		if (in_earlier_time.historyList.length > 0) {
			this.historyMedias.push(in_earlier_time);
		}

		if (!!callbackFunc) {
			callbackFunc();
		}
	}
};