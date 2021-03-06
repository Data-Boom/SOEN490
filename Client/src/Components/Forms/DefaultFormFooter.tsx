import { Button, Grid, GridJustification } from "@material-ui/core"

import { FormikValues } from "formik"
import React from 'react'
import { useUserSelector } from "../../Stores/Slices/UserSlice"

interface IProps {
  formikReference: React.MutableRefObject<FormikValues>
  justify?: GridJustification,
  onCancel?: (formikReference: React.MutableRefObject<FormikValues>) => void
}

export const DefaultFormFooter = (props: IProps) => {
  const user = useUserSelector()
  const { formikReference, justify, onCancel } = { ...props }

  return user && user.email && (
    <Grid container spacing={3} justify={justify || "center"}>
      <Grid item>
        <Button id="form-submit" variant="outlined" color="primary" onClick={() => onCancel ? onCancel(formikReference) : formikReference.current.resetForm()}>
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