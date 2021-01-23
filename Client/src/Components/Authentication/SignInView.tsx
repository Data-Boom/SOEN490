import { FastField, Form, Formik } from 'formik'
import { ISignInUserModel, defaultSignInUserModel } from '../../Models/Authentication/ISignUpModel'
import React, { useContext } from 'react'

import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import { IUserAccountModel } from '../../Models/Authentication/IUserAccountModel'
import Link from '@material-ui/core/Link'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { MuiTextFieldFormik } from '../Forms/FormikFields'
import { Redirect } from 'react-router'
import Typography from '@material-ui/core/Typography'
import { UserContext } from '../../App'
import { callLogIn } from '../../Remote/Endpoints/AuthenticationEndpoint'
import { getUserDetails } from '../../Remote/Endpoints/UserEndpoint'
import { homeRoute } from '../../Common/Consts/Routes'
import { loginValidationSchema } from './AuthenticationValidationSchema'
import { makeStyles } from '@material-ui/core/styles'

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
}))

export default function SignInView() {

  const { user, setUser } = useContext(UserContext)
  const classes = useStyles()

  const handleSignInSubmit = async (signInUserInfo: ISignInUserModel): Promise<void> => {
    //sets JWT in cookies
    await callLogIn(signInUserInfo)
    const userAccount: IUserAccountModel = await getUserDetails({ email: signInUserInfo.email })
    setUser(userAccount)
  }

  return (
    <>
      {user && user.firstName ?
        <Redirect to={homeRoute} /> :
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Formik
              initialValues={defaultSignInUserModel}
              validationSchema={loginValidationSchema}
              onSubmit={handleSignInSubmit}
            >
              <Form className={classes.form} noValidate>
                <FastField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
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
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#/sign-up" variant="body2">
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