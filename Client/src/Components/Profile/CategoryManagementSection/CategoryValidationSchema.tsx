import * as Yup from 'yup'

export const CategoryValidationSchema = Yup.object().shape({
    categoryName: Yup.string().trim().required('Category Name is a required field'),
    subCategoryName: Yup.string().trim().required('Subcategory Name is a required field'),
})