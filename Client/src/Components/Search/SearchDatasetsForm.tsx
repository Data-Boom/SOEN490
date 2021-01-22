import { Button, Grid, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { ICategory, ISearchDatasetsFormModel, defaultSearchDatasetsModel, searchDatasetsValidationSchema } from './ISearchDatasetsFormModel'
import { MuiSelectFormik, MuiTextFieldFormik } from '../Forms/FormikFields'
import React, { useEffect, useState } from 'react'
import { listCategories, listMaterials } from '../../Remote/Endpoints/DatasetEndpoint'

interface IProps {
  handleSubmit(formValues: ISearchDatasetsFormModel): void
}

export const SearchDatasetsForm = (props: IProps): any => {
  const [categories, setCategories] = useState([])
  const [materials, setMaterials] = useState([])


  const { handleSubmit } = { ...props }

  useEffect(() => {
    const callListCategories = async () => {
      const categories = await listCategories()
      setCategories(categories)
    }

    const callListMaterials = async () => {
      const materials = await listMaterials()
      setMaterials(materials)
    }

    callListCategories()
    callListMaterials()
  }, [])

  const getOptions = (categories: ICategory[]): any => {
    return (
      <>
        <option aria-label="None" value="" />
        {categories.map(option => <option key={option.id} value={option.id}> {option.name} </option>)}
      </>
    )
  }

  return (
    <>
      <Formik
        initialValues={defaultSearchDatasetsModel}
        validationSchema={searchDatasetsValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <Typography variant='h4' align="left">Search</Typography>
          <Grid container spacing={4}>
            <Grid item sm={2}>
              <Field name="firstName" label='First Name' component={MuiTextFieldFormik} />
            </Grid>

            <Grid item sm={2}>
              <Field name="lastName" label='Last Name' component={MuiTextFieldFormik} />
            </Grid>

            <Grid item sm={2}>
              <Field name="year" label='Year' component={MuiTextFieldFormik} />
            </Grid>

            <Grid item sm={2}>
              <Field name="categoryId" label='Category' component={MuiSelectFormik} options={getOptions(categories)} />
            </Grid>

            <Grid item sm={2}>
              <Field name="material" label='Material' component={MuiSelectFormik} options={getOptions(materials)} />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item sm={2}>
              <Button id="search-database" variant="contained" color="primary" type="submit"> Search Database </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  )
}