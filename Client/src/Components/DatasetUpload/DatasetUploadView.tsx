import { Box, Container } from '@material-ui/core'
import { IDatasetModel, defaultDatasetModel } from '../../Models/Datasets/IDatasetModel'

import { DatasetUploadForm } from './DatasetUploadForm'
import React from 'react'

interface IProps {
  initialDataset?: IDatasetModel
}
export const DatasetUploadView = (props: IProps) => {

  const initialDataset = props.initialDataset || defaultDatasetModel

  const handleSubmitForm = (formDataset: IDatasetModel) => {
    // todo: call backend to save dataset here
  }

  return (
    <Container>
      <Box pt={4} pb={4}>
        <DatasetUploadForm
          onSubmit={handleSubmitForm}
          initialDataset={initialDataset}
        />
      </Box>
    </Container>
  )
}