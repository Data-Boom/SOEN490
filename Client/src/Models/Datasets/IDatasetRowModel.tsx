export interface IDatasetRowModel {
  id: number,
  name: string,
  isInitiallyHidden: boolean,
  color: string,
  shape: string,
}

export const newDatasetRow: IDatasetRowModel = {
  id: null,
  name: null,
  isInitiallyHidden: false,
  color: null,
  shape: null
}

export interface IAdmindReviewRowModel {
  id: number,
  dataset_name: string,
}