import { Button, Typography } from '@material-ui/core'
import { IData, IDatasetMeta, IDatasetModel, IMaterial, IReference, exampleExportDatasetModel } from '../../Models/Datasets/IDatasetModel'

import { MetaForm } from './MetaSection/MetaForm'
import React from 'react'
import { ReferenceForm } from './ReferenceSection/ReferenceForm'
import { getErrorAndFormikProps } from '../../Util/FormUtil'
import { useFormik } from 'formik'

interface IProps {
  materials: IMaterial[],
  handleSubmit(formDataset: IDatasetModel): void
}

export const DatasetUploadForm = (props: IProps): any => {

  const { materials, handleSubmit } = props

  //todo revert to use defaultDatasetModel instead of example datasetModel
  const meta: IDatasetMeta = exampleExportDatasetModel
  const reference: IReference = exampleExportDatasetModel.reference
  const data: IData = exampleExportDatasetModel.data

  const formik = useFormik({
    initialValues: { meta, reference, data },
    onSubmit: values => {
      let dataset: IDatasetModel = { ...values.meta, reference: values.reference, data: values.data }
      handleSubmit(dataset)
    },
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>

        <Typography variant='h4' align="left">New Dataset</Typography>

        <MetaForm setFieldValue={formik.setFieldValue} {...getErrorAndFormikProps(formik, 'meta')} materials={materials} />
        <ReferenceForm setFieldValue={formik.setFieldValue} {...getErrorAndFormikProps(formik, 'reference')} />
        {/* <DataForm data={data} onDataChanged={formik.setFieldValue}></DataForm> */}

        <Button variant="contained" color="primary" type="submit"> Submit Dataset </Button>
      </form>
    </>
  )
}