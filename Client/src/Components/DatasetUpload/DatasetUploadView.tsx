import { Box, Container } from '@material-ui/core'
import { IDatasetModel, defaultDatasetModel } from '../../Models/Datasets/IDatasetModel'

import { DatasetUploadForm } from './DatasetUploadForm'
import { IDatasetRowModel } from '../../Models/Datasets/IDatasetRowModel'
import React from 'react'
import { toLocalDatasets } from "../../Models/Datasets/IRemoteDatasetModel"
import { useLocation } from "react-router-dom"

interface IProps {
  initialDataset?: IDatasetModel
}
export const DatasetUploadView = (props: IProps) => {
  const location = useLocation()
  console.log(location.state)
  const initialSentDataset = location.state
  console.log(typeof (initialSentDataset))
  const initialDataset = props.initialDataset || initialSentDataset || defaultDatasetModel

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