import { Box, Button, Grid, Modal, Paper } from "@material-ui/core"
import React, { useState } from 'react'

import CancelIcon from "@material-ui/icons/Cancel"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import SearchView from "./SearchView"
import { classStyles } from "../../appTheme"

interface IProps {
  onDatasetsSelected: (foundDatasets: IDatasetModel[]) => void
}

export const SearchViewModal = (props: IProps) => {
  const { onDatasetsSelected } = { ...props }
  const [open, setOpen] = useState(false)

  const handleDatasetsSelected = (foundDatasets: IDatasetModel[]) => {
    onDatasetsSelected(foundDatasets)
    setOpen(false)
  }

  return (
    <>
      <Grid item>
        <Button id="add-dataset" onClick={() => setOpen(true)} color="primary" variant="contained">Add dataset To Graph</Button>
      </Grid>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classStyles().modalsearch}
      >
        <Paper elevation={3}>
          <Box m={5}>
            <Grid container justify="flex-end">
              <Grid item>
                <CancelIcon color="primary" onClick={() => setOpen(false)} />
              </Grid>
            </Grid>
            <SearchView
              handleDatasetsSelected={handleDatasetsSelected}
            />
          </Box>
        </Paper>
      </Modal>
    </>
  )
}