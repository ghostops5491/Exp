import { AsyncStorage } from 'react-native'
import { call, put, all } from 'redux-saga/effects'
import get from 'lodash/get'
import Actions from 'App/Redux/Actions'
import { selectToken } from 'App/Lib/Auth'
import { parseError } from './Shared'

function * makeCreateServiceRequestRequest (api, action) {
  let { serviceRequest: { serviceRequest, serviceRequestType, provider_id }, resolve, reject } = action
  if (serviceRequestType === 'preferred' && provider_id){
    serviceRequest = { ...serviceRequest, contractor_id }
  }
  const token = yield call(selectToken)
  const response = yield call(api.createServiceRequestRequest, token, serviceRequest)
  if (response.ok) {
    const job = get(response, 'data.data')
    yield put(Actions.saveServiceRequestLocal(job))
    yield put(Actions.createServiceRequestSuccess())
    return resolve(job)
  } else {
    const error = parseError(response)
    yield put(Actions.createServiceRequestFailure(error))
    return reject(error)
  }
}

function * makeAcceptQuoteRequestRequest (api, action) {
  const { payload: { quoteResponse, jobId }, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.acceptQuote, token, jobId, quoteResponse)
  if (response.ok) {
    const job = get(response, 'data.data')
    yield put(Actions.updateJob(job))
    yield put(Actions.acceptQuoteRequestSuccess())
    return resolve(job)
  } else {
    const error = parseError(response)
    yield put(Actions.acceptQuoteRequestFailure(error))
    return reject(error)
  }
}

function * makeUploadPhotosRequest (api, action) {
  const { photoURIs, jobId, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield all(photoURIs.map(photoUri =>
    call(api.uploadPhotoRequest, token, jobId, photoUri, 'pre_service')
  ))
  if (response) {
    const data = get(response, 'data.data')
    return resolve(data)
  } else {
    const error = parseError(response)
    return reject(error)
  }
}


// ADD_SAGA_ACTION

export default {
  makeCreateServiceRequestRequest,
  makeUploadPhotosRequest,
  makeAcceptQuoteRequestRequest,
  // EXPORT_SAGA_ACTION
}
