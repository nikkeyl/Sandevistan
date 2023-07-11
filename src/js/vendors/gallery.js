/* https://www.lightgalleryjs.com/ */
import { nodeObjects } from '@js/helpers/nodeList'

import lightGallery from 'lightgallery'

// import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
// import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.min.js'

import '@scss/vendors/gallery/lightgallery'

// import '@scss/vendors/gallery/lg-relative-caption'
// import '@scss/vendors/gallery/lightgallery-bundle'
// import '@scss/vendors/gallery/lg-medium-zoom'
// import '@scss/vendors/gallery/lg-fullscreen'
// import '@scss/vendors/gallery/lg-thumbnail'
// import '@scss/vendors/gallery/lg-autoplay'
// import '@scss/vendors/gallery/lg-comments'
// import '@scss/vendors/gallery/lg-rotate'
// import '@scss/vendors/gallery/lg-video'
// import '@scss/vendors/gallery/lg-pager'
// import '@scss/vendors/gallery/lg-share'
// import '@scss/vendors/gallery/lg-zoom'

const galleries = document.querySelectorAll('[data-gallery]')
const galleryItems = []

galleries.forEach(gallery => {
	galleryItems.push({
		gallery,
		galleryClass: lightGallery(gallery, {
			// Plugins: [lgZoom, lgThumbnail],
			licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
			speed: 500
		})
	})
})

nodeObjects.gallery = galleryItems
