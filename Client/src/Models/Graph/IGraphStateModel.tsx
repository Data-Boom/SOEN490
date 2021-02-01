import { IGraphDatasetState } from "./IGraphDatasetModel"

export interface IGraphStateModel {
  datasets: IGraphDatasetState[],
  axes: IAxisStateModel[],
  name: string,
  id: string
}

export interface IAxisStateModel {
  variableName: string,
  logarithmic: boolean,
  zoomStartIndex: number,
  zoomEndIndex: number,
  units: string
}

export const newAxisState: IAxisStateModel = {
  logarithmic: false,
  units: '',
  variableName: '',
  zoomStartIndex: null,
  zoomEndIndex: null,
}

export const newGraphState: IGraphStateModel = {
  axes: [{ ...newAxisState }, { ...newAxisState }],
  datasets: [],
  id: null,
  name: ''
}