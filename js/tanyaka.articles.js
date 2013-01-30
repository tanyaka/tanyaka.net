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
				/*var player = document.getElementById('video'), 
					margingTop;
				//player.pause();
				
				//$('video source').filter(function (index) {return $(this).attr("type") == "video/mp4";}).attr('src', '../version2/videos/'+videoName+'.mp4');
				//$('video source').filter(function (index) {return $(this).attr("type") == "video/ogg";}).attr('src', '../version2/videos/'+videoName+'.ogg');
				
				player.innerHTML = '';
				player.innerHTML = '<source src="../version2/videos/"+videoName+".mp4" type="video.mp4">';
				player.innerHTML += '<source src="../version2/videos/"+videoName+".ogg" type="video/webm">';
				player.load();
				
				
				$('#video_holder').width(videoW+40);
				$('#video_holder').height(videoH);
				
				$(player).width(videoW);
				$(player).height(videoH);
				
				//margingTop =  Math.round(($(window).height()-videoH - parseInt($('#video_holder').css('padding-top').replace("px", "")) - parseInt($('#video_holder').css('padding-bottom').replace("px", "")))/2);
				//$('#video_holder').css('margin-top',margingTop+'px');

				player.load();
			    //player.play();*/
				
				//tanyaka.net_ver2 version2
				$(this).bind("click", function(event) {
					event.preventDefault();
				
					
					var video = $('<video id="video" width="'+videoW+'" height="'+videoH+'" preload controls autoplay">'+
						'<source src="../tanyaka.net_ver2/videos/'+videoName+'.mp4" type="video/mp4">'+
						'<source src="../tanyaka.net_ver2/videos/'+videoName+'.ogg" type="video/ogg">'+
						'Your browser does not support the video tag.'+
					'</video>');
	
					$(video).appendTo($('#video_holder'));
					
					var data = $("aside nav").navigation('getData');
//					if (window.console) console.log("video ", $("#video_conatiner video"), $("#video_conatiner video").length);
					$("#video_conatiner_outer").fadeIn(data.testDuration, data.easeType);
				});
				
				$('#close_btn').bind("click", function(event) {
					$('#video').remove();
					$('#video_conatiner_outer').fadeOut(0);
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
