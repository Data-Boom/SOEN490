import { Box, Button, Grid } from "@material-ui/core"
import { IApprovedDatasetModel, IFlaggedDatasetQuery } from "../../Models/Datasets/IApprovedDatasetModel"
import { IData, IDatasetMeta, IDatasetModel, IReference } from '../../Models/Datasets/IDatasetModel'
import React, { useRef, useState } from "react"
import { approvedDataset, callRejectDataset } from "../../Remote/Endpoints/DatasetEndpoint"

import { DatasetModal } from "./DatasetModal"
import { FormikProps } from 'formik'
import { IFormProps } from "../Forms/IFormikForm"

interface IProps {
  dataset: IApprovedDatasetModel,
}

export const UserReviewRow = (props: IProps) => {

  const [open, setOpen] = useState(false)
  //const [dataset, setDataset] = useState<IDatasetModel>()
  const formikReference = useRef<FormikProps<unknown>>()
  const { dataset } = { ...props }


  const handleDeleteDataset = async () => {
    await callRejectDataset(dataset.id)
    setOpen(false)
    reload()
  }

  const handleApproveDataset = async (datasetId: number) => {
    const query: IFlaggedDatasetQuery = { datasetId: dataset.id }
    await approvedDataset(query)
    setOpen(false)
    reload()
  }

  const handleSubmitDataset = (formDataset: IDatasetModel) => {
    const newAppovalDataset: IApprovedDatasetModel = { ...formDataset, datasetFlaggedComment: dataset.datasetFlaggedComment, datasetIsFlagged: dataset.datasetIsFlagged }
    const query: IFlaggedDatasetQuery = { datasetId: dataset.id }

  }

  const handleCheck = () => {
    setOpen(true)
  }

  const reload = () => {
    window.location.reload()
  }

  return (
    <Box>
      <Grid item>
        <Button size="small" id="view-dataset" onClick={() => setOpen(true)} color="primary" variant="contained">{dataset.dataset_name} </Button>
      </Grid>
      <Grid item>
        <p> {dataset.datasetFlaggedComment} </p>
      </Grid>
      <Grid style={{ padding: '3px 10px', margin: '5px 0' }}>
        < DatasetModal
          singleDataset={dataset}
          handleApproveDataset={handleApproveDataset}
          handleDeleteDataset={handleDeleteDataset}
          handleSubmitDataset={handleSubmitDataset}
          setOpen={setOpen}
          open={open}
        />
      </Grid>
    </Box>
  )

}