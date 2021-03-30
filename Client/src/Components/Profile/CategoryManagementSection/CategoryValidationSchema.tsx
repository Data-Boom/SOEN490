import * as Yup from 'yup'

export const CategoryValidationSchema = Yup.object().shape({
    name: Yup.string().trim().required('Category Name is a required field'),
    subcategories: Yup.array().of(
        Yup.object().shape(
          {
            name: Yup.string().trim().required('Subcategory Name is a required field'),
          }
        )
      ),
})