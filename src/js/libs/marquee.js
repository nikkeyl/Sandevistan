/*!
    Creeping line (Marquee plugin)
    https://mattiacoll.github.io/vanilla-marquee-site/
*/
import { nodeObjects } from '@js/helpers/nodeList'
import Marquee from 'vanilla-marquee'

if (document.querySelector('[data-marquee]')) {
    const elem = document.querySelector('[data-marquee]')
    const creepLine = new Marquee(elem, {
        css3easing: 'linear',
        delayBeforeStart: 1000,
        direction: 'left',
        duplicated: true,
        speed: 100,
        gap: 20,
        pauseOnHover: true,
        startVisible: true
    })

    nodeObjects.creepLine = creepLine
}
