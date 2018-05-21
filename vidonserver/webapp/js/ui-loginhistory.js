var g_loginhistory;

var loginHistoryControl = function() {
	g_loginhistory = this;
}; 

loginHistoryControl.prototype = {
	loginHistoryDatas: [],
	loginHistoryStaticDatas:{},
	domPos: null,

	init: function(domPosition) {
		this.domPos = domPosition;

		// tvshow item
		$(".click_tvshow_inhistory .img").live("click", function() {
			if(!$(this).parents(".box").hasClass("waitselect")){
				var strFileid = $(this).attr("fileid");
				if (strFileid) {
					var __this = g_tvshowControl;
					__this.isSuccessGetDetail = false;
					__this.isSuccessGetSeason = false;

					__this.curTvshowId = Number(strFileid);

					var libIndex = g_mediaLibary.getLibIndexByLibId(Number($(this).attr("idlibrary")));

					g_mediaLibary.getTVShowDetail( __this.curTvshowId, function() {
						__this.isSuccessGetDetail = true;
						g_multiMediaControl.freshTVShowDetailPage();
					});
					g_mediaLibary.getSeasonDatas(libIndex, __this.curTvshowId, function() {
						__this.isSuccessGetSeason = true;
						g_multiMediaControl.freshTVShowDetailPage();
					});
				};
			}
		});
	},
	switchLanguage:function(){
		this.loginHistoryStaticDatas={
			
			loginHistoryStaticDatasStr_1:$.i18n.prop('home_1')
		}

	}
	/*
	loginHistoryDatas:[
		{
			time:"今天",
			historyList:[
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				}
			]
		},
		{
			time:"2015-08-10",
			historyList:[
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				}
			]
		},
		{
			time:"2015-07-15",
			historyList:[
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				},
				{
					fileindex:"0",
					fileid:"198",
					thumbnail:"http://127.0.0.1:32080/image/C:/Users/Public/Documents/VMS2/userdata/Thumbnails/3/3ad27d3e.jpg",
					filepath:"smb://goland;public:public@10.10.2.100/Nas11_volume11_1601/DVD/SKYFALL.iso",
					name:"007之大破天幕杀机",
					setflag:false

				}
			]
		}
	],
		
	init: function(domPosition) {
		var _this = this;
		domPosition.setTemplateURL("../template/loginhistory.tpl?" + AppVersion);
		domPosition.processTemplate(this.loginHistoryDatas);
	}
	*/
}