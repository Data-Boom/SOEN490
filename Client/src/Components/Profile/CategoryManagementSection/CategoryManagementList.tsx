import { Box, Button, Collapse, createStyles, Grid, IconButton, makeStyles, Theme, Typography } from "@material-ui/core"
import React, { useState } from "react";
import clsx from 'clsx'
import { ICategoryModel } from "../../../Models/Profile/ICategoryModel";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { classStyles } from '../../../appTheme'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { ICategory } from '../../../../../Server/src/models/interfaces/CategoryInterface';
import { Form, Formik } from "formik";
import { CategoryValidationSchema } from "./CategoryValidationSchema";
import { CategoryForm } from "./CategoryForm/CategoryForm";

interface IProps {
  category: ICategoryModel
  index: number
  handleSaveCategory: (category: ICategoryModel) => void,
  handleDeleteCategory: (category: ICategoryModel) => any
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


export const CategoryManagementList = (props: IProps) => {

  let { category, index, handleSaveCategory, handleDeleteCategory } = { ...props }

  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const renderSaveButton = () => {
    return (
      <Grid container justify="flex-end" alignItems="flex-end" spacing={2}>
        <Button id='save-category' variant='contained' color='primary' onClick={() => handleSaveCategory(category)} >
          Save
      </Button>
      </Grid>
    )
  }
  const renderHeader = () => {
    return (
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
          {expanded ? renderSaveButton() :
            <Grid container justify="flex-end" alignItems="flex-end">
              <IconButton color="primary" aria-label="delete category" onClick={() => handleDeleteCategory(category)}>
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
          }
        </Grid>
      </Grid>
    )
  }

  return (
    <Box className={classStyles().fitBorder}>
      <Box px={2}>
        <Grid container direction="column">
          {renderHeader()}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Grid item>
              <Formik
                enableReinitialize={true}
                initialValues={category}
                validationSchema={CategoryValidationSchema}
                onSubmit={handleSaveCategory}
              >
                <Form>
                  <CategoryForm />
                </Form>
              </Formik>
            </Grid>
          </Collapse>
        </Grid>

      </Box>
    </Box>
  )
}