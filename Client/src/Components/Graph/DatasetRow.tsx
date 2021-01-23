import { Box, Grid, IconButton, Typography } from "@material-ui/core"
import React, { useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { IDatasetRowModel } from "../../Models/Graph/IGraphStateModel"
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { classStyles } from "../../appTheme"

interface IProps {
  dataset: IDatasetRowModel,
  onRemoveDatasetClick: (datasetId: number) => void,
  onHideDatasetSwitch: (datasetId: number) => void,
}

export const DatasetRow = (props: IProps) => {
  const { dataset, onRemoveDatasetClick, onHideDatasetSwitch } = { ...props }
  const [isHidden, setIsHidden] = useState(dataset.isInitiallyHidden)

  const handleHiddenSwitch = () => {
    setIsHidden(!isHidden)
    onHideDatasetSwitch(dataset.id)
  }

  return (
    <Grid item>
      <Box className={classStyles().datasetBorder} p={1}>
        <Grid item container alignItems='center' justify='space-between'>
          <Grid container justify="flex-start" xs={9}>
            <Typography variant="body2" noWrap>
              {dataset.name}
            </Typography>
          </Grid>
          <IconButton onClick={() => onRemoveDatasetClick(dataset.id)}>
            <DeleteIcon color='primary' />
          </IconButton>
          <IconButton onClick={handleHiddenSwitch}>
            {isHidden ? <VisibilityOffIcon color='primary' /> : <VisibilityIcon color='primary' />}
          </IconButton>
        </Grid>
      </Box>
    </Grid>
  )
}
