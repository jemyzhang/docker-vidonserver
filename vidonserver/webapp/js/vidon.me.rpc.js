(function(window) {

    var vidonme = window.vidonme || {};

    vidonme.rpc = {
        'default_options': {
            'contentType': 'application/json',
            'dataType': 'json',
            'type': 'POST',
            'success': function() {
                $('#spinner').hide();
            }
        },
        'request': function(options) {
            var request_options = jQuery.extend({}, this.default_options, options);
            request_options.url = vidonme.core.JSON_RPC + '?' + options.method;

            var platformOptions = {
            	'headers' : {'platform-type' : 'webapp'}
            };
            request_options = jQuery.extend({}, request_options, platformOptions);

            request_options.data = JSON.stringify({
                'jsonrpc': '2.0',
                'method': options.method,
                'id': 1,
                'params': request_options.params
            });
            return jQuery.ajax(request_options);
        },
        'play': function(options) {
            var request_options = jQuery.extend({}, this.default_options, options);
            request_options.url = 'cmd?' + options.method;

            var platformOptions = {
            	'headers' : {'platform-type' : 'webapp'}
            };
            request_options = jQuery.extend({}, request_options, platformOptions);

            var tempOptions = {
                'jsonrpc': '2.0',
                'method': options.method,
                'id': 1,
                'params': request_options.params
            };

            if ( options.exparams ) {
                tempOptions = jQuery.extend({}, tempOptions, options.exparams);
            };

            request_options.data = JSON.stringify( tempOptions );

            return jQuery.ajax(request_options);
        }
    };

    vidonme.http = {
        'default_options': {
            'contentType': 'application/xml',
            'dataType': 'xml',
            'type': 'POST',
            'success': function() {
                $('#spinner').hide();
            }
        },
        'request': function(options) {
            var request_options = jQuery.extend({}, this.default_options, options);
            //request_options.url = "file/http://localhost:31040/cmd/param?command=GetChannels";//vidonme.core.JSON_RPC ;
            request_options.url = "file/" + encodeURIComponent("http://localhost:31040/cmd/param?command=GetChannels");

            return jQuery.ajax(request_options);
        }
    };


    window.vidonme = vidonme;

}(window));