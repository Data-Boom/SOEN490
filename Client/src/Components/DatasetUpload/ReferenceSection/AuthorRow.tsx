import { Box, Grid, IconButton } from "@material-ui/core"
import { FastField } from "formik"

import ClearIcon from '@material-ui/icons/Clear'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'

interface IProps {
  index: number,
  onRemoveAuthorClick: (index: number) => void,
  removable: boolean
}

export const AuthorRow = (props: IProps) => {
  const { index, onRemoveAuthorClick, removable } = props

  const removeButton = () => {
    return (
      <IconButton color="primary" aria-label="remove author" onClick={() => onRemoveAuthorClick(index)}>
        <ClearIcon />
      </IconButton>
    )
  }

  return (
    <Box>
      <Grid item container spacing={4}>
        <Grid item>
          <FastField name={`reference.authors[${index}].firstname`} label='First Name' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item>
          <FastField name={`reference.authors[${index}].middlename`} label='Middle Name' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item>
          <FastField name={`reference.authors[${index}].lastname`} label='Last Name' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item>
          {removable ? removeButton() : null}
        </Grid>
      </Grid>
    </Box>
  )
}