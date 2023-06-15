import { html } from '@js/helpers/nodeList'

function webp() {
  function testWebp(callback) {
    const webp = new Image()

    webp.onload = webp.onerror = () => callback(webp.height === 2)
    webp.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  }

  testWebp(support => html.classList.add(support === true ? 'webp' : 'no-webp'))
}

export { webp }
