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