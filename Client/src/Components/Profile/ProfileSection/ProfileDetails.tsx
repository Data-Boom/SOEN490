import { Box, Grid, Typography } from '@material-ui/core'

import { IUser } from "../ProfileForm"
import React from 'react'

interface IProps {
  user: IUser
}
export default function ProfileDetails(props: IProps) {

  const { user } = props

  return (
    <Grid container spacing={10}>
      <Grid item xs={12}>
        <Box border={10} p={4} borderColor="primary">
          <Grid container spacing={10}>
            <Grid item xs={6}>
              <Typography variant="h3">
                Name:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4">
                {user.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h3">
                E-mail:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4">
                {user.email}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h3">
                Date of Birth:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4">
                {user.dateOfBirth}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h3">
                Organization:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h4">
                {user.organization}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}