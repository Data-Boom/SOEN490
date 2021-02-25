import * as Factory from "factory.ts"

import { IDimensionModel, IUnitModel } from "../../../Models/Dimensions/IDimensionModel"
import { random, seedValue } from "faker"

import { generateList } from "../FactoryHelpers"

export const UnitFactory = Factory.Sync.makeFactory<IUnitModel>({
  conversionFormula: random.word(),
  name: random.word(),
  id: Factory.Sync.each(i => {
    console.log(seedValue, 'seedValue')
    return i
  })
})

export const DimensionFactory = Factory.Sync.makeFactory<IDimensionModel>({
  name: random.word(),
  baseUnitId: Factory.Sync.each(i => {
    return i * 100
  }
  ),
  id: Factory.Sync.each(i => i),
  units: generateList(UnitFactory, 10)
})