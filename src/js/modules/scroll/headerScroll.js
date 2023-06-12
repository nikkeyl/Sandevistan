function headerScroll() {
  const header = document.querySelector('header.header')
  const headerShow = header.hasAttribute('data-scroll-show')
  const headerShowTimer = header.dataset.scrollShow || 500
  const startPoint = header.dataset.scroll || 1

  let scrollDirection = 0
  let timer

  document.addEventListener('scroll', () => {
    const scrollTop = window.scrollY

    clearTimeout(timer)

    if (scrollTop >= startPoint) {
      !header.classList.contains('header-scroll')
        ? header.classList.add('header-scroll')
        : null

      if (headerShow) {
        if (scrollTop > scrollDirection) {
          header.classList.contains('header-show')
            ? header.classList.remove('header-show')
            : null
        } else {
          !header.classList.contains('header-show')
            ? header.classList.add('header-show')
            : null
        }

        timer = setTimeout(() => {
          !header.classList.contains('header-show')
            ? header.classList.add('header-show')
            : null
        }, headerShowTimer)
      }
    } else {
      header.classList.contains('header-scroll')
        ? header.classList.remove('header-scroll')
        : null

      if (headerShow) {
        header.classList.contains('header-show')
          ? header.classList.remove('header-show')
          : null
      }
    }

    scrollDirection = scrollTop <= 0
      ? 0
      : scrollTop
  })
}

export { headerScroll }
