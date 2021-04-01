import { Box, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Tooltip, Typography } from "@material-ui/core"
import { IDatasetRowModel, shapes } from "../../../Models/Datasets/IDatasetRowModel"
import React, { useState } from 'react'

import ColorPicker from 'material-ui-color-picker'
import DeleteIcon from '@material-ui/icons/Delete'
import { IRowProps } from "../../Utils/List"
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'
import { classStyles } from "../../../appTheme"

export interface IDatasetRowProps {
  onRemoveDatasetClick: (datasetId: number) => void,
  onHideDatasetSwitch: (datasetId: number) => void,
  onChangeDatasetShape: (datasetId: number, bulletType: string) => void,
  onChangeDatasetColor: (datasetId: number, color: string) => void
}

export const DatasetRow = (props: IDatasetRowProps | IRowProps<IDatasetRowModel>) => {
  const { row: datasetRow, onRemoveDatasetClick, onHideDatasetSwitch, onChangeDatasetShape, onChangeDatasetColor } = { ...props }
  const [isHidden, setIsHidden] = useState(datasetRow.isInitiallyHidden)
  const [color, setColor] = useState(datasetRow.color || '#000')
  const [shape, setShape] = useState(datasetRow.shape)

  const handleHiddenSwitch = () => {
    setIsHidden(!isHidden)
    onHideDatasetSwitch(datasetRow.id)
  }

  const onDatasetShapeChange = (event: React.ChangeEvent<{ value: string }>) => {
    const type = event.target.value as string
    setShape(type)
    onChangeDatasetShape(datasetRow.id, type)
  }

  const onDatasetColorChange = (newColor: string) => {
    setColor(newColor)
    onChangeDatasetColor(datasetRow.id, newColor)
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
          <Grid item xs={3}>
            <ColorPicker
              name='color'
              InputProps={{ value: color }}
              label={"Choose Color"}
              value={color}
              fullWidth
              showPicker={false}
              onChange={newColor => onDatasetColorChange(newColor)}
            />
          </Grid>
          <Grid item sm={4}>
            <FormControl fullWidth>
              <InputLabel id={`${datasetRow.name}ShapeLabel`}>{datasetRow.name} Shape</InputLabel>
              <Select
                labelId={`${datasetRow.name}Shape`}
                fullWidth
                id={`${datasetRow.name}Shape`}
                value={shape}
                autoWidth={true}
                onChange={onDatasetShapeChange}
              >
                {shapes.map(individualShape => (
                  <MenuItem key={individualShape} value={individualShape}>{individualShape}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )
}
