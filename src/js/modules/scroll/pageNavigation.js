import { gotoBlock } from '@js/helpers/goToBlock'
import { getHash } from '@js/helpers/getHash'

function pageNavigation() {
	document.addEventListener('click', pageNavigationAction)
	document.addEventListener('watcherCallback', pageNavigationAction)

	function pageNavigationAction(e) {
		if (e.type === 'click') {
			const targetElement = e.target

			if (targetElement.closest('[data-goto]')) {
				const gotoLink = targetElement.closest('[data-goto]')
				const gotoLinkSelector = gotoLink.dataset.goto || ''
				const noHeader = gotoLink.hasAttribute('data-goto-header')
				const gotoSpeed = gotoLink.dataset.gotoSpeed || 500
				const offsetTop = parseInt(gotoLink.dataset.gotoTop) || 0

				gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop)
				e.preventDefault()
			}
		} else if (e.type === 'watcherCallback' && e.detail) {
			const entry = e.detail.entry
			const targetElement = entry.target

			if (targetElement.dataset.watch === 'navigator') {
				let navigatorCurrentItem

				if (
					targetElement.id &&
					document.querySelector(`[data-goto="#${targetElement.id}"]`)
				) {
					navigatorCurrentItem = document.querySelector(
						`[data-goto="#${targetElement.id}"]`
					)
				} else if (targetElement.classList.length) {
					for (let i = 0; i < targetElement.classList.length; i++) {
						const element = targetElement.classList[i]

						if (document.querySelector(`[data-goto=".${element}"]`)) {
							navigatorCurrentItem = document.querySelector(
								`[data-goto=".${element}"]`
							)

							break
						}
					}
				}

				if (entry.isIntersecting) {
					navigatorCurrentItem?.classList.add('navigator-active')
				} else {
					navigatorCurrentItem?.classList.remove('navigator-active')
				}
			}
		}
	}

	if (getHash()) {
		let goToHash

		document.querySelector(`#${getHash()}`)
			? (goToHash = `#${getHash()}`)
			: (goToHash = `.${getHash()}`)
		goToHash ? gotoBlock(goToHash, true, 500, 20) : null
	}
}

export { pageNavigation }
