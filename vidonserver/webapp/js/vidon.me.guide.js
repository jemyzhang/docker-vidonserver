var g_CurLibId = 0;
var g_CurLibraryType = "";

//=================PageInterface============================
function cbSetLibraryID(data, mediatype) {
	if (data && data.result && data.result.libraries && (data.result.libraries.length > 0)) {
		$.each($(data.result.libraries), jQuery.proxy(function(i, item) {
				//alert("i=" + i + ",libID=" + item.LibraryId + ",type=" + item.type + ",name=" + item.name);
				if ( item.type == mediatype && item.IsCustomLib == false ) {
					g_CurLibId = item.LibraryId;
					return;
				}
			},
			this));
	}
}

function cbIsNeedWizard(data, page) {
	if (page != "guide.html") {
		return;
	}

	if (!checkResponse(data)) return;

	//alert("isNeedWizard=" + data.result.ret);
	/*
		if(data.result.ret != "true"){
				location.assign("index.html");
				window.location	="index.html";
				location.href		="index.html";
		}*/
}

//Wizard页面增加路径
function commitAddOneLibPath_guide() {
	var mediapath = $("#addSrcPath").val();
	if (!mediapath) return;
	close_box('.addPath', 3);
	$("#selectedPath").val(mediapath);
	$("#btnWzdOK").removeClass("btn-disable").addClass("btn-blue");
}

//===============ServerInterface============================
function isNeedWizard() {
	var s = vidonme.rpc.request({
		'context': this,
		'method': 'VidOnMe.IsWizzardEnsabled',
		'params': {},
		'success': function(data) {
			//alert("isNeedWizard=" + data.result.ret);
			//								if(data.result.ret != "true"){
			//										location.assign("index.html");
			//										window.location="index.html";
			//										location.href="index.html";
			//								};
		}
	});
}

function wizardsetting() {
	var libID = g_CurLibId;
	var mediapath = $('#selectedPath').val();
	//alert("libID=" + libID + ",path=" + mediapath);

	if (!libID || !mediapath) {
		//alert("libID or Path is neccessary!");
		return;
	}

	vidonme.rpc.request({
		'context': this,
		'method': 'VidOnMe.AddPathToLibrary',
		'params': {
			"LibraryId": libID,
			"path": mediapath
		},
		'success': function(data) {
			if (data.result.ret == false) {
				showMainPage();
				//var errmsg = $.i18n.prop('index_187');
				//PopupAlert(errmsg);
				return;
			}

			vidonme.rpc.request({
				'context': this,
				'method': 'VidOnMe.StartScan',
				'params': {
					'LibraryId': libID
				},
				'success': function(data) {
				}
			});

			showMainPage();
		}
	});
}

function showMainPage() {
	vidonme.rpc.request({
		'context': this,
		'method': 'VidOnMe.SetWizzardDisabled',
		'params': {},
		'success': function(data) {
			//alert("SetWizzardDisabled:" + data.result.ret);
			location.assign("index.html?" + AppVersion);
			window.location = "index.html?" + AppVersion;
			location.href = "index.html?" + AppVersion;
		}
	});
}
function loadPage() {
	//RequestIsNeedWizard("guide.html");
}

function FinishWizard() {
	wizardsetting();
}

$(function() {

	var slideWidth = $(".slide").width();

	$("#commVideo").click(function() {
		g_CurLibraryType = "commercial";
		RequestGetLibraries("commercial");
	})

	$("#perMedia").click(function() {
		g_CurLibraryType = "personal";
		RequestGetLibraries("personal");
	})

	$(".setUp2btn").live("click",function() {
		$(".slides").animate({
			left: -slideWidth
		}, 500);
		$(".guideMenu li").eq(2).addClass("selected").siblings().removeClass("selected");
	});

	$(".setUp3btn").click(function() {
		if (!g_CurLibId) {
			return;
		}
		var title = "";
		if (g_CurLibraryType == "commercial") {
			title = $.i18n.prop('index_13');
			$("#WzdAddPathTitle").text(title);		
		} else {
			title = $.i18n.prop('index_14');
			$("#WzdAddPathTitle").text(title);			
		}
		$("#selectedPath").val("");
		
		$(".slides").animate({
			left: -2 * slideWidth
		}, 500,function(){
			$("#selectedPath").focus();
		});
		
		$(".guideMenu li").eq(4).addClass("selected").siblings().removeClass("selected");
	})

	$("#btnWzdOK").click(function() {
		FinishWizard();
	})

	$("#selectedMedia a").click(function() {
		$(this).addClass("selected").siblings().removeClass("selected");
	});

	$(".addPathbtn").click(function() {	
		g_pathBrowser.initBrowser(g_CurLibId,commitAddOneLibPath_guide);
	});
	
	$("#selectedPath").bind("propertychange input",function(){
			var path = $("#selectedPath").val();
			if (!path){
					$("#btnWzdOK").addClass("btn-disable").removeClass("btn-blue");
			}else{	
					$("#btnWzdOK").removeClass("btn-disable").addClass("btn-blue");
			}
	})

	loadPage();
})