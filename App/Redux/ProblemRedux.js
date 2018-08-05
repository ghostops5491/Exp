import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchProblemsRequest: ['categoryId', 'resolve', 'reject'],
  fetchProblemsSuccess: null,
  fetchProblemsFailure: ['error'],
  saveProblemsLocal: ['problems'],
  selectProblem: ['problem'],
  clearSelectedProblem: null,
  // add action here
})

export const ProblemTypes = Types
export default Creators

/* ------------- Initial State ------------- */


export const INITIAL_STATE = Immutable({
  allProblems: [],
  selectedProblem: null,
  error: null,
  fetching: null,
})

/* ------------- Reducers ------------- */
export const fetchProblemsRequest = (state, action) =>
  state.merge({ fetching: true, error: null })

export const fetchProblemsSuccess = (state, action) =>
  state.merge({ fetching: false, error: null })

export const fetchProblemsFailure = (state, { error }) =>
  state.merge({ fetching: false, error })

export const saveProblemsLocal = (state, { problems }) =>
  state.set('allProblems', problems)

export const selectProblem = (state, { problem }) =>
  state.set('selectedProblem', problem)

export const clearSelectedProblem = (state, action) =>
  state.merge({ selectedProblem: null })

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_PROBLEMS_REQUEST]: fetchProblemsRequest,
  [Types.FETCH_PROBLEMS_SUCCESS]: fetchProblemsSuccess,
  [Types.FETCH_PROBLEMS_FAILURE]: fetchProblemsFailure,
  [Types.SAVE_PROBLEMS_LOCAL]: saveProblemsLocal,
  [Types.SELECT_PROBLEM]: selectProblem,
  [Types.CLEAR_SELECTED_PROBLEM]: clearSelectedProblem,
  // add reducer hook up here
})
