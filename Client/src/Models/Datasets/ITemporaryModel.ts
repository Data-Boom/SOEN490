export interface IDataPointModel {
  type: string,
  values: number[],
  units: string,
  representation: string,
  dataset_id: number
}

export interface IClientDatasetModel {
  dataset_id: number,
  dataPoints: IDataPointModel[],
}

export const initalTemporature: IDataPointModel = {
  type: "Initial Temperature",
  values: [10, 20, 30, 40, 50],
  units: "K",
  representation: "Temporary",
  dataset_id: 1
}

export const cellWidth: IDataPointModel = {
  type: "Cell Width",
  values: [1, 2, 3, 4, 5],
  units: "mm",
  representation: "Temporary",
  dataset_id: 2
}

export const initialDensity: IDataPointModel = {
  type: "Initial Density",
  values: [3, 6, 9, 12, 15],
  units: "g/cc",
  representation: "Temporary",
  dataset_id: 2
}

export const initialDensity2: IDataPointModel = {
  type: "Initial Density",
  values: [3, 6, 9, 12, 15],
  units: "g/cc",
  representation: "Temporary",
  dataset_id: 2
}

export const exampleDataset: IClientDatasetModel = {
  dataset_id: 1,
  dataPoints: [initalTemporature, initialDensity, cellWidth]
}