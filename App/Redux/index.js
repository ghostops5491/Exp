import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  address: require('./AddressRedux').reducer,
  auth: require('./AuthRedux').reducer,
  contractor: require('./ContractorRedux').reducer,
  invoice: require('./InvoiceRedux').reducer,
  job: require('./JobRedux').reducer,
  nav: require('./NavigationRedux').reducer,
  notification: require('./NotificationRedux').reducer,
  payments: require('./PaymentsRedux').reducer,
  problem: require('./ProblemRedux').reducer,
  problemCategory: require('./ProblemCategoryRedux').reducer,
  serviceRequest: require('./ServiceRequestRedux').reducer,
  search: require('./SearchRedux').reducer,
  // ADD_REDUX_REDUCER
})

let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)
export default store;
