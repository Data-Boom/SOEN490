import { Box, Grid } from "@material-ui/core"

import { DatasetRow } from "./DatasetRow"
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import React from 'react'

interface IProps {
  datasets: IDatasetModel[],
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
        <Box className="result-checkbox" >
          {renderDatasetRows()}
        </Box>
      </Grid>
    </>
  )
}