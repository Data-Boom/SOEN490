import * as svg from 'save-svg-as-png'

import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, Typography, makeStyles } from "@material-ui/core"
import { IDatasetModel, IVariable } from "../../Models/Datasets/IDatasetModel"
import { IGraphDatasetModel, IGraphPoint } from '../../Models/Datasets/IGraphDatasetModel'
import React, { useState } from "react"
import { borders, sizing } from '@material-ui/system';

import CancelIcon from '@material-ui/icons/Cancel';
import { DatasetsList } from "./DatasetsList"
import Graph from './Graph'
import { IDataPointExtremes } from "../../Models/Graph/IDataPointExtremes"
import { IVariableUnits } from '../../Models/Datasets/IVariableModel'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import SearchView from '../Search/SearchView'
import { classStyles } from "../../appTheme"
import { exampleDataset } from "../../Models/Datasets/ITemporaryModel"
import { exampleExportDatasetModel } from '../../Models/Datasets/IDatasetModel'

//todo this is poorly hardcoded, we need to let user set their own colors, as well as support more than just 4 colors.
const defaultColors: string[] = ['#3632ff', '#f20b34', '#7af684', '#000000']

export default function GraphView() {
  const useStyles = makeStyles(() => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }))

  const classes = useStyles()

  //sample datasets to try, just needs to gather from the backend instead.
  //Datalist is the list fed to the graphCreation
  const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])
  const [openModal, setOpenModal] = useState(false)
  //todo unhardcode the variables
  const [showSettings, setSettingsToggle] = useState(false)
  const [xVariableName, setXVariableName] = useState('initial pressure')
  const [yVariableName, setYVariableName] = useState('cell width')
  const [xVariableUnits, setXVariableUnits] = useState('kPa')
  const [yVariableUnits, setYVariableUnits] = useState('mm')
  const [xVariableMissing, setXVariableMissing] = useState([])
  const [yVariableMissing, setYVariableMissing] = useState([])
  const [variables, setVariables] = useState([])
  const [xUnits, setXUnits] = useState([])
  const [yUnits, setYUnits] = useState([])

  const [datasetBoundaries, setDatasetBoundaries] = useState<IDataPointExtremes>(
    { minX: 0, maxX: 10, minY: 0, maxY: 10 }
  )
  const [sampleData, setSampleData] = useState(exampleDataset)
  const handleOpen = () => {
    setOpenModal(true)
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const handleSaveGraphImage = () => {
    svg.saveSvgAsPng(document.getElementById("graph"), "Databoom Graph.png", { backgroundColor: "#FFFFFF" })
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
    const filteredDataset = completeDatasets.filter(dataset => dataset.id !== datasetId)
    setCompleteDatasets(filteredDataset)
    handleVariablesSelected(filteredDataset)
    calculateExtremeBoundaries(filteredDataset)
    checkXVariablesExist(xVariableName, filteredDataset)
    checkYVariablesExist(yVariableName, filteredDataset)
    console.log(filteredDataset)
  }

  const handleDatasetsSelected = (selectedDatasets: IDatasetModel[]) => {
    const notYetSelectedDatasets: IDatasetModel[] = selectedDatasets.filter(selectedDataset => !isInStateAlready(selectedDataset))

    const mergedDatasets: IDatasetModel[] = [...completeDatasets]
    notYetSelectedDatasets.forEach(dataset => {
      mergedDatasets.push(dataset)
    })

    setCompleteDatasets(mergedDatasets)
    handleVariablesSelected(mergedDatasets)
    calculateExtremeBoundaries(mergedDatasets)
    handleClose()
  }

  const handleVariablesSelected = (selectedDatasets: IDatasetModel[]) => {
    const variableNames = []
    selectedDatasets.forEach(dataset => {
      dataset.data.variables.forEach(variable => {
        variableNames.push(variable.name)
      })
    })
    const uniqueVariables = Array.from(new Set(variableNames))
    setVariables(uniqueVariables)
    setXVariableName(uniqueVariables[0])
    setYVariableName(uniqueVariables[1])
    setUnitType('x', uniqueVariables[0])
    setUnitType('y', uniqueVariables[1])
  }

  const isInStateAlready = (dataset: IDatasetModel) => {
    return completeDatasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
  }

  const handleSettingsClick = () => {
    setSettingsToggle(!showSettings)
  }

  const calculateExtremeBoundaries = (datasets: IDatasetModel[]) => {
    let minX = 9000, maxX = 0, minY = 9000, maxY = 0

    const datalist: any[] = []
    //todo refactor graph else this breaks
    // datasets.forEach(dataset => datalist.push(dataset.points))
    datalist.forEach(dataset => {
      dataset.forEach(point => {
        if (point.x > maxX) {
          maxX = point.x
        }
        if (point.x < minX) {
          minX = point.x
        }
        if (point.y > maxY) {
          maxY = point.y
        }
        if (point.y < minY) {
          minY = point.y
        }
      })
    })
    const extremeBoundaries: IDataPointExtremes = { minX: minX, maxX: maxX, minY: minY, maxY: maxY }
    setDatasetBoundaries(extremeBoundaries)
  }

  const handleXVariableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (yVariableName == (event.target.value as string)) {
      const tempVariable = xVariableName
      setYVariableName(tempVariable)
      setUnitType('y', tempVariable)
      checkYVariablesExist(tempVariable, completeDatasets)
    }
    setXVariableName(event.target.value as string)
    setUnitType('x', event.target.value as string)
    checkXVariablesExist(event.target.value as string, completeDatasets)
  }
  const handleYVariableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (xVariableName == (event.target.value as string)) {
      const tempVariable = yVariableName
      setXVariableName(tempVariable)
      setUnitType('x', tempVariable)
      checkXVariablesExist(tempVariable, completeDatasets)
    }
    setYVariableName(event.target.value as string)
    setUnitType('y', event.target.value as string)
    checkYVariablesExist(event.target.value as string, completeDatasets)
  }
  const handleXUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setXVariableUnits(event.target.value as string)
  }
  const handleYUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setYVariableUnits(event.target.value as string)
  }

  const setUnitType = (variable: string, type: string) => {
    IVariableUnits.forEach(variables => {
      const units = variables.units
      variables.variableNames.forEach(name => {
        if (type == name) {
          if (variable == 'x') {
            setXUnits(units)
            setXVariableUnits(units[0])
          }
          else if (variable == 'y') {
            setYUnits(units)
            setYVariableUnits(units[0])
          }
        }
      })
    })
  }

  const checkXVariablesExist = (type: string, datsets: IDatasetModel[]) => {
    const missingDatasets = []
    datsets.forEach(dataset => {
      let exists = false
      dataset.data.variables.forEach(variableName => {
        if (variableName.name == type) {
          exists = true
        }
      })
      if (exists == false) {
        missingDatasets.push(dataset.dataset_name)
      }
    })
    setXVariableMissing(missingDatasets)
  }

  const checkYVariablesExist = (type: string, datsets: IDatasetModel[]) => {
    const missingDatasets = []
    datsets.forEach(dataset => {
      let exists = false
      dataset.data.variables.forEach(variableName => {
        if (variableName.name == type) {
          exists = true
        }
      })
      if (exists == false) {
        missingDatasets.push(dataset.dataset_name)
      }
    })
    setYVariableMissing(missingDatasets)
  }

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <h2>Graphs</h2>
      <Modal
        open={openModal}
        onClose={handleClose}
        className={classStyles().modalsearch}
      >
        <Box m={5} mb={10} width='100%'>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <Box m={0} p={2}>
                <CancelIcon color="primary" className={classStyles().closeButton} width="2%" onClick={handleClose} />
                <Grid container>
                  <SearchView
                    handleDatasetsSelected={handleDatasetsSelected}
                  />
                </Grid>
              </Box>
            </Paper>
          </Grid>
        </Box>
      </Modal>
      <Box ml={8} mr={8} maxWidth>
        <Grid container xs={12}>
          <Grid container xs={9}>
            <Box m={2} maxWidth mb={20} p={1} pb={10} overflow="hidden">
              <Paper elevation={3}>
                <Graph
                  outerHeight={450}
                  outerWidth={800}
                  datasets={completeDatasets.map((dataset, i) => toGraphDataset(dataset, defaultColors[i]))}
                  extremeBoundaries={datasetBoundaries}
                />
              </Paper>
            </Box>
          </Grid>
          <Grid container justify="flex-start" xs={3}>
            <Box ml={4} mt={2} maxWidth>
              <Grid item container justify="flex-start" spacing={3}>
                <Grid item>
                  <Button id="add-dataset" onClick={handleOpen} color="primary" variant="contained">Add dataset</Button>
                </Grid>
                <Grid item>
                  <Button id="export-json" onClick={handleExportJson} color="primary" variant="contained">Export as json</Button>
                </Grid>
                <Grid item>
                  <Button id="save-image" onClick={handleSaveGraphImage} color="primary" variant="contained">Save Graph Image</Button>
                </Grid>
              </Grid>
              <Grid item>
                <DatasetsList datasets={completeDatasets} onRemoveDatasetClick={onRemoveDataset} />
              </Grid>
            </Box>
            <Grid container direction='row'>
              <Grid item xs={12}>
                <Button id='settingsToggle' variant="contained" onClick={handleSettingsClick} color="primary">Settings
              {showSettings ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </Button>
              </Grid>
              {showSettings &&
                <>
                  <Grid item xs={4}>
                    <FormControl>
                      <InputLabel id="xVariable">X Variable</InputLabel>
                      <Select
                        labelId="xVariable"
                        id="xVariable"
                        value={xVariableName}
                        autoWidth={true}
                        onChange={handleXVariableChange}
                      >
                        {variables.map(type => (
                          <MenuItem value={type}>{type}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <InputLabel id="xUnits">X Units</InputLabel>
                      <Select
                        labelId="xUnits"
                        id="xUnits"
                        value={xVariableUnits}
                        autoWidth={true}
                        onChange={handleXUnitChange}
                      >
                        {xUnits.map(type => (
                          <MenuItem value={type}>{type}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography align="center">
                      Datasets Missing X: {xVariableMissing.toString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <InputLabel id="yVariable">Y Variable</InputLabel>
                      <Select
                        labelId="yVariable"
                        id="yVariable"
                        value={yVariableName}
                        autoWidth={true}
                        onChange={handleYVariableChange}
                      >
                        {variables.map(type => (
                          <MenuItem value={type}>{type}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <InputLabel id="yUnits">Y Units</InputLabel>
                      <Select
                        labelId="yUnits"
                        id="yUnits"
                        value={yVariableUnits}
                        autoWidth={true}
                        onChange={handleYUnitChange}
                      >
                        {yUnits.map(type => (
                          <MenuItem value={type}>{type}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography align="center">
                      Datasets Missing Y: {yVariableMissing.toString()}
                    </Typography>
                  </Grid>
                </>
              }
            </Grid>
          </Grid>
        </Grid>
      </Box >
    </>
  )
}