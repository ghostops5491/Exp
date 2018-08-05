// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { isEmpty } from 'lodash'
import { map } from 'App/Lib/lodash'
import Config from 'react-native-config'

  // our "constructor"
  const create = (baseURL = Config.API_URL) => {

  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      Accept: 'application/json'
    },
    // 10 second timeout...
    timeout: 10000
  })

  const apiStripe = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
      Accept: 'application/json'
    },
    // 10 second timeout...
    timeout: 30000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const getRoot = () => api.get('')

  const getRate = () => api.get('rate_limit')

  const getUser = username => api.get('search/users', {q: username})

  const login = (email, password, membership) =>
    api.post('sessions/sign_in', { email, password, membership })

  const signup = (email, password, password_confirmation) =>
    api.post('customers/sign_up', { email, password, password_confirmation })

  const forgotPassword = email =>
    api.post('customers/reset_password', {email})

  const signout = token =>
    api.delete('sessions/sign_out', {}, {headers: {Authorization: token}})

  const fetchAddresses = (token, customer_id) =>
    api.get('addresses', {customer_id}, {headers: {Authorization: token}})

  const fetchJobs = (token, job_statuses) =>
    api.get('jobs', {job_statuses}, {headers: {Authorization: token}})

  const fetchInvoiceRequest = (token, jobId) =>
    api.get(`jobs/${jobId}/invoice`, { }, { headers: { Authorization: token } })

  const verifyToken = token =>
    api.get('users/verify_token', {}, {headers: {Authorization: token}})

  const fetchProblemsRequest = (token, problem_category_id) =>
    api.get(
      'problems',
      {problem_category_id},
      {headers: {Authorization: token}}
    )

  const fetchProblemCategoriesRequest = token =>
    api.get('problem_categories', {}, {headers: {Authorization: token}})

  const createServiceRequestRequest = (token, serviceRequest) =>
    api.post('/service_requests', serviceRequest, {
      headers: {Authorization: token}
    })

  const uploadPhotoRequest = (token, job_id, photo_uri, photo_type) => {
    const formData = new FormData()
    formData.append('photo_uri', {
      uri: photo_uri,
      type: 'image/jpeg',
      name: 'photo_uri'
    })

    if(photo_type) {
      formData.append('photo_type', photo_type)
    }

    return api.post(`jobs/${job_id}/upload_photo`, formData, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  const createAddressRequest = (token, address) =>
    api.post(
      '/addresses',
      {...address},
      {headers: {Authorization: token}}
    )

  const updateJobStateRequest = (token, jobId, state, reason, notes) =>
    api.post(
      `jobs/${jobId}/state`,
      {state, reason, notes},
      {headers: {Authorization: token}}
    )

  const registerPushToken = (token, deviceToken, platform) =>
    api.post(
      'users/register_push_token',
      {token: deviceToken, platform},
      {headers: {Authorization: token}}
    )

  const fetchJobRequest = (token, jobId) =>
    api.get(`jobs/${jobId}`, {}, {headers: {Authorization: token}})

  const fetchNotificationsRequest = token =>
    api.get(`notifications`, {}, {headers: {Authorization: token}})

  const readNotificationRequest = (token, id) =>
    api.put(
      `notifications/${id}/mark_read`,
      {},
      {headers: {Authorization: token}}
    )

  const updateUser = (token, payload) =>
    api.put('customers/update', payload, {headers: {Authorization: token}})

  const fetchPreferredContractorsRequest = token =>
    api.get(
      '/customers/preferred_contractors',
      {},
      {headers: {Authorization: token}}
    )

  const addPreferredContractorRequest = (contractor_id, token) =>
    api.post(
      '/customers/preferred_contractor',
      {contractor_id},
      {headers: {Authorization: token}}
    )

  const invitePreferredContractorRequest = (
    token,
    invitee_email,
    invitee_name,
    phone_number
  ) =>
    api.post(
      '/customers/preferred_contractors/invite',
      {invitee_email, invitee_name, phone_number},
      {headers: {Authorization: token}}
    )

  const deleteAddressRequest = (token, id) =>
    api.delete('/addresses', {id}, {headers: {Authorization: token}})

  const acceptQuote = (token, id, quote_response) =>
    api.post(`jobs/${id}/quote_response`, {response: quote_response}, {headers: {'Authorization': token}})

  const deleteNotificationRequest = (token, id) =>
    api.delete(`notifications/${id}`, {}, {headers: {Authorization: token}})

  const deleteAllNotificationsRequest = (token) =>
    api.post(`notifications/delete_all`, {}, {headers: {Authorization: token}})

  const fetchNotification = (token, id) =>
    api.get(`/notifications/${id}`, {}, {headers: {Authorization: token}})

  const addPaymentMethodRequest = (token, cardData) =>
    apiStripe.post('/payment_methods', cardData, {
      headers: {Authorization: token}
    })

  const deletePaymentMethodRequest = (token, id) =>
    api.delete(`/payment_methods`, { id }, { headers: { Authorization: token } })

  const fetchPaymentMethods = token =>
    api.get('/payment_methods', {}, {headers: {Authorization: token}})

  const fetchAppSettings = token =>
    api.get('/app_settings', {}, {headers: {Authorization: token}})

  const uploadProfilePhoto = (token, profile_photo) => {
    let formData = new FormData()
    formData.append('profile_photo', {
      uri: profile_photo + '.jpg',
      type: 'image/jpeg',
      name: 'image'
    })
    return api.post('/customers/upload_profile_photo', formData, {
      headers: {Authorization: token}
    })
  }

  const sharePreferredContractorsRequest = (token, email, checked_ids) => {
    const ids = JSON.stringify(checked_ids)
    return api.post(
      '/customers/share_preferred_contractors',
      {email: email, checked_ids: ids},
      {headers: {Authorization: token}}
    )
  }

  const getContractorInfoRequest = (token, contractorId) => {
    return api.get(
      `/contractors/${contractorId}`,
      {},
      {headers: {Authorization: token}}
    )
  }

  const getCancelEstimateRequest = (token, jobId) => {
    return api.get(
      `jobs/${jobId}/cancellation_estimate`,
      {},
      { headers: { Authorization: token } }
    )
  }

  const fetchSharedContractorsRequest = (token, shareId) => {
    //console.log('calling shared_contractors api', shareId)
    return api.get(
      `/customers/shared_contractors/${shareId}`,
      {},
      {headers: {Authorization: token}}
    )
  }

  const mergeSharedContractorsRequest = (token, contractor_ids) => {
    //console.log('calling merge_preferred_contractors api', contractor_ids)
    const ids = JSON.stringify(contractor_ids)
    return api.post(
      '/customers/merge_preferred_contractors',
      {contractor_ids: ids},
      {headers: {Authorization: token}}
    )
  }

  const shareItinerary = (token, jobId, email, name) => {
     return  api.post(
        `jobs/${jobId}/share_itinerary`,
      { email, name },
      { headers: { Authorization: token } }
    )
  }

  // ADD_API_HANDLER

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    getRoot,
    getRate,
    getUser,
    login,
    signup,
    forgotPassword,
    signout,
    fetchAddresses,
    fetchJobs,
    verifyToken,
    registerPushToken,
    fetchProblemsRequest,
    fetchProblemCategoriesRequest,
    createServiceRequestRequest,
    createAddressRequest,
    updateJobStateRequest,
    updateUser,
    fetchJobRequest,
    fetchInvoiceRequest,
    uploadPhotoRequest,
    fetchPreferredContractorsRequest,
    addPreferredContractorRequest,
    sharePreferredContractorsRequest,
    getContractorInfoRequest,
    invitePreferredContractorRequest,
    fetchNotificationsRequest,
    readNotificationRequest,
    deleteAddressRequest,
    acceptQuote,
    deleteNotificationRequest,
    deleteAllNotificationsRequest,
    fetchNotification,
    addPaymentMethodRequest,
    deletePaymentMethodRequest,
    fetchPaymentMethods,
    fetchAppSettings,
    uploadProfilePhoto,
    getCancelEstimateRequest,
    fetchSharedContractorsRequest,
    mergeSharedContractorsRequest,
    shareItinerary
    // EXPORT_API_HANDLER
  }
}

// let's return back our create method as the default.
export default {
  create
}
