import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import get from 'lodash/get'
import Actions from 'App/Redux/Actions'
import { parseError } from './Shared'
import { selectToken } from 'App/Lib/Auth'

function * makeFetchInvoiceRequest (api, action) {
  const { jobId, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.fetchInvoiceRequest, token, jobId)
  if (response.ok) {
    const invoice = get(response, 'data.data')
    yield put(Actions.fetchInvoiceSuccess(invoice))
    return resolve()
  } else {
    console.log('ere', response)
    const error = parseError(response)
    yield put(Actions.fetchInvoiceFailure(error))
    return reject(error)
  }
}
// ADD_SAGA_ACTION

export default {
  makeFetchInvoiceRequest,
  // EXPORT_SAGA_ACTION
}
