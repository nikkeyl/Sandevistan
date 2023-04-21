import Inputmask from 'inputmask/dist/inputmask.es6.js'
import { nodeObjects } from '@js/helpers/nodeList'

const inputMasks = document.querySelectorAll('input')
if (inputMasks.length) {
    nodeObjects.inputmask = Inputmask().mask(inputMasks)
}
