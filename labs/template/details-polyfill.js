/**
 * Make <details> work in dumb browsers
 */
(function() {
	var MARKER_CLASS = "details-marker";

	function toggle() {
		var d = this.parentNode;
		if (d.getAttribute('open') === null) {
			d.setAttribute('open', 'open');
			d.setAttribute('aria-expanded', 'true');
			this.setAttribute('aria-pressed', 'true');
		} else {
			d.removeAttribute('open');
			d.setAttribute('aria-expanded', 'false');
			this.setAttribute('aria-pressed', 'false');
		}
	}

	if (!window.Modernizr.details) {
		var nonEmptyRex = /\S/;
		var ds = document.querySelectorAll('details');
		var marker = document.createElement('span');
		marker.setAttribute('class', MARKER_CLASS);
		var dID, sum, sumID, children, wrap;
		for (var i=0, d=ds[i]; i<ds.length; d=ds[++i]) {
			// make sure details has an ID
			dID = d.getAttribute('id');
			if (dID === null) {
				dID = '_details-'+i;
				d.setAttribute('id', dID);
			}
			// make sure there are no bare text children
			children = d.childNodes;
			for (var j=0; j<children.length; j++) {
				if (
					children[j].nodeType === Node.TEXT_NODE &&
					nonEmptyRex.test(children[j].nodeValue)
				) {
					wrap = document.createElement('span');
					wrap.appendChild(
						document.createTextNode(
							children[j].nodeValue
						)
					);
					d.replaceChild(wrap, children[j]);
				}
			}
			// make sure there's a top-level summary
			sum = d.querySelector('summary');
			if (sum === null) {
				sum = document.createElement('summary');
				d.appendChild(sum);
			} else if (sum.parentNode !== d) {
				d.appendChild(sum);
			}
			// and that it has an ID
			sumID = sum.getAttribute('id');
			if (sumID === null) {
				sumID = '_summary-'+i;
				sum.setAttribute('id', sumID);
			}
			// add an open/closed marker to the summary
			sum.insertBefore(marker.cloneNode(), sum.firstChild);
			// set constant aria attributes
			d.setAttribute('role', 'group');
			d.setAttribute('aria-labelledby', sumID);
			sum.setAttribute('role', 'button');
			sum.setAttribute('aria-controls', dID);
			// toggle open/closed when summary clicked
			sum.addEventListener('click', toggle, false);
			// start closed
			d.setAttribute('open', '');
			toggle.call(sum);
		}
	}
})();
