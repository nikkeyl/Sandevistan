/* https://github.com/RobinHerbots/Inputmask */
import InputMask from 'inputmask/dist/inputmask.es6.js'
import { nodeObjects } from '@js/helpers/nodeList'

const inputMasks = document.querySelectorAll('input')

if (inputMasks.length) {
	nodeObjects.InputMask = new InputMask().mask(inputMasks)
}
