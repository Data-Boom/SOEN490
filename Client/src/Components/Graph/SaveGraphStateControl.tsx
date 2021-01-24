import { Field, Form, Formik } from "formik"

import { Grid } from "@material-ui/core"
import { IGraphStateModel } from "../../Models/Graph/IGraphStateModel"
import React from 'react'
import Typography from "material-ui/styles/typography"

interface IProps {
  graphState: IGraphStateModel
}

export const SaveGraphStateControl = (props: IProps) => {
  const { graphState } = { ...props }

  const saveGraphState = () => {

  }

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
      </Form>
    </Formik >
  )
}