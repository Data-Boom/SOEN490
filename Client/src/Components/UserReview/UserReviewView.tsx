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

    useEffect(() => {
        const fetchUserDatasets = async () => {
            const userDatasets: IApprovedDatasetModel[] = await getUserFlaggedDatasets()
            setDatasets(userDatasets)
        }
        fetchUserDatasets()
    }, [])

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
                        />
                    </Grid>
                </TableRow>
            </Table>
        </TableContainer>
    )
}




