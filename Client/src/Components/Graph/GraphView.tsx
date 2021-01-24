import { Box, Button, Grid, Modal, Paper } from "@material-ui/core"
import { IAxisStateModel, IGraphStateModel } from "../../Models/Graph/IGraphStateModel"
import React, { useState } from "react"
import { toDatasetRows, transformAndMergeGraphDatasets } from "./GraphFunctions"

import { DatasetsList } from "./DatasetsList"
import { ExportDatasetsButton } from "./ExportDatasetsButton"
import Graph from './Graph'
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel } from '../../Models/Graph/IGraphDatasetModel'
import { SaveGraphStateControl } from "./SaveGraphStateControl"
import SearchView from '../Search/SearchView'
import { classStyles } from "../../appTheme"

export default function GraphView() {

  const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])
  const [graphDatasets, setGraphDatasets] = useState<IGraphDatasetModel[]>([])
  const [graphState, setGraphState] = useState<IGraphStateModel>(null)

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)

  //todo unhardcode the variables
  //todo refactor into storing one IVariable[] instead of two separate strings
  const [xVariableName, setXVariableName] = useState('initial pressure')
  const [yVariableName, setYVariableName] = useState('cell width')

  //todo on page load, check if graphId was provided, and if it was, request graphId with user email, and obtain full graph saved state
  //todo after Leslie's story that allows to pick units and variable unhardcode units
  const [graphAxes, setGraphAxes] = useState<IAxisStateModel[]>([{
    logarithmic: false,
    units: 'mm',
    variableName: xVariableName,
    zoomStartIndex: null,
    zoomEndIndex: null,
  },
  {
    logarithmic: false,
    units: 'mm',
    variableName: yVariableName,
    zoomStartIndex: null,
    zoomEndIndex: null,
  }])

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
    setIsSearchModalOpen(false)
  }

  const handleCompleteDatasetsUpdated = (updatedDatasets: IDatasetModel[]) => {
    const mergedGraphDatasets = transformAndMergeGraphDatasets(updatedDatasets, graphDatasets, xVariableName, yVariableName)
    setCompleteDatasets(updatedDatasets)
    setGraphDatasets(mergedGraphDatasets)
  }

  const isInStateAlready = (dataset: IDatasetModel) => {
    return completeDatasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
  }

  return (
    <>
      <Modal
        open={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        className={classStyles().modalsearch}
      >
        <Paper elevation={3}>
          <Box m={5}>
            <SearchView
              handleDatasetsSelected={handleDatasetsSelected}
            />
          </Box>
        </Paper>
      </Modal>
      <Box ml={8}>
        <Grid container spacing={3}>
          <Grid item container sm={7} >
            {graphDatasets && graphDatasets[0] ?
              <Graph
                datasets={graphDatasets}
                initialAxes={graphAxes}
              /> : null}
          </Grid>
          <Grid item sm={5}>
            <Box ml={5} mr={5} mt={5}>
              <Grid container direction='column'>
                <Grid item container spacing={3}>
                  <Grid item>
                    <Button id="add-dataset" onClick={() => setIsSearchModalOpen(true)} color="primary" variant="contained">Add dataset To Graph</Button>
                  </Grid>
                  {completeDatasets && completeDatasets[0] ?
                    <Grid item>
                      <ExportDatasetsButton datasets={completeDatasets} />
                    </Grid> : null
                  }
                </Grid>
              </Grid>
              <Grid item>
                <DatasetsList
                  datasets={toDatasetRows(completeDatasets)}
                  onRemoveDatasetClick={onRemoveDataset}
                  onHideDatasetSwitch={onHideDatasetSwitch}
                />
              </Grid>
              <Grid item>
                <SaveGraphStateControl
                  graphState={graphState}
                />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}