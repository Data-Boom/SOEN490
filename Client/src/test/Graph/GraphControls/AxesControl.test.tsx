import { DatasetFactory } from "../../Factories/Datasets/DatasetModelFactory"
import { DimensionFactory } from "../../Factories/Dimensions/DimensionFactory"
import { IDatasetModel } from "../../../Models/Datasets/IDatasetModel"
import { IDimensionModel } from "../../../Models/Dimensions/IDimensionModel"

describe('getVariableDimension', () => {
  it('should return false', () => {
    const { dimensions, datasets }: { dimensions: IDimensionModel[], datasets: IDatasetModel[] } = getTestData()

    expect(datasets[0].data.variables[0].name).toBe(datasets[1].data.variables[0].name)
  })
})

const getTestData = (): { dimensions: IDimensionModel[], datasets: IDatasetModel[] } => {
  const dimensions = DimensionFactory.buildList(5)
  const datasets = DatasetFactory.buildList(10)

  return { dimensions, datasets }
}