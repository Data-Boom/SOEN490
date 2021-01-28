import { Box, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Tooltip, Typography } from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import FeedbackIcon from '@material-ui/icons/Feedback'
import { IDatasetRowModel } from '../../Models/Datasets/IDatasetRowModel'
import RateReviewIcon from '@material-ui/icons/RateReview'
import React, { useState } from 'react'
import { classStyles } from '../../appTheme'
//import classes from '*.module.css'

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
                    <Grid item container justify='flex-start' xs={5}>

                        <Typography variant="body2" noWrap>
                            <div>
                                <input type="radio" value={dataset.name} name="dataset" />{dataset.name}
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                </Grid>
            </Box>
        </Grid>
    )
}