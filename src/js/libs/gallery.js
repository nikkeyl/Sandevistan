/* https://www.lightgalleryjs.com/ */

import { nodeObjects } from '@js/helpers/nodeList'
import lightGallery from 'lightgallery'

/*
 * Import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
 * Import lgZoom from 'lightgallery/plugins/zoom/lg-zoom.min.js'
 */

import '@scss/libs/gallery/lightgallery'

/*
 * Import '@scss/libs/gallery/lg-relative-caption'
 * Import '@scss/libs/gallery/lightgallery-bundle'
 * Import '@scss/libs/gallery/lg-medium-zoom'
 * Import '@scss/libs/gallery/lg-fullscreen'
 * Import '@scss/libs/gallery/lg-thumbnail'
 * Import '@scss/libs/gallery/lg-autoplay'
 * Import '@scss/libs/gallery/lg-comments'
 * Import '@scss/libs/gallery/lg-rotate'
 * Import '@scss/libs/gallery/lg-video'
 * Import '@scss/libs/gallery/lg-pager'
 * Import '@scss/libs/gallery/lg-share'
 * Import '@scss/libs/gallery/lg-zoom'
 */

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
