var g_sortandfilter;

var FilterItem = function() {}
var Filter = function() {
	this.init();
}

Filter.prototype = {
	init: function() {},
	byCountry: function(value) {
		return this.by("country", value);
	},
	byYear: function(value) {
		return this.by("year", value);
	},
	byGenre: function(value) {
		return this.by("genre", value);
	},
	by: function(field, value) {
		if (!!!value) {
			if (this.and) {
				for (var i = 0; i < this.and.length; i++) {
					var tempItem = this.and[i];
					if (tempItem.field == field) {
						this.and.splice(i, 1);
						break;
					}
				};

				if (this.and.length == 0) {
					delete this.and;
				}
			}
		} else {
			if (!!!this.and) {
				this.and = new Array();
			}

			var bFind = false;
			for (var i = 0; i < this.and.length; i++) {
				var tempItem = this.and[i];
				if (tempItem.field == field) {
					tempItem.value = value;
					bFind = true;
					break;
				}
			};

			if (!bFind) {
				var item = new FilterItem();
				item.field = field;
				item.operator = "contains";
				item.value = value;
				this.and.push(item);
			}
		}

		return this;
	}
}

var MediaSortAndFilter = function() {
	g_sortandfilter = this;
	this.init();
}

MediaSortAndFilter.prototype = {
	mediaCountries: [],
	mediaGenres: [],
	mediaYears: [],
	sortOrders: [],
	sortMethods: [],
	sortfilterInfo: new Array(),

	init: function() {
		// this.sort.method = 'title';
		// this.sort.order = 'ascending';
	},

	getSortMethods: function(callbackFunc) {
		this.sortMethods.length = 0;

		this.sortMethods.push('date');
		this.sortMethods.push('dateadded');
		this.sortMethods.push('label');
		this.sortMethods.push('modifiedtime');
		this.sortMethods.push('rating');
		this.sortMethods.push('title');

		if (!!callbackFunc) {
			callbackFunc(this.sortMethods);
		}
	},

	getSortOrders: function(callbackFunc) {
		this.sortOrders.length = 0;

		this.sortOrders.push('ascending');
		this.sortOrders.push('descending');

		if (!!callbackFunc) {
			callbackFunc(this.sortOrders);
		}
	},

	setSortMethod: function(libIndex, method, callbackFunc) {
		if (!!!method || libIndex < 0) {
			return;
		}

		this.sortfilterInfo[libIndex].sort.method = method;

		if (!!callbackFunc) {
			callbackFunc(this.sortfilterInfo[libIndex].sort.method);
		}
	},

	setSortOrder: function(libIndex, order, callbackFunc) {
		if (!!!order) {
			return;
		}

		this.sortfilterInfo[libIndex].sort.order = order

		if (!!callbackFunc) {
			callbackFunc(this.sortfilterInfo[libIndex].sort);
		}
	},

	getCountries: function(idlibrary, mediaType, callbackFunc) {
		if (!!!idlibrary || idlibrary <= 0) {
			return;
		}

		this.mediaCountries = [];

 		vidonme.rpc.request({
 			'context': this,
 			'method': 'VideoLibrary.GetCountries',
 			'params': {
 				'idlibrary': idlibrary,
 				'type': mediaType
 			},
 			'success': function(data) {
 				if (!!data && !!data.result) {
 					if (!!data.result.countries) {
 						var countries = data.result.countries;
 						for (var i = 0; i < countries.length; ++i) {
 							this.mediaCountries.push(countries[i].title);
 						}
 					}
 				}

 				callbackFunc(this.mediaCountries);
 			}
 		});
	},

	getGenres: function(idlibrary, mediaType, callbackFunc) {
		if (!!!idlibrary || idlibrary <= 0) {
			return;
		}

		this.mediaGenres = [];
	 	
	 	vidonme.rpc.request({
 			'context': this,
 			'method': 'VideoLibrary.GetGenres',
 			'params': {
 				'idlibrary': idlibrary,
 				'type': mediaType
 			},
 			'success': function(data) {
 				if (!!data && !!data.result) {
 					if (!!data.result.genres) {
 						var genres = data.result.genres;
 						for (var i = 0; i < genres.length; ++i) {
 							this.mediaGenres.push(genres[i]);
 						}
 					}
 				}

				callbackFunc(this.mediaGenres);
 			}
 		});
	},

 	getYears: function(idlibrary, mediaType, callbackFunc) {
		if (!!!idlibrary || idlibrary <= 0) {
			return;
		}

 		this.mediaYears = [];

 		vidonme.rpc.request({
 			'context': this,
 			'method': 'VideoLibrary.GetYears',
 			'params': {
 				'idlibrary': idlibrary,
 				'type': mediaType
 			},
 			'success': function(data) {
 				if (!!data && !!data.result) {
 					if (!!data.result.years) {
 						var years = data.result.years;
 						for (var i = 0; i < years.length; ++i) {
 							var nYear = Number(years[i]);

 							//remove year like: 0, 1, 100......
 							if ( nYear > 1000 ) {
 								this.mediaYears.push(years[i]);
 							}
 							
 						}
 					}
 				}

 				callbackFunc(this.mediaYears);
 			}
 		});
 	},

	getAllMediaDatasByType: function(type, value, start, end, callbackFunc) {
		var filter = this.constructFilter(type, value);
		var idlibrary = g_siderBar.curSelectLibId;
		g_searchresult.searchKeyword = value;
		this.getAllMediaDatasByFilter(idlibrary, filter, start, end, callbackFunc);
	},

	getAllMediaDatasByFilter: function(idlibrary, filter, start, end, callbackFunc) {
		var __start = arguments[2] > -1 ? start : 0;
		var __end = arguments[3] > -1 ? end : 20;

		var obj = new JsonObject();
		var getMethod = 'VideoLibrary.GetAllVideoItems';
		obj.limits = new Limits(__start, __end);
		obj.idlibrary = (typeof(idlibrary) == 'undefined' || idlibrary < 0) ? 0 : idlibrary;
		var libIndex = g_mediaLibary.getLibIndexByLibId(obj.idlibrary);
		obj.sort = g_sortandfilter.sortfilterInfo[libIndex].sort;

		if (!!filter) {
			obj.filter = filter;
		}

		vidonme.rpc.request({
			'context': this,
			'method': getMethod,
			'params': obj,
			'success': function(data) {
				if ( data && data.result ) {
					callbackFunc(data.result.mediainfo);
				}
			}
		});
	},

	selectFilter: function(libIndex, mediaType, type, value) {
		if ( type == "year" ) {
			value = Number( value );
		}

		if (mediaType == 'movie') {
			this.sortfilterInfo[libIndex].filter.movieFilter.by( type, value );
		}

		if (mediaType == 'tvshow') {
			this.sortfilterInfo[libIndex].filter.tvshowFilter.by( type, value );	
		}

		if (!!value) {
			if (type == "director") {
				this.sortfilterInfo[libIndex].filterForAllMedia.director = value;
			} else if (type == "actor") {
				this.sortfilterInfo[libIndex].filterForAllMedia.actor = value;
			} else if (type == "year") {
				this.sortfilterInfo[libIndex].filterForAllMedia.year = value;
			} else if (type == "country") {
				this.sortfilterInfo[libIndex].filterForAllMedia.country = value;
			} else if (type == "genre") {
				this.sortfilterInfo[libIndex].filterForAllMedia.genre = value;
			} else if (type == "writer") {
				this.sortfilterInfo[libIndex].filterForAllMedia.writer = value;
			} else if (type == "mpaa") {
				this.sortfilterInfo[libIndex].filterForAllMedia.mpaa = value;
			} else {

			}
		} else {
			if (type == "director") {
				delete this.sortfilterInfo[libIndex].filterForAllMedia.director;
			} else if (type == "actor") {
				delete this.sortfilterInfo[libIndex].filterForAllMedia.actor;
			} else if (type == "year") {
				delete this.sortfilterInfo[libIndex].filterForAllMedia.year;
			} else if (type == "country") {
				delete this.sortfilterInfo[libIndex].filterForAllMedia.country;
			} else if (type == "genre") {
				delete this.sortfilterInfo[libIndex].filterForAllMedia.genre;
			} else if (type == "writer") {
				delete this.sortfilterInfo[libIndex].filterForAllMedia.writer;
			} else if (type == "mpaa") {
				delete this.sortfilterInfo[libIndex].filterForAllMedia.mpaa;
			} else {

			}
		}
	},

	constructFilter: function(type, value) {
		var filter = new JsonObject();

		if (!!value) {
			if (type == "director") {
				filter.director = value;
			} else if (type == "actor") {
				filter.actor = value;
			} else if (type == "year") {
				filter.year = Number(value);
			} else if (type == "country") {
				filter.country = value;
			} else if (type == "genre") {
				filter.genre = value;
			} else if (type == "writer") {
				filter.writer = value;
			} else if (type == "mpaa") {
				filter.mpaa = value;
			} else {

			}
		}

		return filter;
	}
}