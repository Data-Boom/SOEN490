import { Box, Button, Grid, Link, TextField, Typography } from '@material-ui/core';

import { IApprovalDatasetModel } from '../../../../Server/src/models/interfaces/DatasetModelInterface';
import { IApprovedDatasetModel, IFlaggedDatasetQuery } from '../../Models/Datasets/IApprovedDatasetModel';
import React from 'react';
import { classStyles } from '../../appTheme';
import { DatasetViewModal } from '../DatasetUpload/DatasetViewModal';
import { DatasetUploadForm } from '../DatasetUpload/DatasetUploadForm';
import { useState } from 'react';
import { post } from '../../Remote/FluentRequest';
import { DatasetModal } from './DatasetModal';
import { adminApprovedDataset, callRejectDataset } from '../../Remote/Endpoints/DatasetEndpoint';
import { UserReviewRow } from './UserReviewRow';



interface IProps {
    userDatasets: IApprovedDatasetModel[]
}

export const UserReviewList = (props: IProps) => {

    const { userDatasets } = { ...props }

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={3}>
                <Box className={classStyles().datasetBorder}>
                    {userDatasets && userDatasets.map(dataset => {
                        return (
                            <UserReviewRow
                                dataset={dataset}
                            />
                        )
                    })}
                </Box>
            </Grid>
        </Grid>
    )
}
