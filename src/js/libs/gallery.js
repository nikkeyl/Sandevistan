import { nodeObjects } from '@js/helpers/nodeList'
import lightGallery from 'lightgallery'

//import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
//import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.min.js'

import '@scss/libs/gallery/lightgallery'
//import '@scss/libs/gallery/lg-relative-caption'
//import '@scss/libs/gallery/lightgallery-bundle'
//import '@scss/libs/gallery/lg-medium-zoom'
//import '@scss/libs/gallery/lg-fullscreen'
//import '@scss/libs/gallery/lg-thumbnail'
//import '@scss/libs/gallery/lg-autoplay'
//import '@scss/libs/gallery/lg-comments'
//import '@scss/libs/gallery/lg-rotate'
//import '@scss/libs/gallery/lg-video'
//import '@scss/libs/gallery/lg-pager'
//import '@scss/libs/gallery/lg-share'
//import '@scss/libs/gallery/lg-zoom'

const galleries = document.querySelectorAll('[data-gallery]')
if (galleries.length) {
	const galleryItems = []
	galleries.forEach(gallery => {
		galleryItems.push({
			gallery,
			galleryClass: lightGallery(gallery, {
				// plugins: [lgZoom, lgThumbnail],
				licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
				speed: 500
			})
		})
	})
	nodeObjects.gallery = galleryItems
}
