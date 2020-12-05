import { Box, Button, Container, Grid, Modal, Paper, TextField, makeStyles } from "@material-ui/core"

import { DatasetsList } from "../Components/Graph/DatasetsList"
import Graph from '../Components/Graph/Graph'
import { IDatasetModel } from "../Models/Datasets/IDatasetModel"
import { ISearchDatasetsFormModel } from "../Models/Forms/ISearchDatasetsFormModel"
import React from "react"
import { SearchDatasetsForm } from "../Components/Search/SearchDatasetsForm"
import { exampleDatasets } from "../Models/Datasets/IDatasetModel"
import { useState } from "react"

export default function GraphView() {
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

  const handleRequest = (formValues: ISearchDatasetsFormModel) => {
    setDatasets(exampleDatasets)

    // loadOptionsList(exampleDatasets, exampleDatasets.map(dataset => dataset.id))
  }

  const onRemoveDataset = (datasetId: number) => {
    //getting copy of datasets to modify them and then set Datasets state
    let datasetCopy: IDatasetModel[] = JSON.parse(JSON.stringify(datasets))
    datasetCopy.splice(datasetId, 1)

    setDatasets(datasetCopy)
    // loadOptionsList(datasetCopy.map((dataset) => dataset.points), datasetCopy.map((dataset) => dataset.id))
  }
  const useStyles = makeStyles(() => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }))
  const classes = useStyles()
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
            <SearchDatasetsForm
              handleSubmit={handleRequest}
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
            <Grid container>
              <Grid item>
                <Button onClick={handleOpen} color="primary" variant="contained">Add dataset To Graph</Button>
              </Grid>
              <Grid item>
                <DatasetsList datasets={datasets} onRemoveDatasetClick={onRemoveDataset} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}