import { html, body } from '@js/helpers/nodeList'
import { burger } from '@js/components/hamburger'

let bodyLockStatus = true

function delayToggle(delay = 500) {
	bodyLockStatus = false
	setTimeout(() => {
		bodyLockStatus = true
	}, delay)
}

const bodyUnlock = delay => {
	if (bodyLockStatus) {
		body.style.paddingRight = 0
		html.classList.remove('lock')
		burger.ariaExpanded = false
		delayToggle(delay)
	}
}
const bodyLock = delay => {
	if (bodyLockStatus) {
		body.style.paddingRight =
			window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
		html.classList.add('lock')
		delayToggle(delay)
	}
}

/*! Blocks page scrolling  */
const bodyLockToggle = delay => {
	html.classList.contains('lock') ? bodyUnlock(delay) : bodyLock(delay)
}

export { bodyLockStatus, bodyLockToggle, bodyUnlock, bodyLock }
