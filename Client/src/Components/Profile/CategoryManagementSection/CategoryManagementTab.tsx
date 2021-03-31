import React from "react"
import { useEffect, useState } from "react"
import { ICategoryModel, newCategory } from "../../../Models/Profile/ICategoryModel"
import { classStyles } from '../../../appTheme'
import { Box, Button, Grid, Typography } from "@material-ui/core"
import { AddIcon } from "@material-ui/data-grid"
import { CategoryManagementList } from "./CategoryManagementList"
import SnackbarUtils from '../../Utils/SnackbarUtils'
import { listCategories, updateCategory, createCategory, deleteCategory } from "../../../Remote/Endpoints/CategoryEndpoint"


export const CategoryManagementTab = () => {

  const [categories, setCategories] = useState<ICategoryModel[]>()

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = async () => {
     const currentCategories: ICategoryModel[] = await listCategories()
     setCategories(currentCategories)
  }

  const addNewCategory = ()  => {
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
        <Button variant="contained" color="primary" aria-label="add category" onClick={() => addNewCategory()}> Add New Category
          <AddIcon />
        </Button>
      </Grid>
    </>
  )
}