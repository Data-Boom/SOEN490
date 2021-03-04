import { DatasetFactory, VariableFactory } from "../../Factories/Datasets/DatasetFactory"

import { DimensionFactory } from "../../Factories/Dimensions/DimensionFactory"
import { getVariableDimensionRepresentation } from "../../../src/Common/Helpers/DimensionHelpers"
import { randomIndex } from "../../Factories/FactoryHelpers"

describe('getVariableDimensionRepresentation', () => {
  it('returns one dimension represented with 10 datasets', () => {
    const { dimensions, validVariables, datasets } = getTestData()

    const expectedDictionary = {}
    expectedDictionary[datasets[0].data.variables[0].dimensionId] = datasets.map(dataset => dataset.id)

    expect(getVariableDimensionRepresentation(datasets, datasets[0].data.variables[0].name)).toStrictEqual(expectedDictionary)
  })

  it('returns 2 dimensions 9 and 1 datasets each', () => {
    const { dimensions, validVariables, datasets } = getTestData()

    datasets[1].data.variables[0].dimensionId = 1234

    const expectedDictionary = {}
    expectedDictionary[datasets[0].data.variables[0].dimensionId] = datasets.filter(dataset => dataset.id != datasets[1].id).map(dataset => dataset.id)
    expectedDictionary[datasets[1].data.variables[0].dimensionId] = [datasets[1].id]

    expect(getVariableDimensionRepresentation(datasets, datasets[0].data.variables[0].name)).toStrictEqual(expectedDictionary)
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

  datasets.forEach(dataset => dataset.data.variables = JSON.parse(JSON.stringify(validVariables)))

  return { dimensions, validVariables, datasets }
}