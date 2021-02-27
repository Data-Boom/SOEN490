import { ISubcategoryModel } from "./SubcategoryEndpoint"
import { get } from "../FluentRequest"

const categoryRoute = '/category'

interface ICategoryModel {
  id: number,
  name: string,
  subcategories: ISubcategoryModel[]
}

export const listCategories = async (): Promise<ICategoryModel[]> => {
  const result = await get(categoryRoute).json()
  console.log(result)
  return result
}