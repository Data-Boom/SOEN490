import { Button, Typography } from '@material-ui/core'
import { IData, IDatasetMeta, IDatasetModel, IMaterial, IReference, defaultDatasetModel } from '../../Models/Datasets/IDatasetModel'

import { DataForm } from './DataSection/DataForm'
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
  const meta: IDatasetMeta = defaultDatasetModel
  const reference: IReference = defaultDatasetModel.reference
  const data: IData = defaultDatasetModel.data

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
        <DataForm setFieldValue={formik.setFieldValue} {...getErrorAndFormikProps(formik, 'data')}></DataForm>

        <Button variant="contained" color="primary" type="submit"> Submit Dataset </Button>
      </form>
    </>
  )
}