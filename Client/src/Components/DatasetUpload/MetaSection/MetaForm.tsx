import * as Yup from 'yup'

import { Grid, TextField, Typography } from '@material-ui/core'
import { IDatasetMeta, IMaterial } from '../../../Models/Datasets/IDatasetModel'

import { MaterialSelectChipArray } from './MaterialSelectChipArray'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { getErrorAndFormikProps } from '../../../Util/FormUtil'
import { useFormik } from 'formik'

interface IProps {
  name: string,
  value: IDatasetMeta,
  setFieldValue: (fieldName: string, newReference: IDatasetMeta) => void,
  materials: IMaterial[],
}

export const MetaForm = (props: IProps) => {
  const { name, value, setFieldValue, materials } = props

  const formik = useFormik({
    initialValues: value,
    validationSchema: Yup.object().shape({
      dataset_name: Yup.string().required(),
      data_type: Yup.string().required(),
      category: Yup.string().required(),
      subcategory: Yup.string().required(),
      material: Yup.array().required().min(1)
    }),
    //this is subform and therefore its not submitting, but istead is propagating change up
    onSubmit: () => { }
  })

  //anytime the current reference changes we will call parent component about it
  React.useEffect(() => {
    setFieldValue(name, formik.values)
  }, [formik.values])

  return (
    <div className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Meta</Typography>
      <Grid container spacing={4}>
        <Grid item sm={3}>
          <TextField fullWidth label="Dataset Name" variant="outlined" {...getErrorAndFormikProps(formik, 'dataset_name')} />
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
          <MaterialSelectChipArray
            {...getErrorAndFormikProps(formik, 'material')}
            selectedMaterials={value.material}
            setFieldValue={formik.setFieldValue}
            options={materials}
          />
        </Grid>
      </Grid>
    </div>
  )
}