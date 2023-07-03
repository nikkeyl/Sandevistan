/*!
    Creeping line (Marquee plugin)
    https://mattiacoll.github.io/vanilla-marquee-site/
*/
import Marquee from 'vanilla-marquee'

const marquee = document.querySelector('[role="marquee"]')

if (marquee) {
	new Marquee(marquee, {
		css3easing: 'linear',
		delayBeforeStart: 1000,
		direction: 'left',
		duplicated: true,
		speed: 100,
		gap: 20,
		pauseOnHover: true,
		startVisible: true
	})
}
