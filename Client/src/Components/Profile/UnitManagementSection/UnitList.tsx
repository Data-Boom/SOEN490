import { ArrayHelpers, FastField } from "formik"
import { Divider, Grid, IconButton, Tooltip, Typography } from "@material-ui/core"

import AddIcon from '@material-ui/icons/Add'
import { IUnitModel } from "../../../../../Server/src/models/interfaces/IDimension"
import { MuiTextFieldFormik } from "../../Forms/FormikFields"
import React from 'react'
import { UnitRow } from "./UnitRow"
import { classStyles } from "../../../appTheme"
import { newUnit } from "../../../Models/Profile/IDimensionModel"

interface IProps {
  units: IUnitModel[],
  fieldArrayHelpers: ArrayHelpers,
  baseUnitId?: number
}

export const UnitList = (props: IProps) => {
  const { units, fieldArrayHelpers, baseUnitId } = props

  const handleRemoveUnit = (indexToRemove: number) => {
    fieldArrayHelpers.remove(indexToRemove)
  }

  const renderBaseUnitRow = () => {
    if (baseUnitId) {
      return units && units.map((unit, index) => {
        if (unit.id == baseUnitId) {
          return (
            <FastField name={`units[${index}].name`} label='Unit Name' component={MuiTextFieldFormik} />
          )
        }
      })
    }
    else {
      return (
        <FastField name={`units[0].name`} label='Unit Name' component={MuiTextFieldFormik} />
      )
    }
  }

  //additional rows
  const renderUnitRows = () => {
    return units && units.map((unit, index) => {
      if (unit.id != baseUnitId) {
        return (
          <UnitRow
            key={index}
            index={index}
            conversionFormula={unit.conversionFormula}
            onRemoveUnitClick={handleRemoveUnit}
            removable={shouldRenderRemove()}
          />
        )
      }
    })
  }

  const shouldRenderRemove = () => {
    // allow removing authors if there is at least 2
    return units.length > 1
  }

  const handleAddUnit = () => {
    fieldArrayHelpers.push(newUnit)
  }

  return (
    <>
      <Grid item container direction='column' spacing={4} alignItems="flex-start">
        <Grid item>
          <Typography variant='h6' align="left">Base Unit ID:</Typography>
        </Grid>
        <Grid item>
          {renderBaseUnitRow()}
        </Grid>
        <Grid item>
          <Divider className={classStyles().divider} variant="middle" />
        </Grid>
        <Grid item>
          <Tooltip title="Example Formula for cm to m: u/100, where u is equal to 1" placement="top">
            <Typography variant='h6' align="left">Units</Typography>
          </Tooltip>
        </Grid>
        <Grid item>
          {renderUnitRows()}
        </Grid>
        <Grid item>
          <IconButton color="primary" aria-label="add unit" onClick={handleAddUnit}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}