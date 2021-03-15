import { Box, Container } from '@material-ui/core'
import { IDatasetModel, newDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React, { useRef } from 'react'
import { callGetDatasets, callSaveDataset } from '../../Remote/Endpoints/DatasetEndpoint'

import { DatasetForm } from './DatasetForm'
import { DefaultFormFooter } from '../Forms/DefaultFormFooter'
import { FormikProps } from 'formik'
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

export const DatasetView = (props: IProps) => {
  const { datasetID } = useParams<IDatasetViewParams>()
  const { initialDataset } = { ...props }
  const formikReference = useRef<FormikProps<unknown>>()

  const location = useLocation()

  const [initialValues, setInitialValues] = useState({ ...newDatasetModel, ...initialDataset, ...(location.state as IDatasetModel) })
  const [editable, setEditable] = useState(true)

  useEffect(() => {
    const getDatasetInfo = async (id: number) => {
      const datasetArray = await callGetDatasets({ datasetId: [id] })
      const dataset = datasetArray[0]
      setInitialValues({ ...newDatasetModel, ...dataset })
      setEditable(false)
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
        <DefaultFormFooter formikReference={formikReference} />
      </Box>
    </Container>
  )
}