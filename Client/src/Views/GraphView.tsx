// todo this highlights as an error but i dont know what to do with it, 
// it doesnt break anything, saving image as png works well

import * as svg from 'save-svg-as-png'

import { Box, Button, Grid, Modal, Paper, makeStyles } from "@material-ui/core"
import React, { useState } from "react"

import { DatasetsList } from "../Components/Graph/DatasetsList"
import Graph from '../Components/Graph/Graph'
import { IDatasetModel } from "../Models/Datasets/IDatasetModel"
import SearchView from './SearchView'

export default function GraphView() {
  const useStyles = makeStyles(() => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }))

  const classes = useStyles()

  //sample datasets to try, just needs to gather from the backend instead.
  //Datalist is the list fed to the graphCreation
  const [datasets, setDatasets] = useState<IDatasetModel[]>([])
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
    download("datasets.json", JSON.stringify(datasets, null, 4))
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
    console.log("removed dataset")
    setDatasets(datasets.filter(dataset => dataset.id !== datasetId))
  }

  const handleDatasetsSelected = (selectedDatasets: IDatasetModel[]) => {
    console.log("just set datasets from handleDatasetsSelected")

    // selectedDatasets.filter will return those datasets that meet
    let notYetSelectedDatasets: IDatasetModel[] = selectedDatasets.filter(selectedDataset => !isInStateAlready(selectedDataset))

    let mergedDatasets: IDatasetModel[] = JSON.parse(JSON.stringify(datasets))
    notYetSelectedDatasets.forEach(dataset => {
      mergedDatasets.push(dataset)
    })

    setDatasets(mergedDatasets)
  }

  const isInStateAlready = (dataset: IDatasetModel) => {
    return datasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
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
                datalist={datasets.map((dataset) => dataset.points)}
                colourslist={datasets.map((dataset) => dataset.color)}
                IDList={datasets.map((dataset) => dataset.id)}
              />
            </Paper>
          </Grid>
          <Grid item sm={7}>
            <Box ml={5} mr={5} mt={5}>
              <Grid container direction='column'>
                <Grid item container spacing={3}>
                  <Grid item>
                    <Button onClick={handleOpen} color="primary" variant="contained">Add dataset To Graph</Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleExportJson} color="primary" variant="contained">Export as json</Button>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleSaveGraphImage} color="primary" variant="contained">Save Graph Image</Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <DatasetsList datasets={datasets} onRemoveDatasetClick={onRemoveDataset} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}