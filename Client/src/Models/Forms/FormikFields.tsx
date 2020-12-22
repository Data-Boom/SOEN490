import React from 'react';
import { TextField } from "@material-ui/core"
import { get } from "lodash"

export const MuiTextFieldFormik = ({ field, form: { touched, errors }, ...props }) => {
  console.log(errors);
  const error = get(touched, field.name) && !!get(errors, field.name)
  const helperText = get(touched, field.name) && get(errors, field.name)

  return (
    <TextField fullWidth variant="outlined" {...field} {...props} error={error} helperText={helperText} />
  )
}