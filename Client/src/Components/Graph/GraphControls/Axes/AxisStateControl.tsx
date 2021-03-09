import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@material-ui/core"
import { IDatasetModel, IVariable } from "../../../../Models/Datasets/IDatasetModel"
import { IDimensionModel, IUnitModel } from "../../../../Models/Dimensions/IDimensionModel"
import React, { useState } from "react"

import { IAxisStateModel } from '../../../../Models/Graph/IGraphStateModel'
import SnackbarUtils from "../../../Utils/SnackbarUtils"
import { getVariableDimensionRepresentation } from "../../../../Common/Helpers/DimensionHelpers"

interface IProps {
  axisName: string
  axisState: IAxisStateModel
  dimensions: IDimensionModel[]
  datasets: IDatasetModel[]
  onAxisChange: (newAxis: IAxisStateModel) => void
}

export const getVariableDimensionId = (datasets: IDatasetModel[], variableName: string): number => {
  const variableDimensions = getVariableDimensionRepresentation(datasets, variableName)

  let index = ''
  let size = -1
  for (const key in variableDimensions) {
    if (variableDimensions[key].length > size) {
      index = key
      size = variableDimensions[key].length
    }
  }

  const incorrectDatasets = []
  for (const key in variableDimensions) {
    if (key != index) {
      for (const id in variableDimensions[key]) {
        const data = datasets.find(dataset => dataset.id == Number(id))
        incorrectDatasets.push(data.dataset_name)
      }
    }
  }
  if (incorrectDatasets.length > 0) {
    SnackbarUtils.warning('The following datasets have the incorrect IDs: ' + incorrectDatasets.toString())
  }
  return Number(index)
}

export const buildVariableList = (datasets: IDatasetModel[]): IVariable[] => {
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

export const getMissingDatasetNames = (type: string, datasets: IDatasetModel[]): string[] => {
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
  return missingDatasets
}

export const AxisStateControl = (props: IProps) => {
  const { axisName, axisState, dimensions, datasets, onAxisChange } = props
  const [units, setUnits] = useState<IUnitModel[]>([])
  const [datasetsMissingVariable, setMissingDatasets] = useState<string[]>(getMissingDatasetNames(axisState.variableName, datasets))
  const variables = buildVariableList(datasets)

  const handleUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    onAxisChange({ ...axisState, units: event.target.value as number })
  }

  const updateUnitsState = (newVariableName: string) => {
    const dimensionId = getVariableDimensionId(datasets, newVariableName)
    if (!dimensionId) {
      SnackbarUtils.error(`was not able to identify the dimension of the ${newVariableName} varaible`)
      return
    }

    const dimension = dimensions.find(dimension => dimension.id == dimensionId)
    setUnits(dimension.units)
  }

  const handleVariableChange = (event: React.ChangeEvent<{ value: string }>) => {
    const newSelectedVariable = event.target.value
    updateUnitsState(newSelectedVariable)
    setMissingDatasets(getMissingDatasetNames(event.target.value, datasets))
    onAxisChange({ ...axisState, variableName: newSelectedVariable })
  }

  return (
    <Grid container spacing={4} justify='space-between'>
      <Grid item>
        <FormControl>
          <InputLabel id={`${axisName}VariableLabel`}>{axisName} Variable</InputLabel>
          <Select
            labelId={`${axisName}Variable`}
            id={`${axisName}Variable`}
            value={axisState.variableName}
            autoWidth={true}
            onChange={handleVariableChange}
          >
            {variables.map(variable => (
              <MenuItem key={variable.name} value={variable.name}>{variable.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <FormControl>
          <InputLabel id={`${axisName}Units`}>{axisName} Units</InputLabel>
          <Select
            labelId={`${axisName}Units`}
            id={`${axisName}Units`}
            value={axisState.units}
            autoWidth={true}
            onChange={handleUnitChange}
          >
            {units.map(unit => (
              <MenuItem key={unit.name} value={unit.id}>{unit.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Typography align="center">
          Datasets Missing {axisName}: {datasetsMissingVariable.toString()}
        </Typography>
      </Grid>
    </Grid>
  )
}