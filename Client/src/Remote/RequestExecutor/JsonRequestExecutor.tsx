import { RequestExecutorTemplate } from './RequestExecutorTemplate'

export abstract class JsonRequestExecutor extends RequestExecutorTemplate {
  protected setHeaders(request: RequestInit): void {
    request.headers = { 'Content-Type': 'application/json' }
  }
}