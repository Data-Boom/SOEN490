import { Box, FormControl, FormControlLabel, Grid, IconButton, Radio, RadioGroup, Tooltip, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import FeedbackIcon from '@material-ui/icons/Feedback'
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import RateReviewIcon from '@material-ui/icons/RateReview'
import { classStyles } from '../../appTheme'
import { listUnapprovedDatasets } from '../../Remote/Endpoints/DatasetEndpoints'

//import classes from '*.module.css'

interface IAdminReviewModel {
    dataset: IApprovedDatasetModel,
    onChange(formDataset: IDatasetModel): void
}


//let data = listUnapprovedDatasets()
//setDatasets(data)

export const AdminReviewRow = (props: IAdminReviewModel) => {
    const { dataset, onChange } = { ...props }

    const setDataset = () => {
        onChange(dataset)
    }

    return (
        <Grid item>
            <Box className={classStyles().datasetBorder}>
                <Grid container alignItems='center' justify='space-between'>
                    <Grid item container justify='flex-start' xs={7}>
                        <Typography variant="body2" noWrap>
                            <div>
                                <input type="radio" value={dataset.dataset_name} onClick={setDataset} name="dataset" />{dataset.dataset_name}
                            </div>
                        </Typography>
                    </Grid>

                </Grid>
            </Box>
        </Grid>
    )
}