function counter() {
  window.addEventListener('load', () => {
    function digitsCountersAnimate(digitsCounter) {
      const duration = parseInt(digitsCounter.dataset.digitsCounter) || 1000
      const startValue = parseInt(digitsCounter.innerHTML)
      const startPosition = 0

      let startTimestamp

      const step = timestamp => {
        if (!startTimestamp) {
          startTimestamp = timestamp
        }

        const progress = Math.min((timestamp - startTimestamp) / duration, 1)

        digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue))
        progress < 1 && window.requestAnimationFrame(step)
      }

      window.requestAnimationFrame(step)
    }

    function digitsCountersInit(digitsCountersItems) {
      digitsCountersItems.forEach(digitsCounter =>
        digitsCountersAnimate(digitsCounter)
      )
    }

    const options = { threshold: 0.3 }
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(({ isIntersecting, target }) => {
        if (isIntersecting) {
          const digitsCountersItems = target.querySelectorAll(
            '[data-digits-counter]'
          )

          digitsCountersInit(digitsCountersItems)
          observer.unobserve(target)
        }
      })
    }, options)
    const sections = document.querySelectorAll('[data-digits-counter-wrapper]')

    sections.forEach(section => observer.observe(section))
  })
}

export { counter }
