import { FastField, useFormikContext } from "formik"
import { Grid, IconButton, Typography } from "@material-ui/core"

import ClearIcon from '@material-ui/icons/Clear'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'
import { convertToBase } from "../../../Common/Helpers/UnitConversionHelpers"

interface IProps {
  index: number,
  onRemoveUnitClick: (index: number) => void,
  conversionFormula: string,
  baseUnitName?: string
  removable: boolean
}

export const UnitRow = (props: IProps) => {
  const { index, onRemoveUnitClick, baseUnitName, removable } = props
  const conversionFormula = props.conversionFormula.replace(/[{}]/g, '')
  const { values } = useFormikContext()

  const removeButton = () => {
    return (
      <IconButton color="primary" aria-label="remove unit" onClick={() => onRemoveUnitClick(index)}>
        <ClearIcon />
      </IconButton>
    )
  }

  return (
    <Grid item container spacing={2} alignItems="center">
      <Grid item>
        <FastField name={`units[${index}].name`} label='Unit Name' component={MuiTextFieldFormik} />
      </Grid>
      <Grid item>
        <FastField name={`units[${index}].conversionFormula`} label='Conversion to Base' component={MuiTextFieldFormik} />
      </Grid>
      <Grid item>
        <Typography>
          {baseUnitName && `1 ${baseUnitName} = ${convertToBase(1, conversionFormula)} ${(values as any).units[index].name}`}
        </Typography>
      </Grid>
      <Grid item>
        {removable ? removeButton() : null}
      </Grid>
    </Grid>
  )
}