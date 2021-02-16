import { Box, Grid } from '@material-ui/core';
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import React from 'react';
import { classStyles } from '../../appTheme';
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
