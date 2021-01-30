import { Box, Grid, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { classStyles } from '../../appTheme'
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel'

interface IAdminReviewModel {
    dataset: IApprovedDatasetModel,
    onChange(formDataset: IDatasetModel): void
}

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