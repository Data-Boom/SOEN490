import SnackbarUtils from "../../Components/Utils/SnackbarUtils"
import { stringify } from "query-string"

const requestBase: RequestInit = {
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
}

export abstract class RequestExecutorTemplate {
  private url: string
  private queryObject: any

  constructor(route: string, queryObject: any = '') {
    this.url = route
    this.queryObject = queryObject
  }

  public execute = async (): Promise<any> => {
    const request = { ...requestBase }
    this.setHeaders(request)
    this.setRequestMethod(request)
    this.setRequestBody(request)

    try {
      return this.fetchRemote(this.buildUrl(), request)
    }
    catch (error) {
      SnackbarUtils.error('Exception occurred please do not punish developers')
      //todo ideally this gets logged into appinsights or somehting like that
      console.error(error)
      return Promise.resolve(null)
    }
  }

  protected buildUrl(): string {
    if (this.queryObject) {
      return this.url + '?' + stringify(this.queryObject, { arrayFormat: 'bracket' })
    }

    return this.url
  }

  protected abstract setHeaders(request: RequestInit): void
  protected abstract setRequestMethod(request: RequestInit): void
  protected abstract setRequestBody(request: RequestInit): void

  private fetchRemote = async (url: string, request: RequestInit): Promise<Response> => {
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