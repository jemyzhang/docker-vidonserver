var g_loginControl;

var LoginControl = function() {
	g_loginControl = this;
}; 

LoginControl.prototype = {
	userInfo: {
		username: "",
		email: "",
		avatar: ""
	},

    init: function( domPosition ) {
    	this.CheckUserImage();	
    },
    clickinit:function(){

    	
    	$("#poplogin").setTemplateURL("../template/poplogin.tpl");
    	this.switchLanguage();	
		$("#poplogin").processTemplate(this.loginData);
		this.CheckAuthUserInfo();
		this.bindControls();
    },
    switchLanguage:function(){ 
		this.loginStaticDatas = {
			loginStr_no_1:$.i18n.prop('index_50'),
			loginStr_no_2:$.i18n.prop('index_190'),
			loginStr_no_3:$.i18n.prop('index_32'),
			loginStr_no_4:$.i18n.prop('index_57'),
			loginStr_no_5:$.i18n.prop('index_56'),
			loginStr_no_6:$.i18n.prop('index_54'),
			loginStr_no_7:$.i18n.prop('index_55'),
			loginStr_no_8:$.i18n.prop('index_58'),

			loginStr_ok_1:$.i18n.prop('index_176'),
			loginStr_ok_2:$.i18n.prop('index_59'),
			loginStr_ok_3:$.i18n.prop('index_60'),
			loginStr_ok_4:$.i18n.prop('index_62'),
			loginStr_ok_5:$.i18n.prop('index_58'),
			loginStr_ok_6:$.i18n.prop('index_248'),
			loginStr_ok_7:$.i18n.prop('index_249'),
			loginStr_ok_8:$.i18n.prop('index_250')
			
		};
		$("#poplogin").setParam("loginStaticDatas",this.loginStaticDatas);
	},
    bindControls: function() {
    	$("#selectNationality").click(function() {
			$(this).toggleClass("selected");
		})

		
		//登录验证
		$("#user").live("focus",function(){
			var text_value=$(this).val();
			if(text_value==$.i18n.prop('index_190')){
				$(this).val("").removeClass("hui");
			}
		})
		$("#user").live("blur",function(){
			var txt_value=$(this).val();
			if(txt_value==""){
				$(this).val($.i18n.prop('index_190')).addClass("hui");
			}
		})
		
		$("#showPwd").focus( function() {
			var text_value = $(this).val();
			if (text_value == $.i18n.prop('index_32')) {
				$("#showPwd").hide();
				$("#password").show().focus();
			}
		});
		$("#password").blur(function() {
			var text_value = $(this).val();
			if (text_value == "") {
				$("#showPwd").show();
				$("#password").hide();
			}
		});
		
		$("#loginbtn").live("click",function() {
			$("#loginerr").text("");
			var cn = $("#selectNationality").hasClass("selected");
			var username = $("#user").val();
			var userpass = $.md5($("#password").val());
			var userpass2 = $("#password").val();

			if ((username == $.i18n.prop('index_190') || username == "") || userpass2 == "") {
				if( userpass2 == "" ){
					if( (username == $.i18n.prop('index_190') || username == "") ){
						$("#loginerr").text($.i18n.prop('index_175'));
					}
					else{
						$("#loginerr").text($.i18n.prop('index_174'));
					}
				}
				else{
					$("#loginerr").text($.i18n.prop('index_173'));
				}
			} 
			else {
				showdiv('.loadingbg', 3);
				vidonme.rpc.request({
					'context': this,
					'method': 'VidOnMe.LoginAuth',
					'params': {
						"username": username,
						"password": userpass,
						"country": cn == true ? "cn" : "oversea"
					},
					'success': function(data) {
						close_box(".loadingbg", 3);

						if (data.result.ret) {
							//$("#login_title").text($.i18n.prop('index_50'));
							g_loginControl.ShowUserInfo(data);
							g_loginControl.getAnonymityStatus();
							g_loginControl.userInfo.username = data.result.username;
							g_loginControl.userInfo.email = data.result.email;
							g_loginControl.userInfo.avatar = data.result.avatar;
						} else {
							$("#loginerr").text($.i18n.prop('index_35'));
						}
					}
				});
			}
		});

		$("#logoutbtn").click(function() {
			g_commonPopDialog.showCommonTips($.i18n.prop('index_247'), "");

			$("#btnCommonTipsOk").die("click");
			$("#btnCommonTipsOk").live("click", function() {
				g_loginControl.LogoutAuthUser();
				close_box('.showCommonTips', 5);
			});

		});

		$("#isAnonymousLogon .checkbox").click(function(){
			if($(this).hasClass("selected")){ 
				$(".isAnonymousLogonDes").text(g_loginControl.loginStaticDatas.loginStr_ok_8);
				g_loginControl.setAnonymityStatus( false );
			}
			else{ 
				$(".isAnonymousLogonDes").text(g_loginControl.loginStaticDatas.loginStr_ok_7);	
				g_loginControl.setAnonymityStatus( true );
			}
		});
    },
   	ShowUserInfo:function(data) {
		$("#login").hide();
		$("#login_ok").show();
		$(".poplogin").css("width","800px");
		if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
			$(".poplogin").css("top", ($(window).height() - $(".poplogin").height()) / 2 + $(window).scrollTop() + "px");
		} else {
			$(".poplogin").css("top", ($(window).height() - $(".poplogin").height()) / 2 + $(window).scrollTop() + "px");
		}
		$(".poplogin").css("left", ($(window).width() - $(".poplogin").width()) / 2 + "px");

		var img = data.result.avatar;

		if (img == "") {
			$("#accout_img").attr("src", "../images/DefaultUserImg.png");
		} else {
			$("#accout_img").attr("src", img);

			//fresh right top login button image.
			var urlImage = 'url(' + img + ')';
			$(".headerMenu .login").addClass("loginUserimg");
			$(".headerMenu .loginUserimg span").css("background-image", urlImage );
		}
		
		$("#email").text(data.result.email);

		if (data.result.subscribed) {
			$("#expiration").text( data.result.expiredate );
			$("#accout").html(data.result.username);
			$("#headerlogin b").text(data.result.username);
		} else {
			$("#accout").text(data.result.username);
			$("#headerlogin b").text(data.result.username);
		}
	},  
	ShowLogin:function() {
		$("#login").show();
		$("#login_ok").hide();
		$(".poplogin").css("width","600px");
		if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
			$(".poplogin").css("top", ($(window).height() - $(".poplogin").height()) / 2 + $(window).scrollTop() + "px");
		} else {
			$(".poplogin").css("top", ($(window).height() - $(".poplogin").height()) / 2 + $(window).scrollTop() + "px");
		}
		$(".poplogin").css("left", ($(window).width() - $(".poplogin").width()) / 2 + "px");
		$("#password").val("");
	},
	CheckAuthUserInfo:function() {
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetAuthUserInfo',
			'params': {},
			'success': function(data) {
				showdiv(".poplogin", 1);

				if (data && data.result.ret) {
					//$("#login_title").text("User Information");
					g_loginControl.ShowUserInfo(data);
					g_loginControl.getAnonymityStatus();
				} else {
					//$("#login_title").text($.i18n.prop('index_50'));
					if ( g_languageType == "zh-cn" ) {
						$("#selectNationality").addClass("selected");
					}
					else{
						$("#selectNationality").removeClass("selected");
					}
					g_loginControl.ShowLogin();
				}
			}
		});
	},
	LogoutAuthUser:function() {
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.LogoutAuth',
			'params': {},
			'success': function(data) {
				if (data && data.result.ret) {
					//$("#login_title").text("User Login");
					g_loginControl.ShowLogin();
					$(".headerMenu .login").removeClass("loginUserimg");
					$(".headerMenu .login").removeAttr("style");
					$(".headerMenu .login span").removeAttr("style");
					$("#headerlogin b").text("welcome");
					g_loginControl.userInfo.username="";
					g_loginControl.userInfoemail="";
					g_loginControl.userInfoavatar="";

				}
			}
		});
	},
 	CheckUserImage:function() {
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetAuthUserInfo',
			'params': {},
			'success': function(data) {
				if (data && data.result.ret) {
					var img = data.result.avatar;
					var uasername=data.result.username;
					$("#headerlogin b").text(data.result.username);
					if (img != "") {
						var urlImage = 'url(' + img + ')';
						$(".headerMenu .login").addClass("loginUserimg");
						$(".headerMenu .loginUserimg span").css("background-image", urlImage );
					}

					g_loginControl.userInfo.username = data.result.username;
					g_loginControl.userInfo.email = data.result.email;
					g_loginControl.userInfo.avatar = data.result.avatar;
				} else {
					$(".headerMenu .login").removeClass("loginUserimg");
					$(".headerMenu .login span").css("background-image", "../images/spriteimg/iconimg_2.png" );
				}
			}
		});
	},

	getAnonymityStatus: function() {
		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.GetAnonymityStatus',
			'params': {},
			'success': function(data) {
				if (data && data.result.ret) {
					$("#isAnonymousLogon span").addClass( "selected" );
					$(".isAnonymousLogonDes").text(g_loginControl.loginStaticDatas.loginStr_ok_7);
				} else {
					$("#isAnonymousLogon span").removeClass( "selected" );
					$(".isAnonymousLogonDes").text(g_loginControl.loginStaticDatas.loginStr_ok_8);
				}
			}
		});
	},

	setAnonymityStatus: function(bAllow) {
		var params = {
			'isallow': bAllow
		};

		vidonme.rpc.request({
			'context': this,
			'method': 'VidOnMe.SetAnonymityStatus',
			'params': params,
			'success': function(data) {
				if (data && data.result.ret) {
					
				}
			}
		});
	}
}