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

var tti = tti || {};
tti.routers = tti.routers || {};
tti.models = tti.models || {};
tti.views = tti.views || {};

// Main IIFE (inline immediately-executing function -- used to control jQuery/$ scope predictably)
(function($,undefined){
	
	// onDOMReady
	$(function(){

		$.getJSON('/restful/fortune', function(response) {
			if ( response.status == 'success') {
				$('#fortune').html( 'Your fortune is: ' + response.fortune );
			} else {
				$('#fortune').html( 'Things do not look good, no fortune was told' );
			}
		});

	})
	
})(jQuery);