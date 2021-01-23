import { Grid } from "@material-ui/core"
import { Field, Form, Formik } from "formik"
import Typography from "material-ui/styles/typography"
import { IGraphStateModel } from "../../Models/Graph/IGraphStateModel"
import React from 'react'

interface IProps {
  graphState: IGraphStateModel
}

export const SaveGraphStateControl = (props: IProps) => {
  const { graphState } = { ...props }

  return (
    <Formik
      initialValues={defaultSearchDatasetsModel}
      validationSchema={searchDatasetsValidationSchema}
      onSubmit={transformAndSubmit}
    >
      <Form>
        <Typography variant='h4' align="left">Search</Typography>
        <Grid container spacing={4}>
          <Grid item sm={2}>
            <Field name="firstName" label='First Name' component={MuiTextFieldFormik} />
          </Grid>
        </Grid>
        </Grid>
      </Form>
    </Formik >
  )
}