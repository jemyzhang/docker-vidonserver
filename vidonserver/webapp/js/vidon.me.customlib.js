/*
 * vidon.me.customlib.js
 * 2015-07-15
 * issues the custom libraries.
 *
 */
  
var g_customLibrary;
var CustomLibary = function() {
	g_customLibrary = this;
}

CustomLibary.prototype = {
	retVal: false,
	errStr: '',
	libId: -1,
	pathId: -1,
	libDetail: {},
	libArray: [],
	scraperArray: [],
	
	createCustomLibrary: function(type, name, scraperModuleId, isSmartClassify, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': "VidOnMe.CreateLibrary",
			'params': {
        		'type': type,
        		'name': name,
        		'ScraperModuleId': scraperModuleId,
				'IsSmartClassify': isSmartClassify
    		},
			'success': function(data) {
				if (!!data && !!data.result) {
					var ret = data.result.ret;
					var err = data.result.error;
					
					if (ret) {
						this.libId = data.result.LibraryId;
					}
					
					this.retVal = ret;
					if (!!err) {
						this.errStr = err;
					}
					
					callbackFunc();
				}
			}
		});
	},
	
	deleteCustomLibrary: function(libId, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': "VidOnMe.DeleteLibrary",
			'params': {
        		'LibraryId': libId
    		},
			'success': function(data) {
				if (!!data && !!data.result) {
					var ret = data.result.ret;
					var err = data.result.error;
					
					this.retVal = ret;
					if (!!err) {
						this.errStr = err;
					}
					
					callbackFunc();
				}
			}
		});
	},
	
	startScanLibrary: function(libId, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': "VidOnMe.StartScan",
			'params': {
        		'LibraryId': libId
    		},
			'success': function(data) {
				if (!!data && !!data.result) {
					var ret = data.result.ret;
					var err = data.result.error;
					
					this.retVal = ret;
					if (!!err) {
						this.errStr = err;
					}
					
					callbackFunc();
				}
			}
		});
	},
	
	getCustomLibraries: function(callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': "VidOnMe.GetLibraries",
			'params': {
        		'type': 'all'
    		},
			'success': function(data) {
				if (!!data && !!data.result) {
					var ret = data.result.ret;
					var err = data.result.error;
					this.libArray = [];
					
					if (ret) {
						var libraries = data.result.libraries;
						for (var i = 0; i < libraries.length; ++i) {
							var library = {};
							
							library.LibraryId   = libraries[i].LibraryId;
							library.type        = libraries[i].type;
							library.name        = libraries[i].name;
							library.IsCustomLib = libraries[i].IsCustomLib;
							library.IsSmartClassify = libraries[i].IsSmartClassify;
							
							if (!!library.IsCustomLib || library.LibraryId == 1) {
								this.libArray.push(library);
							}
						}
					}
					
					if (!!err) {
						this.errStr = err;
					}
					
					this.retVal = ret;
					callbackFunc();
				}
			}
		});
	},
	
	getCustomLibraryDetail: function(libId, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': "VidOnMe.GetLibraryDetail",
			'params': {
        		'LibraryId': libId
    		},
			'success': function(data) {
				if (!!data && !!data.result) {
					var ret = data.result.ret;
					var err = data.result.error;
					
					if (ret) {
						this.libDetail = data.result;
					}
					
					if (!!err) {
						this.errStr = err;
					}
					
					this.retVal = ret;
					callbackFunc();
				}
			}
		});
	},
	
	addPathToCustomLibrary: function(libId, path, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': "VidOnMe.AddPathToLibrary",
			'params': {
        		'LibraryId': libId,
				'path': path
    		},
			'success': function(data) {
				if (!!data && !!data.result) {
					var ret = data.result.ret;
					var err = data.result.error;
					
					if (ret) {
						this.libId = data.result.LibraryId;
						this.pathId = data.result.PathId;
					}
					
					if (!!err) {
						this.errStr = err;
					}
					
					this.retVal = ret;
					callbackFunc();
				}
			}
		});
	},
	
	deletePathFromCustomLibrary: function(libId, pathId, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': "VidOnMe.DeletePathFromLibrary",
			'params': {
        		'LibraryId': libId,
				'PathId': pathId
    		},
			'success': function(data) {
				if (!!data && !!data.result) {
					var ret = data.result.ret;
					var err = data.result.error;
					
					if (!!err) {
						this.errStr = err;
					}
					
					this.retVal = ret;
					callbackFunc();
				}
			}
		});
	},
	
	getScraperModules: function(callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': "VidOnMe.GetScraperModules",
			'params': {},
			'success': function(data) {
				if (!!data && !!data.result) {
					var err = data.result.error;
					this.scraperArray = [];
					
					if (!!err) {
						this.errStr = err;
					}
					
					var modules = data.result.modules
					
					for (var i = 0; i < modules.length; ++i) {
						var module = {};
						
						module.id = modules[i].id;
						module.name = modules[i].name;
						
						this.scraperArray.push(module);
					}
					
					callbackFunc();
				}
			}
		});
	},
	
	editCustomLibrary: function(libraryId, name, scraperModuleId, isAutoClass, callbackFunc) {
		vidonme.rpc.request({
			'context': this,
			'method': "VidOnMe.EditLibrary",
			'params': {
				'LibraryId': libraryId,
				'name': name,
				'ScraperModuleId': scraperModuleId,
				'IsSmartClassify': isAutoClass
			},
			'success': function(data) {
				if (!!data && !!data.result) {
					var ret = data.result.ret;
					var err = data.result.error;
					
					this.retVal = ret;
					
					if (!!err) {
						this.errStr = err;
					}
					
					callbackFunc();
				}
			}
		});
	}
}
