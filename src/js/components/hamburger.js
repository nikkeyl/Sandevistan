import { html } from '@js/helpers/nodeList'
import {
	bodyLockStatus,
	bodyLockToggle,
	bodyUnlock,
	bodyLock
} from '@js/helpers/bodyLockToggle'

function hamburger() {
	const hamburger = document.querySelector('.hamburger')

	if (hamburger) {
		document.addEventListener('click', ({ target }) => {
			if (bodyLockStatus && target.closest('.hamburger')) {
				target.ariaExpanded === 'false'
					? (hamburger.ariaExpanded = true)
					: (hamburger.ariaExpanded = false)

				html.classList.toggle('menu-open')
				bodyLockToggle()
			}

			if (bodyLockStatus && !target.closest('.menu__body')) {
				hamburger.ariaExpanded = false
				html.classList.remove('menu-open')
				bodyUnlock()
			}
		})
		document.addEventListener('keyup', e => {
			hamburger.ariaExpanded = false
			e.code === 'Escape' && html.classList.remove('menu-open')
		})
	}
}

function menuOpen() {
	bodyLock()
	html.classList.add('menu-open')
}

function menuClose() {
	bodyUnlock()
	html.classList.remove('menu-open')
}

export { menuClose, menuOpen, hamburger }
