/**
 * Converts API links like:
 *	<figure class="api">
 *	  <a class="api-doc" href="List.html">Javadoc</a>
 *	  <a class="api-interface" href="List.java" download>interface file</a>
 *  </figure>
 * to an embedded viewer
 */
(function() {
	'use strict'

	function fragment(html) {
		const templ = document.createElement('template')
		templ.innerHTML = html
		return templ.content
	}

	const popoutTemplate = fragment(`
		<a target="_blank" class="api-popout">
			<span>Open in new window</span>
			<svg class="icon" viewBox="0 0 768 768">
				<desc>arrow pointing out of box</desc>
				<path d="M584 664H104V184h216V80H0v688h688V448H584zM384 0l132 132-240 240 120 120 240-240 132 132V0z" fill="currentColor"/>
			</svg>
		</a>
	`);
	const downloadTemplate = fragment(`
		<a download class="api-download">Download interface</a>
	`);

	for (let figureEl of document.querySelectorAll('.api')) {
		const docLink = figureEl.querySelector('.api-doc')
		const interfaceLink = figureEl.querySelector('.api-interface')
		// create iframe for documentation
		// <iframe src="<href>" class="api-frame"></iframe>
		const viewer = document.createElement('iframe')
		viewer.onload = () => {
			const api = viewer.contentDocument
			for (let link of api.querySelectorAll('.externalLink')) {
				link.target = '_blank'
			}
		}
		viewer.src = docLink.href
		viewer.className = 'api-frame'
		// create utility links
		const linkbar = document.createElement('div')
		linkbar.className = 'api-linkbar'
		const popout = popoutTemplate.cloneNode(true).firstElementChild
		popout.href = docLink.href
		linkbar.appendChild(popout)
		const download = downloadTemplate.cloneNode(true).firstElementChild
		download.href = interfaceLink.href
		linkbar.appendChild(download)
		// remove existing links
		figureEl.removeChild(docLink)
		figureEl.removeChild(interfaceLink)
		// add the viewer and linkbar
		figureEl.appendChild(viewer)
		figureEl.appendChild(linkbar)
	}

})();
