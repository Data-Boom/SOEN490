import React from "react"
import { useEffect, useState } from "react"
import { ICategoryModel, allCategory } from "../../../Models/Profile/ICategoryModel"
import { classStyles } from '../../../appTheme'
import { Box, Button, Grid, IconButton, Typography } from "@material-ui/core"
import { AddIcon } from "@material-ui/data-grid"
import { CategoryManagementList } from "./CategoryManagementList"


export const CategoryManagementTab = () => {

  const [categories, setCategories] = useState<ICategoryModel[]>()

  useEffect(() => {
    let allCategories = allCategory
    setCategories(allCategories)
  }, [])

  const getCategories = async () => {
    // const currentCategories = await fetchCategories()
    // setCategories(currentCategories)
    console.log('get All Cateogry')
  }

  const addNewCategory = (category: ICategoryModel) => {
    // await addCategory(category)
    // getCategories()
    console.log('Add new Cateogry')
  }

  const handleSaveCategory = (category: ICategoryModel) => {
    // await saveCategory(category)
    // getCategories()
    console.log('Save Cateogry')
  }

  const handleDeleteCategory = (category: ICategoryModel) => {
    // await deleteCategory(category)
    // getCategories()
    console.log('Delete Cateogry')
  }

  return (
    <>
      <Box className={classStyles().defaultBorder} style={{ width: "100%" }} >
        <Typography variant='h6' align="center"> Current Categories in System </Typography>
        {categories && categories.map((category, index) => (
          <CategoryManagementList
            category={category}
            index={index}
            handleSaveCategory={handleSaveCategory}
            handleDeleteCategory={handleDeleteCategory}
          />
        ))
        }
      </Box>
      <Grid item>
        <Button variant="contained" color="primary" aria-label="add category" onClick={() => addNewCategory}> Add New Category
        <AddIcon />
        </Button>
      </Grid>
    </>
  )
}