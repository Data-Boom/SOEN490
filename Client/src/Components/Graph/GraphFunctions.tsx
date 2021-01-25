import { IDatasetModel, IVariable } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel, IGraphDatasetState, IGraphPoint, newGraphDataset, toGraphDatasetState } from "../../Models/Graph/IGraphDatasetModel"

import { IDatasetRowModel } from "../../Models/Datasets/IDatasetRowModel"
import { IGraphStateModel } from "../../Models/Graph/IGraphStateModel"

export const buildXYPoints = (dataset: IDatasetModel, xVariableName: string, yVariableName: string): IGraphPoint[] => {
  const xIndex = getVariableIndex(dataset.data.variables, xVariableName)
  const yIndex = getVariableIndex(dataset.data.variables, yVariableName)
  //if either is -1 means at least one variable is not on the dataset and cannot be graphed
  if (xIndex === -1 || yIndex === -1) {
    return []
  }
  const points: IGraphPoint[] = []
  for (let i = 0; i < dataset.data.contents.length; i++) {
    const x: number = dataset.data.contents[i].point[xIndex]
    const y: number = dataset.data.contents[i].point[yIndex]
    const point: IGraphPoint = { x: x, y: y }
    points.push(point)
  }
  return points
}

export const getGraphDatasets = (completeDatasets: IDatasetModel[], graphState: IGraphStateModel): IGraphDatasetModel[] => {
  const updatedGraphDatasets = []
  completeDatasets.forEach(completeDataset => {
    const existingGraphDatasetIndex = graphState.datasets.findIndex(dataset => dataset.id == completeDataset.id)
    const updatedGraphDataset: IGraphDatasetModel = existingGraphDatasetIndex == -1 ? { ...newGraphDataset } : { ...graphState.datasets[existingGraphDatasetIndex] } as any
    updatedGraphDataset.id = completeDataset.id
    updatedGraphDataset.name = completeDataset.dataset_name
    updatedGraphDataset.points = buildXYPoints(completeDataset, graphState.axes[0].variableName, graphState.axes[1].variableName)
    updatedGraphDatasets.push(updatedGraphDataset)
    if (existingGraphDatasetIndex == -1) {

    }
  })

  return updatedGraphDatasets
}

export const toDatasetRows = (datasets: IDatasetModel[], graphDatasets: IGraphDatasetState[]): IDatasetRowModel[] => {
  const datasetRows: IDatasetRowModel[] = []

  for (let i = 0; i < datasets.length; i++) {
    const datasetRow: IDatasetRowModel = { ...graphDatasets[i], id: datasets[0].id, name: datasets[0].dataset_name, isInitiallyHidden: graphDatasets[i].isHidden }
    datasetRows.push(datasetRow)
  }

  return datasetRows
}

export const getVariableIndex = (variables: IVariable[], varName: string): number => {
  return variables.findIndex(variable => variable.name === varName)
}