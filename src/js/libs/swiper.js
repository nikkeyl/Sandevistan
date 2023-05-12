/*
 *!
 * Slider (Swiper plugin)
 * https://swiperjs.com/
 */
// Import { getIndex } from '@js/helpers/getIndex'
import Swiper, { Navigation } from 'swiper'

/*
 *Pagination,
 *EffectFade,
 *Controller,
 *Scrollbar,
 *Autoplay,
 *Parallax,
 */

import '@scss/components/swiper'

// Import '@scss/libs/swiper'

function initSliders() {
	if (document.querySelector('.swiper')) {
		new Swiper('.swiper', {
			modules: [Navigation],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,

			/*
			 * TouchRatio: 0,
			 * SimulateTouch: true,
			 * Loop: true,
			 * PreloadImages: true,
			 * Lazy: true,
			 */
			/*
			 *Effect: 'fade',
			 *autoplay: {
			 *	delay: 3000,
			 *	disableOnInteraction: false
			 *},
			 */
			/*
			 *Pagination: {
			 *	el: '.swiper-pagination',
			 *	clickable: true
			 *},
			 */
			/*
			 *Scrollbar: {
			 *	el: '.swiper-scrollbar',
			 *	draggable: true
			 *},
			 */
			navigation: {
				prevEl: '.swiper-button-prev',
				nextEl: '.swiper-button-next'
			},

			/*
			 *Breakpoints: {
			 *	320: {
			 *		slidesPerView: 1,
			 *		spaceBetween: 0,
			 *		autoHeight: true
			 *	},
			 *	768: {
			 *		slidesPerView: 2,
			 *		spaceBetween: 20
			 *	},
			 *	992: {
			 *		slidesPerView: 3,
			 *		spaceBetween: 20
			 *	},
			 *	1268: {
			 *		slidesPerView: 4,
			 *		spaceBetween: 30
			 *	}
			 *},
			 */
			on: {
				/* Fix: применить при не правильном числе слайдов */
				/*
				 * Init: swiper => {
				 * const allSlides = document.querySelector(
				 * '.fraction-controll__all'
				 * )
				 * const allSlidesItems = document.querySelectorAll(
				 * '.slide-main-block:not(.swiper-slide-duplicate)'
				 * )
				 * allSlides.innerHTML =
				 * allSlidesItems.length < 10
				 * ? `0${allSlidesItems.length}`
				 * : allSlidesItems.length
				 * },
				 * slideChange: swiper => {
				 * const currentSlide = document.querySelector(
				 * '.fraction-controll__current'
				 * )
				 * currentSlide.innerHTML =
				 * swiper.realIndex + 1 < 10
				 * ? `0${swiper.realIndex + 1}`
				 * : swiper.realIndex + 1
				 * }
				 */
			}
		})
	}

	/*
	 * If (document.querySelector('.swiper')) {
	 * const pageSlider = new Swiper('.slider', {
	 * modules: [Scrollbar, Controller],
	 * speed: 1000,
	 * scrollbar: {
	 * el: '.slider__scrollbar',
	 * draggable: true
	 * },
	 * breakpoints: {
	 * 320: {
	 *	 slidesPerView: 1,
	 *	 centeredSlides: false
	 * },
	 * 992: {
	 *	 slidesPerView: 2,
	 *	 centeredSlides: true
	 * }
	 * }
	 * })
	 * const page = document.querySelector('.content')
	 * const images = document.querySelectorAll('.slide__picture')
	 *
	 * if (images.length) {
	 * let backgroundSlides = ``
	 * let textSlides = ``
	 *
	 * images.forEach(image => {
	 * backgroundSlides += `
	 *	 <div class="swiper-slide background__slide">
	 *		 <div class="background__image">
	 *			 <img src="${image.getAttribute('data-src')}" alt="${image.alt}">
	 *		 </div>
	 *	 </div>
	 * `
	 * textSlides += `
	 *	 <div class="swiper-slide text__slide">
	 *		 <span>${image.dataset.title ? image.dataset.title : ''}</span>
	 *	 </div>
	 * `
	 * })
	 *
	 * const background = `
	 * <div class="background swiper">
	 * <div class="swiper-wrapper background__wrapper">
	 *	 ${backgroundSlides}
	 * </div>
	 * </div>
	 * `
	 * const text = `
	 * <div class="text swiper">
	 * <div class="swiper-wrapper text__wrapper">
	 *	 ${textSlides}
	 * </div>
	 * </div>
	 * `
	 *
	 * page.insertAdjacentHTML('afterbegin', background)
	 * page.insertAdjacentHTML('beforeend', text)
	 *
	 * const pageBgSlider = new Swiper('.background', {
	 * modules: [Controller],
	 * speed: 500
	 * })
	 * const pageTextSlider = new Swiper('.text', {
	 * modules: [EffectFade],
	 * effect: 'fade',
	 * fadeEffect: {
	 *	 crossFade: true
	 * },
	 * speed: 1000
	 * })
	 *
	 * pageSlider.controller.control = pageBgSlider
	 * pageBgSlider.controller.control = pageTextSlider
	 * }
	 *
	 * const speed = 800
	 *
	 * document.addEventListener('click', e => {
	 * const targetElement = e.target
	 * const textBlock = document.querySelector('.text')
	 *
	 * textBlock.style.transitionDuration = `${speed}ms`
	 *
	 * if (targetElement.closest('.slide')) {
	 * const slide = targetElement.closest('.slide')
	 * const slideImage = slide.querySelector('img')
	 * const activeImage = document.querySelector(
	 *	 '.slide__picture.active'
	 * )
	 *
	 * if (slide.classList.contains('swiper-slide-active')) {
	 *	 slideImage.classList.add('active')
	 *	 textBlock.classList.add('active')
	 *	 imageOpen(slideImage)
	 * } else {
	 *	 activeImage ? activeImage.classList.remove('active') : null
	 *	 pageSlider.slideTo(getIndex(slide))
	 * }
	 *
	 * e.preventDefault()
	 * }
	 *
	 * if (targetElement.closest('.open-image')) {
	 * const openIamge = targetElement.closest('.open-image')
	 * const activeIamge = document.querySelector(
	 *	 '.slide__picture.active'
	 * )
	 * const imagePos = getImagePos(activeIamge)
	 *
	 * openIamge.style.cssText = `
	 *	 position: fixed;
	 *	 left: ${imagePos.left}px;
	 *	 top: ${imagePos.top}px;
	 *	 width: ${imagePos.width}px;
	 *	 height: ${imagePos.height}px;
	 *	 transition: all ${speed}ms;
	 * `
	 * setTimeout(() => {
	 *	 activeIamge.classList.remove('active')
	 *	 activeIamge.style.opacity = 1
	 *	 openIamge.remove()
	 * }, speed)
	 * textBlock.classList.remove('active')
	 * }
	 * })
	 *
	 * function imageOpen(image) {
	 * const imagePos = getImagePos(image)
	 * const openImage = image.cloneNode()
	 * const openImageBlock = document.createElement('div')
	 *
	 * openImageBlock.classList.add('open-image')
	 * openImageBlock.append(openImage)
	 * openImageBlock.style.cssText = `
	 * position: fixed;
	 * left: ${imagePos.left}px;
	 * top: ${imagePos.top}px;
	 * width: ${imagePos.width}px;
	 * height: ${imagePos.height}px;
	 * transition: all ${speed}ms;
	 * `
	 * document.body.append(openImageBlock)
	 * setTimeout(() => {
	 * image.style.opacity = 0
	 * openImageBlock.style.left = 0
	 * openImageBlock.style.top = 0
	 * openImageBlock.style.width = '100%'
	 * openImageBlock.style.height = '100%'
	 * }, 0)
	 * }
	 *
	 * function getImagePos(image) {
	 * return {
	 * left: image.getBoundingClientRect().left,
	 * top: image.getBoundingClientRect().top,
	 * width: image.offsetWidth,
	 * height: image.offsetHeight
	 * }
	 * }
	 * }
	 */
}

/*
 * Const sliderMouseMove = new Swiper('[data-mousemove-swipe]', {
 * 	Modules: [Pagination],
 * 	// spaceBetween: 10,
 * 	// speed: 800,
 * 	Pagination: {
 * 		El: '.swiper-pagination'
 * 	}
 * })
 */

// /*! Mouse move slide */
// Function sliderMouseSlideInit() {
// 	Document.addEventListener('mousemove', e => {
// 		Const targetElement = e.target

/*
 * 		If (targetElement.closest('[data-mousemove-swipe]')) {
 * 			Const sliderElement = targetElement.closest(
 * 				'[data-mousemove-swipe]'
 * 			)
 * 			Const sliderItem = sliderMouseMove
 * 			Const sliderLength = sliderItem.slides.length
 */

/*
 * 			If (sliderLength > 1) {
 * 				Const sliderWidth = sliderItem.width
 * 				Const sliderPath = Math.round(sliderWidth / sliderLength)
 * 				Const sliderMousePos = e.clientX - sliderElement.offsetLeft
 * 				Const sliderSlide = Math.floor(sliderMousePos / sliderPath)
 */

/*
 * 				SliderItem.slideTo(sliderSlide)
 * 			}
 * 		}
 * 	})
 * }
 */

window.addEventListener('load', () => {
	initSliders()

	/*
	 * Document.querySelector('[data-mousemove-swipe]')
	 * 	? sliderMouseSlideInit()
	 * 	: null
	 */
})
