import { Box, Button, Container, Grid } from '@material-ui/core'
import { IDatasetModel, defaultDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React, { useRef } from 'react'
import { callGetDatasets, callSaveDataset } from '../../Remote/Endpoints/DatasetEndpoint'

import { DatasetForm } from './DatasetForm'
import { DefaultFormFooter } from '../Forms/DefaultFormFooter'
import { FileTypePromptModal } from './FileTypePromptModal'
import { FileUploadModal } from './FileUploadModal'
import { FormikProps } from 'formik'
import GetAppIcon from "@material-ui/icons/GetApp"
import PublishIcon from "@material-ui/icons/Publish"
import TimelineIcon from "@material-ui/icons/Timeline"
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

//todo im not sure this works at the end of the day need to find a better solution to some fields being undefined instead of default
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

const jsonType = 'application/json'
const csvType = '.csv, .txt'

export const DatasetView = (props: IProps) => {
  const { datasetID } = useParams<IDatasetViewParams>()
  const formikReference = useRef<FormikProps<unknown>>()

  const location = useLocation()
  const initialSentDataset = location.state as IDatasetModel
  const [initialValues, setInitialValues] = useState(props.initialDataset || initialSentDataset || defaultDatasetModel)
  const [editable, setEditable] = useState(true)

  const [fileTypePromptOpen, setFileTypePromptOpen] = useState(false)
  const [fileUploadOpen, setFileUploadOpen] = useState(false)
  const [acceptedFileType, setAcceptedFileType] = useState(jsonType)

  // const { initialDataset } = { ...props }
  //const [hideDLgraphButtons, setHideDLgraphButtons] = useState(false)

  useEffect(() => {
    const getDatasetInfo = async (id: number) => {
      const datasetArray = await callGetDatasets({ datasetId: [id] })
      const dataset = datasetArray[0]
      setInitialValues(fixPartialForform(dataset))
      setEditable(false)
    }

    if (datasetID) {
      getDatasetInfo(parseInt(datasetID))
    }
  }, [])

  const handleSubmitForm = async (formDataset: IDatasetModel) => {
    await callSaveDataset(formDataset)
  }

  const handleJSONFileTypeSelected = () => {
    setFileUploadOpen(true)
    setAcceptedFileType(jsonType)
  }

  const handleCSVTXTFileTypeSelected = () => {
    setFileUploadOpen(true)
    setAcceptedFileType(csvType)
  }

  // const buttonHideCheck = async () => {
  //   
  //   if (initialDataset.id) {
  //     setHideDLgraphButtons(false)
  //     return (
  //       <Grid item container sm={12} spacing={2} justify='flex-end'>
  //         <Grid item>
  //           <Button variant="contained" color="primary" startIcon={<GetAppIcon />}>Download</Button>
  //         </Grid>

  //         <Grid item>
  //           <Button variant="contained" color="primary" startIcon={<TimelineIcon />}>Graph</Button>
  //         </Grid>
  //       </Grid>
  //     )
  //   } else {
  //     setHideDLgraphButtons(true)
  //     return
  //   }
  // }
  const renderTopButtons = (): any => {
    return (
      <>
        <Grid container spacing={2} justify='flex-end'>
          {initialValues.id
            ? <>
              <Grid item>
                <Button variant="contained" color="primary" startIcon={<GetAppIcon />}>Download</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" startIcon={<TimelineIcon />}>Graph</Button>
              </Grid>
            </>
            : <Grid item>
              <Button variant="contained" color="primary" onClick={() => setFileTypePromptOpen(true)} startIcon={<PublishIcon />}>Upload Dataset</Button>
            </Grid>}
        </Grid>
      </>
    )
  }

  return (
    <>
      <Container>
        <Box pt={4} pb={4}>
          {renderTopButtons()}
          <DatasetForm
            onSubmit={handleSubmitForm}
            editable={editable}
            initialDataset={initialValues}
            formikReference={formikReference}
          />
          <DefaultFormFooter formikReference={formikReference} />
        </Box>
      </Container>
      <FileTypePromptModal
        open={fileTypePromptOpen}
        onClose={() => setFileTypePromptOpen(false)}
        onSubmitCT={handleCSVTXTFileTypeSelected}
        onSubmitJS={handleJSONFileTypeSelected}
      />
      <FileUploadModal
        open={fileUploadOpen}
        acceptedFileType={acceptedFileType}
        onClose={() => setFileUploadOpen(false)}
      />
    </>
  )
}