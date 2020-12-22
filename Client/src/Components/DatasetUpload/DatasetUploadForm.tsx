import { Button, Typography } from '@material-ui/core'
import { IData, IDatasetMeta, IDatasetModel, IMaterial, IReference } from '../../Models/Datasets/IDatasetModel'

import { DataForm } from './DataSection/DataForm'
import { MetaForm } from './MetaSection/MetaForm'
import React from 'react'
import { ReferenceForm } from './ReferenceSection/ReferenceForm'
import { getErrorAndFormikProps } from '../../Util/FormUtil'
import { useFormik } from 'formik'

interface IProps {
  materials: IMaterial[],
  initialDataset: IDatasetModel,
  onSubmit(formDataset: IDatasetModel): void
}

export const DatasetUploadForm = (props: IProps): any => {

  const { materials, initialDataset, onSubmit } = props

  const meta: IDatasetMeta = initialDataset
  const reference: IReference = initialDataset.reference
  const data: IData = initialDataset.data

  const formik = useFormik({
    initialValues: { meta, reference, data },
    onSubmit: values => {
      let dataset: IDatasetModel = { ...values.meta, reference: values.reference, data: values.data }
      onSubmit(dataset)
    },
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Typography variant='h4' align="left">New Dataset</Typography>

        <MetaForm setFieldValue={formik.setFieldValue} {...getErrorAndFormikProps(formik, 'meta')} materials={materials} />
        <ReferenceForm setFieldValue={formik.setFieldValue} {...getErrorAndFormikProps(formik, 'reference')} />
        <DataForm setFieldValue={formik.setFieldValue} {...getErrorAndFormikProps(formik, 'data')}></DataForm>

        <Button variant="contained" color="primary" type="submit"> Save Dataset </Button>
      </form>
    </>
  )
}