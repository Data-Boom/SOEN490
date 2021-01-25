import { get } from "../RemoteHelper"

const categoryRoute = '/category'

interface ICategoryModel {
  id: number,
  name: string

}

export const listCategories = async (): Promise<ICategoryModel[]> => {
  const categories = await get(categoryRoute)
  return categories
}