var g_moveMediaControl;

var moveMediaControl = function() {
	g_moveMediaControl = this;
};

moveMediaControl.prototype = {
	editLibraryStaticDatas: {},
	editLibraryDatas: {},
	selectedNum: -1,
	moveLibData: {
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
		}],
		mediaGroups: [{
			libid: 0,
			mediaItems: [{
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
		this.moveLibData.srcLibId = -1;
		this.moveLibData.destLibId = -1;
		this.moveLibData.videoItems = [];
		this.moveLibData.mediaGroups = [];

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
				this.moveLibData.srcLibId = tempLibInfo.id;
			}
		};

		// if this.moveLibData.srcLibId == -1, in search page;
		// if this.moveLibData.srcLibId > -1, in library page;
		this.editLibraryDatas = {
			transfeeredto: resultLibInfoList[0],
			libraryList: resultLibInfoList,
			selectedList: [],
			selectedNums: 0
		};

		this.editLibraryStaticDatas = {
			editLibraryState: 1, // 1、移动  2、合并
			editLibraryStatic: {
				editLibraryStr_1: this.srcLibName,
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
		this.controlContain.setTemplateElement("move_media");
		this.controlContain.setParam('StaticDatas', this.editLibraryStaticDatas);
		this.controlContain.processTemplate(this.editLibraryDatas);
		
		$("#js_moveMedia_num").text("0");

		this.selectedNum = 0;

		this.itemsWithTag.removeClass("waitselect");
		this.itemsWithTag.removeClass("editlabraryselected");
		this.itemsWithTag.addClass("waitselect");
	},

	bindEvent: function(){
		$("#js_moveMedia_cancel").click( function() {
			g_moveMediaControl.itemsWithTag.removeClass("waitselect");
			g_moveMediaControl.controlContain.empty();
		});

		$("#js_moveMedia_ok").click(function() {
			if (g_moveMediaControl.selectedNum > 0) {
				var inputDropDown = $("#js_moveMedia_input_dropdown");

				// move library operation.
				var strCusValue = inputDropDown.attr("cus_value");
				if (strCusValue) {
					g_moveMediaControl.moveLibData.destLibId = Number(strCusValue);
				};

				var boxarry = $(".editlabraryselected .img", g_moveMediaControl.mediaContain);
				var srcLibId = g_moveMediaControl.moveLibData.srcLibId;

				if (srcLibId == -1) {
					var resultMediaGroups = [];
					for (var i = 0; i < boxarry.length; i++) {
						var id = $(boxarry[i]).attr("fileid");
						var libid = Number($(boxarry[i]).attr("libid"));
						var mediatype = $(boxarry[i]).attr("mediatype");
						g_moveMediaControl.editLibraryDatas.selectedList.push(id);

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

					g_moveMediaControl.moveLibData.mediaGroups = resultMediaGroups;
				} else {
					var resultVideoItems = [];
					for (var i = 0; i < boxarry.length; i++) {
						var id = $(boxarry[i]).attr("fileid");
						var mediatype = $(boxarry[i]).attr("mediatype");
						g_moveMediaControl.editLibraryDatas.selectedList.push(id);

						var tempVideoItem = {};
						tempVideoItem.mediaid = Number(id);
						tempVideoItem.mediatype = mediatype;
						resultVideoItems.push(tempVideoItem);
					}

					g_moveMediaControl.moveLibData.videoItems = resultVideoItems;
				}
				

				// check if need create new library.
				var newLibName = inputDropDown.val();
				if (newLibName == "" || newLibName == g_moveMediaControl.editLibraryStaticDatas.editLibraryStatic.editLibraryStr_6) {
					alert($.i18n.prop('transfer_10'));
					inputDropDown.focus();
					return;
				}

				if (strCusValue == "-10") {
					// move selected medias to new library
					var bLibNameExist = g_mediaLibary.checkExistLibForName(newLibName);
					if (bLibNameExist) {
						alert($.i18n.prop('transfer_9'));
						inputDropDown.focus();
						return;
					} else {
						g_addLibrary.createLibraryWithDefaultParams(newLibName, function(bSuccess, libId) {
							if (bSuccess) {
								g_mediaLibary.freshLibraryDatas();

								var srcLibId = g_moveMediaControl.moveLibData.srcLibId;
								var tempMediaGroups = g_moveMediaControl.moveLibData.mediaGroups;
								var destLibId = libId;

								if (srcLibId == -1) {
									for (var i = 0; i < tempMediaGroups.length; i++) {
										var mediaGroup = tempMediaGroups[i];
										srcLibId = mediaGroup.libid;
										g_mediaLibary.moveVideoItems(srcLibId, destLibId,
											mediaGroup.mediaItems,
											function() {});
									};
								} else {
									g_mediaLibary.moveVideoItems(srcLibId, destLibId,
										g_moveMediaControl.moveLibData.videoItems,
										function() {});
								}
							}
						});
					}

				} else {
					// move selected medias to library exist
					var srcLibId = g_moveMediaControl.moveLibData.srcLibId;
					var tempMediaGroups = g_moveMediaControl.moveLibData.mediaGroups;
					var destLibId = g_moveMediaControl.moveLibData.destLibId;

					if (srcLibId == -1) {
						for (var i = 0; i < tempMediaGroups.length; i++) {
							var mediaGroup = tempMediaGroups[i];
							srcLibId = mediaGroup.libid;
							g_mediaLibary.moveVideoItems(srcLibId, destLibId,
								mediaGroup.mediaItems,
								function() {});
						};
					} else {
						g_mediaLibary.moveVideoItems(srcLibId, destLibId,
							g_moveMediaControl.moveLibData.videoItems,
							function() {});
					}
				}

				// clear selection state.
				g_moveMediaControl.itemsWithTag.removeClass("waitselect");
				g_moveMediaControl.controlContain.empty();
			} else {
				alert($.i18n.prop('transfer_11'));
			}
		});

		this.itemsWithTag.click( function() {
			var id = $(this).find(".img").attr("fileid");

			if ($(this).hasClass("editlabraryselected")) {
				$(this).removeClass("editlabraryselected");
				--g_moveMediaControl.selectedNum;

				$("#js_moveMedia_num").text(g_moveMediaControl.selectedNum);
	
				if (g_moveMediaControl.selectedNum > 0) {
					$("#js_moveMedia_ok").removeClass("disable");
				} else {
					$("#js_moveMedia_ok").addClass("disable");
				}
			} else {
				$(this).addClass("editlabraryselected");
				++g_moveMediaControl.selectedNum;
				$("#js_moveMedia_num").text(g_moveMediaControl.selectedNum);
				$("#js_moveMedia_ok").removeClass("disable");
			}
		});

		$("#js_moveMedia_checkbox").click( function(){
			var box = g_moveMediaControl.itemsWithTag;
			var boxNum= box.length;
			if(!$(this).hasClass("selected")){
				box.addClass("editlabraryselected");
				g_moveMediaControl.selectedNum = boxNum;
				$("#js_moveMedia_num").text(g_moveMediaControl.selectedNum);
				$("#js_moveMedia_ok").removeClass("disable");
			}
			else{
				box.removeClass("editlabraryselected");
				g_moveMediaControl.selectedNum = 0;
				$("#js_moveMedia_num").text(g_moveMediaControl.selectedNum);
				$("#js_moveMedia_ok").addClass("disable");
			}
		});

		var input_dropdown=$("#js_moveMedia_input_dropdown");

		input_dropdown.focus(function(){
			var text_value=$(this).val();
			if(text_value==g_moveMediaControl.editLibraryStaticDatas.editLibraryStatic.editLibraryStr_6){
				$(this).val("");
				$(this).removeClass("hui");

			}
		});

		input_dropdown.blur(function(){
			var txt_value=$(this).val();
			if(txt_value==""){
			$(this).val(g_moveMediaControl.editLibraryStaticDatas.editLibraryStatic.editLibraryStr_6);
			$(this).addClass("hui");
			}
		});

		input_dropdown.click( function() {
			$("#js_moveMedia_dropdow").find("ul").hide();
		});

		$("#js_moveMedia_dropdow li").click( function() {
			var cusvalue = $(this).attr("cus_value");
			
			var input_dropdown=$("#js_moveMedia_input_dropdown");

			if (cusvalue==-10) {
				input_dropdown.val(g_moveMediaControl.editLibraryStaticDatas.editLibraryStatic.editLibraryStr_6);
				input_dropdown.attr("disabled", false);	
				input_dropdown.addClass("hui");
			}
			else{
				input_dropdown.attr("disabled", true);	
				input_dropdown.removeClass("hui");
			}
		});
	},

	hideControl: function() {
		this.selectedNum = 0;
		this.controlContain.empty();
	}

	/*
	librarySearchMove: function(libraryname) {
		
			this.editLibraryStaticDatas = {
				editLibraryState: 1, // 1、移动  2、合并
				editLibraryStatic: {
					editLibraryStr_1: libraryname,
					editLibraryStr_2: $.i18n.prop('transfer_2'),
					editLibraryStr_3: $.i18n.prop('transfer_3'),
					editLibraryStr_4: $.i18n.prop('transfer_4'),
					editLibraryStr_btn1: $.i18n.prop('transfer_6'),
					editLibraryStr_btn2: $.i18n.prop('transfer_5'),
					editLibraryStr_5: $.i18n.prop('addlibrary_1'),
					editLibraryStr_6: $.i18n.prop('addlibrary_3'),
				}

			};
			$("#editlibrarysearch").setTemplateURL("../template/editlibrary.tpl?" + AppVersion);
			$("#editlibrarysearch").setParam('StaticDatas', this.editLibraryStaticDatas);
			$("#editlibrarysearch").processTemplate(this.editLibraryDatas);
			$("#pl_layer5 .box,#pl_layer5.box2").removeClass("waitselect");
			$("#pl_layer5 .box,#pl_layer5 .box2").removeClass("editlabraryselected");
			$("#editlibrarysearchmovenum").text("0");
			$("#editlibrarysearchcomnum").text("0");
			this.waitselect("#pl_layer5 .box, #pl_layer5 .box2");
		
		//添加库
		var input_dropdown=$("#editlibrary .dropdown .input_dropdown");

		input_dropdown.focus(function(){
			var text_value=$(this).val();
			if(text_value==g_editlibrary.editLibraryStaticDatas.editLibraryStatic.editLibraryStr_6){
				$(this).val("");
				$(this).removeClass("hui");

			}
		})
		input_dropdown.blur(function(){
			var txt_value=$(this).val();
			if(txt_value==""){
			$(this).val(g_editlibrary.editLibraryStaticDatas.editLibraryStatic.editLibraryStr_6);
			$(this).addClass("hui");
			}
		})
	}
	*/
}
