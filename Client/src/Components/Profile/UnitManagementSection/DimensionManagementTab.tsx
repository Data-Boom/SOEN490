import { Box, Button, Grid, Paper, Table, TableContainer, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import { ConfirmationModal } from '../../Authentication/ConfirmationModal'
import { DimensionForm } from './DimensionForm'
import { classStyles } from '../../../appTheme'

interface IProps {

}


export const DimensionManagementTab = () => {

  return (
    <>
      <Box className={classStyles().defaultBorder} style={{ width: "100%" }} >
        <Typography variant='h6' align="left">System Wide Dimensions</Typography>
        <DimensionForm />
      </Box>
    </>
  )

}