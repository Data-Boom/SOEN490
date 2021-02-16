import { Box, Button, Grid, IconButton, Paper, Table, TableContainer, Theme, Typography, createStyles, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

import { Collapse } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { IDimensionModel } from '../../../Models/Profile/IDimenstionModel'
import { UnitForm } from './UnitForm'
import { classStyles } from '../../../appTheme'
import clsx from 'clsx'

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

  return (
    <>
      <Box className={classStyles().defaultBorder} >
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
          <UnitForm units={dimension.units} />
        </Collapse>
      </Box>
    </>
  )

}