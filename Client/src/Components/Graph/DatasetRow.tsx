import { Button, Grid, IconButton, Typography } from "@material-ui/core"

import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import React from 'react'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

interface IProps {
  dataset: IDatasetModel,
  onRemoveDatasetClick: (datasetId: number) => void
}

export const DatasetRow = (props: IProps) => {
  console.log("got to row, rendering")

  return (
    <Grid item container alignItems='center'>
      <Typography>
        id: {props && props.dataset && props.dataset.id}, color: {props && props.dataset && props.dataset.color}
      </Typography>
      <IconButton onClick={() => props.onRemoveDatasetClick(props.dataset.id)}>
        <RemoveCircleIcon color='secondary' />
      </IconButton>
    </Grid>
  )
}
