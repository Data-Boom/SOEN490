import * as Yup from 'yup'

const integerMessage = (fieldName: string): string => {
  return `${fieldName} should be an integer`
}

const requiredMessage = (fieldName: string): string => {
  return `${fieldName} is a required field`
}

const referenceValidationSchema = Yup.object().shape({
  year: Yup.number().integer(integerMessage('Year')).required(requiredMessage('Year')).test('len', 'Must be exactly 4 characters', val => val && val.toString().length === 4),
  volume: Yup.number().integer(integerMessage('Volume')).required(requiredMessage('Volume')),
  pages: Yup.number().integer(integerMessage('Pages')).required(requiredMessage('Pages')),
  title: Yup.string().trim().required(requiredMessage('Title')),
  type: Yup.string().trim().required(requiredMessage('Type')),
  publisher: Yup.string().trim().required(requiredMessage('Publisher')),
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

const dataValidationSchema = Yup.object().shape({
  variables: Yup.array().of(
    Yup.object().shape(
      {

      }
    )
  ),
  contents: Yup.array().of(
    Yup.object().shape(
      {

      }
    )
  ),
  comments: Yup.string()
})

export const validationSchema = Yup.object().shape({
  reference: referenceValidationSchema,
  data: dataValidationSchema,
  dataset_name: Yup.string().required(requiredMessage('Dataset Name')),
  data_type: Yup.string().required(requiredMessage('Dataset Type')),
  category: Yup.string().required(requiredMessage('Category')),
  subcategory: Yup.string().required(requiredMessage('Subcategory')),
  material: Yup.array().required().min(1)
})