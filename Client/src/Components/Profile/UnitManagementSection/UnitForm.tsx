import { Box, Button, Divider, Grid, Paper, Table, TableContainer, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import { ConfirmationModal } from '../../Authentication/ConfirmationModal'
import { classStyles } from '../../../appTheme'

interface IProps {

}


export const UnitForm = () => {

  return (
    <>
      <Divider className={classStyles().divider} variant="middle" />
      <Typography align="left">Base Units: </Typography>
      <Divider className={classStyles().divider} variant="middle" />
      <Typography align="left">Units: </Typography>
    </>
  )

}