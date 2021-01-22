import * as Yup from 'yup'

export interface ISearchDatasetsFormModel {
  datasetId?: number[],
  material?: string[],
  firstName?: string,
  lastName?: string,
  year?: number,
  categoryId?: number,
  subcategoryId?: number
}

export interface ICategory {
  name: string,
  id: number
}

export const defaultSearchDatasetsModel: ISearchDatasetsFormModel = {
  datasetId: [],
  material: [],
  firstName: '',
  lastName: '',
  year: undefined,
  categoryId: undefined,
  subcategoryId: undefined
}

//todo complete Yup validation
export const searchDatasetsValidationSchema = Yup.object()