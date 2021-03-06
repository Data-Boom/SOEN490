import { Box, Button, Collapse, Grid, IconButton, Theme, Typography, createStyles, makeStyles } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { IDimensionModel } from '../../../../../Server/src/models/interfaces/IDimension'
import { UnitForm } from './UnitForm'
import { UnitValidationSchema } from './UnitsValidationSchema'
import { classStyles } from '../../../appTheme'
import clsx from 'clsx'

interface IProps {
  dimension: IDimensionModel,
  onUpdate(formValues: IDimensionModel): void,
  onDelete(dimensionId: number): void,
  onCreate(formValues: IDimensionModel): void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
  }),
)

export const DimensionForm = (props: IProps) => {

  const { dimension, onUpdate, onDelete, onCreate } = { ...props }
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
        <Typography align="left"> No Base Units</Typography >
      )
    }
    return (
      <Typography align='left'>Base Unit: {name}</Typography>
    )
  }

  const handleSubmit = (formValues: IDimensionModel) => {
    if (formValues.id) {
      onUpdate(formValues)
    }
    else {
      onCreate(formValues)
    }
  }

  const handleDeleteDimension = async () => {
    onDelete(dimension.id)
  }

  const renderHeader = () => {
    return (
      <Grid item container alignItems="center">
        <Grid item container xs={6} alignItems="center">
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

          <Typography align="left">{dimension.name}</Typography>
        </Grid>
        <Grid item xs={6}>
          {expanded ? null :
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                {renderBaseUnit()}
              </Grid>
              <Button id='unit-delete' onClick={handleDeleteDimension} variant="contained" color="primary" type="submit">Delete</Button>
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <Box className={classStyles().fitBorder}>
        <Box px={2}>
          <Grid container direction="column">
            {renderHeader()}
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Grid item>
                <Formik
                  enableReinitialize={true}
                  initialValues={dimension}
                  validationSchema={UnitValidationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <UnitForm id={dimension.id} />
                  </Form>
                </Formik>
              </Grid>
            </Collapse>
          </Grid>
        </Box>
      </Box>
    </>
  )

}