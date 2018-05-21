		function getBrowserInfo() {
			var agent = navigator.userAgent.toLowerCase();

			var regStr_ie = /msie [\d.]+;/gi;
			var regStr_ff = /firefox\/[\d.]+/gi
			var regStr_chrome = /chrome\/[\d.]+/gi;
			var regStr_saf = /safari\/[\d.]+/gi;
			//IE
			if (agent.indexOf("msie") > 0) {
				return agent.match(regStr_ie);
			}

			//firefox
			if (agent.indexOf("firefox") > 0) {
				return agent.match(regStr_ff);
			}

			//Chrome
			if (agent.indexOf("chrome") > 0) {
				return agent.match(regStr_chrome);
			}

			//Safari
			if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
				return agent.match(regStr_saf);
			}

			return ["unknown"];
		}

		function checkip(ip) {
			var regexp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
			if (ip.match(regexp)) {
				return true;
			}
			return false;
		}


		function checkResponse(data) {

			var err = "";
			var langua = $.i18n.prop('index_34');//未知错误

			if (typeof(data) == "undefined") {
				PopupAlert(langua);
				console.log("data null");
				return false;
			}

			if (typeof(data.error) != "undefined") {
				PopupAlert(langua);
				console.log("data error come");
				return false;
			}

			if(typeof(data.result) == "undefined" || typeof(data.result.ret) == "undefined"){
				PopupAlert(langua);
				console.log("data.result or data.result.ret null");
				return false;
			}

			if(data.result.ret){
				return true;
			}

			if (typeof(data.result.err_msg) == "undefined" && typeof(data.result.err) == "undefined") {
				PopupAlert(langua);
				console.log("data.result.err or data.result.err_msg null");
				return false;
			}

			if(typeof(data.result.err_msg) != "undefined"){
				err = data.result.err_msg;
			}else{
				err = data.result.err;
			}

			PopupAlert(err);
			return false;
		}


		function showErrMsg(page,errno,err){
			var langua = "";

			if(page == "librarypath") {
				if (errno == 0) {
					return true;
				}
				else if (errno == 1) {
					langua = $.i18n.prop('index_34');//未知错误
				}
				else if (errno == 2) {
					langua = $.i18n.prop('index_188');//AccessDeny
					return;
				}
				else if (errno == 3) {
					langua = $.i18n.prop('index_35'); //"登录失败,请检查您的用户名和密码是否正确
				}
				else if (errno == 4) {
					langua = $.i18n.prop('index_187');//网络路径不存在
				}
				/*
				else if (errno == 6) {
					langua = 'Multi connects by different username'; // TODO: localization
				}
				*/
				else if (errno == 101) {
					langua = $.i18n.prop('index_34');//langua = "媒体库不存在";
				}
				else if (errno == 102) {
					langua = $.i18n.prop('index_230');//管理路径已经添加
				}
				else if (errno == 103) {
					langua = $.i18n.prop('index_34'); //langua = "数据库执行失败";
				}
				else if (errno == 201) {
					langua = $.i18n.prop('index_231');//目录不存在
				}
				else if (errno == 202) {
					langua = $.i18n.prop('index_232');//文件不存在
				}
				else {
					langua = err;
					console.log("err=" + err);
				}

				PopupAlert(langua);
			}
		}


		function checkResponseWithErrNo(data,page) {

			var err = "";
			var langua = $.i18n.prop('index_34');//未知错误
			var errno = 0;

			if (typeof(data) == "undefined") {
				PopupAlert(langua);
				console.log("data null");
				return -1;
			}

			if (typeof(data.error) != "undefined") {
				PopupAlert(langua);
				console.log("data error come");
				return -1;
			}

			if(typeof(data.result) == "undefined" || typeof(data.result.ret) == "undefined"){
				PopupAlert(langua);
				console.log("data null");
				return -1;
			}

			if(data.result.ret){
				return 0;
			}

			if(typeof(data.result.err_code) == "undefined"){
				PopupAlert(langua);
				console.log("data.result.err_code null");
				return -1;
			}

			var errno = data.result.err_code;

			if(typeof(data.result.err_msg) != "undefined"){
				err = data.result.err_msg;
			}else{
				err = data.result.err;
			}

			showErrMsg(page,errno,err);

			return errno;
		}
		

		function getdrivetypename(drivetype) {
			var drivetypename = "";
			switch (drivetype) {
				case 1:
					drivetypename = $.i18n.prop('index_21');
					break;
				case 4:
					drivetypename = $.i18n.prop('index_182');
					break;
				case 6:
					drivetypename = $.i18n.prop('index_180');
					break;
				default:
					drivetypename = "other";
			}

			return drivetypename;
		}

		function getParentPath(path) {
			if (path == "") {
				return path;
			}
			var protocol = "";
			var index = path.indexOf("://");

			if (index > 0) {
				protocol = path.substr(0, index + 3);
				path = path.substr(protocol.length, path.length - protocol.length);
			}

			var path_without_slash_atend = removeslashAtEnd(path);

			var has_slash = path_without_slash_atend.lastIndexOf("/");

			var parent = "";
			if (has_slash > 0) {
				parent = protocol + path_without_slash_atend.substr(0, has_slash);
			} else {
				if (index > 0 && path_without_slash_atend != "") {
					parent = protocol; // e.g, smb:// or nfs://
				}
			}

			return parent;
		}


		function handleUrl(url, withproto, withshare) {
			var proto = '',
				name = '',
				localpathnoproto = '',
				pos = 0,
				posslash = 0;

			var index = url.indexOf("://");
			if (index > 0) {
				if (url.substr(0, index + 3) == "smb://") {
					proto = "smb://";
					localpathnoproto = url.substr(proto.length);
					var server_index = localpathnoproto.indexOf("/");
					if(server_index == -1){
						server_index = localpathnoproto.length;
					}
					var server_path = localpathnoproto.substr(0,server_index);

					var varpos = server_path.lastIndexOf("@");
					if (varpos == -1) {
						varpos = server_path.indexOf(";");
					}

					pos = (varpos <= -1 ? 0 : varpos + 1);
				} else if (url.substr(0, index + 3) == "nfs://") {
					proto = "nfs://";

					pos = 0; // nfs is simpler than smb
					localpathnoproto = url.substr(proto.length);
				} else {
					return url;
				}

				posslash = localpathnoproto.indexOf("/", pos);

				if (posslash <= -1 || withshare) {
					name = localpathnoproto.substr(pos);
				} else {
					name = localpathnoproto.substr(pos, posslash - pos);
				}
			} else {
				name = url;
			}

			return withproto ? proto + name : name;
		}

		function removeslashAtEnd(path) {
			var protocol = "";
			var index = path.indexOf("://");

			if (index > 0) {
				protocol = path.substr(0, index + 3);
				path = path.substr(protocol.length, path.length - protocol.length);
			}

			if (path[path.length - 1] == '/' || path[path.length - 1] == '\\') {
				path = path.substr(0, path.length - 1);
			}

			if (index > 0) {
				path = protocol + path;
			}

			return path;
		}