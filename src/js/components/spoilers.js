import { dataMediaQueries } from '@js/helpers/dataMedia'
import { slideToggle } from '@js/helpers/slideToggle'
import { slideUp } from '@js/helpers/slideUp'

function spoilers() {
	const spoilersArray = document.querySelectorAll('[data-spoilers]')

	document.addEventListener('click', setSpoilerAction)
	const spoilersRegular = Array.from(spoilersArray).filter(
		item => !item.dataset.spoilers.split(',')[0]
	)

	spoilersRegular.length ? initSpoilers(spoilersRegular) : null
	const mdQueriesArray = dataMediaQueries(spoilersArray, 'spoilers')

	if (mdQueriesArray && mdQueriesArray.length) {
		mdQueriesArray.forEach(mdQueriesItem => {
			mdQueriesItem.matchMedia.addEventListener('change', () => {
				initSpoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
			})
			initSpoilers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
		})
	}

	function initSpoilers(spoilersArray, matchMedia = false) {
		spoilersArray.forEach(spoilersBlock => {
			spoilersBlock = matchMedia ? spoilersBlock.item : spoilersBlock

			if (matchMedia.matches || !matchMedia) {
				spoilersBlock.classList.add('spoiler-init')
				initSpoilerBody(spoilersBlock)
			} else {
				spoilersBlock.classList.remove('spoiler-init')
				initSpoilerBody(spoilersBlock, false)
			}
		})
	}

	function initSpoilerBody(spoilersBlock, hideSpoilerBody = true) {
		let spoilerItems = spoilersBlock.querySelectorAll('details')

		spoilerItems = Array.from(spoilerItems).filter(
			item => item.closest('[data-spoilers]') === spoilersBlock
		)
		spoilerItems.forEach(spoilerItem => {
			const spoilerTitle = spoilerItem.querySelector('summary')

			if (hideSpoilerBody) {
				spoilerTitle.removeAttribute('tabindex')

				if (!spoilerItem.hasAttribute('data-open')) {
					spoilerItem.open = false
					spoilerTitle.nextElementSibling.hidden = true
				} else {
					spoilerTitle.classList.add('spoiler-active')
					spoilerItem.open = true
				}
			} else {
				spoilerTitle.setAttribute('tabindex', '-1')
				spoilerTitle.classList.remove('spoiler-active')
				spoilerItem.open = true
				spoilerTitle.nextElementSibling.hidden = false
			}
		})
	}

	function setSpoilerAction(e) {
		const el = e.target

		el.closest('details') ? e.preventDefault() : null

		if (el.closest('summary') && el.closest('[data-spoilers]')) {
			if (el.closest('[data-spoilers]').classList.contains('spoiler-init')) {
				const spoilerTitle = el.closest('summary')
				const spoilerBlock = spoilerTitle.closest('details')
				const spoilersBlock = spoilerTitle.closest('[data-spoilers]')
				const oneSpoiler = spoilersBlock.hasAttribute('data-one-spoiler')
				const spoilerSpeed = parseInt(spoilersBlock.dataset.spoilersSpeed) || 500

				if (!spoilersBlock.querySelectorAll('.slide').length) {
					oneSpoiler && !spoilerBlock.open ? hideSpoilersBody(spoilersBlock) : null

					!spoilerBlock.open
						? (spoilerBlock.open = true)
						: setTimeout(() => {
								spoilerBlock.open = false
						  }, spoilerSpeed)

					spoilerTitle.classList.toggle('spoiler-active')
					slideToggle(spoilerTitle.nextElementSibling, spoilerSpeed)
				}
			}
		}

		if (!el.closest('[data-spoilers]')) {
			const spoilersClose = document.querySelectorAll('[data-spoiler-close]')

			spoilersClose.forEach(spoilerClose => {
				const spoilersBlock = spoilerClose.closest('[data-spoilers]')
				const spoilerCloseBlock = spoilerClose.parentNode

				if (spoilersBlock.classList.contains('spoiler-init')) {
					const spoilerSpeed = parseInt(spoilersBlock.dataset.spoilersSpeed) || 500

					spoilerClose.classList.remove('spoiler-active')
					slideUp(spoilerClose.nextElementSibling, spoilerSpeed)
					setTimeout(() => {
						spoilerCloseBlock.open = false
					}, spoilerSpeed)
				}
			})
		}
	}

	function hideSpoilersBody(spoilersBlock) {
		const spoilerActiveBlock = spoilersBlock.querySelector('details[open]')

		if (spoilerActiveBlock && !spoilersBlock.querySelectorAll('.slide').length) {
			const spoilerActiveTitle = spoilerActiveBlock.querySelector('summary')
			const spoilerSpeed = parseInt(spoilersBlock.dataset.spoilersSpeed) || 500

			spoilerActiveTitle.classList.remove('spoiler-active')
			slideUp(spoilerActiveTitle.nextElementSibling, spoilerSpeed)
			setTimeout(() => {
				spoilerActiveBlock.open = false
			}, spoilerSpeed)
		}
	}
}

export { spoilers }
