import { Box, Grid, Typography } from '@material-ui/core'

import { FastField } from 'formik'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'
import { classStyles } from '../../../appTheme'

export const UserForm = () => {
  return (
    <Box className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Edit Profile</Typography>
      <Grid container spacing={4}>
        <Grid item sm={6}>
          <FastField name="email" label='Email' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={6}>
          <FastField name="organization" label='Organization' component={MuiTextFieldFormik} />
        </Grid>
      </Grid>
    </Box>
  )
}