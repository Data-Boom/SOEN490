import * as faker from "faker"

import { seed } from "faker"

export const getRandomNumbers = (length: number): number[] => {
  return new Array(length).fill(null).map(e => faker.random.number())
}

export function generateList<T>(factory: any, length: number): T[] {
  seed(123)
  console.log(factory.build(), '1')
  seed(1232)
  console.log(factory.build(), '2')
  return Array(length).fill(null).map(e => factory.build())
}