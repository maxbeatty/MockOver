if (!($ = window.jQuery)) {
	var jsCode = document.createElement('script');
	jsCode.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js';
	jsCode.onload=loadUI;
	document.body.appendChild(jsCode);
} else {
	loadUI();
}

function loadUI() {		
	if (!jQuery.ui) {
		var jsUI = document.createElement('script');
		jsUI.setAttribute('src', 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js');
		jsUI.onload=beginJ;
		document.body.appendChild(jsUI);
	} else {
		beginJ();
	}
}

function beginJ() {
	jQuery.noConflict();
	jQuery(document).ready(function($){
		$(function(){
			var body = $('body');
			var lock = '';
			var arrows = '<div id=\'arrowsMaxBeatty\' style=\'position:absolute;top:0;left:0;z-index:1001;\'><span id=\'leftArrowMaxBeatty\'>&larr;</span><span id=\'rightArrowMaxBeatty\'>&rarr;</span><span id=\'topArrowMaxBeatty\'>&uarr;</span><span id=\'bottomArrowMaxBeatty\'>&darr;</span><span id=\'plusMaxBeatty\'>+</span><span id=\'minusMaxBeatty\'>-</span></div>';
			
			body.prepend(arrows);
			var arrowSpans = $('#arrowsMaxBeatty span');
			arrowSpans.css({'display' : 'none', 'font-size' : '5em'});
			
			var imgSrc = prompt('Type (or drag) path to image you would like to overlay', '');
			if(!imgSrc) {return false;};
			
			var current;
			var left = $('#leftArrowMaxBeatty');
			var right = $('#rightArrowMaxBeatty');
			var up = $('#topArrowMaxBeatty');
			var down = $('#bottomArrowMaxBeatty');
			var plus = $('#plusMaxBeatty');
			var minus = $('#minusMaxBeatty');
			
			
			var overlay = '<img src=\'file://' + imgSrc + '\' style=\'position:absolute;top:0;left:0;z-index:1000;opacity:0.2;border:0;outline:1px solid red;\' id=\'dragAble\' />';
			
			body.prepend(overlay);
			var drag = $('#dragAble');
			drag.hover(function(){
				$(this).css('cursor', 'move');
			}).draggable();
			
			body.keydown(function(e) {
				offset = drag.offset();
				switch(e.keyCode) {
					case 37:
						drag.css('left', offset.left-1);
						current = left;
						break;
					case 38:
						drag.css('top', offset.top-1);
						current = up;
						break;
					case 39:
						drag.css('left', offset.left+1);
						current = right;
						break;
					case 40:
						drag.css('top', offset.top+1);
						current = down;
						break;
					case 187:
						opa = parseFloat(drag.css('opacity')) + 0.05;
						drag.css('opacity', opa.toFixed(2));
						current = plus;
						break;
					case 189:
						opa = parseFloat(drag.css('opacity')) - 0.1;
						drag.css('opacity', opa.toFixed(2));
						current = minus;
						break;
					default:
						current = null;
						break;
				}
				
				if (current) {
					current.css('display', 'block');
				}
			}).keyup(function() {
				if (current) {
					current.fadeOut();
				}
			});
		});
	});
}