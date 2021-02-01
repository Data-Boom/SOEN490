import { get } from "../FluentRequest"

const categoryRoute = '/category'

interface ICategoryModel {
  id: number,
  name: string
}

export const listCategories = async (): Promise<ICategoryModel[]> => {
  const result = await get(categoryRoute).json()
  return result
}