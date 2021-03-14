import { IContent, IData, IVariable } from "../../Models/Datasets/IDatasetModel"

const decoratePointError = (contentErrorIndex: number, pointErrorIndex: number) => {
  return `Column ${pointErrorIndex + 1}, row ${contentErrorIndex + 1}: value should be a number`
}

const decorateVariableErrors = (variableErrors: IVariable[]) => {
  const firstVariableErrorIndex = variableErrors.findIndex(variable => variable)
  const firstVariableError = variableErrors[firstVariableErrorIndex]

  return `Variable #${firstVariableErrorIndex + 1}: ${firstVariableError.name || firstVariableError.dimensionId || firstVariableError.unitId}`
}

const decorateContentErrors = (contentErrors: IContent[]) => {
  const firstContentErrorIndex = contentErrors.findIndex(content => content?.point)
  const firstPointErrorIndex = contentErrors[firstContentErrorIndex]?.point?.findIndex(_ => true)

  return decoratePointError(firstContentErrorIndex, firstPointErrorIndex)
}

export const decorateDataErrors = (dataErrors: IData) => {
  if (dataErrors?.variables) {
    return decorateVariableErrors(dataErrors.variables)
  }

  if (dataErrors?.contents) {
    return decorateContentErrors(dataErrors.contents)
  }

  return null
}