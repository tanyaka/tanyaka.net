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
				var $this = $(this),
					flashvars = {},
					params = {wmode:"transparent"},
					attributes = {};
		
				swfobject.embedSWF("swf/fantarize_banner.swf", "fanta_banner", "728", "400", "9.0.0", "swf/expressInstall.swf", flashvars, params, attributes);
			});
		}, // fanta_banner
		
		cartoon: function(options) {
			return this.each(function() {
				var $this = $(this);
				swfobject.embedSWF("swf/light.swf", "cartoon", "600", "300", "9.0.0", "swf/expressInstall.swf");
			});
		}, // cartoon
		
		miralab: function(options) {
			return this.each(function() {
				var $this = $(this);
				swfobject.embedSWF("swf/mira.swf", "miralab", "368", "62", "9.0.0", "swf/expressInstall.swf");
			});
		}, // miralab
		
		
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
