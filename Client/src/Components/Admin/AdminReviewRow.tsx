import { Box, Grid, IconButton, Tooltip, Typography } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import FeedbackIcon from '@material-ui/icons/Feedback'
import { IDatasetRowModel } from '../../Models/Datasets/IDatasetRowModel'
import RateReviewIcon from '@material-ui/icons/RateReview'
import React from 'react'
import { classStyles } from '../../appTheme'

interface IAdminReviewModel {
    dataset: IDatasetRowModel,
    onDeleteDatasetClick: (datasetId: number) => void,
    onReviewDatasetClick: (datasetId: number) => void,
    onFlagDatasetClick: (datasetId: number) => void
}

export const AdminReviewRow = (props: IAdminReviewModel) => {
    const { dataset, onDeleteDatasetClick, onReviewDatasetClick, onFlagDatasetClick } = { ...props }

    return (
        <Grid item>
            <Box className={classStyles().datasetBorder}>
                <Grid container alignItems='center' justify='space-between'>
                    <Grid item container justify='flex-start' xs={2}>
                        <Typography variant="body2" noWrap>
                            {dataset.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="Click to review the dataset">
                            <IconButton onClick={() => onReviewDatasetClick(dataset.id)}>
                                <RateReviewIcon color='primary' />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="Click to delete the dataset">
                            <IconButton onClick={() => onDeleteDatasetClick(dataset.id)}>
                                <DeleteIcon color='primary' />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={1}>
                        <Tooltip title="Click to flag the dataset">
                            <IconButton onClick={() => onFlagDatasetClick(dataset.id)}>
                                <FeedbackIcon color='primary' />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}