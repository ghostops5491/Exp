import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter, last } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchJobsRequest: ['resolve', 'reject'],
  fetchCompletedJobsRequest: ['resolve', 'reject'],
  fetchJobsSuccess: null,
  fetchJobsFailure: null,
  saveActiveJobs: ['jobs'],
  setCurrentJob: ['id'],
  updateJobStateRequest: ['payload', 'resolve', 'reject'],
  updateJobStateSuccess: null,
  updateJobStateFailure: ['error'],
  updateCurrentJob: ['job'],
  fetchJobRequest: ['payload', 'resolve', 'reject'],
  fetchJobSuccess: null,
  fetchJobFailure: ['error'],
  addContractorMatch: ['job'],
  updateJobStateOnNotification: ['job'],
  dismissContractorMatch: null,
  showNonePreferredContractorMatch: null,
  dismissNonePreferredContractorMatch: null,
  showNoneContractorMatch: null,
  saveCompletedJobs: ['jobs'],
  updateJob: ['job'],
  saveUpcomingJobs: ['jobs'],
  fetchUpcomingJobsRequest: ['resolve', 'reject'],
  dismissNoneContractorMatch: null,
  getCancelEstimateRequest: ['payload', 'resolve', 'reject'],
  getCancelEstimateSuccess: null,
  getCancelEstimateFailure: ['error'],
  showQuoteOfferScreen: null,
  dismissQuoteOfferScreen: null,
  dismissNotificationsScreen: null,
  shareItineraryRequest: ['payload', 'resolve', 'reject'],
  shareItinerarySuccess: null,
  shareItineraryFailure: null,
  // add action here

})

export const JobTypes = Types
export default Creators

/* ------------- Initial State ------------- */


export const INITIAL_STATE = Immutable({
  allJobs: {},
  orderedActiveJobs: [],
  orderedUpcomingJobs: [],
  orderedPastJobs: [],
  currentJobId: null,
  fetching: null,
  showNonePreferredContractorMatch: false,
  showNoneContractorMatch: false,
  quoteOfferedForJob: false,
  jobStates:{
    WAITING: 'waiting',
    MATCHED: 'matched',
    ON_THE_WAY: 'on_the_way',
    ARRIVED: 'arrived',
    QUOTE_OFFER: 'quote_offer',
    QUOTE_CONFIRMED: 'quote_confirmed',
    QUOTE_REJECTED: 'quote_rejected',
    WORK_STARTED: 'work_started',
    WORK_PAUSED: 'work_paused',
    WORK_RESUMED: 'work_resumed',
    WORK_COMPLETED: 'work_completed',
    WORK_CANCELLED: 'work_cancelled',
  },
  recentContractorMatches: {},
})

/* ------------- Reducers ------------- */

export const fetchJobsRequest = (state) =>
  state.merge({ fetching: true, error: null })

export const fetchCompletedJobsRequest = (state) =>
  state.merge({ fetching: true, error: null })

export const fetchJobsSuccess = (state) =>
  state.merge({ fetching: false, error: null })

export const fetchJobsFailure = (state, action) =>
  state.merge({ fetching: false, error: action.error })

const saveJobs = (state, jobs, key) => {
  const hashedJobs = {}
  const orderedJobs = Immutable.flatMap(jobs, (job) => {
    hashedJobs[job.id] = job
    return job.id
  })
  return state.merge({
    allJobs: { ...state.allJobs, ...hashedJobs },
    [key]: orderedJobs,
  })
}

export const saveActiveJobs = (state, { jobs }) => {
  return saveJobs(state, jobs, 'orderedActiveJobs')
}

export const saveCompletedJobs = (state, { jobs }) => {
  return saveJobs(state, jobs, 'orderedPastJobs')
}

export const saveUpcomingJobs = (state, { jobs }) => {
  return saveJobs(state, jobs, 'orderedUpcomingJobs')
}

export const setCurrentJob = (state, action) =>
  state.set('currentJobId', action.id)

export const updateJobStateRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const updateJobStateSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const updateJobStateFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const updateCurrentJob = (state, { job }) => {
  const currentJobId = state.currentJobId
  const allJobs = state.allJobs
  return state.merge({ allJobs: { ...allJobs, [currentJobId]: job } })
}

export const updateJob = (state, { job }) =>
  state.merge({ allJobs: { ...state.allJobs, [job.id]: job } })

export const fetchJobRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const fetchJobSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const fetchJobFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const addContractorMatch = (state, { job }) => {
  let newState = state.set('currentJobId', job.id)
  newState = newState.merge({ allJobs: { ...state.allJobs, [job.id]: job } })
  return newState.set('recentContractorMatches', { jobId: job.id })
}

export const showNonePreferredContractorMatch = (state) =>
  state.merge({ showNonePreferredContractorMatch: true })

export const dismissNonePreferredContractorMatch = (state) =>
  state.merge({ showNonePreferredContractorMatch: false })

export const showNoneContractorMatch = (state) =>
  state.merge({ showNoneContractorMatch: true })

export const dismissNoneContractorMatch = (state) =>
  state.merge({ showNoneContractorMatch: false })

export const updateJobStateOnNotification = (state, { job }) => {
  return state.merge({ allJobs: { ...state.allJobs, [job.id]: job } })
}

export const dismissContractorMatch = (state, action) =>
  state.set('recentContractorMatches', {})

export const fetchUpcomingJobsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const showQuoteOfferScreen = (state) =>
  state.merge({ quoteOfferedForJob: true })

export const dismissQuoteOfferScreen = (state) =>
  state.merge({ quoteOfferedForJob: false })

export const dismissNotificationsScreen = (state) =>
  state.merge({ quoteOfferedForJob: false })

export const getCancelEstimateRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const getCancelEstimateSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const getCancelEstimateFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

  export const shareItineraryRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const shareItinerarySuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const shareItineraryFailure = (state, { error }) => {
  state.merge({ requesting: false, error })
}

// add new reducer here

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_JOBS_REQUEST]: fetchJobsRequest,
  [Types.FETCH_JOBS_SUCCESS]: fetchJobsSuccess,
  [Types.FETCH_JOBS_FAILURE]: fetchJobsFailure,
  [Types.SAVE_ACTIVE_JOBS]: saveActiveJobs,
  [Types.SET_CURRENT_JOB]: setCurrentJob,
  [Types.UPDATE_JOB_STATE_REQUEST]: updateJobStateRequest,
  [Types.UPDATE_JOB_STATE_SUCCESS]: updateJobStateSuccess,
  [Types.UPDATE_JOB_STATE_FAILURE]: updateJobStateFailure,
  [Types.UPDATE_CURRENT_JOB]: updateCurrentJob,
  [Types.FETCH_JOB_REQUEST]: fetchJobRequest,
  [Types.FETCH_JOB_SUCCESS]: fetchJobSuccess,
  [Types.FETCH_JOB_FAILURE]: fetchJobFailure,
  [Types.ADD_CONTRACTOR_MATCH]: addContractorMatch,
  [Types.DISMISS_CONTRACTOR_MATCH]: dismissContractorMatch,
  [Types.UPDATE_JOB_STATE_ON_NOTIFICATION]: updateJobStateOnNotification,
  [Types.SHOW_NONE_PREFERRED_CONTRACTOR_MATCH]: showNonePreferredContractorMatch,
  [Types.DISMISS_NONE_PREFERRED_CONTRACTOR_MATCH]: dismissNonePreferredContractorMatch,
  [Types.SHOW_NONE_CONTRACTOR_MATCH]: showNoneContractorMatch,
  [Types.SAVE_COMPLETED_JOBS]: saveCompletedJobs,
  [Types.FETCH_COMPLETED_JOBS_REQUEST]: fetchCompletedJobsRequest,
  [Types.SAVE_UPCOMING_JOBS]: saveUpcomingJobs,
  [Types.FETCH_UPCOMING_JOBS_REQUEST]: fetchUpcomingJobsRequest,
  [Types.UPDATE_JOB]: updateJob,
  [Types.DISMISS_NONE_CONTRACTOR_MATCH]: dismissNoneContractorMatch,
  [Types.SHOW_QUOTE_OFFER_SCREEN]: showQuoteOfferScreen,
  [Types.DISMISS_QUOTE_OFFER_SCREEN]: dismissQuoteOfferScreen,
  [Types.DISMISS_NOTIFICATIONS_SCREEN]: dismissNotificationsScreen,
  [Types.GET_CANCEL_ESTIMATE_REQUEST]: getCancelEstimateRequest,
  [Types.GET_CANCEL_ESTIMATE_SUCCESS]: getCancelEstimateSuccess,
  [Types.GET_CANCEL_ESTIMATE_FAILURE]: getCancelEstimateFailure,
  [Types.SHARE_ITINERARY_REQUEST]: shareItineraryRequest,
  [Types.SHARE_ITINERARY_SUCCESS]: shareItinerarySuccess,
  [Types.SHARE_ITINERARY_FAILURE]: shareItineraryFailure,
  // add reducer hook up here
})
