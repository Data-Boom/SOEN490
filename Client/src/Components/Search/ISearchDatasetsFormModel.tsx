export interface ISearchDatasetsFormModel {
  oxidizer: string,
  year: string,
  outputFormat: string,
  categories: string,
  subcategories: string,
  fuel: string,
  author: string,
  dilutent: string,
}

export const defaultSearchDatasetsModel: ISearchDatasetsFormModel = {
  oxidizer: '',
  year: '',
  outputFormat: '',
  categories: '',
  subcategories: '',
  fuel: '',
  author: '',
  dilutent: '',
}