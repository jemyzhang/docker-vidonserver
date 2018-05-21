/* data format:
data = {
	name: "My library",
	curAgent:{
		id: 0,
		name: "tudou"
	},
	agents: [
		{
			id: 0,
			name: "tudou"
		},{
			id: 1,
			name: "tmdb"
		},
	],
	isAutoClass: true,
	isCustom: true,

	paths: [{
		id: 1,
		path: "D:/test1/"
	}, {
		id: 2,
		path: "D:/test2/"
	}, {
		id: 3,
		path: "D:/test3/"
	}, {
		id: 4,
		path: "D:/test4/"
	}, {
		id: 5
		path: "D:/test5/"
	}, ]
};
*/

var g_addLibrary;

var addLibrary = function() {
	g_addLibrary = this;
};

addLibrary.prototype = {
	scraperArray: [],
	data: {},
	originData:{},
	mode: 0, // 0: add new library; 1: edit exist library;
	obj: {},
	addLibraryStaticDatas:{},
	
	init: function(domPosition) {
		// get scrapers
		this.getScraperModules();
		
		// init data
		this.data.name = "";
		this.data.curAgent = {};
		this.data.curAgent.id = 0;
		this.data.curAgent.name = "";
		this.data.origpaths = [];
		this.data.paths = [];
		this.data.isAutoClass = false;
		this.data.isCustom = true;
		this.data.libId = -1;
		
		obj = this;
		
		// bind click
		$("#addlibrarypath").live( "click", function() {
			var name = $("#libraryName").val();
			var libId = 0;

			if (typeof(name) == "undefined") {
				libId = 2;
			} else {
				libId = 1;
			}

			g_pathBrowser.initBrowser(libId, function(path) {
				var it = {};
				it.path = path;
				obj.data.paths.push(it);
				
				if (libId == 1) {
					var curAgentId = Number($("#scraperAgent a").attr("cus_value"));
					for (var i = 0; i < obj.scraperArray.length; ++i) {
						if ( curAgentId == obj.scraperArray[i].id ) {
							obj.data.curAgent.id = obj.scraperArray[i].id;
							obj.data.curAgent.name = obj.scraperArray[i].name;
						}
					}
				}

				if (libId == 2) {
					obj.mode = 1;
					obj.data.libId = libId;
					$("#editLibraryOk").removeClass("btn-disable");
				}

				obj.freshLibraryPage();
			});
		});
		//库名字是否为空
		$("#libraryName").live("keyup",function() {
			if($(this).val()!=""){
				$("#editLibraryOk").removeClass("btn-disable");
			} else {
				if(!$("#editLibraryOk").hasClass("btn-disable")){
					$("#editLibraryOk").addClass("btn-disable");
				}
			}

			obj.data.name = $("#libraryName").val();
		})
		$("#libraryName").live("blur",function() {
			if($(this).val()!=""){
				$("#editLibraryOk").removeClass("btn-disable");
			} else {
				if(!$("#editLibraryOk").hasClass("btn-disable")){
					$("#editLibraryOk").addClass("btn-disable");
				}
			}

			obj.data.name = $("#libraryName").val();
		})
		$("#editLibraryOk").live("click", function() {
			var libraryName = $("#libraryName").val();

			if(typeof(libraryName) == "undefined" || libraryName != "") {
				var isAutoClass = obj.data.isAutoClass; // $("#autoClass span").hasClass("selected");
				var curAgentId = Number($("#scraperAgent a").attr("cus_value"));

				if (obj.mode == 0) {
					var bLibNameExist = g_mediaLibary.checkExistLibForName(libraryName);
					if (bLibNameExist) {
						alert($.i18n.prop('transfer_9'));
						return;
					}
					
					obj.data.name = libraryName;
					obj.data.isAutoClass = isAutoClass;
					
					obj.data.curAgent.id = curAgentId;
			
					obj.doAddLibrary();
				} else {
					if ( obj.data.libId == 2 ) {
						// photo library logic
					}
					else if (libraryName != obj.originData.name || curAgentId != obj.originData.curAgent.id ) {
						obj.doEditCustomLibrary(obj.data.libId, libraryName, curAgentId, isAutoClass);
					}
					
					var size = $("#pathsInLibrary li").length;
					
					var pathsOrig = [], pathsOrigId = [], pathsNow = [];
					for (var i = 0; i < obj.data.origpaths.length; ++i) {
						pathsOrig.push(obj.data.origpaths[i].path);
						pathsOrigId.push(obj.data.origpaths[i].id);
					}
					
					for (var i = 0; i < size; ++i) {
						var path = $("#pathsInLibrary li:eq(" + i + ")").children("span").last().text();
						if ( path != $.i18n.prop("index_16") ){
							pathsNow.push(path);
							if (-1 == $.inArray(path, pathsOrig)) {
								// new addition
								obj.doAddPathToLibrary(obj.data.libId, path);
							}
						}
					}
					
					for (var i = 0; i < pathsOrig.length; ++i) {
						var path = pathsOrig[i];
						var id = pathsOrigId[i];
						
						if (-1 == $.inArray(path, pathsNow)) {
							// delete
							obj.doDeletePathFromLibrary(obj.data.libId, id);
						}
					}
					
					// add and remove path from library need some time, set 2 seconds time delay.
					setTimeout( function(){
						g_mediaLibary.startScanLibraryById(obj.data.libId);
					}, 2000 );
					
					
					close_box('.popaddlibrary', 1);
				}
			}
		});
		
		$(".click_delpath").live("click", function() {
			var path = $(this).parents("li").children("span").last().text();
			var ref = $(this);

			g_commonPopDialog.showDel(path);

			$("#btnCfmDeletePathOK").die("click");
			$("#btnCfmDeletePathOK").live("click", function() {
				var pos = -1;

				for (var i = 0; i < obj.data.paths.length; ++i) {
					if (path == obj.data.paths[i].path) {
						pos = i;
						break;
					}
				}

				obj.data.paths.splice(pos, 1);

				ref.parents("li").remove();
				if($("#pathsInLibrary").find("li").length==0){
					$("#pathsInLibrary").append('<li><span class="showpath">'+ $.i18n.prop("index_16") +'</span></li>');
				}
				close_box('.confirmDelete',3);
			});
		});
		
		$("#editLibraryDelete").live("click", function() {
			g_commonPopDialog.showDel();

			$("#btnCfmDeletePathOK").die("click");
			$("#btnCfmDeletePathOK").live("click", function() {
				$("#libraryName").val("");
				obj.clickDeleteLibrary(obj.data.libId);
				close_box('.popaddlibrary',1);
				close_box('.confirmDelete',3);
			});
		});
		$("#tipsimg").live("click",function(){
			g_commonPopDialog.agentlist();
		})
	},

	switchLanguage:function(){
		this.addLibraryStaticDatas={
			addLibraryStaticDatasStr_title1:$.i18n.prop('addlibrary_1'),
			addLibraryStaticDatasStr_title2:$.i18n.prop('addlibrary_2'),
			addLibraryStaticDatasStr_1:$.i18n.prop('addlibrary_3'),
			addLibraryStaticDatasStr_2:$.i18n.prop('addlibrary_4'),
			addLibraryStaticDatasStr_3:$.i18n.prop('addlibrary_5'),
			addLibraryStaticDatasStr_4:$.i18n.prop('addlibrary_6'),
			addLibraryStaticDatasStr_5:$.i18n.prop('addlibrary_7'),
			addLibraryStaticDatasStr_6:$.i18n.prop('addlibrary_8'),
			addLibraryStaticDatasStr_btn1:$.i18n.prop('index_81'),
			addLibraryStaticDatasStr_btn2:$.i18n.prop('index_25'),
			index_16:$.i18n.prop("index_16")
		};

		// check path num, set add path button with different title.
		if ( this.data.paths.length > 0 ) {
			this.addLibraryStaticDatas.addLibraryStaticDatasStr_6 = $.i18n.prop('addlibrary_8');
		} else {
			this.addLibraryStaticDatas.addLibraryStaticDatasStr_6 = $.i18n.prop('addlibrary_10');
		}
		
		$("#popaddlibrary").setParam("addLibraryStaticDatas", this.addLibraryStaticDatas);
	},
	
	freshLibraryPage: function() {
		$("#popaddlibrary").setTemplateURL("../template/popaddlibrary.tpl?" + AppVersion);
		$("#popaddlibrary").setParam("mode", this.mode);
		this.switchLanguage();

		// need fill real library detail data
		$("#popaddlibrary").processTemplate(this.data);
		showdiv('.popaddlibrary',1);

		if (typeof(this.data.name) != "undefined" && this.data.name.length > 0) {
			$("#editLibraryOk").removeClass("btn-disable");
		}
		$(".userdefined_scrollbar").mCustomScrollbar({
		  
        });
	},
    
	clickAddLibrary: function() {
		this.data.media_type = g_media_type_commercial;
		var curAgent = {};
		curAgent.id = this.scraperArray[0].id;
		curAgent.name = this.scraperArray[0].name;
		
		var agents = [];
		for (var i = 0; i < this.scraperArray.length; ++i) {
			var agent = {};
			
			agent.id = this.scraperArray[i].id;
			agent.name = this.scraperArray[i].name;
			agents.push(agent);
		}
		
		$("#libraryName").val("");
		this.data.name = "";
		this.data.isAutoClass = true;
		this.data.curAgent = curAgent;
		this.data.agents = agents;

		this.data.paths.length = 0;
		
		this.mode = 0;
		this.data.libId = -1;
		this.freshLibraryPage();
	},

	clickEditLibrary: function(libId, type) {
		this.data.libId = libId;
		this.data.media_type = type;
		var obj = this;

		g_customLibrary.getCustomLibraryDetail(libId, function() {
			var ret = g_customLibrary.retVal;
			var detail = g_customLibrary.libDetail;
			
			if (ret) {
				if (type == g_media_type_commercial) {
					var curAgent = {};
					curAgent.id = detail.ScraperModuleId;
					curAgent.name = detail.ScraperModuleName;
					
					var agents = [];
					for (var i = 0; i < obj.scraperArray.length; ++i) {
						var agent = {};
						
						agent.id = obj.scraperArray[i].id;
						agent.name = obj.scraperArray[i].name;
						agents.push(agent);
					}

					obj.data.name = detail.name == "Commercial Library" ? $.i18n.prop('library_2') : detail.name;
					obj.data.curAgent = curAgent;
					obj.data.agents = agents;
					obj.data.isAutoClass = detail.IsSmartClassify;
					obj.data.isCustom = detail.IsCustomLib;

					obj.originData.name = obj.data.name;
					obj.originData.curAgent = obj.data.curAgent;
				}
				
				obj.data.paths.length = 0;
				obj.data.origpaths.length = 0;
				
				for (var i = 0; i < detail.paths.length; ++i) {
					var path = {};
					
					path.id = detail.paths[i].PathId;
					path.path = detail.paths[i].path;
					obj.data.paths.push(path);
					obj.data.origpaths.push(path);
				}
				
				obj.mode = 1;
				obj.freshLibraryPage();
			} else {
				alert("Get library detail failed!");
			}
		});
	},
	
	clickDeleteLibrary: function(libId) {
		g_customLibrary.deleteCustomLibrary(libId, function() {
			var ret = g_customLibrary.retVal;
			
			if (!ret) {
				alert("Delete Library failed!");
			}
			
			close_box('.popaddlibrary', 1);
			g_mediaLibary.getLibraryDatas();
		}); 
	},
	
	doDeletePathFromLibrary: function(libId, pathId) {
		g_customLibrary.deletePathFromCustomLibrary(libId, pathId, function() {
			var ret = g_customLibrary.retVal;
			
			if (!ret) {
				alert("Delete path failed!");
			}
		});
	},
	
	doEditCustomLibrary: function(libraryId, name, scraperModuleId, isAutoClass) {
		g_customLibrary.editCustomLibrary(libraryId, name, scraperModuleId, isAutoClass, function() {
			var ret = g_customLibrary.retVal;

			if (!ret) {
				alert("Edit library failed!");
			}
			
			close_box('.popaddlibrary', 1);
			g_mediaLibary.getLibraryDatas( function(){
				var libIndex = g_mediaLibary.getLibIndexByLibId( libraryId );
				g_siderBar.clickSelectLibrary( libIndex );
			} );
		});	
	},

	changeLibraryViewMode: function(libId, isAutoClass) {
		g_customLibrary.getCustomLibraryDetail(libId, function() {
			var ret = g_customLibrary.retVal;
			var detail = g_customLibrary.libDetail;

			if (ret) {
				var libraryId = libId;
				var name = detail.name;
				var scraperModuleId = detail.ScraperModuleId;

				g_customLibrary.editCustomLibrary(libraryId, name, scraperModuleId, isAutoClass, function() {
					if (!g_customLibrary.retVal) {
						alert("Edit library failed!");
					} else {
						var libData = g_mediaLibary.getLibDataById(libId);
						if ( libData ) {
							libData.isAutoClass = isAutoClass;
						}
					}
				});
			}
		});
	},
	
	getScraperModules: function() {
		var obj = this;
	
		g_customLibrary.getScraperModules(function() {
			obj.scraperArray = g_customLibrary.scraperArray;
		});
	},
	
	doAddLibrary: function() {
		g_customLibrary.createCustomLibrary("commercial", this.data.name, this.data.curAgent.id, this.data.isAutoClass, function() {
			var ret = g_customLibrary.retVal;
			var libId = g_customLibrary.libId;
			
			if (ret) {
				g_mediaLibary.getLibraryDatas(function() {
					var libIndex = g_mediaLibary.getLibIndexByLibId(libId);
					g_siderBar.clickSelectLibrary(libIndex);
				});
				obj.doAddAllPathToLibrary(libId);
			}
			
			close_box('.popaddlibrary', 1);
		});
	},

	createLibraryWithDefaultParams: function(libName, callbackFunc) {
		var defaultAgentID = 1;
		if ( g_customLibrary.scraperArray ) {
			defaultAgentID = g_customLibrary.scraperArray[0].id;
		}

		g_customLibrary.createCustomLibrary("commercial", libName, defaultAgentID, false, function() {
			var ret = g_customLibrary.retVal;
			var libId = g_customLibrary.libId;

			callbackFunc( ret, libId );
		});
	},
	
	doAddAllPathToLibrary: function(libId) {
		var count = 0;
		
		if (this.data.paths.length == 0) { // not add path yet

		} else {
			for (var i = 0; i < this.data.paths.length; ++i) {
				g_customLibrary.addPathToCustomLibrary(libId, this.data.paths[i].path, function() {
					var ret = g_customLibrary.retVal;
					
					if (!ret) {
						alert("Add path: " + obj.data.paths[i].path + "failed!");
					} else {
						count++;
						
						if (count == obj.data.paths.length) {
							g_mediaLibary.startScanLibraryById(libId);
						}
					}
				});
			}
		}
	},
	
	doAddPathToLibrary: function(libId, path) {
		g_customLibrary.addPathToCustomLibrary(libId, path, function() {
			var ret = g_customLibrary.retVal;
			
			if (!ret) {
				alert("Add path failed!");
			}
		});
	}
}
