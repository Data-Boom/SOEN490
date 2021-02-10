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

interface IProps {
    onDatasetSelected: (foundDatasets: IDatasetModel) => void
}
export const DatasetFormModal = (props: IProps) => {

    const [dataset, setDataset] = useState<IDatasetModel>()
    const { onDatasetSelected } = { ...props }
    const [open, setOpen] = useState(false)
    const [editable, setEditable] = useState(false)

    console.log("datasetFormModal opened")
    const handleDatasetSelected = (selectedDataset: IDatasetModel) => {
        onDatasetSelected(selectedDataset)
        setOpen(false)
    }

    const handleCloseDataset = () => {
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
                        onSubmit={handleDatasetSelected}
                        initialDataset={dataset}
                        editable={editable}
                        buttonName="Close"
                    />
                </Box>
            </Paper>

        </Modal>
    )
}