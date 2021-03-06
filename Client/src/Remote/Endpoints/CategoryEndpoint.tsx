import { get } from "../FluentRequest"

const categoryRoute = '/api/v1/category'

export interface ICategoryModel {
  name: string
  id?: number
  subcategories?: ISubcategoryModel[]
}
export interface ISubcategoryModel {
  name: string
  id?: number
  categoryId?: number
}

export const listCategories = async (): Promise<ICategoryModel[]> => {
  const result = await get(categoryRoute).json()
  console.log(result)
  return result
}