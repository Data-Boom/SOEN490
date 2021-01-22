import { Button, FormControl, FormControlLabel, Grid, InputLabel, Select, Switch, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { ISearchDatasetsFormModel, defaultSearchDatasetsModel, searchDatasetsValidationSchema } from './ISearchDatasetsFormModel'
import React, { useEffect, useState } from 'react'

import { MuiTextFieldFormik } from '../Forms/FormikFields'

import { listCategories, listSubcategories, listMaterials } from '../../Remote/Endpoints/DatasetEndpoint'
interface IProps {
  handleSubmit(formValues: ISearchDatasetsFormModel): void
}

export const SearchDatasetsForm = (props: IProps): any => {
  const [isCaseSensitive, setIsCaseSensitive] = useState(false)
  const [categories, setCategories] = useState([])


  const { handleSubmit } = { ...props }

  useEffect(() => {
    //useEffect with [] will run once component renders the first time ever. Now we are passing mocked values but we need to create endpoint to get those categories
    // todo create categories endpoint
    const getListCategory = async () => {
      const categories = await listCategories();
      setCategories(categories)
    }
    getListCategory()
  }, [])

  const toggleIsCaseSensitive = () => {
    setIsCaseSensitive(!isCaseSensitive)
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
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-outFormat-native-simple"> Categories </InputLabel>
                <Select
                  native
                  label="categories"
                  name="categories" value={[]}
                >
                  <option aria-label="None" value="" />
                  {categories.map(option => <option key={option.value} value={option.value}> {option.text} </option>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={2}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="outlined-outFormat-native-simple"> SubCategories </InputLabel>
                <Select
                  native
                  label="categories"
                  name="categories" value={[]}
                >
                  <option aria-label="None" value="" />
                  {categories.map(option => <option key={option.value} value={option.value}> {option.text} </option>)}
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={2}>
              <Button id="search-database" variant="contained" color="primary" type="submit"> Search Database </Button>
            </Grid>
          </Grid>

          <Grid container spacing={4}>
            <Grid item>
              <FormControl>
                <FormControlLabel
                  label="Case Sensitive"
                  labelPlacement="start"
                  control={
                    <Switch
                      name="isCaseSensitive"
                      checked={isCaseSensitive}
                      onChange={toggleIsCaseSensitive}
                    />
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </>
  )
}