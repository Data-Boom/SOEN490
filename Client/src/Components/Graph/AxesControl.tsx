import * as svg from 'save-svg-as-png'

import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Paper, Select, Typography, makeStyles } from "@material-ui/core"
import { IDatasetModel, IVariable } from "../../Models/Datasets/IDatasetModel"
import { IVariableAndUnitModel, IVariableUnits } from '../../Models/Datasets/IVariableModel'
import React, { useState } from "react"

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

interface IProps {
    datasets: IDatasetModel[],
    variables: string[],
    axes: IVariableAndUnitModel,
    onAxesChange: (axes: IVariableAndUnitModel) => void
}

export const AxesControl = (props: IProps) => {

    //const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>(props.datasets)
    //todo unhardcode the variables
    const [showSettings, setSettingsToggle] = useState(false)
    //const [axes, setAxes] = useState<IVariableAndUnitModel>(props.axes)

    const [xVariableMissing, setXVariableMissing] = useState([])
    const [yVariableMissing, setYVariableMissing] = useState([])
    const [xUnits, setXUnits] = useState([])
    const [yUnits, setYUnits] = useState([])

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

    const handleXVariableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let sameVariable = false, tempVariable = '', xUnit = '', yUnit = ''
        if (props.axes.yVariableName == (event.target.value as string)) {
            tempVariable = props.axes.xVariableName
            sameVariable = true
            yUnit = setUnitType('y', tempVariable)
            checkYVariablesExist(tempVariable, props.datasets)
        }
        xUnit = setUnitType('x', event.target.value as string)
        checkXVariablesExist(event.target.value as string, props.datasets)
        if (sameVariable == true) {
            props.onAxesChange({ ...props.axes, xVariableName: event.target.value as string, yVariableName: tempVariable, xVariableUnits: xUnit, yVariableUnits: yUnit })
        }
        else {
            props.onAxesChange({ ...props.axes, xVariableName: event.target.value as string, xVariableUnits: xUnit })
        }
    }
    const handleYVariableChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        let sameVariable = false, tempVariable = '', xUnit = '', yUnit = ''
        if (props.axes.xVariableName == (event.target.value as string)) {
            tempVariable = props.axes.yVariableName
            sameVariable = true
            xUnit = setUnitType('x', tempVariable)
            checkXVariablesExist(tempVariable, props.datasets)
        }
        yUnit = setUnitType('y', event.target.value as string)
        checkYVariablesExist(event.target.value as string, props.datasets)
        if (sameVariable == true) {
            props.onAxesChange({ ...props.axes, yVariableName: event.target.value as string, xVariableName: tempVariable, xVariableUnits: xUnit, yVariableUnits: yUnit })
        }
        else {
            props.onAxesChange({ ...props.axes, yVariableName: event.target.value as string, yVariableUnits: yUnit })
        }
    }
    const handleXUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        props.onAxesChange({ ...props.axes, xVariableUnits: event.target.value as string })
    }
    const handleYUnitChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        props.onAxesChange({ ...props.axes, yVariableUnits: event.target.value as string })
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
        console.log(type)
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
        console.log(missingDatasets)
        setYVariableMissing(missingDatasets)
    }

    return (
        <>
            <Grid container direction='row'>
                <Grid item xs={12}>
                    <Button id='settingsToggle' variant="contained" onClick={handleSettingsClick} color="primary">
                        Settings
              {showSettings ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Button>
                </Grid>
                {showSettings &&
                    <>
                        <Grid item xs={4}>
                            <FormControl>
                                <InputLabel id="xVariable">X Variable</InputLabel>
                                <Select
                                    labelId="xVariable"
                                    id="xVariable"
                                    value={props.axes.xVariableName}
                                    autoWidth={true}
                                    onChange={handleXVariableChange}
                                >
                                    {props.variables.map(type => (
                                        <MenuItem value={type}>{type}</MenuItem>
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
                                    value={props.axes.xVariableUnits}
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
                                    value={props.axes.yVariableName}
                                    autoWidth={true}
                                    onChange={handleYVariableChange}
                                >
                                    {props.variables.map(type => (
                                        <MenuItem value={type}>{type}</MenuItem>
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
                                    value={props.axes.yVariableUnits}
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
                    </>
                }
            </Grid>
        </>
    )
}