import { RequestExecutorTemplate } from '../RequestExecutorTemplate'

export class FileUploadRequestExecutor extends RequestExecutorTemplate {
  private file: File

  constructor(route: string, file: File) {
    super(route)
    this.file = file
  }
  protected setRequestMethod(request: RequestInit): void {
    request.method = 'POST'
  }

  protected setRequestBody(request: RequestInit): void {
    const formData = new FormData()
    formData.append('file', this.file)
    request.body = formData
  }

  //for file formData upload browser automatically sets headers
  protected setHeaders(request: RequestInit): void { }
}