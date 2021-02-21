import { Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'

import { FormikValues } from 'formik'
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel'

interface IProps {
  dataset: IDatasetModel,
  handleSubmitDataset: (formDataset: IDatasetModel) => void,
  handleCancelDataset: () => void,
  formikReference: React.MutableRefObject<FormikValues>
}

export const ModalFooterApprove = (props: IProps) => {
  const { handleSubmitDataset, handleCancelDataset, formikReference } = { ...props }
  return (
    <>
      <Grid container xs={11} sm={11} spacing={4} style={{ margin: 2 }}>

        <Grid item xs={3} sm={3}>
          <Button style={{ maxWidth: '106.23px', maxHeight: '60px', minWidth: '106.23px', minHeight: '60px' }} id="cancel-dataset" onClick={handleCancelDataset} color="primary" variant="contained">{"Cancel"}</Button>
        </Grid>
        <Grid item xs={3} sm={3}></Grid>
        <Grid item xs={3} sm={3}>
          <Button style={{ maxWidth: '106.23px', maxHeight: '60px', minWidth: '106.23px', minHeight: '60px' }} id="Submit-dataset" onClick={() => formikReference.current.handleSubmit()} color="primary" variant="contained">{'Submit'}</Button>
        </Grid>
        <Grid item xs={2} sm={2}></Grid>
      </Grid>
    </>
  )
}
