import { Box, Grid, Paper, Typography } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'

import CancelIcon from "@material-ui/icons/Cancel"
import { DatasetForm } from '../DatasetUpload/DatasetForm'
import { FormikProps } from 'formik'
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'
import Modal from '@material-ui/core/Modal/Modal'
import { ModalFooter } from './ModalFooter'
import { ModalFooterApprove } from './ModalFooterApprove'
import { classStyles } from '../../appTheme'
import { fixPartialForform } from '../DatasetUpload/DatasetView'

interface IProps {
  singleDataset: IApprovedDatasetModel,
  handleApproveDataset: (datasetId: number) => void,
  handleDeleteDataset: () => void,
  handleSubmitDataset: (formDataset: IDatasetModel) => void,
  setOpen: (value: boolean) => void
  open: boolean
}

export const DatasetModal = (props: IProps) => {

  const { open, setOpen } = { ...props }
  const [dataset, setDataset] = useState<IDatasetModel>()
  const [editable, setEditable] = useState(false)
  const mappedDataset: IDatasetModel = { ...props.singleDataset }
  const { handleApproveDataset, handleDeleteDataset, handleSubmitDataset } = { ...props }
  const [editOn, steEditOn] = useState(true)
  const formikReference = useRef<FormikProps<unknown>>()

  useEffect(() => {
    setDataset(fixPartialForform(mappedDataset))
    console.log(mappedDataset)
  }, [])

  const handleEditDataset = () => {
    steEditOn(!editOn)
    setEditable(!editable)
  }

  return (
    <>
      <Modal open={open}
        onClose={() => setOpen(false)}
        className={classStyles().modalsearch}
        style={{ paddingLeft: "240px", height: "80%", marginTop: "100px" }}
      >
        <Paper elevation={3} style={{ width: "80%", height: "100%" }}>
          <Box m={5}>
            <Grid container justify="space-between">
              <Grid item justify="flex-start">
                <Typography variant="h5">
                  Dataset Review
                </Typography>
              </Grid>
              <Grid item justify="flex-end">
                <CancelIcon color="primary" onClick={() => setOpen(false)} />
              </Grid>
            </Grid>
            <DatasetForm
              onSubmit={handleSubmitDataset}
              initialDataset={dataset}
              editable={editable}
              formikReference={formikReference}
            />
          </Box>
          <Grid container justify="flex-end" alignItems="center">
            <Grid item>
              {editOn ? <ModalFooter
                dataset={dataset}
                handleApproveDataset={handleApproveDataset}
                handleDeleteDataset={handleDeleteDataset}
                handleEditDataset={handleEditDataset}
              /> :
                <ModalFooterApprove
                  dataset={dataset}
                  handleSubmitDataset={handleSubmitDataset}
                  handleCancelDataset={handleEditDataset}
                  formikReference={formikReference}
                />
              }
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  )
}