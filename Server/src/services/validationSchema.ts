import * as Yup from 'yup';

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
                firstname: Yup.string().trim().strict().required('First Name is a required field'),
                middlename: Yup.string().strict(),
                lastname: Yup.string().trim().strict().required('Last Name is a required field')
            }
        )
    ),
    title: Yup.string().trim().strict().required(requiredMessage('Title')),
    volume: Yup.number().integer(integerMessage('Volume')).required(requiredMessage('Volume')),
    pages: Yup.number().integer(integerMessage('Pages')).required(requiredMessage('Pages')),
    year: Yup.number().integer(integerMessage('Year')).required(requiredMessage('Year')).test('len', 'Year must be exactly 4 characters', val => val && val.toString().length === 4),
})

export const variableValidationSchema = Yup.object().shape(
    {
        name: Yup.string().trim().strict().required(requiredMessage('Name')),
        repr: Yup.string().trim().strict().required(requiredMessage('Representation')),
        units: Yup.string().trim().strict().required(requiredMessage('Units'))
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
        details: Yup.string().trim().strict().required('Composition is required field')
    })

export const validationSchema = Yup.object().shape({
    reference: referenceValidationSchema,
    ["dataset name"]: Yup.string().strict().required(requiredMessage('Dataset Name')),
    material: Yup.array().of(referenceMaterialSchema),
    ["data type"]: Yup.string().strict().required(requiredMessage('Dataset Type')),
    data: dataValidationSchema,
    category: Yup.string().strict(),
    subcategory: Yup.string().strict()
})