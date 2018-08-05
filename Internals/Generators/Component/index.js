/**
 * Component Generator
 */

'use strict';

module.exports = {
  description: 'Add a component',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'What should it be called?',
    default: 'NewComponent',
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
      path: '../../App/Components/{{properCase name}}/index.js',
      templateFile: './Component/es6.js.hbs',
      abortOnFail: true,
    }, {
      type: 'add',
      path: '../../App/Components/{{properCase name}}/styles.js',
      templateFile: './Component/styles.js.hbs',
      abortOnFail: true,
    }]
    return actions
  },
}
