/**
 * Allow long URLS to wrap by inserting <wbr>
 */
(function() {
	"use strict";

	function reverseWalk(root, type, fn) {
		var children = root.childNodes;
		for (var i=children.length-1; i>=0; i--) {
			reverseWalk(children[i], type, fn);
		}
		if (root.nodeType === type) fn(root);
	}

	var urlRex = /((?:https?|s?ftp):\/\/[\w-]+(?:\.[\w-]+)+)((?:\/[^\s/]+)+)/g;
	var pathRex = /[^\s/]+\//g;
	function wordBreakURLsIn(text) {
		urlRex.lastIndex = 0;
		pathRex.lastIndex = 0;
		var pieces = [];
		var consumed = 0;
		var urlMatch;
		while ((urlMatch = urlRex.exec(text)) !== null) {
			// add everything up to the end of the domain and first '/'
			var pathStart = (urlMatch.index + urlMatch[1].length + 1);
			pieces.push(text.substring(consumed, pathStart));
			consumed = pathStart;
			// add each path part with a trailing slash
			var pathParts = urlMatch[2].match(pathRex);
			if (pathParts !== null) {
				for (var i=0; i<pathParts.length; i++) {
					pieces.push(pathParts[i]);
					consumed += pathParts[i].length;
				}
			}
		}
		// add any remaining text
		if (consumed < text.length) {
			pieces.push(text.substring(consumed));
		}
		return pieces;
	}

	reverseWalk(
		document.body,
		Node.TEXT_NODE,
		function(n) {
			var text = n.nodeValue;
			if (urlRex.test(text)) {
				var parts = wordBreakURLsIn(text);
				var frag = document.createDocumentFragment();
				for (var i=0; i<parts.length; i++) {
					frag.appendChild(
						document.createTextNode(parts[i])
					);
					if (i !== parts.length-1) {
						frag.appendChild(
							document.createElement('wbr')
						);
					}
				}
				n.parentNode.replaceChild(frag, n);
			}
		}
	);
})();
