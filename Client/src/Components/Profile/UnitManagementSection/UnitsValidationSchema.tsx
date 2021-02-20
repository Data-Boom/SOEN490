import * as Yup from 'yup'

export const UnitValidationSchema = Yup.object().shape({
  units: Yup.array().of(
    Yup.object().shape(
      {
        name: Yup.string().trim().required('Unit Name is a required field'),
        conversionFormula: Yup.string().trim().required('Conversion Formula is a required field')
      }
    )
  ),
})