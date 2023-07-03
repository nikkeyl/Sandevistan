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
			if (bodyLockStatus && target.closest('.burger')) {
				target.getAttribute('aria-expanded') === 'false'
					? burger.setAttribute('aria-expanded', true)
					: burger.setAttribute('aria-expanded', false)

				html.classList.toggle('menu-open')
				bodyLockToggle()
			}

			if (bodyLockStatus && !target.closest('.menu__body')) {
				burger.setAttribute('aria-expanded', false)
				html.classList.remove('menu-open')
				bodyUnlock()
			}
		})
		document.addEventListener('keyup', e => {
			e.code === 'Escape' && html.classList.remove('menu-open')
			burger.setAttribute('aria-expanded', false)
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
