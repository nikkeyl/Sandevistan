/*!
 * Creeping line (Marquee plugin)
 * https://mattiacoll.github.io/vanilla-marquee-site/
 */
import { nodeObjects } from '@js/helpers/nodeList'
import marquee from 'vanilla-marquee'

if (document.querySelector('[data-marquee]')) {
    const creepLine = new marquee({
        css3easing: 'linear',
        delayBeforeStart: 1000,
        direction: 'left',
        duplicated: true,
        // duration: 15000,
        speed: 100,
        gap: 20,
        pauseOnHover: true,
        startVisible: true,
        recalcResize: true
    })
    nodeObjects.creepLine = creepLine
}
