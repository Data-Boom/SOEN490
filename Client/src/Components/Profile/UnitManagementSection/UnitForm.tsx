import { Box, Button, Divider, Grid, Paper, Table, TableContainer, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import { ConfirmationModal } from '../../Authentication/ConfirmationModal'
import { classStyles } from '../../../appTheme'

interface IProps {

}


export const UnitForm = () => {

  // This file will contain a field to edit the base units of the form. Additionally, it will render a list of individual Units, and a way to add/remove units.
  // See how Authors are added in the dataset upload form.

  return (
    <>
      <Divider className={classStyles().divider} variant="middle" />
      <Typography align="left">Base Units: </Typography>
      <Divider className={classStyles().divider} variant="middle" />
      <Typography align="left">Units: </Typography>
    </>
  )

}