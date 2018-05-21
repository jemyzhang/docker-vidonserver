function showdiv() {
	$(".vidoncover").show();
	$(".loadimg").show();
	$(".vidoncover").css('height', $(document).height());
	$("body", "html").css({
		height: "100%",
		width: "100%"
	});
	//$("html").css("overflow", "hidden");
	//$("body").css("overflow", "hidden");
	if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
		$(".loadimg").css("top", ($(window).height() - $(".loadimg").height()) / 2 + $(window).scrollTop() + "px");
	} else {
		$(".loadimg").css("top", ($(window).height() - $(".loadimg").height()) / 2 + $(window).scrollTop() + "px");
	}
	$(".loadimg").css("left", ($(window).width() - $(".loadimg").width()) / 2 + "px");
	$(".loadimg").fadeIn("slow");

	$(window).resize(function() {
		$(".loadimg").css("top", ($(window).height() - $(".loadimg").height()) / 2 + "px");
		$(".loadimg").css("left", ($(window).width() - $(".loadimg").width()) / 2 + "px");
	});
}

function hidediv() {
	$(".vidoncover").hide();
	$(".loadimg").hide();
}

function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null)
		return unescape(arr[2]);

	return null;
	/*
	var i,
		match,
		haystack = window.document.cookie.split(';');
	for (i = 0; i < haystack.length; i += 1) {
		if (  haystack[i].ind) {};
		match = haystack[i].match(/^\s*[\S\s]*=([\s\S]*)\s*$/);
		if (match && match.length === 2) {
			return match[1];
		}
	}
	return null;
	*/
}

function setCookie(name, value, days) {
	var date,
		expires;
	if (name) {
		if (days) {
			date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = '';
		}
		window.document.cookie = name + "=" + value + expires + "; path=/";
	}
}