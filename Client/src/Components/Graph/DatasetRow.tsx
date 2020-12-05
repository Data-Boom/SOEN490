import { Box, Button, Grid, IconButton, Paper, Typography, makeStyles, useTheme } from "@material-ui/core"

import { IDatasetModel } from "../../Models/Datasets/IDatasetModel"
import React from 'react'
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

interface IProps {
  dataset: IDatasetModel,
  onRemoveDatasetClick: (datasetId: number) => void
}

export const DatasetRow = (props: IProps) => {
  console.log("got to row, rendering")
  const theme = useTheme()

  const classes = makeStyles({
    paperColor: {
      background: theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      borderRadius: 3,
      border: 0,
      padding: '0 30px'
    },
  })()
  return (
    <Grid item>
      <Box className={classes.paperColor} mt={5}>
        <Grid item container alignItems='center' justify='space-between'>
          <Typography>
            id: {props && props.dataset && props.dataset.id}, color: {props && props.dataset && props.dataset.color}
          </Typography>
          <IconButton onClick={() => props.onRemoveDatasetClick(props.dataset.id)}>
            <RemoveCircleIcon color='secondary' />
          </IconButton>
        </Grid>
      </Box>
    </Grid>
  )
}
