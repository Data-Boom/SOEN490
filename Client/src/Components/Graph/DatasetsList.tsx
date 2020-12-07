import { Box, Grid } from "@material-ui/core"

import { DatasetRow } from "./DatasetRow"
import { ICompleteDatasetEntity } from "../../Models/Datasets/ICompleteDatasetEntity"
import React from 'react'

interface IProps {
  datasets: ICompleteDatasetEntity[],
  onRemoveDatasetClick: (datasetId: number) => void
}

export const DatasetsList = (props: IProps) => {

  const renderDatasetRows = () => {
    return props && props.datasets && props.datasets.map(dataset => {
      return (<DatasetRow dataset={dataset} key={dataset.id} onRemoveDatasetClick={props.onRemoveDatasetClick} />)
    })
  }

  return (
    <>
      <Grid item container direction='column' spacing={3}>
        <Box >
          {renderDatasetRows()}
        </Box>
      </Grid>
    </>
  )
}