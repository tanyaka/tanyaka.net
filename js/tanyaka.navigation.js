/** 
 * $Id$
 */
/**
 * jQuery  main-navigation Plugin
 * 
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
			return this.each(function() {
				var $this = $(this),

				init_data = {
					articleLinks: 0,
					currentArticle: null,
					previousArticle: null,
					animationOnn: false,
					testDuration: 300,
					easeType: 'easeOutCubic'
				};
				
				if(!$this.data("navigation")) $this.data("navigation", init_data);
				
				var json_path = "js/content.json",
					data = $this.data("navigation");
				
				$.getJSON(json_path, function(json) {
					var navis = [], articles = [];
					$.each(json, function(key, val) {
						navis.push('<li><a href="'+val.navi+'" class="a'+key+'">' + val.navi_icon_hex +' '+ val.navi + '</a></li>');
						articles.push('<article id="a_' + key + '"><header>'+val.heading+'</header>' + val.description + '</article>');
						data.articleLinks++;
					});
					$('#main_nav').html('');
					
					$('<ul/>', {html: navis.join('')}).appendTo('#main_nav');
					$(articles).appendTo('#main');
					
					// bind click to collection browser links
					$("#main_nav a").bind("click", function(event) {
						event.preventDefault();
						var temp = $("#main_nav li").index($(this).parent("li"));
						
						if (temp != data.currentArticle  && !data.animationOnn) {
							data.currentArticle = temp;
							$this.navigation('showArticle', data.currentArticle);
						}
					});
				})
				.error(function() { 
					$('<error>load json error</error>').appendTo('#main_nav');
				});
			});
		}, // init

		/**
		 * Toggle visibility for selected and previous articles
		 * 
		 * @return {jQuery} this
		 */
		showArticle: function() {
			return this.each(function() {
				var $this = $(this),
					data = $this.data("navigation");
				
				data.animationOnn = true;
				
				//hide previous article
				if(data.previousArticle !== null) {
					$("#a_"+data.previousArticle).fadeToggle(data.testDuration,data.easeType);
				}
				
				//show new article
				$("#a_"+data.currentArticle).fadeToggle(data.testDuration,data.easeType,
					function() {
						data.previousArticle = data.currentArticle;
						data.animationOnn = false;
						
					}
				);

				//embed flash
				if($("#fanta_banner").filter(":visible").length !== 0 && $("#fanta_banner").parent().index() == data.currentArticle) {
					$("#fanta_banner").articles('fanta_banner');
				}

				if($("#cartoon").filter(":visible").length !== 0 && $("#cartoon").parent().index() == data.currentArticle) {
					$("#cartoon").articles('cartoon');
				}
				
				if($("#miralab").filter(":visible").length !== 0 && $("#miralab").parent().parent().index() == data.currentArticle) {
					$("#miralab").articles('miralab');
				}
				
				//change video source
				if($("#csol_video").filter(":visible").length !== 0 && $("#csol_video").parent().index() == data.currentArticle) {
					$("#csol_video").articles('videoUpdate', 'CokeSideOfLife', 1008, 576);
					
				}
				
				if($("#faithless_video").filter(":visible").length !== 0 && $("#faithless_video").parent().index() == data.currentArticle) {
					$("#faithless_video").articles('videoUpdate', 'Coke+Faithless', 976, 592);
				}
				
				if($("#facebook_video").filter(":visible").length !== 0 && $("#facebook_video").parent().index() == data.currentArticle) {
					$("#facebook_video").articles('videoUpdate', 'facebook', 672, 640);
				}
				
				if($("#fantarize_video").filter(":visible").length !== 0 && $("#fantarize_video").parent().parent().index() == data.currentArticle) {
					$("#fantarize_video").articles('videoUpdate', 'fantarize', 896, 448);
				}
				
				if($("#gateway_video").filter(":visible").length !== 0 && $("#gateway_video").parent().index() == data.currentArticle) {
					$("#gateway_video").articles('videoUpdate', 'CokeGateway', 1120, 592);
				}
				
				
			});
		},// showArticle
		
		/**
		 * Toggle visibility for selected and previous articles
		 * 
		 * @return {jQuery} this
		 */
		getData: function() {
			var $this = $(this),
				data = $this.data("navigation");
			return data;
		}// getData
		
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

	$.fn.fadeToggle = function(speed, easing, callback) {
		return this.animate({opacity: 'toggle'}, speed, easing, callback);
	};

}(jQuery));
