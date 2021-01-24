import { Box, Grid } from "@material-ui/core"
import { IGraphDatasetModel, toGraphDatasetState } from '../../Models/Graph/IGraphDatasetModel'
import { IGraphStateModel, newGraphState } from "../../Models/Graph/IGraphStateModel"
import React, { useState } from "react"
import { toDatasetRows, transformAndMergeGraphDatasets } from "./GraphFunctions"

import { DatasetList } from "./DatasetList.tsx/DatasetList"
import { ExportDatasetsButton } from "./ExportDatasetsButton"
import Graph from './Graph'
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetState } from "../../Models/Graph/IGraphDatasetModel"
import { SaveGraphStateControl } from "./SaveGraphStateControl"
import { SearchViewModal } from "../Search/SearchViewModal"
import { callCreateGraphState } from "../../Remote/Endpoints/GraphStateEndpoint"
import { useParams } from "react-router"

export default function GraphView() {

  const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])
  const [graphDatasets, setGraphDatasets] = useState<IGraphDatasetModel[]>([])
  const [graphState, setGraphState] = useState<IGraphStateModel>({ ...newGraphState })

  const { graphStateId } = useParams()
  console.log(graphStateId)
  const onRemoveDataset = (datasetId: number) => {
    const filteredDatasets = completeDatasets.filter(dataset => dataset.id !== datasetId)
    handleCompleteDatasetsUpdated(filteredDatasets)
  }

  const onHideDatasetSwitch = (datasetId: number) => {
    const graphDatasetsCopy = [...graphDatasets]
    const indexToHide = graphDatasets.findIndex(dataset => dataset.id == datasetId)
    graphDatasetsCopy[indexToHide].isHidden = !graphDatasetsCopy[indexToHide].isHidden
    updateGraphDatasetsState(graphDatasetsCopy)
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
    const mergedGraphDatasets = transformAndMergeGraphDatasets(updatedDatasets, graphDatasets, graphState.axes[0].variableName, graphState.axes[1].variableName)
    setCompleteDatasets(updatedDatasets)
    updateGraphDatasetsState(mergedGraphDatasets)
  }

  const updateGraphDatasetsState = (graphDatasets: IGraphDatasetModel[]) => {
    setGraphDatasets(graphDatasets)
    const datasetStates: IGraphDatasetState[] = graphDatasets.map(graphedDataset => toGraphDatasetState(graphedDataset))
    setGraphState({ ...graphState, datasets: datasetStates })
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
    <>
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
                datasets={toDatasetRows(completeDatasets)}
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
      </Box>
    </>
  )
}