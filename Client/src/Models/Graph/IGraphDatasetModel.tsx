
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

export const newGraphDataset: IGraphDatasetModel = {
  points: undefined,
  isHidden: false,
  id: null,
  color: null,
  shape: null,
  name: null
}