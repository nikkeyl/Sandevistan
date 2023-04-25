import { menuClose } from '@js/components/menu'
import { html } from '@js/helpers/nodeList'
import SmoothScroll from 'smooth-scroll'

export let gotoBlock = (
	targetBlock,
	noHeader = false,
	speed = 500,
	offsetTop = 0
) => {
	const targetBlockElement = document.querySelector(targetBlock)
	if (targetBlockElement) {
		let headerItem = ''
		let headerItemHeight = 0
		if (noHeader) {
			headerItem = 'header.header'
			headerItemHeight = document.querySelector(headerItem).offsetHeight
		}
		let options = {
			speedAsDuration: true,
			speed: speed,
			header: headerItem,
			offset: offsetTop,
			easing: 'easeOutQuad'
		}
		html.classList.contains('menu-open') ? menuClose() : null
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
				top: targetBlockElementPosition,
				behavior: 'smooth'
			})
		}
	}
}
