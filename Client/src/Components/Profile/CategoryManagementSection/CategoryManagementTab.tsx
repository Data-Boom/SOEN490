import React from "react"
import { useEffect, useState } from "react"
import { ICategoryModel, allCategory } from "../../../Models/Profile/ICategoryModel"
import { classStyles } from '../../../appTheme'
import { Box, Button, Grid, IconButton, Typography } from "@material-ui/core"
import { AddIcon } from "@material-ui/data-grid"
import { CategoryManagementRow } from "./CategoryManagementRow"


export const CategoryManagementTab = () => {

  const [categories, setCategories] = useState<ICategoryModel[]>()

  useEffect(() => {
    let allCategories = allCategory
    setCategories(allCategories)
  }, [])

  const addNewCategory = () => {
    console.log('ihit enw cateogry')
  }

  return (
    <>
      <Box className={classStyles().defaultBorder} style={{ width: "100%" }} >
        <Typography variant='h6' align="center"> Current Categories in System </Typography>
        {categories && categories.map((category, index) => (
          <CategoryManagementRow
            category={category}
            index={index}
          />
        ))
        }
      </Box>
      <Grid item>
        <Button variant="contained" color="primary" aria-label="add category" onClick={addNewCategory}> Add New Category
        <AddIcon />
        </Button>
      </Grid>
    </>
  )
}