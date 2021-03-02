import { Box, Button, createStyles, Grid, IconButton, makeStyles, Theme, Typography } from "@material-ui/core"
import React, { useState } from "react";
import clsx from 'clsx'
import { ICategoryModel } from "../../../Models/Profile/ICategoryModel";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { classStyles } from '../../../appTheme'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

interface IProps {
  category: ICategoryModel
  index: number
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


export const CategoryManagementRow = (props: IProps) => {

  let { category, index } = { ...props }

  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleDeleteCategory = () => {

  }

  return (
    <Box className={classStyles().fitBorder}>
      <Box px={2}>
        <Grid item container alignItems="center" direction="row">
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
            <Typography align="left">{category.name}</Typography>
          </Grid>
          <Grid item xs={6} alignContent="flex-end">
            {expanded ? null :
              <Grid container justify="flex-end" alignItems="flex-end">
                <IconButton color="primary" aria-label="add unit" onClick={handleDeleteCategory}>
                  <DeleteForeverIcon />
                </IconButton>
              </Grid>
            }
          </Grid>
        </Grid>
      </Box>
    </Box>
  )

}