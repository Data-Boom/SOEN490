import { Box, Grid, List, Paper, Table, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"
import React, { useEffect, useState } from 'react'
import { classStyles } from "../../appTheme";
import { IApprovedDatasetModel, IFlaggedDatasetQuery } from "../../Models/Datasets/IApprovedDatasetModel";
import { callRejectDataset, adminApprovedDataset } from "../../Remote/Endpoints/DatasetEndpoint";
import { getUserFlaggedDatasets } from "../../Remote/Endpoints/UserEndpoint";

import { DatasetModal } from "./DatasetModal";
import { UserReviewList } from "./UserReviewList";

export const UserReviewView = () => {

    const [datasets, setDatasets] = useState<IApprovedDatasetModel[]>([])

    const [dataset, setDataset] = useState<IApprovedDatasetModel>()

    const [open, setOpen] = useState(false)

    useEffect(() => {
        const fetchUserDatasets = async () => {
            const userDatasets: IApprovedDatasetModel[] = await getUserFlaggedDatasets()
            setDatasets(userDatasets)
        }
        fetchUserDatasets()
    }, [])

    const handleModal = () => {
        setOpen(true)
    }

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

    return (
        <TableContainer component={Paper} style={{ width: "100%" }}>
            <Table aria-label="collapsible table" >
                <Typography variant='h5'>
                    Datasets to be reviewed
                </Typography>
                <TableRow>
                    <Grid container justify="center" spacing={3}>
                        < UserReviewList
                            userDatasets={datasets}
                            handleModal={handleModal}
                        />
                    </Grid>
                </TableRow>
                <TableRow>
                    <Grid container justify="center" spacing={3}>
                        < DatasetModal
                            dataset={datasets[0]}
                            handleApproveDataset={handleApproveDataset}
                            handleDeleteDataset={handleDeleteDataset}
                            handleModal={open}
                        />
                    </Grid>
                </TableRow>
            </Table>
        </TableContainer>
    )
}




