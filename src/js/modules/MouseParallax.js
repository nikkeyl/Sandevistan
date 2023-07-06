import { isMobile } from '@js/helpers/isMobile'

class MouseParallax {
	constructor() {
		this.config = isMobile.any() ? false : true

		if (this.config) {
			const parallaxMouse = document.querySelectorAll('[data-parallax-mouse]')

			if (parallaxMouse.length) {
				this.parallaxMouseInit(parallaxMouse)
			}
		}
	}

	parallaxMouseInit(parallaxMouse) {
		parallaxMouse.forEach(el => {
			const parallaxMouseWrapper = el.closest('[data-parallax-mouse-wrapper]')
			const paramCoefficientX = +el.dataset.parallaxCx || 100
			const paramCoefficientY = +el.dataset.parallaxCy || 100
			const directionX = el.hasAttribute('data-parallax-dxr') ? -1 : 1
			const directionY = el.hasAttribute('data-parallax-dyr') ? -1 : 1
			const paramAnimation = +el.dataset.parallaxA || 50

			let positionX = 0
			let positionY = 0
			let percentCoordX = 0
			let percentCoordY = 0

			function setMouseParallaxStyle() {
				const distX = percentCoordX - positionX
				const distY = percentCoordY - positionY

				positionX = positionX + (distX * paramAnimation) / 1000
				positionY = positionY + (distY * paramAnimation) / 1000
				el.style.cssText = `transform: translate3D(${(directionX * positionX) / (paramCoefficientX / 10)
					}%, ${(directionY * positionY) / (paramCoefficientY / 10)}%, 0);`
				requestAnimationFrame(setMouseParallaxStyle)
			}

			function mouseMoveParallax(wrapper = window) {
				wrapper.addEventListener('mousemove', e => {
					const offsetTop = el.getBoundingClientRect().top + window.scrollY

					if (
						offsetTop >= window.scrollY ||
						offsetTop + el.offsetHeight >= window.scrollY
					) {
						const parallaxWidth = window.innerWidth
						const parallaxHeight = window.innerHeight
						const coordX = e.clientX - parallaxWidth / 2
						const coordY = e.clientY - parallaxHeight / 2

						percentCoordX = (coordX / parallaxWidth) * 100
						percentCoordY = (coordY / parallaxHeight) * 100
					}
				})
			}

			setMouseParallaxStyle()

			parallaxMouseWrapper
				? mouseMoveParallax(parallaxMouseWrapper)
				: mouseMoveParallax()
		})
	}
}

export { MouseParallax }
