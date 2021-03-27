import { ArrayHelpers, FastField } from "formik"
import { Button, Grid, IconButton, Tooltip, Typography } from "@material-ui/core"

import AddIcon from '@material-ui/icons/Add'
import { MuiTextFieldFormik } from "../../../Forms/FormikFields"
import React from 'react'
import { ISubCategoryModel, newSubcategory } from '../../../../Models/Profile/ICategoryModel';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

interface IProps {
    subcategory: ISubCategoryModel,
    key: number,
    handleRemoveSubcategory: (index: number) => void,
    removable: boolean
}

export const SubcategoryRow = (props: IProps) => {
    const { subcategory, key, handleRemoveSubcategory, removable } = props


    return (
        <>
            <Grid container direction='column' spacing={2} alignItems="flex-start">
                <Grid item>
                    <p>
                        hello
                    </p>
                    {subcategory.name}
                </Grid>
                <IconButton color="primary" aria-label="delete subcategory" onClick={() => handleRemoveSubcategory(key)}>
                    <DeleteForeverIcon />
                </IconButton>
            </Grid>
        </>
    )
}