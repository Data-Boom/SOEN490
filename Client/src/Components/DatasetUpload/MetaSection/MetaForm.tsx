import { Box, Grid, Typography } from '@material-ui/core'
import { FastField, Field, FieldArray } from 'formik'
import { MuiSelectFormik, MuiTextFieldFormik } from '../../Forms/FormikFields'

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
  return (
    <>
      <option aria-label="None" value="" />
      {options.map(option => <option key={option.id} value={option.id}> {option.name} </option>)}
    </>
  )
}

export const MetaForm = (props: IProps) => {
  const { materials, categories, subcategories } = props

  return (
    <Box className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Meta</Typography>
      <Grid container spacing={4}>
        <Grid item sm={3}>
          <FastField name="meta.dataset_name" label='Dataset Name' disabled={!props.editable} component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={3}>
          <FastField name="meta.data_type" label='Data Type' disabled={!props.editable} component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={3}>
          <Field name="meta.category" label='Category' component={MuiSelectFormik} options={getOptions(categories)} />
        </Grid>
        <Grid item sm={3}>
          <Field name="meta.subcategory" label='Subcategory' component={MuiSelectFormik} options={getOptions(subcategories)} />
        </Grid>
        <Grid item sm={12}>
          <FieldArray name='meta.material' >
            {({ form, ...fieldArrayHelpers }) => {
              return (<MaterialSelectChipArray
                value={get(form.values, 'meta.material')}
                fieldArrayHelpers={fieldArrayHelpers}
                options={materials}
              />)
            }}
          </FieldArray>
        </Grid>
      </Grid>
    </Box>
  )
}