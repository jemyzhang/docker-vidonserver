	var Vidon_MetaInfo = function() {
		this.init();
	}

	Vidon_MetaInfo.prototype = {
		init: function() {
			this.mediaid = 0;
			this.title = "";
			this.path = "";
			this.type = "";
			this.newTitle = "";
			this.activeNetId = 0;
			this.scraperfrom = "";
			this.scrapertype = "";
		},
		setType: function(type) {
			this.scrapertype = type;
		},
		setTitle: function(title) {
			this.newTitle = title;
		},
		SetOriginal: function(mediaid, title, path, type) {
			this.mediaid = mediaid;
			this.title = title;
			this.path = path;
			this.type = type;
		},
		setNetID: function(netid) {
			this.activeNetId = netid;
		},
		setScrapeFrom: function(from) {
			this.scraperfrom = from;
		},
		back: function() {
			this.scraperfrom = "";
			this.activeNetId = 0;
		}
	};

	var g_MetaInfo = {};
