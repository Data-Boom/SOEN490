import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import { IDatasetModel, example2, exampleExportDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React, { useEffect, useState } from 'react'

import { AdminReviewList } from './AdminReviewList'
import { DatasetUploadForm } from '../DatasetUpload/DatasetUploadForm'
export function AdminReviewView() {
    const [datasetState, setDatasetState] = useState([])
    const [editable, setEditable] = useState(false)
    const [dataset, setDataset] = useState<IDatasetModel>()
    const [comment, setComment] = useState("")
    const [flaggedComment, setFlaggedComment] = useState("")


    const handleDeleteDataset = () => {
        console.log("dataset deleted")
    }
    const handleReviewDataset = (datasetId: number) => {

    }

    const handleEditDataset = () => {
        setEditable(!editable)
    }

    const handleFlagDataset = () => {
        console.log("dataset flagged")
    }

    //handle submit after pressing
    const handleSubmit = (datasetId: IDatasetModel) => {

    }

    const handleDatasetChange = (newDataset: IDatasetModel) => {
        console.log(newDataset)
        setEditable(true)
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
                    <Typography>
                        Datasets to be reviewed
                    </Typography>
                    <AdminReviewList
                        datasets={datasetState}
                        onChange={handleDatasetChange}
                    />
                    <Button id="toggle-edit" onClick={handleEditDataset} color="primary" variant="contained">Edit</Button>&nbsp;&nbsp;&nbsp;
                <Button id="toggle-edit" color="primary" onClick={handleFlagDataset} variant="contained">Flag</Button>&nbsp;&nbsp;&nbsp;
                <Button id="toggle-edit" color="primary" onClick={handleDeleteDataset} variant="contained">Delete</Button>
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
                                onSubmit={handleSubmit}
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