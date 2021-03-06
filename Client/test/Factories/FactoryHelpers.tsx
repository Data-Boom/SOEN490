import * as Factory from "factory.ts"

import { random, unique } from "faker"

export const getRandomNumbers = (length: number): number[] => {
  return new Array(length).fill(null).map(e => random.number())
}

export const randomIndex = (upto: number) => random.number({ min: 0, max: upto - 1 })

export const eachRandomWord = () => {
  return each(() => random.word())
}

export const eachRandomNumber = () => {
  return each(() => random.number())
}

export const eachUniqueId = (): any => {
  return each(() => uniqueId())
}

export const each = (callback: (i: number) => any): any => {
  return Factory.Sync.each(i => callback(i))
}

export const uniqueId = () => {
  return unique(() => random.number(9999999999))
}