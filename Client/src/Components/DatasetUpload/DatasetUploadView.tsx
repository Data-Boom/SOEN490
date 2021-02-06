import { Box, Container } from '@material-ui/core'
import { IDatasetModel, defaultDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { callGetDatasets, callSaveDataset } from '../../Remote/Endpoints/DatasetEndpoint'

import { DatasetUploadForm } from './DatasetUploadForm'
import React from 'react'
import { useEffect } from 'react'
import { useLocation } from "react-router-dom"

interface IProps {
  initialDataset?: IDatasetModel,
  datasetID?: number
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
  }

  return dataset
}

export const DatasetUploadView = (props: IProps) => {
  const location = useLocation()
  const initialSentDataset = location.state as IDatasetModel
  let initialValues = props.initialDataset || initialSentDataset || defaultDatasetModel
  initialValues = fixPartialForform(initialValues)
  const datasetID = props.datasetID

  useEffect(() => {
    const getDatasetInfo = async (id: number) => {
      const datasetArray = await callGetDatasets({ datasetId: [id] })
      const dataset = datasetArray[0]
      initialValues = fixPartialForform(dataset)
    }

    if (datasetID) {
      getDatasetInfo(datasetID)
    }
  }, [])

  const handleSubmitForm = async (formDataset: IDatasetModel) => {
    await callSaveDataset(formDataset)
  }


  return (
    <Container>
      <Box pt={4} pb={4}>
        <DatasetUploadForm
          onSubmit={handleSubmitForm}
          editable={ }
          buttonName="Save Dataset"
          initialDataset={initialValues}
        />
      </Box>
    </Container>
  )
}