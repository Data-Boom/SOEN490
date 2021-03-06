import { Box, Button, Grid } from "@material-ui/core"
import React, { useState } from "react"

import { AxisStateControl } from "./AxisStateControl"
import { IAxisStateModel } from '../../../../Models/Graph/IGraphStateModel'
import { IDatasetModel } from "../../../../Models/Datasets/IDatasetModel"
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { classStyles } from "../../../../appTheme"

interface IProps {
  datasets: IDatasetModel[],
  axes: IAxisStateModel[],
  onAxesChange: (axes: IAxisStateModel[]) => void
}

export const AxesControl = (props: IProps) => {
  const { datasets, axes, onAxesChange } = { ...props }

  const classes = classStyles()

  const [showSettings, setSettingsToggle] = useState(true)

  const handleSettingsClick = () => {
    setSettingsToggle(!showSettings)
  }

  return (
    <>
      <Grid container justify="center" direction="column">
        <Grid item>
          <Button id='settingsToggle' variant="contained" onClick={handleSettingsClick} color="primary">
            Settings
            {showSettings ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </Button>
        </Grid>
        {showSettings &&
          <Grid item>
            <Box className={classes.defaultBorder}>
              <AxisStateControl axisName='x' axisState={axes[0]} onAxisChange={axis => onAxesChange([{ ...axis }, { ...axes[1] }])} datasets={datasets} />
              <AxisStateControl axisName='y' axisState={axes[1]} onAxisChange={axis => onAxesChange([{ ...axes[0] }, { ...axis }])} datasets={datasets} />
            </Box>
          </Grid>
        }
      </Grid>
    </>
  )
}