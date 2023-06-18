import { dataMediaQueries } from '@js/helpers/dataMedia'
import { slideToggle } from '@js/helpers/slideToggle'
import { slideUp } from '@js/helpers/slideUp'

function spollers() {
	const spollersArray = document.querySelectorAll('[data-spollers]')

	document.addEventListener('click', setSpollerAction)
	const spollersRegular = Array.from(spollersArray).filter(
		item => !item.dataset.spollers.split(',')[0]
	)

	spollersRegular.length ? initSpollers(spollersRegular) : null
	const mdQueriesArray = dataMediaQueries(spollersArray, 'spollers')

	if (mdQueriesArray && mdQueriesArray.length) {
		mdQueriesArray.forEach(mdQueriesItem => {
			mdQueriesItem.matchMedia.addEventListener('change', () => {
				initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
			})
			initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
		})
	}

	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			spollersBlock = matchMedia ? spollersBlock.item : spollersBlock

			if (matchMedia.matches || !matchMedia) {
				spollersBlock.classList.add('spoller-init')
				initSpollerBody(spollersBlock)
			} else {
				spollersBlock.classList.remove('spoller-init')
				initSpollerBody(spollersBlock, false)
			}
		})
	}

	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		let spollerItems = spollersBlock.querySelectorAll('details')

		spollerItems = Array.from(spollerItems).filter(
			item => item.closest('[data-spollers]') === spollersBlock
		)
		spollerItems.forEach(spollerItem => {
			const spollerTitle = spollerItem.querySelector('summary')

			if (hideSpollerBody) {
				spollerTitle.removeAttribute('tabindex')

				if (!spollerItem.hasAttribute('data-open')) {
					spollerItem.open = false
					spollerTitle.nextElementSibling.hidden = true
				} else {
					spollerTitle.classList.add('spoller-active')
					spollerItem.open = true
				}
			} else {
				spollerTitle.setAttribute('tabindex', '-1')
				spollerTitle.classList.remove('spoller-active')
				spollerItem.open = true
				spollerTitle.nextElementSibling.hidden = false
			}
		})
	}

	function setSpollerAction(e) {
		e.preventDefault()
		const el = e.target

		if (el.closest('summary') && el.closest('[data-spollers]')) {
			if (el.closest('[data-spollers]').classList.contains('spoller-init')) {
				const spollerTitle = el.closest('summary')
				const spollerBlock = spollerTitle.closest('details')
				const spollersBlock = spollerTitle.closest('[data-spollers]')
				const oneSpoller = spollersBlock.hasAttribute('data-one-spoller')
				const spollerSpeed = parseInt(spollersBlock.dataset.spollersSpeed) || 500

				if (!spollersBlock.querySelectorAll('.slide').length) {
					oneSpoller && !spollerBlock.open ? hideSpollersBody(spollersBlock) : null

					!spollerBlock.open
						? (spollerBlock.open = true)
						: setTimeout(() => {
								spollerBlock.open = false
						  }, spollerSpeed)

					spollerTitle.classList.toggle('spoller-active')
					slideToggle(spollerTitle.nextElementSibling, spollerSpeed)
				}
			}
		}

		if (!el.closest('[data-spollers]')) {
			const spollersClose = document.querySelectorAll('[data-spoller-close]')

			spollersClose.forEach(spollerClose => {
				const spollersBlock = spollerClose.closest('[data-spollers]')
				const spollerCloseBlock = spollerClose.parentNode

				if (spollersBlock.classList.contains('spoller-init')) {
					const spollerSpeed = parseInt(spollersBlock.dataset.spollersSpeed) || 500

					spollerClose.classList.remove('spoller-active')
					slideUp(spollerClose.nextElementSibling, spollerSpeed)
					setTimeout(() => {
						spollerCloseBlock.open = false
					}, spollerSpeed)
				}
			})
		}
	}

	function hideSpollersBody(spollersBlock) {
		const spollerActiveBlock = spollersBlock.querySelector('details[open]')

		if (spollerActiveBlock && !spollersBlock.querySelectorAll('.slide').length) {
			const spollerActiveTitle = spollerActiveBlock.querySelector('summary')
			const spollerSpeed = parseInt(spollersBlock.dataset.spollersSpeed) || 500

			spollerActiveTitle.classList.remove('spoller-active')
			slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed)
			setTimeout(() => {
				spollerActiveBlock.open = false
			}, spollerSpeed)
		}
	}
}

export { spollers }
