import { Box, Grid } from "@material-ui/core"
import { IGraphStateModel, newGraphState } from "../../Models/Graph/IGraphStateModel"
import React, { useState } from "react"
import { toDatasetRows, transformAndMergeGraphDatasets } from "./GraphFunctions"

import { DatasetList } from "./DatasetList.tsx/DatasetList"
import { ExportDatasetsButton } from "./ExportDatasetsButton"
import Graph from './Graph'
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel } from '../../Models/Graph/IGraphDatasetModel'
import { SaveGraphStateControl } from "./SaveGraphStateControl"
import { SearchViewModal } from "../Search/SearchViewModal"
import { callCreateGraphState } from "../../Remote/Endpoints/GraphStateEndpoint"

export default function GraphView() {

  const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])
  const [graphDatasets, setGraphDatasets] = useState<IGraphDatasetModel[]>([])
  //todo after Leslie's story that allows to pick units and variable unhardcode units
  const [graphState, setGraphState] = useState<IGraphStateModel>({ ...newGraphState })

  //todo on page load, check if graphId was provided, and if it was, request graphId with user email, and obtain full graph saved state
  const onRemoveDataset = (datasetId: number) => {
    const filteredDatasets = completeDatasets.filter(dataset => dataset.id !== datasetId)
    handleCompleteDatasetsUpdated(filteredDatasets)
  }

  const onHideDatasetSwitch = (datasetId: number) => {
    const graphDatasetsCopy = [...graphDatasets]
    const indexToHide = graphDatasets.findIndex(dataset => dataset.id == datasetId)
    graphDatasetsCopy[indexToHide].isHidden = !graphDatasetsCopy[indexToHide].isHidden
    setGraphDatasets(graphDatasetsCopy)
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