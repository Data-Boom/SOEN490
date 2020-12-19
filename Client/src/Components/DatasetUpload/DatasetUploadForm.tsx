import { Button, Typography } from '@material-ui/core'
import { IData, IDatasetModel, IMaterial, IReference, exampleExportDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React, { useState } from 'react'

import { DataForm } from './DataSection/DataForm'
import { MetaForm } from './MetaSection/MetaForm'
import { ReferenceForm } from './ReferenceSection/ReferenceForm'

interface IProps {
  materials: IMaterial[],
  handleSubmit(formDataset: IDatasetModel): void
}

export const DatasetUploadForm = (props: IProps): any => {

  const { materials, handleSubmit } = props

  //todo revert to use defaultDatasetModel instead of example datasetModel
  // eslint-disable-next-line no-undef
  const [meta, setMeta] = useState<Omit<IDatasetModel, 'reference' | 'data'>>(exampleExportDatasetModel)
  const [reference, setReference] = useState<IReference>(exampleExportDatasetModel.reference)
  const [data, setData] = useState<IData>(exampleExportDatasetModel.data)

  const handleSubmitDataset = () => {
    handleSubmit({ ...meta, reference, data })
  }

  //todo slow as fuck, fix render issues

  return (
    <>
      <Typography variant='h4' align="left">New Dataset</Typography>

      <MetaForm meta={meta} handleMetaChange={setMeta} materials={materials} />
      <ReferenceForm reference={reference} onReferenceChange={setReference} />
      <DataForm data={data} onDataChanged={setData}></DataForm>

      <Button variant="contained" color="primary" onClick={handleSubmitDataset}> Submit Dataset </Button>
    </>
  )
}