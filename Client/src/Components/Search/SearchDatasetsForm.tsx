import { Button, Grid, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { ICategory, ISearchDatasetsFormModel, defaultSearchDatasetsModel, searchDatasetsValidationSchema } from './ISearchDatasetsFormModel'
import { MuiSelectFormik, MuiTextFieldFormik } from '../Forms/FormikFields'
import React, { useEffect, useState } from 'react'

import { listCategories } from '../../Remote/Endpoints/DatasetEndpoint'

interface IProps {
  handleSubmit(formValues: ISearchDatasetsFormModel): void
}

export const SearchDatasetsForm = (props: IProps): any => {
  const [categories, setCategories] = useState([])


  const { handleSubmit } = { ...props }

  useEffect(() => {
    //useEffect with [] will run once component renders the first time ever. Now we are passing mocked values but we need to create endpoint to get those categories
    // todo create categories endpoint
    const getListCategory = async () => {
      const categories = await listCategories()
      setCategories(categories)
    }
    getListCategory()
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
            <Grid item sm={3}>
              <Field name="year" label='Year' component={MuiTextFieldFormik} />
            </Grid>

            <Grid item sm={3}>
              <Field name="firstName" label='First Name' component={MuiTextFieldFormik} />
            </Grid>

            <Grid item sm={2}>
              <Field name="lastName" label='Last Name' component={MuiTextFieldFormik} />
            </Grid>

            <Grid item sm={2}>
              <Field name="categoryId" label='Category' component={MuiSelectFormik} options={getOptions(categories)} />
            </Grid>

            <Grid item sm={2}>
              <Button id="search-database" variant="contained" color="primary" type="submit"> Search Database </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  )
}