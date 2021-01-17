import { Box, Grid, Paper, Table, TableCell, TableRow, Typography } from '@material-ui/core'

import { IUser } from '../../../Models/Profile/IProfileModel'
import React from 'react'
import { classStyles } from '../../../appTheme'

interface IProps {
  user: IUser
}
export default function UserDetailsTab(props: IProps) {

  const { user } = props

  return (
    <Grid container spacing={10}>
      <Grid item xs={2}>
      </Grid>
      <Grid item xs={8}>
        <Box className={classStyles().defaultBorder}>
          <Table component={Paper}>
            <TableRow>
              <TableCell align="center" variant="head" >
                <Typography variant="h3">
                  Name:
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h4">
                  {user.name}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" variant="head">
                <Typography variant="h3">
                  E-Mail:
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h4">
                  {user.email}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" variant="head">
                <Typography variant="h3">
                  Date of Birth:
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h4">
                  {user.dateOfBirth}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" variant="head">
                <Typography variant="h3">
                  Organization:
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h4">
                  {user.organization}
                </Typography>
              </TableCell>
            </TableRow>
          </Table>
        </Box>
      </Grid>
      <Grid item xs={2}>
      </Grid>
    </Grid>
  )
}