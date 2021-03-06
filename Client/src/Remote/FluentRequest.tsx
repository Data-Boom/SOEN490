import SnackbarUtils from "../Components/Utils/SnackbarUtils"
import { isEmpty } from "lodash"
import { stringify } from "query-string"

const requestBase: RequestInit = {
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
}

export const get = (route: string): FluentRequest => {
  return new FluentRequest('GET', route)
}

export const post = (route: string): FluentRequest => {
  return new FluentRequest('POST', route)
}

export const put = (route: string): FluentRequest => {
  return new FluentRequest('PUT', route)
}

//underscore is needed so that JS does not confuse it with reserved delete keyword
export const _delete = (route: string): FluentRequest => {
  return new FluentRequest('DELETE', route)
}

export const patch = (route: string): FluentRequest => {
  return new FluentRequest('PATCH', route)
}

export class FluentRequest {
  private url: string
  private query: string
  private requestInit: RequestInit
  private headers: Headers

  constructor(method, route) {
    this.requestInit = { ...requestBase }
    this.requestInit.method = method
    this.url = route
    this.headers = new Headers()
    this.headers.append('Content-Type', 'application/json')
  }

  public withFile(file: File): FluentRequest {
    const formData = new FormData()
    formData.append('file', file)
    this.requestInit.body = formData
    this.headers.delete('Content-Type')
    return this
  }

  public withQuery(queryObject: unknown): FluentRequest {
    this.query = stringify(queryObject, { arrayFormat: 'bracket' })
    return this
  }

  public withBody(data: unknown): FluentRequest {
    this.requestInit.body = JSON.stringify(data)
    return this
  }

  public async call(): Promise<Response> {
    const url = this.query ? this.url + '?' + this.query : this.url
    this.requestInit.headers = this.headers
    return this.fetchRemote(url, this.requestInit)
  }

  public async json(): Promise<any> {
    const response = await this.call()
    if (response.status.toString().charAt(0) == '2') {
      return response.json()
    }
    else {
      const errorMessage = await response?.json()
      errorMessage && !isEmpty(errorMessage) && SnackbarUtils.error(errorMessage.error || errorMessage)
      return null
    }
  }

  private async fetchRemote(url: string, request: RequestInit): Promise<Response> {
    const response = await fetch(url, request)

    if (!response?.status || response.status.toString().charAt(0) == '5') {
      SnackbarUtils.error('Server Unavailable')
      return response
    }

    if (response.status.toString().charAt(0) == '2') {
      return response
    }

    if (response.status.toString().charAt(0) == '4') {
      return response
    }
  }
}