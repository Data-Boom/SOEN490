import { Box, Grid } from "@material-ui/core"

import { DatasetRow } from "./DatasetRow"
import { IDatasetRowModel } from "../../Models/Graph/IGraphStateModel"
import React from 'react'

interface IProps {
  datasets: IDatasetRowModel[],
  onRemoveDatasetClick: (datasetId: number) => void,
  onHideDatasetSwitch: (datasetId: number) => void,
}

export const DatasetsList = (props: IProps) => {
  const { datasets, onRemoveDatasetClick, onHideDatasetSwitch } = { ...props }

  const renderDatasetRows = () => {
    return datasets && datasets.map(dataset => {
      return (
        <DatasetRow
          dataset={dataset}
          key={dataset.id}
          onRemoveDatasetClick={onRemoveDatasetClick}
          onHideDatasetSwitch={onHideDatasetSwitch}
        />
      )
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