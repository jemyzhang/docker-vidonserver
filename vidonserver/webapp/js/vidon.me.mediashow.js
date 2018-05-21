 /*
  * vidon.me.mainpage.js
  * 2015-04-09
  * display movies, tvshows, etc.
  *
  */

 var global_image_url = 'http://' + window.location.host + '/image/';
 var global_count_timer = -1;
 var g_selected_type = "movie";
 var g_ShowRecentMedia = false;

 var g_mediaLibary;
 var MediaLibary = function() {
 	g_mediaLibary = this;
 }

 MediaLibary.prototype = {
 	libraryDatas: [],
 	
 	movieDatas: [],
 	movieCount: -1,
 	movieSetDatas: [],
 	curMovieSetId: -1,
 	curMovieDetail: {},
 	tvshowDatas: [],
 	tvshowCount: -1,
 	curTVShowDetail: {},
	curTVShowSeason: [],
	curTVShowSeasonDetail: {},
	curTVShowEpisodeDetail: {},
 	videoDatas: [],
 	curVideoDetail: {},
 	videoCount: -1,
 	photoDatas: [],
 	photoCount: -1,
 	channelDatas: [],
 	channelCount: -1,
 	searchResults: {},

	initLibraryDatas: function(callbackFunc) {
		this.libraryDatas.length = 0;

		g_customLibrary.getCustomLibraries(function() {
			var ret = g_customLibrary.retVal;

			if (ret) {
				var libArray = g_customLibrary.libArray;

				for (var i = 0; i < libArray.length; ++i) {
					var it = new LibraryData();

					it.id = libArray[i].LibraryId;
					it.name = libArray[i].name == "Commercial Library" ? $.i18n.prop('library_2') : libArray[i].name;
					it.isCustom = libArray[i].IsCustomLib;
					it.isAutoClass = libArray[i].IsSmartClassify;

					var sortfilterInfo = {};
					sortfilterInfo.libId = it.id;
					sortfilterInfo.sort = new JsonObject();
					sortfilterInfo.sort.method = 'title';
					sortfilterInfo.sort.order = 'ascending';
					sortfilterInfo.sortShow = false;
					sortfilterInfo.filter = new JsonObject();
					sortfilterInfo.filter.movieFilter = new Filter();
					sortfilterInfo.filter.tvshowFilter = new Filter();
					sortfilterInfo.filterForAllMedia = new JsonObject();
					sortfilterInfo.filterShow = false;
					g_sortandfilter.sortfilterInfo.push(sortfilterInfo);

					g_mediaLibary.libraryDatas.push(it);
				}

				g_mediaLibary.getMediaCount( -1, function() {
				} );

				g_siderBar.freshSiderbar();
				g_index.freshMainPage();

				if (!!callbackFunc) {
					callbackFunc();
				}
			}
		});
	},

	getLibraryDatas: function(callbackFunc) {
		this.libraryDatas.length = 0;

		g_customLibrary.getCustomLibraries(function() {
			var ret = g_customLibrary.retVal;

			if (ret) {
				var libArray = g_customLibrary.libArray;

				for (var i = 0; i < libArray.length; ++i) {
					var it = new LibraryData();

					it.id = libArray[i].LibraryId;
					it.name = libArray[i].name == "Commercial Library" ? $.i18n.prop('library_2') : libArray[i].name;
					it.isCustom = libArray[i].IsCustomLib;
					it.isAutoClass = libArray[i].IsSmartClassify;

					var j = 0;
					for (; j < g_sortandfilter.sortfilterInfo.length; ++j) {
						if (g_sortandfilter.sortfilterInfo[j].libId == it.id)
							break;
					}

					if (j == g_sortandfilter.sortfilterInfo.length) {
						if (i  <= j - 1) { // 新的，占用旧的index
							g_sortandfilter.sortfilterInfo[i].libId = it.id;
							g_sortandfilter.sortfilterInfo[i].sort.method = 'title';
							g_sortandfilter.sortfilterInfo[i].sort.order = 'ascending';
							delete g_sortandfilter.sortfilterInfo[i].filter.movieFilter;
							delete g_sortandfilter.sortfilterInfo[i].filter.tvshowFilter;
							delete g_sortandfilter.sortfilterInfo[i].filter;
							g_sortandfilter.sortfilterInfo[i].filter = new JsonObject();
							g_sortandfilter.sortfilterInfo[i].filter.movieFilter = new Filter();
							g_sortandfilter.sortfilterInfo[i].filter.tvshowFilter = new Filter();
							delete g_sortandfilter.sortfilterInfo[i].filterForAllMedia;
							sortfilterInfo.filterForAllMedia = new JsonObject();
							g_sortandfilter.sortfilterInfo[i].sortShow = false;
							g_sortandfilter.sortfilterInfo[i].filterShow = false;
						} else { // 新的，占用新的index
							var sortfilterInfo = {};
							sortfilterInfo.libId = it.id;
							sortfilterInfo.sort = new JsonObject();
							sortfilterInfo.sort.method = 'title';
							sortfilterInfo.sort.order = 'ascending';
							sortfilterInfo.sortShow = false;
							sortfilterInfo.filter = new JsonObject();
							sortfilterInfo.filter.movieFilter = new Filter();
							sortfilterInfo.filter.tvshowFilter = new Filter();
							sortfilterInfo.filterForAllMedia = new JsonObject();
							sortfilterInfo.filterShow = false;
							g_sortandfilter.sortfilterInfo.push(sortfilterInfo);
						}
					}

					g_mediaLibary.libraryDatas.push(it);
				}

				g_mediaLibary.getMediaCount( -1, function() {
				} );

				g_siderBar.freshSiderbar();
				g_index.freshMainPage();

				if (!!callbackFunc) {
					callbackFunc();
				}
			}
		});
	},

	freshLibraryDatas: function() {
		g_customLibrary.getCustomLibraries(function() {
			var ret = g_customLibrary.retVal;

			if (ret) {
				var libArray = g_customLibrary.libArray;

				var bNeedFreshSiderbar = false;
				for (var i = 0; i < libArray.length; ++i) {
					var tempLibData = g_mediaLibary.getLibDataById( libArray[i].LibraryId );

					if (!tempLibData) {
						var it = new LibraryData();

						it.id = libArray[i].LibraryId;
						it.name = libArray[i].name == "Commercial Library" ? $.i18n.prop('library_2') : libArray[i].name;
						it.isCustom = libArray[i].IsCustomLib;
						it.isAutoClass = true; // libArray[i].IsSmartClassify;

						g_mediaLibary.libraryDatas.push(it);

						bNeedFreshSiderbar = true;
					}
				}

				if (bNeedFreshSiderbar) {
					g_mediaLibary.getMediaCount(-1, function() {});
					g_siderBar.freshSiderbar();
				}
			}
		});
	},

	checkExistLibForName: function( libName ) {
		var bExist = false;
		var tempLibDatas = this.libraryDatas;

		for (var i = 0; i <  tempLibDatas.length; i++) {
			 if ( libName == tempLibDatas[i].name ) {
			 	bExist = true;
			 	break;
			 };
		};

		return bExist;
	},

	getLibDataById:function( libId ) {
		var tempLibDatas = this.libraryDatas;
		var resultLibData;

		for (var i = 0; i <  tempLibDatas.length; i++) {
			 if ( libId == tempLibDatas[i].id ) {
			 	resultLibData = tempLibDatas[i];
			 	break;
			 };
		};

		return resultLibData;
	},

	getLibIndexByLibId: function(libId) {
		var tempLibDatas = this.libraryDatas;
		var libIndex = 1;

		for (var i = 0; i <  tempLibDatas.length; i++) {
			 if ( libId == tempLibDatas[i].id ) {
			 	libIndex = i;
			 	break;
			 };
		};

		return libIndex;
	},

	getMediaCount: function(libIndex, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetAllLibraryItemsCounts',
			'params': {
			},
			'success': function(data) {
				if ( data && data.result && data.result.counts ) {
					var libCounts = data.result.counts;
					for (var i = 0; i < libCounts.length; i++) {
						var libCount = libCounts[i];
						var tempLibData = g_mediaLibary.getLibDataById( libCount.idlibrary );

						if (tempLibData) {
							if (libCount.idlibrary == tempLibData.id) {
								//libCount.amounts;
								//libCount.idlibrary;
								tempLibData.movieCountNew = libCount.movies;
								//libCount.tvshowfiles;
								tempLibData.tvshowCountNew = libCount.tvshows;
								tempLibData.videoCountNew = libCount.videos;

								tempLibData.mediaCountNew = libCount.movies;
								tempLibData.mediaCountNew += libCount.tvshows;
								tempLibData.mediaCountNew += libCount.videos;
							}
						}
						
						console.log( libCount );
					};
				};

				if (!!callbackFunc) {
					callbackFunc();
				}

				showFunctionGuidePage();

				/*
				setTimeout( function(){
					showFunctionGuidePage();
				}, 3000 );*/
				
			}
		});

		/*
		if (libIndex == -1) {
			for (var i = 0; i < this.libraryDatas.length; i++) {
				var isAutoClass = this.libraryDatas[i].isAutoClass;
				if (isAutoClass) {
					this.getMovieDatas(i, 1, 0, 1, callbackFunc);
					this.getTVShowDatas(i, 1, 0, 1, callbackFunc);
					this.getVideoDatas(i, 1, 0, 1, callbackFunc);
				} else {
					this.getAllMediaDatas(i, 1, 0, 1, callbackFunc);
				}
			};

			this.getChannelDatas(callbackFunc);
		} else if (libIndex < this.libraryDatas.length) {
			var isAutoClass = this.libraryDatas[libIndex].isAutoClass;
			if (isAutoClass) {
				this.getMovieDatas(libIndex, 1, 0, 1, callbackFunc);
				this.getTVShowDatas(libIndex, 1, 0, 1, callbackFunc);
				this.getVideoDatas(libIndex, 1, 0, 1, callbackFunc);
			} else {
				this.getAllMediaDatas(libIndex, 1, 0, 1, callbackFunc);
			}
		} else {

		}
		*/
	},

	startScanLibary: function(libraryIndex) {
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.StartScan',
			'params': {
				'LibraryId': this.libraryDatas[libraryIndex].id
			},
			'success': function(data) {
				g_scraperControl.startScraper(libraryIndex);
			}
		});
	},
	
	startScanLibraryById: function(libId) {
		vidonme.rpc.request({
			'context': this,
			'method': "VidOnMe.StartScan",
			'params': {
        		'LibraryId': libId
    		},
			'success': function(data) {
				var libIndex = -1;
				var tempLibDatas = g_mediaLibary.libraryDatas;
				for (var i = 0; i < tempLibDatas.length; i++) {
					if ( tempLibDatas[i].id == libId ){
						libIndex = i;
						break;
					}
				}

				if ( libIndex != -1 ) {
					g_scraperControl.startScraper( libIndex );
				}
			}
		});
	},

	freshLibary: function(libIndex) {
		this.getMediaCount( libIndex, function() {

			// force get data from server;
			g_mediaLibary.libraryDatas[libIndex].mediaCount = 0;
			g_mediaLibary.libraryDatas[libIndex].movieCount = 0;
			g_mediaLibary.libraryDatas[libIndex].tvshowCount = 0;
			g_mediaLibary.libraryDatas[libIndex].videoCount = 0;

			g_topBarControl.freshCurMediaTab();
		});
	},

	getAllMediaDatas: function(libraryIndex, mode, start, end, callbackFunc) {
		var __start = arguments[2] > -1 ? start : 0;
		var __end = arguments[3] > -1 ? end : 20;

		var obj = new JsonObject();
		var getMethod = 'VideoLibrary.GetAllVideoItems';
		obj.limits = new Limits(__start, __end);
		obj.sort = g_sortandfilter.sortfilterInfo[libraryIndex].sort;

		if ( mode == 4 ) {
			obj.filter = g_sortandfilter.sortfilterInfo[libraryIndex].filterForAllMedia;
		}

		obj.idlibrary = this.libraryDatas[libraryIndex].id;

		vidonme.rpc.request({
			'context': this,
			'method': getMethod,
			'params': obj,
			'success': function(data) {
				if ( data && data.result ) {
					if (mode == 4) {
						this.libraryDatas[libraryIndex].mediaCountFilter = data.result.limits.total;
					} else {
						this.libraryDatas[libraryIndex].mediaCount = data.result.limits.total;
					}

					console.log( this.libraryDatas[libraryIndex].name + " media count is: " +  data.result.limits.total );

					var tempDatas = [];
					if (mode == 4) {
						tempDatas = this.libraryDatas[libraryIndex].mediaDatasFilter;
					} else {
						tempDatas = this.libraryDatas[libraryIndex].mediaDatas;
					}

					if (data.result.limits.total == 0) {
						tempDatas = [];

						if (!!callbackFunc) {
							callbackFunc(libraryIndex);
						}
					} else {
						var newItemNum = data.result.limits.total - tempDatas.length;

						if (newItemNum < 0) {
							if (mode == 4) {
								this.libraryDatas[libraryIndex].mediaDatasFilter = [];
								tempDatas = this.libraryDatas[libraryIndex].mediaDatasFilter;
							} else {
								this.libraryDatas[libraryIndex].mediaDatas = [];
								tempDatas = this.libraryDatas[libraryIndex].mediaDatas;
							}

							newItemNum = data.result.limits.total;
						};

						if ( newItemNum > 0 ) {
							for (var i = 0; i < newItemNum; ++i) {
								var tempData = {};

								tempData.thumbnail = "";//encodeImage("");

								tempData.fileid = -1;
								tempData.fileindex = tempDatas.length;

								tempData.filepath = "";
								tempData.mediatype = "movie";
								tempData.title = "Loading...";

								tempData.setflag = false;
								tempData.filecount = 0;
								tempData.bInit = false;

								tempDatas.push( tempData );
							}
						}

						var tempDatasReturn = data.result.mediainfo;
						var count = tempDatasReturn.length;
						if ( count > 0 ) {
							var nStartPos = data.result.limits.start;
							for (var i = 0; i < tempDatasReturn.length; i++) {
								var tempData = {};
								tempData = tempDatasReturn[i];
								tempData.thumbnail = encodeImage(tempData.thumbnail);

								tempData.bInit = true;
								tempData.fileindex = tempDatas[nStartPos+i].fileindex;
								tempData.filepath = tempData.file;
								
								if ( tempData.filecount > 1 ) {
									tempData.setflag = true;
								};

								tempDatas[nStartPos+i] = tempData;
							};

							if (!!callbackFunc) {
								callbackFunc(libraryIndex);
							}

							/*
							if (mode == 4) {
								if (data.result.limits.start > 0) {
									this.libraryDatas[libraryIndex].mediaDatasFilter = this.libraryDatas[libraryIndex].mediaDatasFilter.concat(resultDatas);
								} else {
									this.libraryDatas[libraryIndex].mediaDatasFilter = resultDatas;
								}
							} else {
								if (data.result.limits.start > 0) {
									this.libraryDatas[libraryIndex].mediaDatas = this.libraryDatas[libraryIndex].mediaDatas.concat(resultDatas);
								} else {
									this.libraryDatas[libraryIndex].mediaDatas = resultDatas;
								}
							}

							if (data.result.limits.total > data.result.limits.end) {
								this.getAllMediaDatas(libraryIndex, mode, data.result.limits.end, data.result.limits.end + 20, callbackFunc );
								callbackFunc(libraryIndex);
							} else {
								callbackFunc(libraryIndex);
							}
							*/
						}
					}
				};
			}
		});
	},

 	// mode: 0: get all datas; 1: get count; 2: get datas with range; 4: get datas with filter
	getMovieDatas: function(libraryIndex, mode, start, end, callbackFunc) {
		var __start = arguments[2] > -1 ? start : 0;
		var __end = arguments[3] > -1 ? end : 20;

		var obj = new JsonObject();
		var getMethod = 'VideoLibrary.GetMovies';
		if (g_ShowRecentMedia) {
			getMethod = "VideoLibrary.GetRecentlyAddedMovies";
			obj.limits = new Limits(__start, __end);
		} else {
			obj.limits = new Limits(__start, __end);
			obj.sort = g_sortandfilter.sortfilterInfo[libraryIndex].sort;
		}

		obj.properties = new Array();
		obj.properties.push("file");
		obj.properties.push("year");
		obj.properties.push("thumbnail");
		obj.properties.push("runtime");
		obj.properties.push("title");

		if ( mode == 4 ) {
			obj.filter = g_sortandfilter.sortfilterInfo[libraryIndex].filter.movieFilter;
		}

		obj.withset = true;
		obj.idset = 0;
		obj.idlibrary = this.libraryDatas[libraryIndex].id;

		console.log( this.libraryDatas[libraryIndex].name + " get movie datas: " + __start + "-" + __end + "-" + mode );
		
		vidonme.rpc.request({
			'context': this,
			'method': getMethod,
			'params': obj,
			'success': function(data) {
				if (data && data.result) {
					if (mode == 4) {
						this.libraryDatas[libraryIndex].movieCountFilter = data.result.limits.total;
					} else {
						this.libraryDatas[libraryIndex].movieCount = data.result.limits.total;
					}
					
					console.log( this.libraryDatas[libraryIndex].name + " movie count is: " +  data.result.limits.total );

					var tempDatas;
					if (mode == 4) {
						tempDatas = this.libraryDatas[libraryIndex].movieDatasFilter;
					} else {
						tempDatas = this.libraryDatas[libraryIndex].movieDatas;
					}

					if (data.result.limits.total == 0) {
						tempDatas = [];
						
						if (!!callbackFunc) {
							callbackFunc(libraryIndex);
						}
					} else {
						var newItemNum = data.result.limits.total - tempDatas.length;

						if (newItemNum < 0) {
							if (mode == 4) {
								this.libraryDatas[libraryIndex].movieDatasFilter = [];
								tempDatas = this.libraryDatas[libraryIndex].movieDatasFilter;
							} else {
								this.libraryDatas[libraryIndex].movieDatas = [];
								tempDatas = this.libraryDatas[libraryIndex].movieDatas;
							}

							newItemNum = data.result.limits.total;
						};

						if ( newItemNum > 0 ) {
							for (var i = 0; i < newItemNum; ++i) {
								var movieData = {};

								movieData.thumbnail = "";//encodeImage("");

								movieData.fileid = -1;
								movieData.fileindex = tempDatas.length;

								movieData.filepath = "";
								movieData.name = "Loading...";

								movieData.setflag = false;
								movieData.filecount = 0;
								movieData.bInit = false;

								tempDatas.push( movieData );
							}
						}

						var count = 0;
						if ( data.result.movies ) {
							count = data.result.movies.length;
						}

						if ( count > 0 ) {
							var nStartPos = data.result.limits.start;
							for (var i = 0; i < count; ++i) {
								var movieData = {};
								movieData.thumbnail = encodeImage(data.result.movies[i].thumbnail);

								movieData.fileid = data.result.movies[i].idfile;
								movieData.fileindex = data.result.limits.start + i;

								movieData.filepath = data.result.movies[i].file;
								movieData.name = data.result.movies[i].title;

								movieData.setflag = data.result.movies[i].setflag;
								movieData.filecount = data.result.movies[i].filecount;

								movieData.bInit = true;

								tempDatas[nStartPos+i] = movieData;
							}

							//this.libraryDatas[libraryIndex].movieDatas = tempDatas;

							if (!!callbackFunc) {
								callbackFunc(libraryIndex);
							}

							/*
							if (mode == 4) {
								if (data.result.limits.start > 0) {
									this.libraryDatas[libraryIndex].movieDatasFilter = this.libraryDatas[libraryIndex].movieDatasFilter.concat(tempMovieDatas);
								} else {
									this.libraryDatas[libraryIndex].movieDatasFilter = tempMovieDatas;
								}
							} else {
								if (data.result.limits.start > 0) {
									this.libraryDatas[libraryIndex].movieDatas = this.libraryDatas[libraryIndex].movieDatas.concat(tempMovieDatas);
								} else {
									this.libraryDatas[libraryIndex].movieDatas = tempMovieDatas;
								}
							}

							if (data.result.limits.total > data.result.limits.end) {
								this.getMovieDatas(libraryIndex, mode, data.result.limits.end, data.result.limits.end + 20, callbackFunc );
								callbackFunc(libraryIndex);
							} else {
								callbackFunc(libraryIndex);
							}
							*/
						}
					}
				}
			}
		});
	},

	getMovieSetDatas: function(libIndex, idfile, callbackFunc) {
		var obj = new JsonObject();
		var getMethod = 'VideoLibrary.GetMovies';
		obj.limits = new Limits(0, 100);
		obj.sort = g_sortandfilter.sortfilterInfo[libIndex].sort;

		obj.properties = new Array();
		obj.properties.push("file");
		obj.properties.push("year");
		obj.properties.push("thumbnail");
		obj.properties.push("runtime");
		obj.properties.push("title");

		obj.withset = true;
		obj.idset = idfile;
		obj.idlibrary = this.libraryDatas[libIndex].id;
		this.curMovieSetId = idfile;

		vidonme.rpc.request({
			'context': this,
			'method': getMethod,
			'params': obj,
			'success': function(data) {
				if (data && data.result) {
					if (data.result.limits.end != -1) {
						var tempMovieSetDatas = []
						var moiveNames = [];
						for (var i = 0; i < data.result.limits.end - data.result.limits.start; ++i) {
							var poster = encodeImage(data.result.movies[i].thumbnail);
							var name = data.result.movies[i].title;
							moiveNames.push(name);

							var movieData = {};

							movieData.filepath = data.result.movies[i].file;
							movieData.meta = data.result.movies[i].meta;
							movieData.thumbnail = poster;
							movieData.fileid = data.result.movies[i].idfile;
							movieData.name = name;
							movieData.setflag = data.result.movies[i].setflag;
							movieData.filecount = data.result.movies[i].filecount;
							tempMovieSetDatas.push(movieData);
						}

						for (var i = 0; i < tempMovieSetDatas.length; i++) {
							var movieData = tempMovieSetDatas[i];
							var name = movieData.name;
							var firstPos = $.inArray(name, moiveNames);
							if (firstPos != -1) {
								if ($.inArray(name, moiveNames, firstPos + 1) != -1) {
									if ( movieData.meta && movieData.meta.length > 0 ) {
										tempMovieSetDatas[i].typecss = checkMeidaType(movieData.meta);
									};
								}
							}
						}

						this.movieSetDatas = tempMovieSetDatas;

						if (!!callbackFunc) {
							callbackFunc();
						}
					}
				}
			}
		});
	},

 	getMovieDetail: function(idfile, callbackFunc) {
 		vidonme.rpc.request({
 			'context': this,
 			'method': "VideoLibrary.GetMovieDetails",
 			'params': {
 				"idfile": idfile
 			},
 			'success': function(data) {
 				if (!!data && !!data.result) {
 					var tempMovieDetail = {};

					var tempCountry = [], tempGenre = [], tempCast = [];
					if (!!data.result.moviedetails) {
						if (!!data.result.moviedetails.cast) {
							for (var i = 0; i < data.result.moviedetails.cast.length; ++i) {
								var eachCast = {};
								eachCast.name = data.result.moviedetails.cast[i].name;
								eachCast.role = data.result.moviedetails.cast[i].role;

								if (data.result.moviedetails.cast[i].thumbnail) {
									eachCast.thumbnail = encodeImage(data.result.moviedetails.cast[i].thumbnail);
								} else {
									eachCast.thumbnail = '../images/movie/default_actor.png';
								}

								tempCast.push(eachCast);
							}
						};
						
						tempMovieDetail.cast = tempCast;

						if (!!data.result.moviedetails.country) {
							for (var i = 0; i < data.result.moviedetails.country.length; ++i) {
								var str = data.result.moviedetails.country[i];
								if (str[0] == ' ') {
									str = str.substr(1);
								}

								if (str[str.length - 1] == ' ') {
									str = str.substr(0, str.length - 1);
								}

								tempCountry.push(str);
							}
						};

						tempMovieDetail.country = tempCountry;
						tempMovieDetail.director = data.result.moviedetails.director; // TODO: put into an array
						tempMovieDetail.filepath = data.result.moviedetails.file;

						if (!!data.result.moviedetails.genre) {
							for (var i = 0; i < data.result.moviedetails.genre.length; ++i) {
								var str = data.result.moviedetails.genre[i];
								if (str[0] == ' ') {
									str = str.substr(1);
								}

								if (str[str.length - 1] == ' ') {
									str = str.substr(0, str.length - 1);
								}

								tempGenre.push(str);
							}
						};

						tempMovieDetail.genre = tempGenre;
						
						tempMovieDetail.idfile = data.result.moviedetails.idfile;

						tempMovieDetail.mpaa = data.result.moviedetails.mpaa;
						tempMovieDetail.plot = data.result.moviedetails.plot;
						tempMovieDetail.decimalrating = data.result.moviedetails.rating == "" ? "0" : data.result.moviedetails.rating;

						tempMovieDetail.rating = HandleRating(data.result.moviedetails.rating);
						tempMovieDetail.strrating = data.result.moviedetails.rating;
						tempMovieDetail.runtime = formateIntToTime(data.result.moviedetails.runtime);
						tempMovieDetail.thumbnail = encodeImage(data.result.moviedetails.thumbnail);
						tempMovieDetail.title = data.result.moviedetails.title;
						tempMovieDetail.votes = data.result.moviedetails.votes;
						tempMovieDetail.year = data.result.moviedetails.year;

						if (!!data.result.moviedetails.backdrop) {
							tempMovieDetail.backdrop = encodeImage(data.result.moviedetails.backdrop);
						}
					}

					this.curMovieDetail = tempMovieDetail;

					if (!!callbackFunc) {
						callbackFunc();
					}
				}
			}
		});
 	},

 	getTVShowDatas: function(libraryIndex, mode, start, end, callbackFunc) {
 		var __start = arguments[2] > -1 ? start : 0;
 		var __end = arguments[3] > -1 ? end : 20;

 		var obj = new JsonObject();
 		var getMethod = '';

 		if (g_ShowRecentMedia) {
 			getMethod = 'VideoLibrary.GetRecentlyAddedTVShows';
 		} else {
 			getMethod = 'VideoLibrary.GetTVShows';
 			obj.sort = g_sortandfilter.sortfilterInfo[libraryIndex].sort;
 		}

 		if ( mode == 4 ) {
 			obj.filter = g_sortandfilter.sortfilterInfo[libraryIndex].filter.tvshowFilter;
 		}

 		obj.limits = new Limits(__start, __end);

 		obj.properties = new Array();
 		obj.properties.push("file");
 		obj.properties.push("plot");
 		obj.properties.push("thumbnail");
 		obj.properties.push("title");
 		obj.properties.push("year");
 		obj.properties.push("season");
 		obj.properties.push("episode");

 		obj.idlibrary = this.libraryDatas[libraryIndex].id;

 		vidonme.rpc.request({
 			'context': this,
 			'method': getMethod,
 			'params': obj,
 			'success': function(data) {
 				if (data && data.result) {
 					if (mode == 4) {
						this.libraryDatas[libraryIndex].tvshowCountFilter = data.result.limits.total;
					} else {
						this.libraryDatas[libraryIndex].tvshowCount = data.result.limits.total;
					}

					console.log( this.libraryDatas[libraryIndex].name + " tvshow count is: " +  data.result.limits.total );

 					if (data.result.limits.total == 0) {
 						if ( mode == 4 ) {
 							this.libraryDatas[libraryIndex].tvshowDatasFilter = [];
 						} else {
 							this.libraryDatas[libraryIndex].tvshowDatas = [];
 						}

 						if (!!callbackFunc) {
 							callbackFunc(libraryIndex);
 						}
 					} else {
 						var colNum = 6;
 						var count = 0;

 						if ( data.result.tvshows ) {
 							count = data.result.tvshows.length;
 						}

 						var tempTVShowDatas = [];

 						for (var i = 0; i < count; ++i) {
 							var eachTVshowData = {};
 							eachTVshowData.idtvshow = data.result.tvshows[i].idtvshow;
 							eachTVshowData.fileindex = data.result.limits.start + i;

 							eachTVshowData.thumbnail = encodeImage(data.result.tvshows[i].thumbnail);
 							eachTVshowData.title = data.result.tvshows[i].title;

 							tempTVShowDatas.push(eachTVshowData);
 						}

						if (mode == 4) {
							if (data.result.limits.start > 0) {
								this.libraryDatas[libraryIndex].tvshowDatasFilter = this.libraryDatas[libraryIndex].tvshowDatasFilter.concat(tempTVShowDatas);
							} else {
								this.libraryDatas[libraryIndex].tvshowDatasFilter = tempTVShowDatas;
							}
						} else {
							if (data.result.limits.start > 0) {
								this.libraryDatas[libraryIndex].tvshowDatas = this.libraryDatas[libraryIndex].tvshowDatas.concat(tempTVShowDatas);
							} else {
								this.libraryDatas[libraryIndex].tvshowDatas = tempTVShowDatas;
							}
						}

 						if (data.result.limits.total > data.result.limits.end) {
 							if (!!callbackFunc) {
 								callbackFunc(libraryIndex);
 							}
 							this.getTVShowDatas(libraryIndex, mode, data.result.limits.end, data.result.limits.total, callbackFunc);
 						} else {
 							if (!!callbackFunc) {
 								callbackFunc(libraryIndex);
 							}
 						}
 					}
 				}
 			}
 		});
 	},

 	getTVShowDetail: function(idtvshow, callbackFunc) {
 		vidonme.rpc.request({
 			'context': this,
 			'method': 'VideoLibrary.GetTvShowDetails',
 			'params': {
 				'idtvshow': idtvshow
 			},
 			'success': function(data) {
 				if (data && data.result) {

 					var tempTVShowDetail = {};

 					var tempCountry = [], tempGenre = [], tempCast = [];
					for (var i = 0; i < data.result.tvshowdetails.cast.length; ++i) {
						var eachCast = {};
						eachCast.name = data.result.tvshowdetails.cast[i].name;
						eachCast.role = data.result.tvshowdetails.cast[i].role;

						eachCast.thumbnail = encodeImage(data.result.tvshowdetails.cast[i].thumbnail, '../images/movie/default_actor.png');

						tempCast.push(eachCast);
					}

					tempTVShowDetail.cast = tempCast;

					if (!!data.result.tvshowdetails.genre) {
						for (var i = 0; i < data.result.tvshowdetails.genre.length; ++i) {
							var str = data.result.tvshowdetails.genre[i];
							if (str[0] == ' ') {
								str = str.substr(1);
							}

							if (str[str.length - 1] == ' ') {
								str = str.substr(0, str.length - 1);
							}

							tempGenre.push(str);
						}
					};

					tempTVShowDetail.genre = tempGenre;

					tempTVShowDetail.idfile = data.result.tvshowdetails.idtvshow;
					tempTVShowDetail.idtvshow = idtvshow;

					//tempTVShowDetail.meta = meta;
					//tempTVShowDetail.filetype = setMediaMaterialType(data.result.tvshowdetails.meta);

					tempTVShowDetail.mpaa = data.result.tvshowdetails.mpaa;
					tempTVShowDetail.plot = data.result.tvshowdetails.plot;
					tempTVShowDetail.decimalrating = data.result.tvshowdetails.rating == "" ? "0" : data.result.tvshowdetails.rating;

					tempTVShowDetail.rating = HandleRating(data.result.tvshowdetails.rating);
					tempTVShowDetail.strrating = data.result.tvshowdetails.rating;
					//tempTVShowDetail.runtime = formateIntToTime(data.result.tvshowdetails.runtime);
					tempTVShowDetail.thumbnail = encodeImage(data.result.tvshowdetails.thumbnail);
					tempTVShowDetail.title = data.result.tvshowdetails.title;
					tempTVShowDetail.votes = data.result.tvshowdetails.votes;
					tempTVShowDetail.year = data.result.tvshowdetails.year;

					// now server don't return director info.
					if (!!data.result.tvshowdetails.country) {
						for (var i = 0; i < data.result.tvshowdetails.country.length; ++i) {
							var str = data.result.tvshowdetails.country[i];
							if (str[0] == ' ') {
								str = str.substr(1);
							}

							if (str[str.length - 1] == ' ') {
								str = str.substr(0, str.length - 1);
							}

							tempCountry.push(str);
						}
					};

					tempTVShowDetail.country = tempCountry;
					tempTVShowDetail.director = data.result.tvshowdetails.director;

					if (data.result.tvshowdetails.backdrop) {
						tempTVShowDetail.backdrop = encodeImage(data.result.tvshowdetails.backdrop);
					}

 					tempTVShowDetail.detailtype = "tvshow";

 					this.curTVShowDetail = tempTVShowDetail;

 					if (!!callbackFunc) {
 						callbackFunc();
 					}
 				}
 			}
 		});
 	},

	getSeasonDatas: function(libraryIndex, idtvshow, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': 'VideoLibrary.GetEpisodes',
			'params': {
				'idlibrary': this.libraryDatas[libraryIndex].id,
				'idtvshow': idtvshow
			},
			'success': function(data) {
				if (!!data && !!data.result) {
					var seasons = data.result.seasons;
					
					for (var i = 0; i < seasons.length; ++i) {
						seasons[i].thumbnail = encodeImage(seasons[i].thumbnail);
						
						var seasonTitle = $.i18n.prop('index_179');
						seasonTitle = seasonTitle.format( seasons[i].iseason );
						seasons[i].seasonTitle = seasonTitle;

						var episodes = seasons[i].episodes;
						for (var ii = 0; ii < episodes.length; ++ii) {
							episodes[ii].thumbnail = encodeImage(episodes[ii].thumbnail);

							episodes[ii].numepisode = episodes[ii].episode;
							var episodeTitle = $.i18n.prop('index_240'); // TODO
							episodes[ii].episode = episodeTitle.format( episodes[ii].episode );
							episodes[ii].playTitle = seasons[i].seasonTitle + "-" + episodes[ii].episode;
						}

						seasons[i].episodes = episodes;
					}
					
					this.curTVShowSeason = seasons;
	
					if (!!callbackFunc) {
						callbackFunc();
					}
				}
			}
		});
	},

	getSeasonDetails: function(idtvshow, idseason, tvshowIndex, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': 'VideoLibrary.getSeasonDetails',
			'params': {
				'idtvshow': idtvshow,
				'iseason': idseason
			},
			'success': function(data) {
 				if (!!data && !!data.result) {
 					var tempTVShowSeasonDetail = {};

					if ( data.result.seasondetails ) {
						var tempCountry = [],
							tempGenre = [],
							tempCast = [];
						for (var i = 0; i < data.result.seasondetails.cast.length; ++i) {
							var eachCast = {};
							eachCast.name = data.result.seasondetails.cast[i].name;
							eachCast.role = data.result.seasondetails.cast[i].role;

							eachCast.thumbnail = encodeImage(data.result.seasondetails.cast[i].thumbnail, '../images/movie/default_actor.png');

							tempCast.push(eachCast);
						}

						tempTVShowSeasonDetail.cast = tempCast;

						if (!!data.result.seasondetails.genre) {
							for (var i = 0; i < data.result.seasondetails.genre.length; ++i) {
								var str = data.result.seasondetails.genre[i];
								if (str[0] == ' ') {
									str = str.substr(1);
								}

								if (str[str.length - 1] == ' ') {
									str = str.substr(0, str.length - 1);
								}

								tempGenre.push(str);
							}
						};

						tempTVShowSeasonDetail.genre = tempGenre;

						tempTVShowSeasonDetail.idfile = data.result.seasondetails.idtvshow;

						tempTVShowSeasonDetail.mpaa = data.result.seasondetails.mpaa;
						tempTVShowSeasonDetail.plot = data.result.seasondetails.plot;
						
						tempTVShowSeasonDetail.thumbnail = encodeImage(data.result.seasondetails.thumbnail);

						tempTVShowSeasonDetail.title = data.result.seasondetails.title;
						tempTVShowSeasonDetail.year = data.result.seasondetails.year;

						// now server don't return director info.
						if (!!data.result.seasondetails.country) {
							for (var i = 0; i < data.result.seasondetails.country.length; ++i) {
								var str = data.result.seasondetails.country[i];
								if (str[0] == ' ') {
									str = str.substr(1);
								}

								if (str[str.length - 1] == ' ') {
									str = str.substr(0, str.length - 1);
								}

								tempCountry.push(str);
							}
						};

						tempTVShowSeasonDetail.country = tempCountry;
						tempTVShowSeasonDetail.director = data.result.seasondetails.director;

						if (!!data.result.seasondetails.backdrop) {
							tempTVShowSeasonDetail.backdrop = encodeImage(data.result.seasondetails.backdrop);
						} else {
							tempTVShowSeasonDetail.backdrop = this.curTVShowDetail.backdrop;
						}		
					}

					var seasonTitle = $.i18n.prop('index_179');
					seasonTitle = seasonTitle.format(idseason);

					tempTVShowSeasonDetail.subtitle = seasonTitle;
					tempTVShowSeasonDetail.votes = this.curTVShowDetail.votes;

					tempTVShowSeasonDetail.decimalrating = this.curTVShowDetail.decimalrating;

					tempTVShowSeasonDetail.rating = HandleRating(this.curTVShowDetail.decimalrating);
					tempTVShowSeasonDetail.strrating = this.curTVShowDetail.strrating;
					tempTVShowSeasonDetail.detailtype = "tvshow_season";

					this.curTVShowSeasonDetail = tempTVShowSeasonDetail;

					this.curTVShowSeasonDetail.episodes = this.curTVShowSeason[tvshowIndex].episodes;

					if (!!callbackFunc) {
						callbackFunc();
					}
 				}
			}
		});
	},
	
	getEpisodeDetails: function(idfile, idseason, idepisode, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': 'VideoLibrary.GetEpisodeDetails',
			'params': {
				'idfile': idfile
			},
			'success': function(data) {
				if (!!data && !!data.result) {
					var tempEpisodeDetail = {};

 					var tempCountry = [], tempGenre = [], tempCast = [];
					for (var i = 0; i < data.result.episodedetails.cast.length; ++i) {
						var eachCast = {};
						eachCast.name = data.result.episodedetails.cast[i].name;
						eachCast.role = data.result.episodedetails.cast[i].role;

						eachCast.thumbnail = encodeImage(data.result.episodedetails.cast[i].thumbnail, '../images/movie/default_actor.png');

						tempCast.push(eachCast);
					}

					tempEpisodeDetail.cast = tempCast;

					if (!!!data.result.episodedetails.genre) {
						data.result.episodedetails.genre = this.curTVShowDetail.genre;
					}

					for (var i = 0; i < data.result.episodedetails.genre.length; ++i) {
						var str = data.result.episodedetails.genre[i];
						if (str[0] == ' ') {
							str = str.substr(1);
						}

						if (str[str.length - 1] == ' ') {
							str = str.substr(0, str.length - 1);
						}

						tempGenre.push(str);
					}

					tempEpisodeDetail.genre = tempGenre;

					tempEpisodeDetail.idfile = data.result.episodedetails.idfile;
					tempEpisodeDetail.idtvshow = data.result.episodedetails.idtvshow;

					tempEpisodeDetail.mpaa = data.result.episodedetails.mpaa;
					tempEpisodeDetail.plot = data.result.episodedetails.plot;
					tempEpisodeDetail.decimalrating = this.curTVShowDetail.decimalrating;

					tempEpisodeDetail.rating = HandleRating(this.curTVShowDetail.decimalrating);
					tempEpisodeDetail.strrating = this.curTVShowDetail.strrating;
					tempEpisodeDetail.thumbnail = encodeImage(data.result.episodedetails.thumbnail);
					
					var seasonTitle = $.i18n.prop('index_179');
					seasonTitle = seasonTitle.format(idseason);

					var episodeTitle = $.i18n.prop('index_240');
					episodeTitle = episodeTitle.format(idepisode);

					tempEpisodeDetail.title = this.curTVShowDetail.title;
					tempEpisodeDetail.subtitle = seasonTitle + " " + episodeTitle;
					tempEpisodeDetail.votes = this.curTVShowDetail.votes;
					tempEpisodeDetail.year = data.result.episodedetails.year;
					tempEpisodeDetail.file = data.result.episodedetails.file;

					// now server don't return director info.
					if (!!!data.result.episodedetails.country) {
						data.result.episodedetails.country = this.curTVShowDetail.country;
					}

					for (var i = 0; i < data.result.episodedetails.country.length; ++i) {
						var str = data.result.episodedetails.country[i];
						if (str[0] == ' ') {
							str = str.substr(1);
						}

						if (str[str.length - 1] == ' ') {
							str = str.substr(0, str.length - 1);
						}

						tempCountry.push(str);
					}

					tempEpisodeDetail.country = tempCountry;
					tempEpisodeDetail.runtime = formatTime(data.result.episodedetails.runtime);
					tempEpisodeDetail.director = data.result.episodedetails.director;

					if (!!data.result.episodedetails.backdrop) {
						tempEpisodeDetail.backdrop = encodeImage(data.result.episodedetails.backdrop);
					} else {
						tempEpisodeDetail.backdrop = this.curTVShowDetail.backdrop;
					}

 					tempEpisodeDetail.detailtype = "tvshow_episode";

 					this.curTVShowEpisodeDetail = tempEpisodeDetail;

 					if (!!callbackFunc) {
 						callbackFunc();
 					}
				}
			}
		});
	},

	getVideoDatas: function(libraryIndex, mode, start, end, callbackFunc) {
		var __start = arguments[2] > -1 ? start : 0;
		var __end = arguments[3] > -1 ? end : 20;

		var obj = new JsonObject();
		var getMethod = '';

		obj.limits = new Limits(__start, __end);

		getMethod = 'VideoLibrary.GetPrivVideos';

		obj.sort = g_sortandfilter.sortfilterInfo[libraryIndex].sort;
		obj.properties = new Array();
		obj.properties.push("file");
		obj.properties.push("thumbnail");
		obj.properties.push("title");
		obj.properties.push("runtime");

		obj.idlibrary = this.libraryDatas[libraryIndex].id;

		vidonme.rpc.request({
			'context': this,
			'method': getMethod,
			'params': obj,
			'success': function(data) {
				if (data && data.result) {
					this.libraryDatas[libraryIndex].videoCount = data.result.limits.total;
					console.log( this.libraryDatas[libraryIndex].name + " video count is: " +  data.result.limits.total );

					if (data.result.limits.total == 0) {
						this.libraryDatas[libraryIndex].videoDatas = [];
						callbackFunc(libraryIndex);
					} else {
						var tempDatas = this.libraryDatas[libraryIndex].videoDatas;
						var newItemNum = data.result.limits.total - tempDatas.length;

						if ( newItemNum < 0 ) {
							this.libraryDatas[libraryIndex].videoDatas = [];
							tempDatas = this.libraryDatas[libraryIndex].videoDatas
							newItemNum = data.result.limits.total;
						};

						if ( newItemNum > 0 ) {
							for (var i = 0; i < newItemNum; i++) {
								 var tempData = {};
								 tempData.idfile = -1;
								 tempData.file = "";
								 tempData.thumbnail = "";
								 tempData.fileindex = tempDatas.length;
								 tempData.title = "Loading...";

								 tempData.bInit = false;
								 tempDatas.push( tempData );
							};
						}

						var count = data.result.limits.end - data.result.limits.start;
						var nStartPos = data.result.limits.start;
						for (var i = 0; i < count; ++i) {
							var tempData = data.result.privvideos[i];
							tempData.thumbnail = encodeImage(tempData.thumbnail, "../images/movie/deafult_poster_3.png");
							tempData.fileindex = data.result.limits.start + i;
							tempData.bInit = true;
							
							tempDatas[nStartPos + i] = tempData;
						}

						if (!!callbackFunc) {
							callbackFunc(libraryIndex);
						}

						/*
						if (data.result.limits.start > 0) {
							this.libraryDatas[libraryIndex].videoDatas = this.libraryDatas[libraryIndex].videoDatas.concat(tempVideoDatas);
						} else {
							this.libraryDatas[libraryIndex].videoDatas = tempVideoDatas;
						}

						if (mode == 0 && data.result.limits.total > data.result.limits.end) {
							callbackFunc(libraryIndex);
							this.getVideoDatas(libraryIndex, mode, data.result.limits.end, data.result.limits.total, callbackFunc);
						} else {
							callbackFunc(libraryIndex);
						}
						*/
					}
				}
			}
		});
	},

	getVideoDetail: function( fileid, callbackFunc ) {
		vidonme.rpc.request({
			'context': this,
			'method': 'VideoLibrary.GetPrivVideoDetails',
			'params': {
				'idfile': fileid
			},
			'success': function(data) {
				if ( data && data.result ) {
					var tempDetails = data.result.videodetails;
					var tempDetailData = {};

					var tempCountry = [], tempGenre = [], tempCast = [];
					if ( !!tempDetails.cast ) {
						for (var i = 0; i < tempDetails.cast.length; ++i) {
							var eachCast = {};
							eachCast.name = tempDetails.cast[i].name;
							eachCast.role = tempDetails.cast[i].role;

							if ( tempDetails.cast[i].thumbnail ) {
								eachCast.thumbnail = encodeImage( tempDetails.cast[i].thumbnail );
							} else {
								eachCast.thumbnail = '../images/movie/default_actor.png';
							}

							tempCast.push(eachCast);
						}
					};
					tempDetailData.cast = tempCast;

					if (!!data.result.videodetails.country) {
						for (var i = 0; i < data.result.videodetails.country.length; ++i) {
							var str = data.result.videodetails.country[i];
							if (str[0] == ' ') {
								str = str.substr(1);
							}

							if (str[str.length - 1] == ' ') {
								str = str.substr(0, str.length - 1);
							}

							tempCountry.push(str);
						}
					};

					tempDetailData.country = tempCountry;
					tempDetailData.director = tempDetails.director;
					tempDetailData.filepath = tempDetails.file;

					var genre_p = '';
					for (var i = 0; i < tempDetails.genre.length; ++i) {
						if (i != tempDetails.genre.length - 1) {
							genre_p += tempDetails.genre[i] + ', ';
						} else {
							genre_p += tempDetails.genre[i];
						}
					}

					if (!!data.result.videodetails.genre) {
						for (var i = 0; i < data.result.videodetails.genre.length; ++i) {
							var str = data.result.videodetails.genre[i];
							if (str[0] == ' ') {
								str = str.substr(1);
							}

							if (str[str.length - 1] == ' ') {
								str = str.substr(0, str.length - 1);
							}

							tempGenre.push(str);
						}
					};

					tempDetailData.genre = tempGenre;

					tempDetailData.idfile = tempDetails.idfile;

					tempDetailData.mpaa = tempDetails.mpaa;
					tempDetailData.plot = tempDetails.plot;
					tempDetailData.decimalrating = tempDetails.rating == "" ? "0" : tempDetails.rating;

					tempDetailData.rating = HandleRating(tempDetails.rating);
					tempDetailData.strrating = tempDetails.rating;
					tempDetailData.runtime = formateIntToTime(tempDetails.runtime);
					tempDetailData.thumbnail = encodeImage(tempDetails.thumbnail);
					tempDetailData.title = tempDetails.title;
					tempDetailData.votes = tempDetails.votes;
					tempDetailData.year = tempDetails.year;
					tempDetailData.filepath = tempDetails.file;

					this.curVideoDetail = tempDetailData;
				};

				if (!!callbackFunc) {
					callbackFunc();
				}
			}
		});
		
	},

 	getPhotoDatas: function() {

 	},

 	getChannelDatas: function(callbackFunc) {
 		var path = "addons://enabled/xbmc.addon.video/";
 		vidonme.rpc.request({
 			'context': this,
 			'method': 'OnlineChannels.GetDirectory',
 			'params': {
 				"strPath": path
 			},
 			'success': function(data) {
 				if (data && data.result && data.result.result) {
 					this.channelCount = data.result.items.length;

 					var tempItems = data.result.items;

 					for (var i = tempItems.length - 1; i >= 0; i--) {
 						tempItems[i].strThumbnail = encodeImage(tempItems[i].strThumbnail);
 					};

 					this.channelDatas = tempItems;

 					if (!!callbackFunc) {
 						callbackFunc();
 					}
 				}
 			}
 		});
 	},

	moveVideoItems: function(srcLibId, destLibId, videoItems, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.MoveVideoItems',
			'params': {
				"srclibid": srcLibId,
				"destlibid": destLibId,
				"mediaobjs": {
					"infos": videoItems
				}
			},
			'success': function(data) {
				var tempLibDatas = g_mediaLibary.libraryDatas;
				for (var i = 0; i < tempLibDatas.length; i++) {
					if ( srcLibId == tempLibDatas[i].id || destLibId == tempLibDatas[i].id ) {
						g_mediaLibary.freshLibary( i );
					};
				}
			}
		});
	},

	deleteVideoItems: function(srcLibId, videoItems, callbackFunc){
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.DeleteVideoItems',
			'params': {
				"libid": srcLibId,
				"mediaobjs": {
					"infos": videoItems
				}
			},
			'success': function(data) {
				var tempLibDatas = g_mediaLibary.libraryDatas;
				for (var i = 0; i < tempLibDatas.length; i++) {
					if ( srcLibId == tempLibDatas[i].id ) {
						g_mediaLibary.freshLibary( i );
					};
				}
			}
		});
	},

 	searchItemsInLibrary: function(pattern, callbackFunc) {
 		if (!!pattern) {
 			vidonme.rpc.request({
 				'context': this,
 				'method': 'VideoLibrary.Search',
 				'params': {
 					"pattern": pattern
 				},
 				'success': function(data) {
 					if (!!data && !!data.result) {
 						this.searchResults = data.result.results;

 						if (!!callbackFunc) {
 							callbackFunc();
 						}
 					}
 				}
 			});
 		}
 	},

 	getMetaFromPath: function(path, callbackFunc) {
 		if (!!path) {
			vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.GetStreamDetailsFromPath',
				'params': {
					"path": path
				},
				'success': function(data) {
					if (!!data && !!data.result) {
						if (!!callbackFunc) {
							callbackFunc(data.result);
						}
					}
				}
			});
		}
 	},

	getPlaylist: function(path, callbackFunc) {
 		if (!!path) {
 			vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.getPlaylist',
				'params': {
					"path": path
				},
				'success': function(data) {
					if (!!data && !!data.result) {
						if (!!callbackFunc) {
							callbackFunc(data.result);
						}
					}
				}
			});
 		}
 	},

	getMainTitleInfo: function(path, callbackFunc) {
		if (!!path) {
			vidonme.rpc.request({
				'context': this,
				'method': "VidOnMe.GetPlaylist",
				'params': {
					path: path
				},
				'success': function(data) {
					if (data && data.result) {
						var tempItems = data.result.items;
						if (tempItems) {
							for (var i = 0; i < tempItems.length; i++) {
								var tempItem = tempItems[i];
								if (tempItem.IsMainTitle) {
									if (!!callbackFunc) {
										callbackFunc(tempItem);
									}
									break;
								};
							};
						} else {
							if (!!callbackFunc) {
								callbackFunc(tempItem);
							}
						}
					};
				}
			});
		}
	}
}

 function Limits(start, end) {
 	this.start = start;
 	this.end = end;
 	return this;
 }

 function formateIntToTime(time) {
 	var strTime = "{0}:{1}:{2}";
 	var hTime = parseInt(time / 3600);
 	var mTime = parseInt((time % 3600) / 60);
 	var sTime = time - hTime * 3600 - mTime * 60;

 	if (hTime < 10)
 		hTime = '0' + hTime;

 	if (mTime < 10)
 		mTime = '0' + mTime;

 	if (sTime < 10)
 		sTime = '0' + sTime;

 	strTime = strTime.format(hTime, mTime, sTime);

 	return strTime;
 }

 function getFileFormat(meta) {
 	var m = JSON.parse(meta);
 	return m.FileFormat;
 }

 function setDetailTypeIcon(meta) {
 	var m = JSON.parse(meta);
 	var imgpath = "images/mark/";
 	var imgarray = new Array();

 	// AudioChannel
 	var audiochannel = m.AudioChannel;
 	var audiochannels = audiochannel.split(",");
 	for (var i = 0; i < audiochannels.length; ++i) {
 		if (audiochannels[i] == "9.1") {
 			imgarray.push(imgpath + "10.png");
 		} else if (audiochannels[i] == "7.1") {
 			imgarray.push(imgpath + "8.png");
 		} else if (audiochannels[i] == "6.1") {
 			imgarray.push(imgpath + "7.png");
 		} else if (audiochannels[i] == "5.1") {
 			imgarray.push(imgpath + "6.png");
 		} else if (audiochannels[i] == "4.1") {
 			imgarray.push(imgpath + "5.png");
 		} else if (audiochannels[i] == "4.0") {
 			imgarray.push(imgpath + "4.png");
 		} else if (audiochannels[i] == "2.1") {
 			imgarray.push(imgpath + "3.png");
 		} else if (audiochannels[i] == "2.0") {
 			imgarray.push(imgpath + "2.png");
 		} else if (audiochannels[i] == "2.35") {
 			imgarray.push(imgpath + "2.35.png");
 		} else if (audiochannels[i] == "2.20") {
 			imgarray.push(imgpath + "2.20.png");
 		} else if (audiochannels[i] == "1.0") {
 			imgarray.push(imgpath + "1.png");
 		} else {

 		}
 	}

 	// AudioCodec
 	var audiocodec = m.AudioCodec;
 	var audiocodecs = audiocodec.split(",");

 	for (var i = 0; i < audiocodecs.length; ++i) {
 		if (audiocodecs[i] == "dtshd") {
 			continue;
 		}

 		audiocodecs[i] = audiocodecs[i].replace('-', '_');
 		if (audiocodecs[i])
 			imgarray.push(imgpath + audiocodecs[i] + ".png");
 	}

 	// FileFormat
 	var fileformat = m.FileFormat;
 	var fileformats = fileformat.split(",");

 	for (var i = 0; i < fileformats.length; ++i) {
 		if (fileformats[i] == "wmv") {
 			continue;
 		}

 		fileformats[i] = fileformats[i].replace('-', '_');
 		if (fileformats[i])
 			imgarray.push(imgpath + fileformats[i] + ".png");
 	}

 	// VideoCodec
 	var videocodec = m.VideoCodec;
 	var videocodecs = videocodec.split(",");

 	for (var i = 0; i < videocodecs.length; ++i) {
 		if (videocodecs[i] == "webm" || videocodecs[i] == "hvc1" || videocodecs[i] == "mjpeg") {
 			continue;
 		}

 		videocodecs[i] = videocodecs[i].replace('-', '_');
 		if (videocodecs[i])
 			imgarray.push(imgpath + videocodecs[i] + ".png");
 	}

 	// VideoResolution
 	var resolution = m.VideoResolution;
 	var resolutions = resolution.split(",");

 	for (var i = 0; i < resolutions.length; ++i) {
 		resolutions[i] = resolutions[i].replace('-', '_');

 		if (resolutions[i])
 			imgarray.push(imgpath + resolutions[i] + ".png");
 	}

 	return imgarray;
 }

 function HandleRating(rating) {
 	if (rating == "") {
 		return 0;
 	}

 	return parseFloat(rating) * 10;
 }

 function checkMeidaType( meta ){
 	var typeCss = 'icon1080p';

 	var m = JSON.parse(meta);

 	var fileformat = m.FileFormat;

 	if ( fileformat.match( 'dvd' ) ) {
 		typeCss = 'icondvd';
 	} else if ( fileformat.match( 'bluray' ) ) {
 		typeCss = 'iconbd';
 	} else {
 		var resolution = m.VideoResolution;

 		if ( resolution.match( '720' ) ) {
 			typeCss = 'icon720p';
 		} else if ( resolution.match( '1080' )  ) {
 			typeCss = 'icon1080p';
 		} else{
 			typeCss = 'iconsd';
 		}
 	}

 	return typeCss;
 }

 function encodeImage(imagePath, defaultImage){
 	var resultPath = arguments[1] ? arguments[1] : "../images/movie/deafult_poster_1.png";
 	if ( imagePath ) {
 		if ( imagePath != "" ) {
 			resultPath = global_image_url + encodeURI(imagePath);
 		};
 	};
 	
 	return resultPath;
 }

function ChangeBackground(bgPic, layer) {
	var layer_str = ".content_layer" + ((typeof(layer) == "undefined") ? 3 : Number(layer)).toString();
	if ( bgPic && bgPic != null ) {
		$(layer_str).addClass("videobg");
		$(layer_str).css("background-image", bgPic);
	} else {
		if ( $(layer_str).hasClass("videobg") ) {
			$(layer_str).css("background-image", "");
			$(layer_str).removeClass("videobg");
		}
	}
}

function ShowPictureDiv(url) {
	$(".vidoncover").show();
	$(".vidoncover").css('height', $(document).height());
	$("body", "html").css({
		height: "100%",
		width: "100%"
	});

	var date = new Date();
	var img = new Image();
	img.src = url + '?temp_id=' + date.getTime();
	img.onload = function() {
		var img_w = img.width;
		var img_h = img.height;

		if (img_w > $(window).width() || img_h > $(window).height()) {
			if ((img_w / img_h) > ($(window).width() / $(window).height())) {
				var img_x_scale = $(window).width() * 90 / 100 / img.width;

				img.width = img.width * img_x_scale;
				img.height = img.height * img_x_scale;
			} else if ((img_w / img_h) < ($(window).width() / $(window).height())) {
				var img_y_scale = $(window).height() * 90 / 100 / img.height;

				img.width = img.width * img_y_scale;
				img.height = img.height * img_y_scale;
			} else {
				img.width = img.width * $(window).width() * 90 / 100;
				img.height = img.height * $(window).height() * 90 / 100;
			}
		}

		$(".loadimg").css("width", img.width + "px");
		$(".loadimg").css("height", img.height + "px");

		//$(".loadimg").css("background-image", 'url(' + '"' + url + '"' + ')');
		$("#realimg").attr({
			style: 'width:' + img.width + 'px;height:' + img.height + 'px;'
		});
		$("#realimg").attr('src', img.src);

		if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
			$(".loadimg").css("top", ($(window).height() - $(".loadimg").height()) / 2 + $(window).scrollTop() + "px");
			$(".closeimg").css("top", ($(window).height() - $(".loadimg").height()) / 2 + $(window).scrollTop() + "px");
		} else {
			$(".loadimg").css("top", ($(window).height() - $(".loadimg").height()) / 2 + $(window).scrollTop() + "px");
			$(".closeimg").css("top", ($(window).height() - $(".loadimg").height()) / 2 + $(window).scrollTop() + "px");
		}

		$(".loadimg").css("left", ($(window).width() - $(".loadimg").width()) / 2 + "px");
		$(".loadimg").fadeIn("slow");

		$(".closeimg").css("left", ($(window).width() - $(".loadimg").width()) / 2 + $(".loadimg").width() - $(".closeimg").width() + "px");
		$(".closeimg").fadeIn("slow");
		$(".closeimg").attr("onclick", "HidePictureDiv()");

		$(".loadimg").show();
		$(".closeimg").show();
	}

	$(window).resize(function() {
		$(".loadimg").css("top", ($(window).height() - $(".loadimg").height()) / 2 + "px");
		$(".loadimg").css("left", ($(window).width() - $(".loadimg").width()) / 2 + "px");

		$(".closeimg").css("top", ($(window).height() - $(".closeimg").height()) / 2 + "px");
		$(".closeimg").css("left", ($(window).width() - $(".closeimg").width()) / 2 + "px");
	});
}

function HidePictureDiv() {
	$(".vidoncover").hide();
	$(".loadimg").hide();
	$(".closeimg").hide();
}

function ShowPicture(url) {
	url = unescape(url);
	ShowPictureDiv(url);
}
