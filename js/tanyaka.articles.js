/** 
 * $Id$
 */
/**
 * jQuery articles functionality Plugin
 * 
 *
 * @project         tanyaka.net
 * @copyright       tanyaka
 * @package         javascript
 */
(function($){

	var methods = {

		/**
		 * Fanta Banner
		 * swfobject.embedSWF
		 * @return {jQuery} this
		 */
		fanta_banner: function(options) {
			return this.each(function() {
				var flashvars = {},
					params = {wmode:"transparent"},
					attributes = {};
		
				swfobject.embedSWF("swf/fantarize_banner.swf", "fanta_banner", "728", "400", "9.0.0", "swf/expressInstall.swf", flashvars, params, attributes);
			});
		}, // fanta_banner
		
		cartoon: function(options) {
			return this.each(function() {
				swfobject.embedSWF("swf/light.swf", "cartoon", "600", "300", "9.0.0", "swf/expressInstall.swf");
			});
		}, // cartoon
		
		miralab: function(options) {
			return this.each(function() {
				swfobject.embedSWF("swf/mira.swf", "miralab", "368", "62", "9.0.0", "swf/expressInstall.swf");
			});
		}, // miralab

		
		videoUpdate: function(videoName, videoW, videoH) {
			return this.each(function() {
				var player = document.getElementById('video'), 
					margingTop;
				player.pause();
				
				$('video source').filter(function (index) {return $(this).attr("type") == "video/mp4";}).attr('src', '../version2/videos/'+videoName+'.mp4');//tanyaka.net_ver2
				$('video source').filter(function (index) {return $(this).attr("type") == "video/ogg";}).attr('src', '../version2/videos/'+videoName+'.ogg');
				$('#video_holder').width(videoW+40);
				$('#video_holder').height(videoH);
				margingTop =  Math.round(($(window).height()-videoH - parseInt($('#video_holder').css('padding-top').replace("px", "")) - parseInt($('#video_holder').css('padding-bottom').replace("px", "")))/2);
				$('#video_holder').css('margin-top',margingTop+'px');

				player.load();
			    player.play();
				
				$(this).bind("click", function(event) {
					event.preventDefault();
					var data = $("aside nav").navigation('getData');
					$("#video_conatiner").fadeIn(data.testDuration, data.easeType);
				});

			});
		} // videoUpdate
		
		
		
	};

	$.fn.articles = function(method){
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( '[jQuery.articles] Method: ' +  method + ' is unknown');
		}	 
	};

}(jQuery));
