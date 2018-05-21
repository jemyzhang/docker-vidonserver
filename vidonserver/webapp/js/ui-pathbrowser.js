var VidBrowser = function() {
	this.init();
} 

VidBrowser.prototype = {
	init: function() {
		this.mask = "";
		this.drive = "";
		this.folder = "";
		this.manualadd = "";
		this.drivelist = new Array();
		this.folderlist = new Array();
		this.backlist = new Array();
	},

	addFolder: function(obj) {
		this.folderlist.push(obj);
	},

	addBack: function(obj) {
		this.backlist.push(obj);
	},

	addDrive: function(obj) {
		this.drivelist.push(obj);
	},

	clearDriveList: function() {
		this.drivelist.length = 0;
	},

	clearFolderList: function() {
		this.folderlist.length = 0;
	},

	clearBackList: function() {
		this.backlist.length = 0;
	},

	doBack: function() {
		this.backlist.pop();
	}
};

var g_pathBrowser;

var PathBrowser = function() {
	g_pathBrowser = this;
}

PathBrowser.prototype = {
	pathDatas: {},
	mask: "",
	titles: {
		h3: "",
		p: "",
		p_sel_path: $.i18n.prop('index_15'),
		btn_cancel: $.i18n.prop('index_25'),
		btn_ok: $.i18n.prop('index_26')
	},
	waitGifHtml: '<img src="images/movie/refresh.gif" width="32" height="32" style="margin:142px 0px 0px 157px;"/>',

	init: function() {
		var ref = this;

		this.pathDatas = new VidBrowser();
		this.freshBrowser();
		
		$("#popDiskblock li").live("click", function() {
			$(this).addClass("selected").siblings().removeClass("selected");

			if ($(this).hasClass("addNwPath")) {
				ref.initAddNetDisk();
				showdiv(".addNetwork", 4);
			} else {
				var index = $(this).attr("index");
				var drivelist = ref.pathDatas.drivelist;
				var dir = drivelist[index].path;
				ref.pathDatas.clearBackList();
				ref.pathDatas.clearFolderList();
				ref.pathDatas.addBack(dir);
				ref.pathDatas.drive = dir;
				ref.pathDatas.folder = "";
				var pos = -1;

				for (var i = 0; i < drivelist.length; ++i) {
					if (index == i) {
						pos = drivelist[i].class.lastIndexOf('selected');
						if (pos == -1) {
							drivelist[i].class = drivelist[i].class + ' selected';
						}
					} else {
						pos = drivelist[i].class.lastIndexOf('selected');
						if (pos > 0) {
							drivelist[i].class = drivelist[i].class.substr(0, pos - 1);
						}
					}
				}

				if ( dir == "smb://" ) {
					ref.smbData = null;
				} else if ( dir == "nfs://" ) {
					ref.nfsData = null;
				}

				ref.getDirectoryList(dir);
			}
		});

		$("#listpath div").live("click",function(){
			$(this).addClass("selected").siblings().removeClass("selected");
			var dir = "";
			
			if ($(this).hasClass("back")) {
				ref.pathDatas.doBack();
				var index = ref.pathDatas.backlist.length - 1;
				dir = ref.pathDatas.backlist[index];
				ref.pathDatas.folder = dir;
				ref.getDirectoryList(dir);
			} else if ($(this).hasClass("folder")) {
				var index = $(this).find("a").attr("index");
				dir = ref.pathDatas.folderlist[index].path;
				ref.pathDatas.addBack(dir);
				ref.pathDatas.folder = dir;
				ref.getDirectoryList(dir);
			} else if ($(this).hasClass("file")) {
				var index = $(this).find("a").attr("index");
				dir = ref.pathDatas.folderlist[index].path;
				ref.pathDatas.folder = dir;
				ref.showSelectedPath(unescape(dir));
			}
		});

		$("#btnAddNetworkOK").live("click", function() {
			ref.commitAddNetShare();
		});

		$("#btnErrPathOK").live("click", function() {
			ref.doPathAuth();
		});

		$(".popAddPathClose").live("click", function() {
			ref.closeBrowser();
		});

		$("#btnAddLibPathCancel").live("click", function() {
			ref.closeBrowser();
		});

		$("#addSrcPath").live("propertychange input", function() {
			var path = $("#addSrcPath").val();
			if (!!!path) {
				$("#btnAddLibPathOK").addClass("btn-disable").removeClass("btn-blue");
			} else {	
				$("#btnAddLibPathOK").removeClass("btn-disable").addClass("btn-blue");
			}
		});

		$("#btnAddLibPathOK").live("click", function() {
			var path = $("#addSrcPath").val();
			if (!!!path) {
				return;
			}
			
			ref.pathDatas.callbackFunc(path);
			close_box('.addPath', 3)
		});

		$("#popDiskblock li span").live("click", function(event) {
			var path = $(this).parent().attr("title");
			if (path) {
				ref.deleteNetDisk(path);
			};
			
			event.stopPropagation();
		});
	},

	initBrowser: function(libid, callbackFunc) {
		this.pathDatas = new VidBrowser();
		this.pathDatas.callbackFunc = callbackFunc;
		this.getTitle(libid);
		this.getMask(libid);

		$("#addSrcPath").val("");
		$("#addSrcRealPath").val("");
		$("#listpath").html("");
		
		this.getDriveList();
	},

	getTitle: function(libid) {
		if (libid == g_media_type_commercial) {
			this.titles.h3 = $.i18n.prop('index_17');
			this.titles.p = $.i18n.prop('index_19');
		} else if (libid == g_media_type_personal) {
			this.titles.h3 = $.i18n.prop('index_18');
			this.titles.p  = $.i18n.prop('index_20');
		} else if (libid == g_media_type_addon) {
			this.titles.h3 = $.i18n.prop('index_213');
			this.titles.p  = $.i18n.prop('index_214');
		}

		this.titles.p_sel_path = $.i18n.prop('index_15');
		this.titles.btn_cancel = $.i18n.prop('index_25');
		this.titles.btn_ok = $.i18n.prop('index_26');
	},

	getMask: function(libid) {
		if (libid == g_media_type_commercial || libid == g_media_type_personal) {
			this.mask = "";
		} else if (libid == g_media_type_addon) {
			this.mask = ".*.zip";
		}
	},

	getDriveObj: function(cls, title, value, index, type, path) {
		var objDrive = {
			"class": cls,
			"title": title,
			"value": value,
			"index": index,
			"type": type,
			"path": path,
			"isnet": type == $.i18n.prop('index_182') ? 1 : 0
		};

		return objDrive;
	},

	getPathObj: function(cls, title, value, index, path) {
		var objPath = {
				"class": cls,
				"title": title,
				"value": value,
				"index": index,
				"path": path
		};

		return objPath;
	},

	getDriveList: function() {
		var ref = this;
		this.showWait("disk");

		g_corePathBrowser.getDriveList(function(data) {
			ref.pathDatas.clearDriveList();
			ref.pathDatas.clearFolderList();
			ref.setDriveData(data);
			ref.showBrowser();
			ref.afterChangePath();
		});
	},

	getDirectoryList: function(path) {
		var ref = this;
		this.showWait("folder");

		if ( path == "smb://" && typeof( this.smbData ) != 'undefined' && this.smbData != null ) {
			ref.setDirectoryData(this.smbData);
			ref.freshBrowser();
			ref.showSelectedPath(path);
			return;
		} else if ( path == "nfs://" && typeof( this.nfsData ) != 'undefined' && this.nfsData != null ) {
			ref.setDirectoryData(this.nfsData);
			ref.freshBrowser();
			ref.showSelectedPath(path);
			return;
		}

		g_corePathBrowser.getDirectoryList(path, this.mask, function(path, data) {
			var errno = checkResponseWithErrNo(data, "librarypath");

			/*
			if (errno == 2 || errno == 3) {
				$("#txtErrPath").val(path);
				showdiv('.addNetPath', 4);
				return;
			}
			*/

			if ( path == "smb://" ) {
				ref.smbData = data;
			} else if ( path == "nfs://" ) {
				ref.nfsData = data;
			} 

			ref.setDirectoryData(data);
			ref.freshBrowser();
			ref.showSelectedPath(path);
		});
	},

	addNetDisk: function(obj) {
		var ref = this;

		g_corePathBrowser.addNetDisk(obj, function(obj) {
			var netpath = obj.protocol + "://" + obj.directory;

			if (obj.isdrive) {
				close_box('.addNetwork', 4);
				$("#addSrcPath").val(netpath);
				ref.pathDatas.manualadd = escape(netpath);
				ref.getDriveList();
			}

			ref.getDirectoryList(escape(netpath));
			ref.freshBrowser();
		});
	},

	commitAddNetShare: function() {
		var ref = this;

		g_corePathBrowser.commitAddNetShare(function() {
			var display = '';
			var protocol = ($("#txtNetSharePtl").val() == "Windows Network (SMB)") ? "smb" : "nfs";
						
			var obj = {
				"protocol": protocol,
				"domain": $("#txtNetShareDomain").val(),
				"directory": $("#txtNetShareSrcName").val(),
				"username": $("#txtNetShareUserName").val(),
				"password": $("#txtNetSharePwd").val(),
				"isdrive": true
			};

			if (!ref.checkNetShare(obj)) {
				return;
			}

			ref.addNetDisk(obj);
		});
	},

	deleteNetDisk: function(path) {
		var ref = this;
		this.showWait("folder");

		g_corePathBrowser.deleteNetDisk(path, function() {
			ref.getDriveList();
		});
	},

	setDriveData: function(data) {
		var ref = this;
		var li_index = 0;
		var langua = "";
		var objDrive = {};
		
		$.each($(data.result.filelist), jQuery.proxy(function(i, item) {
			var strpath = removeslashAtEnd(item.path);
			var drivetype = getdrivetypename(item.drivetype);
			var displaypath = handleUrl(strpath, true, true);
			var cls = "";
			strpath = item.path.replace(/\\/g, '\\\\');
			
			if (ref.manualadd && (ref.manualadd == escape(strpath))) {
				cls = "selected";
			}

			var displayValue = drivetype + " " + displaypath;
			objDrive = ref.getDriveObj(cls, displaypath, displayValue, i, drivetype, escape(strpath));
			ref.pathDatas.addDrive(objDrive);
			
			li_index = i;
		}, this));
	
		if (data.result.filelist.length > 0) {
			li_index++;
		}

		langua = $.i18n.prop('index_22');
		objDrive = this.getDriveObj("smb_all", langua, langua, li_index, "smb_all", "smb://");
		this.pathDatas.addDrive(objDrive);
		li_index++;

		langua = $.i18n.prop('index_23');
		objDrive = this.getDriveObj("nfs_all", langua, langua, li_index, "nfs_all", "nfs://");
		this.pathDatas.addDrive(objDrive);
		li_index++;

		langua = $.i18n.prop('index_24');
		objDrive = this.getDriveObj("addNwPath", langua, langua, li_index, "addNwPath", "");
		this.pathDatas.addDrive(objDrive);
	},

	setDirectoryData: function(data) {
		var ref = this;
		var langua = "";
		var objData = {};
		var index = 0;
		
		this.pathDatas.clearFolderList();
		$("#listpathblock").html("");
		
		if (this.pathDatas.backlist.length > 1) {
			langua = $.i18n.prop('index_181');
			objData = this.getPathObj("back", langua, langua, 0, "");
			this.pathDatas.addFolder(objData);
			index++;
		}

		$.each($(data.result.filelist), jQuery.proxy(function(i, item) {
			var itempath = item.path;
			if (!itempath.match("/")) {
				itempath = itempath.replace(/\\/g, '\\\\');
			}
			if (itempath.match('\'')) {
				itempath = itempath.replace(/\'/g, '\\\'');
			}
			
			if (item.isFolder) {
				objData = ref.getPathObj("folder", item.title, item.title, index, escape(itempath));
			}else{
				objData = ref.getPathObj("file", item.title, item.title, index, escape(itempath));
			}

			ref.pathDatas.addFolder(objData);
			index++;

		}, this));
	},

	showWait: function(type) {
		if (!!type) {
			if (type == "disk") {
				$("#popDiskblock").html("");
				$("#popDiskblock").append(this.waitGifHtml);
			}

			if (type == "folder") {
				$("#listpathblock").html("");
				$("#listpathblock").append(this.waitGifHtml);
			}
		}
	},

    showBrowser: function() {
    	$(".addPath").setTemplateURL("../template/pathbrowser.tpl?" + AppVersion);
    	$(".addPath").setParam('titles', this.titles);
		$(".addPath").processTemplate(this.pathDatas);
		showdiv(".addPath", 3);
    },

    freshBrowser: function() {
		$(".addPath").setTemplateURL("../template/pathbrowser.tpl?" + AppVersion);
		$(".addPath").setParam('titles', this.titles);
		$(".addPath").processTemplate(this.pathDatas);
		this.afterChangePath();
	},

	closeBrowser: function() {
		g_corePathBrowser.abortLastRequest("all");
		this.pathDatas = {};
		this.freshBrowser();
	},

	afterChangePath: function() {
		$(".addPath .popDisk").mCustomScrollbar({
			autoHideScrollbar: true
		});
	
		$("#listpathblock").mCustomScrollbar({
			autoHideScrollbar: true
		});
			
		$("#btnAddLibPathOK").addClass("btn-blue").removeClass("btn-disable");
	},

	showSelectedPath: function(path) {
		var display = path.replace(/\\\\/g, '\\');
		$("#addSrcPath").val(unescape(display));
	},

	initAddNetDisk: function(host) {
		this.switchLanguage();
		var title = $.i18n.prop('index_28');
		$("#popAddNetworkH3").text(title);
		$("#txtNetSharePtl").val("Windows Network (SMB)");
		$("#txtNetShareSrcName").val(host);
		$("#txtNetShareDomain").val("WORKGROUP");
		$("#txtNetShareUserName").val("");
		$("#txtNetSharePwd").val("");
		$("#txtNetShareSrcName")[0].focus();
	},

	switchLanguage: function() {
		$("#addNwCancel").text($.i18n.prop('index_25'));
		$("#addNwOk").text($.i18n.prop('index_26'));
		$("#addNwProto").text($.i18n.prop('index_27'));
		$("#addNwAddr").text($.i18n.prop('index_29'));
		$("#addNwDomain").text($.i18n.prop('index_30'));
		$("#addNwUser").text($.i18n.prop('index_31'));
		$("#addNwPass").text($.i18n.prop('index_32'));
	},

	checkNetShare: function (obj) {
		var langua = "";
		if (!obj.directory) {
			langua = $.i18n.prop('index_184');
			PopupAlert(langua);
			return false;
		}

		if (checkip(obj.directory) == false) {
			langua = $.i18n.prop('index_185');
			PopupAlert(langua);
			return false;
		}

/*
		if (!obj.domain) {
			langua = $.i18n.prop('index_186');
			PopupAlert(langua);
			return false;
		}
*/
		if (obj.protocol == "smb") {
			if ((!obj.username && obj.password) || (obj.username && !obj.password)) {
				langua = $.i18n.prop('index_175');
				PopupAlert(langua);
				return false;
			}
		}

		return true;
	},

	doPathAuth: function() {
		var path 		= $("#txtErrPath").val();
		var srvdomain	= $("#txtErrPathDomain").val();
		var username 	= $("#txtErrPathUserName").val();
		var userpass 	= $("#txtErrPathPwd").val();
		var proto 		= "";
		var srvPath 	= "";

		if (!!!username || !!!userpass || !!!srvdomain) {
			PopupAlert($.i18n.prop('index_175'));
			return;
		}

		var index = path.indexOf("://");
		if (index > 0) {
			proto 	= path.substr(0, index);
			srvPath = path.substr(index + 3, path.length);
		} else {
			console.log("Invalid Path");
		}

		close_box('.addNetPath', 4);
		this.pathDatas.folder = escape(path);

		var obj = {
			"protocol": proto,
			"domain": srvdomain,
			"directory": srvPath,
			"username": username,
			"password": userpass,
			"isdrive": false
		};

		console.log(" pro:" + obj.protocol + " path=" + obj.directory + " user=" + obj.username + " pwd=" + obj.password + " domain=" + obj.domain);

		this.addNetDisk(obj);
	}
}
