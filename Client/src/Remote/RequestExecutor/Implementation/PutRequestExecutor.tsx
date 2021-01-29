import { JsonRequestExecutor } from '../JsonRequestExecutor'

export class PutRequestExecutor extends JsonRequestExecutor {
  private data: any

  constructor(route: string, data: any, queryObject: any = null) {
    super(route, queryObject)
    this.data = data
  }

  protected setRequestMethod(request: RequestInit): void {
    request.method = 'PUT'
  }

  protected setRequestBody(request: RequestInit): void {
    request.body = this.data
  }
}