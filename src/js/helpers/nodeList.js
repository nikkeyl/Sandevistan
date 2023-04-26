/*!
When the lock class is added, the scrollbar is removed,
and elements with the [data-lp] attribute are set to {padding-right},
which is equal to the width of the scrollbar
*/
export const lockPadding = document.querySelectorAll('[data-lp]')
export const body = document.querySelector('body')
export const html = document.documentElement
/*! Plugin connection object */
export const nodeObjects = {}
