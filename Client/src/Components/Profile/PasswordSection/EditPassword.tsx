import { Box, Grid, Typography } from '@material-ui/core'

import { FastField } from 'formik'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'
import { classStyles } from '../../../appTheme'

export const EditPassword = () => {
  return (
    <Box className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Change Password</Typography>
      <Grid container spacing={4}>
        <Grid item sm={6}>
          <FastField name="password" label='Password' type="password" component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={6}>
          <FastField name="passwordConfirmation" label='Confirm Password' type="password" component={MuiTextFieldFormik} />
        </Grid>
      </Grid>
    </Box>
  )
}