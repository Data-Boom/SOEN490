import { FastField } from "formik"
import { Grid, IconButton } from "@material-ui/core"

import { MuiTextFieldFormik } from "../../../Forms/FormikFields"
import React from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

interface IProps {
    index: number,
    handleRemoveSubcategory: (index: number) => void,
}

export const SubcategoryRow = (props: IProps) => {
    const { index, handleRemoveSubcategory } = props

    return (
        <>
          <Grid container direction='row' spacing={2} alignContent="flex-start" alignItems="flex-start">
            <Grid item>
              <FastField name={`subcategories[${index}].name`} label='Subcategory Name' component={MuiTextFieldFormik} />
            </Grid>
            <Grid item>
              <IconButton color="primary" aria-label="delete subcategory" onClick={() => handleRemoveSubcategory(index)}>
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
          </Grid>
        </>
    )
}