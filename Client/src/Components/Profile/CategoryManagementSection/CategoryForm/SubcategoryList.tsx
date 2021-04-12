import { Button, Grid, Typography } from "@material-ui/core"
import { ISubCategoryModel, newSubcategory } from '../../../../Models/Profile/ICategoryModel';
import React, { useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import { ArrayHelpers } from "formik"
import { SubcategoryRow } from "./SubcategoryRow"

interface IProps {
  subcategories: ISubCategoryModel[],
  fieldArrayHelpers: ArrayHelpers,
  categoryId: number,
}

export const SubcategoryList = (props: IProps) => {
  const { subcategories, fieldArrayHelpers, categoryId } = props

  const handleRemoveSubcategory = (indexToRemove: number) => {
    if (subcategories.length > 1) {
      fieldArrayHelpers.remove(indexToRemove)
    }
  }

  const addNewSubcategory = () => {
    let newSub = newSubcategory
    newSub.categoryId = categoryId
    fieldArrayHelpers.push(newSub)
  }

  return (
    <>
      <Grid container direction='column' spacing={2} alignItems="flex-start">
        <Grid item>
          <Typography align="left">Sub-categories:</Typography>
        </Grid>
        <Grid item>
          {subcategories && subcategories.map((subcategory, index) => {
            return (
              <SubcategoryRow
                index={index}
                handleRemoveSubcategory={handleRemoveSubcategory}
              />
            )
          })}
        </Grid>
        <Grid item xs={6} alignContent="flex-start">
          <Button variant="contained" id="addSubcategory" color="primary" aria-label="add-subcategory" onClick={() => addNewSubcategory()}>
            SubCategory
            <AddIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  )
}