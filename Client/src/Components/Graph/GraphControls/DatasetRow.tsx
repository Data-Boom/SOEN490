import { Box, Grid, IconButton, Tooltip, Typography } from "@material-ui/core"
import React, { useState } from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import { IDatasetRowModel } from "../../../Models/Datasets/IDatasetRowModel"
import { IRowProps } from "../../Utils/List"
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { classStyles } from "../../../appTheme"

export interface IDatasetRowProps {
  onRemoveDatasetClick: (datasetId: number) => void,
  onHideDatasetSwitch: (datasetId: number) => void,
}

//todo try out the | syntax
export const DatasetRow = (props: IDatasetRowProps | IRowProps<IDatasetRowModel>) => {
  const { row: datasetRow, onRemoveDatasetClick, onHideDatasetSwitch } = { ...props }
  const [isHidden, setIsHidden] = useState(datasetRow.isInitiallyHidden)

  const handleHiddenSwitch = () => {
    setIsHidden(!isHidden)
    onHideDatasetSwitch(datasetRow.id)
  }

  return (
    <Grid item>
      <Box className={classStyles().fitBorder}>
        <Grid container alignItems='center' justify='space-between'>
          <Grid item container justify='flex-start' xs={3}>
            <Typography variant="body2" noWrap>
              {datasetRow.name}
            </Typography>
          </Grid>
          <Grid item xs={7}>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Show/Hide datasets on graph">
              <IconButton id="ShowHideDataset" onClick={handleHiddenSwitch}>
                {isHidden ? <VisibilityOffIcon color='primary' /> : <VisibilityIcon color='primary' />}
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item xs={1}>
            <Tooltip title="Remove dataset">
              <IconButton id="RemoveDataset" onClick={() => onRemoveDatasetClick(datasetRow.id)}>
                <DeleteIcon color='primary' />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
