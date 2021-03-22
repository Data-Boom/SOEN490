import { Box, Grid, ThemeProvider, Typography } from '@material-ui/core'
import { FastField, FieldArray } from 'formik'
import { disabledTheme, shouldComponentUpdate } from '../../../Forms/ComponentUpdate'

import { AuthorsList } from './AuthorsList'
import { MuiTextFieldFormik } from '../../../Forms/FormikFields'
import React from 'react'
import { classStyles } from '../../../../appTheme'
import { get } from 'lodash'

interface IProps {
  editable: boolean
}

export const ReferenceForm = (props: IProps) => {

  const { editable } = props

  return (
    <Box className={classStyles().defaultBorder}>
      <ThemeProvider theme={disabledTheme}>
        <Typography variant='h6' align="left">Reference</Typography>
        <Grid container spacing={2}>
          <Grid item sm={4}>
            <FastField name="reference.title" label='Title' disabled={!editable} shouldUpdate={shouldComponentUpdate} component={MuiTextFieldFormik} />
          </Grid>
          <Grid item sm={4}>
            <FastField name="reference.type" label='Type' disabled={!editable} shouldUpdate={shouldComponentUpdate} component={MuiTextFieldFormik} />
          </Grid>
          <Grid item sm={4}>
            <FastField name="reference.publisher" label='Publisher' disabled={!editable} shouldUpdate={shouldComponentUpdate} component={MuiTextFieldFormik} />
          </Grid>
          <Grid item sm={2}>
            <FastField name="reference.volume" label='Volume' disabled={!editable} shouldUpdate={shouldComponentUpdate} component={MuiTextFieldFormik} />
          </Grid>
          <Grid item sm={2}>
            <FastField name="reference.pages" label='Pages' disabled={!editable} shouldUpdate={shouldComponentUpdate} component={MuiTextFieldFormik} />
          </Grid>
          <Grid item sm={4}>
            <FastField name="reference.doi" label='Doi' disabled={!editable} shouldUpdate={shouldComponentUpdate} component={MuiTextFieldFormik} />
          </Grid>
          <Grid item sm={2}>
            <FastField name="reference.issue" label='Issue' disabled={!editable} shouldUpdate={shouldComponentUpdate} component={MuiTextFieldFormik} />
          </Grid>
          <Grid item sm={2}>
            <FastField name="reference.year" label='Year' disabled={!editable} shouldUpdate={shouldComponentUpdate} component={MuiTextFieldFormik} />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography variant='h6' align="left">Authors</Typography>
          <FieldArray name='reference.authors' >
            {({ form, ...fieldArrayHelpers }) => <AuthorsList editable={editable} authors={get(form.values, 'reference.authors')} fieldArrayHelpers={fieldArrayHelpers} />}
          </FieldArray>
        </Box>
      </ThemeProvider>
    </Box >
  )
}