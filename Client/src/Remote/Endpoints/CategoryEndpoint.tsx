import { ICategoryModel, ISubCategoryModel } from "../../Models/Profile/ICategoryModel"
import { get, _delete, put, post  } from "../FluentRequest"

const categoryRoute = '/api/v1/category'
const subCategoryRoute = '/subcategory'

export const listCategories = async (): Promise<ICategoryModel[]> => {
  const result = await get(categoryRoute).json()
  return result
}

export const listSubcategories = async (): Promise<ISubCategoryModel[]> => {
  const subcategories = await get(subCategoryRoute).json()
  return subcategories
}

export const createCategory = async (category: ICategoryModel): Promise<void> => {
  await post(categoryRoute).withBody(category).json()
  }

export const deleteCategory = async (categoryId: number): Promise<void> => {
  await _delete(categoryRoute + '/' + categoryId).json()
}

export const updateCategory = async (category: ICategoryModel): Promise<void> => {
  let result = await put(categoryRoute).withBody(category).json()
  return result || []
}