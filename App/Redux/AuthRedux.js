import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, find } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password', 'resolve', 'reject'],
  loginSuccess: null,
  loginFailure: ['error'],
  changeEmail: ['email'],
  changePassword: ['password'],
  changePasswordConfirmation: ['passwordConfirmation'],
  saveUser: ['user'],
  verifyTokenRequest: ['token', 'resolve', 'reject'],
  signupRequest: ['payload', 'resolve', 'reject'],
  signupSuccess: null,
  signupFailure: ['error'],
  forgotPasswordRequest: ['email', 'resolve', 'reject'],
  forgotPasswordSuccess: null,
  forgotPasswordFailure: ['error'],
  clearForm: null,
  signoutRequest: ['resolve', 'reject'],
  signoutSuccess: null,
  addError: ['error'],
  clearError: null,
  changeFirstName: ['name'],
  changeLastName: ['name'],
  changePhone: ['phone_number'],
  updateUserRequest: ['payload', 'resolve', 'reject'],
  updateUserSuccess: null,
  updateUserFailure: ['error'],
  addProfileFirstNameError: ['nameErrorOnProfile'],
  addProfileLastNameError: ['nameErrorOnProfile'],
  addProfilePhoneError: ['phoneErrorOnProfile'],
  changeProfilePhoto: ['photo_uri'],
  addAddressLocal: ['address'],
  verifyProfileComplete: null,
  deleteAddressLocal: ['id'],
  uploadProfilePhotoRequest: ['payload', 'resolve', 'reject'],
  uploadProfilePhotoSuccess: null,
  uploadProfilePhotoFailure: ['error'],
  // add action here
})

export const AuthTypes = Types
export default Creators

/*  helper function - should be elsewhere */
const checkProfileComplete = currentUser => {
  let complete = true
  if (
    currentUser.first_name === null ||
    currentUser.last_name === null ||
    currentUser.phone_number === null ||
    currentUser.addresses === null ||
    (Object.prototype.hasOwnProperty.call(currentUser, 'addresses') &&
      currentUser.addresses.length === 0)
  ) {
    complete = false
  }
  return complete
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  requesting: null,
  loggingIn: null,
  signingUp: null,
  profileComplete: false,
  updatingUser: null,
  currentUser: {},
  // // for signup
  // form: { error: {}, email: 'a'+Math.ceil(Math.random()*1000)+'@test.com',
  // password: '123123', passwordConfirmation: '123123'},

  // // for login
  // form: { error: {}, email: 'a36@test.com', password: '123123'},

  form: { error: {} },
  profile: {
    first_name: null,
    last_name: null,
    phone_number: null,
    errors:{},
  },
  addresses: {}
})

/* ------------- Reducers ------------- */

export const loginRequest = (state, action) =>
  state.merge({ loggingIn: true, form: { ...state.form, error: {} } })

export const loginSuccess = (state, action) => {
  const complete = checkProfileComplete(state.currentUser)
  return state.merge({
    loggingIn: false,
    form: { ...state.form, error: {} },
    profileComplete: complete
  })
}

export const loginFailure = (state, { error }) =>
  state.merge({ loggingIn: false, form: { ...state.form, error: { message: error } } })

export const changeEmail = (state, { email }) =>
  state.setIn(['form', 'email'], email)

export const changePassword = (state, { password }) =>
  state.setIn(['form', 'password'], password)

export const changePasswordConfirmation = (state, { passwordConfirmation }) =>
  state.setIn(['form', 'passwordConfirmation'], passwordConfirmation)

export const saveUser = (state, { user }) => {
  return state.merge({
    currentUser: user,
    profileComplete: checkProfileComplete(user)
  })
}

export const verifyTokenRequest = (state, action) => state

export const signupRequest = (state, action) =>
  state.merge({ signingUp: true, form: { ...state.form, error: {} } })

export const signupSuccess = (state, action) =>
  state.merge({ signingUp: false, form: { ...state.form, error: {} } })

export const signupFailure = (state, { error }) =>
  state.merge({ signingUp: false, form: { ...state.form, error: { message: error } } })

export const forgotPasswordRequest = (state, action) =>
  state.merge({ requesting: true, form: { ...state.form, error: {} } })

export const forgotPasswordSuccess = (state, action) =>
  state.merge({ requesting: false, form: { ...state.form, error: {} } })

export const forgotPasswordFailure = (state, { error }) =>
  state.merge({ requesting: false, form: { ...state.form, error: { message: error } } })

export const clearForm = (state, action) => state.set('form', { error: {} })

export const signoutRequest = (state, action) => state

export const signoutSuccess = (state, action) =>
  state.merge({})

export const addError = (state, { error }) =>
  state.setIn(['form', 'error'], error)

export const clearError = (state, action) =>
  state.setIn(['form', 'error'], {})

export const addProfileFirstNameError = (state, { nameErrorOnProfile }) =>
  state.setIn(['profile', 'errors', 'first_name'], nameErrorOnProfile)

export const addProfileLastNameError = (state, { nameErrorOnProfile }) =>
  state.setIn(['profile', 'errors', 'last_name'], nameErrorOnProfile)

export const addProfilePhoneError = (state, { phoneErrorOnProfile }) =>
  state.setIn(['profile', 'errors', 'phone'], phoneErrorOnProfile)

export const changeFirstName = (state, { name }) =>{
  const newState = name.length > 0 ? state.setIn(['profile', 'errors', 'first_name'], null) : state;
  return newState.setIn(['currentUser', 'first_name'], name)
}

export const changeLastName = (state, { name }) =>{
  const newState = name.length > 0 ? state.setIn(['profile', 'errors', 'last_name'], null) : state;
  return newState.setIn(['currentUser', 'last_name'], name)
}

export const changePhone = (state, { phone_number }) =>{
  const newState = phone_number.length > 0 ? state.setIn(['profile', 'errors', 'phone'], null) : state;
  return newState.setIn(['currentUser', 'phone_number'], phone_number)
}

export const updateUserRequest = (state, action) =>
  state.merge({ updatingUser: true, error: null })

export const updateUserSuccess = (state, action) =>
  state.merge({ updatingUser: false, error: null })

export const updateUserFailure = (state, { error }) =>
  state.merge({ updatingUser: false, error })

export const changeProfilePhoto = (state, { photo_uri }) =>
  state.setIn(['currentUser', 'profile_photo', 'medium'], photo_uri)

export const addAddressLocal = (state, { address }) => {
  const addresses = state.currentUser.addresses || []
  const addr = find(state.currentUser.addresses, (addr) => addr.id === address.id)
  if (!addr)
    return state.setIn(['currentUser', 'addresses'], addresses.concat(address))
  return state
}
export const uploadProfilePhotoRequest = (state, action) =>
  state.merge({ uploadingProfilePhoto: true, error: null })

export const uploadProfilePhotoSuccess = (state, action) =>
  state.merge({ uploadingProfilePhoto: false, error: null })

export const uploadProfilePhotoFailure = (state, { error }) =>
  state.merge({ uploadingProfilePhoto: false, error })

export const deleteAddressLocal = (state, { id }) =>
  state.setIn(['currentUser', 'addresses'], filter(
    state.currentUser.addresses, (a) => a.id !== id
  ))

  export const verifyProfileComplete = (state, action) =>
    state.merge({ profileComplete: checkProfileComplete(state.currentUser) })



// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILURE]: loginFailure,
  [Types.CHANGE_EMAIL]: changeEmail,
  [Types.CHANGE_PASSWORD]: changePassword,
  [Types.CHANGE_PASSWORD_CONFIRMATION]: changePasswordConfirmation,
  [Types.SAVE_USER]: saveUser,
  [Types.VERIFY_TOKEN_REQUEST]: verifyTokenRequest,
  [Types.SIGNUP_REQUEST]: signupRequest,
  [Types.SIGNUP_SUCCESS]: signupSuccess,
  [Types.SIGNUP_FAILURE]: signupFailure,
  [Types.FORGOT_PASSWORD_REQUEST]: forgotPasswordRequest,
  [Types.FORGOT_PASSWORD_SUCCESS]: forgotPasswordSuccess,
  [Types.FORGOT_PASSWORD_FAILURE]: forgotPasswordFailure,
  [Types.CLEAR_FORM]: clearForm,
  [Types.SIGNOUT_REQUEST]: signoutRequest,
  [Types.SIGNOUT_SUCCESS]: signoutSuccess,
  [Types.ADD_ERROR]: addError,
  [Types.CLEAR_ERROR]: clearError,
  [Types.CHANGE_FIRST_NAME]: changeFirstName,
  [Types.CHANGE_LAST_NAME]: changeLastName,
  [Types.CHANGE_PHONE]: changePhone,
  [Types.UPDATE_USER_REQUEST]: updateUserRequest,
  [Types.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [Types.UPDATE_USER_FAILURE]: updateUserFailure,
  [Types.UPLOAD_PROFILE_PHOTO_REQUEST]: uploadProfilePhotoRequest,
  [Types.UPLOAD_PROFILE_PHOTO_SUCCESS]: uploadProfilePhotoSuccess,
  [Types.UPLOAD_PROFILE_PHOTO_FAILURE]: uploadProfilePhotoFailure,
  [Types.ADD_PROFILE_FIRST_NAME_ERROR]: addProfileFirstNameError,
  [Types.ADD_PROFILE_LAST_NAME_ERROR]: addProfileLastNameError,
  [Types.ADD_PROFILE_PHONE_ERROR]: addProfilePhoneError,
  [Types.CHANGE_PROFILE_PHOTO]: changeProfilePhoto,
  [Types.ADD_ADDRESS_LOCAL]: addAddressLocal,
  [Types.VERIFY_PROFILE_COMPLETE]: verifyProfileComplete,
  [Types.DELETE_ADDRESS_LOCAL]: deleteAddressLocal,
  // add reducer hook up here
})
