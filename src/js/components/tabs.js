import { removeClasses } from '@js/helpers/removeClasses'
import { dataMediaQueries } from '@js/helpers/dataMedia'
import { slideDown } from '@js/helpers/slideDown'
import { slideUp } from '@js/helpers/slideUp'
import { getHash } from '@js/helpers/getHash'
import { setHash } from '@js/helpers/setHash'

function tabs() {
	const tabs = document.querySelectorAll('[data-tabs]')
	const hash = getHash()

	let tabsActiveHash = []

	hash?.startsWith('tab-')
		? (tabsActiveHash = hash.replace('tab-', '').split('-'))
		: null
	tabs.forEach((tabsBlock, index) => {
		tabsBlock.classList.add('tab-init')
		tabsBlock.setAttribute('data-tabs-index', index)
		tabsBlock.addEventListener('click', setTabsAction)
		initTabs(tabsBlock)
	})

	const mdQueriesArray = dataMediaQueries(tabs, 'tabs')

	if (mdQueriesArray && mdQueriesArray.length) {
		mdQueriesArray.forEach(mdQueriesItem => {
			mdQueriesItem.matchMedia.addEventListener('change', () => {
				setTriggerPosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
			})
			setTriggerPosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
		})
	}

	function setTriggerPosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach(tabsMediaItem => {
			tabsMediaItem = tabsMediaItem.item

			const tabsTriggers = tabsMediaItem.querySelector('[data-tabs-triggers]')
			const tabsPanels = tabsMediaItem.querySelector('[data-tabs-panels]')

			let tabsTriggerItems = tabsMediaItem.querySelectorAll('[data-tabs-trigger]')
			let tabsPanelsItems = tabsMediaItem.querySelectorAll('[data-tabs-item]')

			tabsTriggerItems = Array.from(tabsTriggerItems).filter(
				item => item.closest('[data-tabs]') === tabsMediaItem
			)
			tabsPanelsItems = Array.from(tabsPanelsItems).filter(
				item => item.closest('[data-tabs]') === tabsMediaItem
			)
			tabsPanelsItems.forEach((tabsPanelsItem, index) => {
				if (matchMedia.matches) {
					tabsPanels.append(tabsTriggerItems[index])
					tabsPanels.append(tabsPanelsItem)
					tabsMediaItem.classList.add('tab-spoiler')
				} else {
					tabsTriggers.append(tabsTriggerItems[index])
					tabsMediaItem.classList.remove('tab-spoiler')
				}
			})
		})
	}

	function initTabs(tabsBlock) {
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex
		const tabsActiveHashBlock = tabsActiveHash[0] === tabsBlockIndex

		let tabsTriggers = tabsBlock.querySelectorAll('[data-tabs-triggers]>*')
		let tabsPanels = tabsBlock.querySelectorAll('[data-tabs-panels]>*')

		if (tabsActiveHashBlock) {
			const tabsActiveTrigger = tabsBlock.querySelector(
				'[data-tabs-triggers]>.tab-active'
			)

			tabsActiveTrigger?.classList.remove('tab-active')
		}

		tabsPanels = Array.from(tabsPanels).filter(
			item => item.closest('[data-tabs]') === tabsBlock
		)
		tabsTriggers = Array.from(tabsTriggers).filter(
			item => item.closest('[data-tabs]') === tabsBlock
		)
		tabsPanels.forEach((tabsPanelsItem, index) => {
			tabsTriggers[index].setAttribute('data-tabs-trigger', '')
			tabsPanelsItem.setAttribute('data-tabs-item', '')
			tabsActiveHashBlock && index === tabsActiveHash[1]
				? tabsTriggers[index].classList.add('tab-active')
				: null
			tabsPanelsItem.hidden = !tabsTriggers[index].classList.contains('tab-active')
		})
	}

	function setTabsStatus(tabsBlock) {
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex

		let tabsTriggers = tabsBlock.querySelectorAll('[data-tabs-trigger]')
		let tabsPanels = tabsBlock.querySelectorAll('[data-tabs-item]')

		function isTabsAnamate(tabsBlock) {
			if (tabsBlock.hasAttribute('data-tabs-animate')) {
				return +tabsBlock.dataset.tabsAnimate || 500
			}
		}

		const tabsBlockAnimate = isTabsAnamate(tabsBlock)
		const isHash = tabsBlock.hasAttribute('data-tabs-hash')

		tabsPanels = Array.from(tabsPanels).filter(
			item => item.closest('[data-tabs]') === tabsBlock
		)
		tabsTriggers = Array.from(tabsTriggers).filter(
			item => item.closest('[data-tabs]') === tabsBlock
		)
		tabsPanels.forEach((tabsPanelsItem, index) => {
			if (tabsTriggers[index].classList.contains('tab-active')) {
				tabsBlockAnimate
					? slideDown(tabsPanelsItem, tabsBlockAnimate)
					: (tabsPanelsItem.hidden = false)
				isHash && !tabsPanelsItem.closest('.popup')
					? setHash(`tab-${tabsBlockIndex}-${index}`)
					: null
			} else if (tabsBlockAnimate) {
				slideUp(tabsPanelsItem, tabsBlockAnimate)
			} else {
				tabsPanelsItem.hidden = true
			}
		})
	}

	function setTabsAction(e) {
		const el = e.target

		if (el.closest('[data-tabs-trigger]')) {
			const tabTrigger = el.closest('[data-tabs-trigger]')
			const tabsBlock = tabTrigger.closest('[data-tabs]')

			if (
				!tabTrigger.classList.contains('tab-active') &&
				!tabsBlock.querySelector('.slide')
			) {
				let tabActiveTrigger = tabsBlock.querySelectorAll(
					'[data-tabs-trigger].tab-active'
				)

				tabActiveTrigger.length
					? (tabActiveTrigger = Array.from(tabActiveTrigger).filter(
							item => item.closest('[data-tabs]') === tabsBlock
					  ))
					: null
				removeClasses('[data-tabs-trigger].tab-active', 'tab-active')
				tabTrigger.classList.add('tab-active')
				setTabsStatus(tabsBlock)
			}

			e.preventDefault()
		}
	}
}

export { tabs }
