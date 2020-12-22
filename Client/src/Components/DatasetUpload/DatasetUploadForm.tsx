import { Button, Typography } from '@material-ui/core'
import { IData, IDatasetMeta, IDatasetModel, IMaterial, IReference } from '../../Models/Datasets/IDatasetModel'

import { Formik } from 'formik'
import React from 'react'

interface IProps {
  materials: IMaterial[],
  initialDataset: IDatasetModel,
  onSubmit(formDataset: IDatasetModel): void
}

interface DatasetUploadFormValues {
  meta: IDatasetMeta,
  reference: IReference,
  data: IData
}

export const DatasetUploadForm = (props: IProps): any => {

  const { materials, initialDataset, onSubmit } = props

  const meta: IDatasetMeta = initialDataset
  const reference: IReference = initialDataset.reference
  const data: IData = initialDataset.data

  const initialValues: DatasetUploadFormValues = { meta, reference, data }

  const handleSubmit = (values: DatasetUploadFormValues, actions: unknown) => {
    const dataset: IDatasetModel = { ...values.meta, reference: values.reference, data: values.data }
    onSubmit(dataset)
  }
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        <Typography variant='h4' align="left">New Dataset</Typography>

        {/* <MetaForm setFieldValue={formik.setFieldValue} {...getErrorAndFormikProps(formik, 'meta')} materials={materials} /> */}
        {/* <ReferenceForm setFieldValue={formik.setFieldValue} {...getErrorAndFormikProps(formik, 'reference')} />
            <DataForm setFieldValue={formik.setFieldValue} {...getErrorAndFormikProps(formik, 'data')}></DataForm> */}

        <Button variant="contained" color="primary" type="submit"> Save Dataset </Button>
      </Formik>
    </>
  )
}