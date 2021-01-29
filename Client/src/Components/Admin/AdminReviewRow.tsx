import { Box, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import RateReviewIcon from '@material-ui/icons/RateReview'
import { classStyles } from '../../appTheme'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { getUnapprovedDatasets } from '../../Remote/Endpoints/DatasetEndpoints'

//import classes from '*.module.css'

interface IAdminReviewModel {
    dataset: IDatasetModel
}


//let data = listUnapprovedDatasets()
//setDatasets(data)

export const AdminReviewRow = (props: IAdminReviewModel) => {
    const { dataset } = { ...props }

    return (
        <Grid item>
            <Box className={classStyles().datasetBorder}>
                <Grid container alignItems='center' justify='space-between'>
                    <Grid item container justify='flex-start' xs={7}>
                        <Typography variant="body2" noWrap>
                            <div>
                                <input type="radio" value={dataset.dataset_name} name="dataset" />{dataset.dataset_name}
                            </div>
                        </Typography>
                    </Grid>

                </Grid>
            </Box>
        </Grid>
    )
}