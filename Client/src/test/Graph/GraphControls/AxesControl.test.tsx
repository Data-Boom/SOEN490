import { IDimensionModel } from "../../../Models/Dimensions/IDimensionModel"
import { createHydratedMock } from 'ts-auto-mock'

test('dummy dummy boi', () => {
  const dimension1 = createHydratedMock<IDimensionModel>()
  console.log(JSON.stringify(dimension1, null, 2))
})