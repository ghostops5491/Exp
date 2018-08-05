/**
 * Component Generator
 */

'use strict';

module.exports = {
  description: 'Add a container',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'NewContainer',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The name is required'
    },
  }],
  actions: (data) => {
    const actions = [{
      type: 'add',
      path: '../../App/Containers/{{properCase name}}/index.js',
      templateFile: './Container/es6.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../App/Containers/{{properCase name}}/styles.js',
      templateFile: './Container/styles.js.hbs',
      abortOnFail: true,
    }]
    return actions
  },
}
