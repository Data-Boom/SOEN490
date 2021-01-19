import * as Yup from 'yup'

import { Box, Button, Container, Grid, Typography } from '@material-ui/core'
import { FastField, Form, Formik } from 'formik'
import { IPasswordFormModel, defaultPasswordFormModel } from '../../../../Models/Profile/IProfileModel'

import { MuiTextFieldFormik } from '../../../Forms/FormikFields'
import React from 'react'
import { classStyles } from '../../../../appTheme'

interface IProps {
  onSubmit: (newPassword: string) => void
}

export default function PasswordChangeForm(props: IProps) {

  const { onSubmit } = props

  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(8, 'Password should have a minimum of 8 characters'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const handleSubmit = (formValues: IPasswordFormModel) => {
    onSubmit(formValues.password)
  }

  return (
    <Container>
      <Formik
        initialValues={defaultPasswordFormModel}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
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
          <Button variant="contained" color="primary" type="submit">Confirm Password</Button>
        </Form>
      </Formik>
    </Container>
  )
}