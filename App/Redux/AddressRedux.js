import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { isEmpty, find } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchAddressesRequest: ['customerId'],
  fetchAddressesSuccess: null,
  fetchAddressesFailure: null,
  saveAddressesLocal: ['addresses'],
  createAddressRequest: ['address', 'resolve', 'reject'],
  createAddressSuccess: null,
  createAddressFailure: ['error'],
  saveNewAddress: ['address'],
  changeStreet: ['street'],
  changeAddress2: ['address2'],
  changeCity: ['city'],
  changeState: ['state'],
  changeZip: ['zip'],
  clearAddress: null,
  addStreetValidationError: ['error'],
  addCityValidationError: ['error'],
  addStateValidationError: ['error'],
  addZipValidationError: ['error'],
  deleteAddressRequest: ['payload', 'resolve', 'reject'],
  deleteAddressSuccess: null,
  deleteAddressFailure: ['error'],
  // add action here
})

export const AddressTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  customerId: null,
  error: null,
  errors: {},
  fetching: null,
  creating: null,
  allAddresses: [],
  form: {},
})

/* ------------- Reducers ------------- */

export const addStreetValidationError = (state, { error }) =>
  state.setIn(['errors', 'street'], error)

export const addCityValidationError = (state, { error }) =>
  state.setIn(['errors', 'city'], error)

export const addStateValidationError = (state, { error }) =>
  state.setIn(['errors', 'state'], error)

export const addZipValidationError = (state, { error }) =>
  state.setIn(['errors', 'zip'], error)

export const fetchAddressesRequest = (state, action) =>
  state.merge({ fetching: true, error: null })

export const fetchAddressesSuccess = (state, action) =>
  state.merge({ fetching: false, error: null })

export const fetchAddressesFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const saveAddressesLocal = (state, { addresses }) =>
  state.set('allAddresses', addresses)

export const createAddressRequest = (state, action) =>
  state.merge({ creating: true, error: null })

export const createAddressSuccess = (state, action) =>
  state.merge({ creating: false, error: null })

export const createAddressFailure = (state, { error }) =>
  state.merge({ creating: false, error })

export const saveNewAddress = (state, { address }) => {
  const addresses = state.allAddresses || []
  const addr = find(state.allAddresses, (addr) => addr.id === address.id)
  if (!addr)
    return state.setIn(['allAddresses'], addresses.concat(address))
  return state
}

export const changeStreet = (state, { street }) => {
  const newState = isEmpty(street) ? state : state.setIn(['errors', 'street'], null)
  return newState.setIn(['form', 'street'], street)
}

export const changeAddress2 = (state, { address2 }) => {
  const newState = isEmpty(address2) ? state : state.setIn(['errors', 'address2'], null)
  return newState.setIn(['form', 'address2'], address2)
}

export const changeCity = (state, { city }) => {
  const newState = isEmpty(city) ? state : state.setIn(['errors', 'city'], null)
  return newState.setIn(['form', 'city'], city)
}

export const changeState = (_state, { state }) => {
  const newState = isEmpty(state) ? _state : _state.setIn(['errors', 'state'], null)
  return newState.setIn(['form', 'state'], state)
}

export const changeZip = (state, { zip }) => {
  const newState = isEmpty(zip) ? state : state.setIn(['errors', 'zip'], null)
  return newState.setIn(['form', 'zip'], zip)
}

export const clearAddress = (state, action) =>
  state.set('form', {})

export const deleteAddressRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const deleteAddressSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const deleteAddressFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

// add new reducer here


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_ADDRESSES_REQUEST]: fetchAddressesRequest,
  [Types.FETCH_ADDRESSES_SUCCESS]: fetchAddressesSuccess,
  [Types.FETCH_ADDRESSES_FAILURE]: fetchAddressesFailure,
  [Types.SAVE_ADDRESSES_LOCAL]: saveAddressesLocal,
  [Types.CREATE_ADDRESS_REQUEST]: createAddressRequest,
  [Types.CREATE_ADDRESS_SUCCESS]: createAddressSuccess,
  [Types.CREATE_ADDRESS_FAILURE]: createAddressFailure,
  [Types.SAVE_NEW_ADDRESS]: saveNewAddress,
  [Types.CHANGE_STREET]: changeStreet,
  [Types.CHANGE_ADDRESS2]: changeAddress2,
  [Types.CHANGE_CITY]: changeCity,
  [Types.CHANGE_STATE]: changeState,
  [Types.CHANGE_ZIP]: changeZip,
  [Types.CLEAR_ADDRESS]: clearAddress,
  [Types.ADD_STREET_VALIDATION_ERROR]: addStreetValidationError,
  [Types.ADD_CITY_VALIDATION_ERROR]: addCityValidationError,
  [Types.ADD_STATE_VALIDATION_ERROR]: addStateValidationError,
  [Types.ADD_ZIP_VALIDATION_ERROR]: addZipValidationError,
  [Types.DELETE_ADDRESS_REQUEST]: deleteAddressRequest,
  [Types.DELETE_ADDRESS_SUCCESS]: deleteAddressSuccess,
  [Types.DELETE_ADDRESS_FAILURE]: deleteAddressFailure,
  // add reducer hook up here

})
