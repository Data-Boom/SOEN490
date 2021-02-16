import { Box, Button, Divider, Grid, Paper, Table, TableContainer, Typography } from '@material-ui/core'
import { Equation, EquationEvaluate, EquationOptions, defaultErrorHandler } from "react-equation"
import React, { useState } from 'react'

import { ConfirmationModal } from '../../Authentication/ConfirmationModal'
import { IUnitModel } from '../../../Models/Profile/IDimenstionModel'
import { classStyles } from '../../../appTheme'

interface IProps {
  units: IUnitModel[]
}


export const UnitForm = (props: IProps) => {

  const [units, setUnits] = useState(props.units)
  // This file will contain a field to edit the base units of the form. Additionally, it will render a list of individual Units, and a way to add/remove units.
  // See how Authors are added in the dataset upload form.
  // The EquationEvaluate part will probably have to be moved to UnitRow later on.

  return (
    <>
      <Divider className={classStyles().divider} variant="middle" />
      <Typography align="left">Example Conversion:</Typography>
      <EquationEvaluate
        value={units[1].conversionFormula}
        variables={{ u: { type: 'number', value: 1 } }}
        errorHandler={defaultErrorHandler}
      />
    </>
  )

}