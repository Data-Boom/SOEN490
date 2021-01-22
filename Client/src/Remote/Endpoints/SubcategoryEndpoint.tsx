import { get } from "../RemoteHelper"

interface ISubcategoryModel {
  id: number,
  name: string
}

export const listSubcategories = async (): Promise<ISubcategoryModel[]> => {
  const subcategories = await get('/subcategory')
  return subcategories
}