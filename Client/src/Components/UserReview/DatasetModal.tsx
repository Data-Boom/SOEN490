import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@material-ui/core'
import { FormikProps, FormikValues } from 'formik'
import React, { useRef, useState } from 'react'

import CancelIcon from "@material-ui/icons/Cancel"
import { DatasetForm } from '../DatasetUpload/DatasetForm'
import { DefaultFormFooter } from '../Forms/DefaultFormFooter'
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import { ModalFooter } from './ModalFooter'

interface IProps {
  open: boolean
  dataset: IApprovedDatasetModel,
  setOpen: (value: boolean) => void
  handleApproveDataset: (datasetId: number) => void,
  handleDeleteDataset: () => void,
  handleSubmitDataset: (formDataset: IDatasetModel) => void,
}

export const DatasetModal = (props: IProps) => {
  const { open, dataset, setOpen, handleApproveDataset, handleDeleteDataset, handleSubmitDataset } = { ...props }
  const [isEditMode, setEditMode] = useState(false)
  const formikReference = useRef<FormikProps<unknown>>()

  const renderHeader = () => {
    return (
      <DialogTitle id="confirmation-dialog-title">
        <Grid container justify="space-between">
          <Typography variant="h6">
            Dataset Review
          </Typography>
          <CancelIcon color="primary" onClick={() => setOpen(false)} />
        </Grid>
      </DialogTitle>
    )
  }

  const handleFormCancel = (formikReference: React.MutableRefObject<FormikValues>) => {
    formikReference.current.resetForm()
    setEditMode(false)
  }

  const renderFooter = () => {
    return (
      <DialogActions>
        {isEditMode ?
          <DefaultFormFooter
            formikReference={formikReference}
            justify="flex-end"
            onCancel={handleFormCancel}
          />
          :
          <ModalFooter
            dataset={dataset}
            handleApproveDataset={handleApproveDataset}
            handleDeleteDataset={handleDeleteDataset}
            handleEditDataset={() => setEditMode(true)}
          />
        }
      </DialogActions>
    )
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
      >
        {renderHeader()}
        <DialogContent dividers>
          <DatasetForm
            onSubmit={handleSubmitDataset}
            initialDataset={dataset}
            editable={isEditMode}
            formikReference={formikReference}
          />
        </DialogContent>
        {renderFooter()}
      </Dialog>
    </>
  )
}