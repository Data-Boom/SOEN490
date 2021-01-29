import { JsonRequestExecutor } from '../JsonRequestExecutor'

export class GetRequestExecutor extends JsonRequestExecutor {
  constructor(route: string, queryObject: any = '') {
    super(route, queryObject)
  }

  protected setRequestMethod(request: RequestInit): void {
    request.method = 'GET'
  }

  protected setRequestBody(request: RequestInit): void { }
}