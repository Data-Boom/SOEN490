import * as Yup from 'yup'

import { integerMessage, requiredMessage } from '../../Common/Helpers/ValidationHelpers'

const referenceValidationSchema = Yup.object().shape({
  year: Yup.number().integer(integerMessage('Year')).required(requiredMessage('Year')).test('len', 'Year must be exactly 4 characters', val => val && val.toString().length === 4),
  doi: Yup.string().trim().nullable(),
  volume: Yup.number().nullable().integer(integerMessage('Volume')),
  issue: Yup.number().nullable().integer(integerMessage('Issue')),
  pages: Yup.string().trim().matches(new RegExp(/^(?:\d+$|\d+-\d+$|)$/), "Pages must be a single number or two numbers separated by a hyphen if included"),
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
    name: Yup.string().trim().required(requiredMessage('Name')),
    dimensionId: Yup.mixed().required(requiredMessage('Dimensions')),
    unitId: Yup.mixed().required(requiredMessage('Units'))
  }
)

export const materialValidationSchema = Yup.object().shape(
  {
    composition: Yup.mixed().required(requiredMessage('composition')),
    details: Yup.mixed().required(requiredMessage('details'))
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
  data_type: Yup.string(),
  subcategory: Yup.number().nullable().integer(integerMessage('Subcategory [ID]')),
  material: Yup.array().required().min(1)
})

export const datasetValidationSchema = Yup.object().shape({
  reference: referenceValidationSchema,
  data: dataValidationSchema,
  meta: metaValidationSchema
})