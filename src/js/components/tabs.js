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
		mdQueriesArray.forEach(mdQueriesPanel => {
			mdQueriesPanel.matchMedia.addEventListener('change', () => {
				setTriggerPosition(mdQueriesPanel.PanelsArray, mdQueriesPanel.matchMedia)
			})
			setTriggerPosition(mdQueriesPanel.PanelsArray, mdQueriesPanel.matchMedia)
		})
	}

	function setTriggerPosition(tabsMediaArray, matchMedia) {
		tabsMediaArray.forEach(tabsMediaPanel => {
			tabsMediaPanel = tabsMediaPanel.panel

			const tabsTriggers = tabsMediaPanel.querySelector('[data-tabs-triggers]')
			const tabsPanels = tabsMediaPanel.querySelector('[data-tabs-panels]')

			let tabsTriggerPanels = tabsMediaPanel.querySelectorAll('[data-tabs-trigger]')
			let tabsPanelsPanels = tabsMediaPanel.querySelectorAll('[data-tabs-panel]')

			tabsTriggerPanels = Array.from(tabsTriggerPanels).filter(
				panel => panel.closest('[data-tabs]') === tabsMediaPanel
			)
			tabsPanelsPanels = Array.from(tabsPanelsPanels).filter(
				panel => panel.closest('[data-tabs]') === tabsMediaPanel
			)
			tabsPanelsPanels.forEach((tabsPanelsPanel, index) => {
				if (matchMedia.matches) {
					tabsPanels.append(tabsTriggerPanels[index])
					tabsPanels.append(tabsPanelsPanel)
					tabsMediaPanel.classList.add('tab-spoiler')
				} else {
					tabsTriggers.append(tabsTriggerPanels[index])
					tabsMediaPanel.classList.remove('tab-spoiler')
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
				'[data-tabs-triggers]>.trigger-active'
			)

			tabsActiveTrigger?.classList.remove('trigger-active')
		}

		tabsPanels = Array.from(tabsPanels).filter(
			panel => panel.closest('[data-tabs]') === tabsBlock
		)
		tabsTriggers = Array.from(tabsTriggers).filter(
			panel => panel.closest('[data-tabs]') === tabsBlock
		)
		tabsPanels.forEach((tabsPanelsPanel, index) => {
			tabsTriggers[index].setAttribute('data-tabs-trigger', '')
			tabsPanelsPanel.setAttribute('data-tabs-panel', '')
			tabsActiveHashBlock && index === tabsActiveHash[1]
				? tabsTriggers[index].classList.add('trigger-active')
				: null
			tabsPanelsPanel.hidden =
				!tabsTriggers[index].classList.contains('trigger-active')
		})
	}

	function setTabsStatus(tabsBlock) {
		const tabsBlockIndex = tabsBlock.dataset.tabsIndex

		let tabsTriggers = tabsBlock.querySelectorAll('[data-tabs-trigger]')
		let tabsPanels = tabsBlock.querySelectorAll('[data-tabs-panel]')

		function isTabsAnamate(tabsBlock) {
			if (tabsBlock.hasAttribute('data-tabs-animate')) {
				return +tabsBlock.dataset.tabsAnimate || 500
			}
		}

		const tabsBlockAnimate = isTabsAnamate(tabsBlock)
		const isHash = tabsBlock.hasAttribute('data-tabs-hash')

		tabsPanels = Array.from(tabsPanels).filter(
			panel => panel.closest('[data-tabs]') === tabsBlock
		)
		tabsTriggers = Array.from(tabsTriggers).filter(
			panel => panel.closest('[data-tabs]') === tabsBlock
		)
		tabsPanels.forEach((tabsPanelsPanel, index) => {
			if (tabsTriggers[index].classList.contains('trigger-active')) {
				tabsBlockAnimate
					? slideDown(tabsPanelsPanel, tabsBlockAnimate)
					: (tabsPanelsPanel.hidden = false)
				isHash && !tabsPanelsPanel.closest('.popup')
					? setHash(`tab-${tabsBlockIndex}-${index}`)
					: null
			} else if (tabsBlockAnimate) {
				slideUp(tabsPanelsPanel, tabsBlockAnimate)
			} else {
				tabsPanelsPanel.hidden = true
			}
		})
	}

	function setTabsAction(e) {
		const el = e.target

		if (el.closest('[data-tabs-trigger]')) {
			const tabTrigger = el.closest('[data-tabs-trigger]')
			const tabsBlock = tabTrigger.closest('[data-tabs]')

			if (
				!tabTrigger.classList.contains('trigger-active') &&
				!tabsBlock.querySelector('.slide')
			) {
				let tabActiveTrigger = tabsBlock.querySelectorAll(
					'[data-tabs-trigger].trigger-active'
				)

				tabActiveTrigger.length
					? (tabActiveTrigger = Array.from(tabActiveTrigger).filter(
							panel => panel.closest('[data-tabs]') === tabsBlock
					  ))
					: null
				removeClasses('[data-tabs-trigger].trigger-active', 'trigger-active')
				tabTrigger.classList.add('trigger-active')
				setTabsStatus(tabsBlock)
			}

			e.preventDefault()
		}
	}
}

export { tabs }
