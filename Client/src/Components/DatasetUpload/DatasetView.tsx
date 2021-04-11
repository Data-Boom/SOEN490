import { Box, Button, Container, Grid } from '@material-ui/core'
import { IDatasetModel, newDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React, { useRef } from 'react'
import { callGetDatasets, callSaveDataset, submitEditedDataset } from '../../Remote/Endpoints/DatasetEndpoint'
import { useHistory, useParams } from "react-router"

import { DatasetForm } from './DatasetForm/DatasetForm'
import { DefaultFormFooter } from '../Forms/DefaultFormFooter'
import { FavoriteDatasetButton } from './FavoriteDatasetButton'
import { FileTypePromptModal } from './FileTypePromptModal'
import { FileUploadModal } from './FileUploadModal'
import { FormikProps } from 'formik'
import GetAppIcon from "@material-ui/icons/GetApp"
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel'
import PublishIcon from "@material-ui/icons/Publish"
import SnackbarUtils from '../Utils/SnackbarUtils'
import TimelineIcon from "@material-ui/icons/Timeline"
import { loadDimensionsThunk } from '../../Stores/Slices/DimensionsSlice'
import { loadVariablesThunk } from '../../Stores/Slices/VariablesSlice'
import { useDispatchOnLoad } from '../../Common/Hooks/useDispatchOnLoad'
import { useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { useState } from 'react'
import { useTitle } from '../../Common/Hooks/useTitle'
import { DownloadFileTypeModal } from './DownloadFileTypeModal'
import { useUserSelector } from '../../Stores/Slices/UserSlice'

interface IProps {
  initialDataset?: IDatasetModel
}

interface IDatasetViewParams {
  datasetID: string
}


const jsonType = 'application/json'
const csvType = '.csv, .txt'

export const DatasetView = (props: IProps) => {
  useTitle("Dataset Upload")
  useDispatchOnLoad(loadDimensionsThunk)
  useDispatchOnLoad(loadVariablesThunk)
  const { initialDataset } = { ...props }
  const { datasetID } = useParams<IDatasetViewParams>()
  const location = useLocation()


  const formikReference = useRef<FormikProps<unknown>>()
  const [initialValues, setInitialValues] = useState({ ...newDatasetModel, ...initialDataset, ...(location.state as IDatasetModel) })
  const [editable, setEditable] = useState(true)

  const [fileTypePromptOpen, setFileTypePromptOpen] = useState(false)
  const [fileUploadOpen, setFileUploadModalOpen] = useState(false)
  const [acceptedFileType, setAcceptedFileType] = useState(jsonType)
  const [dlFileTypeOpen, setDLFileTypeOpen] = useState(false)


  const user = useUserSelector()

  const history = useHistory();

  useEffect(() => {
    setInitialValues({ ...newDatasetModel, ...(location.state as IDatasetModel) })
    setFileUploadModalOpen(false)
    setFileTypePromptOpen(false)
    setDLFileTypeOpen(false)
  }, [location.state])

  useEffect(() => {
    const getDatasetInfo = async (id: number) => {
      const datasetArray = await callGetDatasets({ datasetId: [id] })
      const dataset = datasetArray[0]
      setInitialValues({ ...newDatasetModel, ...dataset })
      setEditable(false)
    }

    if (Number(datasetID)) {
      getDatasetInfo(parseInt(datasetID))
    }
  }, [])

  const handleSubmitForm = async (formDataset: IDatasetModel) => {
    if (user.account_permissions == 2) {
      const newApprovalDatset: IApprovedDatasetModel = { ...formDataset, datasetFlaggedComment: null, datasetIsFlagged: null }
      await submitEditedDataset(newApprovalDatset)
      SnackbarUtils.success("Dataset successfully uploaded")
      history.push('/dataset/' + newApprovalDatset.id)
    } else {
      const result = await callSaveDataset(formDataset)
      if (result > 0) {
        SnackbarUtils.success("Dataset successfully uploaded")
        history.push('/dataset/' + result)
      }
    }
  }

  const handleJSONFileTypeSelected = () => {
    setFileUploadModalOpen(true)
    setAcceptedFileType(jsonType)
  }

  const handleCSVTXTFileTypeSelected = () => {
    setFileUploadModalOpen(true)
    setAcceptedFileType(csvType)
  }

  const handleEditable = () => {
    setEditable(!editable)
  }

  const checkForSuperUser = () => {
    if (user.account_permissions == 2)
      return (
        <Grid item>
          <Button variant="contained" color="primary" onClick={() => handleEditable()}>Edit</Button>
        </Grid>
      )
    else
      return null
  }

  const renderTopButtons = (): any => {
    return (
      <>
        <Grid container spacing={2} justify='flex-end' alignItems="center">
          {initialValues.id
            ? <>
              <Grid item>
                <FavoriteDatasetButton datasetId={initialValues.id} />
              </Grid>
              <Grid item>
                <Button id="download" onClick={() => setDLFileTypeOpen(true)} color="primary" variant="contained"> Download </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" startIcon={<TimelineIcon />}>Graph</Button>
              </Grid>
              {checkForSuperUser()}
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
        onClose={() => setFileUploadModalOpen(false)}
      />
      <DownloadFileTypeModal
        open={dlFileTypeOpen}
        dataset={initialValues}
        onClose={() => setDLFileTypeOpen(false)}
      />
    </>
  )
}