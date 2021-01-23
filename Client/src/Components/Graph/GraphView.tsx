import { Box, Button, Grid, Modal, Paper } from "@material-ui/core"
import { IDatasetModel, IVariable } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel, IGraphPoint } from '../../Models/Graph/IGraphDatasetModel'
import React, { useState } from "react"

import { DatasetsList } from "./DatasetsList"
import Graph from './Graph'
import { IGraphStateModel } from "../../Models/Graph/IGraphStateModel"
import SearchView from '../Search/SearchView'
import { classStyles } from "../../appTheme"
import { exampleExportDatasetModel } from '../../Models/Datasets/IDatasetModel'

//todo this is poorly hardcoded, we need to let user set their own colors, as well as support more than just 4 colors.
const defaultColors: string[] = ['#3632ff', '#f20b34', '#7af684', '#000000']

export default function GraphView() {

  const [datasets, setCompleteDatasets] = useState<IDatasetModel[]>([])
  const [openModal, setOpenModal] = useState(false)

  //todo unhardcode the variables
  const [xVariableName, setXVariableName] = useState('initial pressure')
  const [yVariableName, setYVariableName] = useState('cell width')
  const graphInitialState: IGraphStateModel = {
    axes: [{
      mode: 'linear',
      units: 'mm',
      variableName: xVariableName,
    }]
  }
  const handleOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleExportJson = () => {
    download("datasets.json", JSON.stringify(exampleExportDatasetModel, null, 4))
  }

  const toGraphDataset = (dataset: IDatasetModel, color: string): IGraphDatasetModel => {
    const graphDataset: IGraphDatasetModel = {
      color: color,
      id: dataset.id,
      name: dataset.dataset_name,
      points: buildXYPoints(dataset, xVariableName, yVariableName)
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

  //stolen from https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
  function download(filename: string, text: string) {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  const onRemoveDataset = (datasetId: number) => {
    const filteredDataset = datasets.filter(dataset => dataset.id !== datasetId)
    setCompleteDatasets(filteredDataset)
  }

  const handleDatasetsSelected = (selectedDatasets: IDatasetModel[]) => {
    const notYetSelectedDatasets: IDatasetModel[] = selectedDatasets.filter(selectedDataset => !isInStateAlready(selectedDataset))

    const mergedDatasets: IDatasetModel[] = [...datasets]
    notYetSelectedDatasets.forEach(dataset => {
      mergedDatasets.push(dataset)
    })

    setCompleteDatasets(mergedDatasets)
    handleClose()
  }

  const isInStateAlready = (dataset: IDatasetModel) => {
    return datasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <Modal
        open={openModal}
        onClose={handleClose}
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
            {
              datasets && datasets[0] ? <Graph
                datasets={datasets.map((dataset, i) => toGraphDataset(dataset, defaultColors[i]))}
                graphInitialState={graphInitialState}
              /> : null
            }
          </Grid>
          <Grid item sm={5}>
            <Box ml={5} mr={5} mt={5}>
              <Grid container direction='column'>
                <Grid item container spacing={3}>
                  <Grid item>
                    <Button id="add-dataset" onClick={handleOpen} color="primary" variant="contained">Add dataset To Graph</Button>
                  </Grid>
                  {datasets && datasets[0] ?
                    <Grid item>
                      <Button id="export-json" onClick={handleExportJson} color="primary" variant="contained">Export as json</Button>
                    </Grid> : null
                  }
                </Grid>
              </Grid>
              <Grid item>
                <DatasetsList datasets={datasets} onRemoveDatasetClick={onRemoveDataset} />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}