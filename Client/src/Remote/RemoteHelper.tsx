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

  return fetchRemote(url, 'POST', data)
}

export const get = async (route: string): Promise<any> => {
  const url = route

  return fetchRemote(url, 'GET')
}

const fetchRemote = async (url: string, method: string, data: any = {}): Promise<Response> => {
  const request: RequestInit = { ...requestBase }
  setMethod(request, method)
  setData(request, data)

  try {
    const response = await fetch(url, request)

    if (response.status.toString().charAt(0) == '5' && !response.body) {
      SnackbarUtils.error('Server Unavailable')
      return Promise.resolve(null)
    }

    const message = await response.json()
    SnackbarUtils.warning('parsed fine')
    if (response.status.toString().charAt(0) == '2') {
      return message
    }

    if (response.status.toString().charAt(0) == '4') {
      SnackbarUtils.warning(message)
      return Promise.resolve(null)
    }
  }
  catch (error) {
    SnackbarUtils.error('Exception occurred please do not punish developers')
    return Promise.resolve(null)
  }
}

const setMethod = (request: RequestInit, method: string) => {
  request.method = method
}

const setData = (request: RequestInit, data: any = {}) => {
  request.body = JSON.stringify(data)
}