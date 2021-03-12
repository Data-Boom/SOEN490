export const integerMessage = (fieldName: string): string => {
  return `${fieldName} should be an integer`
}

export const numberMessage = (fieldName: string): string => {
  return `${fieldName} should be a number`
}

export const requiredMessage = (fieldName: string): string => {
  return `${fieldName} is a required field`
}