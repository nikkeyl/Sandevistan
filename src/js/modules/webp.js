import { html } from '@js/helpers/nodeList'

function webp() {
	function testWebP(callback) {
		const webP = new Image()

		webP.onload = webP.onerror = () => callback(webP.height === 2)
		webP.src
            = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
	}

	testWebP(support => html.classList.add(support === true
		? 'webp'
		: 'no-webp'))
}

export { webp }
