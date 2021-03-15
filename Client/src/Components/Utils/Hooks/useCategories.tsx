import { ICategoryModel, listCategories } from "../../../Remote/Endpoints/CategoryEndpoint"

import { useFetch } from "./useFetch"

export const useCategories = () => {
  const { data } = useFetch<ICategoryModel[]>(listCategories)
  return { categories: data }
}