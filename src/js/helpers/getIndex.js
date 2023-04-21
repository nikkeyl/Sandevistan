export function getIndex(el) {
    return Array.from(el.parentNode.children).indexOf(el)
}
