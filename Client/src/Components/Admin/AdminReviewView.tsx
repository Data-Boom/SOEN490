import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import { IDatasetModel, example2, exampleExportDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React, { useEffect, useState } from 'react'

import { AdminReviewList } from './AdminReviewList'
import { DatasetUploadForm } from '../DatasetUpload/DatasetUploadForm'
import { listGraphStates } from '../../Remote/Endpoints/GraphStateEndpoint'
import { toDatasetRows } from '../Graph/GraphFunctions'

export function AdminReviewView() {
    const [datasetState, setDatasetState] = useState([])
    const [editable, setEditable] = useState(false)
    const [dataset, setDataset] = useState(exampleExportDatasetModel)
    const [comment, setComment] = useState("Add a comment")
    //const completeDataset: IDatasetModel[]
    useEffect(() => {
        const callListDatasetStates = async () => {
            const datasetState = await listGraphStates()

            setDatasetState(datasetState)
        }
        callListDatasetStates()
    }, [])

    const handleDeleteDataset = (datasetId: number) => {

    }
    const handleReviewDataset = (datasetId: number) => {

    }

    const handleEditDataset = () => {
        setEditable(!editable)
    }

    const handleFlagDataset = (datasetId: number) => {

    }

    const handleSubmit = (datasetId: IDatasetModel) => {

    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    return (

        <Grid container spacing={3}>
            <Grid xs={3}>
                <AdminReviewList
                    datasets={datasetState}
                    onReviewDatasetClick={handleReviewDataset}
                    onDeleteDatasetClick={handleDeleteDataset}
                    onFlagDatasetClick={handleFlagDataset}
                />
                <Button id="toggle-edit" onClick={handleEditDataset} color="primary" variant="contained">Edit</Button>
            </Grid>
            <Grid xs={9}>
                <Grid container spacing={3}>
                    <Grid xs={12}>
                        <DatasetUploadForm
                            onSubmit={handleSubmit}
                            initialDataset={dataset}
                            editable={editable}
                        />
                    </Grid>
                    <Grid xs={12}>
                        <TextField
                            id="standard-multiline-flexible"
                            label="Add a Comment"
                            multiline
                            fullWidth={true}
                            rowsMax={4}
                            value={comment}
                            onChange={handleCommentChange}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    )
}