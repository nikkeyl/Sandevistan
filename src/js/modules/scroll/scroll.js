import { nodeObjects } from '@js/helpers/nodeList'
import { gotoBlock } from '@js/helpers/goToBlock'
import { getHash } from '@js/helpers/getHash'

let addWindowScrollEvent = false
export function pageNavigation() {
	document.addEventListener('click', pageNavigationAction)
	document.addEventListener('watcherCallback', pageNavigationAction)
	function pageNavigationAction(e) {
		if (e.type === 'click') {
			const targetElement = e.target
			if (targetElement.closest('[data-goto]')) {
				const gotoLink = targetElement.closest('[data-goto]')
				const gotoLinkSelector = gotoLink.dataset.goto
					? gotoLink.dataset.goto
					: ''
				const noHeader = gotoLink.hasAttribute('data-goto-header')
					? true
					: false
				const gotoSpeed = gotoLink.dataset.gotoSpeed
					? gotoLink.dataset.gotoSpeed
					: 500
				const offsetTop = gotoLink.dataset.gotoTop
					? parseInt(gotoLink.dataset.gotoTop)
					: 0
				if (nodeObjects.fullpage) {
					const fullPageSectionId = +document.querySelector(
						`${gotoLinkSelector}[data-fp-section]`
					)
					nodeObjects.fullpage.switchingSection(fullPageSectionId)
				} else {
					gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop)
				}
				e.preventDefault()
			}
		} else if (e.type === 'watcherCallback' && e.detail) {
			const entry = e.detail.entry
			const targetElement = entry.target
			if (targetElement.dataset.watch === 'navigator') {
				// const navigatorActiveItem = document.querySelector(`[data-goto].navigator-active`)
				let navigatorCurrentItem
				if (
					targetElement.id &&
					document.querySelector(`[data-goto="#${targetElement.id}"]`)
				) {
					navigatorCurrentItem = document.querySelector(
						`[data-goto="#${targetElement.id}"]`
					)
				} else if (targetElement.classList.length) {
					for (
						const i = 0;
						i < targetElement.classList.length;
						i++
					) {
						const element = targetElement.classList[i]
						if (
							document.querySelector(`[data-goto=".${element}"]`)
						) {
							navigatorCurrentItem = document.querySelector(
								`[data-goto=".${element}"]`
							)
							break
						}
					}
				}
				if (entry.isIntersecting) {
					// navigatorActiveItem ? navigatorActiveItem.classList.remove('navigator-active') : null
					navigatorCurrentItem
						? navigatorCurrentItem.classList.add('navigator-active')
						: null
				} else {
					navigatorCurrentItem
						? navigatorCurrentItem.classList.remove(
							'navigator-active'
						)
						: null
				}
			}
		}
	}
	if (getHash()) {
		let goToHash
		if (document.querySelector(`#${getHash()}`)) {
			goToHash = `#${getHash()}`
		} else if (document.querySelector(`.${getHash()}`)) {
			goToHash = `.${getHash()}`
		}
		goToHash ? gotoBlock(goToHash, true, 500, 20) : null
	}
}
setTimeout(() => {
	if (addWindowScrollEvent) {
		const windowScroll = new Event('windowScroll')
		window.addEventListener('scroll', () => {
			document.dispatchEvent(windowScroll)
		})
	}
}, 0)