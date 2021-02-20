import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import { IApprovedDatasetModel, IFlaggedDatasetQuery } from '../../Models/Datasets/IApprovedDatasetModel'
import React, { useState } from 'react'
import { adminApprovedDataset, callRejectDataset, flagDataset } from '../../Remote/Endpoints/DatasetEndpoint'

import { AdminReviewList } from './AdminReviewList'
import { DatasetUploadForm } from '../DatasetUpload/DatasetUploadForm'

export function AdminReviewView() {

  const [datasetState, setDatasetState] = useState([])
  const [editable, setEditable] = useState(false)
  const [dataset, setDataset] = useState<IApprovedDatasetModel>()
  const [comment, setComment] = useState("")
  const [flaggedComment, setFlaggedComment] = useState("")
  const [update, setUpdate] = useState(0)

  const handleDeleteDataset = async () => {
    await callRejectDataset(dataset.id)
    setUpdate(update + 1)
    handleDatasetChange(null)
  }

  const handleEditDataset = () => {
    setEditable(!editable)
  }

  const handleFlagDataset = async () => {
    const query: IFlaggedDatasetQuery = { datasetId: dataset.id, flaggedComments: flaggedComment, additionalComments: comment }
    await flagDataset(query)
  }

  const handleApproveDataset = async (datasetId: IApprovedDatasetModel) => {
    const query: IFlaggedDatasetQuery = { datasetId: dataset.id, additionalComments: comment }
    await adminApprovedDataset(query)
    setUpdate(update + 1)
    handleDatasetChange(null)
  }

  const handleDatasetChange = (newDataset: IApprovedDatasetModel) => {
    setDataset(newDataset)
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleFlaggedCommentChange = (event) => {
    setFlaggedComment(event.target.value)
  }
  return (

    <Grid justify="flex-start" container spacing={4}>
      <Grid xs={3}>
        <Box p={4} pt={7}>
          <Typography variant='h5'>
            Datasets to be reviewed
          </Typography>
          <br></br>
          <AdminReviewList
            datasets={datasetState}
            onChange={handleDatasetChange}
            update={update}
          />
          <br></br>
          <Button id="toggleEditButton" onClick={handleEditDataset} color="primary" variant="contained">Edit</Button>&nbsp;&nbsp;&nbsp;
          <Button id="flagDatasetButton" color="primary" onClick={handleFlagDataset} variant="contained">Flag</Button>&nbsp;&nbsp;&nbsp;
          <Button id="deleteDatasetButton" color="primary" onClick={handleDeleteDataset} variant="contained">Delete</Button>
        </Box>
        <Box p={5}>
          <TextField
            id="standard-multiline-flexible"
            label="Add a Comment"
            multiline
            fullWidth={true}
            rowsMax={4}
            value={comment}
            onChange={handleCommentChange}
          />
        </Box>
        <Box p={5}>
          <TextField
            id="standard-multiline-flexible"
            label="Add a Flagged Comment"
            multiline
            fullWidth={true}
            rowsMax={4}
            value={flaggedComment}
            onChange={handleFlaggedCommentChange}
          />
        </Box>
      </Grid>

      <Grid xs={8}>
        <Grid container spacing={3}>
          <Grid xs={12}>
            {dataset &&
              <DatasetUploadForm
                onSubmit={handleApproveDataset}
                initialDataset={dataset}
                editable={editable}
              />
            }
          </Grid>

        </Grid>
      </Grid>

    </Grid>

  )
}