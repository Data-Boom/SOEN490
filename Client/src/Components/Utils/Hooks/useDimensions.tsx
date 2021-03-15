import { IDimensionModel } from "../../../../../Server/src/models/interfaces/IDimension"
import { callGetAllDimensions } from "../../../Remote/Endpoints/DimensionsEndpoint"
import { useFetch } from "./useFetch"

export const useDimensions = () => {
  const { data } = useFetch<IDimensionModel[]>(callGetAllDimensions)
  return { dimensions: data }
}