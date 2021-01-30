import { Box, Container } from '@material-ui/core'
import { IDatasetModel, defaultDatasetModel } from '../../Models/Datasets/IDatasetModel'

import { DatasetUploadForm } from './DatasetUploadForm'
import React from 'react'
import { useLocation } from "react-router-dom"

interface IProps {
  initialDataset?: IDatasetModel
}

const fixPartialForform = (partialDataset: Partial<IDatasetModel>): IDatasetModel => {
  const dataset: IDatasetModel = {
    reference: partialDataset.reference || defaultDatasetModel.reference,
    dataset_name: partialDataset.dataset_name || defaultDatasetModel.dataset_name,
    material: partialDataset.material || defaultDatasetModel.material,
    category: partialDataset.category || defaultDatasetModel.category,
    subcategory: partialDataset.subcategory || defaultDatasetModel.subcategory,
    data_type: partialDataset.data_type || defaultDatasetModel.data_type,
    data: partialDataset.data || defaultDatasetModel.data,
    id: partialDataset.id || defaultDatasetModel.id,
    //authors: partialDataset.reference.authors || defaultDatasetModel.reference.authors
  }

  return dataset
}

export const DatasetUploadView = (props: IProps) => {
  const location = useLocation()
  //console.log(location.state)
  const initialSentDataset = location.state as IDatasetModel
  //console.log(typeof (initialSentDataset))
  let initialValues = props.initialDataset || initialSentDataset || defaultDatasetModel
  initialValues = fixPartialForform(initialValues)

  const handleSubmitForm = (formDataset: IDatasetModel) => {
    // todo: call backend to save dataset here
    console.log(formDataset, 'submitted dataset')
  }

  return (
    <Container>
      <Box pt={4} pb={4}>
        <DatasetUploadForm
          onSubmit={handleSubmitForm}
          initialDataset={initialValues}
        />
      </Box>
    </Container>
  )
}