import { removeClasses } from '@js/helpers/removeClasses'
import { dataMediaQueries } from '@js/helpers/dataMedia'
import { slideDown } from '@js/helpers/slideDown'
import { slideUp } from '@js/helpers/slideUp'
import { getHash } from '@js/helpers/getHash'
import { setHash } from '@js/helpers/setHash'

function tabs() {
    const tabs = document.querySelectorAll('[data-tabs]')
    const hash = getHash()

    let tabsActiveHash = []

    hash && hash.startsWith('tab-')
        ? tabsActiveHash = hash.replace('tab-', '').split('-')
        : null
    tabs.forEach((tabsBlock, index) => {
        tabsBlock.classList.add('tab-init')
        tabsBlock.setAttribute('data-tabs-index', index)
        tabsBlock.addEventListener('click', setTabsAction)
        initTabs(tabsBlock)
    })

    const mdQueriesArray = dataMediaQueries(tabs, 'tabs')

    if (mdQueriesArray && mdQueriesArray.length) {
        mdQueriesArray.forEach(mdQueriesItem => {
            mdQueriesItem.matchMedia.addEventListener('change', () => {
                setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
            })
            setTitlePosition(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia)
        })
    }

    function setTitlePosition(tabsMediaArray, matchMedia) {
        tabsMediaArray.forEach(tabsMediaItem => {
            tabsMediaItem = tabsMediaItem.item

            const tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]')
            const tabsContent = tabsMediaItem.querySelector('[data-tabs-body]')

            let tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]')
            let tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]')

            tabsTitleItems = Array.from(tabsTitleItems).filter(
                item => item.closest('[data-tabs]') === tabsMediaItem
            )
            tabsContentItems = Array.from(tabsContentItems).filter(
                item => item.closest('[data-tabs]') === tabsMediaItem
            )
            tabsContentItems.forEach((tabsContentItem, index) => {
                if (matchMedia.matches) {
                    tabsContent.append(tabsTitleItems[index])
                    tabsContent.append(tabsContentItem)
                    tabsMediaItem.classList.add('tab-spoller')
                } else {
                    tabsTitles.append(tabsTitleItems[index])
                    tabsMediaItem.classList.remove('tab-spoller')
                }
            })
        })
    }

    function initTabs(tabsBlock) {
        const tabsBlockIndex = tabsBlock.dataset.tabsIndex
        const tabsActiveHashBlock = tabsActiveHash[0] === tabsBlockIndex

        let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*')
        let tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*')

        if (tabsActiveHashBlock) {
            const tabsActiveTitle = tabsBlock.querySelector(
                '[data-tabs-titles]>.tab-active'
            )

            tabsActiveTitle?.classList.remove('tab-active')
        }

        tabsContent = Array.from(tabsContent).filter(
            item => item.closest('[data-tabs]') === tabsBlock
        )
        tabsTitles = Array.from(tabsTitles).filter(
            item => item.closest('[data-tabs]') === tabsBlock
        )
        tabsContent.forEach((tabsContentItem, index) => {
            tabsTitles[index].setAttribute('data-tabs-title', '')
            tabsContentItem.setAttribute('data-tabs-item', '')
            tabsActiveHashBlock && index === tabsActiveHash[1]
                ? tabsTitles[index].classList.add('tab-active')
                : null
            tabsContentItem.hidden =
                !tabsTitles[index].classList.contains('tab-active')
        })
    }

    function setTabsStatus(tabsBlock) {
        const tabsBlockIndex = tabsBlock.dataset.tabsIndex

        let tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]')
        let tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]')

        function isTabsAnamate(tabsBlock) {
            if (tabsBlock.hasAttribute('data-tabs-animate')) {
                return +tabsBlock.dataset.tabsAnimate || 500
            }
        }

        const tabsBlockAnimate = isTabsAnamate(tabsBlock)
        const isHash = tabsBlock.hasAttribute('data-tabs-hash')

        tabsContent = Array.from(tabsContent).filter(
            item => item.closest('[data-tabs]') === tabsBlock
        )
        tabsTitles = Array.from(tabsTitles).filter(
            item => item.closest('[data-tabs]') === tabsBlock
        )
        tabsContent.forEach((tabsContentItem, index) => {
            if (tabsTitles[index].classList.contains('tab-active')) {
                tabsBlockAnimate
                    ? slideDown(tabsContentItem, tabsBlockAnimate)
                    : tabsContentItem.hidden = false
                isHash && !tabsContentItem.closest('.popup')
                    ? setHash(`tab-${tabsBlockIndex}-${index}`)
                    : null
            } else if (tabsBlockAnimate) {
                slideUp(tabsContentItem, tabsBlockAnimate)
            } else {
                tabsContentItem.hidden = true
            }
        })
    }

    function setTabsAction(e) {
        const el = e.target

        if (el.closest('[data-tabs-title]')) {
            const tabTitle = el.closest('[data-tabs-title]')
            const tabsBlock = tabTitle.closest('[data-tabs]')

            if (
                !tabTitle.classList.contains('tab-active') &&
                !tabsBlock.querySelector('.slide')
            ) {
                let tabActiveTitle = tabsBlock.querySelectorAll(
                    '[data-tabs-title].tab-active'
                )

                tabActiveTitle.length
                    ? tabActiveTitle = Array.from(tabActiveTitle).filter(
                          item => item.closest('[data-tabs]') === tabsBlock
                      )
                    : null
                removeClasses('[data-tabs-title].tab-active', 'tab-active')
                tabTitle.classList.add('tab-active')
                setTabsStatus(tabsBlock)
            }

            e.preventDefault()
        }
    }
}

export { tabs }
