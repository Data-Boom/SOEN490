export interface IGraphStateModel {
  datasets: IDisplayedDatasetStateModel[],
  name: string,
  axes: IAxisStateModel[],
  id: string
}

export interface IDisplayedDatasetStateModel {
  id: number,
  isHidden: boolean,
  color: string,
  shape: string,
}

export interface IAxisStateModel {
  variableName: string,
  logarithmic: boolean,
  zoomStartIndex: number,
  zoomEndIndex: number,
  units: string
}

export interface IDatasetRowModel {
  id: number,
  name: string,
  isInitiallyHidden: boolean,
  color: string,
  shape: string,
}

export const defaultDatasetRow: IDatasetRowModel = {
  id: null,
  name: null,
  isInitiallyHidden: false,
  color: null,
  shape: null
}