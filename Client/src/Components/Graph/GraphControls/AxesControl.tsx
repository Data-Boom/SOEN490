import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@material-ui/core"
import { IDatasetModel, IVariable } from "../../../Models/Datasets/IDatasetModel"
import React, { useEffect, useState } from "react"

import { IAxisStateModel } from '../../../Models/Graph/IGraphStateModel'
import { IVariableUnits } from '../../../Models/Datasets/IVariableModel'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { classStyles } from "../../../appTheme"

interface IProps {
  datasets: IDatasetModel[],
  axes: IAxisStateModel[],
  onAxesChange: (axes: IAxisStateModel[]) => void
}

const buildVariableList = (datasets: IDatasetModel[]): IVariable[] => {
  const variables: IVariable[] = []

  datasets.forEach(dataset => {
    dataset.data.variables.forEach(datasetVariable => {
      if (variables.findIndex(variable => variable.name == datasetVariable.name) == -1) {
        variables.push(datasetVariable)
      }
    });
  })

  return variables
}

export const AxesControl = (props: IProps) => {
  const { datasets, axes, onAxesChange } = { ...props }
  const classes = classStyles()

  //todo unhardcode the variables
  const [showSettings, setSettingsToggle] = useState(true)

  const [xVariableMissing, setXVariableMissing] = useState([])
  const [yVariableMissing, setYVariableMissing] = useState([])
  const [xUnits, setXUnits] = useState([])
  const [yUnits, setYUnits] = useState([])
  const [variables, setVariables] = useState<IVariable[]>([])

  useEffect(() => {
    setVariables(buildVariableList(datasets))
  }, [datasets])

  const updateXAxis = (axis: IAxisStateModel) => {
    onAxesChange([{ ...axis }, { ...axes[1] }])
  }

  const updateYAxis = (axis: IAxisStateModel) => {
    onAxesChange([{ ...axes[0] }, { ...axis }])
  }

  const setUnitType = (variable: string, type: string): string => {
    let measurement = ''
    IVariableUnits.forEach(variables => {
      const units = variables.units
      variables.variableNames.forEach(name => {
        if (type == name) {
          if (variable == 'x') {
            setXUnits(units)
            measurement = units[0]
          }
          else if (variable == 'y') {
            setYUnits(units)
            measurement = units[0]
          }
        }
      })
    })
    return measurement
  }

  const handleSettingsClick = () => {
    setSettingsToggle(!showSettings)
  }

  //todo remove all the as strings and value: string should be, if works
  const handleXVariableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let sameVariable = false, tempVariable = '', xUnit = '', yUnit = ''
    if (axes[1].variableName == (event.target.value as string)) {
      tempVariable = axes[0].variableName
      sameVariable = true
      yUnit = setUnitType('y', tempVariable)
      checkYVariablesExist(tempVariable, datasets)
    }
    xUnit = setUnitType('x', event.target.value as string)
    checkXVariablesExist(event.target.value as string, datasets)
    if (sameVariable == true) {
      //todo should not do magic updates
      updateYAxis({ ...axes[1], variableName: tempVariable, units: yUnit })
    }

    updateXAxis({ ...axes[0], variableName: event.target.value as string, units: xUnit })
  }
  const handleYVariableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let sameVariable = false, tempVariable = '', xUnit = '', yUnit = ''
    if (axes[0].variableName == (event.target.value as string)) {
      tempVariable = axes[1].variableName
      sameVariable = true
      xUnit = setUnitType('x', tempVariable)
      checkXVariablesExist(tempVariable, datasets)
    }
    yUnit = setUnitType('y', event.target.value as string)
    checkYVariablesExist(event.target.value as string, datasets)
    //todo should not do magic updates
    if (sameVariable == true) {
      updateXAxis({ ...axes[1], variableName: tempVariable, units: xUnit })
    }

    updateYAxis({ ...axes[0], variableName: event.target.value as string, units: yUnit })
  }
  const handleXUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    updateXAxis({ ...axes[0], units: event.target.value as string })
  }
  const handleYUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    updateYAxis({ ...axes[1], units: event.target.value as string })
  }

  const checkXVariablesExist = (type: string, datasets: IDatasetModel[]) => {
    const missingDatasets = []
    datasets.forEach(dataset => {
      let exists = false
      dataset.data.variables.forEach(variableName => {
        if (variableName.name == type) {
          exists = true
        }
      })
      if (exists == false) {
        missingDatasets.push(dataset.dataset_name)
      }
    })
    setXVariableMissing(missingDatasets)
  }

  const checkYVariablesExist = (type: string, datasets: IDatasetModel[]) => {
    const missingDatasets = []
    datasets.forEach(dataset => {
      let exists = false
      dataset.data.variables.forEach(variableName => {
        if (variableName.name == type) {
          exists = true
        }
      })
      if (exists == false) {
        missingDatasets.push(dataset.dataset_name)
      }
    })
    setYVariableMissing(missingDatasets)
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
          <>
            <Grid item xs={12}>
              <Box className={classes.defaultBorder}>
                <Grid container spacing={4}>
                  <Grid item xs={4}>
                    <FormControl>
                      <InputLabel id="xVariable">X Variable</InputLabel>
                      <Select
                        labelId="xVariable"
                        id="xVariable"
                        value={axes[0].variableName}
                        autoWidth={true}
                        onChange={handleXVariableChange}
                      >
                        {variables.map(variable => (
                          <MenuItem value={variable.name}>{variable.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <InputLabel id="xUnits">X Units</InputLabel>
                      <Select
                        labelId="xUnits"
                        id="xUnits"
                        value={axes[0].units}
                        autoWidth={true}
                        onChange={handleXUnitChange}
                      >
                        {xUnits.map(type => (
                          <MenuItem value={type}>{type}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography align="center">
                      Datasets Missing X: {xVariableMissing.toString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <InputLabel id="yVariable">Y Variable</InputLabel>
                      <Select
                        labelId="yVariable"
                        id="yVariable"
                        value={axes[1].variableName}
                        autoWidth={true}
                        onChange={handleYVariableChange}
                      >
                        {variables.map(variable => (
                          <MenuItem value={variable.name}>{variable.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl>
                      <InputLabel id="yUnits">Y Units</InputLabel>
                      <Select
                        labelId="yUnits"
                        id="yUnits"
                        value={axes[1].units}
                        autoWidth={true}
                        onChange={handleYUnitChange}
                      >
                        {yUnits.map(type => (
                          <MenuItem value={type}>{type}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography align="center">
                      Datasets Missing Y: {yVariableMissing.toString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </>
        }
      </Grid>
    </>
  )
}