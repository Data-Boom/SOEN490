import * as Factory from "factory.ts"
import * as faker from "faker"

import { IAuthor, IContent, IData, IDatasetModel, IMaterial, IReference, IVariable } from "../../../Models/Datasets/IDatasetModel"

import { getRandomNumbers } from "../FactoryHelpers"

export const AuthorFactory = Factory.Sync.makeFactory<IAuthor>({
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  middleName: faker.name.middleName()
})

export const ReferenceFactory = Factory.Sync.makeFactory<IReference>({
  authors: AuthorFactory.buildList(3),
  issue: faker.random.number(),
  pages: `${faker.random.number()}-${faker.random.number()}`,
  publisher: faker.name.title(),
  title: faker.name.title(),
  type: faker.random.alpha(),
  volume: faker.random.number(),
  year: faker.random.number(),
})

export const ContentFactory = Factory.Sync.makeFactory<IContent>({
  point: getRandomNumbers(10)
})

export const VariableFactory = Factory.Sync.makeFactory<IVariable>({
  dimensionId: Factory.each(i => i),
  name: faker.name.firstName(),
  unitId: Factory.each(i => i)
})

export const DataFactory = Factory.Sync.makeFactory<IData>({
  comments: faker.random.alpha(),
  contents: ContentFactory.buildList(10),
  variables: VariableFactory.buildList(8)
})

export const MaterialFactory = Factory.Sync.makeFactory<IMaterial>({
  composition: faker.random.alpha(),
  details: faker.random.alpha(),
  id: Factory.each(i => i)
})

export const DatasetFactory = Factory.Sync.makeFactory<IDatasetModel>({
  category: faker.name.title(),
  subcategory: faker.random.alpha(),
  reference: ReferenceFactory.build(),
  data: DataFactory.build(),
  data_type: faker.random.alpha(),
  dataset_name: faker.name.title(),
  id: Factory.each(i => i),
  material: MaterialFactory.buildList(10)
})