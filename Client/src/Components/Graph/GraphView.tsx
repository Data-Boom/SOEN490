import * as svg from 'save-svg-as-png'

import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, makeStyles } from "@material-ui/core"
import { ICompleteDatasetEntity, IDataPoint, IDataPointExtremes } from "../../Models/Datasets/ICompleteDatasetEntity"
import React, { useState } from "react"

import { DatasetsList } from "./DatasetsList"
import Graph from './Graph'
import { IGraphDatasetModel } from '../../Models/Datasets/IGraphDatasetModel'
import SearchView from '../Search/SearchView'
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
    }
  }))

  const classes = useStyles()

  //Testing the query parser using quer-string for future use if needed
  //console.log(queryString.parse(useLocation().search))


  //sample datasets to try, just needs to gather from the backend instead.
  //Datalist is the list fed to the graphCreation
  const [completeDatasets, setCompleteDatasets] = useState<ICompleteDatasetEntity[]>([])
  const [openModal, setOpenModal] = useState(false)
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

  const toGraphDataset = (completeDataset: ICompleteDatasetEntity, color: string): IGraphDatasetModel => {
    const graphDataset: IGraphDatasetModel = {
      color: color,
      id: completeDataset.id,
      name: completeDataset.name,
      points: completeDataset.points
    }

    return graphDataset
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
    calculateExtremeBoundaries(filteredDataset)
  }

  const handleDatasetsSelected = (selectedDatasets: ICompleteDatasetEntity[]) => {
    const notYetSelectedDatasets: ICompleteDatasetEntity[] = selectedDatasets.filter(selectedDataset => !isInStateAlready(selectedDataset))

    const mergedDatasets: ICompleteDatasetEntity[] = [...completeDatasets]
    notYetSelectedDatasets.forEach(dataset => {
      mergedDatasets.push(dataset)
    })

    setCompleteDatasets(mergedDatasets)
    calculateExtremeBoundaries(mergedDatasets)
  }

  const isInStateAlready = (dataset: ICompleteDatasetEntity) => {
    return completeDatasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
  }

  const calculateExtremeBoundaries = (datasets: ICompleteDatasetEntity[]) => {
    let minX = 9000, maxX = 0, minY = 9000, maxY = 0

    const datalist: any[] = []
    datasets.forEach(dataset => datalist.push(dataset.points))
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

  const types = []

  exampleDataset.dataPoints.forEach(variable => {
    types.push(variable.type)
  })
  const uniqueTypes = Array.from(new Set(types))
  const [xVariable, setXVariable] = useState(types[0])
  const [yVariable, setYVariable] = useState(types[1])
  const [dataPoints, setDataPoints] = useState<IDataPoint[]>([])

  const assignDataPoints = (x: number[], y: number[]) => {
    const points: IDataPoint[] = []
    for (var i = 0; i < x.length; i++) {
      points.push({ x: x[i], y: y[i] })
    }
    setDataPoints(points)
    console.log(dataPoints)
  }

  const assignXandY = (xType: string, yType: string) => {
    let x, y = []
    exampleDataset.dataPoints.forEach(variable => {
      if (variable.type == xType) {
        x = variable.values
      }
      else if (variable.type == yType) {
        y = variable.values
      }
    })
    assignDataPoints(x, y)
  }

  const handleXVariableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (yVariable == (event.target.value as string)) {
      const tempVariable = xVariable
      setXVariable(event.target.value as string)
      setYVariable(tempVariable)
    }
    else {
      setXVariable(event.target.value as string)
    }
    assignXandY(xVariable, yVariable)

  }
  const handleYVariableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    if (xVariable == (event.target.value as string)) {
      const tempVariable = yVariable
      setYVariable(event.target.value as string)
      setXVariable(tempVariable)
    }
    else {
      setYVariable(event.target.value as string)
    }
    assignXandY(xVariable, yVariable)
  }
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <h2>GraphView</h2>
      <Modal
        open={openModal}
        onClose={handleClose}
        className={classes.modal}
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
          <Grid item container sm={5} >
            <Paper elevation={3}>
              <Graph
                outerHeight={500}
                outerWidth={768}
                datasets={completeDatasets.map((dataset, i) => toGraphDataset(dataset, defaultColors[i]))}
                extremeBoundaries={datasetBoundaries}
              />
            </Paper>
          </Grid>
          <Grid item sm={7}>
            <Box ml={5} mr={5} mt={5}>
              <Grid container direction='column'>
                <Grid item container spacing={3}>
                  <Grid item>
                    <Button id="add-dataset" onClick={handleOpen} color="primary" variant="contained">Add dataset To Graph</Button>
                  </Grid>
                  <Grid item>
                    <Button id="export-json" onClick={handleExportJson} color="primary" variant="contained">Export as json</Button>
                  </Grid>
                  <Grid item>
                    <Button id="save-image" onClick={handleSaveGraphImage} color="primary" variant="contained">Save Graph Image</Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <DatasetsList datasets={completeDatasets} onRemoveDatasetClick={onRemoveDataset} />
                </Grid>
              </Grid>
            </Box>
            <Grid container direction='row'>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel id="xVariable">X Variable</InputLabel>
                  <Select
                    labelId="xVariable"
                    id="xVariable"
                    value={xVariable}
                    autoWidth={true}
                    onChange={handleXVariableChange}
                  >
                    {types.map(type => (
                      <MenuItem value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl>
                  <InputLabel id="yVariable">Y Variable</InputLabel>
                  <Select
                    labelId="yVariable"
                    id="yVariable"
                    value={yVariable}
                    autoWidth={true}
                    onChange={handleYVariableChange}
                  >
                    {types.map(type => (
                      <MenuItem value={type}>{type}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box >
    </>
  )
}