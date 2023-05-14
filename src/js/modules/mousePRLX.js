import { isMobile } from '@js/helpers/isMobile'

class MousePRLX {
    constructor() {
        this.config = isMobile.any() ? false : true

        if (this.config) {
            const paralaxMouse = document.querySelectorAll('[data-prlx-mouse]')

            if (paralaxMouse.length) {
                this.paralaxMouseInit(paralaxMouse)
            }
        }
    }

    paralaxMouseInit(paralaxMouse) {
        paralaxMouse.forEach(el => {
            const paralaxMouseWrapper = el.closest('[data-prlx-mouse-wrapper]')
            const paramCoefficientX = +el.dataset.prlxCx || 100
            const paramCoefficientY = +el.dataset.prlxCy || 100
            const directionX = el.hasAttribute('data-prlx-dxr') ? -1 : 1
            const directionY = el.hasAttribute('data-prlx-dyr') ? -1 : 1
            const paramAnimation = +el.dataset.prlxA || 50

            let positionX = 0,
                positionY = 0
            let coordXprocent = 0,
                coordYprocent = 0

            function setMouseParallaxStyle() {
                const distX = coordXprocent - positionX
                const distY = coordYprocent - positionY

                positionX = positionX + (distX * paramAnimation) / 1000
                positionY = positionY + (distY * paramAnimation) / 1000
                el.style.cssText = `transform: translate3D(${
                    (directionX * positionX) / (paramCoefficientX / 10)
                }%, ${(directionY * positionY) / (paramCoefficientY / 10)}%, 0);`
                requestAnimationFrame(setMouseParallaxStyle)
            }

            function mouseMoveParalax(wrapper = window) {
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

                        coordXprocent = (coordX / parallaxWidth) * 100
                        coordYprocent = (coordY / parallaxHeight) * 100
                    }
                })
            }

            setMouseParallaxStyle()

            paralaxMouseWrapper
                ? mouseMoveParalax(paralaxMouseWrapper)
                : mouseMoveParalax()
        })
    }
}

export { MousePRLX }
