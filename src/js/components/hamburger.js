import { html } from '@js/helpers/nodeList'
import {
	bodyLockStatus,
	bodyLockToggle,
	bodyUnlock
} from '@js/helpers/bodyLockToggle'

const burger = document.querySelector('.hamburger')

function hamburger() {
	if (burger) {
		document.addEventListener('click', ({ target }) => {
			if (bodyLockStatus && target.closest('.hamburger')) {
				!html.classList.contains('lock')
					? (burger.ariaExpanded = true)
					: (burger.ariaExpanded = false)
				bodyLockToggle()
			}

			if (
				bodyLockStatus &&
				!target.closest('.menu__body') &&
				!target.closest('.popup')
			) {
				burger.ariaExpanded = false
				bodyUnlock()
			}
		})
		document.addEventListener('keyup', e => {
			if (e.code === 'Escape') {
				burger.ariaExpanded = false
				bodyUnlock()
			}
		})
	}
}

export { hamburger, burger }
