import { FormControl, InputLabel, Select, TextField } from "@material-ui/core"

import React from 'react'
import { get } from "lodash"

export const MuiTextFieldFormik = ({ field, form: { touched, errors }, ...props }) => {
  const error = get(touched, field.name) && !!get(errors, field.name)
  const helperText = get(touched, field.name) && get(errors, field.name)
  const variant = props.variant || "outlined"
  return (
    <TextField fullWidth variant={variant} {...field} {...props} error={error} helperText={helperText} />
  )
}

export const MuiSelectFormik = ({ field, form: { touched, errors }, ...props }) => {
  const error = get(touched, field.name) && !!get(errors, field.name)
  const helperText = get(touched, field.name) && get(errors, field.name)
  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-outFormat-native-simple"> Categories </InputLabel>
        <Select
          native
          {...field}
          {...props}
          error={error}
          helperText={helperText}
        >
          {props.options}
        </Select>
      </FormControl>
    </>
  )
}