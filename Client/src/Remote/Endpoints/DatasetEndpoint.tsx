import { IRemoteDatasetModel, toLocalDatasets } from "../../Models/Datasets/IRemoteDatasetModel"

import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { ISearchDatasetsFormModel } from "../../Components/Search/ISearchDatasetsFormModel"
import { get } from "../RemoteHelper"
import { stringify } from "query-string"

const userUploadedDatasetsRoute = '/dataset/userUploadedDatasets/:userUploadedDatasets'
const userSavedDatasetsRoute = '/dataset/userSavedDatsets/:userSavedDatsets'
const datasetRoute = '/dataset*'

export const getDatasets = async (query: ISearchDatasetsFormModel): Promise<IDatasetModel[]> => {
  const remoteDatasets: IRemoteDatasetModel[] = await get(datasetRoute, stringify(query))
  const localDatasets = toLocalDatasets(remoteDatasets)
  return localDatasets
}
interface ICategoryModel {
  id: number,
  name: string
}
interface ISubcategoryModel {
  id: number,
  name: string
}
interface IMaterialModel {
  details: string,
  composition: string,
  id: number
}

export const listCategories = async (): Promise<ICategoryModel[]> => {
  const categories = await get('/category')
  return categories
}
export const listSubcategories = async (): Promise<ISubcategoryModel[]> => {
  const subcategories = await get('/subcategory')
  return subcategories
}
export const listMaterials = async (): Promise<IMaterialModel[]> => {
  const materials = await get('/material')
  return materials
}
