import { DatasetFactory } from "../../Factories/Datasets/DatasetModelFactory"
import { DimensionFactory } from "../../Factories/Dimensions/DimensionFactory"

describe('getVariableDimension', () => {
  const dimensions = DimensionFactory.buildList(5)
  const datasets = DatasetFactory.buildList(10)
  it('should return false', () => {
    console.log(JSON.stringify(datasets, null, 2))
    expect(datasets[0].data.variables[0].name).toBe(datasets[1].data.variables[0].name)
  })
})
