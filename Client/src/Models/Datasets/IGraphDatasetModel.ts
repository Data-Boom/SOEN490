export interface IGraphPoint {
  x: number,
  y: number
}

export interface IGraphDatasetModel {
  points?: IGraphPoint[],
  id: number,
  color: string,
  name: string
}