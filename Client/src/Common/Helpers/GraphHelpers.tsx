import { IAxisStateModel, IGraphStateModel } from "../../Models/Graph/IGraphStateModel"
import { IDatasetModel, IVariable } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel, IGraphDatasetState, IGraphPoint } from "../../Models/Graph/IGraphDatasetModel"

import { IDatasetRowModel } from "../../Models/Datasets/IDatasetRowModel"
import { IDimensionModel } from "../../Models/Dimensions/IDimensionModel"
import { getConversionLambda } from "./UnitConversionHelpers"

export const buildXYPoints = (dataset: IDatasetModel, xAxis: IAxisStateModel, yAxis: IAxisStateModel, dimensions: IDimensionModel[]): IGraphPoint[] => {
  if (!dimensions || dimensions.length == 0) {
    return []
  }
  const { variable: xVariable, index: xIndex } = getVariableIndex(dataset.data.variables, xAxis.variableName)
  const { variable: yVariable, index: yIndex } = getVariableIndex(dataset.data.variables, yAxis.variableName)
  //if either is -1 means at least one variable is not on the dataset and cannot be graphed
  if (xIndex === -1 || yIndex === -1) {
    return []
  }

  const xConvertFunction = getConversionLambda(dimensions.find(dimension => dimension.id == xVariable.dimensionId), xVariable.unitId, xAxis.units)
  const yConvertFunction = getConversionLambda(dimensions.find(dimension => dimension.id == yVariable.dimensionId), yVariable.unitId, yAxis.units)

  const points: IGraphPoint[] = []
  for (let i = 0; i < dataset.data.contents.length; i++) {
    const x: number = xConvertFunction(dataset.data.contents[i].point[xIndex])
    console.log('was', dataset.data.contents[i].point[yIndex], 'after: ', yConvertFunction(dataset.data.contents[i].point[yIndex]))
    const y: number = yConvertFunction(dataset.data.contents[i].point[yIndex])
    const point: IGraphPoint = { x: x, y: y }
    points.push(point)
  }
  return points
}

export const getGraphDatasets = (completeDatasets: IDatasetModel[], graphState: IGraphStateModel, dimensions: IDimensionModel[]): IGraphDatasetModel[] => {
  const updatedGraphDatasets = []
  completeDatasets.forEach(completeDataset => {
    const existingGraphDatasetIndex = graphState.datasets.findIndex(dataset => dataset.id == completeDataset.id)
    if (existingGraphDatasetIndex == -1) {
      console.error(`failed to build graph datasets, index for ${completeDataset.id} was not found in the state`)
    }
    const updatedGraphDataset: IGraphDatasetModel = { ...graphState.datasets[existingGraphDatasetIndex] } as any
    updatedGraphDataset.name = completeDataset.dataset_name
    updatedGraphDataset.points = buildXYPoints(completeDataset, graphState.axes[0], graphState.axes[1], dimensions)
    updatedGraphDatasets.push(updatedGraphDataset)
  })

  return updatedGraphDatasets
}

export const toDatasetRows = (datasets: IDatasetModel[], graphDatasets: IGraphDatasetState[]): IDatasetRowModel[] => {
  const datasetRows: IDatasetRowModel[] = []

  for (let i = 0; i < datasets.length; i++) {
    const datasetRow: IDatasetRowModel = { ...graphDatasets[i], id: datasets[i].id, name: datasets[i].dataset_name, isInitiallyHidden: graphDatasets[i].isHidden }
    datasetRows.push(datasetRow)
  }
  return datasetRows
}

export const getVariableIndex = (variables: IVariable[], varName: string): { variable: IVariable, index: number } => {
  return { variable: variables.find(variable => variable.name === varName), index: variables.findIndex(variable => variable.name === varName) }
}