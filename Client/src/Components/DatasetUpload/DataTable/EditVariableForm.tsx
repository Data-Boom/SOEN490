import { Box, Button, Grid, TextField } from "@material-ui/core"

import React from 'react'
import { useFormik } from "formik"

interface IProps {

}

interface IFormValues {
  name: string,
  units: string,
  repr: string
}

const emptyFormValues: IFormValues = {
  name: '',
  units: '',
  repr: ''
}

export const EditVariableForm = (props: IProps) => {

  const validate = (values: IFormValues) => {
    const errors: IFormValues = emptyFormValues
    if (!values.name) {
      errors.name = 'Required'
    } else if (values.name.length > 7) {
      errors.name = 'Must be 7 characters or less'
    }

    if (!values.units) {
      errors.units = 'Required'
    } else if (values.units.length > 7) {
      errors.units = 'Must be 7 characters or less'
    }

    if (!values.repr) {
      errors.repr = 'Required'
    } else if (values.repr.length > 7) {
      errors.repr = 'Must be 7 characters or less'
    }

    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      units: '',
      repr: '',
    },
    validate: validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  const handleUpdateClick = () => {
    formik.handleSubmit()
  }

  return (
    <Box m={5}>
      <Grid container spacing={4}>
        <Grid item sm={4}>
          <TextField fullWidth label="Name" variant="outlined" name="name" value={formik.values.name} onChange={formik.handleChange} helper />
        </Grid>
        <Grid item sm={4}>
          <TextField fullWidth label="Units" variant="outlined" name="units" value={formik.values.units} onChange={formik.handleChange} />
        </Grid>
        <Grid item sm={4}>
          <TextField fullWidth label="Representation" variant="outlined" name="repr" value={formik.values.repr} onChange={formik.handleChange} />
        </Grid>
      </Grid>

      <Grid container spacing={4} justify="flex-end">
        <Grid item>
          <Button variant="contained" onClick={handleUpdateClick}>Update</Button>
        </Grid>
      </Grid>
    </Box>
  )
}