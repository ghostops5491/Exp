import { createActions, createReducer } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { get, some, map, sortBy } from 'lodash'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  registerPushTokenRequest: ['deviceToken'],
  registerPushTokenFailure: ['error'],
  notificationReceived: ['notification'],
  clearNotifications: null,
  savePushTokenLocal: ['deviceToken'],
  fetchNotificationsRequest: ['resolve', 'reject'],
  fetchNotificationsSuccess: null,
  fetchNotificationsFailure: ['error'],
  markDeviceRegistered: null,
  setCurrentNotification: ['notificationId'],
  saveNotificationsLocal: ['notifications'],
  deleteNotificationsLocal: null,
  readNotificationRequest: ['notificationId', 'resolve', 'reject'],
  readNotificationSuccess: null,
  readNotificationFailure: ['error'],
  deleteNotificationRequest: ['id', 'resolve', 'reject'],
  deleteNotificationSuccess: null,
  deleteNotificationFailure: ['error'],
  deleteAllNotificationsRequest: ['resolve', 'reject'],
  deleteAllNotificationsSuccess: null,
  deleteAllNotificationsFailure: ['error'],
  fetchNotificationRequest: ['payload', 'resolve', 'reject'],
  fetchNotificationSuccess: null,
  fetchNotificationFailure: ['error'],
  setNotificationAsRead: ['id'],
  setCurrentShare: ['id'],
  // add action here

})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  allNotifications: {},
  deviceToken: {
    deviceRegistered: false,
  },
  currentShareId: null,
})

/* ------------- Reducers ------------- */

export const registerPushTokenRequest = (state, action) => state

export const registerPushTokenFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const notificationReceived = (state, { notification }) => {
  const notificationId = get(notification, 'data.notification_id')
  const allNotifications = state.allNotifications
  return state.merge({
    allNotifications: {
      ...allNotifications,
      [notificationId]: notification.data
    },
    showNotiBadge: true,
  })
}

export const clearNotifications = (state) => {
  return state.merge({
    sortedNotifications: [],
    showNotiBadge: false
  })
}

export const savePushTokenLocal = (state, { deviceToken }) =>
  state.set('deviceToken', deviceToken)

export const markDeviceRegistered = (state, action) =>
  state.setIn(['deviceToken', 'deviceRegistered'], true)

export const fetchNotificationsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const saveNotificationsLocal = (state, { notifications }) => {
  const allNotifications = {}
  const sortedNotifications = []
  const readStatuses = []
  const ordered = Immutable.flatMap(notifications, n => {
    allNotifications[n.id] = {
      ...n.data,
      read: n.read,
      notification_id: n.id,
      service_time: n.service_time,
    }
    sortedNotifications.push(n.id)
    readStatuses.push(n.read)
  })
  return state.merge({
    showNotiBadge: some(map(readStatuses, r => !r)),
    allNotifications,
    sortedNotifications
  })
}

export const deleteNotificationsLocal = (state) => {
  const allNotifications = {}
  const sortedNotifications = []
  return state.merge({
    showNotiBadge: false,
    allNotifications,
    sortedNotifications
  })
}

export const setNotificationAsRead = (state, { id }) => {
  const notification = state.allNotifications[id]
  if (notification) {
    return state.merge({
      allNotifications: {
        ...state.allNotifications,
        [id]: { ...notification, read: true }
      }
    })
  }
  return state
}

export const readNotificationRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const readNotificationSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const readNotificationFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const setCurrentNotification = (state, { notificationId }) =>
  state.merge({ currentNotification: state.allNotifications[notificationId] })

export const fetchNotificationsSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const fetchNotificationsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const deleteNotificationRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const deleteNotificationSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const deleteNotificationFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const deleteAllNotificationsRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const deleteAllNotificationsSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const deleteAllNotificationsFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const fetchNotificationRequest = (state, action) =>
  state.merge({ requesting: true, error: null })

export const fetchNotificationSuccess = (state, action) =>
  state.merge({ requesting: false, error: null })

export const fetchNotificationFailure = (state, { error }) =>
  state.merge({ requesting: false, error })

export const setCurrentShare = (state, action) => {
  console.log('setCurrentShare:', state, action)
  console.log('action.id:', action.id)
  return state.merge({currentShareId: action.id})
}



// add new reducer here


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.REGISTER_PUSH_TOKEN_REQUEST]: registerPushTokenRequest,
  [Types.REGISTER_PUSH_TOKEN_FAILURE]: registerPushTokenFailure,
  [Types.NOTIFICATION_RECEIVED]: notificationReceived,
  [Types.CLEAR_NOTIFICATIONS]: clearNotifications,
  [Types.SAVE_PUSH_TOKEN_LOCAL]: savePushTokenLocal,
  [Types.MARK_DEVICE_REGISTERED]: markDeviceRegistered,
  [Types.SET_CURRENT_NOTIFICATION]: setCurrentNotification,
  [Types.FETCH_NOTIFICATIONS_REQUEST]: fetchNotificationsRequest,
  [Types.FETCH_NOTIFICATIONS_SUCCESS]: fetchNotificationsSuccess,
  [Types.FETCH_NOTIFICATIONS_FAILURE]: fetchNotificationsFailure,
  [Types.SAVE_NOTIFICATIONS_LOCAL]: saveNotificationsLocal,
  [Types.DELETE_NOTIFICATIONS_LOCAL]: deleteNotificationsLocal,
  [Types.READ_NOTIFICATION_REQUEST_REQUEST]: readNotificationRequest,
  [Types.READ_NOTIFICATION_REQUEST_SUCCESS]: readNotificationSuccess,
  [Types.READ_NOTIFICATION_REQUEST_FAILURE]: readNotificationFailure,
  [Types.DELETE_NOTIFICATION_REQUEST]: deleteNotificationRequest,
  [Types.DELETE_NOTIFICATION_SUCCESS]: deleteNotificationSuccess,
  [Types.DELETE_NOTIFICATION_FAILURE]: deleteNotificationFailure,
  [Types.DELETE_ALL_NOTIFICATIONS_REQUEST]: deleteAllNotificationsRequest,
  [Types.DELETE_ALL_NOTIFICATIONS_SUCCESS]: deleteAllNotificationsSuccess,
  [Types.DELETE_ALL_NOTIFICATIONS_FAILURE]: deleteAllNotificationsFailure,
  [Types.FETCH_NOTIFICATION_REQUEST]: fetchNotificationRequest,
  [Types.FETCH_NOTIFICATION_SUCCESS]: fetchNotificationSuccess,
  [Types.FETCH_NOTIFICATION_FAILURE]: fetchNotificationFailure,
  [Types.SET_NOTIFICATION_AS_READ]: setNotificationAsRead,
  [Types.SET_CURRENT_SHARE]: setCurrentShare,
  // add reducer hook up here

})
