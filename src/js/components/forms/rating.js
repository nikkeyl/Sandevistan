function rating() {
	const ratings = document.querySelectorAll('.rating')

	ratings.length > 0 ? initRatings() : null

	function initRatings() {
		let ratingActive
		let ratingValue

		ratings.forEach(rating => initRating(rating))

		function initRating(rating) {
			initRatingVars(rating)
			setRatingActiveWidth()
			rating.classList.contains('rating--set') ? setRating(rating) : null
		}

		function initRatingVars(rating) {
			ratingActive = rating.querySelector('.rating__active')
			ratingValue = rating.querySelector('.rating__value')
		}

		function setRatingActiveWidth(index = ratingValue.innerHTML) {
			const ratingActiveWidth = index / 0.05

			ratingActive.style.width = `${ratingActiveWidth}%`
		}

		function setRating(rating) {
			const ratingStars = rating.querySelectorAll('.rating__star')

			for (let index = 0; index < ratingStars.length; index++) {
				const ratingStar = ratingStars[index]

				ratingStar.addEventListener('mouseenter', () => {
					initRatingVars(rating)
					setRatingActiveWidth(ratingStar.value)
				})
				ratingStar.addEventListener('mouseleave', () => {
					setRatingActiveWidth()
				})
				ratingStar.addEventListener('click', () => {
					initRatingVars(rating)

					if (rating.dataset.ajax) {
						setRatingValue(ratingStar.value, rating)
					} else {
						ratingValue.innerHTML = index + 1
						setRatingActiveWidth()
					}
				})
			}
		}

		async function setRatingValue(rating) {
			if (!rating.classList.contains('rating--sending')) {
				rating.classList.add('rating--sending')

				const response = await fetch('rating.json', {
					method: 'GET'

					// Body: JSON.stringify({
					//     UserRating: value
					// }),
					// Headers: {
					//     'content-type': 'application/json'
					// }
				})

				if (response.ok) {
					const result = await response.json()
					const newRating = result.newRating

					ratingValue.innerHTML = newRating
					setRatingActiveWidth()
					rating.classList.remove('rating--sending')
				} else {
					alert('Error')
					rating.classList.remove('rating--sending')
				}
			}
		}
	}
}

export { rating }
