import { IDimensionModel } from '../../../../Server/src/models/interfaces/IDimension'
import { Parser } from 'expr-eval'

export const convertToBase = (numberToConvert: number, conversionFormula: string): number => {
  try {
    const parser = new Parser()
    const toBase = parser.parse(conversionFormula)
    return parseFloat(toBase.evaluate({ u: numberToConvert }))
  }
  catch (error) {
    return 0
  }
}

export const convertBaseToUnit = (numberToConvert: number, conversionFormula: string): number => {
  const value = convertToBase(numberToConvert, conversionFormula)
  return 1 / value
}

export const getConversionLambda = (dimension: IDimensionModel, unitIdOld: number, unitIdNew: number): (n: number) => number => {
  try {
    const baseUnitId = dimension.baseUnitId
    const parser = new Parser()
    let fromOldToBaseConversionFormula = dimension.units.find(unit => unit.id == unitIdOld)?.conversionFormula
    let fromNewToBaseConversionFormula = dimension.units.find(unit => unit.id == unitIdNew)?.conversionFormula

    if (baseUnitId == unitIdOld) {
      fromOldToBaseConversionFormula = 'u'
    }
    if (baseUnitId == unitIdNew) {
      fromNewToBaseConversionFormula = 'u'
    }

    if (!fromOldToBaseConversionFormula || !fromNewToBaseConversionFormula) {
      throw new Error("Couldn't find requested unit in the units of a provided dimension")
    }

    const fromOldToBaseEvaluator = parser.parse(fromOldToBaseConversionFormula)
    const fromNewToBaseEvaluator = parser.parse(fromNewToBaseConversionFormula)

    return (number: number) => {
      const numberInBaseUnit = parseFloat(fromOldToBaseEvaluator.evaluate({ u: number }))
      const numberInNewInversed = parseFloat(fromNewToBaseEvaluator.evaluate({ u: 1 / numberInBaseUnit }))
      return 1 / numberInNewInversed
    }
  }
  catch (error) {
    console.error(error)
    return () => 0
  }
}