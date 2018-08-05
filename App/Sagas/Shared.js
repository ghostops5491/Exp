import get from 'lodash/get'

export function parseError(response) {
  let error = get(response, 'data.meta.message')
  if (!error && get(response, 'data.error'))
    error = get(response, 'data.error')
  if (response.problem === 'NETWORK_ERROR' || response.problem === 'SERVER_ERROR' || response.problem === 'TIMEOUT_ERROR')
    error = 'Backend server is down.'
  return error
}
