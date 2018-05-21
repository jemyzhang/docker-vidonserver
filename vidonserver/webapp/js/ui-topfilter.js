var g_topfilter;

var topFilter = function() {
	g_topfilter = this;
}; 

topFilter.prototype = {
	//topFilterSataicDatas={};
	topFilterDatas:[{},{},{}],
	topFilterSelectedDatas:[],
	domPosition:{},

	init: function(domPosition) {
		this.loadFilterDatas();
		this.domPosition = domPosition;
		// click event for filter items
		var filterResult = this.topFilterSelectedDatas;
		
		/*
		$("#topnavblocktitle .librarySortBtn").live("click", function() {
			var topsortcontent = $("#topnavblock .topsortcontent");
			if ($(this).hasClass("selected")) {
				topsortcontent.hide();
				$(this).removeClass("selected");
			} else {
				topsortcontent.show();
				$(this).addClass("selected");
			}
		});
		*/

		$("#topnavblocktitle .libraryShowBtn").live("click", function() {
			var showtypeblock = $("#topnavblocktitle .showtypeblock");
			showtypeblock.show();
		})
		
		
		$("#topnavblocktitle .topbardropdown").live("mouseleave", function() {
			$("#topnavblocktitle .showtypeblock").hide();
		});
		

		$("#topnavblock .filtercontent span").live("click", function() {
			var filterType = $(this).parents().attr("filtertype");
			if ($(this).hasClass("selected")) {
				$(this).removeClass("selected");
				g_sortandfilter.selectFilter(g_siderBar.curSelectLibIndex, g_topBarControl.curSelectedType, filterType, "");
				//filterResult[index].splice($.inArray($(this).text(),filterResult[index]),1);
				//console.log(filterResult);
			} else {
				$(this).siblings().removeClass("selected");
				$(this).addClass("selected");

				if ( $(this).hasClass("filterAll") ) {
					g_sortandfilter.selectFilter(g_siderBar.curSelectLibIndex, g_topBarControl.curSelectedType, filterType, "");
				} else {
					g_sortandfilter.selectFilter(g_siderBar.curSelectLibIndex, g_topBarControl.curSelectedType, filterType, $(this).text());	
				}
				
				//filterResult[index].push($(this).text());
				//$(this).parents(".filtercontent").find("span").eq(0).removeClass("selected");
				//console.log(filterResult);
			}

			g_topfilter.getFilterResult();

			/*
			if (filterResult[0].length > 0 || filterResult[1].length > 0 || filterResult[2].length > 0) {
				var filter = new JsonObject();

				filter.country = filterResult[0].length == 0 ? '' : filterResult[0][0];
				filter.genre = filterResult[1].length == 0 ? '' : filterResult[1][0];
				filter.year = filterResult[2].length == 0 ? 0 : parseInt(filterResult[2][0]);

				g_sortandfilter.getAllMediaDatasByFilter(filter, 0, 20, function(data) {
					g_searchresult.dataProc(data);
				});
			}
			*/
		})
	},

	showFilterControl: function(libIndex, bShow) {
		var topfiltercontent=$("#topfilterlayer .topfiltercontent");

		if ( bShow ) {
			this.loadFilterDatas();

			//topfiltercontent.slideDown().siblings().slideUp();
			//$(this).addClass("down");
		} else {
			//topfiltercontent.slideUp();
			//$(this).removeClass("down");
		}	
	},

	setFilterSelected: function(libIndex, curTabType) {
		$("#topnavblock .filtercontent").each(function() {
			if ($(this).attr("filtertype") == 'genre') {
				$(this).children("span").eq(0).addClass('selected');
				return false;
			}
		});

		$("#topnavblock .filtercontent").each(function() {
			if ($(this).attr("filtertype") == 'country') {
				$(this).children("span").eq(0).addClass('selected');
				return false;
			}
		});

		$("#topnavblock .filtercontent").each(function() {
			if ($(this).attr("filtertype") == 'year') {
				$(this).children("span").eq(0).addClass('selected');
				return false;
			}
		});

		if (curTabType == 'movie') {
			var filter = g_sortandfilter.sortfilterInfo[libIndex].filter.movieFilter.and;
			if (typeof (filter) != "undefined") {
				for (var i = 0; i < filter.length; ++i) {
					if (filter[i].field == "genre") {
						$("#topnavblock .filtercontent").each(function() {
							if ($(this).attr("filtertype") == 'genre') {
								$("#topnavblock .filtercontent span").each(function(index) {
									if ($(this).text() == filter[i].value) {
										$(this).addClass('selected').siblings().removeClass('selected');
										return false;
									}
								});

								return false;
							}
						});
					}

					if (filter[i].field == "country") {
						$("#topnavblock .filtercontent").each(function() {
							if ($(this).attr("filtertype") == 'country') {
								$("#topnavblock .filtercontent span").each(function(index) {
									if ($(this).text() == filter[i].value) {
										$(this).addClass('selected').siblings().removeClass('selected');
										return false;
									}
								});

								return false;
							}
						});
					}

					if (filter[i].field == "year") {
						$("#topnavblock .filtercontent").each(function() {
							if ($(this).attr("filtertype") == 'year') {
								$("#topnavblock .filtercontent span").each(function(index) {
									if ($(this).text() == filter[i].value) {
										$(this).addClass('selected').siblings().removeClass('selected');
										return false;
									}
								});

								return false;
							}
						});
					}
				}
			}
		}

		if (curTabType == 'tvshow') {
			var filter = g_sortandfilter.sortfilterInfo[libIndex].filter.tvshowFilter.and;
			if (typeof (filter) != "undefined") {
				for (var i = 0; i < filter.length; ++i) {
					if (filter[i].field == "genre") {
						$("#topnavblock .filtercontent").each(function() {
							if ($(this).attr("filtertype") == 'genre') {
								$("#topnavblock .filtercontent span").each(function(index) {
									if ($(this).text() == filter[i].value) {
										$(this).addClass('selected').siblings().removeClass('selected');
										return false;
									}
								});

								return false;
							}
						});
					}

					if (filter[i].field == "country") {
						$("#topnavblock .filtercontent").each(function() {
							if ($(this).attr("filtertype") == 'country') {
								$("#topnavblock .filtercontent span").each(function(index) {
									if ($(this).text() == filter[i].value) {
										$(this).addClass('selected').siblings().removeClass('selected');
										return false;
									}
								});

								return false;
							}
						});
					}

					if (filter[i].field == "year") {
						$("#topnavblock .filtercontent").each(function() {
							if ($(this).attr("filtertype") == 'year') {
								$("#topnavblock .filtercontent span").each(function(index) {
									if ($(this).text() == filter[i].value) {
										$(this).addClass('selected').siblings().removeClass('selected');
										return false;
									}
								});

								return false;
							}
						});
					}
				}
			}
		}

		if (curTabType == 'all') {
			var filter = g_sortandfilter.sortfilterInfo[libIndex].filterForAllMedia;
			if (typeof (filter.genre) != "undefined") {
				$("#topnavblock .filtercontent").each(function() {
					if ($(this).attr("filtertype") == 'genre') {
						$("#topnavblock .filtercontent span").each(function(index) {
							if ($(this).text() == filter.genre) {
								$(this).addClass('selected').siblings().removeClass('selected');
								return false;
							}
						});

						return false;
					}
				});
			}

			if (typeof (filter.country) != "undefined") {
				$("#topnavblock .filtercontent").each(function() {
					if ($(this).attr("filtertype") == 'country') {
						$("#topnavblock .filtercontent span").each(function(index) {
							if ($(this).text() == filter.country) {
								$(this).addClass('selected').siblings().removeClass('selected');
								return false;
							}
						});

						return false;
					}
				});
			}

			if (typeof (filter.year) != "undefined") {
				$("#topnavblock .filtercontent").each(function() {
					if ($(this).attr("filtertype") == 'year') {
						$("#topnavblock .filtercontent span").each(function(index) {
							if ($(this).text() == filter.year) {
								$(this).addClass('selected').siblings().removeClass('selected');
								return false;
							}
						});

						return false;
					}
				});
			}
		}
	},

	loadFilterDatas: function () {
		var _this = this;
		var yfinish = false, gfinish = false, cfinish = false;
		var interval_id = -1;

		_this.topFilterDatas = [];
		_this.clearFilterDatas();

		var selectedMediaType = g_topBarControl.curSelectedType;
		var idlibrary = g_siderBar.curSelectLibId;

		if (selectedMediaType == "video") {
			this.addFilterData( "genre", [] );
			this.addFilterData( "year", [] );
			gfinish = true;
			yfinish = true;
		} else {
			g_sortandfilter.getGenres(idlibrary, selectedMediaType, function() {
				var filterGenresList = [];
				for (var i = 0; i < g_sortandfilter.mediaGenres.length; ++i) {
					filterGenresList.push(g_sortandfilter.mediaGenres[i].title);
				}

				_this.addFilterData( "genre", filterGenresList );
				gfinish = true;
			});

			g_sortandfilter.getYears(idlibrary, selectedMediaType, function() {
				var filterYearsList = [];

				for (var i = 0; i < g_sortandfilter.mediaYears.length; ++i) {
					filterYearsList.push(g_sortandfilter.mediaYears[i]);
				}

				_this.addFilterData( "year", filterYearsList );
				yfinish = true;
			});
		}

		if (selectedMediaType == "video" || selectedMediaType == "tvshow") {
			this.addFilterData( "country", [] );
			cfinish = true;
		} else {
			g_sortandfilter.getCountries(idlibrary, selectedMediaType, function() {
				var filterCountriesList = [];

				for (var i = 0; i < g_sortandfilter.mediaCountries.length; ++i) {
					filterCountriesList.push(g_sortandfilter.mediaCountries[i]);
				}

				_this.addFilterData( "country", filterCountriesList );
				cfinish = true;
			});
		}

		interval_id = setInterval(function () {
			if (yfinish && gfinish && cfinish) {
				clearInterval(interval_id);
			
				_this.domPosition.setTemplateURL("../template/topfilter.tpl?" + AppVersion);
				_this.domPosition.processTemplate(_this.topFilterDatas);

				if (g_sortandfilter.sortfilterInfo[g_siderBar.curSelectLibIndex].filterShow) {
					if (selectedMediaType != "video"){
						var topfiltercontent = $("#topnavblock .topfiltercontent");
						topfiltercontent.show();
						_this.setFilterSelected(g_siderBar.curSelectLibIndex, g_topBarControl.curSelectedType);
					}
				}
				
			}
		}, 50);
	},

	resetFilterPage: function() {
		g_topfilter.domPosition.setTemplateURL("../template/topfilter.tpl?" + AppVersion);
		g_topfilter.domPosition.processTemplate(g_topfilter.topFilterDatas);
	},

	addFilterData: function( type, data ) {
		var filterData = {};
		filterData.selectedall=$.i18n.prop('filter_5');

		filterData.filterType = type;
		filterData.filterList = data;
		if ( type == "genre" ) {
			filterData.filterName = $.i18n.prop('filter_3');
			this.topFilterDatas[0] = filterData;
		} else if ( type == "country" ) {
			filterData.filterName = $.i18n.prop('filter_2');
			this.topFilterDatas[1] = filterData;
		} else if ( type == "year" ) {
			filterData.filterName = $.i18n.prop('filter_4');
			this.topFilterDatas[2] = filterData;
		}
	},

	getFilterResult: function() {
		var propertyCount = 0;
		var curTabType = g_topBarControl.curSelectedType;
		var libIndex = g_siderBar.curSelectLibIndex;

		if (curTabType == 'movie') {
			if ( g_sortandfilter.sortfilterInfo[libIndex].filter.movieFilter.and ){
				propertyCount = g_sortandfilter.sortfilterInfo[libIndex].filter.movieFilter.and.length;
			}
		} else if (curTabType == 'tvshow') {
			if ( g_sortandfilter.sortfilterInfo[libIndex].filter.tvshowFilter.and ){
				propertyCount = g_sortandfilter.sortfilterInfo[libIndex].filter.tvshowFilter.and.length;
			}
		}

		if (propertyCount > 0) {
			if (curTabType == "movie") {
				g_movieControl.freshMainPageFilter( libIndex );
			} else if (curTabType == "tvshow") {
				g_tvshowControl.freshMainPageFilter( libIndex );
			} else if (curTabType == "video") {

			} else if (curTabType == "all") {
				g_multiMediaControl.freshMainPageFilter( libIndex );
			}
		} else {
			if (curTabType == "movie") {
				g_movieControl.freshMainPage( libIndex );
			} else if (curTabType == "tvshow") {
				g_tvshowControl.freshMainPageFilter( libIndex );
			} else if (curTabType == "video") {

			} else if (curTabType == "all") {
				g_multiMediaControl.freshMainPageFilter( libIndex );
			}
		}
	},

	clearFilterDatas: function() {
		$("#topfilterctx").html("");
	}
}