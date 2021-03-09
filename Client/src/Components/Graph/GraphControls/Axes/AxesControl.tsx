import { Box, Button, Grid } from "@material-ui/core"
import React, { useState } from "react"

import { AxisStateControl } from "./AxisStateControl"
import { IAxisStateModel } from '../../../../Models/Graph/IGraphStateModel'
import { IDatasetModel } from "../../../../Models/Datasets/IDatasetModel"
import { IDimensionModel } from "../../../../Models/Dimensions/IDimensionModel"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { classStyles } from "../../../../appTheme"

interface IProps {
  datasets: IDatasetModel[],
  axes: IAxisStateModel[],
  dimensions: IDimensionModel[],
  onAxesChange: (axes: IAxisStateModel[]) => void
}

export const AxesControl = (props: IProps) => {
  const { datasets, axes, onAxesChange, dimensions } = { ...props }
  const classes = classStyles()

  const [showSettings, setSettingsToggle] = useState(true)

  const handleSettingsClick = () => {
    setSettingsToggle(!showSettings)
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Button id='settingsToggle' variant="contained" onClick={handleSettingsClick} color="primary">
            Settings
            {showSettings ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Button>
        </Grid>
        {showSettings &&
          //todo resolve Grid
          <Grid item xs={12}>
            <Box className={classes.defaultBorder}>
              <Grid container spacing={4}>
                <AxisStateControl axisName='x' axisState={axes[0]} onAxisChange={axis => onAxesChange([{ ...axis }, { ...axes[1] }])} datasets={datasets} dimensions={dimensions} />
                <AxisStateControl axisName='y' axisState={axes[1]} onAxisChange={axis => onAxesChange([{ ...axes[0] }, { ...axis }])} datasets={datasets} dimensions={dimensions} />
              </Grid>
            </Box>
          </Grid>
        }
      </Grid>
    </>
  )
}