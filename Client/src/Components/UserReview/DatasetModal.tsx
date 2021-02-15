import { Box, Button, Grid, Link, Paper, Typography } from '@material-ui/core';
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import React, { useEffect, useState } from 'react';
import { classStyles } from '../../appTheme';
import { callRejectDataset } from '../../Remote/Endpoints/DatasetEndpoint';
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel';
import CancelIcon from "@material-ui/icons/Cancel"
import Modal from '@material-ui/core/Modal/Modal';
import { DatasetUploadForm } from '../DatasetUpload/DatasetUploadForm';
import { fixPartialForform } from '../DatasetUpload/DatasetUploadView';
import { ModalFooter } from './ModalFooter';


interface IProps {
    dataset: IApprovedDatasetModel,
    handleApproveDataset: (dataset: IApprovedDatasetModel) => void
    handleDeleteDataset: () => void
    handleModal: boolean

    //handleModal: () => boolean
}

export const DatasetModal = (props: IProps) => {


    const [open, setOpen] = useState(false)
    const [dataset, setDataset] = useState<IDatasetModel>()

    const [editable, setEditable] = useState(false)

    const mappedDataset: IDatasetModel = { ...props.dataset }

    const { handleApproveDataset, handleDeleteDataset, handleModal } = { ...props }

    useEffect(() => {
        setDataset(fixPartialForform(mappedDataset))
    }, [])

    const close = () => {
        setOpen(false)
    }

    const handleEditDataset = () => {
        setEditable(!editable)
    }

    return (
        <>
            <Modal open={handleModal}
                onClose={() => setOpen(false)}
                className={classStyles().modalsearch}
            >
                <Paper elevation={3}>
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
                    <Grid container justify="flex-end">
                        <Grid item>
                            <ModalFooter
                                dataset={mappedDataset}
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