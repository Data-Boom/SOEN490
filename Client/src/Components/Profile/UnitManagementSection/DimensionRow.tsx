import React from 'react'
import { Box, Grid, IconButton, Tooltip } from "@material-ui/core"
import { Equation, EquationEvaluate, EquationOptions, defaultErrorHandler } from "react-equation"
import ClearIcon from '@material-ui/icons/Clear'
import { FastField } from "formik"
import { MuiTextFieldFormik } from '../../Forms/FormikFields'

interface IProps {
    index: number,
    onRemoveDimensionClick: (index: number) => void,
    conversionFormula?: string,
    removable: boolean
}

export const DimensionRow = () => {

    return (
        <Box style={{ width: "90%" }}>

        </Box>
    )

}