import { Button, Grid } from "@material-ui/core"

import { FormikValues } from "formik"
import React from 'react'

interface IProps {
  formikReference: React.MutableRefObject<FormikValues>
}

export const DefaultFormFooter = (props: IProps) => {
  const { formikReference } = { ...props }

  return (
    <Grid container spacing={3} justify="center">
      <Grid item>
        <Button id="form-submit" variant="outlined" color="primary" onClick={() => formikReference.current.resetForm()}>
          Cancel
        </Button>
      </Grid>
      <Grid item>
        <Button id="form-submit" variant="contained" color="primary" onClick={() => formikReference.current.handleSubmit()}>
          Submit
        </Button>
      </Grid>
    </Grid>
  )
}