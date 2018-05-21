var g_feedback;

var feedbackTpl = function() {
	g_feedback = this;
};

feedbackTpl.prototype = {
	staticFeedbackData:{},
	feedbackData:{},
	cascadingMenu:[],
 	init: function( domPosition ) {
    	g_objsSwitchLanguage.push( this );

    	
    },

    clickinit:function(){ 
    	this.feedbackData={
    		username:g_loginControl.userInfo.username,
			email:g_loginControl.userInfo.email,
			avatar:g_loginControl.userInfo.avatar,
			cascadingMenu_selected_1:{cus_value:"0",text:""},
			cascadingMenu_selected_2:{cus_value:"0",text:""},
			

			verson: g_coreSettings.settingData.genericVersion,
			question_des:"",
			isloadlog: false

    	};
    	this.cascadingMenu=[
				{
					cus_value:"1",
					text:$.i18n.prop('index_258'),
					children:[
						{
							cus_value:"11",
							text:$.i18n.prop('index_262')
						},
						{
							cus_value:"12",
							text:$.i18n.prop('index_263')
						},
						{
							cus_value:"13",
							text:$.i18n.prop('index_283')
						},
						{
							cus_value:"14",
							text:$.i18n.prop('index_264')
						},
						{
							cus_value:"15",
							text:$.i18n.prop('index_265')
						},
						{
							cus_value:"16",
							text:$.i18n.prop('index_266')
						},
						{
							cus_value:"17",
							text:$.i18n.prop('index_267')
						},
						{
							cus_value:"18",
							text:$.i18n.prop('index_268')
						},
						{
							cus_value:"19",
							text:$.i18n.prop('index_261')
						}
						
					]
				},
				{
					cus_value:"2",
					text:$.i18n.prop('index_259'),
					children:[
						{
							cus_value:"21",
							text:$.i18n.prop('index_269')
						},
						{
							cus_value:"22",
							text:$.i18n.prop('index_262')
						},
						{
							cus_value:"23",
							text:$.i18n.prop('index_263')
						},
						{
							cus_value:"24",
							text:$.i18n.prop('index_283')
						},
						{
							cus_value:"25",
							text:$.i18n.prop('index_264')
						},
						{
							cus_value:"26",
							text:$.i18n.prop('index_265')
						},
						{
							cus_value:"27",
							text:$.i18n.prop('index_266')
						},
						{
							cus_value:"28",
							text:$.i18n.prop('index_267')
						},
						{
							cus_value:"29",
							text:$.i18n.prop('index_261')
						}
					]
				},
				{
					cus_value:"3",
					text:$.i18n.prop('index_260'),
					children:[
						{
							cus_value:"31",
							text:$.i18n.prop('index_270')
						},
						{
							cus_value:"32",
							text:$.i18n.prop('index_271')
						},
						{
							cus_value:"33",
							text:$.i18n.prop('index_272')
						},
						{
							cus_value:"34",
							text:$.i18n.prop('index_261')
						}
					]
				},
				{
					cus_value:"4",
					text:$.i18n.prop('index_261'),
					children:[
						{
							cus_value:"41",
							text:$.i18n.prop('index_261')
						}
					]
				}
				
		];

    	$("#popFeedback").setTemplateURL("../template/popfeedback.tpl?" + AppVersion);
    	this.updatePage();
    	$("#popFeedback").processTemplate(this.feedbackData);
		showdiv('.popFeedback',1);
		var urlImage = 'url(' + this.feedbackData.avatar + ')';
		if(this.feedbackData.avatar!=""){
			$(".popFeedback .usermes").addClass("loginUserimg");
			$(".popFeedback .loginUserimg span").css("background-image", urlImage );
		}
		else{
			$("popFeedback .usermes").removeClass("loginUserimg");
			$(".popFeedback .usermes span").css("background-image", "../images/spriteimg/iconimg_2.png" );
		}
		
		$("#isloadlog").click(function(){
			g_feedback.feedbackData.isloadlog=checkboxResult($("#isloadlog"));
		});
		//级联菜单
		$("#feedback_q_str1_list").append("<li cus_value='0'>"+this.staticFeedbackData.question_str3+"</li>");
		$("#feedback_q_str2_list").append("<li cus_value='0'>"+this.staticFeedbackData.question_str4+"</li>");
		$.each(g_feedback.cascadingMenu,function(index,d){
			var $li=$("<li>");
			$li.attr("cus_value",d.cus_value);
			$li.text(d.text);
			$li.data("children",d.children);
			$("#feedback_q_str1_list").append($li);
		});
		
		$("#feedback_q_str1_list li").click(function(){
		        $("#feedback_q_str2_list").html('');
		        $("#feedback_q_str2_list").append("<li cus_value='0'>"+g_feedback.staticFeedbackData.question_str4+"</li>");
		        $(".selected_q_str2").find(".font").text(g_feedback.staticFeedbackData.question_str4);
		        var children=$(this).data("children");
		        if(children){
		        	$(".selected_q_str2").removeClass("disable");
		        	$.each(children,function(index,d){
		        		var $li=$("<li>");
						$li.attr("cus_value",d.cus_value);
						$li.text(d.text);
						$li.data("children",d.children);
						$("#feedback_q_str2_list").append($li);
		        	});
		        }
		        else{
		        	$(".selected_q_str2").addClass("disable");
		        }	       
		});
	
		$("#feedbackOk").click(function(){
			if(g_feedback.feedbackData.username==""){
				g_feedback.feedbackData.username=$("#feedback_username").val();
				g_feedback.feedbackData.email=$("#feedback_email").val();
			}
			g_feedback.feedbackData.cascadingMenu_selected_1.cus_value = $(".selected_q_str1").find("a").attr("cus_value");
			g_feedback.feedbackData.cascadingMenu_selected_1.text = $(".selected_q_str1").find(".font").text();
			g_feedback.feedbackData.cascadingMenu_selected_2.cus_value = $(".selected_q_str2").find("a").attr("cus_value");
			g_feedback.feedbackData.cascadingMenu_selected_2.text = $(".selected_q_str2").find(".font").text();
			g_feedback.feedbackData.question_des = $("#feedback_details").val();
			g_feedback.feedbackData.isloadlog = checkboxResult($("#isloadlog"));

			console.log(g_feedback.feedbackData);

			g_feedback.sendReport();
		});

		function checkboxResult(elm){
				if(elm.hasClass("selected")){
					return true;
				}
				else{
					return false;
				}
		};

    },

    switchLanguage:function(){ 
    	this.staticFeedbackData={
    		title:$.i18n.prop('index_251'),
    		des_1:$.i18n.prop('index_252'),
    		des_2:$.i18n.prop('index_253'),
			username_str:$.i18n.prop('index_254'),
			email_str:$.i18n.prop('index_255'),
			question_str1:$.i18n.prop('index_256'),
			question_str2:$.i18n.prop('index_257'),
			question_str3:$.i18n.prop('index_284'),
			question_str4:$.i18n.prop('index_284'),
			loadlog_str:$.i18n.prop('index_273'),
			verson_str:$.i18n.prop('index_274'),
			question_des_str:$.i18n.prop('index_275'),
			btn_1:$.i18n.prop('index_276'),
			btn_2:$.i18n.prop('index_25')
    	};
    },

    updatePage: function() {
		this.switchLanguage();
		$("#popFeedback").setParam( "staticFeedbackData", this.staticFeedbackData );
	},

	sendReport: function() {
		// check condition, send log file or give some problem description.
		if ( !g_feedback.feedbackData.isloadlog && g_feedback.feedbackData.question_des == "" ) {
			return;
		};

		var content = "Version:" + g_feedback.feedbackData.verson + "\n";
		content += "Module:" + g_feedback.feedbackData.cascadingMenu_selected_1.text + "\n";
		content += "Theme:" + g_feedback.feedbackData.cascadingMenu_selected_2.text + "\n";
		content += "Content:" + g_feedback.feedbackData.question_des + "\n";
		var params = {
			'username': g_feedback.feedbackData.username,
			'email': g_feedback.feedbackData.email,
			'content': content,
			'notsendlog': !g_feedback.feedbackData.isloadlog
		};

		showdiv('.loadingbg', 3);

		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.ReportVMSLog',
			'params': params,
			'success': function(data) {
				var messageObj = {
					id: 1,
					str1: "",
					str2: ""
				};

				close_box(".loadingbg", 3);

				if (data && data.result.ret) {
					console.log("send report successful.");
					messageObj.str1 = $.i18n.prop('index_277');
					messageObj.str2 = $.i18n.prop('index_278');

					g_commonPopDialog.showAlertDialog(messageObj);
				} else {
					console.log("send report failed.");
					messageObj.str1 = $.i18n.prop('index_279');
					messageObj.str2 = $.i18n.prop('index_280');

					g_commonPopDialog.showAlertDialog(messageObj);
				}
			}
		});
	}
}