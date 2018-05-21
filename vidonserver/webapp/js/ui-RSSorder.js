var g_rssControl;

var  RssControl = function() {
	g_rssControl = this;
}; 
 
 RssControl.prototype = {
    multilang: {},
    init: function(domPosition) {
        this.divPosition = $("#pl");
        this.switchLanguage();
        g_objsSwitchLanguage.push( this );
    },

    switchLanguage: function() {
        this.multilang = {
            index_64: $.i18n.prop('index_64'),
            index_65: $.i18n.prop('index_65')
        }
    },
   
    siderClickEvent: function() {
        g_commonPopDialog.hideBottomTip();
        
        $(".content_layer0").css("display", "none");
        $(".content_layer1").css("display", "none");
        $(".content_layer2").css("display", "none");
        $(".content_layer3").css("display", "none");
        $(".content_layer4").css("display", "none");
        $(".content_layer5").css("display", "none");
        $(".content_layer6").css("display", "none");
        $(".content_layer7").css("display", "none");
        $(".content_layer8").css("display", "block");
        $("#editlibrary").empty();
        this.divPosition.setTemplateURL("../template/rssorder.tpl?" + AppVersion);
        this.divPosition.setParam('multilang', this.multilang);
        this.divPosition.processTemplate();
    },
    updatePage: function() {
        this.switchLanguage();
        $("#pl").setParam( "multilang", this.multilang );
        $("#pl").processTemplate(this.channelDatas);
    }
}