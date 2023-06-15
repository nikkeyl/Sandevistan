import { dataMediaQueries } from '@js/helpers/dataMedia'
import { slideDown } from '@js/helpers/slideDown'
import { slideUp } from '@js/helpers/slideUp'

function showMore() {
  window.addEventListener('load', () => {
    const showMoreBlocks = document.querySelectorAll('[data-showmore]')

    let showMoreBlocksRegular
    let mdQueriesArray

    if (showMoreBlocks.length) {
      showMoreBlocksRegular = Array.from(showMoreBlocks).filter(
        item => !item.dataset.showmoreMedia
      )
      showMoreBlocksRegular.length ? initItems(showMoreBlocksRegular) : null
      document.addEventListener('click', showMoreActions)
      window.addEventListener('resize', showMoreActions)
      mdQueriesArray = dataMediaQueries(showMoreBlocks, 'showmoreMedia')

      if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach(mdQueriesItem => {
          mdQueriesItem.matchMedia.addEventListener('change', () => {
            initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
          })
        })
        initItemsMedia(mdQueriesArray)
      }
    }

    function initItemsMedia(mdQueriesArray) {
      mdQueriesArray.forEach(mdQueriesItem =>
        initItems(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
      )
    }

    function initItems(showMoreBlocks, matchMedia) {
      showMoreBlocks.forEach(showMoreBlock => initItem(showMoreBlock, matchMedia))
    }

    function initItem(showMoreBlock, matchMedia = false) {
      showMoreBlock = matchMedia ? showMoreBlock.item : showMoreBlock

      let showMoreContent = showMoreBlock.querySelectorAll('[data-showmore-content]')
      let showMoreButton = showMoreBlock.querySelectorAll('[data-showmore-button]')

      showMoreContent = Array.from(showMoreContent).filter(
        item => item.closest('[data-showmore]') === showMoreBlock
      )[0]
      showMoreButton = Array.from(showMoreButton).filter(
        item => item.closest('[data-showmore]') === showMoreBlock
      )[0]

      const hiddenHeight = getHeight(showMoreBlock, showMoreContent)

      if (matchMedia.matches || !matchMedia) {
        if (hiddenHeight < getOriginalHeight(showMoreContent)) {
          slideUp(showMoreContent, 0, hiddenHeight)
          showMoreButton.hidden = false
        } else {
          slideDown(showMoreContent, 0, hiddenHeight)
          showMoreButton.hidden = true
        }
      }
    }

    function getHeight(showMoreBlock, showMoreContent) {
      const showMoreType = showMoreBlock.dataset.showmore || 'size'

      let hiddenHeight = 0

      if (showMoreType === 'items') {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent || 3

        const showMoreItems = showMoreContent.children

        for (let i = 1; i < showMoreItems.length; i++) {
          const showMoreItem = showMoreItems[i - 1]

          hiddenHeight += showMoreItem.offsetHeight

          if (i === showMoreTypeValue) {
            break
          }
        }
      } else {
        const showMoreTypeValue = showMoreContent.dataset.showmoreContent || 150

        hiddenHeight = showMoreTypeValue
      }

      return hiddenHeight
    }

    function getOriginalHeight(showMoreContent) {
      const hiddenHeight = showMoreContent.offsetHeight

      let parentHidden

      showMoreContent.style.removeProperty('height')

      if (showMoreContent.closest('[hidden]')) {
        parentHidden = showMoreContent.closest('[hidden]')
        parentHidden.hidden = false
      }

      const originalHeight = showMoreContent.offsetHeight

      parentHidden ? (parentHidden.hidden = true) : null
      showMoreContent.style.height = `${hiddenHeight}px`

      return originalHeight
    }

    function showMoreActions(e) {
      const targetEvent = e.target
      const targetType = e.type

      if (targetType === 'click') {
        if (targetEvent.closest('[data-showmore-button]')) {
          const showMoreButton = targetEvent.closest('[data-showmore-button]')
          const showMoreBlock = showMoreButton.closest('[data-showmore]')
          const showMoreContent = showMoreBlock.querySelector(
            '[data-showmore-content]'
          )
          const showMoreSpeed = showMoreButton.dataset.showmoreButton || '500'
          const hiddenHeight = getHeight(showMoreBlock, showMoreContent)

          if (!showMoreContent.classList.contains('slide')) {
            showMoreBlock.classList.contains('showmore-active')
              ? slideUp(showMoreContent, showMoreSpeed, hiddenHeight)
              : slideDown(showMoreContent, showMoreSpeed, hiddenHeight)

            showMoreBlock.classList.toggle('showmore-active')
          }
        }
      } else if (targetType === 'resize') {
        showMoreBlocksRegular && showMoreBlocksRegular.length
          ? initItems(showMoreBlocksRegular)
          : null
        mdQueriesArray && mdQueriesArray.length
          ? initItemsMedia(mdQueriesArray)
          : null
      }
    }
  })
}

export { showMore }
