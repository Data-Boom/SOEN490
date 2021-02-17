import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';

import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel';

interface IProps {
    dataset: IDatasetModel,
    handleApproveDataset: (dataset: IApprovedDatasetModel) => void,
    handleDeleteDataset: () => void,
    handleEditDataset(): void
}

export const ModalFooter = (props: IProps) => {
    const { handleApproveDataset, handleDeleteDataset, handleEditDataset } = { ...props }
    return (
        <>
            <Grid container xs={9} sm={11} spacing={4} style={{ margin: 2 }}>
                <Grid item sm={2}></Grid>
                <Grid item xs={3} sm={3}>
                    <Button id="edit-dataset" onClick={handleEditDataset} color="primary" variant="contained">{'Edit Dataset'}</Button>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Button id="approve-dataset" onClick={() => handleApproveDataset} color="primary" variant="contained">{"Approve Dataset"}</Button>
                </Grid>
                <Grid item xs={3} sm={3}>
                    <Button id="delete-dataset" onClick={handleDeleteDataset} color="secondary" variant="contained">{'Delete Dataset'}</Button>
                </Grid>
            </Grid>
        </>
    )
}