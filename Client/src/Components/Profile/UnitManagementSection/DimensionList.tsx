import { Box, createStyles, Divider, Grid, IconButton, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core'
import { AddIcon } from '@material-ui/data-grid'
import { ArrayHelpers, FastField } from 'formik'
import React, { useState } from 'react'
import { IDimensionModel, IUnitModel } from '../../../../../Server/src/models/interfaces/IDimension'
import { classStyles } from '../../../appTheme'
import { newUnit } from '../../../Models/Profile/IDimensionModel'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import { UnitRow } from './UnitRow'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import classes from '*.module.css'
import clsx from 'clsx'

interface IProps {
    units: IUnitModel[],
    fieldArrayHelpers: ArrayHelpers,
    dimensions: IDimensionModel[],
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
    }),
);

export const DimensionList = (props: IProps) => {

    const { units, fieldArrayHelpers } = props

    const [expanded, setExpanded] = useState(false)
    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const handleRemoveUnit = (indexToRemove: number) => {
        console.log("unit removed")
        fieldArrayHelpers.remove(indexToRemove)
    }

    const renderUnitRows = () => {
        console.log("unit rows rendered " + units)
        return units && units.map((unit, index) => {
            if (index > 0) {
                return (
                    <UnitRow
                        key={index}
                        index={index}
                        conversionFormula={unit.conversionFormula}
                        onRemoveUnitClick={handleRemoveUnit}
                        removable={shouldRenderRemove()}
                    />
                )
            }
        })
    }

    const shouldRenderRemove = () => {
        // allow removing authors if there is at least 2
        return units.length > 1
    }

    const handleAddUnit = () => {
        fieldArrayHelpers.push(newUnit)
    }

    return (
        <Box className={classStyles().fitBorder}>
            <Grid container direction="row" alignItems="center">
                <Grid item xs={1}>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={5}>
                    <Typography variant='h6' align="left">New Dimension</Typography>
                </Grid>
                <Grid item>
                    <FastField name={`dimension[0].name`} label='Dimension Name' component={MuiTextFieldFormik} />
                </Grid>
            </Grid>
        </Box>
    )


}