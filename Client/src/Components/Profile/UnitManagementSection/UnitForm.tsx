import { Box, Button, Divider, Grid, Paper, Table, TableContainer, ThemeProvider, Typography } from '@material-ui/core'
import { Equation, EquationEvaluate, EquationOptions, defaultErrorHandler } from "react-equation"
import { FastField, FieldArray } from 'formik'
import React, { useState } from 'react'

import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import { UnitList } from './UnitList'
import { classStyles } from '../../../appTheme'
import { disabledTheme } from '../../Forms/ComponentUpdate'
import { get } from '../../../Remote/FluentRequest'
import { indexOf } from 'lodash'

export const UnitForm = () => {

  return (
    <>
      <Divider className={classStyles().divider} variant="middle" />
      <ThemeProvider theme={disabledTheme}>
        <Grid container spacing={4}>
          <FieldArray name='units' >
            {({ form, ...fieldArrayHelpers }) => <UnitList units={form.values.units} fieldArrayHelpers={fieldArrayHelpers} baseUnitId={form.values.baseUnitId} />}
          </FieldArray>
        </Grid>
      </ThemeProvider>
    </>
  )

}