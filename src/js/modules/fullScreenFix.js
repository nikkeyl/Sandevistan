import { isMobile } from '@js/helpers/isMobile'
import { html } from '@js/helpers/nodeList'

export function fullVHfix() {
	/*! Accounting for floating panel in mobile browsers */
	const fullScreens = document.querySelectorAll('[data-fullscreen]')
	if (fullScreens.length && isMobile.any()) {
		window.addEventListener('resize', fixHeight)
		function fixHeight() {
			let vh = window.innerHeight * 0.01
			html.style.setProperty('--vh', `${vh}px`)
		}
		fixHeight()
	}
}
