import React, { useState } from  'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import * as Yup from 'yup'
import { Form, Formik } from 'formik'
import { ISignInUser } from '../Models/Profile/IProfileModel';


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
  );
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
}));


 /*const state={
  user:
  [
    {email: '123@databoom.ca', password: 'password123'},
    {email: 'abc@databoom.ca', password: 'passwordabc'},
    {email: 'xyz@databoom.ca', password: 'passwordxyz'}
  ]
}*/





export default function SignIn() {
  const classes = useStyles();

  const handleSignIn = () =>
{
  alert("Sign in button clicked");
}

const[email, setEmail] = useState("");
const[password, setPassword] = useState("");

const[emailError, setEmailError]= useState({});
const[passwordError, setPasswordError] = useState({});
const emailErrMsg = useState({});



const onSubmit =(e)=>{
  e.preventDefault();
  const isValid = formValidation();

  if(isValid)
  {
    //send the data to some backend
  }
}

const formValidation =()=>{
const emailError ={};
const passwordError ={};
//const emailErrMsg ={};
const passwordErrMsg ="";
let isValid = true;

 if(!email.includes("@")){
   //emailError.emailErrMsg = "Invalid email";
   alert("invalid email");
   isValid = false;
 }

 if(password != "password123")
 {
   alert("incorrect password");
   isValid = false;
 }

 setEmailError(emailError);
 setPasswordError(passwordError);
 return isValid;
}







  //console.log("signin function run");
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit ={onSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}

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
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}