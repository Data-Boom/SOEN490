import { Box, Button, Divider, Grid, Paper, Table, TableContainer, ThemeProvider, Typography } from '@material-ui/core'
import { Equation, EquationEvaluate, EquationOptions, defaultErrorHandler } from "react-equation"
import { FastField, FieldArray } from 'formik'
import React, { useState } from 'react'

import { AuthorsList } from '../../DatasetUpload/ReferenceSection/AuthorsList'
import { ConfirmationModal } from '../../Authentication/ConfirmationModal'
import { IUnitModel } from '../../../Models/Profile/IDimenstionModel'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import { UnitList } from './UnitList'
import { classStyles } from '../../../appTheme'
import { disabledTheme } from '../../Forms/ComponentUpdate'
import { get } from '../../../Remote/FluentRequest'

interface IProps {

}


export const UnitForm = (props: IProps) => {

  // This file will contain a field to edit the base units of the form. Additionally, it will render a list of individual Units, and a way to add/remove units.
  // See how Authors are added in the dataset upload form.
  // The EquationEvaluate part will probably have to be moved to UnitRow later on.

  /*
<EquationEvaluate
        value={units[1].conversionFormula}
        variables={{ u: { type: 'number', value: 1 } }}
        errorHandler={defaultErrorHandler}
      />
  */

  return (
    <>
      <Box className={classStyles().defaultBorder}>
        <ThemeProvider theme={disabledTheme}>
          <Typography variant='h6' align="left">Base Unit ID:</Typography>
          <Grid container spacing={4}>
            <Grid item sm={4}>
              <FastField name="dimension.baseUnitId" label='Base Unit ID' component={MuiTextFieldFormik} />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <FieldArray name='units' >
              {({ form, ...fieldArrayHelpers }) => <UnitList units={form.values.units} fieldArrayHelpers={fieldArrayHelpers} />}
            </FieldArray>
          </Grid>
        </ThemeProvider>
      </Box >
      <Divider className={classStyles().divider} variant="middle" />
      <Typography align="left">Example Conversion:</Typography>
    </>
  )

}