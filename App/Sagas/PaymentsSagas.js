import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import get from 'lodash/get'
import Actions from 'App/Redux/Actions'
import { selectToken } from 'App/Lib/Auth'

function * makeAddPaymentMethodRequest (api, action) {
  const { payload, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.addPaymentMethodRequest, token, payload)

  if (response.ok) {
    const data = get(response, 'data.data')
    yield put(Actions.addPaymentMethodSuccess())
    yield put(Actions.savePaymentMethods(data))
    return resolve(data)
  } else {
    var error = get(response, 'data.meta.message')
    if (response.problem === 'NETWORK_ERROR')
      error = 'Backend server is down.'
    yield put(Actions.addPaymentMethodFailure(error))
    return reject(error)
  }
}

function * makeFetchPaymentMethods (api, action) {
  const { payload, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.fetchPaymentMethods, token)
  if (response.ok) {
    const data = get(response, 'data.data')
    yield put(Actions.savePaymentMethods(data))
    yield put(Actions.fetchPaymentMethodsSuccess())
    return resolve()
  } else {
    var error = get(response, 'data.meta.message')
    if (response.problem === 'NETWORK_ERROR')
      error = 'Backend server is down.'
    yield put(Actions.fetchPaymentMethodsFailure(error))
    return reject(error)
  }
}

function * makeFetchAppSettings (api, action) {
  const { payload } = action
  const token = yield call(selectToken)
  const response = yield call(api.fetchAppSettings, token)
  if (response.ok) {
    const data = get(response, 'data.data')
    yield put(Actions.saveAppSettings(data))
    yield put(Actions.fetchAppSettingsSuccess())
  } else {
    var error = get(response, 'data.meta.message')
    if (response.problem === 'NETWORK_ERROR')
      error = 'Backend server is down.'
    yield put(Actions.fetchAppSettingsFailure(error))
  }
}

function * makeDeletePaymentMethodRequest (api, action) {
  const { payload: { paymentMethod: { id }}, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.deletePaymentMethodRequest, token, id)
  if (response.ok) {
    const data = get(response, 'data.data')
    yield put(Actions.deletePaymentMethodSuccess())
    yield put(Actions.savePaymentMethods(data))
    return resolve(data)
  } else {
    var error = get(response, 'data.meta.message')
    if (response.problem === 'NETWORK_ERROR')
      error = 'Backend server is down.'
    yield put(Actions.deletePaymentMethodFailure(error))
    return reject(error)
  }
}
// ADD_SAGA_ACTION

export default {
  makeAddPaymentMethodRequest,
  makeFetchPaymentMethods,
  makeFetchAppSettings,
  makeDeletePaymentMethodRequest,
  // EXPORT_SAGA_ACTION
}
