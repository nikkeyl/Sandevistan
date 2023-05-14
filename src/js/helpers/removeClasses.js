function removeClasses(array, className) {
    document
        .querySelectorAll(array)
        .forEach(item => item.classList.remove(className))
}

export { removeClasses }
