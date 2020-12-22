import * as Yup from 'yup'

import { Field, useFormik, useFormikContext } from 'formik'
import { Grid, TextField, Typography } from '@material-ui/core'
import { IDatasetMeta, IMaterial } from '../../../Models/Datasets/IDatasetModel'

import { MaterialSelectChipArray } from './MaterialSelectChipArray'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { getErrorAndFormikProps } from '../../../Util/FormUtil'

interface IProps {
  materials: IMaterial[],
}

export const MetaForm = (props: IProps) => {
  const { materials } = props

  const formik = useFormikContext()

  return (
    <div className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Meta</Typography>
      <Grid container spacing={4}>
        <Grid item sm={3}>
          <TextField fullWidth label="Dataset Name" variant="outlined" name={`${name}.dataset_name`} />
        </Grid>
        <Grid item sm={3}>
          <TextField fullWidth label="Data Type" variant="outlined" {...getErrorAndFormikProps(formik, 'data_type')} />
        </Grid>
        <Grid item sm={3}>
          <TextField fullWidth label="Category" variant="outlined" {...getErrorAndFormikProps(formik, 'category')} />
        </Grid>
        <Grid item sm={3}>
          <TextField fullWidth label="Subcategory" variant="outlined" {...getErrorAndFormikProps(formik, 'subcategory')} />
        </Grid>
        <Grid item sm={12}>
          {/* <MaterialSelectChipArray
            
            selectedMaterials={value.material}
            setFieldValue={formik.setFieldValue}
            options={materials}
          /> */}
        </Grid>
      </Grid>
    </div>
  )
}