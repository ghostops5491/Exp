import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import get from 'lodash/get'
import Actions from 'App/Redux/Actions'
import { selectToken } from 'App/Lib/Auth'
import { parseError } from './Shared'

function * makeFetchPreferredContractorsRequest (api, action) {
  const { payload, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.fetchPreferredContractorsRequest, token)
  if (response.ok) {
    const data = get(response, 'data.data')
    yield put (Actions.savePreferredContractors(data));
    yield put(Actions.fetchPreferredContractorsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.fetchPreferredContractorsFailure(error))
    return reject(error)
  }
}

function * makeAddPreferredContractorRequest (api, action) {
  const { payload: { contractor_id }, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.addPreferredContractorRequest, contractor_id, token )
  if (response.ok) {
    yield put(Actions.addPreferredContractorSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.addPreferredContractorFailure(error))
    return reject(error)
  }
}

function * makeSharePreferredListRequest (api, action) {
  const { payload: { email, checked_ids }, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.sharePreferredContractorsRequest,  token, email, checked_ids )
  if (response.ok) {
    yield put(Actions.sharePreferredListSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.sharePreferredListFailure(error))
  }
}

function * makeGetContractorInfoRequest (api, action) {
  const { contractorId, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.getContractorInfoRequest, token, contractorId)
  if (response.ok) {
    const data = get(response, 'data.data')
    yield put(Actions.saveContractorInfo(data))
    yield put(Actions.getContractorInfoSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.getContractorInfoFailure(error))
    reject()
  }
}

function * makeInvitePreferredContractorRequest (api, action) {
  const { payload: { invitee_email, invitee_name, phone_number }, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.invitePreferredContractorRequest, token, invitee_email, invitee_name, phone_number)
  if (response.ok) {
    yield put(Actions.invitePreferredContractorSuccess())
    return resolve()
  } else {
    console.log('ere', response)
    const error = parseError(response)
    yield put(Actions.invitePreferredContractorFailure(error))
    return reject(error)
  }
}

function * makeFetchSharedContractorsRequest (api, action) {
  console.log('makeFetchSharedContractorsRequest:',action)
  console.log('payload: ', action.payload)
  const { payload: { currentShareId }, resolve, reject } = action
  const token = yield call(selectToken)
  console.log("calling with token/currentShareId:", token, currentShareId)
  const response = yield call(api.fetchSharedContractorsRequest, token, currentShareId)
  console.log('response data.data', response)
  if (response.ok) {
    const data = get(response, 'data.data')
    console.log('response data.data', data)
    //yield put (Actions.saveSharedContractors(data));
    yield put (Actions.savePreferredContractors(data));
    yield put(Actions.fetchSharedContractorsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.fetchSharedContractorsFailure(error))
    return reject(error)
  }
}

function * makeMergeSharedContractorsRequest (api, action) {
  const { payload: { contractor_ids }, resolve, reject } = action
  const token = yield call(selectToken)
  //console.log("calling with ", token, contractor_ids)
  const response = yield call(api.mergeSharedContractorsRequest, token, contractor_ids)
  //console.log('response data.data', response)
  if (response.ok) {
    const data = get(response, 'data.data')
    yield put(Actions.mergeSharedContractorsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.mergeSharedContractorsFailure(error))
    return reject(error)
  }
}
// ADD_SAGA_ACTION

export default {
  makeFetchPreferredContractorsRequest,
  makeAddPreferredContractorRequest,
  makeSharePreferredListRequest,
  makeInvitePreferredContractorRequest,
  makeFetchSharedContractorsRequest,
  makeMergeSharedContractorsRequest,
  makeGetContractorInfoRequest
  // EXPORT_SAGA_ACTION
}

