import { Grid, IconButton, Typography } from "@material-ui/core"
import { IUnitModel, newUnit } from "../../../Models/Profile/IDimenstionModel"

import AddIcon from '@material-ui/icons/Add'
import { ArrayHelpers } from "formik"
import React from 'react'
import { UnitRow } from "./UnitRow"

interface IProps {
  units: IUnitModel[],
  fieldArrayHelpers: ArrayHelpers,
}

export const UnitList = (props: IProps) => {
  const { units, fieldArrayHelpers } = props

  const handleRemoveUnit = (indexToRemove: number) => {
    fieldArrayHelpers.remove(indexToRemove)
  }

  const renderUnitRows = () => {
    console.log(units)
    return units && units.map((unit, index) => {
      return (
        <UnitRow
          key={index}
          index={index}
          onRemoveUnitClick={handleRemoveUnit}
          removable={shouldRenderRemove()}
        />
      )
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
          <Typography variant='h6' align="left">Units</Typography>
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