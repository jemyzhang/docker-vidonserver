/*
 *      Copyright (C) 2012-2013 VidOn.me
 *      http://www.vidon.me
 *
 */
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

(function(window) {
    "use strict";

    var browser = getBrowserInfo();
    var verinfo = (browser + "").replace(/[^0-9.]/ig, "");
    var vidonme = window.vidonme || {};
    var bsrname = browser + "";

    vidonme.core = {
        'DEFAULT_ALBUM_COVER': 'images/DefaultAlbumCover.png',
        'DEFAULT_VIDEO_COVER': 'images/DefaultVideo.png',
        'JSON_RPC': '/jsonrpc',
        'applyDeviceFixes': function() {
            if (bsrname.match("msie")) {
                if (verinfo == "6.0" || verinfo == "7.0" || verinfo == "8.0") {
                    window.document.attachEvent('touchmove', function(e) {
                        e.preventDefault();
                    });
                }
            } else {
                window.document.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                });
            }
        },
        'displayCommunicationError': function(m) {
            window.clearTimeout(vidonme.core.commsErrorTiemout);
            var message = m || 'Connection to server lost';
            $('#commsErrorPanel').html(message).show();
            vidonme.core.commsErrorTiemout = window.setTimeout('vidonme.core.hideCommunicationError()', 5000);
        },
        'durationToString': function(duration) {
            var total_seconds = duration || 0,
                seconds = total_seconds % 60,
                minutes = Math.floor(total_seconds / 60) % 60,
                hours = Math.floor(total_seconds / 3600),
                result = ((hours > 0 && ((hours < 10 ? '0' : '') + hours + ':')) || '');
            result += (minutes < 10 ? '0' : '') + minutes + ':';
            result += (seconds < 10 ? '0' : '') + seconds;
            return result;
        },
        'getCookie': function(name) {
            var i,
                match,
                haystack = window.document.cookie.split(';');
            for (i = 0; i < haystack.length; i += 1) {
                match = haystack[i].match(/^\s*[\S\s]*=([\s\S]*)\s*$/);
                if (match && match.length === 2) {
                    return match[1];
                }
            }
            return null;
        },
        'hideCommunicationError': function() {
            $('#commsErrorPanel').hide();
        },
        'setCookie': function(name, value, days) {
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
        },
        'timeToDuration': function(time) {
            var duration;
            time = time || {};
            duration = ((time.hours || 0) * 3600);
            duration += ((time.minutes || 0) * 60);
            duration += (time.seconds || 0);
            return duration;
        }
    };

    window.vidonme = vidonme;
}(window));