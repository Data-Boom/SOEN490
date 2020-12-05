export interface IDataPoint {
  x: number,
  y: number
}

export interface IDatasetModel {
  points: IDataPoint[],
  id: number,
  color: string
}