export interface IDataPoint {
  x: number,
  y: number
}

export interface IGraphDatasetModel {
  points: IDataPoint[],
  id: number,
  color: string,
  name: string
}