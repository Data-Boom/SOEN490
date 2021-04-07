import { Box, Button, Container, Grid } from '@material-ui/core'
import { IDatasetModel, newDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { IGraphDatasetState, newGraphDataset, newGraphDatasetState } from '../../Models/Graph/IGraphDatasetModel'
import { IGraphStateModel, newGraphState } from '../../Models/Graph/IGraphStateModel'
import React, { useRef } from 'react'
import { callGetDatasets, callSaveDataset } from '../../Remote/Endpoints/DatasetEndpoint'
import { useHistory, useParams } from "react-router"

import { DatasetControl } from '../Graph/GraphControls/DatasetControl'
import { DatasetForm } from './DatasetForm/DatasetForm'
import { DefaultFormFooter } from '../Forms/DefaultFormFooter'
import { FavoriteDatasetButton } from './FavoriteDatasetButton'
import { FileTypePromptModal } from './FileTypePromptModal'
import { FileUploadModal } from './FileUploadModal'
import { FormikProps } from 'formik'
import GetAppIcon from "@material-ui/icons/GetApp"
import { GraphStateControl } from '../Graph/GraphControls/GraphStateControl'
import { GraphView } from '../Graph/GraphView'
import { IDimensionModel } from '../../Models/Dimensions/IDimensionModel'
import PublishIcon from "@material-ui/icons/Publish"
import { SaveGraphStateForm } from '../Graph/GraphControls/SaveGraphStateForm'
import SnackbarUtils from '../Utils/SnackbarUtils'
import TimelineIcon from "@material-ui/icons/Timeline"
import { callCreateGraphState } from '../../Remote/Endpoints/GraphStateEndpoint'
import { callGetAllDimensions } from '../../Remote/Endpoints/DimensionsEndpoint'
import { getGraphDatasets } from '../../Common/Helpers/GraphHelpers'
import { loadDimensionsThunk } from '../../Stores/Slices/DimensionsSlice'
import { loadVariablesThunk } from '../../Stores/Slices/VariablesSlice'
import { useDispatchOnLoad } from '../../Common/Hooks/useDispatchOnLoad'
import { useEffect } from 'react'
import { useLocation } from "react-router-dom"
import { useState } from 'react'
import { useTitle } from '../../Common/Hooks/useTitle'

interface IProps {
  initialDataset?: IDatasetModel,
  onCompleteDatasetsChange: (completeDatasets: IDatasetModel[]) => void,
  graphState: IGraphStateModel,
  onGraphStateChange: (graphState: IGraphStateModel, completeDatasets: IDatasetModel[], dimensions: IDimensionModel[]) => void,

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
  const { initialDataset, onCompleteDatasetsChange, graphState, onGraphStateChange } = { ...props }
  const { datasetID } = useParams<IDatasetViewParams>()
  const location = useLocation()

  //const { graphStateId } = useParams<IGraphViewParams>()

  const formikReference = useRef<FormikProps<unknown>>()
  const [initialValues, setInitialValues] = useState({ ...newDatasetModel, ...initialDataset, ...(location.state as IDatasetModel) })
  const [editable, setEditable] = useState(true)

  const [fileTypePromptOpen, setFileTypePromptOpen] = useState(false)
  const [fileUploadOpen, setFileUploadModalOpen] = useState(false)
  const [acceptedFileType, setAcceptedFileType] = useState(jsonType)

  const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])


  //const [graphState, setGraphState] = useState<IGraphStateModel>({ ...newGraphState, id: graphStateId })

  const history = useHistory();

  useEffect(() => {
    setInitialValues({ ...newDatasetModel, ...(location.state as IDatasetModel) })
    setFileUploadModalOpen(false)
    setFileTypePromptOpen(false)
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
    const result = await callSaveDataset(formDataset)
    if (result > 0) {
      SnackbarUtils.success("Dataset successfully uploaded")
      history.push('/dataset/' + result)
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

  const onCompleteDatasetsChange2 = (dataset: IDatasetModel[]) => {
    //const tempDatasetArray: IDatasetModel[] = [dataset]
    return dataset
  }

  const getUpdatedGraphState = (datasets: IDatasetModel[]): IGraphStateModel => {
    const graphDatasetStates = []
    //todo ensure all new datasets are in the state
    datasets.forEach(dataset => {
      const graphDatasetIndex = graphState.datasets.findIndex(datasetState => datasetState.id == dataset.id)
      if (graphDatasetIndex == -1) {
        graphDatasetStates.push({ ...newGraphDatasetState, id: dataset.id })
      }
      else {
        graphDatasetStates.push({ ...graphState.datasets[graphDatasetIndex], id: dataset.id })
      }
    })
    return { ...graphState, datasets: graphDatasetStates }
  }

  const handleGraphDataset = async () => {
    if (datasetID) {
      const completeDatasets: IDatasetModel[] = [initialValues]
      console.log(initialValues)
      console.log(completeDatasets)

      const graphStateCopy = { ...graphState }
      graphStateCopy.name = initialValues.dataset_name
      graphStateCopy.id = datasetID
      const createdId: string = await callCreateGraphState(graphStateCopy)
      //const newGraphState = getUpdatedGraphState(completeDatasets)
      //console.log(newGraphState)
      history.push('/graph/' + createdId)
      // const dimensions = await callGetAllDimensions()
      // const graphDatasets = getGraphDatasets(completeDatasets, graphState, dimensions)
      // console.log(graphDatasets)
      //const graphStateCopy = { ...graphState }

      //graphStateCopy.id = datasetID
      // const createId: string = await callCreateGraphState(graphStateCopy)
      // history.push('/graph/' + createId)
      // return (
      //   <DatasetControl
      //     datasetStates={null}
      //     completeDatasets={null}
      //     onDatasetStatesChange={null}
      //     onCompleteDatasetsChange={onCompleteDatasetsChange}
      //   />
      // )
      //   //   // <SaveGraphStateForm

      //   //   // />
      //   <GraphView

      //   />
      // )
    }
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
                <Button variant="contained" color="primary" startIcon={<GetAppIcon />}>Download</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" onClick={() => handleGraphDataset()} startIcon={<TimelineIcon />}>Graph</Button>
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
        onClose={() => setFileUploadModalOpen(false)}
      />
    </>
  )
}