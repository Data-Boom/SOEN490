import { Box, Grid, Link, Typography } from '@material-ui/core';

import { IApprovalDatasetModel } from '../../../../Server/src/models/interfaces/DatasetModelInterface';
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import React, { useState } from 'react';
import { classStyles } from '../../appTheme';
import { callRejectDataset } from '../../Remote/Endpoints/DatasetEndpoint';


interface IProps {
    onApprovalChange(): void
    onRejectChange(): void
    onSubmit(): void
}

export const ModalFooter = () => {

    const [editable, setEditable] = useState(false)

    const handleEditDataset = () => {
        setEditable(!editable)
    }

}