import * as Factory from "factory.ts"

import { IAuthor, IContent, IData, IDatasetModel, IMaterial, IReference, IVariable } from "../../../Models/Datasets/IDatasetModel"
import { eachRandomNumber, eachRandomWord, eachUniqueId, getRandomNumbers } from "../FactoryHelpers"

export const AuthorFactory = Factory.Sync.makeFactory<IAuthor>({
  firstName: eachRandomWord(),
  lastName: eachRandomWord(),
  middleName: eachRandomWord()
})

export const ReferenceFactory = Factory.Sync.makeFactory<IReference>({
  authors: AuthorFactory.buildList(3),
  issue: eachRandomNumber(),
  pages: `${eachRandomNumber()}-${eachRandomNumber()}`,
  publisher: eachRandomWord(),
  title: eachRandomWord(),
  type: eachRandomWord(),
  volume: eachRandomNumber(),
  year: eachRandomNumber(),
})

export const ContentFactory = Factory.Sync.makeFactory<IContent>({
  point: Factory.Sync.each(i => getRandomNumbers(10))
})

export const VariableFactory = Factory.Sync.makeFactory<IVariable>({
  dimensionId: eachUniqueId(),
  name: eachRandomWord(),
  unitId: eachUniqueId()
})

export const DataFactory = Factory.Sync.makeFactory<IData>({
  comments: eachRandomWord(),
  contents: ContentFactory.buildList(10),
  variables: VariableFactory.buildList(8)
})

export const MaterialFactory = Factory.Sync.makeFactory<IMaterial>({
  composition: eachRandomWord(),
  details: eachRandomWord(),
  id: eachUniqueId()
})

export const DatasetFactory = Factory.Sync.makeFactory<IDatasetModel>({
  category: eachRandomWord(),
  subcategory: eachRandomWord(),
  reference: ReferenceFactory.build(),
  data: DataFactory.build(),
  data_type: eachRandomWord(),
  dataset_name: eachRandomWord(),
  id: eachUniqueId(),
  material: MaterialFactory.buildList(10)
})