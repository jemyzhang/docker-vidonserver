var g_coreSettings;

var CoreServerSetting = function() {
	g_coreSettings = this;
};

CoreServerSetting.prototype = {
	upgradeData: {
		state: 0, //0未检查更新 1 有新版本  2没有新版本  3正在下载新版本 4 下载成功 5 下载失败  6 正在安装 7安装成功 8取消升级 9 安装失败
		newversion: "",
		changelog: "", // new version change log
		progress: -1 // download or install process
	},

	upgradeTimer: null,

	tempSettingData: {},

	settingData: {
		genericName: "",
		serverIp: "",
		genericVersion: "",
		transcodeMode: false,
		hardcodecsupport: false,
		hardcodecenable: false,
		language1: "",

		genericAutoStart: "",
		discoveryBonjour: "",
		discoveryDns: "",
		defaultScraperLanguage: "",
		dlna: "",
		cupMaxUsage: "",
		libAutoUpdateTimeSpan: "",
		tempFilePath: "",
		updateAuto: "",
		updateDaytime: "",
		updateWeekday: "",
		webServicePort: "",
		hidefile: "",

		clientlist: [],
		isShowUpdate: true,
		isShowTranscode: true,

		tcpserverPort: "33000"
	},

	settingDataKey:{},

	getSystemSettings: function() {
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetSystemSettingForAll',
			'params': [],
			'success': function(data) {
				if (data && data.result && data.result.settings) {
					settingInfo = data.result.settings;

					for (var i = 0; i < settingInfo.length; i++) {
						switch (settingInfo[i].key) {
							case "language.default":
								this.settingData.language1 = settingInfo[i].val;
								this.settingDataKey.language1 = "language.default";
								break;
							case "generic.autostart":
								this.settingData.genericAutoStart = settingInfo[i].val;
								this.settingDataKey.genericAutoStart = "generic.autostart";
								break;
							case "discovery.bonjour":
								this.settingData.discoveryBonjour = settingInfo[i].val;
								this.settingDataKey.discoveryBonjour = "discovery.bonjour";
								break;
							case "discovery.dns":
								this.settingData.discoveryDns = settingInfo[i].val;
								this.settingDataKey.discoveryDns = "discovery.dns";
								break;
							case "library.defaultlanguageforscraper":
								this.settingData.defaultScraperLanguage = settingInfo[i].val;
								this.settingDataKey.defaultScraperLanguage = "library.defaultlanguageforscraper";
								break;
							case "dlna.dlna":
								this.settingData.dlna = settingInfo[i].val;
								this.settingDataKey.dlna = "dlna.dlna";
								break;
							case "transcoder.cpumaxusage":
								this.settingData.cupMaxUsage = settingInfo[i].val;
								this.settingDataKey.cupMaxUsage = "transcoder.cpumaxusage";
								break;
							case "transcoder.tempfilepath":
								this.settingData.tempFilePath = settingInfo[i].val;
								this.settingDataKey.tempFilePath = "transcoder.tempfilepath";
								break;
							case "library.autoupdatetimespan":
								this.settingData.libAutoUpdateTimeSpan = settingInfo[i].val;
								this.settingDataKey.libAutoUpdateTimeSpan = "library.autoupdatetimespan";
								break;
							case "webserver.port":
								this.settingData.webServicePort = settingInfo[i].val;
								this.settingDataKey.webServicePort = "webserver.port";
								break;
							case "webserver.pass":
								this.settingData.accountPassword = settingInfo[i].val;
								this.settingDataKey.accountPassword = "webserver.pass";
								break;
							case "webserver.user":
								this.settingData.accountAccount = settingInfo[i].val;
								this.settingDataKey.accountAccount = "webserver.user";
								break;
							case "webserver.serviceswebonlylocal":
								this.settingData.servicesWebonlyLocal = settingInfo[i].val;
								this.settingDataKey.servicesWebonlyLocal = "webserver.serviceswebonlylocal";
								break;
							case "generic.autoupgrade":
								this.settingData.updateAuto = settingInfo[i].val;
								this.settingDataKey.updateAuto = "generic.autoupgrade";
								break;
							case "generic.daytime":
								this.settingData.updateDaytime = settingInfo[i].val;
								this.settingDataKey.updateDaytime = "generic.daytime";
								break;
							case "generic.weekday":
								this.settingData.updateWeekday = settingInfo[i].val;
								this.settingDataKey.updateWeekday = "generic.weekday";
								break;
							case "generic.scraperhidden":
								this.settingData.hidefile = settingInfo[i].val;
								this.settingDataKey.hidefile = "generic.scraperhidden";
								break;
							case "tcpserver.port":
								this.settingData.tcpserverPort = settingInfo[i].val;
								this.settingDataKey.tcpserverPort = "tcpserver.port";
								break;
							case "transcoder.convert_type":
								this.settingData.transcodeMode = settingInfo[i].val;
								this.settingDataKey.transcodeMode = "transcoder.convert_type";
								break;
						}
					}

					for (var n in this.settingData) {
						this.tempSettingData[n] = this.settingData[n];
					}
				}

			}
		});
		
		// get server name.
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetServerName',
			'params': [],
			'success': function(data) {
				if (data && data.result.ret) {
					this.settingData.genericName = data.result.name;

					this.tempSettingData.genericName = data.result.name;
				}
			}
		});

		// get server ip and version.
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetServerInfo',
			'params': [],
			'success': function(data) {
				if (data && data.result) {
					serverInfo = data.result;
					this.settingData.serverIp = serverInfo.serverip;
					this.settingData.genericVersion = g_coreSettings.HandleVersion(serverInfo.srvversion);

					this.tempSettingData.serverIp = serverInfo.serverip;
					this.tempSettingData.genericVersion = g_coreSettings.HandleVersion(serverInfo.srvversion);
				}
			}
		});

		// get GPU setting
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.CheckTranscodeOption',
			'params': [],
			'success': function(data) {
				if (data && data.result) {
					this.settingData.hardcodecsupport = data.result.hardCodecSupport;
					this.settingData.hardcodecenable = data.result.hardCodecSetup;

					this.tempSettingData.hardcodecsupport = data.result.hardCodecSupport;
					this.tempSettingData.hardcodecenable = data.result.hardCodecSetup;
				}
			}
		});

		// get client list
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetAllClients',
			'params': [],
			'success': function(data) {
				if (data && data.result && data.result.ret) {
					this.settingData.clientlist.length = 0;
					
					$.each($(data.result.clientlist), jQuery.proxy(function(i, item) {
							var clientInfo = {};
							var name = item.clientname;
							clientInfo.ip = item.clientip;
							clientInfo.state = item.state;
							name = unescape(name);
							if (name.length > 30) {
								name = name.substring(0, 30) + "...";
							}

							clientInfo.strname = name

							this.settingData.clientlist.push(clientInfo);
						},
						this));
				} else {
					this.settingData.clientlist = [];
				}
			}
		});

		// check is win server
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetSystemSetting',
			'params': {
				"key": "ui.hideupgrade"
			},
			'success': function(data) {
				if (data && data.result && data.result.ret) {
					var hideUpgrade = data.result.val; //settingInfo[i].val;
					if (hideUpgrade == 'true') {
						this.settingData.isShowUpdate = false;
						this.settingData.isShowTranscode = false;
					}
				}

			}
		});
	},

	HandleVersion: function(versionIn) {
	    if (versionIn.length == 5) {
	        var version_tag, version_raw = '';
	        var version_split = versionIn.split("");
	        for (var i = 0; i < version_split.length - 1; i++) {
	            version_raw += version_split[i];
	        }
	        if (version_split[version_split.length - 1] == "2") {
	            version_tag = " Beta";
	        } else if (version_split[version_split.length - 1] == "1") {
	            version_tag = " Stable";
	        } else {
	            version_tag = " Alpha";
	        }

	        version_raw_split = version_raw.split("");
	        versionOut = version_raw_split.join(".") + version_tag;
	    } else {
	        versionOut = versionIn; 
	    }

	    return versionOut;
	},

	saveSystemSettings: function() {
		for (var property in this.settingData) {
			// check each setting for changed
			if (this.settingData[property] != this.tempSettingData[property]) {
				if (property == "genericName") {
					vidonme.rpc.request({
						'context': this,
						'method': 'VidOnMe.SetServerName',
						'params': {
							"name": this.settingData[property]
						},
						'success': function(data) {
							if (data.result.ret) {
								//alert("%156".toLocaleString());
							} else {
								//alert("Save faild".toLocaleString());
							}

						}
					});
				} else if (property == "hardcodecenable") {
					vidonme.rpc.request({
						'context': this,
						'method': 'VidOnMe.SetTranscodeOption',
						'params': {
							"config": this.settingData[property]
						},
						'success': function(data) {
							if (data.result.ret) {
							}
						}
					});
				} else if( property == "clientlist" ) {

				} else {
					var key = this.settingDataKey[property];
					if (!!key) {
						vidonme.rpc.request({
							'context': this,
							'method': 'VidOnMe.SetSystemSetting',
							'params': {
								"key": key,
								"val": this.settingData[property]
							},
							'success': function(data) {

							}
						});
					}
				}
			}
		}

		this.getSystemSettings();
		g_commonPopDialog.showSave( $.i18n.prop('index_178') );
	},

	startDownload: function() {
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.Upgrade_Download',
			'params': [],
			'success': function(data) {
				if (data && data.result.ret == true) {
					g_coreSettings.startCheckUpgradeState();
				}
			}
		});
	},

	startInstall: function() {
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.Upgrade_Install',
			'params': [],
			'success': function(data) {
				if (data && data.result.ret == true) {
					upgradeState == 6;
					upgrade(false);

					g_coreSettings.startCheckUpgradeState();
				}
			}
		});
	},

	startCheckUpgradeState: function() {
		if (this.upgradeTimer) {
			this.stopCheckUpgradeState();
		};

		this.upgradeTimer = setInterval(this.checkUpgradeStatus, 2000);
	},

	stopCheckUpgradeState: function() {
		if (this.upgradeTimer) {
			clearInterval(this.upgradeTimer);
			this.upgradeTimer = null;
		};
	},

	checkUpgradeStatus: function() {
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.Upgrade_GetState',
			'params': [],
			'success': function(data1) {
				if (data1 && data1.result) {
					//0未检查更新 1 有新版本  2没有新版本  3正在下载新版本 4 下载成功 5 下载失败  6 正在安装 7安装成功 8取消升级 9 安装失败
					if (data1 && data1.result.state == "download") {
						g_coreSettings.upgradeData.state = 3;
						g_coreSettings.upgradeData.progress = parseInt(data1.result.progress) + "%";//data1.result.progress;
						g_coreSettings.upgradeData.newversion = g_coreSettings.HandleVersion(data1.result.newversion);		
					} else if (data1 && data1.result.state == "downloadfin") {
						g_coreSettings.upgradeData.state = 4;
						g_coreSettings.stopCheckUpgradeState();
						
						g_coreSettings.startInstall();
					} else if (data1 && data1.result.state == "downloadfailed") {
						g_coreSettings.upgradeData.state = 5;

						g_coreSettings.stopCheckUpgradeState();
					} else if (data1 && data1.result.state == "checkversionfailed") {
						g_coreSettings.upgradeData.state = 5;

						g_coreSettings.stopCheckUpgradeState();
					} else if (data1 && data1.result.state == "install") {
						g_coreSettings.upgradeData.state = 6;
					} else if (data1 && data1.result.state == "installfin") {
						g_coreSettings.upgradeData.state = 7;

						g_coreSettings.stopCheckUpgradeState();
					} else if (data1 && data1.result.state == "installfailed") {
						g_coreSettings.upgradeData.state = 9;

						g_coreSettings.stopCheckUpgradeState();
					} else if (data1 && data1.result.state == "checkversionfin") {
						if (data1.result.checkresult == "alreadynewversion") {
							g_coreSettings.upgradeData.state = 2;

							g_coreSettings.stopCheckUpgradeState();
						} else {
							g_coreSettings.upgradeData.state = 1;
							g_coreSettings.upgradeData.newversion = g_coreSettings.HandleVersion(data1.result.newversion);
							g_coreSettings.upgradeData.changelog = data1.result.changes.replace(/\r\n/g, "<br//>");

							g_coreSettings.stopCheckUpgradeState();
						}
					} else if (data1 && data1.result.state == "downloadcancel") {
						g_coreSettings.upgradeData.state = 8;
						g_coreSettings.stopCheckUpgradeState();
					} else {
						g_coreSettings.upgradeData.state = 0;
					}

					g_setup.freshUpdatePage();
				}
			}
		});
	}
};