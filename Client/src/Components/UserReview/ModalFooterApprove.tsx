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
            <Grid container xs={9} sm={11} spacing={4} style={{ margin: 2 }}>
                <Grid item sm={2}></Grid>
                <Grid item xs={3} sm={3}>
                    <Button id="Submit-dataset" onClick={() => handleSubmitDataset} color="primary" variant="contained">{'Submit Dataset'}</Button>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Button id="cancel-dataset" onClick={handleCancelDataset} color="primary" variant="contained">{"Cancel"}</Button>
                </Grid>
            </Grid>
        </>
    )
}
