import { Box, Grid, IconButton, Typography } from "@material-ui/core"

import DeleteIcon from '@material-ui/icons/Delete'
import { ICompleteDatasetEntity } from "../../Models/Datasets/ICompleteDatasetEntity"
import React from 'react'
import { classStyles } from "../../appTheme"

interface IProps {
  dataset: ICompleteDatasetEntity,
  onRemoveDatasetClick: (datasetId: number) => void
}

export const DatasetRow = (props: IProps) => {
  return (
    <Grid item>
      <Box className={classStyles().datasetBorder} p={1}>
        <Grid item container alignItems='center' justify='space-between'>
          <Grid container justify="flex-start" xs={9}>
            <Typography variant="body2" noWrap>
              {props.dataset.name}
            </Typography>
          </Grid>
          <IconButton onClick={() => props.onRemoveDatasetClick(props.dataset.id)}>
            <DeleteIcon color='primary' />
          </IconButton>
        </Grid>
      </Box>
    </Grid>
  )
}
