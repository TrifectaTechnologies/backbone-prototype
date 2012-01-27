/* http://adactio.com/journal/4470/ */
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
  var viewportmeta = document.querySelector('meta[name="viewport"]');
  if (viewportmeta) {
    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
    document.body.addEventListener('gesturestart', function() {
      viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
    }, false);
  }
}

/* Author: Eric DeLabar */

// Main IIFE (inline immediately-executing function -- used to control jQuery/$ scope predictably)
(function($,undefined){
	
	// onDOMReady
	$(function(){
		
		var movieApp = new MovieAppRouter({append_at: $('#main')});
		window.app = movieApp;
		Backbone.history.start();

	});
	
})(jQuery);