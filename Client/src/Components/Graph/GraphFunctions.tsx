import { IDatasetModel, IVariable } from "../../Models/Datasets/IDatasetModel"
import { IDatasetRowModel, newDatasetRow } from "../../Models/Graph/IGraphStateModel"
import { IGraphDatasetModel, IGraphPoint, newGraphDataset } from "../../Models/Graph/IGraphDatasetModel"

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

export const transformAndMergeGraphDatasets = (completeDatasets: IDatasetModel[], graphDatasets: IGraphDatasetModel[], xVariableName: string, yVariableName: string): IGraphDatasetModel[] => {
  const updatedGraphDatasets = []
  completeDatasets.forEach(completeDataset => {
    const existingGraphDatasetId = graphDatasets.findIndex(dataset => dataset.id == completeDataset.id)
    let updatedGraphDataset: IGraphDatasetModel = {} as any
    if (existingGraphDatasetId == -1) {
      updatedGraphDataset = { ...newGraphDataset }
      updatedGraphDataset.id = completeDataset.id
      updatedGraphDataset.name = completeDataset.dataset_name
      updatedGraphDataset.points = buildXYPoints(completeDataset, xVariableName, yVariableName)
    } else {
      updatedGraphDataset = { ...graphDatasets[existingGraphDatasetId] }
    }
    updatedGraphDatasets.push(updatedGraphDataset)
  });

  return updatedGraphDatasets
}

export const toDatasetRows = (datasets: IDatasetModel[]): IDatasetRowModel[] => {
  return datasets.map(dataset => {
    return { ...newDatasetRow, id: dataset.id, name: dataset.dataset_name }
  })
}

export const getVariableIndex = (variables: IVariable[], varName: string): number => {
  return variables.findIndex(variable => variable.name === varName)
}