import { bodyLockStatus, bodyUnlock, bodyLock } from '@js/helpers/bodyLockToggle'
import { nodeObjects, html } from '@js/helpers/nodeList'

class Popup {
	constructor(options) {
		const config = {
			init: true,
			attributeOpenButton: 'data-popup',
			attributeCloseButton: 'data-close',
			fixElementSelector: '[data-lp]',
			youtubeAttribute: 'data-popup-youtube',
			youtubePlaceAttribute: 'data-popup-youtube-place',
			setAutoplayYoutube: true,
			classes: {
				popup: 'popup',
				popupContent: 'popup__content',
				popupActive: 'popup--show',
				bodyActive: 'popup-show'
			},
			focusCatch: true,
			closeEsc: true,
			bodyLock: true,
			hashSettings: {
				location: true,
				goHash: true
			},
			on: {
				beforeOpen: () => {},
				afterOpen: () => {},
				beforeClose: () => {},
				afterClose: () => {}
			}
		}

		this.youTubeCode
		this.isOpen = false
		this.targetOpen = {
			selector: false,
			element: false
		}
		this.previousOpen = {
			selector: false,
			element: false
		}
		this.lastClosed = {
			selector: false,
			element: false
		}
		this.dataValue = false
		this.hash = false
		this.reopen = false
		this.selectorOpen = false
		this.lastFocusEl = false
		this.focusEl = [
			'a[href]',
			'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
			'button:not([disabled]):not([aria-hidden])',
			'select:not([disabled]):not([aria-hidden])',
			'textarea:not([disabled]):not([aria-hidden])',
			'area[href]',
			'iframe',
			'object',
			'embed',
			'[contenteditable]',
			'[tabindex]:not([tabindex^="-"])'
		]
		this.options = {
			...config,
			...options,
			classes: {
				...config.classes,
				...options?.classes
			},
			hashSettings: {
				...config.hashSettings,
				...options?.hashSettings
			},
			on: {
				...config.on,
				...options?.on
			}
		}
		this.bodyLock = false
		this.options.init ? this.initPopups() : null
	}

	initPopups() {
		this.eventsPopup()
	}

	eventsPopup() {
		document.addEventListener(
			'click',
			function (e) {
				const buttonOpen = e.target.closest(`[${this.options.attributeOpenButton}]`)

				if (buttonOpen) {
					e.preventDefault()
					this.dataValue =
						buttonOpen?.getAttribute(this.options.attributeOpenButton) || 'error'
					this.youTubeCode =
						buttonOpen?.getAttribute(this.options.youtubeAttribute) || null

					if (this.dataValue !== 'error') {
						if (!this.isOpen) {
							this.lastFocusEl = buttonOpen
						}

						this.targetOpen.selector = `${this.dataValue}`
						this.selectorOpen = true
						this.open()

						return
					}

					return
				}

				const buttonClose = e.target.closest(
					`[${this.options.attributeCloseButton}]`
				)

				if (
					buttonClose ||
					(!e.target.closest(`.${this.options.classes.popupContent}`) && this.isOpen)
				) {
					e.preventDefault()
					this.close()

					return
				}
			}.bind(this)
		)

		document.addEventListener(
			'keydown',
			function (e) {
				if (
					this.options.closeEsc &&
					e.which === 27 &&
					e.code === 'Escape' &&
					this.isOpen
				) {
					e.preventDefault()
					this.close()

					return
				}

				if (this.options.focusCatch && e.which === 9 && this.isOpen) {
					this.focusCatch(e)

					return
				}
			}.bind(this)
		)

		if (this.options.hashSettings.goHash) {
			window.addEventListener(
				'hashchange',
				function () {
					if (window.location.hash) {
						this.openToHash()
					} else {
						this.close(this.targetOpen.selector)
					}
				}.bind(this)
			)

			window.addEventListener(
				'load',
				function () {
					if (window.location.hash) {
						this.openToHash()
					}
				}.bind(this)
			)
		}
	}

	open(selectorValue) {
		if (bodyLockStatus) {
			this.bodyLock = html.classList.contains('lock') && !this.isOpen ? true : false

			if (
				selectorValue &&
				typeof selectorValue === 'string' &&
				selectorValue.trim() !== ''
			) {
				this.targetOpen.selector = selectorValue
				this.selectorOpen = true
			}

			if (this.isOpen) {
				this.reopen = true
				this.close()
			}

			if (!this.selectorOpen) {
				this.targetOpen.selector = this.lastClosed.selector
			}

			if (!this.reopen) {
				this.previousActiveElement = document.activeElement
			}

			this.targetOpen.element = document.querySelector(this.targetOpen.selector)

			if (this.targetOpen.element) {
				if (this.youTubeCode) {
					const codeVideo = this.youTubeCode
					const urlVideo = `https://www.youtube.com/embed/${codeVideo}?rel=0&showinfo=0&autoplay=1`
					const iframe = document.createElement('iframe')

					iframe.setAttribute('allowfullscreen', '')

					const autoplay = this.options.setAutoplayYoutube ? 'autoplay;' : ''

					iframe.setAttribute('allow', `${autoplay}; encrypted-media`)
					iframe.setAttribute('src', urlVideo)

					if (
						!this.targetOpen.element.querySelector(
							`[${this.options.youtubePlaceAttribute}]`
						)
					) {
						this.targetOpen.element
							.querySelector('.popup__text')
							.setAttribute(`${this.options.youtubePlaceAttribute}`, '')
					}

					this.targetOpen.element
						.querySelector(`[${this.options.youtubePlaceAttribute}]`)
						.appendChild(iframe)
				}

				if (this.options.hashSettings.location) {
					this.getHash()
					this.setHash()
				}

				this.options.on.beforeOpen(this)
				// document.dispatchEvent(
				// 	new CustomEvent('beforePopupOpen', { detail: { popup: this } })
				// )
				this.targetOpen.element.classList.add(this.options.classes.popupActive)
				html.classList.add(this.options.classes.bodyActive)

				if (!this.reopen) {
					!this.bodyLock ? bodyLock() : null
				} else {
					this.reopen = false
				}

				this.targetOpen.element.setAttribute('aria-hidden', 'false')
				this.previousOpen.selector = this.targetOpen.selector
				this.previousOpen.element = this.targetOpen.element
				this.selectorOpen = false
				this.isOpen = true
				setTimeout(() => {
					this.focusTrap()
				}, 50)
				this.options.on.afterOpen(this)
				// document.dispatchEvent(
				// 	new CustomEvent('afterPopupOpen', { detail: { popup: this } })
				// )
			}
		}
	}

	close(selectorValue) {
		if (
			selectorValue &&
			typeof selectorValue === 'string' &&
			selectorValue.trim() !== ''
		) {
			this.previousOpen.selector = selectorValue
		}

		if (!this.isOpen || !bodyLockStatus) {
			return
		}

		this.options.on.beforeClose(this)
		// document.dispatchEvent(
		// 	new CustomEvent('beforePopupClose', { detail: { popup: this } })
		// )

		if (this.youTubeCode) {
			if (
				this.targetOpen.element.querySelector(
					`[${this.options.youtubePlaceAttribute}]`
				)
			) {
				this.targetOpen.element.querySelector(
					`[${this.options.youtubePlaceAttribute}]`
				).innerHTML = ''
			}
		}

		this.previousOpen.element.classList.remove(this.options.classes.popupActive)
		this.previousOpen.element.setAttribute('aria-hidden', 'true')

		if (!this.reopen) {
			html.classList.remove(this.options.classes.bodyActive)
			!this.bodyLock ? bodyUnlock() : null
			this.isOpen = false
		}

		this.removeHash()

		if (this.selectorOpen) {
			this.lastClosed.selector = this.previousOpen.selector
			this.lastClosed.element = this.previousOpen.element
		}

		this.options.on.afterClose(this)
		// document.dispatchEvent(
		// 	new CustomEvent('afterPopupClose', { detail: { popup: this } })
		// )
		setTimeout(() => {
			this.focusTrap()
		}, 50)
	}

	getHash() {
		if (this.options.hashSettings.location) {
			this.hash = this.targetOpen.selector.includes('#')
				? this.targetOpen.selector
				: this.targetOpen.selector.replace('.', '#')
		}
	}

	openToHash() {
		const classInHash = document.querySelector(
			`.${window.location.hash.replace('#', '')}`
		)
			? `.${window.location.hash.replace('#', '')}`
			: document.querySelector(`${window.location.hash}`)
			? `${window.location.hash}`
			: null
		const buttons =
			document.querySelector(
				`[${this.options.attributeOpenButton} = "${classInHash}"]`
			) ||
			document.querySelector(
				`[${this.options.attributeOpenButton} = "${classInHash.replace('.', '#')}"]`
			)

		if (buttons && classInHash) {
			this.open(classInHash)
		}
	}

	setHash() {
		history.pushState('', '', this.hash)
	}

	removeHash() {
		history.pushState('', '', window.location.href.split('#')[0])
	}

	focusCatch(e) {
		const focusable = this.targetOpen.element.querySelectorAll(this.focusEl)
		const focusArray = Array.prototype.slice.call(focusable)
		const focusedIndex = focusArray.indexOf(document.activeElement)

		if (e.shiftKey && focusedIndex === 0) {
			focusArray[focusArray.length - 1].focus()
			e.preventDefault()
		}

		if (!e.shiftKey && focusedIndex === focusArray.length - 1) {
			focusArray[0].focus()
			e.preventDefault()
		}
	}

	focusTrap() {
		const focusable = this.previousOpen.element.querySelectorAll(this.focusEl)

		!this.isOpen && this.lastFocusEl
			? this.lastFocusEl.focus()
			: focusable[0].focus()
	}
}

nodeObjects.popup = new Popup({})
