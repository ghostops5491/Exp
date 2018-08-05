import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import Actions from 'App/Redux/Actions'
import get from 'lodash/get'
import { selectToken } from 'App/Lib/Auth'
import { parseError } from './Shared'

function * makeFetchAddressesRequest (api, action) {
  const { customerId } = action
  const token = yield call(selectToken)
  const response = yield call(api.fetchAddresses, token, customerId)
  if (response.ok) {
    const data = path(['data', 'data'], response)
    yield put(Actions.saveAddressesLocal(data))
    yield put(Actions.fetchAddressesSuccess())
  } else {
    yield put(Actions.fetchAddressesFailure())
  }
}

function * makeDeleteAddressRequest (api, action) {
   const { payload, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.deleteAddressRequest, token, payload)
  if (response.ok) {
    yield put(Actions.deleteAddressLocal(payload))
    yield put(Actions.deleteAddressSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.deleteAddressFailure(error))
    return reject()
  }
}


function * makeCreateAddressRequest (api, action) {
  const { address, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.createAddressRequest, token, address)
  if (response.ok) {
    const address = get(response, 'data.data')
    yield put(Actions.clearAddress())
    yield put(Actions.addAddressLocal(address))
    yield put(Actions.verifyProfileComplete())
    yield put(Actions.createAddressSuccess())
    yield put(Actions.saveNewAddress(address))
    return resolve(address)
  } else {
    const error = parseError(response)
    yield put(Actions.createAddressFailure(error))
    return reject(error)
  }
}

// ADD_SAGA_ACTION

export default {
  makeFetchAddressesRequest,
  makeCreateAddressRequest,
  makeDeleteAddressRequest,
  // EXPORT_SAGA_ACTION
}
