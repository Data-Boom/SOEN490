import React, { useEffect, useState } from 'react'

import { AdminReviewRow } from "./AdminReviewRow"
import { Grid } from "@material-ui/core"
import { IApprovedDatasetModel } from '../../Models/Datasets/IApprovedDatasetModel'
import { getUnapprovedDatasets } from "../../Remote/Endpoints/DatasetEndpoint"

interface IAdminListprops {
  datasets: IApprovedDatasetModel[]
  onChange(formDataset: IApprovedDatasetModel): void
  update: number
}
export const AdminReviewList = (props: IAdminListprops) => {

  const [datasets, setDatasets] = useState(props.datasets)

  useEffect(() => {
    const callListDatasetStates = async () => {
      const datasetState = await getUnapprovedDatasets()
      setDatasets(datasetState)
    }
    callListDatasetStates()
  }, [props.update])

  const renderAdminDatasetRows = () => {
    return datasets && datasets.map(datasets => {
      return (
      )
    })
  }
  return (
    <Grid container direction='column' spacing={1}>
      {renderAdminDatasetRows()}
    </Grid>
  )
}