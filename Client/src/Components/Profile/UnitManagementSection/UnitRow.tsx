import { Box, Button, Divider, Grid, Paper, Table, TableContainer, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import { ConfirmationModal } from '../../Authentication/ConfirmationModal'
import { classStyles } from '../../../appTheme'

interface IProps {

}


export const UnitRow = () => {

  return (
    <>
      <Divider className={classStyles().divider} variant="middle" />
      <Typography variant='h6' align="left">System Wide Dimensions</Typography>
    </>
  )

}