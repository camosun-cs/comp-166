/**
 * Reposition floating elements above their previous sibling.
 * Allows us to keep them below in source order where they make more sense
 * in reading order, but align the tops nicely when floated
 */
(function() {
	'use strict';

	var magic = 1.5
	var content = 24
	var mediumFontFactor = 1.125
	var largeFontFactor = 1.25

	var breakpoints = [
		// same as 'medium' breakpoint in basic.scss
		{
			at: "(min-width: " + (content * mediumFontFactor * magic) + "em)",
			reorder: "aside, .pull-up",
			except: "details aside, .dont-pull"
		},
		// same as 'large' breakpoint
		{
			at: "(min-width: " + ((1.5 * content + 5) * largeFontFactor * magic) + "em)",
			reorder: "details aside",
			except: ".dont-pull"
		}
	];

	// Element.matches polyfill
	if (!Element.prototype.matches) {
		Element.prototype.matches = (
			Element.prototype.matchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector ||
			Element.prototype.oMatchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = document.querySelectorAll(s);
				var	i = matches.length;
				while (--i >= 0 && matches.item(i) !== this);
				return i > -1;
			}
		);
	}

	var placeholder = document.createElement('span');
	placeholder.style.position = "fixed";
	placeholder.style.right = "100%";
	var rId = 0;

	// real work happens here
	function reorder(these, notThese, reverse) {
		var nodes = document.querySelectorAll(these);
		var target, back;
		for (var i=nodes.length-1; i>=0; i--) {
			target = nodes[i];
			if (reverse && target.dataset.reordered) {
				back = document.getElementById(target.dataset.reordered);
				target.parentNode.replaceChild(target, back);
				target.dataset.reordered = "";
			}
			else if (
				!reverse &&
				!target.dataset.reordered &&
				 target.previousElementSibling !== null &&
				!target.previousElementSibling.matches(these) &&
				!target.matches(notThese)
			) {
				back = placeholder.cloneNode(false);
				back.id = "reorder-placeholder-"+(rId++);
				target.parentNode.insertBefore(back, target.nextSibling);
				target.parentNode.insertBefore(
					target,
					target.previousElementSibling
				);
				target.dataset.reordered = back.id;
			}
		}
	}

	// wait for breakpoint changes
	breakpoints.forEach(function(breakpt) {
		window.enquire.register(breakpt.at, {
			match: function() {
				reorder(breakpt.reorder, breakpt.except);
			},
			unmatch: function() {
				reorder(breakpt.reorder, breakpt.except, true);
			}
		});
	});

})();
