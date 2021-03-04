import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"

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