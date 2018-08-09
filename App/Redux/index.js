import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  github: require('./GithubRedux').reducer,
  search: require('./SearchRedux').reducer,
  auth: require('./AuthRedux').reducer,
  address: require('./AddressRedux').reducer,
  job: require('./JobRedux').reducer,
  problem: require('./ProblemRedux').reducer,
  problemCategory: require('./ProblemCategoryRedux').reducer,
  serviceRequest: require('./ServiceRequestRedux').reducer,
  notification: require('./NotificationRedux').reducer,
  contractor: require('./ContractorRedux').reducer,
  payments: require('./PaymentsRedux').reducer,
  // ADD_REDUX_REDUCER
})

/*
export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}*/

let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)
export default store;
