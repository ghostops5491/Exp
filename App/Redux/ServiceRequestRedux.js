import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  createServiceRequestRequest: ['serviceRequest', 'resolve', 'reject'],
  createServiceRequestSuccess: null,
  createServiceRequestFailure: ['error'],
  saveServiceRequest: ['serviceRequest'],
  selectUrgency: ['urgency'],
  changeNotes: ['notes'],
  selectExistingAddress: ['address_id'],
  saveServiceRequestLocal: ['serviceRequest'],
  clearServiceRequest: null,
  addProblemPhoto: ['problemPhoto'],
  deleteProblemPhoto: ['problemPhoto'],
  uploadPhotosRequest: ['photoURIs', 'jobId', 'resolve', 'reject'],
  uploadPhotosSuccess: null,
  uploadPhotosFailure: ['error'],
  acceptQuoteRequest: ['payload', 'resolve', 'reject'],
  acceptQuoteRequestSuccess: null,
  acceptQuoteRequestFailure: ['error'],
  changeDate: ['date'],
  changeTime: ['time'],
  resetPhotoUris: null,
  setServiceRequestType: ['rType'],
  changePaymentMethodId: ['payment_method_id'],
  selectProviderForJob: ['id'],
  // add action here
})

export const ServiceRequestTypes = Types
export default Creators
/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  urgency: null,
  notes: null,
  requesting: null,
  submitting: null,
  uploadingPhotos: null,
  photoURIs: [],
  serviceRequest: {},
  jobSchedule: {},
  serviceRequestType: 'normal',
  payment_method_id: null,
  selectedProvider: null
})
/* ------------- Reducers ------------- */

export const createServiceRequestRequest = (state, action) =>
  state.merge({ submitting: true, error: null })

export const createServiceRequestSuccess = (state, action) =>
  state.merge({ submitting: false, error: null, serviceRequestType: 'normal' })

export const createServiceRequestFailure = (state, { error }) =>
  state.merge({ submitting: false, error, serviceRequestType: 'normal' })

export const saveServiceRequest = (state, action) =>
  state.merge({})

export const selectUrgency = (state, { urgency }) =>
  state.merge({ urgency })

export const changeNotes = (state, { notes }) =>
  state.merge({ notes })

export const selectExistingAddress = (state, { address_id }) =>
  state.merge({ address_id } )

export const acceptQuoteRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const acceptQuoteRequestSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const acceptQuoteRequestFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const saveServiceRequestLocal = (state, { serviceRequest }) =>
  state.set('serviceRequest', serviceRequest)

export const clearServiceRequest = (state, action) =>
  state.merge({ notes: null, urgency: null, address_id: null })

export const addProblemPhoto = (state, { problemPhoto }) => {
  let temp_photo_uri = state.photoURIs;
  temp_photo_uri = temp_photo_uri.concat(problemPhoto);
  return state.merge( {photoURIs: temp_photo_uri} )
}

export const deleteProblemPhoto = (state, { problemPhoto }) =>
  state.setIn(
    ['photoURIs'],
    state.photoURIs.filter((iterator) => {
      return state.photoURIs.indexOf(iterator) !== state.photoURIs.indexOf(problemPhoto)
    })
  )

export const uploadPhotosRequest = (state, action) =>
  state.merge({ uploadingPhotos: true, error: null })

export const uploadPhotosSuccess = (state, action) =>
  state.merge({ uploadingPhotos: false, error: null })

export const uploadPhotosFailure = (state, { error }) =>
  state.merge({ uploadingPhotos: false, error })

export const changeDate = (state, { date }) =>
  state.setIn(['jobSchedule', 'date'], date)

export const changeTime = (state, { time }) =>
  state.setIn(['jobSchedule', 'time'], time)

export const resetPhotoUris = (state, action) =>
  state.set('photoURIs', [])

export const setServiceRequestType = (state, { rType }) =>
  state.set('serviceRequestType', rType)

export const changePaymentMethodId = (state, { payment_method_id }) =>
  state.merge({ payment_method_id })

export const selectProviderForJob = (state, { id }) =>
  state.merge({ selectedProvider: id })

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_SERVICE_REQUEST_REQUEST]: createServiceRequestRequest,
  [Types.CREATE_SERVICE_REQUEST_SUCCESS]: createServiceRequestSuccess,
  [Types.CREATE_SERVICE_REQUEST_FAILURE]: createServiceRequestFailure,
  [Types.SAVE_SERVICE_REQUEST]: saveServiceRequest,
  [Types.SELECT_URGENCY]: selectUrgency,
  [Types.CHANGE_NOTES]: changeNotes,
  [Types.SELECT_EXISTING_ADDRESS]: selectExistingAddress,
  [Types.SAVE_SERVICE_REQUEST_LOCAL]: saveServiceRequestLocal,
  [Types.CLEAR_SERVICE_REQUEST]: clearServiceRequest,
  [Types.ADD_PROBLEM_PHOTO]: addProblemPhoto,
  [Types.DELETE_PROBLEM_PHOTO]: deleteProblemPhoto,
  [Types.UPLOAD_PHOTOS_REQUEST]: uploadPhotosRequest,
  [Types.UPLOAD_PHOTOS_SUCCESS]: uploadPhotosSuccess,
  [Types.UPLOAD_PHOTOS_FAILURE]: uploadPhotosFailure,
  [Types.ACCEPT_QUOTE_REQUEST]: acceptQuoteRequest,
  [Types.ACCEPT_QUOTE_REQUEST_SUCCESS]: acceptQuoteRequestSuccess,
  [Types.ACCEPT_QUOTE_REQUEST_FAILURE]: acceptQuoteRequestFailure,
  [Types.CHANGE_DATE]: changeDate,
  [Types.CHANGE_TIME]: changeTime,
  [Types.RESET_PHOTO_URIS]: resetPhotoUris,
  [Types.SET_SERVICE_REQUEST_TYPE]: setServiceRequestType,
  [Types.CHANGE_PAYMENT_METHOD_ID]: changePaymentMethodId,
  [Types.SELECT_PROVIDER_FOR_JOB]: selectProviderForJob,
  // add reducer hook up here

})
