import * as Yup from 'yup'

import { Box, Button, Grid, Typography } from '@material-ui/core'
import { FastField, Form, Formik } from 'formik'

import { MuiTextFieldFormik } from '../../../Forms/FormikFields'
import React from 'react'
import { classStyles } from '../../../../appTheme'
import { defaultResetPasswordModel, IResetPasswordModel } from '../../../../Models/Authentication/ISignUpModel'

interface IProps {
  onSubmit: (newPassword: string) => void
}

export default function PasswordChangeForm(props: IProps) {

  const { onSubmit } = props

  const passwordSchema = Yup.string().required().matches(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/), "Password must contain in between 8 to 30 characters, one uppercase, one number and one special case character")

  const validationSchema = Yup.object().shape({
    password: passwordSchema,
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const handleSubmit = (formValues: IResetPasswordModel) => {
    onSubmit(formValues.password)
  }

  return (
    <Formik
      initialValues={defaultResetPasswordModel}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Box className={classStyles().defaultBorder}>
          <Typography variant='h6' align="left">Change Password</Typography>
          <Grid container spacing={4}>
            <Grid item sm={6}>
              <FastField name="password" label='New password' type="password" component={MuiTextFieldFormik} />
            </Grid>
            <Grid item sm={6}>
              <FastField name="passwordConfirmation" label='Confirm password' type="password" component={MuiTextFieldFormik} />
            </Grid>
          </Grid>
        </Box>
        <Button id="ConfirmPasswordButton" variant="contained" color="primary" type="submit">Confirm Password</Button>
      </Form>
    </Formik>
  )
}