
// ideally this will come from some config and not hardcoded that will change if we run local vs live
// serviceUrl = env.process.serviceUrl
const serviceUrl = 'localhost:3000'

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
  const url = serviceUrl + route
  const token = 'test' //todo how to get token

  const response = await fetchRemote(url, 'POST', token, data)
  return response.json()
}

export const get = async (route: string): Promise<any> => {
  const url = serviceUrl + route
  const token = 'test' //todo how to get token

  const response = await fetchRemote(url, 'GET', token)
  return response.json()
}

const fetchRemote = async (url: string, method: string, token: string, data: any = {}): Promise<Response> => {
  const request: RequestInit = { ...requestBase }
  setAuthToken(request, token)
  setMethod(request, method)
  setData(data)

  return fetch(url, request)
}

const setAuthToken = (request: RequestInit, token: string) => {
  request.headers['X-Access-Token'] = token
}

const setMethod = (request: RequestInit, method: string) => {
  request.method = method
}

const setData = (request: RequestInit, data: any = {}) => {
  request.body = JSON.stringify(data)
}