import { Box, Container } from '@material-ui/core'
import { IDatasetModel, IMaterial, defaultDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React, { useEffect, useState } from 'react'

import { DatasetUploadForm } from './DatasetUploadForm'

interface IProps {
  initialDataset?: IDatasetModel
}
export const DatasetUploadView = (props: IProps) => {

  const initialDataset = props.initialDataset || defaultDatasetModel

  const [materials, setMaterials] = useState<IMaterial[]>([])
  //todo implement materials endpoint
  useEffect(() => setMaterials([
    {
      "composition": "C",
      "details": "carbon, graphite, pressed graphite",
      "id": 0
    },
    {
      "composition": "O2",
      "details": "Oxygen",
      "id": 1
    }
  ]), [])

  const handleSubmitForm = (formDataset: IDatasetModel) => {
    // todo: call backend to save dataset here
    console.log(JSON.stringify(formDataset, null, 4))
  }

  return (
    <Container>
      <Box pt={4} pb={4}>
        <DatasetUploadForm
          materials={materials}
          onSubmit={handleSubmitForm}
          initialDataset={initialDataset}
        />
      </Box>
    </Container>
  )
}