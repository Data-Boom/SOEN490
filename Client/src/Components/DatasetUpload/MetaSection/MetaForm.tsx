import { Box, Grid, ThemeProvider, Typography } from '@material-ui/core'
import { FastField, Field, FieldArray } from 'formik'
import { MuiSelectFormik, MuiTextFieldFormik } from '../../Forms/FormikFields'
import { disabledTheme, shouldComponentUpdate } from '../../Forms/ComponentUpdate'

import { IMaterial } from '../../../Models/Datasets/IDatasetModel'
import { MaterialSelectChipArray } from './MaterialSelectChipArray'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { get } from 'lodash'

interface IProps {
  materials: IMaterial[],
  categories: any[],
  subcategories: any[],
  editable: boolean
}

const getOptions = (options: any[]): any => {
  //todo revert value from id to option.name once backend is able to consume ids for categories
  return (
    <>
      {options.map(option => <option key={option.id} value={option.id}> {option.name} </option>)}
    </>
  )
}

export const MetaForm = (props: IProps) => {
  const { materials, categories, subcategories, editable } = props

  return (
    <Box className={classStyles().defaultBorder}>
      <ThemeProvider theme={disabledTheme}>
        <Typography variant='h6' align="left">Meta</Typography>
        <Grid container spacing={4}>
          <Grid item sm={3}>
            <FastField name="meta.dataset_name" label='Dataset Name' shouldUpdate={shouldComponentUpdate} disabled={!editable} component={MuiTextFieldFormik} />
          </Grid>
          <Grid item sm={3}>
            <FastField name="meta.data_type" label='Data Type' shouldUpdate={shouldComponentUpdate} disabled={!editable} component={MuiTextFieldFormik} />
          </Grid>
          <Grid item sm={3}>
            <Field name="meta.category" label='Category' shouldUpdate={shouldComponentUpdate} disabled={!editable} component={MuiSelectFormik} options={getOptions(categories)} />
          </Grid>
          <Grid item sm={3}>
            <Field name="meta.subcategory" label='Subcategory' shouldUpdate={shouldComponentUpdate} disabled={!editable} component={MuiSelectFormik} options={getOptions(subcategories)} />
          </Grid>
          <Grid item sm={12}>
            <FieldArray name='meta.material' >
              {({ form, ...fieldArrayHelpers }) => {
                return (<MaterialSelectChipArray
                  value={get(form.values, 'meta.material')}
                  fieldArrayHelpers={fieldArrayHelpers}
                  options={materials}
                  editable={editable}
                />)
              }}
            </FieldArray>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Box>
  )
}