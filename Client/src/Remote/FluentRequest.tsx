import SnackbarUtils from "../Components/Utils/SnackbarUtils"
import { stringify } from "query-string"

const requestBase: RequestInit = {
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
  headers: { 'Content-Type': 'application/json' },
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

  public withQuery(queryObject: any): FluentRequest {
    this.query = stringify(queryObject, { arrayFormat: 'bracket' })
    return this
  }

  public withBody(data: any): FluentRequest {
    this.requestInit.body = data
    return this
  }

  public async call(): Promise<Response> {
    console.log("🚀 ~ file: FluentRequest.tsx ~ line 63 ~ FluentRequest ~ withBody ~ this.requestInit", this.requestInit)
    const url = this.query ? this.url + '?' + this.query : this.url
    return this.fetchRemote(url, this.requestInit)
  }

  public async json(): Promise<any> {
    const response = await this.call()
    return response.json()
  }

  private async fetchRemote(url: string, request: RequestInit): Promise<Response> {
    const response = await fetch(url, request)

    if (response.status.toString().charAt(0) == '5') {
      SnackbarUtils.error('Server Unavailable')
      return Promise.resolve(null)
    }

    const message = await response.json()

    if (response.status.toString().charAt(0) == '2') {
      return message
    }

    if (response.status.toString().charAt(0) == '4') {
      SnackbarUtils.warning(JSON.stringify(message))
      return message
    }
  }
}