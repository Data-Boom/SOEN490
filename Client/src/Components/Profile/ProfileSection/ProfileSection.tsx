import { Box, Grid, Typography } from '@material-ui/core'

import { FastField } from 'formik'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'
import { classStyles } from '../../../appTheme'

interface IProps {

}

export const ProfileSection = (props: IProps) => {
  return (
    <Box className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Profile</Typography>
      <Grid container spacing={4}>
        <Grid item sm={3}>
          <FastField name="name" label='Name' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={3}>
          <FastField name="email" label='Email' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={3}>
          <FastField name="dateOfBirth" label='Date of Birth' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={3}>
          <FastField name="organization" label='Organization' component={MuiTextFieldFormik} />
        </Grid>
      </Grid>
    </Box>
  )
}