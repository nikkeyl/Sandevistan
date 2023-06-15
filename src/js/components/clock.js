function clock() {
  window.addEventListener('load', () => {
    setInterval(() => {
      const currentDate = new Date()
      const time = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
      const clock = document.querySelector('[data-clock]')

      if (clock) {
        clock.innerHTML = time
      }
    }, 1000)
  })
}

export { clock }
