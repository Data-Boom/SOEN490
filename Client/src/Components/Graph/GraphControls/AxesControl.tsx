import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core"
import { IData, IDatasetModel, IVariable } from "../../../Models/Datasets/IDatasetModel"
import { IDimensionModel, IUnitModel } from "../../../../../Server/src/models/interfaces/IDimension"
import React, { useEffect, useState } from "react"

import { IAxisStateModel } from '../../../Models/Graph/IGraphStateModel'
import { IVariableUnits } from '../../../Models/Datasets/IVariableModel'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { classStyles } from "../../../appTheme"

interface IProps {
  datasets: IDatasetModel[],
  axes: IAxisStateModel[],
  dimensions: IDimensionModel[],
  onAxesChange: (axes: IAxisStateModel[]) => void
}

const buildVariableList = (datasets: IDatasetModel[]): IVariable[] => {
  const variables: IVariable[] = []

  datasets.forEach(dataset => {
    dataset.data.variables.forEach(datasetVariable => {
      if (variables.findIndex(variable => variable.name == datasetVariable.name) == -1) {
        variables.push(datasetVariable)
      }
    })
  })

  return variables
}

export const AxesControl = (props: IProps) => {
  const { datasets, axes, onAxesChange, dimensions } = { ...props }
  const classes = classStyles()

  //todo unhardcode the variables
  const [showSettings, setSettingsToggle] = useState(true)

  const [xVariableMissing, setXVariableMissing] = useState([])
  const [yVariableMissing, setYVariableMissing] = useState([])
  const [xUnits, setXUnits] = useState<IUnitModel[]>([])
  const [yUnits, setYUnits] = useState<IUnitModel[]>([])
  const [variables, setVariables] = useState<IVariable[]>([])

  useEffect(() => {
    setVariables(buildVariableList(datasets))
  }, [datasets])

  //test 1999 dataset
  const getVariableDimensions = (datasets: IDatasetModel[], variableName): number => {

    const dictionary = {}
    const matchingDatasetID = []
    const dimensionID = []

    for (var i = 0; i < datasets.length; i++) {
      for (var j = 0; j < datasets[i].data.variables.length; j++) {
        if (datasets[i].data.variables[j].name == variableName) {

          dimensionID.push(datasets[i].data.variables[j].dimensionId)
          matchingDatasetID.push(datasets[i].id)
          dictionary[datasets[i].data.variables[j].dimensionId] = matchingDatasetID
        }
      }
    }
    let index = '';
    let size = -1;
    for (let key in dictionary) {
      if (dictionary[key].length > size) {
        index = key
      }
    }
    return Number(index)
  }

  const updateXAxis = (axis: IAxisStateModel) => {
    onAxesChange([{ ...axis }, { ...axes[1] }])
  }

  const updateYAxis = (axis: IAxisStateModel) => {
    onAxesChange([{ ...axes[0] }, { ...axis }])
  }

  const modifyUnits = (variable: string, dimensionId: number): number => {
    let measurement: IUnitModel;
    console.log(dimensionId)
    const targetDimension: IDimensionModel = dimensions.find(dimension => dimension.id == dimensionId)
    console.log(targetDimension)
    if (variable == 'x') {
      setXUnits(targetDimension.units)
      measurement = targetDimension.units[0]
    }
    else if (variable == 'y') {
      setYUnits(targetDimension.units)
      measurement = targetDimension.units[0]
    }
    return measurement.id
  }

  const handleSettingsClick = () => {
    setSettingsToggle(!showSettings)
  }

  //todo remove all the as strings and value: string should be, if works
  const handleXVariableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let sameVariable = false, tempVariable = '', xUnit = 0, yUnit = 0
    if (axes[1].variableName == (event.target.value as string)) {
      tempVariable = axes[0].variableName
      sameVariable = true
      yUnit = modifyUnits('y', getVariableDimensions(datasets, tempVariable))
      checkYVariablesExist(tempVariable, datasets)
    }
    xUnit = modifyUnits('x', getVariableDimensions(datasets, (event.target.value as string)))
    checkXVariablesExist(event.target.value as string, datasets)
    if (sameVariable == true) {
      //todo should not do magic updates
      updateYAxis({ ...axes[1], variableName: tempVariable, units: yUnit })
    }
    updateXAxis({ ...axes[0], variableName: event.target.value as string, units: xUnit })
  }
  const handleYVariableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    let sameVariable = false, tempVariable = '', xUnit = 0, yUnit = 0
    if (axes[0].variableName == (event.target.value as string)) {
      tempVariable = axes[1].variableName
      sameVariable = true
      xUnit = modifyUnits('x', getVariableDimensions(datasets, tempVariable))
      checkXVariablesExist(tempVariable, datasets)
    }
    yUnit = modifyUnits('y', getVariableDimensions(datasets, (event.target.value as string)))
    checkYVariablesExist(event.target.value as string, datasets)
    //todo should not do magic updates
    if (sameVariable == true) {
      updateXAxis({ ...axes[1], variableName: tempVariable, units: xUnit })
    }

    updateYAxis({ ...axes[0], variableName: event.target.value as string, units: yUnit })
  }
  const handleXUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    updateXAxis({ ...axes[0], units: event.target.value as number })
  }
  const handleYUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    updateYAxis({ ...axes[1], units: event.target.value as number })
  }
  /*
  const handleXUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    updateXAxis({ ...axes[0], units: event.target.value as IUnitModel })
  }
  const handleYUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    updateYAxis({ ...axes[1], units: event.target.value as IUnitModel })
  }
  */

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
                      <InputLabel id="xVariableLabel">X Variable</InputLabel>
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
                        {xUnits.map(unit => (
                          <MenuItem value={unit.id}>{unit.name}</MenuItem>
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
                      <InputLabel id="yVariableLabel">Y Variable</InputLabel>
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
                        {yUnits.map(unit => (
                          <MenuItem value={unit.id}>{unit.name}</MenuItem>
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