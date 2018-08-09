import { takeLatest, all } from 'redux-saga/effects'
import API from 'App/Services/Api'
import FixtureAPI from 'App/Services/FixtureApi'
import DebugConfig from 'App/Config/DebugConfig'

/* ------------- Types ------------- */

import ActionTypes from 'App/Redux/ActionTypes'

/* ------------- Sagas ------------- */

import StartupSagas from './StartupSagas'
import GithubSagas  from './GithubSagas'
import AuthSagas    from './AuthSagas'
import JobSagas     from './JobSagas'
import ProblemSagas     from './ProblemSagas'
import ProblemCategorySagas     from './ProblemCategorySagas'
import ServiceRequestSagas     from './ServiceRequestSagas'
import AddressSagas     from './AddressSagas'
import NotificationSagas     from './NotificationSagas'
import ContractorSagas     from './ContractorSagas'
import PaymentsSagas     from './PaymentsSagas'
// IMPORT_SAGAS

const Sagas = {
  ...StartupSagas,
  ...GithubSagas,
  ...AuthSagas,
  ...JobSagas,
  ...ProblemSagas,
  ...ProblemCategorySagas,
  ...ServiceRequestSagas,
  ...AddressSagas,
  ...NotificationSagas,
  ...ContractorSagas,
  ...PaymentsSagas,
  // SPREAD_SAGAS
}

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {

  yield all([
    // some sagas only receive an action
    takeLatest(ActionTypes.STARTUP, Sagas.startup),

    // some sagas receive extra parameters in addition to an action
    takeLatest(ActionTypes.USER_REQUEST, Sagas.getUserAvatar, api),
    takeLatest(ActionTypes.LOGIN_REQUEST, Sagas.makeLoginRequest, api),
    takeLatest(ActionTypes.VERIFY_TOKEN_REQUEST, Sagas.makeVerifyTokenRequest, api),
    takeLatest(ActionTypes.SIGNUP_REQUEST, Sagas.makeSignupRequest, api),
    takeLatest(ActionTypes.FORGOT_PASSWORD_REQUEST, Sagas.makeForgotPasswordRequest, api),
    takeLatest(ActionTypes.SIGNOUT_REQUEST, Sagas.makeSignoutRequest, api),
    takeLatest(ActionTypes.FETCH_JOBS_REQUEST, Sagas.makeFetchJobsRequest, api),
    takeLatest(ActionTypes.FETCH_PROBLEMS_REQUEST, Sagas.makeFetchProblemsRequest, api),
    takeLatest(ActionTypes.FETCH_PROBLEM_CATEGORIES_REQUEST, Sagas.makeFetchProblemCategoriesRequest, api),
    takeLatest(ActionTypes.CREATE_SERVICE_REQUEST_REQUEST, Sagas.makeCreateServiceRequestRequest, api),
    takeLatest(ActionTypes.FETCH_ADDRESSES_REQUEST, Sagas.makeFetchAddressesRequest, api),
    takeLatest(ActionTypes.CREATE_ADDRESS_REQUEST, Sagas.makeCreateAddressRequest, api),
    takeLatest(ActionTypes.UPDATE_JOB_STATE_REQUEST, Sagas.makeUpdateJobStateRequest, api),
    takeLatest(ActionTypes.UPDATE_USER_REQUEST, Sagas.makeUpdateUserRequest, api),
    takeLatest(ActionTypes.REGISTER_PUSH_TOKEN_REQUEST, Sagas.makeRegisterPushTokenRequest, api),
    takeLatest(ActionTypes.NOTIFICATION_RECEIVED, Sagas.onReceivedNotification, api),
    takeLatest(ActionTypes.CLEAR_NOTIFICATIONS, Sagas.clearNotifications, api),
    takeLatest(ActionTypes.FETCH_JOB_REQUEST, Sagas.makeFetchJobRequest, api),
    takeLatest(ActionTypes.UPLOAD_PHOTOS_REQUEST, Sagas.makeUploadPhotosRequest, api),
    takeLatest(ActionTypes.FETCH_COMPLETED_JOBS_REQUEST, Sagas.makeFetchCompletedJobsRequest, api),
    takeLatest(ActionTypes.FETCH_PREFERRED_CONTRACTORS_REQUEST, Sagas.makeFetchPreferredContractorsRequest, api),
    takeLatest(ActionTypes.ADD_PREFERRED_CONTRACTOR_REQUEST, Sagas.makeAddPreferredContractorRequest, api),
    takeLatest(ActionTypes.INVITE_PREFERRED_CONTRACTOR_REQUEST, Sagas.makeInvitePreferredContractorRequest, api),
    takeLatest(ActionTypes.FETCH_NOTIFICATIONS_REQUEST, Sagas.makeFetchNotificationsRequest, api),
    takeLatest(ActionTypes.READ_NOTIFICATION_REQUEST,Sagas.makeReadNotificationRequest, api),
    takeLatest(ActionTypes.DELETE_ADDRESS_REQUEST, Sagas.makeDeleteAddressRequest, api),
    takeLatest(ActionTypes.FETCH_UPCOMING_JOBS_REQUEST, Sagas.makeFetchUpcomingJobsRequest, api),
    takeLatest(ActionTypes.ACCEPT_QUOTE_REQUEST, Sagas.makeAcceptQuoteRequestRequest, api),
    takeLatest(ActionTypes.DELETE_NOTIFICATION_REQUEST, Sagas.makeDeleteNotificationsRequest, api),
    takeLatest(ActionTypes.DELETE_ALL_NOTIFICATIONS_REQUEST, Sagas.makeDeleteAllNotificationsRequest, api),
    takeLatest(ActionTypes.FETCH_NOTIFICATION_REQUEST, Sagas.makeFetchNotificationRequest, api),
    takeLatest(ActionTypes.UPLOAD_PROFILE_PHOTO_REQUEST, Sagas.makeUploadProfilePhoto, api),
    takeLatest(ActionTypes.ADD_PAYMENT_METHOD_REQUEST, Sagas.makeAddPaymentMethodRequest, api),
    takeLatest(ActionTypes.FETCH_PAYMENT_METHODS_REQUEST, Sagas.makeFetchPaymentMethods, api),
    takeLatest(ActionTypes.FETCH_APP_SETTINGS_REQUEST, Sagas.makeFetchAppSettings, api),
    takeLatest(ActionTypes.SHARE_PREFERRED_LIST_REQUEST, Sagas.makeSharePreferredListRequest, api),
    takeLatest(ActionTypes.GET_CANCEL_ESTIMATE_REQUEST, Sagas.makeGetCancelEstimateRequest, api),
    takeLatest(ActionTypes.FETCH_SHARED_CONTRACTORS_REQUEST, Sagas.makeFetchSharedContractorsRequest, api),
    takeLatest(ActionTypes.MERGE_SHARED_CONTRACTORS_REQUEST, Sagas.makeMergeSharedContractorsRequest, api),
    takeLatest(ActionTypes.SHARE_ITINERARY_REQUEST, Sagas.makeShareTimelineItineraryRequest, api),
    takeLatest(ActionTypes.DELETE_PAYMENT_METHOD_REQUEST, Sagas.makeDeletePaymentMethodRequest, api),
    takeLatest(ActionTypes.GET_CONTRACTOR_INFO_REQUEST, Sagas.makeGetContractorInfoRequest, api)
    // REGISTRER_SAGA
  ])
}
