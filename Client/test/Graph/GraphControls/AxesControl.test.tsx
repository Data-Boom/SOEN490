import { DatasetFactory, VariableFactory } from "../../Factories/Datasets/DatasetFactory"

import { DimensionFactory } from "../../Factories/Dimensions/DimensionFactory"
import { getVariableDimensionRepresentation } from "../../../src/Common/Helpers/DimensionHelpers"
import { randomIndex } from "../../Factories/FactoryHelpers"

describe('getVariableDimensionRepresentation', () => {
  it('returns one dimension represented with 10 datasets', () => {
    const { dimensions, validVariables, datasets } = getTestData()

    const expectedDictionary = {}
    expectedDictionary[validVariables[0].dimensionId] = datasets.map(dataset => dataset.id)

    expect(getVariableDimensionRepresentation(datasets, validVariables[0].name)).toStrictEqual(expectedDictionary)
  })
})

const getTestData = () => {
  const dimensions = DimensionFactory.buildList(5)
  const datasets = DatasetFactory.buildList(10)
  const validVariables = VariableFactory.buildList(datasets[0].data.variables.length)

  validVariables.forEach(variable => {
    const randomDimension = dimensions[randomIndex(dimensions.length)]
    variable.dimensionId = randomDimension.id
    variable.unitId = randomDimension.units[randomIndex(randomDimension.units.length)].id
  })

  datasets.forEach(dataset => dataset.data.variables = [...validVariables])

  return { dimensions, validVariables, datasets }
}