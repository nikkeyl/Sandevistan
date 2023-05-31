/*!
    When the lock class is added, the scrollbar is removed,
    and elements with the [data-lp] attribute are set to {padding-right},
    which is equal to the width of the scrollbar
*/
const lockPadding = document.querySelectorAll('[data-lp]')
const html = document.documentElement
const body = document.body

/*! Plugin connection object */
const nodeObjects = {}

export {
	lockPadding, nodeObjects, html, body
}
