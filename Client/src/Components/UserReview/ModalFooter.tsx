import { Button } from '@material-ui/core';
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import React from 'react';
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel';

interface IProps {
    dataset: IDatasetModel,
    handleApproveDataset: (dataset: IApprovedDatasetModel) => void
    handleDeleteDataset: () => void
    handleEditDataset: () => void
}

export const ModalFooter = (props: IProps) => {
    return (
        <>
            <Button size="small" id="edit-dataset" onClick={() => props.handleEditDataset} color="primary" variant="contained">{'Edit Dataset'}</Button>
            <Button size="small" id="approve-dataset" onClick={() => props.handleApproveDataset} color="primary" variant="contained">{"Approve Dataset"}</Button>
            <Button size="small" id="delete-dataset" onClick={() => props.handleDeleteDataset} color="primary" variant="contained">{'Delete Dataset'}</Button>
        </>
    )
}