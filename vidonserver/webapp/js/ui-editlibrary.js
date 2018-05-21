var g_editlibrary;

var editLibrary = function() {
	g_editlibrary = this;
};

editLibrary.prototype = {
	editLibraryStaticDatas: [],
	editLibraryDatas:{},
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
		}]
	},

	init: function(domPosition) {
		$(".editlibrarycannel").live("click", function() {
			$("#pl .box,#pl .box2").removeClass("waitselect");
			$("#editlibrary").empty();
		});

		$(".editlibraryok").live("click", function() {
			if(g_editlibrary.selectedNum>0){
			
			if (g_editlibrary.editLibraryStaticDatas.editLibraryState == 1) {

				// move library operation.
				var strCusValue = $("#editlibrary .input_dropdown").attr("cus_value");
				if (strCusValue) {
					g_editlibrary.moveLibData.destLibId = Number(strCusValue);
				};

				var boxarry = $("#pl .editlabraryselected .img");
				var resultVideoItems = [];
				for (var i = 0; i < boxarry.length; i++) {
					var id = $(boxarry[i]).attr("fileid");
					var mediatype = $(boxarry[i]).attr("mediatype");
					g_editlibrary.editLibraryDatas.selectedList.push(id);

					var tempVideoItem = {};
					tempVideoItem.mediaid = Number(id);
					tempVideoItem.mediatype = mediatype;
					resultVideoItems.push(tempVideoItem);
				}

				g_editlibrary.moveLibData.videoItems = resultVideoItems;

				// check if need create new library.
				var newLibName = $("#editlibrary .input_dropdown").val();
				if ( newLibName == "" || newLibName == g_editlibrary.editLibraryStaticDatas.editLibraryStatic.editLibraryStr_6 ) {
					alert($.i18n.prop('transfer_10'));
					$("#editlibrary .dropdown .input_dropdown").focus();
					return;
				}

				if (strCusValue == "-10") {
					var bLibNameExist = g_mediaLibary.checkExistLibForName(newLibName);
					if (bLibNameExist) {
						alert($.i18n.prop('transfer_9'));
						$("#editlibrary .dropdown .input_dropdown").focus();
						return;
					} else {
						g_addLibrary.createLibraryWithDefaultParams(newLibName, function(bSuccess, libId) {
							if (bSuccess) {
								g_mediaLibary.freshLibraryDatas();

								g_mediaLibary.moveVideoItems(g_editlibrary.moveLibData.srcLibId, libId,
									g_editlibrary.moveLibData.videoItems,
									function() {});
							}
						});
					}
					
				} else {
					g_mediaLibary.moveVideoItems(g_editlibrary.moveLibData.srcLibId,
						g_editlibrary.moveLibData.destLibId,
						g_editlibrary.moveLibData.videoItems,
						function() {

						});
				}

				

			} else if (g_editlibrary.editLibraryStaticDatas.editLibraryState == 2) {

				// merge media items operation.
				g_editlibrary.editLibraryDatas.setName = $("#editCombineSetName").val();

			}

			$("#editlibrary").empty();
			$("#pl .box,#pl .box2").removeClass("waitselect");
		}
		else{
			alert( $.i18n.prop('transfer_11'));
		}
		});

		$("#pl .waitselect").live("click",function(){
			var id=$(this).find(".img").attr("fileid");
	
			if($(this).hasClass("editlabraryselected")){
				$(this).removeClass("editlabraryselected");
				--g_editlibrary.selectedNum;

				$("#editlibrarymovenum").text(g_editlibrary.selectedNum);
				$("#editlibrarycomnum").text(g_editlibrary.selectedNum);
				//g_editlibrary.editLibraryDatas.selectedList.splice($.inArray(id,g_editlibrary.editLibraryDatas.selectedList),1);
				//console.log(g_editlibrary.editLibraryDatas.selectedList);
				if(g_editlibrary.selectedNum > 0){
				$(".editlibraryok").removeClass("disable");
			}
			else{
				$(".editlibraryok").addClass("disable");
			}	
			}
			else{
				$(this).addClass("editlabraryselected");
				++g_editlibrary.selectedNum;
				$("#editlibrarymovenum").text(g_editlibrary.selectedNum);
				$("#editlibrarycomnum").text(g_editlibrary.selectedNum);
				$(".editlibraryok").removeClass("disable");
				//g_editlibrary.editLibraryDatas.selectedList.push(id);
				//console.log(g_editlibrary.editLibraryDatas.selectedList);
			}
				
		});

		$(".editLibraryselectedAll .checkbox").live("click",function(){
			var box = $("#pl .box,#pl .box2");
			var boxNum=$("#pl .box,#pl .box2").length;
			if($(this).hasClass("selected")){
				box.addClass("editlabraryselected");
				g_editlibrary.selectedNum = boxNum;
				$("#editlibrarymovenum").text(g_editlibrary.selectedNum);
				$("#editlibrarycomnum").text(g_editlibrary.selectedNum);
				//var boxarry=$("#pl .box .img,#pl .box2 .img");	
				
			}
			else{
				box.removeClass("editlabraryselected");
				g_editlibrary.selectedNum = 0;
				$("#editlibrarymovenum").text(g_editlibrary.selectedNum);
				$("#editlibrarycomnum").text(g_editlibrary.selectedNum);
				//g_editlibrary.editLibraryDatas.selectedList=[];
			}
		});

		$("#editlibrary .dropdown .input_dropdown").live("click",function() {
			$("#editlibrary .dropdown").find("ul").hide();
		});

		$("#editlibrary .dropdown li").live("click",function() {
			var cusvalue = $(this).attr("cus_value");
			
			var input_dropdown=$("#editlibrary .dropdown .input_dropdown");

			if (cusvalue==-10) {
				input_dropdown.val(g_editlibrary.editLibraryStaticDatas.editLibraryStatic.editLibraryStr_6);
				input_dropdown.attr("disabled", false);	
				input_dropdown.addClass("hui");
			}
			else{
				input_dropdown.attr("disabled", true);	
				input_dropdown.removeClass("hui");
			}
		});
		
	},

	libraryMove: function(libraryname) {
		this.moveLibData.srcLibId = -1;
		this.moveLibData.destLibId = -1;
		this.moveLibData.videoItems = [];

		var tempLibDatas = g_siderBar.siderBarData.libaryData;
		var resultLibInfoList = [];
		for (var i = 0; i < tempLibDatas.length; i++) {
			var tempLibData = tempLibDatas[i];
			var tempLibInfo = {};

			tempLibInfo.name = tempLibData.name;
			tempLibInfo.id = tempLibData.id;

			// if current libname equal with srclib name, no need add to dest libname list.
			if (libraryname != tempLibInfo.name) {
				resultLibInfoList.push(tempLibInfo);
			} else {
				// covert libraryname to valid lib id.
				this.moveLibData.srcLibId = tempLibInfo.id;
			}
		};

		// check lib id if valid
		if (this.moveLibData.srcLibId != -1) {
			this.editLibraryDatas = {
				transfeeredto: resultLibInfoList[0],
				libraryList: resultLibInfoList,
				selectedList: [],
				selectedNums: 0
			};

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
					//editLibraryStr_6: $.i18n.prop('addlibrary_3'),
					editLibraryStr_6: $.i18n.prop('transfer_8')
				}

			};
			$("#editlibrary").setTemplateURL("../template/editlibrary.tpl?" + AppVersion);
			$("#editlibrary").setParam('StaticDatas', this.editLibraryStaticDatas);
			$("#editlibrary").processTemplate(this.editLibraryDatas);
			$("#pl .box,#pl .box2").removeClass("waitselect");
			$("#pl .box,#pl .box2").removeClass("editlabraryselected");
			$("#editlibrarymovenum").text("0");
			$("#editlibrarycomnum").text("0");
			this.waitselect("#pl .box,#pl .box2");
		}
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
	},
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
					editLibraryStr_6: $.i18n.prop('addlibrary_3')
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
	},
	editCombine:function(libraryname){
		this.editLibraryDatas={
			setName:"",
			settype:$.i18n.prop('merge_3'),
			libraryList:[$.i18n.prop('merge_3'),$.i18n.prop('merge_4')],
			selectedList:[],
			selectedNums:0
		};
		this.editLibraryStaticDatas = {
			editLibraryState:2, // 1、移动  2、合并
			editLibraryStatic:{
				editLibraryStr_1:libraryname,
				editLibraryStr_2:$.i18n.prop('transfer_2'),
				editLibraryStr_3:$.i18n.prop('transfer_3'),
				editLibraryStr_4:$.i18n.prop('merge_1'),
				editLibraryStr_5:$.i18n.prop('merge_2'),
				editLibraryStr_btn1:$.i18n.prop('transfer_6'),
				editLibraryStr_btn2:$.i18n.prop('transfer_5')
			}	
		};
		$("#editlibrary").setTemplateURL("../template/editlibrary.tpl?" + AppVersion);
    	$("#editlibrary").setParam('StaticDatas', this.editLibraryStaticDatas);
    	$("#editlibrary").processTemplate(this.editLibraryDatas);
    	$("#pl .box,#pl .box2").removeClass("waitselect");
    	$("#pl .box,#pl .box2").removeClass("editlabraryselected");
    	$("#editlibrarymovenum").text("0");
    	$("#editlibrarycomnum").text("0");
    	this.waitselect("#pl .box,#pl .box2");

	},

	waitselect:function(elem){
		g_editlibrary.isInSelectStatus = true;
		g_editlibrary.selectedNum = 0;
		$(elem).addClass("waitselect");
	},

	showEditControl: function( bShow ) {
		if ( bShow ) {

		} else {
			$("#editlibrary").empty();
		}
	}
}
