import { FastField, Field, Form, Formik } from 'formik'
import { defaultResetPasswordModel, IResetPasswordModel } from '../../Models/Authentication/ISignUpModel'
import React from 'react'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { MuiTextFieldFormik } from '../Forms/FormikFields'
import Typography from '@material-ui/core/Typography'
import { callResetPassword } from '../../Remote/Endpoints/AuthenticationEndpoint'
import { resetPasswordValidationSchema } from './AuthenticationValidationSchema'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

interface IResetPasswordParam {
  resetToken: string
}

export default function ResetPasswordView() {

  const { resetToken } = useParams<IResetPasswordParam>()

  const classes = useStyles()

  const handleResetPasswordSubmit = async (resetPasswordInfo: IResetPasswordModel): Promise<void> => {
    const resetPassInfo: IResetPasswordModel = { ...resetPasswordInfo, resetToken: resetToken };
    console.log("ResetPassInfo", resetPassInfo)
    await callResetPassword(resetPassInfo);
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
                    </Typography>
          <Formik
            initialValues={defaultResetPasswordModel}
            validationSchema={resetPasswordValidationSchema}
            onSubmit={handleResetPasswordSubmit}
          >
            <Form className={classes.form} noValidate>
              <FastField
                variant="outlined"
                margin="normal"
                required
                id="password"
                label="Password"
                name="password"
                type="password"
                component={MuiTextFieldFormik}
              />
              <FastField
                variant="outlined"
                margin="normal"
                required
                id="passwordConfirmation"
                label="Password Confirmation"
                name="passwordConfirmation"
                type="password"
                component={MuiTextFieldFormik}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Reset Password
              </Button>
            </Form>
          </Formik>
        </div>
      </Container>
    </>
  )
}