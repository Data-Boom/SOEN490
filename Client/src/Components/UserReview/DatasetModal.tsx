import { Box, Button, Grid, Link, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import CancelIcon from "@material-ui/icons/Cancel"
import { DatasetUploadForm } from '../DatasetUpload/DatasetUploadForm';
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel';
import Modal from '@material-ui/core/Modal/Modal';
import { ModalFooter } from './ModalFooter';
import { callRejectDataset } from '../../Remote/Endpoints/DatasetEndpoint';
import { classStyles } from '../../appTheme';
import { fixPartialForform } from '../DatasetUpload/DatasetUploadView';

interface IProps {
    singleDataset: IApprovedDatasetModel,
    handleApproveDataset: (dataset: IApprovedDatasetModel) => void
    handleDeleteDataset: () => void
    setOpen: (value: boolean) => void
    open: boolean
}

export const DatasetModal = (props: IProps) => {

    const { open, setOpen } = { ...props }
    const [dataset, setDataset] = useState<IDatasetModel>()

    const [editable, setEditable] = useState(false)



    const mappedDataset: IDatasetModel = { ...props.singleDataset }


    const { handleApproveDataset, handleDeleteDataset } = { ...props }

    useEffect(() => {
        setDataset(fixPartialForform(mappedDataset))
        console.log(mappedDataset)
    }, [])

    const close = () => {
        setOpen(false)
    }

    const handleEditDataset = () => {
        setEditable(!editable)
    }

    return (
        <>
            <Modal open={open}
                onClose={() => setOpen(false)}
                className={classStyles().modalsearch}
            >
                <Paper elevation={3} style={{ width: "100%" }}>
                    <Box m={5}>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <CancelIcon color="primary" onClick={() => setOpen(false)} />
                            </Grid>
                        </Grid>

                        <DatasetUploadForm
                            onSubmit={close}
                            initialDataset={dataset}
                            editable={editable}
                            buttonName="Close"
                        />

                    </Box>
                    <Grid container justify="flex-end" alignItems="center">
                        <Grid item>
                            <ModalFooter
                                dataset={dataset}
                                handleApproveDataset={handleApproveDataset}
                                handleDeleteDataset={handleDeleteDataset}
                                handleEditDataset={handleEditDataset}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </Modal>
        </>
    )
}