export interface ISearchDatasetsFormModel {
  oxidizer: string,
  year: string,
  outputFormat: string,
  categories: string,
  subcategories: string,
  fuel: string,
  author: string,
  diluent: string,
}

export const defaultSearchDatasetsModel: ISearchDatasetsFormModel = {
  oxidizer: '',
  year: '',
  outputFormat: '',
  categories: '',
  subcategories: '',
  fuel: '',
  author: '',
  diluent: '',
}