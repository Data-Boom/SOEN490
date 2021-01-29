import { GetRequestExecutor } from "../RequestExecutor/Implementation/GetRequestExecutor"

const categoryRoute = '/category'

interface ICategoryModel {
  id: number,
  name: string

}

export const listCategories = async (): Promise<ICategoryModel[]> => {
  const requestExecutor = new GetRequestExecutor(categoryRoute)
  const categories = await requestExecutor.execute()
  return categories
}