/*! Dynamiс adapt https://github.com/FreelancerLifeStyle/dynamic_adapt */

import { uniqArray } from '@js/helpers/uniqArray'

class DynamicAdapt {
  constructor(type) {
    this.type = type
  }

  init() {
    this.objects = []
    this.daClassname = 'dynamic-adapt'
    this.nodes = [...document.querySelectorAll('[data-da]')]
    this.nodes.forEach(node => {
      const data = node.dataset.da.trim()
      const dataArray = data.split(',')
      const object = {}

      object.element = node
      object.parent = node.parentNode
      object.destination = document.querySelector(`${dataArray[0].trim()}`)
      object.breakpoint = dataArray[1]?.trim() || '767.98'
      object.place = dataArray[2]?.trim() || 'last'
      this.objects.push(object)
    })
    this.arraySort(this.objects)
    this.mediaQueries = uniqArray(this.objects.map(({ breakpoint }) => `(${this.type}-width: ${breakpoint}px),${breakpoint}`))
    this.mediaQueries.forEach(media => {
      const mediaSplit = media.split(',')
      const matchMedia = window.matchMedia(mediaSplit[0])
      const mediaBreakpoint = mediaSplit[1]
      const objectsFilter = this.objects.filter(({ breakpoint }) => breakpoint === mediaBreakpoint)

      matchMedia.addEventListener('change', () => {
        this.mediaHandler(matchMedia, objectsFilter)
      })
      this.mediaHandler(matchMedia, objectsFilter)
    })
  }

  mediaHandler(matchMedia, objects) {
    if (matchMedia.matches) {
      objects.forEach(object => {
        this.moveTo(object.place, object.element, object.destination)
      })
    } else {
      objects.forEach(({
        parent, element, index
      }) => {
        if (element.classList.contains(this.daClassname)) {
          this.moveBack(parent, element, index)
        }
      })
    }
  }

  moveTo(place, element, destination) {
    element.classList.add(this.daClassname)

    if (place === 'last' || place >= destination.children.length) {
      destination.append(element)

      return
    }

    if (place === 'first') {
      destination.prepend(element)

      return
    }

    destination.children[place].before(element)
  }

  moveBack(parent, element, index) {
    element.classList.remove(this.daClassname)
    parent.children[index]
      ? parent.children[index].before(element)
      : parent.append(element)
  }

  arraySort(arr) {
    if (this.type === 'min') {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0
          }

          if (a.place === 'first' || b.place === 'last') {
            return -1
          }

          if (a.place === 'last' || b.place === 'first') {
            return 1
          }

          return 0
        }

        return a.breakpoint - b.breakpoint
      })
    } else {
      arr.sort((a, b) => {
        if (a.breakpoint === b.breakpoint) {
          if (a.place === b.place) {
            return 0
          }

          if (a.place === 'first' || b.place === 'last') {
            return 1
          }

          if (a.place === 'last' || b.place === 'first') {
            return -1
          }

          return 0
        }

        return b.breakpoint - a.breakpoint
      })

      return
    }
  }
}

export { DynamicAdapt }
