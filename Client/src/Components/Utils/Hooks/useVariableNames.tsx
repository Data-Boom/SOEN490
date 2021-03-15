import { IVariableNameModel } from "../../../Models/Variables/IVariableNameModel"
import { getVariableNames } from "../../../Remote/Endpoints/VariableEndpoint"
import { useFetch } from "./useFetch"

export const useVariableNames = () => {
  const { data } = useFetch<IVariableNameModel[]>(getVariableNames)
  return { variableNames: data }
}