import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import get from 'lodash/get'
import AuthActions from 'App/Redux/AuthRedux'
import { parseError } from './Shared'
import { selectToken, saveUserToLocalStorage,
  removeUserFromLocalStorage } from 'App/Lib/Auth'


function * makeLoginRequest (api, action) {
  const { email, password, resolve, reject } = action
  const membership = 'Customer'
  const response = yield call(api.login, email, password, membership)
  if (response.ok) {
    yield put(AuthActions.loginSuccess())
    const user = get(response, 'data.data')
    yield saveUserToLocalStorage(user)
    yield put(AuthActions.saveUser(user))
    return resolve()
  } else {
    const error = parseError(response)
    yield put(AuthActions.loginFailure(error))
    return reject(error)
  }
}

function * makeUploadProfilePhoto (api, action) {
  const { payload, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.uploadProfilePhoto, token, payload)
  if (response.ok) {
    const data = get(response, 'data.data')
    yield put(AuthActions.uploadProfilePhotoSuccess())
    return resolve
  } else {
    const error = get(response, 'data.meta.message')
    if (response.problem === 'NETWORK_ERROR')
      error = 'Backend server is down.'
    yield put(AuthActions.uploadProfilePhotoFailure(error))
    return reject
  }
}

export function * makeVerifyTokenRequest (api, action) {
  const { token, resolve, reject } = action
  const response = yield call(api.verifyToken, token)
  return (response.ok ? resolve() : reject(response.problem))
}

export function * makeSignupRequest (api, action) {
  const { payload: { email, password, passwordConfirmation }, resolve, reject } = action
  const response = yield call(api.signup, email, password, passwordConfirmation)
  if (response.ok) {
    const user = get(response, 'data.data')
    yield saveUserToLocalStorage(user)
    yield put(AuthActions.saveUser(user))
    yield put(AuthActions.signupSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(AuthActions.signupFailure(error))
    return reject(error)
  }
}

export function * makeForgotPasswordRequest (api, action) {
  const { email, resolve, reject } = action
  const response = yield call(api.forgotPassword, email)
  if (response.ok) {
    yield put(AuthActions.forgotPasswordSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(AuthActions.forgotPasswordFailure(error))
    return reject(error)
  }
}

export function * makeSignoutRequest (api, action) {
  const { resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.signout, token)
  if (response.ok) {
    yield removeUserFromLocalStorage()
    return resolve()
  } else {
    return reject()
  }
}

function * makeUpdateUserRequest (api, action) {
  const { payload, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.updateUser, token, payload)

  if (response.ok) {
    const user = get(response, 'data.data')
    yield saveUserToLocalStorage(user)
    yield put(AuthActions.saveUser(user))
    yield put(AuthActions.updateUserSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(AuthActions.updateUserFailure(error))
    return reject(error)
  }
}

// ADD_SAGA_ACTION

export default {
  makeVerifyTokenRequest,
  makeLoginRequest,
  makeSignupRequest,
  makeForgotPasswordRequest,
  makeSignoutRequest,
  makeUpdateUserRequest,
  makeUploadProfilePhoto,
  // EXPORT_SAGA_ACTION
}
