import { Box, Button, Divider, Grid, ThemeProvider } from '@material-ui/core'
import { FastField, FieldArray } from 'formik'

import { MuiTextFieldFormik } from '../../../Forms/FormikFields'
import React, { useState } from 'react'

import { classStyles } from '../../../../appTheme'
import { disabledTheme } from '../../../Forms/ComponentUpdate'
import { AddIcon } from '@material-ui/data-grid'
import { SubcategoryList } from './SubcategoryList'

interface IProps {
  id?: number
}

export const CategoryForm = (props: IProps) => {

  const { id } = props
  const [editable, setEditable] = useState<boolean>(true)


  // const makeCategoryEditable = () => {
  //   setEditable(true)
  // }

  const renderSubmitButton = () => {
      return (
        <Grid item>
          <Button id='unit-submit' variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid> 
      )
  }

  const renderSaveButton = () => {
    return (
      <Grid item>
        <Button id='save-category' variant='contained' color='primary' type="submit">
          Save
      </Button>
      </Grid>
    )
  }

    return (
      <>
        <Box pb={2}>
         <Grid container direction="column" spacing={4}>
            <Grid item>
              <FastField name={`name`} label='category' component={MuiTextFieldFormik} />
            </Grid>
            <Grid item>
             <Divider className={classStyles().divider} variant="fullWidth" />
            </Grid>
            <Grid item>
              <ThemeProvider theme={disabledTheme}>
                <FieldArray name='subcategories' >
                  {({ form, ...fieldArrayHelpers }) => <SubcategoryList subcategories={form.values.subcategories} fieldArrayHelpers={fieldArrayHelpers} categoryId={form.values.categoryId}/>}
                </FieldArray>
              </ThemeProvider>
            </Grid>
           { id ? renderSaveButton() : renderSubmitButton()}
         </Grid>
       </Box>
        </>
    )
}