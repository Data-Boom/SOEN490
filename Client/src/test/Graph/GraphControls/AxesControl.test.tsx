import { IDimensionModel } from "../../../../../Server/src/models/interfaces/IDimension"
import { createMock } from 'ts-auto-mock'
import { mock } from 'intermock'

test('dummy dummy boi', () => {
  const dimension1 = createMock<IDimensionModel>()
  const dimension2 = mock({
    interfaces: ['IDimensionModel'],
    output: "object"
  })
  const x = 5
})