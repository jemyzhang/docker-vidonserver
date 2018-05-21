var g_commonPopDialog;

var CommonPopDialog = function() {
	g_commonPopDialog = this;
}; 

CommonPopDialog.prototype = {
	commonPopDialogStaticDatas:{},
	loginData:{},
    init: function( domPosition ) {
           
    },
    showAbout: function( version ){ 
    	this.commonPopDialogStaticDatas={ 
    		commonPopNum:1,//1 About   2 NoPlay   3  confirmDelete 4 confirmSave  5 多媒体。。。弹出菜单   6  agentlist   7  顶部筛选
    		aboutContent:{ aboutStr_1:"VidOn Server",
    			  aboutStr_2:version,
    			  aboutStr_3:$.i18n.prop('index_167'),
    			  aboutStr_4:$.i18n.prop('index_168')
    		}
    	};
    	$("#CommonPopDialog").setTemplateURL("../template/commonpopdialog.tpl?" + AppVersion);
    	$("#CommonPopDialog").setParam('StaticDatas', this.commonPopDialogStaticDatas);
    	$("#CommonPopDialog").processTemplate();
        this.deleteClass();
    	$("#CommonPopDialog").addClass("popabout");
    	showdiv('.popabout',1);
    },

    showNoPlay: function() { 
    	this.commonPopDialogStaticDatas={ 
    		commonPopNum:2,//1 About   2 NoPlay   3  confirmDelete 4 confirmSave
    		noPlayContent:{ 
    			noPlayContentStr_1:$.i18n.prop('index_64'),
    			noPlayContentStr_2:$.i18n.prop('index_65'),
    			noPlayContentStr_3:$.i18n.prop('index_69'),
    			noPlayContentStr_4:$.i18n.prop('index_217'),
    			noPlayContentStr_5:$.i18n.prop('index_70'),
    			noPlayContentStr_6:$.i18n.prop('index_177')

    		}
    	};

    	$("#CommonPopDialog").setTemplateURL("../template/commonpopdialog.tpl");
    	$("#CommonPopDialog").setParam('StaticDatas', this.commonPopDialogStaticDatas);
    	$("#CommonPopDialog").processTemplate();
        this.deleteClass();
    	$("#CommonPopDialog").addClass("addNoPlay");
    	showdiv(".addNoPlay",1);

    },
    showAlertDialog:function(obj){//obj格式
        if(obj.id==1){
            this.showSave2(obj.str1,obj.str2);
        }

    },
    showDel: function(path) { 
    	this.commonPopDialogStaticDatas={ 
    		commonPopNum:3,//1 About   2 NoPlay   3  confirmDelete 4 confirmSave
    		delContent:{ 
    			title_1:$.i18n.prop('index_53'),
    			pathstr:path,
    			btn_1:$.i18n.prop('index_25'),
    			btn_2:$.i18n.prop('index_33')
    		}
    	};

    	$("#CommonPopDialog").setTemplateURL("../template/commonpopdialog.tpl?" + AppVersion);
    	$("#CommonPopDialog").setParam('StaticDatas', this.commonPopDialogStaticDatas);
    	$("#CommonPopDialog").processTemplate();
        this.deleteClass();
    	$("#CommonPopDialog").addClass("confirmDelete");
    	showdiv(".confirmDelete",3);
    },
    showCommonTips: function(title,str) { 
        this.commonPopDialogStaticDatas={ 
            commonPopNum:8,//1 About   2 NoPlay   3  confirmDelete 4 confirmSave
            commonTipsContent:{ 
                title_1:title,
                str_1:str,
                btn_1:$.i18n.prop('index_25'),
                btn_2:$.i18n.prop('index_33')
            }
        };

        $("#CommonPopDialog").setTemplateURL("../template/commonpopdialog.tpl?" + AppVersion);
        $("#CommonPopDialog").setParam('StaticDatas', this.commonPopDialogStaticDatas);
        $("#CommonPopDialog").processTemplate();
        this.deleteClass();
        $("#CommonPopDialog").addClass("showCommonTips");
        showdiv(".showCommonTips",5);
    },


    showSave: function(str) { 
    	this.commonPopDialogStaticDatas={ 
    		commonPopNum:4,//1 About   2 NoPlay   3  confirmDelete 4 confirmSave
    		saveContent:{ 
    			saveContentStr_1:str	
    		}
    	};

    	$("#CommonPopDialog").setTemplateURL("../template/commonpopdialog.tpl?" + AppVersion);
    	$("#CommonPopDialog").setParam('StaticDatas', this.commonPopDialogStaticDatas);
    	$("#CommonPopDialog").processTemplate();
        this.deleteClass();
    	$("#CommonPopDialog").addClass("confirmSave");
    	showdiv(".confirmSave",5);
    	setTimeout(function(){close_box('.confirmSave',5);},2500);	
    },
    showSave2: function(str1,str2) { 
        this.commonPopDialogStaticDatas={ 
            commonPopNum:9,//1 About   2 NoPlay   3  confirmDelete 4 confirmSave
            saveContent:{ 
                saveContentStr_1:str1,  
                saveContentStr_2:str2   
            }
        };

        $("#CommonPopDialog").setTemplateURL("../template/commonpopdialog.tpl?" + AppVersion);
        $("#CommonPopDialog").setParam('StaticDatas', this.commonPopDialogStaticDatas);
        $("#CommonPopDialog").processTemplate();
        this.deleteClass();
        $("#CommonPopDialog").addClass("confirmSave");
        showdiv(".confirmSave",5);
        setTimeout(function(){close_box('.confirmSave',5);},2500);  
    },


    showMediaActionsDropdown:function(thiselem,mediatype){
        this.commonPopDialogStaticDatas={ 
            commonPopNum:5,
            mediaType:mediatype,
            showMediaDropContent:{ 
                showMediaDropContentStr_1:$.i18n.prop('commonShowMediaActions_1'),
                showMediaDropContentStr_2:$.i18n.prop('commonShowMediaActions_2')
            }
        };

        thiselem.siblings("ul.morelist").setTemplateURL("../template/commonpopdialog.tpl?" + AppVersion);
        thiselem.siblings("ul.morelist").setParam('StaticDatas', this.commonPopDialogStaticDatas);
        thiselem.siblings("ul.morelist").processTemplate();
        thiselem.siblings("ul.morelist").show();
        thiselem.parents(".box").addClass("hoverselected");
        thiselem.parents(".box").siblings().find("ul.morelist li").remove();
        thiselem.parents(".box").siblings().find("ul.morelist").hide();

        $(".box ul.morelist,.box_big ul.morelist,.box2 ul.morelist").live("mouseleave",function(){
            thiselem.parents(".box").removeClass("hoverselected");
            $(this).hide();
            //$(this).find("li").remove();
        })

        $(document).click(function(){
            $("ul.morelist").hide();
        })
    },
    agentlist:function(){
        this.commonPopDialogStaticDatas={ 
            commonPopNum:6,
            agentlistContent:{ 
                showMediaDropContentStr_1:$.i18n.prop('commonAgentListTips_1'),
                showMediaDropContentStr_2:$.i18n.prop('commonAgentListTips_2'),
                showMediaDropContentStr_3:$.i18n.prop('commonAgentListTips_3'),
                 showMediaDropContentStr_4:$.i18n.prop('commonAgentListTips_4')

            }
        }; 
        $("#CommonPopDialog").setTemplateURL("../template/commonpopdialog.tpl?" + AppVersion);
        $("#CommonPopDialog").setParam('StaticDatas', this.commonPopDialogStaticDatas);
        $("#CommonPopDialog").processTemplate();
        this.deleteClass();
        $("#CommonPopDialog").addClass("popagentlist");
        showdiv(".popagentlist",2);

    },
    topFilter:function(){
        this.commonPopDialogStaticDatas={ 
            commonPopNum:7,
            topFilterContent:{ 
                topFilterStr_1:$.i18n.prop('index_38'),
                topFilterStr_2:$.i18n.prop('index_39'),
                topFilterStr_3:$.i18n.prop('index_40'),
                topFilterStr_4:"请选择"

            }
        }; 
        $("#topfilter").setTemplateURL("../template/commonpopdialog.tpl?" + AppVersion);
        $("#topfilter").setParam('StaticDatas', this.commonPopDialogStaticDatas);
        $("#topfilter").processTemplate();
    },

    showBottomTip: function( strTips ) {
        $(".movieTips").show();

        var tempStr = '<p>' + strTips + '</p>';
        $(".movieTips").html(tempStr);
    },

    hideBottomTip: function() {
        $(".movieTips").hide();
    },
    deleteClass:function(){
        var CommonPopDialog=$("#CommonPopDialog");
        var arr=["popabout","addNoPlay","confirmDelete","confirmSave","popagentlist"];
        for(var i=0;i<arr.length;i++){
            if(CommonPopDialog.hasClass(arr[i])){
                CommonPopDialog.removeClass(arr[i]);
            }

        }
    }
}