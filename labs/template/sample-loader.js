/**
 * Like Prism's autoloader plugin, but with a more meaningful encoding
 */
(function() {
	'use strict'

	const dlLinks = {}

	if (window.Prism.plugins.toolbar) {
		window.Prism.plugins.toolbar.registerButton('sample-link', function (env) {
			return dlLinks[env.element.dataset.sampleLink]
		})
	}

	const samples = document.querySelectorAll('a.sample[class*="language-"]')
	for (let i = 0; i < samples.length; i++) {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', samples[i].href, true)
		xhr.onreadystatechange = function () {
			if (
				xhr.readyState === XMLHttpRequest.DONE
				&& xhr.status < 400
				&& xhr.responseText
			) {
				const pre = document.createElement('pre')
				pre.className = samples[i].className
				const code = document.createElement('code')
				code.textContent = xhr.responseText
				code.dataset.sampleLink = i
				pre.appendChild(code)
				dlLinks[i] = samples[i]
				samples[i].parentNode.replaceChild(
					pre,
					samples[i]
				)
				window.Prism.highlightElement(code)
			}
		}
		xhr.send()
	}
})();
