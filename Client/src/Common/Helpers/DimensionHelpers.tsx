import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { IDimensionModel } from "../../../../Server/src/models/interfaces/IDimension"

/**
 * @return dictionary of <K, V> pairs, where K is the dimensionId of the variable
 * and V is array of datasets that have have variable represented as that dimension
 */
export const getVariableDimensionRepresentation = (datasets: IDatasetModel[], variableName: string): object => {
  const variableDimensions = {}
  datasets.forEach(dataset => {
    const foundVariable = dataset.data.variables.find(variable => variable.name == variableName)
    if (foundVariable) {
      const datasetIds = variableDimensions[foundVariable.dimensionId] || []
      datasetIds.push(dataset.id)
      variableDimensions[foundVariable.dimensionId] = datasetIds
    }
  })

  return variableDimensions
}

export const getDimensionNameById = (dimensions: IDimensionModel[], dimensionId: number) => {
  const foundDimension = dimensions.find(dimension => dimension.id == dimensionId)
  return foundDimension && foundDimension.name || 'dimension not found'
}

export const getUnitNameById = (dimensions: IDimensionModel[], unitId: number) => {
  const foundDimension = getDimensionByUnitId(dimensions, unitId)
  const foundUnit = foundDimension && foundDimension.units.find(unit => unit.id == unitId)
  return foundUnit && foundUnit.name || 'unit not found'
}

export const getDimensionByUnitId = (dimensions: IDimensionModel[], unitId: number) => {
  return dimensions.find(dimension => dimension.units.find(unit => unit.id == unitId))
}