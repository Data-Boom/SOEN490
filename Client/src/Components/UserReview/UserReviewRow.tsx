import { Box, Button, Grid } from "@material-ui/core"
import { IApprovedDatasetModel, IFlaggedDatasetQuery } from "../../Models/Datasets/IApprovedDatasetModel"
import React, { useState } from "react"
import { adminApprovedDataset, callRejectDataset } from "../../Remote/Endpoints/DatasetEndpoint"

import { DatasetModal } from "./DatasetModal"

interface IProps {
    dataset: IApprovedDatasetModel
}

export const UserReviewRow = (props: IProps) => {


    const [open, setOpen] = useState(false)

    const [dataset, setDataset] = useState<IApprovedDatasetModel>()

    const handleDeleteDataset = async () => {
        await callRejectDataset(props.dataset.id)
        setOpen(false)
        handleDatasetChange(null)
    }

    const handleApproveDataset = async (dataset: IApprovedDatasetModel) => {
        const query: IFlaggedDatasetQuery = { datasetId: props.dataset.id }
        await adminApprovedDataset(query)
        handleDatasetChange(null)
    }

    const handleDatasetChange = (newDataset: IApprovedDatasetModel) => {
        setDataset(newDataset)
    }

    const handleSubmitDataset = async () => {

    }

    const handleCheck = () => {
        setOpen(true)
    }

    return (
        <Box>
            <Grid item>
                <Button size="small" id="view-dataset" onClick={() => setOpen(true)} color="primary" variant="contained">{props.dataset.dataset_name} </Button>
            </Grid>
            <Grid item>
                <p> {props.dataset.datasetFlaggedComment} </p>
            </Grid>
            <Grid style={{ padding: '3px 10px', margin: '5px 0' }}>
                < DatasetModal
                    singleDataset={props.dataset}
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