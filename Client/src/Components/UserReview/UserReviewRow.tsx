import { Box, Button, Grid } from "@material-ui/core"
import { IApprovedDatasetModel, IFlaggedDatasetQuery } from "../../Models/Datasets/IApprovedDatasetModel"
import { IData, IDatasetMeta, IDatasetModel, IReference } from '../../Models/Datasets/IDatasetModel'
import React, { useState } from "react"
import { adminApprovedDataset, callRejectDataset } from "../../Remote/Endpoints/DatasetEndpoint"

import { DatasetModal } from "./DatasetModal"

interface IProps {
    dataset: IApprovedDatasetModel,
}
interface DatasetUploadFormValues {
    meta: IDatasetMeta,
    reference: IReference,
    data: IData
}

export const UserReviewRow = (props: IProps) => {

    const [open, setOpen] = useState(false)
    //const [dataset, setDataset] = useState<IDatasetModel>()
    const { dataset } = { ...props }
    const handleDeleteDataset = async () => {
        await callRejectDataset(dataset.id)
        handleDatasetChange(null)
        setOpen(false)
        reload()
    }

    const handleApproveDataset = async (datasetId: number) => {
        const query: IFlaggedDatasetQuery = { datasetId: dataset.id }
        await adminApprovedDataset(query)
        handleDatasetChange(null)
        setOpen(false)
        reload()
    }

    const handleDatasetChange = (newDataset: IApprovedDatasetModel) => {
        //setDataset(newDataset)

    }

    const handleSubmitDataset = () => {

    }

    const handleCheck = () => {
        setOpen(true)
    }

    const reload = () => {
        window.location.reload()
    }

    return (
        <Box>
            <Grid item>
                <Button size="small" id="view-dataset" onClick={() => setOpen(true)} color="primary" variant="contained">{dataset.dataset_name} </Button>
            </Grid>
            <Grid item>
                <p> {dataset.datasetFlaggedComment} </p>
            </Grid>
            <Grid style={{ padding: '3px 10px', margin: '5px 0' }}>
                < DatasetModal
                    singleDataset={dataset}
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