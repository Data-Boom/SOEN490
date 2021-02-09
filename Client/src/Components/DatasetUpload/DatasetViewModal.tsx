import { Box, Grid, Modal, Paper, ThemeProvider, Typography } from '@material-ui/core'
import { FastField, Field, FieldArray } from 'formik'
import React, { useState } from 'react'
import { classStyles } from '../../appTheme'
import { IDatasetModel, IMaterial } from '../../Models/Datasets/IDatasetModel'
import { get } from '../../Remote/FluentRequest'
import { disabledTheme, shouldComponentUpdate } from '../Forms/ComponentUpdate'
import { MuiTextFieldFormik, MuiSelectFormik } from '../Forms/FormikFields'
import SearchView from '../Search/SearchView'
import { DatasetUploadForm } from './DatasetUploadForm'
import CancelIcon from "@material-ui/icons/Cancel"

/*interface IProps {
    dataset: IDatasetModel,
    editable: boolean,
    onSubmit(formDataset: IDatasetModel): void,
    buttonName: string
}*/

interface IProps {
    onDatasetSelected: (selectedDataset: IDatasetModel) => void
}

//render DatasetUploadForm.tsx
export const DatasetFormModal = (props: IProps) => {

    const [dataset, setDataset] = useState<IDatasetModel>()
    const { onDatasetSelected } = { ...props }
    const [open, setOpen] = useState(false)

    const handleDatasetSelected = (selectedDataset: IDatasetModel) => {
        onDatasetSelected(selectedDataset)
        setOpen(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Modal open={open}
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
                        onSubmit={handleClose}
                        initialDataset={dataset}
                        editable={false}
                        buttonName="Close"
                    />
                </Box>
            </Paper>

        </Modal>
    )
}