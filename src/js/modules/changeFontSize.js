import { toggleClasses } from '@js/helpers/toggleClasses'

function changeFontSize() {
    window.addEventListener('load', () => {
        const range = document.querySelector('[data-font-range]')
        const value = document.querySelector('[data-font-value]')
        const text = document.querySelector('[data-font-item]')

        function addSize(value) {
            text.style.fontSize = `${parseInt(value)}px`
        }

        if (text) {
            if (range && value) {
                addSize(range.value)
                value.innerHTML = range.value
                range.oninput = () => {
                    addSize(range.value)
                    value.innerHTML = range.value
                }
            }

            document.addEventListener('click', e => {
                const targetElement = e.target

                if (targetElement.closest('[data-font-size]')) {
                    addSize(targetElement.dataset.fontSize)
                    toggleClasses(targetElement, 'active', '[data-font-size].active')
                }
            })
        }
    })
}

export { changeFontSize }
