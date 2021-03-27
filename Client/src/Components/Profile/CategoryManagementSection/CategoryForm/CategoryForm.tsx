import { Box, Button, Divider, Grid, ThemeProvider } from '@material-ui/core'
import { FastField, FieldArray } from 'formik'

import { MuiTextFieldFormik } from '../../../Forms/FormikFields'
import React from 'react'
// import { UnitList } from './UnitList'
import { classStyles } from '../../../../appTheme'
import { disabledTheme } from '../../../Forms/ComponentUpdate'
import { AddIcon } from '@material-ui/data-grid'
import { SubcategoryList } from './SubcategoryList'

export const CategoryForm = () => {


    return (
        <>
            <Box pb={2}>
                <Grid container direction="column" spacing={4}>
                    <Grid item>
                        <FastField name={`name`} label='Category Name' component={MuiTextFieldFormik} />
                    </Grid>
                    <Grid item>
                        <Divider className={classStyles().divider} variant="fullWidth" />
                    </Grid>
                    <Grid item>
                        <ThemeProvider theme={disabledTheme}>
                            <FieldArray name='subcategories' >
                                {({ form, ...fieldArrayHelpers }) => <SubcategoryList subcategories={form.values.subcategories} fieldArrayHelpers={fieldArrayHelpers} categoryId={form.values.categoryId} />}
                            </FieldArray>
                        </ThemeProvider>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}