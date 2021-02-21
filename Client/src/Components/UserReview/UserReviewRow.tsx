import { Box, Button, Grid, Typography } from "@material-ui/core"
import { IApprovedDatasetModel, IFlaggedDatasetQuery } from "../../Models/Datasets/IApprovedDatasetModel"
import React, { useState } from "react"
import { approvedDataset, callRejectDataset, submitEditedDataset } from "../../Remote/Endpoints/DatasetEndpoint"

import { DatasetModal } from "./DatasetModal"
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { classStyles } from "../../appTheme"

interface IProps {
  dataset: IApprovedDatasetModel
}

export const UserReviewRow = (props: IProps) => {

  const [open, setOpen] = useState(false)
  const { dataset } = { ...props }

  const reload = () => {
    setTimeout(window.location.reload() as any, 200)
  }

  const handleDeleteDataset = async () => {
    await callRejectDataset(dataset.id)
    setOpen(false)
    reload()
  }

  const handleApproveDataset = async (datasetId: number) => {
    const query: IFlaggedDatasetQuery = { datasetId: dataset.id }
    await approvedDataset(query)
    setOpen(false)
    reload()
  }

  const handleSubmitDataset = async (formDataset: IDatasetModel) => {
    const newAppovalDataset: IApprovedDatasetModel = { ...formDataset, datasetFlaggedComment: dataset.datasetFlaggedComment, datasetIsFlagged: dataset.datasetIsFlagged }
    await submitEditedDataset(newAppovalDataset)
    setOpen(false)
    reload()
  }

  return (
    <Box className={classStyles().defaultBorder}>
      <Grid container spacing={3} alignItems="center">
        <Grid item>
          <Button size="small" id="view-dataset" onClick={() => setOpen(true)} color="primary" variant="contained">Review</Button>
        </Grid>
        <Grid item>
          <Typography>Dataset Name:</Typography>
        </Grid>
        <Grid item>
          <Typography>{dataset.dataset_name}</Typography>
        </Grid>
        <Grid item>
          <Typography>Comment:</Typography>
        </Grid>
        <Grid item>
          <Typography>{dataset.datasetFlaggedComment}</Typography>
        </Grid>
        <DatasetModal
          dataset={dataset}
          handleApproveDataset={handleApproveDataset}
          handleDeleteDataset={handleDeleteDataset}
          handleSubmitDataset={handleSubmitDataset}
          setOpen={setOpen}
          open={open}
        />
      </Grid>
    </Box>
  )

}