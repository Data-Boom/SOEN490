import { Box, Grid, IconButton } from "@material-ui/core"

import ClearIcon from '@material-ui/icons/Clear'
import { FastField } from "formik"
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'

interface IProps {
  index: number,
  onRemoveUnitClick: (index: number) => void,
  removable: boolean
}

export const UnitRow = (props: IProps) => {
  const { index, onRemoveUnitClick, removable } = props

  const removeButton = () => {
    return (
      <IconButton color="primary" aria-label="remove unit" onClick={() => onRemoveUnitClick(index)}>
        <ClearIcon />
      </IconButton>
    )
  }

  return (
    <Box>
      <Grid item container spacing={4}>
        <Grid item>
          <FastField name={`name`} label='Unit Name' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item>
          <FastField name={`conversionFormula`} label='Conversion Formula' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item>
          {removable ? removeButton() : null}
        </Grid>
      </Grid>
    </Box>
  )
}