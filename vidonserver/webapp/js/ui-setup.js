var g_setup;

var setUp = function() {
	g_setup = this;
}; 

setUp.prototype = {
	titles:{},
	setupDatas:[],
	objForSwitchLanguage:[],
	curTabIndex: -1,
	updateInfoChanged: false,

    init: function( domPosition ) {
    	g_objsSwitchLanguage.push( this );
    },

    clickinit:function(){ 
	 	this.setupDatas = [
			{
				serverName:"威动服务器",//保存时修改
				serverVersions:"2.0.2.2",
				serverIp:"192.168.1.1",
				serverClientList:[{name:"iPhone5s",ip:"192.168.1.1",status:"已连接"},{name:"iPhone6s",ip:"192.168.2.1",status:"已连接"}]
			},
			{
				selectedWebLanguage:{cus_value:"Chinese (Simple)",value:"中文（简体）"},//保存时改变
				onlyLocalhost:true,
				autoStart:false
			},
			{ 
				selectedAutoUpdate:{cus_value:24,value:""},
				selectedMovieLanguage:{cus_value:"zh",value:""},
				hidefile:false
			},
			{ 
				isShowTranscode: true,
				transcodeMode:true,
				hardwareDecoding:true,
				openhardwareDecoding:true

			},
			{ 
				isShowUpdate: true,
				autoUpdate:true,
				selectedAutoUpdateDay:{cus_value:0,value:""},
				selectedAutoUpdateHour:{cus_value:0,value:""},
				CurrentStatusNum:1,
				CurrentStatus:[
					{status:1,changelog:["修改中文环境下升级失败问题","修复下载资源到移动端失败问题"]},
					{status:2},
					{status:3,downloadBarWidth:"50%",style:"width:50%"},
					{status:5},
					{status:6},

				],
				CurrentVersion:"v2.0.0.1稳定版",
				newVersion:"v3.0.0.1"
			}
		];
    	$("#popsetup").setTemplateURL("../template/popsetup.tpl?" + AppVersion);
		showdiv('.popsetup',1);
    	this.loadServerData();
    	this.showTabPage( 0 );
    	this.updatePage();

    	g_coreSettings.startCheckUpgradeState();

        //侧边栏点击
        $("#setupmenu li").live("click",function() {
			$(this).addClass("selected").siblings().removeClass("selected");
			var index = $(this).index();
			g_setup.showTabPage( index );
			$("#setupcontent .setupcon").eq(index).addClass("show").siblings().removeClass("show");
		})
		
		//服务器名字改变
		$("#btnSaveState").live( "click", function(){
			var serverName=$("#txtServerName").val();
			g_setup.setupDatas[0].serverName=serverName;
			console.log(g_setup.setupDatas[0].serverName);

			g_setup.saveDataToServer();
		})
		//通用设置保存时改变
		$("#btnSaveEssentialInfo").live( "click", function(){ 
			g_setup.setupDatas[1].selectedWebLanguage.cus_value=$("#selectWebLanguage").attr("cus_value");
			g_setup.setupDatas[1].onlyLocalhost=checkboxResult($("#onlyloaclhost"));
			g_setup.setupDatas[1].autoStart=checkboxResult($("#autostart"));
			//console.log(g_setup.setupDatas[1].selectedWebLanguage);
			//console.log(g_setup.setupDatas[1].onlyLocalhost);
			//console.log(g_setup.setupDatas[1].autoStart);

			g_setup.saveDataToServer();
		})
		//媒体库
		$("#btnSaveMediaLibrary").live( "click", function(){
			g_setup.setupDatas[2].selectedAutoUpdate.cus_value=$("#updateFrequency").attr("cus_value");
			g_setup.setupDatas[2].selectedAutoUpdate.value=$("#updateFrequency").find("b").text();
			
			g_setup.setupDatas[2].selectedMovieLanguage.cus_value=$("#subLanguage").attr("cus_value");
			g_setup.setupDatas[2].selectedMovieLanguage.value=$("#subLanguage").find("b").text();
			g_setup.setupDatas[2].hidefile = checkboxResult($("#hidefilecheckbox"));
			//console.log(g_setup.setupDatas[2].selectedAutoUpdate);
			//console.log(g_setup.setupDatas[2].selectedMovieLanguage);
			//console.log(g_setup.setupDatas[2].hidefile);
			g_setup.saveDataToServer();
		})
		//转码
		$("#btnSaveTranscode").live( "click", function(){ 
			g_setup.setupDatas[3].openhardwareDecoding=checkboxResult($("#opendecoding"));
			console.log(g_setup.setupDatas[3].openhardwareDecoding);

			g_setup.setupDatas[3].transcodeMode = checkboxResult($("#transcodemode"));

			g_setup.saveDataToServer();
		})
		//升级
		$("#autoUpdate .checkbox").live( "click", function(){
			g_setup.setupDatas[4].autoUpdate=checkboxResult($("#autoUpdate"));

			g_setup.setupDatas[4].selectedAutoUpdateDay.cus_value=$("#selectedAutoUpdateDay").attr("cus_value");
			g_setup.setupDatas[4].selectedAutoUpdateHour.cus_value=$("#selectedAutoUpdateHour").attr("cus_value");

			console.log(g_setup.setupDatas[4].autoUpdate);

			g_setup.saveDataToServer();
		})
		$("#upgradeDate li").live( "click", function(){
			g_setup.setupDatas[4].selectedAutoUpdateDay.cus_value=$(this).attr("cus_value");
			g_setup.setupDatas[4].selectedAutoUpdateDay.value=$(this).text();
			console.log(g_setup.setupDatas[4].selectedAutoUpdateDay);
		})
		$("#upgradeTime li").live( "click", function(){
			g_setup.setupDatas[4].selectedAutoUpdateHour.cus_value=$(this).attr("cus_value");
			g_setup.setupDatas[4].selectedAutoUpdateHour.value=$(this).text();
			console.log(g_setup.setupDatas[4].selectedAutoUpdateHour);
		})

		$("#btnUpgrade").live( "click", function() {
            g_coreSettings.startDownload();
        });
		
		function checkboxResult(elm){
				if(elm.find(".checkbox").hasClass("selected")){
					return true;
				}
				else{
					return false;
				}
		}

    },

	loadServerData: function() {
		this.setupDatas[0].serverName = g_coreSettings.settingData.genericName;
		this.setupDatas[0].serverVersions = g_coreSettings.settingData.genericVersion;
		this.setupDatas[0].serverIp = g_coreSettings.settingData.serverIp;
		this.setupDatas[0].serverClientList = g_coreSettings.settingData.clientlist;

		this.setupDatas[1].selectedWebLanguage.cus_value = g_coreSettings.settingData.language1;
		//this.setupDatas[1].onlyLocalhost = g_coreSettings.settingData.servicesWebonlyLocal == "true" ? true : false;
		this.setupDatas[1].autoStart = g_coreSettings.settingData.genericAutoStart == "true" ? true : false;

		this.setupDatas[2].selectedAutoUpdate.cus_value = g_coreSettings.settingData.libAutoUpdateTimeSpan;
		this.setupDatas[2].selectedMovieLanguage.cus_value = g_coreSettings.settingData.defaultScraperLanguage;
		this.setupDatas[2].hidefile = g_coreSettings.settingData.hidefile == "true" ? true : false;

		this.setupDatas[3].isShowTranscode = g_coreSettings.settingData.isShowTranscode;
		this.setupDatas[3].transcodeMode = g_coreSettings.settingData.transcodeMode == "0" ? false : true;
		this.setupDatas[3].hardwareDecoding = g_coreSettings.settingData.hardcodecsupport;
		this.setupDatas[3].openhardwareDecoding = g_coreSettings.settingData.hardcodecenable;

		this.setupDatas[4].isShowUpdate = g_coreSettings.settingData.isShowUpdate;
		this.setupDatas[4].autoUpdate = g_coreSettings.settingData.updateAuto == "true" ? true : false;
		this.setupDatas[4].selectedAutoUpdateDay.cus_value = g_coreSettings.settingData.updateWeekday;
		this.setupDatas[4].selectedAutoUpdateHour.cus_value = g_coreSettings.settingData.updateDaytime;

		this.loadUpdateData();
		/*
		this.setupDatas[1].CurrentStatusNum = g_coreSettings.settingData.updateAuto;//1,
		CurrentStatus:[
			{status:1,changelog:["修改中文环境下升级失败问题","修复下载资源到移动端失败问题"]},
			{status:2},
			{status:3,downloadBarWidth:"50%",style:"width:50%"},
			{status:5},
			{status:6},

		],
		*/
		this.setupDatas[4].CurrentVersion = g_coreSettings.settingData.genericVersion; //:"v2.0.0.1稳定版",
	},

	loadUpdateData: function() {
		//0未检查更新 1 有新版本  2没有新版本  3正在下载新版本 4 下载成功 5 下载失败  6 正在安装 7安装成功 8取消升级 9 安装失败
		var tempUpdateData = g_coreSettings.upgradeData;

		this.setupDatas[4].newVersion = tempUpdateData.newversion;

		if ( tempUpdateData.state == 1 ) {
			this.setupDatas[4].CurrentStatusNum = 1;
			this.setupDatas[4].CurrentStatus[0].changelog = tempUpdateData.changelog.split("<br//>");
		} else if ( tempUpdateData.state == 0 || tempUpdateData.state == 2 ) {
			this.setupDatas[4].CurrentStatusNum = 2;
		} else if ( tempUpdateData.state == 3 || tempUpdateData.state == 4 || tempUpdateData.state == 6 ) {
			this.setupDatas[4].CurrentStatusNum = 3;
			this.setupDatas[4].CurrentStatus[2].downloadBarWidth = tempUpdateData.progress;
			this.setupDatas[4].CurrentStatus[2].style = "width:" + tempUpdateData.progress;
		} else if ( tempUpdateData.state == 3 || tempUpdateData.state == 5 || tempUpdateData.state == 9 ) {
			this.setupDatas[4].CurrentStatusNum = 5;
		} else if ( tempUpdateData.state == 7 ) {
			this.setupDatas[4].CurrentStatusNum = 6;
		}
	},

	saveDataToServer: function() {
		g_coreSettings.settingData.genericName = this.setupDatas[0].serverName;

		if ( g_coreSettings.settingData.language1 != this.setupDatas[1].selectedWebLanguage.cus_value ) {
			g_coreSettings.settingData.language1 = this.setupDatas[1].selectedWebLanguage.cus_value;
			changeLanguage( this.setupDatas[1].selectedWebLanguage.cus_value );
			getLanguage( this.setupDatas[1].selectedWebLanguage.cus_value );
			
		}
		
		//g_coreSettings.settingData.servicesWebonlyLocal = this.setupDatas[1].onlyLocalhost == true ? "true" : "false";
		g_coreSettings.settingData.genericAutoStart = this.setupDatas[1].autoStart == true ? "true" : "false";

		g_coreSettings.settingData.libAutoUpdateTimeSpan = this.setupDatas[2].selectedAutoUpdate.cus_value;
		g_coreSettings.settingData.defaultScraperLanguage = this.setupDatas[2].selectedMovieLanguage.cus_value;
		g_coreSettings.settingData.hidefile = this.setupDatas[2].hidefile == true ? "true" : "false";

		g_coreSettings.settingData.hardcodecenable = this.setupDatas[3].openhardwareDecoding;
		g_coreSettings.settingData.transcodeMode = this.setupDatas[3].transcodeMode == true ? "2" : "0";

		g_coreSettings.settingData.updateAuto = this.setupDatas[4].autoUpdate == true ? "true" : "false";
		g_coreSettings.settingData.updateWeekday = this.setupDatas[4].selectedAutoUpdateDay.cus_value;
		g_coreSettings.settingData.updateDaytime = this.setupDatas[4].selectedAutoUpdateHour.cus_value;

		g_coreSettings.saveSystemSettings();
	},

	showTabPage: function(tabIndex) {
    	if ( tabIndex < 0 || tabIndex > this.setupDatas.length - 1 ) {
    		return;
    	}

    	for (var i = 0; i < this.setupDatas.length; i++) {
    		this.setupDatas[i].selectedClass = "";
    		this.setupDatas[i].showClass = "";
    	}

    	this.setupDatas[tabIndex].selectedClass = "selected";
    	this.setupDatas[tabIndex].showClass = "show";

		if (tabIndex == 4 && this.updateInfoChanged == true) {
			this.updateInfoChanged = false;
			this.reloadTemplate();
		};

    	this.curTabIndex = tabIndex;
    },

	freshUpdatePage: function() {
		this.loadUpdateData();

		if (this.curTabIndex == 4) {
			this.reloadTemplate();
		} else {
			this.updateInfoChanged = true;
		}
	},

    updatePage: function() {
		this.switchLanguage();

		this.operateComboxData();
		
    	$("#popsetup").setParam('title', this.titles);
    	$("#popsetup").setParam('setUpStaticDatas', this.setUpStaticDatas);

    	this.reloadTemplate();
	},

	reloadTemplate: function() {
		$(".popsetup").processTemplate(this.setupDatas);

		$("#setupcontent .userdefined_scrollbar").mCustomScrollbar({
		  autoHideScrollbar:true
        });

        //checkbox选中状态
        $(".checkbox").each(function() {
			var checkbox_state = $(this).attr("checkbox_state");
			if(checkbox_state=="true"){ 
				$(this).addClass("selected");
			}
			else{ 
				$(this).removeClass("selected");
			}

		})
	},

    operateComboxData: function() { 
    	this.setupDatas[1].selectedWebLanguage.value = this.dropdownSel( this.setupDatas[1].selectedWebLanguage.cus_value ,g_setup.setUpStaticDatas[1].webLanguage);
    	this.setupDatas[2].selectedAutoUpdate.value = this.dropdownSel( this.setupDatas[2].selectedAutoUpdate.cus_value ,g_setup.setUpStaticDatas[2].autoUpdate);
    	this.setupDatas[2].selectedMovieLanguage.value = this.dropdownSel( this.setupDatas[2].selectedMovieLanguage.cus_value ,g_setup.setUpStaticDatas[2].movieLanguage);
    	this.setupDatas[4].selectedAutoUpdateDay.value = this.dropdownSel( this.setupDatas[4].selectedAutoUpdateDay.cus_value ,g_setup.setUpStaticDatas[4].autoUpdateDay);
    	this.setupDatas[4].selectedAutoUpdateHour.value = this.dropdownSel( this.setupDatas[4].selectedAutoUpdateHour.cus_value,g_setup.setUpStaticDatas[4].autoUpdateHour);
	
    },

    //下拉列表选中项内容,元素必须是数组的元素
		
	dropdownSel: function(elm, array) {
		//console.log(array);
		//console.log(g_setup.setUpStaticDatas[1].webLanguage);
		for (i = 0; i < array.length; i++) {
			if (array[i].cus_value == elm)
				return array[i].value;
		}
	},

    switchLanguage:function(){ 
    	var address = " (http://" + g_coreSettings.settingData.serverIp + ":" + g_coreSettings.settingData.webServicePort + ") ";
        var info = $.i18n.prop('index_90');
        info = info.format(address);
        
    	this.titles = {
		 	"poptitle": $.i18n.prop('index_71'),
		 	"sider_1": $.i18n.prop('index_72'),
		 	"sider_2": $.i18n.prop('index_73'),
		 	"sider_3": $.i18n.prop('index_74'),
		 	"sider_4": $.i18n.prop('index_75'),
		 	"sider_5": $.i18n.prop('index_76')
			
	 	};
	 	this.setUpStaticDatas=[
	 		{ 
	 			title_1:$.i18n.prop('index_77'),
	 			serverNameStr:$.i18n.prop('index_78'),
	 			serverVersionsStr:$.i18n.prop('index_79'),
	 			serverIpStr:$.i18n.prop('index_80'),
	 			serverClientStr:$.i18n.prop('index_83'),
	 			serverClientTB_1:$.i18n.prop('index_84'),
	 			serverClientTB_2:$.i18n.prop('index_85'),
	 			serverClientTB_3:$.i18n.prop('index_86'),
	 			btn_1:$.i18n.prop('index_81'),
	 			title_2:$.i18n.prop('index_82')
	 		},
	 		{ 
	 			title_1:$.i18n.prop('index_88'),
	 			webLanguage:[
					{cus_value:"Chinese (Simple)",value:"中文（简体）"},
					{cus_value:"Chinese (Traditional)",value:"繁軆中文"},
					{cus_value:"English",value:"English"},
					{cus_value:"French",value:"Français"},
					{cus_value:"German",value:"Deutsch"},
					{cus_value:"Japanese",value:"日本語"},
					{cus_value:"Korean",value:"한국어"},
					{cus_value:"Portuguese (Brazil)",value:"Português(Brasil)"},
					{cus_value:"Spanish",value:"Español"},
					{cus_value:"Swedish",value:"Svenska"},
					{cus_value:"Thailand",value:"ไทย"}
				],
				commonUserStr_1:$.i18n.prop('index_89'),
				commonUserStr_2:info,
				commonUserStr_3:$.i18n.prop('index_91'),
				btn_1:$.i18n.prop('index_81'),
				btn_2:$.i18n.prop('index_25')
	 		},
	 		{ 
	 			title_1:$.i18n.prop('index_92'),
	 			autoUpdate:[
					{cus_value:0,value:$.i18n.prop('index_93')},
					{cus_value:1,value:$.i18n.prop('index_94')},
					{cus_value:12,value:$.i18n.prop('index_95')},
					{cus_value:24,value:$.i18n.prop('index_96')},
					{cus_value:72,value:$.i18n.prop('index_97')},
					{cus_value:168,value:$.i18n.prop('index_98')},
					{cus_value:720,value:$.i18n.prop('index_99')},
				],
				title_2:$.i18n.prop('index_100'),
				movieLanguage:[
					{cus_value:"zh",value:"中文"},
					{cus_value:"en",value:"English"},
					{cus_value:"us",value:"English (US)"},
					{cus_value:"fr",value:"Français"},
					{cus_value:"de",value:"Deutsch"},
					{cus_value:"ja",value:"日本語"},
					{cus_value:"ko",value:"한국어"},
					{cus_value:"pt",value:"Português(Brasil)"},
					{cus_value:"es",value:"Español"},
				],
				btn_1:$.i18n.prop('index_81'),
				btn_2:$.i18n.prop('index_25'),
				title_2_str:$.i18n.prop('index_246')

	 		},
	 		{ 
	 			title_1:$.i18n.prop('index_101'),
	 			transcodeModeStr: $.i18n.prop('index_285'),
	 			transcodingStr_1:$.i18n.prop('index_102'),
				transcodingStr_2:$.i18n.prop('index_103'),
				transcodingStr_3:$.i18n.prop('index_104'),
				btn_1:$.i18n.prop('index_81'),
				btn_2:$.i18n.prop('index_25')
	 		},
	 		{ 
	 			title_1:$.i18n.prop('index_105'),
	 			autoUpdateStr_1:$.i18n.prop('index_106'),
				autoUpdateStr_2:$.i18n.prop('index_108'),
				autoUpdateStr_3:$.i18n.prop('index_116'),
				autoUpdateDay:[
					{cus_value:0,value:$.i18n.prop('index_96')},
					{cus_value:1,value:$.i18n.prop('index_109')},
					{cus_value:2,value:$.i18n.prop('index_110')},
					{cus_value:3,value:$.i18n.prop('index_111')},
					{cus_value:4,value:$.i18n.prop('index_112')},
					{cus_value:5,value:$.i18n.prop('index_113')},
					{cus_value:6,value:$.i18n.prop('index_114')},
					{cus_value:7,value:$.i18n.prop('index_115')}
				],
				autoUpdateHour:[
					{cus_value:0,value:$.i18n.prop('index_117')},
					{cus_value:1,value:$.i18n.prop('index_118')},
					{cus_value:2,value:$.i18n.prop('index_119')},
					{cus_value:3,value:$.i18n.prop('index_120')},
					{cus_value:4,value:$.i18n.prop('index_121')},
					{cus_value:5,value:$.i18n.prop('index_122')},
					{cus_value:6,value:$.i18n.prop('index_123')},
					{cus_value:7,value:$.i18n.prop('index_124')},
					{cus_value:8,value:$.i18n.prop('index_125')},
					{cus_value:9,value:$.i18n.prop('index_126')},
					{cus_value:10,value:$.i18n.prop('index_127')},
					{cus_value:11,value:$.i18n.prop('index_128')},
					{cus_value:12,value:$.i18n.prop('index_129')},
					{cus_value:13,value:$.i18n.prop('index_130')},
					{cus_value:14,value:$.i18n.prop('index_131')},
					{cus_value:15,value:$.i18n.prop('index_132')},
					{cus_value:16,value:$.i18n.prop('index_133')},
					{cus_value:17,value:$.i18n.prop('index_134')},
					{cus_value:18,value:$.i18n.prop('index_135')},
					{cus_value:19,value:$.i18n.prop('index_136')},
					{cus_value:20,value:$.i18n.prop('index_137')},
					{cus_value:21,value:$.i18n.prop('index_138')},
					{cus_value:22,value:$.i18n.prop('index_139')},
					{cus_value:23,value:$.i18n.prop('index_140')}
				],
				title_2:$.i18n.prop('index_141'),
				CurrentStatusStr_1:$.i18n.prop('index_149'),
				CurrentStatusStr_2:$.i18n.prop('index_143'),
				CurrentStatusStr_3:$.i18n.prop('index_142'),
				CurrentStatusStr_4:$.i18n.prop('index_145'),
				CurrentStatusStr_5:$.i18n.prop('index_146'),
				CurrentStatusStr_6:$.i18n.prop('index_156'),
				CurrentStatusStr_7:$.i18n.prop('index_157'),
				CurrentStatusStr_8:$.i18n.prop('index_147'),
				CurrentStatusStr_9:$.i18n.prop('index_148'),
				CurrentStatusStr_10:$.i18n.prop('index_144')
	 		}
	 	];
    }
}