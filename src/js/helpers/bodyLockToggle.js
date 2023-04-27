import { html, lockPadding, body } from '@js/helpers/nodeList'

export let bodyLockStatus = true
/*! Blocks page scrolling  */
export const bodyLockToggle = (delay = 500) => {
	html.classList.contains('lock') ? bodyUnlock(delay) : bodyLock(delay)
}
function delayToggle(delay) {
	bodyLockStatus = false
	setTimeout(() => {
		bodyLockStatus = true
	}, delay)
}
export const bodyUnlock = (delay = 500) => {
	if (bodyLockStatus) {
		setTimeout(() => {
			lockPadding.forEach(el => {
				el.style.paddingRight = '0px'
			})
			body.style.paddingRight = '0px'
			html.classList.remove('lock')
		}, delay)
		delayToggle(delay)
	}
}
export const bodyLock = (delay = 500) => {
	if (bodyLockStatus) {
		lockPadding.forEach(el => {
			el.style.paddingRight =
				window.innerWidth -
				document.querySelector('.wrapper').offsetWidth +
				'px'
		})
		body.style.paddingRight =
			window.innerWidth -
			document.querySelector('.wrapper').offsetWidth +
			'px'
		html.classList.add('lock')
		delayToggle(delay)
	}
}
