import { addTouchClass } from '@js/helpers/addTouchClass'
import { isMobile } from '@js/helpers/isMobile'
import { html } from '@js/helpers/nodeList'

export function fullVHfix() {
	const fullScreens = document.querySelectorAll('[data-fullscreen]')
	/*! Accounting for floating panel in mobile browsers */
	function fixHeight() {
		const vh = window.innerHeight * 0.01
		html.style.setProperty('--vh', `${vh}px`)
	}
	if (fullScreens.length && isMobile.any()) {
		window.addEventListener('resize', fixHeight)
		addTouchClass()
		fixHeight()
	}
}
