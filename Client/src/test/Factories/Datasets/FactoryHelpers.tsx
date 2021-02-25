import * as Factory from "factory.ts"
import * as faker from "faker"

export const NumberFactory = Factory.Sync.makeFactory<number>(faker.random.number())