import * as Yup from 'yup'

import { Box, Grid, TextField, Typography } from '@material-ui/core'
import { FastField, Field, FieldArray, useFormik } from 'formik'
import { IDatasetMeta, IMaterial } from '../../../Models/Datasets/IDatasetModel'

import { MaterialSelectChipArray } from './MaterialSelectChipArray'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { get } from 'lodash';
import { getErrorAndFormikProps } from '../../../Util/FormUtil'

interface IProps {
  materials: IMaterial[],
}

export const MetaForm = (props: IProps) => {
  const { materials } = props

  return (
    <Box className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Meta</Typography>
      <Grid container spacing={4}>
        <Grid item sm={3}>
          <FastField name="dataset_name" label='Dataset Name' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={3}>
          <FastField name="data_type" label='Data Type' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={3}>
          <FastField name="category" label='Category' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={3}>
          <FastField name="subcategory" label='Subcategory' component={MuiTextFieldFormik} />
        </Grid>
        <Grid item sm={12}>
          <FieldArray name='meta.material' >
            {({ form, ...fieldArrayHelpers }) => {
              console.log(form.values);
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