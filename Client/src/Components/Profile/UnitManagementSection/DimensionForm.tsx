import { Box, Button, Grid, IconButton, Paper, Table, TableContainer, Theme, Typography, createStyles, makeStyles } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { callChangeDimension, callDeleteDimension } from '../../../Remote/Endpoints/DimensionsEndpoint'

import { Collapse } from '@material-ui/core'
import { DimensionList } from './DimensionList'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { IDimensionModel } from '../../../../../Server/src/models/interfaces/IDimension'
import { UnitForm } from './UnitForm'
import { UnitValidationSchema } from './UnitsValidationSchema'
import { callAddDimension } from '../../../Remote/Endpoints/DimensionsEndpoint'
import { classStyles } from '../../../appTheme'
import clsx from 'clsx'

//import { IDimensionModel } from '../../../Models/Profile/IDimensionModel'

interface IProps {
  dimension: IDimensionModel
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

export const DimensionForm = (props: IProps) => {

  const dimension = props.dimension
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const renderBaseUnit = () => {
    let name = ''
    if (dimension.units.length > 0) {
      dimension.units.forEach(unit => {
        if (unit.id == dimension.baseUnitId) {
          name = unit.name
        }
      })
    }
    else {
      return (
        < Typography align="left"> No Base Units</Typography >
      )
    }
    return (
      <Typography align='left'>Base Unit: {name}</Typography>
    )
  }

  const handleSubmit = (formValues: IDimensionModel) => {
    console.log(formValues)
    if (formValues.id) {
      handleUpdateDimension(formValues)
    }
    else {
      handleCreateDimension(formValues)
    }
  }

  const handleUpdateDimension = async (formValues: IDimensionModel) => {
    await callChangeDimension(formValues)
  }

  const handleDeleteDimension = async () => {
    await callDeleteDimension(dimension.id)
    console.log("dimension deleted")
  }

  const handleCreateDimension = async (formValues: IDimensionModel) => {

    await callAddDimension(dimension)
  }

  return (
    <>
      <Box className={classStyles().fitBorder} >
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
            <Typography variant='h6' align="left">{dimension.name}</Typography>
          </Grid>
          <Grid item xs={5}>
            {!expanded && renderBaseUnit()}
          </Grid>
          <Grid item xs={1}>
            {!expanded &&
              <Button id='unit-delete' onClick={handleDeleteDimension} variant="contained" color="primary" type="submit">Delete</Button>
            }
          </Grid>
        </Grid>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Formik
            enableReinitialize={true}
            initialValues={dimension}
            validationSchema={UnitValidationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <UnitForm />
              <Button id='unit-submit' variant="contained" color="primary" type="submit">Submit</Button>
            </Form>
          </Formik>
        </Collapse>
      </Box>
    </>
  )

}