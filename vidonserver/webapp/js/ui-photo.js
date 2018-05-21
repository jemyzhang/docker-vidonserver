var g_photoControl;

var PhotoControl = function() {
	g_photoControl = this;
}; 

PhotoControl.prototype = {
    multilang: {},
    init: function(domPosition) {
        this.divPosition = $("#pl");
        this.switchLanguage();
        g_objsSwitchLanguage.push( this );
    },

    switchLanguage: function() {
        this.multilang = {
            index64: $.i18n.prop('index_64'),
            index_65: $.i18n.prop('index_65'),
            index_69: $.i18n.prop('index_69'),
            index_217: $.i18n.prop('index_217'),
            index_177: $.i18n.prop('index_177'),
            index_70: $.i18n.prop('index_70'),
            photo_link_1: $.i18n.prop('index_177'),
            photo_link_2: $.i18n.prop('index_217')
        }
    },
   
    siderClickEvent: function() {
        g_commonPopDialog.hideBottomTip();
        
        $(".content_layer0").css("display", "none");
        $(".content_layer1").css("display", "block");
        $(".content_layer2").css("display", "none");
        $(".content_layer3").css("display", "none");
        $(".content_layer4").css("display", "none");
        $(".content_layer5").css("display", "none");
        $("#editlibrary").empty();
        this.divPosition.setTemplateURL("../template/photo.tpl?" + AppVersion);
        this.divPosition.setParam('multilang', this.multilang);
        this.divPosition.processTemplate();
    },
    updatePage: function() {
        this.switchLanguage();
        $("#pl").setParam( "multilang", this.multilang );
        $("#pl").processTemplate(this.channelDatas);
    }
}