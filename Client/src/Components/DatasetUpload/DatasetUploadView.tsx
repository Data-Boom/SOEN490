import { Box, Container } from '@material-ui/core'
import { IDatasetModel, IMaterial } from '../../Models/Datasets/IDatasetModel'
import React, { useEffect, useState } from 'react'

import { DatasetUploadForm } from './DatasetUploadForm'

const FileUploadView = () => {

  const [materials, setMaterials] = useState<IMaterial[]>([])
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
      <Box pt={4}>
        <DatasetUploadForm
          materials={materials}
          handleSubmit={handleSubmitForm}
        />
      </Box>
    </Container>
  )
}

export default FileUploadView
