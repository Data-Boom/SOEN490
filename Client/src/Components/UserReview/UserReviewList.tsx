import { Box, Grid, Link, Typography } from '@material-ui/core';

import { IApprovalDatasetModel } from '../../../../Server/src/models/interfaces/DatasetModelInterface';
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import React from 'react';
import { classStyles } from '../../appTheme';
import { DatasetViewModal } from '../DatasetUpload/DatasetViewModal';
import { DatasetUploadForm } from '../DatasetUpload/DatasetUploadForm';
import { useState } from 'react';

interface IProps {
    userDatasets: IApprovedDatasetModel[],
    handleEditRequest(edit: boolean): void
}

export const UserReviewList = (props: IProps) => {

    const { userDatasets, handleEditRequest } = { ...props }

    const [open, setOpen] = useState(false)

    const close = () => {
        setOpen(false)
    }

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={3}>
                <Box className={classStyles().datasetBorder}>
                    <br></br>
                    {userDatasets && userDatasets.map(dataset => {
                        return (
                            <DatasetUploadForm
                                onSubmit={close}
                                initialDataset={dataset}
                                editable={false}
                                buttonName="Close"
                            />
                        )
                    })}
                </Box>
            </Grid>
        </Grid >
    )
}