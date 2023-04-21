import { slideDown } from '@js/helpers/slideDown'
import { slideUp } from '@js/helpers/slideUp'

export let slideToggle = (target, duration = 500) => {
    if (target.hidden) {
        return slideDown(target, duration)
    } else {
        return slideUp(target, duration)
    }
}
