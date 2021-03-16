import { Button, Grid, Typography } from "@material-ui/core"

import { Link } from 'react-router-dom'
import React from 'react'
import { UserContext } from "../../App"
import { callLogout } from "../../Remote/Endpoints/AuthenticationEndpoint"
import { defaultUserAccountModel } from "../../Models/Authentication/IUserAccountModel"
import { loginRoute } from "../../Common/Consts/Routes"
import { useContext } from "react"
import { useHistory } from "react-router"

export const Greeting = () => {
  const history = useHistory()
  const { user, setUserContext } = useContext(UserContext)

  const redirectToLogin = async () => {
    setUserContext(defaultUserAccountModel)
    await callLogout()
    history.push({
      pathname: loginRoute
    })
  }

  return user && user.firstName ?
    (
      <Typography>
        <Grid container spacing={2}>
          <Grid item>
            {user.firstName} {user.lastName}
          </Grid>
          <Grid>
            <Button id="SignOut" variant="contained" onClick={redirectToLogin}>Sign out</Button>
          </Grid>
        </Grid>
      </Typography>
    ) : (
      <Button component={Link} to={loginRoute} id='LogIn' variant="contained">Log in</Button>
    )
}