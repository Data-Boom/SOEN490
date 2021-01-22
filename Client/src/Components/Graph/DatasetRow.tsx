import { Box, Grid, IconButton, Typography } from "@material-ui/core"

import DeleteIcon from '@material-ui/icons/Delete'
import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import React from 'react'
import { classStyles } from "../../appTheme"

interface IProps {
  dataset: IDatasetModel,
  onRemoveDatasetClick: (datasetId: number) => void
}

export const DatasetRow = (props: IProps) => {
  return (
    <Grid item>
      <Box className={classStyles().defaultBorder} mt={5}>
        <Grid item container alignItems='center' justify='space-between'>
          <Typography>
            {props.dataset.dataset_name}
          </Typography>
          <IconButton onClick={() => props.onRemoveDatasetClick(props.dataset.id)}>
            <DeleteIcon color='primary' />
          </IconButton>
        </Grid>
      </Box>
    </Grid>
  )
}
