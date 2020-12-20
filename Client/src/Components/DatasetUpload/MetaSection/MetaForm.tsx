import { Grid, TextField, Typography } from '@material-ui/core'
import { IDatasetModel, IMaterial } from '../../../Models/Datasets/IDatasetModel'

import { MaterialSelectChipArray } from './MaterialSelectChipArray'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { getErrorAndFormikProps } from '../../../Util/FormUtil'
import { useFormik } from 'formik'

interface IProps {
  // eslint-disable-next-line no-undef
  meta: Omit<IDatasetModel, 'reference' | 'data'>,
  materials: IMaterial[],
  handleMetaChange: (event) => void
}

export const MetaForm = (props: IProps) => {

  const { meta, materials, handleMetaChange } = props

  const formik = useFormik({
    initialValues: { ...meta },
    onSubmit: values => {
      handleMetaChange({ ...values })
    },
  })

  //since materials is a custom input, it needs a custom on change
  const handleMaterialChange = (newMaterials: IMaterial[]) => {
    formik.setFieldValue('material', newMaterials)
    formik.handleSubmit()
  }

  React.useEffect(() => {
    handleMetaChange({ ...formik.values })
  }, [formik.values])

  return (
    // we submit on blur so that the parent's state is only updated when the user is not directly interacting with the form
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
            selectedMaterials={meta.material}
            label={"Material"}
            options={materials}
            onChange={handleMaterialChange}
          />
        </Grid>
      </Grid>
    </div>
  )
}