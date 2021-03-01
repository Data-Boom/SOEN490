import { Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, Typography } from '@material-ui/core'
import { FastField, Form, Formik } from 'formik'
import { ILoginUserModel, newLoginUserModel } from '../../Models/Authentication/ISignUpModel'
import { Modal, Paper } from '@material-ui/core'
import React, { useContext, useState } from 'react'

import CancelIcon from "@material-ui/icons/Cancel"
import ForgotPasswordView from './ForgotPasswordView'
import { IUserAccountModel, defaultUserAccountModel } from '../../Models/Authentication/IUserAccountModel'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { MuiTextFieldFormik } from '../Forms/FormikFields'
import { Redirect, useHistory } from 'react-router'
import { UserContext } from '../../App'
import { callLogIn } from '../../Remote/Endpoints/AuthenticationEndpoint'
import { getUserDetails } from '../../Remote/Endpoints/UserEndpoint'
import { homeRoute } from '../../Common/Consts/Routes'
import { loginValidationSchema } from './AuthenticationValidationSchema'
import { makeStyles } from '@material-ui/core/styles'


import moment from 'moment';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export default function LoginView() {

  const { user, setUser } = useContext(UserContext)
  const classes = useStyles()

  const [openModal, setOpen] = useState(false)

  const history = useHistory()

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLoginSubmit = async (loginUserInfo: ILoginUserModel): Promise<void> => {
    //sets JWT in cookies
    let loginResponse = await callLogIn(loginUserInfo)

    let userAccount: IUserAccountModel = await getUserDetails({ email: loginUserInfo.email })
    userAccount.sessionExpiration = moment.duration(loginResponse.ValidFor).asMilliseconds()

    setUser(userAccount)
  }

  return (
    <>
      {user && user.firstName ?
        <Redirect to={homeRoute} /> :
        <Container component="main" maxWidth="xs">
          <Modal
            open={openModal}
            onClose={handleClose}
            className={classes.modal}
          >
            <Grid xs={6} justify="center">
              <Paper elevation={3}>
                <Box padding={1}>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <CancelIcon color="primary" onClick={() => setOpen(false)} />
                    </Grid>
                  </Grid>
                  <ForgotPasswordView

                  />
                </Box>
              </Paper>
            </Grid>
          </Modal>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Formik
              initialValues={newLoginUserModel}
              validationSchema={loginValidationSchema}
              onSubmit={handleLoginSubmit}
            >
              <Form className={classes.form} noValidate>
                <FastField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="logInViewEmail"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  component={MuiTextFieldFormik}
                />
                <FastField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  component={MuiTextFieldFormik}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  id="LogInButton"
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link id="ForgotPasswordLink" onClick={handleOpen} variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link id="SignUpForm" href="#/sign-up" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      }
    </>
  )
}