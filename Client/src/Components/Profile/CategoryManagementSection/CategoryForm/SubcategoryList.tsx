import { ArrayHelpers, FastField } from "formik"
import { Button, Grid, IconButton, Typography } from "@material-ui/core"

import AddIcon from '@material-ui/icons/Add'
import { MuiTextFieldFormik } from "../../../Forms/FormikFields"
import React from 'react'
import { ISubCategoryModel, newSubcategory } from '../../../../Models/Profile/ICategoryModel';
import { SubcategoryRow } from "./SubcategoryRow"
import { Category } from '../../../../../../Server/src/models/entities/Category';

interface IProps {
  subcategories: ISubCategoryModel[],
  fieldArrayHelpers: ArrayHelpers,
  categoryId: number
}

export const SubcategoryList = (props: IProps) => {
  const { subcategories, fieldArrayHelpers, categoryId } = props

  const handleRemoveSubcategory = (indexToRemove: number) => {
    fieldArrayHelpers.remove(indexToRemove)
  }

  //additional rows
  // const renderUnitRows = () => {
  //     return units && units.map((unit, index) => {
  //         if (unit.id != baseUnitId) {
  //             return (
  //                 <UnitRow
  //                     key={index}
  //                     index={index}
  //                     conversionFormula={unit.conversionFormula}
  //                     onRemoveUnitClick={handleRemoveUnit}
  //                     removable={shouldRenderRemove()}
  //                 />
  //             )
  //         }
  //     })
  // }

  const shouldRenderRemove = () => {
    // allow removing units if there is at least 2
    return subcategories.length > 1
  }

  const handleAddUnit = () => {
    fieldArrayHelpers.push(newSubcategory)
  }

  const addNewSubcategory = () => {
    console.log('add new subcategory')
    console.log(subcategories, 'subcateogires')
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
              <Grid>
                <p>
                  hello
                  </p>
              </Grid>
            )

            // return (
            //   <SubcategoryRow
            //     subcategory={subcategory}
            //     key={index}
            //     handleRemoveSubcategory={handleRemoveSubcategory}
            //     removable={shouldRenderRemove()}
            //   />
            // )
          })}
        </Grid>
        <Grid item xs={6} alignContent="flex-start">
          <Button variant="contained" color="primary" aria-label="add subcategory" onClick={() => addNewSubcategory}> SubCategory
              <AddIcon />
          </Button>
        </Grid>
      </Grid>
    </>
  )
}