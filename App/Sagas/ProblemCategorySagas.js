import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import get from 'lodash/get'
import Actions from 'App/Redux/Actions'
import { selectToken } from 'App/Lib/Auth'
import { parseError } from './Shared'

function * makeFetchProblemCategoriesRequest (api, action) {
  const { resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.fetchProblemCategoriesRequest, token)
  if (response.ok) {
    const data = get(response, 'data.data')
    yield put(Actions.saveProblemCategoriesLocal(data))
    yield put(Actions.fetchProblemCategoriesSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.fetchProblemCategoriesFailure(error))
    return reject(error)
  }
}

// ADD_SAGA_ACTION

export default {
  makeFetchProblemCategoriesRequest,
  // EXPORT_SAGA_ACTION
}
