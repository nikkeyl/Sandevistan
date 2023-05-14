import Isotope from 'isotope-layout'

// Не использовать вместе с lazy load
/*
 *Для контейнера
 *@media (max-width: md(430)) {
 *	width: auto !important;
 *}
 *для карточки
 *@media (max-width: md(430)) {
 *	width: 100%;
 *}
 */

function filter() {
    function imagesInit() {
        const images = document.querySelectorAll('.article__image')

        images.forEach(image => {
            const imageItem = image.querySelector('img')
            const padding = (imageItem.offsetHeight / imageItem.offsetWidth) * 100

            image.style.paddingBottom = `${padding}%`
            imageItem.classList.add('init')
        })
    }

    function gridInit() {
        const items = document.querySelector('.articles__items')
        const itemsGrid = new Isotope(items, {
            itemSelector: '.article',
            masonry: {
                fitWidth: true,
                gutter: 20
            }
        })

        document.addEventListener('click', e => {
            const targetElement = e.target

            if (targetElement.closest('.filter__button')) {
                const filterItem = targetElement.closest('.filter__button')
                const filterValue = filterItem.dataset.filter
                const filterActiveItem = document.querySelector(
                    '.filter__button.active'
                )

                filterValue === '*'
                    ? itemsGrid.arrange({ filter: `` })
                    : itemsGrid.arrange({
                          filter: `[data-filter="${filterValue}"]`
                      })
                filterActiveItem.classList.remove('active')
                filterItem.classList.add('active')
                e.preventDefault()
            }
        })
    }

    window.addEventListener('load', () => {
        imagesInit()
        gridInit()
    })
}

export { filter }
