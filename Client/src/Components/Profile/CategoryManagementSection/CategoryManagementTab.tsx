import { Box, Button, Grid, Typography } from "@material-ui/core"
import { ICategoryModel, newCategory } from "../../../Models/Profile/ICategoryModel"
import { createCategory, deleteCategory, listCategories, updateCategory } from "../../../Remote/Endpoints/CategoryEndpoint"
import { useEffect, useState } from "react"

import { AddIcon } from "@material-ui/data-grid"
import { CategoryManagementList } from "./CategoryManagementList"
import React from "react"
import SnackbarUtils from '../../Utils/SnackbarUtils'
import { classStyles } from '../../../appTheme'

export const CategoryManagementTab = () => {

  const [categories, setCategories] = useState<ICategoryModel[]>()

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
    const currentCategories: ICategoryModel[] = await listCategories()
    setCategories(currentCategories)
  }

  const addNewCategory = () => {
    const categoriesCopy = [...categories]
    categoriesCopy.push(newCategory)
    setCategories(categoriesCopy)
  }

  const handleCreateCategory = async (newCategory: ICategoryModel) => {
    await createCategory(newCategory)
    await getCategories()
    SnackbarUtils.success('New category created!')
  }

  const handleSaveCategory = async (updatedCategory: ICategoryModel) => {
    await updateCategory(updatedCategory)
    await getCategories()
    SnackbarUtils.success('Changes Saved!')
  }

  const handleDeleteCategory = async (categoryId: number) => {
    await deleteCategory(categoryId)
    await getCategories()
    SnackbarUtils.success('Category Deleted')
  }

  return (
    <>
      <Box className={classStyles().defaultBorder} style={{ width: "100%" }} >
        <Typography variant='h6' align="center"> Current Categories in System </Typography>
        {categories && categories.map((category, index) => (
          <CategoryManagementList
            category={category}
            handleCreateCategory={handleCreateCategory}
            handleSaveCategory={handleSaveCategory}
            handleDeleteCategory={handleDeleteCategory}
          />
        ))
        }
      </Box>
      <Grid item>
        <Button variant="contained" id="addNewCategory" color="primary" aria-label="add category" onClick={() => addNewCategory()}> Add New Category
          <AddIcon />
        </Button>
      </Grid>
    </>
  )
}