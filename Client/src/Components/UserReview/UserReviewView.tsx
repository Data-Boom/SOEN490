import { Box, Grid, List, Paper, Table, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core"
import React, { useEffect, useState } from 'react'
import { classStyles } from "../../appTheme";
import { IApprovedDatasetModel, IFlaggedDatasetQuery } from "../../Models/Datasets/IApprovedDatasetModel";
import { callRejectDataset, adminApprovedDataset } from "../../Remote/Endpoints/DatasetEndpoint";
import { getUserFlaggedDatasets } from "../../Remote/Endpoints/UserEndpoint";
import { DatasetViewModal } from "../DatasetUpload/DatasetViewModal";
import { UserReviewList } from "./UserReviewList";

export const UserReviewView = () => {


    const [datasets, setDatasets] = useState([])
    const [editable, setEditable] = useState(false)
    const [dataset, setDataset] = useState<IApprovedDatasetModel>()

    useEffect(() => {
        const fetchUserDatasets = async () => {
            const userDatasets: IApprovedDatasetModel[] = await getUserFlaggedDatasets()
            setDatasets(userDatasets)
            console.log(userDatasets)
        }
        fetchUserDatasets()
    }, [])

    const handleDeleteDataset = async () => {
        await callRejectDataset(dataset.id)
        handleDatasetChange(null)
    }

    const handleApproveDataset = async (datasetId: IApprovedDatasetModel) => {
        const query: IFlaggedDatasetQuery = { datasetId: dataset.id }
        await adminApprovedDataset(query)
        handleDatasetChange(null)
    }

    const handleDatasetChange = (newDataset: IApprovedDatasetModel) => {
        setDataset(newDataset)
    }

    // const renderUserDatasetList = () => {

    //     return dataset && dataset.map(graphDSet => {
    //         return (
    //             < UserReviewList
    //                 dataset={datatset}
    //             />
    //         )
    //     })
    // }

    const renderDatasetModal = () => {
        return (
            < DatasetViewModal
                datasetId={dataset.id as any}
                datasetName={dataset.dataset_name}
                editable={editable}
            />
        )
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
                            handleEditRequest={setEditable}
                        />
                    </Grid>
                </TableRow>
            </Table>
        </TableContainer>
    )
}




