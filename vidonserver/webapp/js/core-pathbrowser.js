var g_corePathBrowser;

var reqDriveCnt = 0;
var g_lastDrivejqXhr = {};

var reqFolderCnt = 0;
var g_lastFolderjqXhr = {};

var CorePathBrowser = function() {
	g_corePathBrowser = this;
};

CorePathBrowser.prototype = {
	pathDatas:{},

	abortLastRequest: function (type) {
		if (type == "list") {
			if (reqFolderCnt != 0) { 
				if (g_lastFolderjqXhr && g_lastFolderjqXhr.readyState != 4) {
					g_lastFolderjqXhr.abort();
					reqFolderCnt--;
				}
			}
		} else if (type == "drive") {
			if (reqDriveCnt != 0) {
				if(g_lastDrivejqXhr && g_lastDrivejqXhr.readyState != 4) {
					g_lastDrivejqXhr.abort();
					reqDriveCnt--;
				}
			}
		} else if (type == "all") {
			if (reqFolderCnt != 0) {
				if (g_lastFolderjqXhr && g_lastFolderjqXhr.readyState != 4) {
					g_lastFolderjqXhr.abort();
				}
			}

			if (reqDriveCnt != 0) {
				if(g_lastDrivejqXhr && g_lastDrivejqXhr.readyState != 4) {
					g_lastDrivejqXhr.abort();
				}
			}

			reqDriveCnt = 0;
			reqFolderCnt = 0;
		}
	},

	getDriveList: function(callbackFunc) {
		reqDriveCnt++;
		g_lastDrivejqXhr = vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetDirectory',
			'params': {
				"mask": "",
				"directory": ""
			},
			'success': function(data) {
				reqDriveCnt--;

				if (!checkResponse(data)) {
					return;
				}

				var reg = new RegExp("^[a-zA-Z]:", "g");

				var list = data.result.filelist;

				for (var i = 0; i < list.length; ++i) {
					if (list[i].path.match(reg)) {
						list[i].drivetype = (list[i].drivetype == 4 ? 1 : list[i].drivetype);
					}
				}

				if (!!data || !!callbackFunc) {
					callbackFunc(data);
				}
			}
		});
	},

	getDirectoryList: function(path, mask, callbackFunc) {
		if (!!!path) {
			return;
		}

		this.abortLastRequest("list");
		reqFolderCnt++;

		path = unescape(path);
		path = removeslashAtEnd(path);
		var objParam = {};
		if(!!!mask || mask == "") {
			objParam = {
				"mask": mask,
				"directory": path
			};
		} else {
			objParam = {
				"mask": mask,
				"directory": path,
				"flags": 72,
				"sort" :{
					"field": "type",
					"order": "asc"
				}
			};
		}
		
		g_lastFolderjqXhr = vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetDirectory',
			'params': objParam,
			'success': function(data) {
				reqFolderCnt--;
				
				if (!checkResponse(data)) {
					$("#txtErrPath").val(path);
					if (data.result.err != "Multi connects by different username") {
						showdiv('.addNetPath', 4);
					}
					
					return;
				}

				if (!!data && !!callbackFunc) {
					callbackFunc(path, data);
				}
			}
		});
	},

	addNetDisk: function(obj, callbackFunc) {
		showdiv('.loadingbg', 5);
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.AddNetDirectory',
			'params': obj,
			'success': function(data) {
				close_box('.loadingbg', 5);
				console.log("pro:" + obj.protocol + "path=" + obj.directory + "user=" + obj.username + "pwd=" + obj.password + "domin=" + obj.domain);
				if (!checkResponse(data)) {
					return;
				}

				if (!!callbackFunc) {
					callbackFunc(obj);
				}
			}
		});			
	},

	commitAddNetShare: function(callbackFunc) {
		if (!!callbackFunc) {
			callbackFunc();
		}
	},

	deleteNetDisk: function(path, callbackFunc) {
		if (!!path) {
			vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.DeleteNetDirectory',
				'params': {
					'path': path
				},
				'success': function(data) {
					if (!!callbackFunc) {
						callbackFunc();
					}
				}
			});
		}
	}
}

	