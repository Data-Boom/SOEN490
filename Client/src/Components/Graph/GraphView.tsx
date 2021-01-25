import { Box, Grid } from "@material-ui/core"
import { IGraphStateModel, newGraphState } from "../../Models/Graph/IGraphStateModel"
import React, { useEffect, useState } from "react"
import { callCreateGraphState, callGetGraphState } from "../../Remote/Endpoints/GraphStateEndpoint"
import { toDatasetRows, getGraphDatasets } from "./GraphFunctions"

import { CustomLoader } from "../Utils/CustomLoader"
import { DatasetList } from "./DatasetList.tsx/DatasetList"
import { ExportDatasetsButton } from "./ExportDatasetsButton"
import Graph from './Graph'
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel } from '../../Models/Graph/IGraphDatasetModel'
import { SaveGraphStateControl } from "./SaveGraphStateControl"
import { SearchViewModal } from "../Search/SearchViewModal"
import { getDatasets } from "../../Remote/Endpoints/DatasetEndpoint"
import { useParams } from "react-router"

interface IGraphViewParams {
  graphStateId: string
}

export default function GraphView() {

  const [loadingDatasets, setIsLoadinDatasets] = useState(false)

  const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])
  const [graphDatasets, setGraphDatasets] = useState<IGraphDatasetModel[]>([])
  const [graphState, setGraphState] = useState<IGraphStateModel>({ ...newGraphState })
  const { graphStateId } = useParams<IGraphViewParams>()

  useEffect(() => {
    const getGraphState = async (id: number) => {
      setIsLoadinDatasets(true)

      const graphState = await callGetGraphState(id)
      setGraphState(graphState)

      const datasets = await getDatasets({ datasetId: graphState.datasets.map(dataset => dataset.id) })
      setCompleteDatasets(datasets)

      const mergedGraphDatasets = getGraphDatasets(datasets, graphState.datasets, graphState.axes[0].variableName, graphState.axes[1].variableName)
      setGraphDatasets(mergedGraphDatasets)
      console.log(mergedGraphDatasets)
      setIsLoadinDatasets(false)
    }

    if (graphStateId) {
      getGraphState(parseInt(graphStateId))
    }
  }, [])

  const onRemoveDataset = (datasetId: number) => {
    const filteredDatasets = gr.filter(dataset => dataset.id !== datasetId)
    handleCompleteDatasetsUpdated(filteredDatasets)
  }

  const onHideDatasetSwitch = (datasetId: number) => {
    const graphDatasetsCopy = [...graphDatasets]
    const indexToHide = graphDatasets.findIndex(dataset => dataset.id == datasetId)
    graphDatasetsCopy[indexToHide].isHidden = !graphDatasetsCopy[indexToHide].isHidden
    setGraphDatasets(graphDatasetsCopy)
  }

  const unzipGraphState = (graphState: IGraphStateModel) => {
    graphState.datasets.forEach(datasetState => {
      const graphDatasetIndex = graphDatasets.findIndex(graphDataset => datasetState.id == graphDataset.id)
      if graphDatasetIndex == 
    })
  }

  const addToGraphState = () => {

  }

  const removeFromGraphState = () => {

  }

  const editGraphState = () => {

  }

  const updateGraphStateAxes = () => {

  }

  const handleDatasetsSelected = (selectedDatasets: IDatasetModel[]) => {
    const notYetSelectedDatasets: IDatasetModel[] = selectedDatasets.filter(selectedDataset => !isInStateAlready(selectedDataset))

    const mergedDatasets: IDatasetModel[] = [...completeDatasets]
    notYetSelectedDatasets.forEach(dataset => {
      mergedDatasets.push(dataset)
    })

    handleCompleteDatasetsUpdated(mergedDatasets)
  }

  const handleCompleteDatasetsUpdated = (updatedDatasets: IDatasetModel[]) => {
    const mergedGraphDatasets = getGraphDatasets(updatedDatasets, graphDatasets, graphState.axes[0].variableName, graphState.axes[1].variableName)
    setGraphDatasets(mergedGraphDatasets)
  }

  const onGraphStateSaved = async (name: string) => {
    const graphStateCopy = { ...graphState }
    graphStateCopy.name = name
    const id: string = await callCreateGraphState(graphStateCopy)
    graphStateCopy.id = id
    setGraphState(graphStateCopy)
  }

  const isInStateAlready = (dataset: IDatasetModel) => {
    return completeDatasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
  }

  return (
    <>{loadingDatasets ? <CustomLoader
      visible={loadingDatasets}
    /> :
      <Box ml={8}>
        <Grid container spacing={3}>
          <Grid item container sm={7} >
            {graphDatasets && graphDatasets[0] ?
              <Graph
                datasets={graphDatasets}
                initialAxes={graphState.axes}
              /> : null}
          </Grid>
          <Grid item sm={5}>
            <Box ml={5} mr={5} mt={5}>
              <Grid container spacing={3}>
                <Grid item>
                  <SearchViewModal onDatasetsSelected={handleDatasetsSelected} />
                </Grid>
                {completeDatasets && completeDatasets[0] ?
                  <Grid item>
                    <ExportDatasetsButton datasets={completeDatasets} />
                  </Grid> : null
                }
              </Grid>
              <DatasetList
                datasets={toDatasetRows(completeDatasets, graphDatasets)}
                onRemoveDatasetClick={onRemoveDataset}
                onHideDatasetSwitch={onHideDatasetSwitch}
              />
              <Grid container>
                <Grid item>
                  <SaveGraphStateControl
                    onSaveClick={onGraphStateSaved}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>}
    </>
  )
}