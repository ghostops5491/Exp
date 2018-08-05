import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, last } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchInvoiceRequest: ["jobId", "resolve", "reject"],
  fetchInvoiceSuccess: ["invoice"],
  fetchInvoiceFailure: ["error"],
  // add action here
})

export const InvoiceTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  current: [],
})

/* ------------- Reducers ------------- */

export const fetchInvoiceRequest = (state) =>
  state.merge({ fetching: true, error: null })

export const fetchInvoiceSuccess = (state, { invoice }) =>
  state.merge({
    current: invoice.invoice_items,
    requesting: false,
    error: null
  })

export const fetchInvoiceFailure = (state, action) =>
  state.merge({ fetching: false, error: action.error })

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_INVOICE_REQUEST]: fetchInvoiceRequest,
  [Types.FETCH_INVOICE_SUCCESS]: fetchInvoiceSuccess,
  [Types.FETCH_INVOICE_FAILURE]: fetchInvoiceFailure,
  // add reducer hook up here
})
