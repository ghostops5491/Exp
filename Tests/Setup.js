// Mock your external modules here if needed
// jest
import { JSDOM } from 'jsdom'
// used to fully render native components as react components
import 'react-native-mock-render/mock'

// copy props needed to render HTML from JSDOM window to node's global object
function copyProps(src, target) {
  Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .forEach(prop => {
      // eslint-disable-next-line no-param-reassign
      target[prop] = src[prop]
    })
}

const { window } = new JSDOM()

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}
copyProps(window, global)

// react doesn't like some of the props that are set on native components (that eventually are set on DOM nodes, so suppress those warnings
const suppressedErrors = /(React does not recognize the.*prop on a DOM element|Unknown event handler property|is using uppercase HTML|Received `true` for a non-boolean attribute `accessible`|The tag.*is unrecognized in this browser)/
// eslint-disable-next-line no-console
const realConsoleError = console.error
// eslint-disable-next-line no-console
console.error = message => {
  if (message.match(suppressedErrors)) {
    return
  }
  realConsoleError(message)
}

// .mock('react-native-device-info', () => {
//   return { isTablet: jest.fn(() => { return false }) }
// })
