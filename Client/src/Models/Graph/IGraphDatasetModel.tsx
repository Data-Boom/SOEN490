export interface IGraphPoint {
  x: number,
  y: number
}

export interface IGraphDatasetModel {
  points: IGraphPoint[],
  isHidden: boolean,
  id: number,
  color: string,
  shape: string,
  name: string
}

export interface IGraphDatasetState {
  isHidden: boolean,
  id: number,
  color: string,
  shape: string
}

export const newGraphDataset: IGraphDatasetModel = {
  points: undefined,
  isHidden: false,
  id: null,
  color: null,
  shape: null,
  name: null
}

export const toGraphDatasetState = (dataset: IGraphDatasetModel): IGraphDatasetState => {
  return {
    color: dataset.color,
    id: dataset.id,
    isHidden: dataset.isHidden,
    shape: dataset.shape
  }
}