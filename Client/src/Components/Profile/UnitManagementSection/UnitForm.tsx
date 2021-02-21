import { Box, Button, Divider, Grid, ThemeProvider } from '@material-ui/core'

import { FieldArray } from 'formik'
import React from 'react'
import { UnitList } from './UnitList'
import { classStyles } from '../../../appTheme'
import { disabledTheme } from '../../Forms/ComponentUpdate'

export const UnitForm = () => {

  return (
    <>
      <Box pb={2}>
        <Grid container direction="column" spacing={4}>
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