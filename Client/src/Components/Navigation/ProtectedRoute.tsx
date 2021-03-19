import { Grid, Typography } from '@material-ui/core'
import { ProtectedRouteModel, userCanView } from '../../Common/Consts/Routes'

import React from 'react'
import { Route } from 'react-router'
import { useUserSelector } from '../../Stores/Slices/UserSlice'

interface IProps {
  component: any
  protectedRoute: ProtectedRouteModel
  exact?: boolean
}

export const ProtectedRoute = (props: IProps) => {
  const user = useUserSelector()
  const { component, protectedRoute, exact } = { ...props }

  const ProtectionMessage = () => {
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <Typography>You are not authorized to view this page</Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <Route path={protectedRoute.route} exact={exact} component={userCanView(user, protectedRoute.permission) ? component : ProtectionMessage} />
  )
}