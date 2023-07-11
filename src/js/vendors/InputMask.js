/* https://github.com/RobinHerbots/Inputmask */
import { nodeObjects } from '@js/helpers/nodeList'

import InputMask from 'inputmask/dist/inputmask.es6.js'

const inputMasks = document.querySelectorAll('input')

if (inputMasks.length) {
	nodeObjects.InputMask = new InputMask().mask(inputMasks)
}
