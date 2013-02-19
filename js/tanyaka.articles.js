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
				
				var windowH = $(window).height(),
					windowW= $(window).width(),
					newW = 0, newH =0,
					paddingTop;
					
				if(videoW > windowW - 25) {
					newW = windowW - 25;
					newH = Math.round(videoH / videoW * newW);
					if(newH > windowH) {
						newH = windowH;
						newW = Math.round(videoW / videoH * newH);
					}
				}
				
				if(videoH > windowH) {
					newH = windowH;
					newW = Math.round(videoW / videoH * newH);
					if(newW > windowW - 25) {
						newW = windowW - 25;
						newH = Math.round(videoH / videoW * newW);
					}
				}
				
				videoW = newW > 0 ? newW : videoW;
				videoH = newH > 0 ? newH : videoH;
				
				
				paddingTop = Math.round(0.5*(windowH-videoH));
				
				$('#video_conatiner_inner').width(videoW+25);
				$('#video_conatiner_inner').css('padding-top', paddingTop+'px');
				
				var v = document.createElement("video"); // Are we dealing with a browser that supports <video>?
			    if ( !v.play ) {

					$('v').detach();
					var flashvars = {
						video_name: "../videos/"+videoName+".f4v", 
						video_width: videoW, 
						video_height: videoH
					};
					swfobject.embedSWF("swf/video_test.swf", "flash_video", videoW, videoH, "9.0.0", "swf/expressInstall.swf", flashvars);
					return;
				}
				
				
				$('video').detach();
			
				$('<video width="'+videoW+'" height="'+videoH+'" class="right" controls="true" preload="false">'+
					'<source src="videos/'+videoName+'.mp4" type="video/mp4">'+
		            '<source src="videos/'+videoName+'.ogg" type="video/ogg">'+
        		    'Your browser does not support the video tag.</video>').appendTo('#video_conatiner_inner');
			
				$('video').load();
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
