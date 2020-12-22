import * as Yup from 'yup'

import { Box, Grid, TextField, Typography } from '@material-ui/core'
import { Field, useFormik } from 'formik'

import { AuthorsList } from './AuthorsList'
import { IReference } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { getErrorAndFormikProps } from '../../../Util/FormUtil'

interface IProps {
}

const CustomInputComponent = (props) => {
  console.log(props);
  return (
    <TextField {...props} />
  )
}

export const ReferenceForm = (props: IProps) => {
  return (
    <Box className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Reference</Typography>
      <Grid container spacing={4}>
        <Grid item sm={4}>
          <Field name="reference.title" as={CustomInputComponent} />
          {/* <TextField fullWidth label="Title" variant="outlined" /> */}
        </Grid>
        <Grid item sm={4}>
          {/* <TextField fullWidth label="Type" variant="outlined" {...getErrorAndFormikProps(formik, "type")} /> */}
        </Grid>
        <Grid item sm={4}>
          {/* <TextField fullWidth label="Publisher" variant="outlined" {...getErrorAndFormikProps(formik, "publisher")} /> */}
        </Grid>
        <Grid item sm={4}>
          {/* <TextField fullWidth label="Volume" variant="outlined" type='number' {...getErrorAndFormikProps(formik, "volume")} /> */}
        </Grid>
        <Grid item sm={4}>
          {/* <TextField fullWidth label="Pages" variant="outlined" type='number' {...getErrorAndFormikProps(formik, "pages")} /> */}
        </Grid>
        <Grid item sm={4}>
          {/* <TextField fullWidth label="Year" variant="outlined" type='number' {...getErrorAndFormikProps(formik, "year")} /> */}
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {/* <AuthorsList
          {...getErrorAndFormikProps(formik, "authors")}
          setFieldValue={formik.setFieldValue}
        /> */}
      </Grid>
    </Box >
  )
} 