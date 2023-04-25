/*!
 * Simulate text printing (Typed plugin)
 * https://mattboldt.github.io/typed/
 */
import { nodeObjects } from '@js/helpers/nodeList'
import Typed from 'typed.js'

if (document.querySelector('[data-typed]')) {
	const typed = new Typed('[data-typed]', {
		strings: ['working'],
		typeSpeed: 100,
		backSpeed: 100,
		backDelay: 500,
		startDelay: 1000,
		loop: true,
		fadeOut: false,
		smartBackspace: true,
		showCursor: false
		//cursorChar: '_',
		//fadeOutDelay: 500,
		//autoInsertCss: true,
		//shuffle: false,
		//attr: 'placeholder',
		//bindInputFocusEvents: true
	})
	nodeObjects.typed = typed
}
