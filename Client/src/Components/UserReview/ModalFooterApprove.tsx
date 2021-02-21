import { Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';

import { FormikValues } from 'formik';
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel';
import { IDatasetModel } from '../../Models/Datasets/IDatasetModel';

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
      <Grid container xs={9} sm={9} spacing={7} style={{ margin: 2 }}>
        <Grid item xs={3} sm={3}>
          <Button size="large" id="cancel-dataset" onClick={handleCancelDataset} color="primary" variant="contained">{"Cancel"}</Button>
        </Grid>
        <Grid item xs={3} sm={3}></Grid>
        <Grid item xs={3} sm={3}>
          <Button size="large" id="Submit-dataset" onClick={() => formikReference.current.handleSubmit()} color="primary" variant="contained">{'Submit'}</Button>
        </Grid>
      </Grid>
    </>
  )
}
