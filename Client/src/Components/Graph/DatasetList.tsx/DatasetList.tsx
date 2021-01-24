import { DatasetRow } from "./DatasetRow"
import { Grid } from "@material-ui/core"
import { IDatasetRowModel } from "../../../Models/Graph/IGraphStateModel"
import React from 'react'

interface IProps {
  datasets: IDatasetRowModel[],
  onRemoveDatasetClick: (datasetId: number) => void,
  onHideDatasetSwitch: (datasetId: number) => void,
}

export const DatasetList = (props: IProps) => {
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
    <Grid container direction='column' spacing={1}>
      {renderDatasetRows()}
    </Grid>
  )
}