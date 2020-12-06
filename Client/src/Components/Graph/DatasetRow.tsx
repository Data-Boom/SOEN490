import { Box, Grid, IconButton, Typography, makeStyles, useTheme } from "@material-ui/core"

import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import React from 'react'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

interface IProps {
  dataset: IDatasetModel,
  onRemoveDatasetClick: (datasetId: number) => void
}

export const DatasetRow = (props: IProps) => {
  const theme = useTheme()

  const classes = makeStyles({
    paperColor: {
      borderColor: theme.palette.primary.light,
      borderRadius: 3,
      borderWidth: '2px',
      border: 'solid',
      padding: '0 30px'
    },
  })()

  return (
    <Grid item>
      <Box className={classes.paperColor} mt={5}>
        <Grid item container alignItems='center' justify='space-between'>
          <Typography>
            {props.dataset.name}
          </Typography>
          <IconButton onClick={() => props.onRemoveDatasetClick(props.dataset.id)}>
            <RemoveCircleIcon color='secondary' />
          </IconButton>
        </Grid>
      </Box>
    </Grid>
  )
}
