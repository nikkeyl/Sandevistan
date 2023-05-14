import { slideDown } from '@js/helpers/slideDown'
import { slideUp } from '@js/helpers/slideUp'

const slideToggle = (target, duration = 500) => {
    target.hidden ? slideDown(target, duration) : slideUp(target, duration)
}

export { slideToggle }
