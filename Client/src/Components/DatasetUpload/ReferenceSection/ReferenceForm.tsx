import * as Yup from 'yup'

import { Box, Grid, TextField, Typography } from '@material-ui/core'
import { FastField, Field, FieldArray, useFormik } from 'formik'

import { AuthorRow } from './AuthorRow'
import { AuthorsList } from './AuthorsList'
import { IReference } from '../../../Models/Datasets/IDatasetModel'
import { MuiTextFieldFormik } from '../../../Models/Forms/FormikFields'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { get } from 'lodash';

interface IProps {
}

export const ReferenceForm = (props: IProps) => {
  return (
    <Box className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Reference</Typography>
      <Grid container spacing={4}>
        <Grid item sm={4}>
          <FastField name="reference.title" component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={4}>
          <FastField name="reference.type" component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={4}>
          <FastField name="reference.publisher" component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={4}>
          <FastField name="reference.volume" component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={4}>
          <FastField name="reference.pages" component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={4}>
          <FastField name="reference.year" component={MuiTextFieldFormik} />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <FieldArray name='reference.authors' >
          {({ form, ...fieldArrayHelpers }) => <AuthorsList authors={get(form.values, 'reference.authors')} fieldArrayHelpers={fieldArrayHelpers} />}
        </FieldArray>
      </Grid>
    </Box >
  )
} 