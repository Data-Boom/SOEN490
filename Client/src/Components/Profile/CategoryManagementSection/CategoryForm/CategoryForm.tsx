import { Box, Button, Divider, Grid, ThemeProvider } from '@material-ui/core'
import { FastField, FieldArray } from 'formik'

import { MuiTextFieldFormik } from '../../../Forms/FormikFields'
import React from 'react'
// import { UnitList } from './UnitList'
import { classStyles } from '../../../../appTheme'
import { disabledTheme } from '../../../Forms/ComponentUpdate'
import { AddIcon } from '@material-ui/data-grid'

interface IProps {
    id?: number
}

export const CategoryForm = (props: IProps) => {


    const addNewSubcategory = () => {
        console.log('add new subcategory')
    }

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
                            {/* <FieldArray name='units' >
                                {({ form, ...fieldArrayHelpers }) => <UnitList units={form.values.units} fieldArrayHelpers={fieldArrayHelpers} baseUnitId={form.values.baseUnitId} />}
                            </FieldArray> */}
                        </ThemeProvider>
                    </Grid>
                    <Grid item xs={6} alignContent="flex-start">
                        <Button variant="contained" color="primary" aria-label="add category" onClick={addNewSubcategory}> Add New SubCategory
                        <AddIcon />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}