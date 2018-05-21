var g_delMediaControl;

var deleteMediaControl = function() {
	g_delMediaControl = this;
};

deleteMediaControl.prototype = {
	editLibraryStaticDatas: {},
	editLibraryDatas: {},
	selectedNum: -1,
	userDatas: {
		srcLibId: -1,
		destLibId: -1,
		videoItems: [{
			mediaid: -1,
			mediatype: 'movie'
		}, {
			mediaid: -1,
			mediatype: 'movieset'
		}, {
			mediaid: -1,
			mediatype: 'tvshow'
		}, {
			mediaid: -1,
			mediatype: 'video'
		}]
	},

	mediaContain: null, // like $("#pl")
	controlContain: null, // like $("#pl #editlibrary")
	itemsWithTag: null,// $("#pl .box,#pl .box2")
	srcLibName:"",

	initControl: function(config) {
		this.srcLibName = config.srcLibName;
		this.mediaContain = config.mediaContain;
		this.controlContain = config.controlContain;
		this.itemsWithTag = config.itemsWithTag;

		this.initData();
		this.initTemplate();
		this.bindEvent();
	},

	initData: function() {
		this.userDatas.srcLibId = -1;
		this.userDatas.destLibId = -1;
		this.userDatas.videoItems = [];
		this.userDatas.mediaGroups = [];

		var tempLibDatas = g_siderBar.siderBarData.libaryData;
		var resultLibInfoList = [];
		for (var i = 0; i < tempLibDatas.length; i++) {
			var tempLibData = tempLibDatas[i];
			var tempLibInfo = {};

			tempLibInfo.name = tempLibData.name;
			tempLibInfo.id = tempLibData.id;

			// if current libname equal with srclib name, no need add to dest libname list.
			if (this.srcLibName != tempLibInfo.name) {
				resultLibInfoList.push(tempLibInfo);
			} else {
				// covert libraryname to valid lib id.
				this.userDatas.srcLibId = tempLibInfo.id;
			}
		};

		// if this.userDatas.srcLibId == -1, in search page;
		// if this.userDatas.srcLibId > -1, in library page;
		this.editLibraryDatas = {
			transfeeredto: resultLibInfoList[0],
			libraryList: resultLibInfoList,
			selectedList: [],
			selectedNums: 0
		};

		this.editLibraryStaticDatas = {
			editLibraryState: 1, // 1、移动  2、合并
			editLibraryStatic: {
				editLibraryStr_1: $.i18n.prop('delete_1'),
				editLibraryStr_2: $.i18n.prop('transfer_2'),
				editLibraryStr_3: $.i18n.prop('transfer_3'),
				editLibraryStr_4: $.i18n.prop('transfer_4'),
				editLibraryStr_btn1: $.i18n.prop('transfer_6'),
				editLibraryStr_btn2: $.i18n.prop('transfer_5'),
				editLibraryStr_5: $.i18n.prop('addlibrary_1'),
				//editLibraryStr_6: $.i18n.prop('addlibrary_3'),
				editLibraryStr_6: $.i18n.prop('transfer_8')
			}

		};
	},

	initTemplate: function() {
		this.controlContain.setTemplateElement("delete_media");
		this.controlContain.setParam('StaticDatas', this.editLibraryStaticDatas);
		this.controlContain.processTemplate(this.editLibraryDatas);
		
		$("#js_moveMedia_num").text("0");

		this.selectedNum = 0;

		this.itemsWithTag.removeClass("waitselect");
		this.itemsWithTag.removeClass("editlabraryselected");
		this.itemsWithTag.addClass("waitselect");
	},

	bindEvent: function(){
		$("#js_delMedia_cancel").click( function() {
			g_delMediaControl.itemsWithTag.removeClass("waitselect");
			g_delMediaControl.controlContain.empty();
		});

		$("#js_delMedia_ok").click(function() {
			if (g_delMediaControl.selectedNum > 0) {
				var boxarry = $(".editlabraryselected .img", g_delMediaControl.mediaContain);
				var srcLibId = g_delMediaControl.userDatas.srcLibId;

				if (srcLibId == -1) {
					var resultMediaGroups = [];
					for (var i = 0; i < boxarry.length; i++) {
						var id = $(boxarry[i]).attr("fileid");
						var libid = Number($(boxarry[i]).attr("libid"));
						var mediatype = $(boxarry[i]).attr("mediatype");
						g_delMediaControl.editLibraryDatas.selectedList.push(id);

						var tempVideoItem = {};
						tempVideoItem.mediaid = Number(id);
						tempVideoItem.mediatype = mediatype;

						var bExitLib = false
						for (var ii = 0; ii < resultMediaGroups.length; ii++) {
							var eachMediaGroup = resultMediaGroups[ii];
							if (eachMediaGroup.libid == libid) {
								eachMediaGroup.mediaItems.push(tempVideoItem);
								bExitLib = true;
								break;
							};
						};

						if (!bExitLib) {
							var eachMediaGroup = {};
							eachMediaGroup.libid = libid;
							eachMediaGroup.mediaItems = [];
							eachMediaGroup.mediaItems.push(tempVideoItem);

							resultMediaGroups.push(eachMediaGroup);
						};
					}

					g_delMediaControl.userDatas.mediaGroups = resultMediaGroups;
				} else {
					var resultVideoItems = [];
					for (var i = 0; i < boxarry.length; i++) {
						var id = $(boxarry[i]).attr("fileid");
						var mediatype = $(boxarry[i]).attr("mediatype");
						g_delMediaControl.editLibraryDatas.selectedList.push(id);

						var tempVideoItem = {};
						tempVideoItem.mediaid = Number(id);
						tempVideoItem.mediatype = mediatype;
						resultVideoItems.push(tempVideoItem);
					}

					g_delMediaControl.userDatas.videoItems = resultVideoItems;
				}

				// move selected medias to library exist
				var srcLibId = g_delMediaControl.userDatas.srcLibId;
				var tempMediaGroups = g_delMediaControl.userDatas.mediaGroups;
				var destLibId = g_delMediaControl.userDatas.destLibId;

				if (srcLibId == -1) {
					for (var i = 0; i < tempMediaGroups.length; i++) {
						var mediaGroup = tempMediaGroups[i];
						srcLibId = mediaGroup.libid;
						g_mediaLibary.deleteVideoItems(srcLibId,
							mediaGroup.mediaItems,
							function() {});
					};
				} else {
					g_mediaLibary.deleteVideoItems(srcLibId,
						g_delMediaControl.userDatas.videoItems,
						function() {});
				}

				// clear selection state.
				g_delMediaControl.itemsWithTag.removeClass("waitselect");
				g_delMediaControl.controlContain.empty();
			} else {
				alert($.i18n.prop('transfer_11'));
			}
		});

		this.itemsWithTag.click( function() {
			var id = $(this).find(".img").attr("fileid");

			if ($(this).hasClass("editlabraryselected")) {
				$(this).removeClass("editlabraryselected");
				--g_delMediaControl.selectedNum;

				$("#js_delMedia_num").text(g_delMediaControl.selectedNum);
	
				if (g_delMediaControl.selectedNum > 0) {
					$("#js_delMedia_ok").removeClass("disable");
				} else {
					$("#js_delMedia_ok").addClass("disable");
				}
			} else {
				$(this).addClass("editlabraryselected");
				++g_delMediaControl.selectedNum;
				$("#js_delMedia_num").text(g_delMediaControl.selectedNum);
				$("#js_delMedia_ok").removeClass("disable");
			}
		});

		$("#js_delMedia_checkbox").click( function(){
			var box = g_delMediaControl.itemsWithTag;
			var boxNum= box.length;
			if(!$(this).hasClass("selected")){
				box.addClass("editlabraryselected");
				g_delMediaControl.selectedNum = boxNum;
				$("#js_delMedia_num").text(g_delMediaControl.selectedNum);
			}
			else{
				box.removeClass("editlabraryselected");
				g_delMediaControl.selectedNum = 0;
				$("#js_delMedia_num").text(g_delMediaControl.selectedNum);
			}
		});
	},

	hideControl: function() {
		this.selectedNum = 0;
		this.controlContain.empty();
	}
}
