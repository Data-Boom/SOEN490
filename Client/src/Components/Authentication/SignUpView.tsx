import { FastField, Form, Formik } from 'formik'
import { ISignUpUserModel, newSignUpUserModel } from '../../Models/Authentication/ISignUpModel'
import React, { Fragment } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Link from '@material-ui/core/Link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { MuiTextFieldFormik } from '../Forms/FormikFields'
import Typography from '@material-ui/core/Typography'
import { callSignUp } from '../../Remote/Endpoints/AuthenticationEndpoint'
import { loginRoute } from '../../Common/Consts/Routes'
import { makeStyles } from '@material-ui/core/styles'
import { signupValidationSchema } from './AuthenticationValidationSchema'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignUpView(props: any) {
  const classes = useStyles()
  async function handleSignUpSubmit(user: ISignUpUserModel): Promise<void> {
    await callSignUp(user)
    props.history.push(loginRoute)
  }
  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            initialValues={newSignUpUserModel}
            validationSchema={signupValidationSchema}
            onSubmit={handleSignUpSubmit}
          >
            <Form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FastField
                    autoComplete="fname"
                    name="firstName"
                    label="First Name"
                    required
                    component={MuiTextFieldFormik}
                    id="firstName"
                    variant="outlined"
                    fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FastField
                    variant="outlined"
                    required
                    fullWidth
                    component={MuiTextFieldFormik}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname" />
                </Grid>
                <Grid item xs={12}>
                  <FastField
                    variant="outlined"
                    required
                    fullWidth
                    component={MuiTextFieldFormik}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email" />
                </Grid>
                <Grid item xs={12}>
                  <FastField
                    component={MuiTextFieldFormik}
                    variant="outlined"
                    fullWidth
                    required
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FastField
                    component={MuiTextFieldFormik}
                    variant="outlined"
                    fullWidth
                    required
                    id="organization"
                    label="Organization"
                    name="organizationName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FastField
                    variant="outlined"
                    required
                    fullWidth
                    component={MuiTextFieldFormik}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password" />
                </Grid>
                <Grid item xs={12}>
                  <FastField
                    variant="outlined"
                    required
                    fullWidth
                    component={MuiTextFieldFormik}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirm-password" />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                id="SignUpButton"
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href={loginRoute} variant="body2">
                    Already have an account? Log in
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </Fragment >
  )
}


