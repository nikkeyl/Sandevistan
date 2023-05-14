import { removeClasses } from '@js/helpers/removeClasses'

function toggleClasses(elem, className, array) {
    if (!elem.classList.contains(className)) {
        removeClasses(array, className)
        elem.classList.add(className)
    }
}

export { toggleClasses }
