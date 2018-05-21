var g_scrollBarControl;

var ScrollBarControl = function() {
	g_scrollBarControl = this;
	g_scrollBarControl.init();
	g_scrollBarControl.initMoviePage();
	g_scrollBarControl.initMovieNoloadPage();
}; 

ScrollBarControl.prototype = {
	curScrollPos: -1,
	firstIndex: -1,
	freshTimer: null,
	isScrolling: false,
	mediaDatas: [],

	init: function() {
		$(window).resize(function() {
			g_scrollBarControl.freshMoviePage();
		});
	},

	initMoviePage: function() {
		$(".scrollbar_movie").mCustomScrollbar({
			autoHideScrollbar: true,
			scrollButtons: {
				enable: true
			},
			theme: "light-3",
			mouseWheelPixels: 200,
			callbacks: {
				onOverflowYNone: function() {
					console.log("Scrollbars updated");
					g_scrollBarControl.freshMoviePage();
				},

				onScrollStart: function() {
					//g_scrollBarControl.startFreshTimer();
				},

				onScroll: function() {
					//g_scrollBarControl.stopFreshTimer();
				},

				whileScrolling: function() {
					g_scrollBarControl.freshMoviePage();
					/*
					var curScrollPos = g_scrollBarControl.curScrollPos;

					if (curScrollPos == -1) {
						g_scrollBarControl.curScrollPos = this.mcs.top;
					} else {
						if (Math.abs(curScrollPos - this.mcs.top) > 240) {
							g_scrollBarControl.curScrollPos = this.mcs.top;
							g_scrollBarControl.freshMoviePage();
						};*/
						if(this.mcs.top!= 0){
							$(".backtotop").fadeIn();
						}
						else{
							$(".backtotop").fadeOut();
						}
					//}
					
				},

				whileScrollingInterval: 500
			},
			onTotalScrollOffset: 50
		});
	},
	initMovieNoloadPage: function() {
		$(".scrollbar_movie_noload").mCustomScrollbar({
			autoHideScrollbar: true,
			scrollButtons: {
				enable: true
			},
			theme: "light-3",
			mouseWheelPixels: 200,
			callbacks: {

				whileScrolling: function() {
						if(this.mcs.top!= 0){
							$(".backtotop").fadeIn();
						}
						else{
							$(".backtotop").fadeOut();
						}
					//}
					
				},

				whileScrollingInterval: 500
			},
			onTotalScrollOffset: 50
		});
	},


	startFreshTimer: function() {
		/*
		if ( this.freshTimer ) {
			this.isScrolling = true;
			return;
		}

		this.freshTimer = setInterval( function(){
			g_scrollBarControl.freshMoviePage();
		}, 100 );
		*/
	},

	stopFreshTimer: function() {
		this.isScrolling = false;
		g_scrollBarControl.freshMoviePage();
	},

	freshMoviePage: function() {
		var curDiv = $(".scrollbar_movie");
		var minY = curDiv.offset().top - 240 - 100;
		var maxY = curDiv.offset().top + curDiv.height() + 100;

		var tempStartPos = -1;
		var tempEndPos = -1;
		$(".scrollbar_movie .lazyload_item").each(function() {
			var offset = $(".lazyload_img", this).offset();

			if (offset.top > minY && offset.top < maxY) {
				var picPath = $(".lazyload_img", this).attr("tempPath");
				if (picPath) {
					picPath = 'url(' + picPath + ')';
					$(".lazyload_img", this).css("background-image", picPath);
				} else {
					var itemIndex = $(this).index();

					if (tempStartPos == -1) {
						tempStartPos = itemIndex;
					}

					tempEndPos = itemIndex;
				}
			} else {
				$(".lazyload_img", this).css("background-image", '');
			}
		});

		if ( tempStartPos != -1 && tempEndPos != -1 ) {
			g_siderBar.scrollbarCallback( tempStartPos, tempEndPos );

			/*
			var libraryIndex = g_siderBar.curSelectLibIndex;
			g_mediaLibary.getMovieDatas(libraryIndex, 0, tempFirstPos, tempFirstPos+30, function(index) {
				g_movieControl.movieDatas = g_mediaLibary.libraryDatas[libraryIndex].movieDatas;

				for (var i = tempFirstPos; i < tempFirstPos+30; i++) {
					g_movieControl.freshDataByIndex(i);
				};	
			});
			*/
		}

		if ( !this.isScrolling ) {
			clearInterval( this.freshTimer );
			this.freshTimer = null;
		}
	}
}