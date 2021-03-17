import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import { IApprovedDatasetModel, IFlaggedDatasetQuery } from '../../Models/Datasets/IApprovedDatasetModel'
import React, { useEffect, useRef, useState } from 'react'
import { approvedDataset, callRejectDataset, flagDataset } from '../../Remote/Endpoints/DatasetEndpoint'

import { AdminReviewList } from './AdminReviewList'
import { DatasetForm } from '../DatasetUpload/DatasetForm/DatasetForm'
import { DefaultFormFooter } from '../Forms/DefaultFormFooter'
import { FormikProps } from 'formik'

export function AdminReviewView() {
  const formikReference = useRef<FormikProps<unknown>>()
  const [editable, setEditable] = useState(false)
  const [dataset, setDataset] = useState<IApprovedDatasetModel>()
  const [comment, setComment] = useState("")
  const [flaggedComment, setFlaggedComment] = useState("")
  const [update, setUpdate] = useState(0)

  useEffect(() => { document.title = "Admin Review" }, [])

  const handleDeleteDataset = async () => {
    await callRejectDataset(dataset.id)
    //todo this is not good, should use useEffects and useStates properly, refactor later
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

  //todo datasetId is passed but not used? looks like it should be used
  const handleApproveDataset = async (datasetId: IApprovedDatasetModel) => {
    const query: IFlaggedDatasetQuery = { datasetId: dataset.id, additionalComments: comment }
    await approvedDataset(query)
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
            datasets={[]}
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
              <>
                <DatasetForm
                  onSubmit={handleApproveDataset}
                  initialDataset={dataset}
                  editable={editable}
                  formikReference={formikReference}
                />
                <DefaultFormFooter formikReference={formikReference} />
              </>
            }
          </Grid>

        </Grid>
      </Grid>

    </Grid>

  )
}