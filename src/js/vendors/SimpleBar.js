/*!
    Custom scrollbar (Simplebar plugin)
    https://github.com/Grsmto/simplebar/tree/master/packages/simplebar
*/
import SimpleBar from 'simplebar'

import '@scss/vendors/simplebar'

if (document.querySelectorAll('[data-simplebar]').length) {
	document.querySelectorAll('[data-simplebar]').forEach(scrollBlock => {
		new SimpleBar(scrollBlock, {
			scrollBarMinSize: 100,
			autoHide: false
		})
	})
}
