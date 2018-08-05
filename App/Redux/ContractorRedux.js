import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { get } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchPreferredContractorsRequest: ['resolve', 'reject'],
  fetchPreferredContractorsSuccess: null,
  fetchPreferredContractorsFailure: ['error'],
  addPreferredContractorRequest: ['payload', 'resolve', 'reject'],
  addPreferredContractorSuccess: null,
  addPreferredContractorFailure: ['error'],
  savePreferredContractors: ['preferredContractors'],
  setCurrentPreferredContractor: ['currentPreferredContractor'],
  changeContractorName: ['name'],
  changeContractorEmail: ['email'],
  changeContractorPhone: ['phone'],

  invitePreferredContractorRequest: ['payload', 'resolve', 'reject'],
  invitePreferredContractorSuccess: null,
  invitePreferredContractorFailure: ['error'],
  clearInviteForm: null,
  addInviteProviderNameError: ['nameErrorOnInviteProvider'],
  addInviteProviderEmailError: ['emailErrorOnInviteProvider'],
  addInviteProviderPhoneError: ['phoneErrorOnInviteProvider'],
  clearInviteProviderError: null,
  sharePreferredListRequest: ['payload', 'resolve', 'reject'],
  sharePreferredListSuccess: null,
  sharePreferredListFailure: ['error'],
  fetchSharedContractorsRequest: ['payload','resolve', 'reject'],
  fetchSharedContractorsSuccess: null,
  fetchSharedContractorsFailure: ['error'],
  mergeSharedContractorsRequest: ['payload','resolve', 'reject'],
  mergeSharedContractorsSuccess: null,
  mergeSharedContractorsFailure: ['error'],
  getContractorInfoRequest: ['contractorId', 'resolve', 'reject'],
  getContractorInfoSuccess: null,
  getContractorInfoFailure: ['error'],
  saveContractorInfo: ['contractorInfo']

  // add action here
})

export const ContractorTypes = Types
export default Creators

/* ------------- Initial State ------------- */


export const INITIAL_STATE = Immutable({
  preferredContractors: [],
  currentPreferredContractor: null,
  requestingToAdd: false,
  requestingToInvite: false,
  requestingToShare: false,
  inviteContractorsForm: {
    name: null,
    email: null,
    phone: null,
    errors: {},
  },
})

/* ------------- Reducers ------------- */

export const fetchPreferredContractorsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const savePreferredContractors = (state, { preferredContractors }) =>
  state.merge({ preferredContractors, })

export const fetchPreferredContractorsSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const fetchPreferredContractorsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const addPreferredContractorRequest = (state, action) =>
  state.merge({ requestingToAdd: true, error: null })

export const addPreferredContractorSuccess = (state, action) =>
  state.merge({ requestingToAdd: false, error: null })

export const addPreferredContractorFailure = (state, { error }) =>
  state.merge({ requestingToAdd: false, error })

export const setCurrentPreferredContractor = (state, { currentPreferredContractor }) =>
  state.set('currentPreferredContractor', currentPreferredContractor)

export const changeContractorName = (state, { name }) =>
  state.setIn(['inviteContractorsForm', 'name'], name)

export const changeContractorEmail = (state, { email }) =>
  state.setIn(['inviteContractorsForm', 'email'], email)

export const changeContractorPhone = (state, { phone }) =>
  state.setIn(['inviteContractorsForm', 'phone'], phone)

export const invitePreferredContractorRequest = (state, action) =>
  state.merge({ requestingToInvite: true, error: null })

export const invitePreferredContractorSuccess = (state, action) =>
  state.merge({ requestingToInvite: false, error: null })

export const invitePreferredContractorFailure = (state, { error }) =>
  state.merge({ requestingToInvite: false, error })

export const addInviteProviderNameError = (state, { nameErrorOnInviteProvider }) =>
  state.setIn(['inviteContractorsForm', 'errors', 'name'], nameErrorOnInviteProvider)

export const addInviteProviderEmailError = (state, { emailErrorOnInviteProvider }) =>
  state.setIn(['inviteContractorsForm', 'errors', 'email'], emailErrorOnInviteProvider)

export const addInviteProviderPhoneError = (state, { phoneErrorOnInviteProvider }) =>
  state.setIn(['inviteContractorsForm', 'errors', 'phone'], phoneErrorOnInviteProvider)

export const clearInviteProviderError = (state, action) =>
  state.setIn(['inviteContractorsForm', 'errors'], {})

export const sharePreferredListRequest = (state, action) =>
  state.merge({ requestingToShare: true, error: null })

export const sharePreferredListSuccess = (state, action) =>
    state.merge({ requestingToShare: false, error: null })

export const sharePreferredListFailure = (state, { error }) =>
    state.merge({ requestingToShare: false, updateSuccessMessage: "Share failed.", error })

export const clearInviteForm = (state, action) => {
  return state.set('inviteContractorsForm', {  name: null,
    email: null,
    phone: null,
    errors: {},
  })
}

export const fetchSharedContractorsRequest = (state, action) => {
  console.log('fetchSharedContractorsRequest:', state, action)
  return state.merge({requesting: true, error: null})
}

export const fetchSharedContractorsSuccess = (state, action) => {
  return state.merge({requesting: false, error: null})
}

export const fetchSharedContractorsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const mergeSharedContractorsRequest = (state, action) => {
  console.log('mergeSharedContractorsRequest:', state, action)
  return state.merge({requesting: true, error: null})
}

export const mergeSharedContractorsSuccess = (state, action) => {
  return state.merge({requesting: false, error: null})
}

export const mergeSharedContractorsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const getContractorInfoRequest = (state, action) => {
  console.log('getContractorInfoRequest:', state, action)
  return state.merge({requesting: true, error: null})
}

export const getContractorInfoSuccess = (state, action) => {
  return state.merge({requesting: false, error: null})
}

export const getContractorInfoFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const saveContractorInfo = (state, { contractorInfo }) =>
  state.merge({ contractorInfo })
// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_PREFERRED_CONTRACTORS_REQUEST]: fetchPreferredContractorsRequest,
  [Types.FETCH_PREFERRED_CONTRACTORS_SUCCESS]: fetchPreferredContractorsSuccess,
  [Types.FETCH_PREFERRED_CONTRACTORS_FAILURE]: fetchPreferredContractorsFailure,
  [Types.ADD_PREFERRED_CONTRACTOR_REQUEST]: addPreferredContractorRequest,
  [Types.ADD_PREFERRED_CONTRACTOR_SUCCESS]: addPreferredContractorSuccess,
  [Types.ADD_PREFERRED_CONTRACTOR_FAILURE]: addPreferredContractorFailure,
  [Types.SAVE_PREFERRED_CONTRACTORS]: savePreferredContractors,
  [Types.SET_CURRENT_PREFERRED_CONTRACTOR]: setCurrentPreferredContractor,
  [Types.CHANGE_CONTRACTOR_NAME]: changeContractorName,
  [Types.CHANGE_CONTRACTOR_EMAIL]: changeContractorEmail,
  [Types.CHANGE_CONTRACTOR_PHONE]: changeContractorPhone,
  [Types.INVITE_PREFERRED_CONTRACTOR_REQUEST]: invitePreferredContractorRequest,
  [Types.INVITE_PREFERRED_CONTRACTOR_SUCCESS]: invitePreferredContractorSuccess,
  [Types.INVITE_PREFERRED_CONTRACTOR_FAILURE]: invitePreferredContractorFailure,
  [Types.ADD_INVITE_PROVIDER_NAME_ERROR]: addInviteProviderNameError,
  [Types.ADD_INVITE_PROVIDER_EMAIL_ERROR]: addInviteProviderEmailError,
  [Types.ADD_INVITE_PROVIDER_PHONE_ERROR]: addInviteProviderPhoneError,
  [Types.CLEAR_INVITE_PROVIDER_ERROR]: clearInviteProviderError,
  [Types.SHARE_PREFERRED_LIST_REQUEST]: sharePreferredListRequest,
  [Types.SHARE_PREFERRED_LIST_SUCCESS]: sharePreferredListSuccess,
  [Types.SHARE_PREFERRED_LIST_FAILURE]: sharePreferredListFailure,
  [Types.CLEAR_INVITE_FORM]: clearInviteForm,
  [Types.FETCH_SHARED_CONTRACTORS_REQUEST]: fetchSharedContractorsRequest,
  [Types.FETCH_SHARED_CONTRACTORS_SUCCESS]: fetchSharedContractorsSuccess,
  [Types.FETCH_SHARED_CONTRACTORS_FAILURE]: fetchSharedContractorsFailure,
  [Types.MERGE_PREFERRED_CONTRACTORS_REQUEST]: mergeSharedContractorsRequest,
  [Types.MERGE_PREFERRED_CONTRACTORS_SUCCESS]: mergeSharedContractorsSuccess,
  [Types.MERGE_PREFERRED_CONTRACTORS_FAILURE]: mergeSharedContractorsFailure,
  [Types.GET_CONTRACTOR_INFO_REQUEST]: getContractorInfoRequest,
  [Types.GET_CONTRACTOR_INFO_SUCCESS]: getContractorInfoSuccess,
  [Types.GET_CONTRACTOR_INFO_FAILURE]: getContractorInfoFailure,
  [Types.SAVE_CONTRACTOR_INFO]: saveContractorInfo
  // add reducer hook up here
})
