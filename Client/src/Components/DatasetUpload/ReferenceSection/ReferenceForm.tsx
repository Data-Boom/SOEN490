import { Box, Grid, Typography } from '@material-ui/core'
import { FastField, FieldArray } from 'formik'

import { AuthorsList } from './AuthorsList'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { get } from 'lodash'

export const ReferenceForm = () => {
  return (
    <Box className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Reference</Typography>
      <Grid container spacing={4}>
        <Grid item sm={4}>
          <FastField name="reference.title" label='Title' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={4}>
          <FastField name="reference.type" label='Type' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={4}>
          <FastField name="reference.publisher" label='Publisher' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={4}>
          <FastField name="reference.volume" label='Volume' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={4}>
          <FastField name="reference.pages" label='Pages' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={4}>
          <FastField name="reference.year" label='Year' component={MuiTextFieldFormik} />
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