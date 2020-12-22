import { Box, Grid, IconButton, Typography } from "@material-ui/core"

import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'
import { classStyles } from "../../appTheme"

interface IProps {
  dataset: ICompleteDatasetEntity,
  onRemoveDatasetClick: (datasetId: number) => void
}

export const DatasetRow = (props: IProps) => {

  return (
    <Grid item>
      <Box className={classStyles().defaultBorder} mt={5}>
        <Grid item container alignItems='center' justify='space-between'>
          <Typography>
            {props.dataset.name}
          </Typography>
          <IconButton onClick={() => props.onRemoveDatasetClick(props.dataset.id)}>
            <DeleteIcon color='primary' />
          </IconButton>
        </Grid>
      </Box>
    </Grid>
  )
}
