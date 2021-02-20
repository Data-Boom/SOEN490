import { Box, Button, Container, Grid } from '@material-ui/core'
import { IDatasetModel, defaultDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React, { useRef } from 'react'
import { callGetDatasets, callSaveDataset } from '../../Remote/Endpoints/DatasetEndpoint'

import { DatasetForm } from './DatasetUploadForm'
import { FormikValues } from 'formik'
import { useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { useParams } from "react-router"
import { useState } from 'react'

interface IProps {
  initialDataset?: IDatasetModel
}

interface IDatasetViewParams {
  datasetID: string
}

export const fixPartialForform = (partialDataset: Partial<IDatasetModel>): IDatasetModel => {
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

export const DatasetView = (props: IProps) => {
  const { datasetID } = useParams<IDatasetViewParams>()

  const formikReference = useRef<FormikValues>()

  const location = useLocation()
  const initialSentDataset = location.state as IDatasetModel
  const [initialValues, setInitialValues] = useState(props.initialDataset || initialSentDataset || defaultDatasetModel)
  const [editable, setEditable] = useState(true)

  useEffect(() => {
    const getDatasetInfo = async (id: number) => {
      const datasetArray = await callGetDatasets({ datasetId: [id] })
      const dataset = datasetArray[0]
      setInitialValues(fixPartialForform(dataset))
      setEditable(false)
      console.log(dataset)
    }

    if (datasetID) {
      getDatasetInfo(parseInt(datasetID))
    }
  }, [])

  const handleSubmitForm = async (formDataset: IDatasetModel) => {
    await callSaveDataset(formDataset)
  }

  return (
    <Container>
      <Box pt={4} pb={4}>
        <DatasetForm
          onSubmit={handleSubmitForm}
          editable={editable}
          initialDataset={initialValues}
          formikReference={formikReference}
        />
        <Grid container spacing={3} justify="center">
          {props.initialDataset || initialSentDataset ?
            <Grid item>
              <Button id="form-submit" variant="outlined" color="primary" onClick={() => formikReference.current.resetForm()}>
                Cancel
              </Button>
            </Grid> : null}
          <Grid item>
            <Button id="form-submit" variant="contained" color="primary" onClick={() => formikReference.current.handleSubmit()}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}