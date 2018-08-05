import { AsyncStorage } from 'react-native'
import { call, put } from 'redux-saga/effects'
import { get, isEmpty } from 'lodash'
import { withNavigation } from 'react-navigation';
import Actions from 'App/Redux/Actions'
import { selectToken } from 'App/Lib/Auth'
import { parseError } from './Shared'

const notificationType = {
  CONTRACTOR_MATCHED: 'contractor_matched',
  PREFERRED_CONTRACTOR_FOUND: 'preferred_contractor_matched',
  NONE_PREFERRED_CONTRACTOR_AVAILABLE: "none_preferred_contractor_available",
  ON_THE_WAY: 'on_the_way',
  CONTRACTOR_ARRIVED: 'arrived',
  QUOTE_CONFIRMED: 'quote_confirmed',
  JOB_STARTED: 'work_started',
  JOB_PAUSED: 'work_paused',
  JOB_RESUMED: 'work_resumed',
  JOB_CANCELLED: 'work_cancelled',
  JOB_COMPLETED: 'work_completed',
  NONE_CONTRACTOR_AVAILABLE: 'none_contractor_available',
  QUOTE_OFFER: 'quote_offer',
}

function* onReceivedNotification(api, action) {
  let { notification } = action
  console.log(notification);
  const { data: { job_id, notification_id } } = notification;
  switch (notification.data.type) {
    case notificationType.PREFERRED_CONTRACTOR_FOUND:
    case notificationType.CONTRACTOR_MATCHED: {
      const token = yield call(selectToken)
      const response = yield call(api.fetchJobRequest, token, job_id)
      if (response.ok) {
        const jobData = get(response, 'data.data');
        if (!isEmpty(jobData)) {
          yield put(Actions.updateJobStateOnNotification(jobData));
        }
        yield put(Actions.addContractorMatch(jobData));
      }
      break;
    }

    case notificationType.QUOTE_OFFER: {
      const token = yield call(selectToken)
      const response = yield call(api.fetchJobRequest, token, job_id)
      if (response.ok) {
        const jobData = get(response, 'data.data');
        if (!isEmpty(jobData)) {
          yield put(Actions.updateJobStateOnNotification(jobData));
        }
      }
      yield put(Actions.showQuoteOfferScreen())
      break;
    }

    case notificationType.NONE_CONTRACTOR_AVAILABLE: {
      yield put(Actions.showNoneContractorMatch());
      break;
    }

    case notificationType.ON_THE_WAY:
    case notificationType.CONTRACTOR_ARRIVED:
    case notificationType.QUOTE_CONFIRMED:
    case notificationType.JOB_STARTED:
    case notificationType.JOB_PAUSED:
    case notificationType.JOB_RESUMED:
    case notificationType.JOB_CANCELLED:
    case notificationType.JOB_COMPLETED: {
      const token = yield call(selectToken)
      const response = yield call(api.fetchJobRequest, token, job_id)
      if (response.ok) {
        const jobData = get(response, 'data.data');
        if (!isEmpty(jobData)) {
          yield put(Actions.updateJobStateOnNotification(jobData));
        }
      }
      break;
    }
  }
}

function* clearNotifications(api, action) {
  put(Actions.clearNotifications())
  return true
}

function* makeFetchNotificationsRequest(api, action) {
  const { resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.fetchNotificationsRequest, token)
  if (response.ok) {
    const notifications = get(response, 'data.data')
    yield put(Actions.saveNotificationsLocal(notifications))
    yield put(Actions.fetchNotificationsSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.fetchNotificationsFailure(error))
    return reject(error)
  }
}

function* makeReadNotificationRequest(api, action) {
  const { notificationId, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.readNotificationRequest, token, notificationId)
  if (response.ok) {
    yield put(Actions.readNotificationSuccess())
    yield put(Actions.setNotificationAsRead(notificationId))
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.readNotificationFailure(error))
    return reject(error)
  }
}

export function* makeRegisterPushTokenRequest(api, action) {
  const { deviceToken } = action
  const token = yield call(selectToken)
  const response = yield call(api.registerPushToken, token, deviceToken.token, deviceToken.os);
  if (response.ok) {
    yield put(Actions.markDeviceRegistered())
  } else {
    const error = parseError(response)
    yield put(Actions.registerPushTokenFailure(error))
  }
}

function* makeDeleteNotificationsRequest(api, action) {
  const { id, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.deleteNotificationRequest, token, id)
  if (response.ok) {
    const data = get(response, 'data.data')
    yield put(Actions.deleteNotificationSuccess())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.deleteNotificationFailure(error))
    return reject(error)
  }
}

function* makeDeleteAllNotificationsRequest(api, action) {
  const { resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.deleteAllNotificationsRequest, token)
  if (response.ok) {
    yield put(Actions.deleteAllNotificationsSuccess())
    yield put(Actions.deleteNotificationsLocal())
    return resolve()
  } else {
    const error = parseError(response)
    yield put(Actions.deleteAllNotificationsFailure(error))
    return reject(error)
  }
}

function* makeFetchNotificationRequest(api, action) {
  const { payload: { notification_id }, resolve, reject } = action
  const token = yield call(selectToken)
  const response = yield call(api.fetchNotification, token, notification_id)
  if (response.ok) {
    const data = get(response, 'data.data')
    yield put(Actions.fetchNotificationSuccess())
    return resolve(data)
  } else {
    const error = parseError(response)
    if (response.problem === 'NETWORK_ERROR')
      error = 'Backend server is down.'
    yield put(Actions.fetchNotificationFailure(error))
    return reject(error)
  }
}

// ADD_SAGA_ACTION

export default withNavigation({
  onReceivedNotification,
  clearNotifications,
  makeRegisterPushTokenRequest,
  makeFetchNotificationsRequest,
  makeReadNotificationRequest,
  makeDeleteNotificationsRequest,
  makeDeleteAllNotificationsRequest,
  makeFetchNotificationRequest,
  // EXPORT_SAGA_ACTION
})
