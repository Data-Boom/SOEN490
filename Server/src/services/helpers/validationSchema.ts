import * as Yup from 'yup'

const integerMessage = (fieldName: string): string => {
    return `${fieldName} should be an integer`
}


const requiredMessage = (fieldName: string): string => {
    return `${fieldName} is a required field`
}

const referenceValidationSchema = Yup.object().shape({
    type: Yup.string().trim().strict().required(requiredMessage('Type')),
    publisher: Yup.string().trim().strict().required(requiredMessage('Publisher')),
    authors: Yup.array().of(
        Yup.object().shape(
            {
                firstName: Yup.string().trim().strict().required('First Name is a required field'),
                middleName: Yup.string().strict(),
                lastName: Yup.string().trim().strict().required('Last Name is a required field')
            }
        )
    ),
    title: Yup.string().trim().strict().required(requiredMessage('Title')),
    doi: Yup.string().trim(),
    volume: Yup.number().integer(integerMessage('Volume')),
    pages: Yup.number().integer(integerMessage('Pages')),
    year: Yup.number().integer(integerMessage('Year')).required(requiredMessage('Year')).test('len', 'Year must be exactly 4 characters', val => val && val.toString().length === 4),
    datePublished: Yup.date(),
    dateAccessed: Yup.date()
})

export const variableValidationSchema = Yup.object().shape(
    {
        name: Yup.string().trim().strict().required(requiredMessage('Name')),
        repr: Yup.string().trim().strict(),
        units: Yup.string().trim().strict()
    }
)

const dataValidationSchema = Yup.object().shape({
    variables: Yup.array().of(variableValidationSchema),
    contents: Yup.array().of(
        Yup.object().shape(
            {
                point: Yup.array().of(Yup.number()),
                comments: Yup.string().strict()
            }
        )
    ),
    comments: Yup.string()
})

const referenceMaterialSchema =
    Yup.object().shape({
        composition: Yup.string().strict().trim().required('Composition is required field'),
        details: Yup.string().trim().strict()
    })

export const validationSchema = Yup.object().shape({
    reference: referenceValidationSchema,
    dataset_name: Yup.string().strict().required(requiredMessage('Dataset Name')),
    material: Yup.array().of(referenceMaterialSchema),
    data_type: Yup.string().strict().required(requiredMessage('Dataset Type')),
    data: dataValidationSchema,
    category: Yup.string().strict(),
    subcategory: Yup.string().strict()
})