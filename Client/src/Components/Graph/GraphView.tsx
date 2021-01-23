import { Box, Button, Grid, Modal, Paper } from "@material-ui/core"
import { IAxisStateModel, IDatasetRowModel, defaultDatasetRow } from "../../Models/Graph/IGraphStateModel"
import { IDatasetModel, IVariable } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel, IGraphPoint, newGraphDataset } from '../../Models/Graph/IGraphDatasetModel'
import React, { useState } from "react"

import { DatasetsList } from "./DatasetsList"
import { ExportDatasetsButton } from "./ExportDatasetsButton"
import Graph from './Graph'
import SearchView from '../Search/SearchView'
import { classStyles } from "../../appTheme"

export default function GraphView() {

  const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])
  const [graphDatasets, setGraphDatasets] = useState<IGraphDatasetModel[]>([])

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

  const toGraphDataset = (dataset: IDatasetModel): IGraphDatasetModel => {
    const graphDataset: IGraphDatasetModel = {
      id: dataset.id,
      name: dataset.dataset_name,
      points: buildXYPoints(dataset, xVariableName, yVariableName),
      color: null,
      shape: null,
      isHidden: false
    }

    return graphDataset
  }

  const buildXYPoints = (dataset: IDatasetModel, xVariableName: string, yVariableName: string): IGraphPoint[] => {
    const xIndex = getVariableIndex(dataset.data.variables, xVariableName)
    const yIndex = getVariableIndex(dataset.data.variables, yVariableName)
    //if either is -1 means at least one variable is not on the dataset and cannot be graphed
    if (xIndex === -1 || yIndex === -1) {
      return []
    }
    const points: IGraphPoint[] = []
    for (let i = 0; i < dataset.data.contents.length; i++) {
      const x: number = dataset.data.contents[i].point[xIndex]
      const y: number = dataset.data.contents[i].point[yIndex]
      const point: IGraphPoint = { x: x, y: y }
      points.push(point)
    }
    return points
  }

  const getVariableIndex = (variables: IVariable[], varName: string): number => {
    return variables.findIndex(variable => variable.name === varName)
  }

  const onRemoveDataset = (datasetId: number) => {
    const filteredDatasets = completeDatasets.filter(dataset => dataset.id !== datasetId)
    setCompleteDatasets(filteredDatasets)
    updateGraphDatasets(filteredDatasets, graphDatasets)
  }

  const onHideDatasetSwitch = (datasetId: number) => {
    const graphDatasetsCopy = [...graphDatasets]
    const indexToHide = graphDatasets.findIndex(dataset => dataset.id = datasetId)
    graphDatasetsCopy[indexToHide].isHidden = !graphDatasetsCopy[indexToHide].isHidden
    setGraphDatasets(graphDatasetsCopy)
  }

  const handleDatasetsSelected = (selectedDatasets: IDatasetModel[]) => {
    const notYetSelectedDatasets: IDatasetModel[] = selectedDatasets.filter(selectedDataset => !isInStateAlready(selectedDataset))

    const mergedDatasets: IDatasetModel[] = [...completeDatasets]
    notYetSelectedDatasets.forEach(dataset => {
      mergedDatasets.push(dataset)
    })

    setCompleteDatasets(mergedDatasets)
    updateGraphDatasets(mergedDatasets, graphDatasets)
    setIsSearchModalOpen(false)
  }

  const updateGraphDatasets = (completeDatasets: IDatasetModel[], graphDatasets: IGraphDatasetModel[]) => {
    const updatedGraphDatasets = []
    completeDatasets.forEach(completeDataset => {
      const existingGraphDatasetId = graphDatasets.findIndex(dataset => dataset.id == completeDataset.id)
      let updatedGraphDataset: IGraphDatasetModel = {} as any
      if (existingGraphDatasetId == -1) {
        updatedGraphDataset = { ...newGraphDataset }
        updatedGraphDataset.id = completeDataset.id
        updatedGraphDataset.name = completeDataset.dataset_name
        updatedGraphDataset.points = buildXYPoints(completeDataset, xVariableName, yVariableName)
      } else {
        updatedGraphDataset = { ...graphDatasets[existingGraphDatasetId] }
      }
      updatedGraphDatasets.push(updatedGraphDataset)
    });
    setGraphDatasets(updatedGraphDatasets)
  }

  const isInStateAlready = (dataset: IDatasetModel) => {
    return completeDatasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
  }

  const toDatasetRows = (datasets: IDatasetModel[]): IDatasetRowModel[] => {
    return datasets.map(dataset => {
      return { ...defaultDatasetRow, id: dataset.id, name: dataset.dataset_name }
    })
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
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}