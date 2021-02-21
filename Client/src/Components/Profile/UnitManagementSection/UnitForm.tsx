import { Box, Button, Divider, Grid, ThemeProvider } from '@material-ui/core'
import { FastField, FieldArray } from 'formik'

import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'
import { UnitList } from './UnitList'
import { classStyles } from '../../../appTheme'
import { disabledTheme } from '../../Forms/ComponentUpdate'

interface IProps {
  id?: number
}

export const UnitForm = (props: IProps) => {

  const id = props.id

  const renderDimensionNameForm = () => {
    console.log(id)
    if (!id) {
      return (
        <FastField name={`name`} label='Dimension Name' component={MuiTextFieldFormik} />
      )
    }
  }

  return (
    <>
      <Box pb={2}>
        <Grid container direction="column" spacing={4}>
          <Grid item>
            {renderDimensionNameForm()}
          </Grid>
          <Grid item>
            <Divider className={classStyles().divider} variant="fullWidth" />
          </Grid>
          <Grid item>
            <ThemeProvider theme={disabledTheme}>
              <FieldArray name='units' >
                {({ form, ...fieldArrayHelpers }) => <UnitList units={form.values.units} fieldArrayHelpers={fieldArrayHelpers} baseUnitId={form.values.baseUnitId} />}
              </FieldArray>
            </ThemeProvider>
          </Grid>
          <Grid item>
            <Button id='unit-submit' variant="contained" color="primary" type="submit">Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}