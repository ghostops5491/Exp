import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import get from 'lodash/get'
import Actions from 'App/Redux/Actions'
import { parseError } from './Shared'
import { selectToken } from 'App/Lib/Auth'

function * makeFetchJobsRequest (api, action) {
  const { resolve, reject } = action
  const token = yield call(selectToken)
  const job_statuses = 'waiting,matched,active,paused'
  const response = yield call(api.fetchJobs, token, job_statuses)
  if (response.ok) {
    const jobs = get(response, 'data.data')
    yield put(Actions.saveActiveJobs(jobs))
    yield put(Actions.fetchJobsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.fetchJobsFailure(error))
    return reject(error)
  }
}

function * makeFetchCompletedJobsRequest (api, action) {
  const { resolve, reject } = action
  const token = yield call(selectToken)
  const job_statuses = 'completed'
  const response = yield call(api.fetchJobs, token, job_statuses)
  if (response.ok) {
    const jobs = get(response, 'data.data')
    yield put(Actions.saveCompletedJobs(jobs))
    yield put(Actions.fetchJobsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.fetchJobsFailure(error))
    return reject(error)
  }
}

function * makeUpdateJobStateRequest (api, action) {
  const { payload: { jobId, state, reason, notes }, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.updateJobStateRequest, token, jobId, state, reason, notes)
  if (response.ok) {
    const job = get(response, 'data.data')
    yield put(Actions.updateCurrentJob(job))
    yield put(Actions.updateJobStateSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.updateJobStateFailure(error))
    return reject(error)
  }
}

function * makeFetchJobRequest (api, action) {
  const { payload: { jobId }, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.fetchJobRequest, token, jobId)
  if (response.ok) {
    const job = get(response, 'data.data')
    yield put(Actions.setCurrentJob(job.id))
    yield put(Actions.updateCurrentJob(job))
    yield put(Actions.fetchJobSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.fetchJobFailure(error))
    return reject(error)
  }
}

function * makeFetchUpcomingJobsRequest (api, action) {
  const { resolve, reject } = action
  const token = yield call(selectToken)
  const job_statuses = 'scheduled'
  const response = yield call(api.fetchJobs, token, job_statuses)
  if (response.ok) {
    const jobs = get(response, 'data.data')
    yield put(Actions.saveUpcomingJobs(jobs))
    yield put(Actions.fetchJobsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.fetchJobsFailure(error))
    return reject(error)
  }
}
function * makeGetCancelEstimateRequest (api, action) {
  const { payload: { jobId }, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.getCancelEstimateRequest, token, jobId)
  if (response.ok) {
    const job = get(response, 'data.data')
    yield put(Actions.setCurrentJob(job.id))
    yield put(Actions.updateCurrentJob(job))
    yield put(Actions.getCancelEstimateSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.getCancelEstimateFailure(error))
    return reject(error)
  }
}

function * makeShareTimelineItineraryRequest(api, action) {
  const { payload: { jobId, name, email}, resolve, reject } = action

  const token = yield call(selectToken)
  const response = yield call(api.shareItinerary, token, jobId, email, name)

  if (response.ok) {
    yield put(Actions.shareItinerarySuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.shareItineraryFailure(error))
    return reject(error)
   }

}
// ADD_SAGA_ACTION

export default {
  makeFetchJobsRequest,
  makeUpdateJobStateRequest,
  makeFetchJobRequest,
  makeFetchCompletedJobsRequest,
  makeFetchUpcomingJobsRequest,
  makeGetCancelEstimateRequest,
  makeShareTimelineItineraryRequest
  // EXPORT_SAGA_ACTION
}
