/**
 * Redux Entity Generator
 */

'use strict';
const fs = require('fs');
const path = require('path');

// Loads the template file
function trimTemplateFile(template) {
  return fs.readFileSync(path.join(__dirname, `./${template}`), 'utf8').replace(/\s*$/, '');
}

module.exports = {
  description: 'Add a redux action',
  prompts: [{
    type: 'input',
    name: 'actionName',
    message: 'What is the action name?',
    default: 'AddUser',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The action name is required'
    },
  }, {
    type: 'confirm',
    name: 'wantRequestActions',
    message: 'Do you want to create actions with postfix Request, Success, Failure?',
    default: 'AddUserRequest',
  }, {
    type: 'input',
    name: 'fileName',
    message: 'Where should it be added?',
    default: 'AuthRedux',
    validate: (value) => {
      if ((/.+/).test(value)) {
        return true
      }
      return 'The file name is required'
    },
  }],
  actions: (data) => {
    const actions = [{
      type: 'modify',
      path: '../../App/Redux/{{fileName}}.js',
      pattern: /(\s*\/\/\sadd action here)/g,
      template: trimTemplateFile('addAction.hbs'),
    }, {
      type: 'modify',
      path: '../../App/Redux/{{fileName}}.js',
      pattern: /(\s*\/\/\sadd new reducer here)/g,
      template: trimTemplateFile('addReducer.hbs'),
    }, {
      type: 'modify',
      path: '../../App/Redux/{{fileName}}.js',
      pattern: /(\s*\/\/\sadd reducer hook up here)/g,
      template: trimTemplateFile('addReducerHook.hbs'),
    }]
    return actions
  },
}
