import { Box, Button, Grid, IconButton, Paper, Table, TableContainer, Theme, Typography, createStyles, makeStyles } from '@material-ui/core'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'

import { Collapse } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { IDimensionModel } from '../../../../../Server/src/models/interfaces/IDimension'
import { UnitForm } from './UnitForm'
import { UnitValidationSchema } from './UnitsValidationSchema'
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
  // This file will contain the default measurement. It will also have a save button, as well as a button to create a new UnitForm. Maybe look how new authors are added in the DatasetModelForm.
  const dimension = props.dimension
  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const initialValues = dimension

  const handleSubmit = (formValues: IDimensionModel) => {
    console.log(formValues)
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
          {!expanded &&
            <Grid item xs={6}>
              <Typography align="left">Base Units: {dimension.units[dimension.baseUnitId].name}</Typography>
            </Grid>
          }
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