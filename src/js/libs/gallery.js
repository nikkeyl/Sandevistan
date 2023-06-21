/* https://www.lightgalleryjs.com/ */
import { nodeObjects } from '@js/helpers/nodeList'
import lightGallery from 'lightgallery'

// Import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
// Import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.min.js'

import '@scss/vendors/gallery/lightgallery'

// Import '@scss/vendors/gallery/lg-relative-caption'
// Import '@scss/vendors/gallery/lightgallery-bundle'
// Import '@scss/vendors/gallery/lg-medium-zoom'
// Import '@scss/vendors/gallery/lg-fullscreen'
// Import '@scss/vendors/gallery/lg-thumbnail'
// Import '@scss/vendors/gallery/lg-autoplay'
// Import '@scss/vendors/gallery/lg-comments'
// Import '@scss/vendors/gallery/lg-rotate'
// Import '@scss/vendors/gallery/lg-video'
// Import '@scss/vendors/gallery/lg-pager'
// Import '@scss/vendors/gallery/lg-share'
// Import '@scss/vendors/gallery/lg-zoom'

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
