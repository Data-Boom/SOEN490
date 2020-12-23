import * as Yup from 'yup'

const integerMessage = (fieldName: string): string => {
  return `${fieldName} should be an integer`
}

const requiredMessage = (fieldName: string): string => {
  return `${fieldName} is a required field`
}

const referenceValidationSchema = Yup.object().shape({
  year: Yup.number().integer(integerMessage('Year')).required(requiredMessage('Year')).test('len', 'Must be exactly 4 characters', val => val && val.toString().length === 4),
  volume: Yup.number().integer().required(),
  pages: Yup.number().integer().required(),
  title: Yup.string().required(),
  type: Yup.string().required(),
  publisher: Yup.string().required(),
  authors: Yup.array().of(
    Yup.object().shape(
      {
        firstname: Yup.string().trim().required('First Name is a required field'),
        middlename: Yup.string(),
        lastname: Yup.string().trim().required('Last Name is a required field')
      }
    )
  ),
})

export const validationSchema = Yup.object().shape({
  reference: referenceValidationSchema,
})