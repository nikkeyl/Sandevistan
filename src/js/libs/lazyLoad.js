/*!
 * Lazy image upload (Lazy-load plugin)
 * https://github.com/verlok/vanilla-lazyload
 */
import LazyLoad from 'vanilla-lazyload'

const lazyMedia = new LazyLoad({
	elements_selector: '[data-src],[data-srcset]',
	class_loaded: 'lazy-loaded',
	use_native: true
})
// lazyMedia.update() только при ajax подгрузке контента

export { lazyMedia }
