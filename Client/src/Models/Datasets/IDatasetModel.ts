export interface IDataPoint {
  x: number,
  y: number
}

export interface IDatasetModel {
  points: IDataPoint[],
  id: number,
  color: string
}

export const exampleDatasets: IDatasetModel[] = [{
  color: "#3632ff",
  id: 0,
  points: [{ x: 5.1, y: 3.5 }, { x: 4.9, y: 3 }, { x: 4.7, y: 3.2 }, { x: 4.6, y: 3.1 }, { x: 5, y: 3.6 }, { x: 5.4, y: 3.9 }],
}, {
  color: "#f20b34",
  id: 1,
  points: [{ x: 3, y: 8 }, { x: 9, y: 7 }, { x: 1, y: 3 }, { x: 2, y: 4 }, { x: 8, y: 1 }]
}, {
  color: "#7af684",
  id: 2,
  points: [{ x: 7, y: 6 }, { x: 2, y: 5 }, { x: 7, y: 9 }, { x: 4, y: 1 }, { x: 6, y: 7 }]
}, {
  color: "#000000",
  id: 3,
  points: [{ x: 3, y: 7 }, { x: 1, y: 9 }, { x: 8, y: 7 }, { x: 1, y: 4 }, { x: 8, y: 5 }]
}]