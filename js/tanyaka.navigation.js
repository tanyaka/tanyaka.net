/** 
 * $Id$
 */
/**
 * jQuery  navigation Plugin
 * 
 * A main-navigation plugin.
 *
 * @project         tanyaka.net
 * @copyright       tanyaka
 * @package         javascript
 */
(function($){

	var methods = {

		/**
		 * Initialize
		 * @return {jQuery} this
		 */
		init: function(options) {
			//return this.each(function() {
				var $this = $(this),

				init_data = {
					articleLinks: 0,
					currentArticle: 0,
					previousArticle: null,
					animationOnn: false
				};
				
				if(!$this.data("navigation")) $this.data("navigation", init_data);
				
				var json_path = "js/content.json",
					data = $this.data("navigation");
				
				$.getJSON(json_path, function(json) {
					var navis = [], articles = [];
					$.each(json, function(key, val) {
						navis.push('<li><a href="'+val.navi+'">' + val.navi + '</a></li>');
						articles.push('<article id="a_' + key + '"><header>'+val.heading+'</header>' + val.description + '</article>');
						data.articleLinks++;
					});
					$('<ul/>', {html: navis.join('')}).appendTo('#main_nav');
					$(articles).appendTo('#main');
					
					// bind click to collection browser links
					$("#main_nav a").bind("click", function(event) {
						event.preventDefault();
						data.currentArticle = $("#main_nav li").index($(this).parent("li"));
						if(data.currentArticle != data.previousArticle && !data.animationOnn) $this.navigation('showArticle');
					});
				})
				.error(function() { 
					$('<error>load json error</error>').appendTo('#main_nav');
				});
			//});
		}, // init

		/**
		 * Load collection page into container.
		 * Add bg image and hotspot links.
		 * Start slideshow.
		 * @return {jQuery} this
		 */
		showArticle: function() {
			//return this.each(function() {
				var $this = $(this),
					data = $this.data("navigation");
				data.animationOnn = true;
				
				if(data.previousArticle !== null) {
					$("#a_"+data.previousArticle).animate( {opacity: 0}, 200, function() { $("#a_"+data.previousArticle).css({'display':'none'}) });
				}

				$("#a_"+data.currentArticle).animate( {opacity: 1}, 
					200, 
					function() { 
						data.previousArticle = data.currentArticle;
						data.animationOnn = false;
					} 
				).css('display', 'block');

				
			//});
		}// showArticle

		
	};

	$.fn.navigation = function(method){
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( '[jQuery.navigation] Method: ' +  method + ' is unknown');
		}	 
	};

}(jQuery));
