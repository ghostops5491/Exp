import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { isEmpty } from 'lodash'
import moment from 'moment'

const { Types, Creators } = createActions({
  changeCardNumber: ['cardNumber'],
  changeExpiryMonth: ['expiryMonth'],
  changeCvc: ['cvc'],
  changeExpiryYear: ['expiryYear'],
  addPaymentMethodRequest: ['payload', 'resolve', 'reject'],
  addPaymentMethodSuccess: null,
  addPaymentMethodFailure: ['error'],
  addApiError: ['error'],
  validateFormData: null,
  changeDefaultPayment: null,
  fetchPaymentMethodsRequest: ['resolve', 'reject'],
  fetchPaymentMethodsSuccess: null,
  fetchPaymentMethodsFailure: ['error'],
  savePaymentMethods: ['paymentMethods'],
  fetchAppSettingsRequest: ['resolve', 'reject'],
  fetchAppSettingsSuccess: null,
  fetchAppSettingsFailure: ['error'],
  saveAppSettings: ['appSettings'],
  savePaymentMethod: ['paymentMethod'],
  clearPaymentMethodForm: null,
  deletePaymentMethodRequest: ['payload', 'resolve', 'reject'],
  deletePaymentMethodSuccess: null,
  deletePaymentMethodFailure: ['error'],
  // add action here
})

export const PaymentsTypes = Types
export default Creators

/*  helper function - should be elsewhere */
const checkPaymentMethodExists = state => {
  let exists = true
  if (state.paymentMethods === null || state.paymentMethods.length === 0) {
    exists = false
  }
  return exists
}

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  accountForm: {
    cardNumber: '',
    expiryMonth: '',
    cvc: '',
    expiryYear: '',
    isDefault: true,
    errors: {
      cardNumber: null,
      expiryMonth: null,
      expiryYear: null,
      cvc: null,
      api: null
    }
  },
  error: null,
  paymentMethods: [],
  appSettings: {},
  paymentMethodExists: false
})

/* ------------- Reducers ------------- */

export const changeCardNumber = (state, { cardNumber }) => {
  let tempState = state.setIn(['accountForm', 'cardNumber'], cardNumber)
  tempState = tempState.merge({ error: null })
  return tempState.setIn(['accountForm', 'errors', 'cardNumber'], null)
}
export const changeExpiryMonth = (state, { expiryMonth }) => {
  let tempState = state.setIn(['accountForm', 'expiryMonth'], expiryMonth)
  tempState = tempState.merge({ error: null })
  return tempState.setIn(['accountForm', 'errors', 'expiryMonth'], null)
}
export const changeCvc = (state, { cvc }) => {
  let tempState = state.setIn(['accountForm', 'cvc'], cvc)
  tempState = tempState.merge({ error: null })
  return tempState.setIn(['accountForm', 'errors', 'cvc'], null)
}
export const changeExpiryYear = (state, { expiryYear }) => {
  let tempState = state.setIn(['accountForm', 'expiryYear'], expiryYear)
  tempState = tempState.merge({ error: null })
  return tempState.setIn(['accountForm', 'errors', 'expiryYear'], null)
}
export const addPaymentMethodRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const addPaymentMethodSuccess = (state, action) =>
  state.merge({ requesting: false, error: null, paymentMethodExists: true })

export const addPaymentMethodFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const addApiError = (state, { error }) => state.merge({ error })

export const validateFormData = (state, action) => {
  const accountForm = state.accountForm
  if (isEmpty(accountForm.cardNumber)) {
    return state.setIn(
      ['accountForm', 'errors', 'cardNumber'],
      'please enter a valid card number'
    )
  }
  const monthRegex = /^(0?[1-9]|1[012])$/
  if (!monthRegex.test(accountForm.expiryMonth)) {
    return state.setIn(
      ['accountForm', 'errors', 'expiryMonth'],
      'Please enter a valid expiry month'
    )
  }
  const yearRegex = /^\d{4}$/

  if (
    !yearRegex.test(accountForm.expiryYear) ||
    accountForm.expiryYear < moment().year()
  ) {
    return state.setIn(
      ['accountForm', 'errors', 'expiryYear'],
      'Please enter a valid expiry year'
    )
  }
  const cvcRegex = /^[0-9]{3,4}$/
  if (!cvcRegex.test(accountForm.cvc)) {
    return state.setIn(
      ['accountForm', 'errors', 'cvc'],
      'Please enter a valid cvc'
    )
  }

  return state.merge({
    accountForm: {
      ...state.accountForm,
      errors: {
        cardNumber: null,
        expiryMonth: null,
        expiryYear: null,
        cvc: null
      }
    }
  })
}

export const changeDefaultPayment = (state, { isDefault }) =>
  state.setIn(['accountForm', 'isDefault'], !state.accountForm.isDefault)

export const fetchPaymentMethodsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const fetchPaymentMethodsSuccess = (state, action) => {
  const exists = checkPaymentMethodExists(state)
  return state.merge({
    requesting: false,
    error: null,
    paymentMethodExists: exists
  })
}

export const fetchPaymentMethodsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const savePaymentMethods = (state, { paymentMethods }) =>
  state.set('paymentMethods', paymentMethods)

export const savePaymentMethod = (state, { paymentMethod }) => {
  let paymentMethods = state.paymentMethods
  paymentMethods = paymentMethods.concat(paymentMethod)
  return state.merge({ paymentMethods })
}

export const fetchAppSettingsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const fetchAppSettingsSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const fetchAppSettingsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const saveAppSettings = (state, { appSettings }) =>
  state.set('appSettings', appSettings)

export const clearPaymentMethodForm = (state, action) =>
  state.merge({
    accountForm: {
      ...state.accountForm,
      cardNumber: null,
      expiryMonth: null,
      expiryYear: null,
      cvc: null
    }
  })

export const deletePaymentMethodRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const deletePaymentMethodSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const deletePaymentMethodFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CHANGE_CARD_NUMBER]: changeCardNumber,
  [Types.CHANGE_EXPIRY_MONTH]: changeExpiryMonth,
  [Types.CHANGE_CVC]: changeCvc,
  [Types.CHANGE_EXPIRY_YEAR]: changeExpiryYear,
  [Types.ADD_PAYMENT_METHOD_REQUEST]: addPaymentMethodRequest,
  [Types.ADD_PAYMENT_METHOD_SUCCESS]: addPaymentMethodSuccess,
  [Types.ADD_PAYMENT_METHOD_FAILURE]: addPaymentMethodFailure,
  [Types.ADD_API_ERROR]: addApiError,
  [Types.VALIDATE_FORM_DATA]: validateFormData,
  [Types.CHANGE_DEFAULT_PAYMENT]: changeDefaultPayment,
  [Types.FETCH_PAYMENT_METHODS_REQUEST]: fetchPaymentMethodsRequest,
  [Types.FETCH_PAYMENT_METHODS_SUCCESS]: fetchPaymentMethodsSuccess,
  [Types.FETCH_PAYMENT_METHODS_FAILURE]: fetchPaymentMethodsFailure,
  [Types.SAVE_PAYMENT_METHODS]: savePaymentMethods,
  [Types.SAVE_PAYMENT_METHOD]: savePaymentMethod,
  [Types.FETCH_APP_SETTINGS_REQUEST]: fetchAppSettingsRequest,
  [Types.FETCH_APP_SETTINGS_SUCCESS]: fetchAppSettingsSuccess,
  [Types.FETCH_APP_SETTINGS_FAILURE]: fetchAppSettingsFailure,
  [Types.SAVE_APP_SETTINGS]: saveAppSettings,
  [Types.CLEAR_PAYMENT_METHOD_FORM]: clearPaymentMethodForm,
  [Types.DELETE_PAYMENT_METHOD_REQUEST]: deletePaymentMethodRequest,
  [Types.DELETE_PAYMENT_METHOD_SUCCESS]: deletePaymentMethodSuccess,
  [Types.DELETE_PAYMENT_METHOD_FAILURE]: deletePaymentMethodFailure,
  // add reducer hook up here
})
