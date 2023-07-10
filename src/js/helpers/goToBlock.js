import { bodyUnlock } from '@js/helpers/bodyLockToggle'
import { html } from '@js/helpers/nodeList'
// import SmoothScroll from 'smooth-scroll'

const goToBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock)

	if (targetBlockElement) {
		let headerItem = ''
		let headerItemHeight = 0

		if (noHeader) {
			headerItem = 'header.header'

			const headerElement = document.querySelector(headerItem)

			if (!headerElement.classList.contains('header-scroll')) {
				headerElement.style.cssText = 'transition-duration: 0;'
				headerElement.classList.add('header-scroll')
				headerItemHeight = headerElement.offsetHeight
				headerElement.classList.remove('header-scroll')
			} else {
				headerItemHeight = headerElement.offsetHeight
			}
		}

		const options = {
			speedAsDuration: true,
			speed: speed,
			header: headerItem,
			offset: offsetTop,
			easing: 'easeOutQuad'
		}

		html.classList.contains('lock') ? bodyUnlock() : null

		if (typeof SmoothScroll !== 'undefined') {
			new SmoothScroll().animateScroll(targetBlockElement, '', options)
		} else {
			let targetBlockElementPosition =
				targetBlockElement.getBoundingClientRect().top + scrollY

			targetBlockElementPosition = headerItemHeight
				? targetBlockElementPosition - headerItemHeight
				: targetBlockElementPosition
			targetBlockElementPosition = offsetTop
				? targetBlockElementPosition - offsetTop
				: targetBlockElementPosition
			window.scrollTo({
				top: targetBlockElementPosition
			})
		}
	}
}

export { goToBlock }
