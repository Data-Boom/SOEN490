import * as svg from 'save-svg-as-png'

import { Button, Grid, Modal, Paper, makeStyles, Box } from "@material-ui/core"
import { borders, sizing } from '@material-ui/system';
import React, { useState } from "react"
import CancelIcon from '@material-ui/icons/Cancel';
import { DatasetsList } from "./DatasetsList"
import Graph from './Graph'
import { ICompleteDatasetEntity } from "../../Models/Datasets/ICompleteDatasetEntity"
import { IGraphDatasetModel } from '../../Models/Datasets/IGraphDatasetModel'
import SearchView from '../Search/SearchView'
import { exampleExportDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { classStyles } from "../../appTheme"

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

  //Testing the query parser using quer-string for future use if needed
  //console.log(queryString.parse(useLocation().search))


  //sample datasets to try, just needs to gather from the backend instead.
  //Datalist is the list fed to the graphCreation
  const [completeDatasets, setCompleteDatasets] = useState<ICompleteDatasetEntity[]>([])
  const [openModal, setOpenModal] = useState(false)

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
    let element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', filename)

    element.style.display = 'none'
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  const onRemoveDataset = (datasetId: number) => {
    setCompleteDatasets(completeDatasets.filter(dataset => dataset.id !== datasetId))
  }

  const handleDatasetsSelected = (selectedDatasets: ICompleteDatasetEntity[]) => {
    let notYetSelectedDatasets: ICompleteDatasetEntity[] = selectedDatasets.filter(selectedDataset => !isInStateAlready(selectedDataset))

    let mergedDatasets: ICompleteDatasetEntity[] = [...completeDatasets]
    notYetSelectedDatasets.forEach(dataset => {
      mergedDatasets.push(dataset)
    })

    setCompleteDatasets(mergedDatasets)
    handleClose()
  }

  const isInStateAlready = (dataset: ICompleteDatasetEntity) => {
    return completeDatasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
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
            <Box m={2} maxWidth p={1} overflow="hidden">
              <Paper elevation={3}>
                <Graph
                  outerHeight={450}
                  outerWidth={800}
                  datasets={completeDatasets.map((dataset, i) => toGraphDataset(dataset, defaultColors[i]))}
                />
              </Paper>
            </Box>
          </Grid>
          <Grid container justify="flex-start" xs={3}>
            <Box ml={4} mt={2} maxWidth>
              <Grid item container justify="flex-start" spacing={3}>
                <Grid item>
                  <Button onClick={handleOpen} color="primary" variant="contained">Add dataset</Button>
                </Grid>
                <Grid item>
                  <Button onClick={handleExportJson} color="primary" variant="contained">Export as JSON</Button>
                </Grid>
                <Grid item>
                  <Button onClick={handleSaveGraphImage} color="primary" variant="contained">Save Graph Image</Button>
                </Grid>
              </Grid>
              <Grid item>
                <DatasetsList datasets={completeDatasets} onRemoveDatasetClick={onRemoveDataset} />
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}