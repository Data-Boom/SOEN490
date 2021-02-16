import { Box, Grid, Button } from "@material-ui/core"
import React, { useState } from "react"
import { IApprovedDatasetModel, IFlaggedDatasetQuery } from "../../Models/Datasets/IApprovedDatasetModel"
import { callRejectDataset, adminApprovedDataset } from "../../Remote/Endpoints/DatasetEndpoint"
import { DatasetModal } from "./DatasetModal"

interface IProps {
    dataset: IApprovedDatasetModel
}

export const UserReviewRow = (props: IProps) => {


    const [open, setOpen] = useState(false)

    const [dataset, setDataset] = useState<IApprovedDatasetModel>()

    const handleDeleteDataset = async () => {
        await callRejectDataset(dataset.id)
        handleDatasetChange(null)
    }

    const handleApproveDataset = async (dataset: IApprovedDatasetModel) => {
        const query: IFlaggedDatasetQuery = { datasetId: dataset.id }
        await adminApprovedDataset(query)
        handleDatasetChange(null)
    }

    const handleDatasetChange = (newDataset: IApprovedDatasetModel) => {
        setDataset(newDataset)
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
            <Grid>
                < DatasetModal
                    singleDataset={props.dataset}
                    handleApproveDataset={handleApproveDataset}
                    handleDeleteDataset={handleDeleteDataset}
                    setOpen={setOpen}
                    open={open}
                />
            </Grid>
        </Box>
    )

}