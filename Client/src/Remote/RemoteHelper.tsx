import SnackbarUtils from '../Components/SnackbarUtils'

// ideally this will come from some config and not hardcoded that will change if we run local vs live
// serviceUrl = env.process.serviceUrl
const requestBase: RequestInit = {
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
}

export const post = async (data: any, route: string): Promise<any> => {
  const url = route

  const response = await fetchRemote(url, 'POST', data)
  const result = await response.json()

  if (response.status !== 200 && response.status !== 201) {
    SnackbarUtils.error(result)
  }

  return result
}

export const get = async (route: string): Promise<any> => {
  const url = route

  const response = await fetchRemote(url, 'GET')
  return response.json()
}

const fetchRemote = async (url: string, method: string, data: any = {}): Promise<Response> => {
  const request: RequestInit = { ...requestBase }
  setMethod(request, method)
  setData(request, data)

  try {
    return fetch(url, request)
  }
  catch (error) {
    //todo no logs should be on the site should pop up an alert instead
    SnackbarUtils.error(error)
    return Promise.resolve(null)
  }
}

const setMethod = (request: RequestInit, method: string) => {
  request.method = method
}

const setData = (request: RequestInit, data: any = {}) => {
  request.body = JSON.stringify(data)
}