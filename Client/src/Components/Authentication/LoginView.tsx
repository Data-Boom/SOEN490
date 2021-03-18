import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, Typography } from '@material-ui/core'
import { FastField, Form, Formik } from 'formik'
import { ILoginUserModel, newLoginUserModel } from '../../Models/Authentication/ISignUpModel'
import { Modal, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import { homeRoute, signUpRoute } from '../../Common/Consts/Routes'
import { loginAndLoadUserThunk, useUserSelector } from '../../Stores/Slices/UserSlice'

import CancelIcon from "@material-ui/icons/Cancel"
import ForgotPasswordView from './ForgotPasswordView'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { MuiTextFieldFormik } from '../Forms/FormikFields'
import { Redirect } from 'react-router'
import { loginValidationSchema } from './AuthenticationValidationSchema'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch } from 'react-redux'

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
  const dispatch = useDispatch()
  const user = useUserSelector()

  const classes = useStyles()

  const [openModal, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleLoginSubmit = async (loginUserInfo: ILoginUserModel): Promise<void> => {
    dispatch(loginAndLoadUserThunk(loginUserInfo))
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
                  <ForgotPasswordView />
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
                    <Link id="SignUpForm" href={signUpRoute} variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </div>
        </Container>
      }
    </>
  )
}