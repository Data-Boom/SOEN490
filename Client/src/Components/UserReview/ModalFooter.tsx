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

    const { handleApproveDataset, handleDeleteDataset, handleEditDataset } = { ...props }
    return (
        <>
            <Button size="small" id="edit-dataset" onClick={() => handleEditDataset} color="primary" variant="contained">{'Edit Dataset'}</Button>
            <Button size="small" id="approve-dataset" onClick={() => handleApproveDataset} color="primary" variant="contained">{"Approve Dataset"}</Button>
            <Button size="small" id="delete-dataset" onClick={() => handleDeleteDataset} color="primary" variant="contained">{'Delete Dataset'}</Button>
        </>
    )
}