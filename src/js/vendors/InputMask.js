/* https://robinherbots.github.io/Inputmask/#/documentation */
import { nodeObjects } from '@js/helpers/nodeList'

import InputMask from 'inputmask/dist/inputmask.es6.js'

const inputMasks = document.querySelectorAll('input')

if (inputMasks.length) {
	nodeObjects.InputMask = new InputMask().mask(inputMasks)
}
