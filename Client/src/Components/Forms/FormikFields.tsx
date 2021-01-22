import React from 'react'
import { TextField } from "@material-ui/core"
import { get } from "lodash"

export const MuiTextFieldFormik = ({ field, form: { touched, errors }, ...props }) => {
  const error = get(touched, field.name) && !!get(errors, field.name)
  const helperText = get(touched, field.name) && get(errors, field.name)
  const variant = props.variant || "outlined"
  return (
    <TextField fullWidth variant={variant} {...field} {...props} error={error} helperText={helperText} />
  )
}