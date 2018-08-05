import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import get from 'lodash/get'
import Actions from 'App/Redux/Actions'
import { selectToken } from 'App/Lib/Auth'
import { parseError } from './Shared'

function * makeFetchProblemsRequest (api, action) {
  const { categoryId, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.fetchProblemsRequest, token, categoryId)
  if (response.ok) {
    const data = get(response, 'data.data')
    yield put(Actions.saveProblemsLocal(data))
    yield put(Actions.fetchProblemsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.fetchProblemsFailure(error))
    return reject(error)
  }
}

// ADD_SAGA_ACTION

export default {
  makeFetchProblemsRequest,
  // EXPORT_SAGA_ACTION
}
