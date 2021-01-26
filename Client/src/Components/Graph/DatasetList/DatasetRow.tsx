import { Box, Grid, IconButton, Typography, Tooltip } from "@material-ui/core"
import React, { useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { IDatasetRowModel } from "../../../Models/Datasets/IDatasetRowModel"
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { classStyles } from "../../../appTheme"

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
      <Box className={classStyles().datasetBorder}>
        <Grid container alignItems='center' justify='space-between'>
          <Grid item container justify='flex-start' xs={3}>
            <Typography variant="body2" noWrap>
              {dataset.name}
            </Typography>
          </Grid>
          <Grid item xs={7}>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Show/Hide datasets on graph">
              <IconButton onClick={handleHiddenSwitch}>
                {isHidden ? <VisibilityOffIcon color='primary' /> : <VisibilityIcon color='primary' />}
              </IconButton>
            </Tooltip>

          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Remove dataset">
              <IconButton onClick={() => onRemoveDatasetClick(dataset.id)}>
                <DeleteIcon color='primary' />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
