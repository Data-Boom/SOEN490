import { Button, Grid, Typography } from "@material-ui/core"
import { logoutThunk, useUserSelector } from "../../Stores/Slices/UserSlice"

import { Link } from 'react-router-dom'
import React from 'react'
import { routes } from "../../Common/Consts/Routes"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"

export const Greeting = () => {
  const history = useHistory()
  const user = useUserSelector()
  const dispatch = useDispatch()

  const logout = async () => {
    dispatch(logoutThunk())
    history.push(routes.loginRoute.route)
  }

  return user && user.firstName ?
    (
      <Typography>
        <Grid container spacing={2}>
          <Grid item>
            {user.firstName} {user.lastName}
          </Grid>
          <Grid>
            <Button id="SignOut" variant="contained" onClick={logout}>Sign out</Button>
          </Grid>
        </Grid>
      </Typography>
    ) : (
      <Button component={Link} to={routes.loginRoute.route} id='LogIn' variant="contained">Log in</Button>
    )
}