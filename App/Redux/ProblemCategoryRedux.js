import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchProblemCategoriesRequest: ['resolve', 'reject'],
  fetchProblemCategoriesSuccess: null,
  fetchProblemCategoriesFailure: ['error'],
  saveProblemCategoriesLocal: ['categories'],
  selectProblemCategory: ['category'],
  clearSelectedProblemCategory: null,
  // add action here
})

export const ProblemCategoryTypes = Types
export default Creators

/* ------------- Initial State ------------- */


export const INITIAL_STATE = Immutable({
  categories: [],
  requesting: null,
  error: null,
  selectedCategory: null,
})

/* ------------- Reducers ------------- */
export const fetchProblemCategoriesRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const fetchProblemCategoriesSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const fetchProblemCategoriesFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const saveProblemCategoriesLocal = (state, { categories }) =>
  state.set('categories', categories)

export const selectProblemCategory = (state, { category }) =>
  state.merge({ selectedCategory: category })

export const clearSelectedProblemCategory = (state, action) =>
  state.merge({ selectedCategory: null })

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_PROBLEM_CATEGORIES_REQUEST]: fetchProblemCategoriesRequest,
  [Types.FETCH_PROBLEM_CATEGORIES_SUCCESS]: fetchProblemCategoriesSuccess,
  [Types.FETCH_PROBLEM_CATEGORIES_FAILURE]: fetchProblemCategoriesFailure,
  [Types.SAVE_PROBLEM_CATEGORIES_LOCAL]: saveProblemCategoriesLocal,
  [Types.SELECT_PROBLEM_CATEGORY]: selectProblemCategory,
  [Types.CLEAR_SELECTED_PROBLEM_CATEGORY]: clearSelectedProblemCategory,
  // add reducer hook up here
})
