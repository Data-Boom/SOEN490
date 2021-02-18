import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';

import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel';

interface IProps {
    dataset: IDatasetModel,
    handleSubmitDataset: (dataset: IApprovedDatasetModel) => void,
    handleCancelDataset: () => void
}

export const ModalFooterApprove = (props: IProps) => {
    const { handleSubmitDataset, handleCancelDataset } = { ...props }
    return (
        <>
            <Grid container xs={9} sm={9} spacing={7} style={{ margin: 2 }}>
                <Grid item xs={3} sm={3}>
                    <Button size="large" id="cancel-dataset" onClick={handleCancelDataset} color="primary" variant="contained">{"Cancel"}</Button>
                </Grid>
                <Grid item xs={3} sm={3}></Grid>
                <Grid item xs={3} sm={3}>
                    <Button size="large" id="Submit-dataset" onClick={() => handleSubmitDataset} color="primary" variant="contained">{'Submit'}</Button>
                </Grid>
            </Grid>
        </>
    )
}
