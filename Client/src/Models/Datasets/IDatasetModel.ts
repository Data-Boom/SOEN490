export interface IAuthor {
  firstName: string,
  middleName?: string,
  lastName: string,
}

export const newAuthor: IAuthor = {
  firstName: '',
  lastName: '',
  middleName: ''
}

export interface IReference {
  type: string,
  publisher: string,
  authors: IAuthor[],
  title: string,
  year: number,
  doi?: string,
  volume?: number,
  issue?: number,
  pages?: string,
}

export interface IMaterial {
  composition: string,
  details: string,
  id: number | undefined
}

export interface IVariable {
  name: string,
  dimensionId: number,
  unitId: number,
}

export const newVariable: IVariable = {
  name: '',
  dimensionId: null,
  unitId: null,
}

export interface IContent {
  point: number[]
}

export interface IData {
  variables: IVariable[],
  contents: IContent[],
  dataPointComments?: string[],
  comments: string,
}

export interface IDatasetModel {
  reference: IReference,
  dataset_name: string,
  material: IMaterial[],
  category: number,
  subcategory: number,
  data_type?: string,
  data: IData,
  id: number | undefined,
}

export type IDatasetMeta = Omit<IDatasetModel, 'reference' | 'data'>

export const newDatasetModel: IDatasetModel = {
  data: {
    comments: '',
    contents: [],
    variables: []
  },
  data_type: '',
  dataset_name: '',
  material: [],
  reference: {
    authors: [newAuthor],
    pages: null,
    publisher: '',
    title: '',
    type: '',
    volume: null,
    issue: null,
    year: 0
  },
  category: null,
  subcategory: null,
  id: undefined
}