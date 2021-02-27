import * as Factory from "factory.ts"

import { IDimensionModel, IUnitModel } from "../../../Models/Dimensions/IDimensionModel"
import { eachRandomWord, eachUniqueId } from "../FactoryHelpers"

export const UnitFactory = Factory.Sync.makeFactory<IUnitModel>({
  conversionFormula: eachRandomWord(),
  name: eachRandomWord(),
  id: eachUniqueId()
})

export const DimensionFactory = Factory.Sync.makeFactory<IDimensionModel>({
  name: eachRandomWord(),
  baseUnitId: eachUniqueId(),
  id: eachUniqueId(),
  units: UnitFactory.buildList(10)
}).withDerivation("baseUnitId", dimension => dimension.units[0].id)

export const getCorrectDimension = () => {
  const dimension = DimensionFactory.build()
  dimension.baseUnitId
}