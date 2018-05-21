		//API is not REST
		function RequestIsNeedWizard(page) {
			var s = vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.IsWizzardEnabled',
				'params': {},
				'success': function(data) {
					cbIsNeedWizard(data, page);
				}
			});
		}


		function RequestGetLibraries(mediatype) {
			var s = vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.GetLibraries',
				'params': {
					"type": mediatype
				},
				'success': function(data) {
					cbSetLibraryID(data, mediatype);
				}
			});
		}


		function RequestLibraryPaths(libid) {
			if(!libid) return;
			
			vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.GetLibraryDetail',
				'params': {
					"LibraryId": libid
				},
				'success': function(data) {
					cbHandleLibraryPaths(data);
				}
			});
		}

		function RequestAddLibraryPath(libid, mediapath) {
			//�����ж�
			if (!libid || !mediapath) return;

			//server����
			vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.AddPathToLibrary',
				'params': {
					"LibraryId": libid,
					"path": mediapath
				},
				'success': function(data) {
					cbHandleAddLibraryPath(data);
				}
			});
		}

		function RequestDeleteLibraryPath(libid, pid) {
			//�����ж�
			//alert("libid=" + libid + ",pid=" + pid);
			var pathid = Number(pid);
			if(!pid || !libid) return;
			//server����
			vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.DeletePathFromLibrary',
				'params': {
					"LibraryId": libid,
					"PathId": pathid
				},
				'success': function(data) {
						cbHandleDeleteLibraryPath(data);
				}
			});
		}

		/*
		obj = {
		  'protocol': "smb",
		  'domain':"",
		  'directory':"",
		  'username':"",
		  'password':"",
		  'isdrive':""
		}
		 */
		function RequestAddNetDrive(obj) {
			vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.AddNetDirectory',
				'params': obj,
				'success': function(data) {
					cbAddNetDrive(data, obj);
				}
			});
		}
		
		function RequestDriveList() {

			var lastjqXhr = vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.GetDirectory',
				'params': {
					"mask": "",
					"directory": ""
				},
				'success': function(data) {
					cbHandleDiskList(data);
				}
			});

			return lastjqXhr;
		}	
		
		function RequestFolderList(realpath, drivepath) {		
			drivepath = unescape(drivepath);
			realpath = unescape(realpath);
			realpath = removeslashAtEnd(realpath);
			//alert("realpath="+realpath+", drivepath="+drivepath);

			var lastjqXhr = vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.GetDirectory',
				'params': {
					"mask": "",
					"directory": realpath
				},
				'success': function(data) {
					cbHandleFolderlist(data, realpath, drivepath);
				}
			});

			return lastjqXhr;

		}			
		
		function RequestDirectory(realpath, drivepath,mask) {		
			drivepath = unescape(drivepath);
			realpath = unescape(realpath);
			realpath = removeslashAtEnd(realpath);
			//alert("realpath="+realpath+", drivepath="+drivepath);

			var lastjqXhr = vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.GetDirectory',
				'params': {
					"mask": mask,
					"directory": realpath,
					"flags": 72,
					"sort" :{
						"field": "type",
						"order": "asc"
					}
				},
				'success': function(data) {
					cbHandleFolderlist(data, realpath, drivepath);
				}
			});

			return lastjqXhr;

		}					
		

		function RequestDriveDirectory(realpath, drivepath) {

			drivepath = unescape(drivepath);
			realpath = unescape(realpath);
			realpath = removeslashAtEnd(realpath);
			//alert("realpath="+realpath+", drivepath="+drivepath);

			vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.GetDirectory',
				'params': {
					"mask": "",
					"directory": ""
				},
				'success': function(data) {
					cbHandleDiskList(data);
				}
			});

			var lastjqXhr = vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.GetDirectory',
				'params': {
					"mask": "",
					"directory": realpath
				},
				'success': function(data) {
					cbHandleFolderlist(data, realpath, drivepath);
				}
			});

			return lastjqXhr;

		}

		function RequestNetPathInfo(path, username, password, domain) {
			if (!path) return;

			vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.AddNetDirectoryEx',
				'params': {
					"directory": path,
					"domain" : domain,
					"username" : username,
					"password" : password
				},
				'success': function(data) {

				}
			});
		}
		
		function RequestInstallAddon(path) {
			if (!path) return;

			vidonme.rpc.request({
				'context': this,
				'method': 'OnlineChannels.InstallFromZip',
				'params': {
					"strPath": path
				},
				'success': function(data) {
					RequestAddonInfo( path );
				}
			});
		}

		function RequestAddonInfo( path ){
			if (!path) return;

			vidonme.rpc.request({
				'context': this,
				'method': 'OnlineChannels.GetAddonFromZip',
				'params': {
					"strPath": path
				},
				'success': function(data) {
					if ( data ) {
						cbHandleInstallAddon(data);
					};
				}
			});
		}

		function RequestInstallAddonStatus( addonId ){
			vidonme.rpc.request({
				'context': this,
				'method': 'OnlineChannels.UpdateEnabledAndInstalled',
				'params': {
					"addonid": addonId
				},
				'success': function(data) {
					if ( data ) {
						checkAddonInstallStatus( addonId, data );
					};
				}
			});
		}
		
		function RequestEnabledAddons(input) {
			var path = "addons://enabled/xbmc.addon.video/";
			
			if (!path) return;

			vidonme.rpc.request({
				'context': this,
				'method': 'OnlineChannels.GetDirectory',
				'params': {
					"strPath": path
				},
				'success': function(data) {
					cbHandleAddOns(data);
				}
			});
		}				
		
		function RequestUnInstallAddon(addonid) {
			if (!addonid) return;

			vidonme.rpc.request({
				'context': this,
				'method': 'OnlineChannels.Uninstall',
				'params': {
					"addonid": addonid
				},
				'success': function(data) {
					UnInstallChannelCallBack();
					//alert(data.result.result);
				}
			});
		}

		function RequestScraperLogPath() {
			vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.GetScraperLog',
				'params': {},
				'success': function(data) {
					//alert(data.result.ret);
					//alert(data.result.path);
				}
			});
		}

		function RequestScraperDetails(obj) {
			//mediaid":204,"mediatype":"video","scrapername":"The Expendables 3","scrapertype":"movie
			vidonme.rpc.request({
				'context': this,
				'method': 'VideoLibrary.GetScraperDetails',
				'params': obj,
				'success': function(data) {
					g_metaInfoControl.cbHandleScraperList(data,obj);
				}
			});
		}

		function RequestScrapeByNetId(obj) {
			//"mediaid":204,"mediatype":"video","netid":138103,"scrapertype":"movie","scraperfrom":1
			vidonme.rpc.request({
				'context': this,
				'method': 'VideoLibrary.ScrapeById',
				'params': obj,
				'success': function(data) {
					g_metaInfoControl.cbHandleScrapeByNetId(data,obj);
				}
			});
		}

