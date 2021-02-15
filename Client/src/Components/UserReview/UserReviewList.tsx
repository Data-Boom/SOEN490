import { Box, Button, Grid, Link, TextField, Typography } from '@material-ui/core';

import { IApprovalDatasetModel } from '../../../../Server/src/models/interfaces/DatasetModelInterface';
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import React from 'react';
import { classStyles } from '../../appTheme';
import { DatasetViewModal } from '../DatasetUpload/DatasetViewModal';
import { DatasetUploadForm } from '../DatasetUpload/DatasetUploadForm';
import { useState } from 'react';
import { post } from '../../Remote/FluentRequest';

interface IProps {
    userDatasets: IApprovedDatasetModel[],
    handleModal: () => void
}

export const UserReviewList = (props: IProps) => {

    const { userDatasets, handleModal } = { ...props }

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={3}>
                <Box className={classStyles().datasetBorder}>
                    <br></br>
                    {userDatasets && userDatasets.map(dataset => {
                        return (
                            <Box>
                                <Grid item>
                                    <Button size="small" id="view-dataset" onClick={handleModal} color="primary" variant="contained">{dataset.dataset_name} </Button>
                                </Grid>
                                <Grid item>
                                    <p> {dataset.datasetFlaggedComment} </p>
                                </Grid>
                            </Box>
                        )
                    })}
                </Box>
            </Grid>
        </Grid >
    )
}