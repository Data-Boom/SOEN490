import { Box, Button, Collapse, createStyles, Grid, IconButton, makeStyles, Theme, Typography } from "@material-ui/core"
import React, { useState } from "react";
import clsx from 'clsx'
import { ICategoryModel } from "../../../Models/Profile/ICategoryModel";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { classStyles } from '../../../appTheme'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { Form, Formik } from "formik";
import { CategoryValidationSchema } from "./CategoryValidationSchema";
import { CategoryForm } from "./CategoryForm/CategoryForm";
import { ConfirmationModal } from "../../Authentication/ConfirmationModal";

interface IProps {
  category: ICategoryModel,
  handleCreateCategory: (category: ICategoryModel) => void,
  handleSaveCategory: (category: ICategoryModel) => void,
  handleDeleteCategory: (category: number) => void
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

  let { category, handleCreateCategory, handleSaveCategory, handleDeleteCategory } = { ...props }

  const classes = useStyles()
  const [expanded, setExpanded] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleSubmit = (formValues: ICategoryModel) => {
    if(!category.id) {
      handleCreateCategory(formValues)
    }
    else {
      handleSaveCategory(formValues)
    }
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
          {expanded ? null :
            <Grid container justify="flex-end" alignItems="flex-end">
              <IconButton color="primary" aria-label="delete category" onClick={() => setConfirmModalOpen(true)}>
                <DeleteForeverIcon />
              </IconButton>
                <ConfirmationModal
                title="Are you sure you want to remove this Category?"
                description="By clicking the Delete then this category and these subcategories will be completely removed from the system."
                acceptButton="Delete"
                cancelButton="Cancel"
                open={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onSubmit={() => handleDeleteCategory(category.id)}
                />
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
                onSubmit={handleSubmit}
              >
                <Form>
                  <CategoryForm 
                  id={category.id ? category.id : null}
                  />
                </Form>
              </Formik>
            </Grid>
          </Collapse>
        </Grid>
      </Box>
    </Box>
  )
}