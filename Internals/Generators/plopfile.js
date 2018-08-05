const componentGenerator = require('./Component/index.js')
const containerGenerator = require('./Container/index.js')
const reduxEntityGenerator = require('./ReduxEntity/index.js')
const reduxActionGenerator = require('./ReduxAction/index.js')
const sagaEntityGenerator = require('./SagaEntity/index.js')
const sagaActionGenerator = require('./SagaAction/index.js')

module.exports = (plop) => {
  plop.setGenerator('component', componentGenerator)
  plop.setGenerator('container', containerGenerator)
  plop.setGenerator('redux entity', reduxEntityGenerator)
  plop.setGenerator('redux action', reduxActionGenerator)
  plop.setGenerator('saga entity', sagaEntityGenerator)
  plop.setGenerator('saga action', sagaActionGenerator)
}
