import * as Yup from 'yup'

const integerMessage = (fieldName: string): string => {
  return `${fieldName} should be an integer`
}

const requiredMessage = (fieldName: string): string => {
  return `${fieldName} is a required field`
}

const referenceValidationSchema = Yup.object().shape({
  year: Yup.number().integer(integerMessage('Year')).required(requiredMessage('Year')).test('len', 'Year must be exactly 4 characters', val => val && val.toString().length === 4),
  doi: Yup.string().trim().nullable(),
  volume: Yup.number().nullable().integer(integerMessage('Volume')),
  issue: Yup.number().nullable().integer(integerMessage('Issue')),
  pages: Yup.string().trim().nullable().matches(new RegExp(/^\d+(-\d+)?$/), "Pages must be a single number or two numbers separated by a hyphen if included"),
  title: Yup.string().trim().required(requiredMessage('Title')),
  type: Yup.string().trim().required(requiredMessage('Type')),
  publisher: Yup.string().trim().required(requiredMessage('Publisher')),
  authors: Yup.array().of(
    Yup.object().shape(
      {
        firstName: Yup.string().trim().required('First Name is a required field'),
        middleName: Yup.string().nullable(),
        lastName: Yup.string().trim().required('Last Name is a required field')
      }
    )
  ),
})

export const variableValidationSchema = Yup.object().shape(
  {
    name: Yup.string().trim(),
    repr: Yup.string().trim(),
    units: Yup.string().trim()
  }
)

const dataValidationSchema = Yup.object().shape({
  variables: Yup.array().of(variableValidationSchema),
  contents: Yup.array().of(
    Yup.object().shape(
      {
        point: Yup.array().of(Yup.number()),
        comments: Yup.string()
      }
    )
  ),
  comments: Yup.string()
})

const metaValidationSchema = Yup.object().shape({
  dataset_name: Yup.string().required(requiredMessage('Dataset Name')),
  data_type: Yup.string().required(requiredMessage('Dataset Type')),
  category: Yup.string().required(requiredMessage('Category')),
  subcategory: Yup.string().required(requiredMessage('Subcategory')),
  material: Yup.array().required().min(1)
})

export const datasetValidationSchema = Yup.object().shape({
  reference: referenceValidationSchema,
  data: dataValidationSchema,
  meta: metaValidationSchema
})