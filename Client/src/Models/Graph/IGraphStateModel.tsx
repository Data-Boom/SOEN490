export interface IGraphStateModel {
  datasets: IDisplayedDatasetStateModel[],
  axes: IAxisStateModel[],
  name: string,
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

export const newAxisState: IAxisStateModel = {
  logarithmic: false,
  units: 'mm',
  variableName: 'cell width',
  zoomStartIndex: null,
  zoomEndIndex: null,
}

export const newDatasetRow: IDatasetRowModel = {
  id: null,
  name: null,
  isInitiallyHidden: false,
  color: null,
  shape: null
}

export const newGraphState: IGraphStateModel = {
  axes: [{ ...newAxisState }, { ...newAxisState }],
  datasets: [],
  id: null,
  name: null
}