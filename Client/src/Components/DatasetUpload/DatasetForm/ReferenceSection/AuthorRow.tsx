import { Grid, IconButton } from "@material-ui/core"

import ClearIcon from '@material-ui/icons/Clear'
import { FastField } from "formik"
import { MuiTextFieldFormik } from '../../../Forms/FormikFields'
import React from 'react'
import { shouldComponentUpdate } from '../../../Forms/ComponentUpdate'

interface IProps {
  index: number,
  onRemoveAuthorClick: (index: number) => void,
  editable: boolean,
  removable: boolean
}

export const AuthorRow = (props: IProps) => {
  const { index, onRemoveAuthorClick, removable, editable } = props

  const removeButton = () => {
    return editable && (
      <IconButton color="primary" aria-label="remove author" onClick={() => onRemoveAuthorClick(index)} disabled={!editable}>
        <ClearIcon />
      </IconButton>
    )
  }

  return (
    <Grid item container spacing={2} alignItems="flex-start">
      <Grid item>
        <FastField name={`reference.authors[${index}].firstName`} disabled={!editable} shouldUpdate={shouldComponentUpdate} label='First Name' component={MuiTextFieldFormik} />
      </Grid>
      <Grid item>
        <FastField name={`reference.authors[${index}].middleName`} disabled={!editable} shouldUpdate={shouldComponentUpdate} label='Middle Name' component={MuiTextFieldFormik} />
      </Grid>
      <Grid item>
        <FastField name={`reference.authors[${index}].lastName`} disabled={!editable} shouldUpdate={shouldComponentUpdate} label='Last Name' component={MuiTextFieldFormik} />
      </Grid>
      <Grid item>
        {removable ? removeButton() : null}
      </Grid>
    </Grid>
  )
}