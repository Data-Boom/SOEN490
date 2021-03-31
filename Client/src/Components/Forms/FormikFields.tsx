import { FormControl, InputLabel, Select, TextField } from "@material-ui/core"

import { Autocomplete } from "@material-ui/lab"
import React from 'react'
import { get } from "lodash"

export const MuiTextFieldFormik = ({ field, form: { touched, errors }, ...props }) => {
  const [error, helperText] = getErrorAndHelper(field, touched, errors)

  const variant = props.variant || "outlined"
  return (
    <TextField InputLabelProps={{ shrink: field.value || field.isFocused }} fullWidth variant={variant} {...field} {...props} error={error} helperText={helperText} />
  )
}

export const MuiSelectFormik = ({ field, form: { touched, errors }, ...props }) => {
  const [error, helperText] = getErrorAndHelper(field, touched, errors)

  console.log(field.name, 'field.name')
  console.log(field.value, 'field.value')
  return (
    <>
      <FormControl variant="outlined" fullWidth>
        <InputLabel shrink={field.value || field.isFocused}>{props.label}</InputLabel>
        <Select
          native
          variant="outlined"
          fullWidth
          {...field}
          {...props}
          error={error}
        >
          {props.options}
        </Select>
      </FormControl>
    </>
  )
}

export const MuiAutocompleteFormik = ({ field, form: { touched, errors, setFieldValue }, ...props }) => {
  const [error, helperText] = getErrorAndHelper(field, touched, errors)
  return (
    <>
      <Autocomplete
        options={props.options}
        getOptionLabel={option => option}
        renderInput={(params) => <TextField {...params} label={props.label} variant="outlined" fullWidth />}
        {...field}
        {...props}
        freeSolo
        autoSelect
        onChange={(event, newOption) => setFieldValue(field.name, newOption)}
        error={error}
      />
    </>
  )
}

export const getErrorAndHelper = (field, touched, errors) => {
  const error = get(touched, field.name) && !!get(errors, field.name)
  const helperText = get(touched, field.name) && get(errors, field.name)
  return [error, helperText]
}