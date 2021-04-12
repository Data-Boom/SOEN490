import { get } from "../FluentRequest"

export interface ISubcategoryModel {
  id: number,
  name: string
}

const subCategoryRoute = '/subcategory'

export const listSubcategories = async (): Promise<ISubcategoryModel[]> => {
  const subcategories = await get(subCategoryRoute).json()
  return subcategories || []
}