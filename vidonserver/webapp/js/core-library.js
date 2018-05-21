
var LibraryData = function() {
	this.init();
};

LibraryData.prototype = {
	init: function() {
		this.id = -1;
		this.name = '';
		this.isCustome = false;
		this.isAutoClass = false; // automatic classification

		this.mediaDatas = [];
		this.mediaCount = -1;
		this.mediaCountNew = -1;
		this.mediaDatasFilter = [];

		this.movieDatas = [];
		this.movieCount = -1;
		this.movieCountNew = -1; // if movieCount != movieCountNew ; need update movieDatas
		this.movieDatasFilter = [];

		this.movieSetDatas = [];
		this.curMovieDetail = {};

		this.tvshowDatas = [];
		this.tvshowCount = -1;
		this.tvshowCountNew = -1; // if tvshowCount != tvshowCountNew ; need update tvshowDatas
		this.tvshowDatasFilter = [];

		this.curTVShowDetail = {};
		this.curTVShowSeason = [];

		this.videoDatas = [];
		this.videoCount = -1;
		this.videoCountNew = -1; //// if videoCount != videoCountNew ; need update videoDatas
	}
};