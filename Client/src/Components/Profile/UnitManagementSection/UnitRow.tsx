import { Box, Grid, IconButton, Tooltip } from "@material-ui/core"
import { Equation, EquationEvaluate, EquationOptions, defaultErrorHandler } from "react-equation"

import ClearIcon from '@material-ui/icons/Clear'
import { FastField } from "formik"
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'

interface IProps {
  index: number,
  onRemoveUnitClick: (index: number) => void,
  conversionFormula?: string,
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
          <FastField name={`units[${index}].name`} label='Unit Name' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item>
          <FastField name={`units[${index}].conversionFormula`} label='Conversion Formula' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item>

          <EquationEvaluate
            value={props.conversionFormula || 'u'}
            variables={{ u: { type: 'number', value: 1 } }}
            errorHandler={defaultErrorHandler}
          />
        </Grid>
        <Grid item>
          {removable ? removeButton() : null}
        </Grid>
      </Grid>
    </Box>
  )
}