import { Button, Grid, Typography } from '@material-ui/core'
import { Field, FieldArray, Form, Formik } from 'formik'
import { ICategoryModel, ISubcategoryModel } from '../../Remote/Endpoints/CategoryEndpoint'
import { ISearchDatasetsFormModel, defaultSearchDatasetsModel, searchDatasetsValidationSchema } from './ISearchDatasetsFormModel'
import { MuiSelectFormik, MuiTextFieldFormik } from '../Forms/FormikFields'
import React, { useEffect, useState } from 'react'

import { MaterialSelectChipArray } from '../DatasetUpload/MetaSection/MaterialSelectChipArray'
import { listMaterials } from '../../Remote/Endpoints/MaterialEndpoint'

interface IProps {
  handleSubmit(formValues: ISearchDatasetsFormModel): void,
  categories: ICategoryModel[]
}

export const SearchDatasetsForm = (props: IProps): any => {
  const [materials, setMaterials] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null)

  const { handleSubmit, categories } = { ...props }

  const transformAndSubmit = (formValues: ISearchDatasetsFormModel) => {
    let newMaterials = formValues.material as any[] || []
    newMaterials = newMaterials?.map(material => material.composition)
    formValues = { ...formValues, material: newMaterials }
    handleSubmit(formValues)
  }

  useEffect(() => {
    const callListMaterials = async () => {
      const materials = await listMaterials()
      setMaterials(materials || [])
    }

    callListMaterials()
  }, [])

  const getOptions = (options: any[]): any => {
    return (
      <>
        <option aria-label="None" value="" />
        {options.map(option => <option key={option.id} value={option.id}> {option.name} </option>)}
      </>
    )
  }

  const getSubCategories = (categoryId: number): ISubcategoryModel[] => {
    const foundCategory = categories.find(category => category.id == categoryId)
    if (!foundCategory) {
      return []
    }
    return foundCategory.subcategories
  }

  const handleCategoryChange = (formProps, value: any) => {
    const categoryId = value.target.value
    formProps.setFieldValue('categoryId', categoryId)
    setSelectedCategoryId(categoryId)
  }

  return (
    <>
      <Formik
        initialValues={defaultSearchDatasetsModel}
        validationSchema={searchDatasetsValidationSchema}
        onSubmit={transformAndSubmit}
      >
        {formProps =>
          <Form>
            <Typography variant='h4' align="left">Search</Typography>
            <Grid container spacing={4}>
              <Grid item>
                <Field name="firstName" label='First Name' component={MuiTextFieldFormik} />
              </Grid>

              <Grid item>
                <Field name="lastName" label='Last Name' component={MuiTextFieldFormik} />
              </Grid>

              <Grid item>
                <Field name="year" label='Year' component={MuiTextFieldFormik} />
              </Grid>

              <Grid item>
                <Field name="categoryId" label='Category' component={MuiSelectFormik} options={getOptions(categories)} onChange={(value) => handleCategoryChange(formProps, value)} />
              </Grid>

              <Grid item>
                <Field name="subcategoryId" label='Subcategory' component={MuiSelectFormik} disabled={!selectedCategoryId} options={getOptions(getSubCategories(selectedCategoryId))} />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item sm={12}>
                <FieldArray name='material' >
                  {({ form, ...fieldArrayHelpers }) => {
                    return (<MaterialSelectChipArray
                      value={form.values.material}
                      fieldArrayHelpers={fieldArrayHelpers}
                      options={materials}
                      editable={true}
                    />)
                  }}
                </FieldArray>
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item>
                <Button id="search-database" variant="contained" color="primary" type="submit"> Search Database </Button>
              </Grid>
            </Grid>
          </Form>
        }
      </Formik>
    </>
  )
}