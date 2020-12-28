import { ArrayHelpers, FormikProps } from "formik"
import { Grid, IconButton, Typography } from "@material-ui/core"
import { IAuthor, defaultAuthor } from "../../../Models/Datasets/IDatasetModel"
import React, { useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import { AuthorRow } from "./AuthorRow"

interface IProps {
  authors: IAuthor[],
  fieldArrayHelpers: ArrayHelpers
}

export const AuthorsList = (props: IProps) => {
  const { authors, fieldArrayHelpers } = props

  const handleRemoveAuthor = (indexToRemove: number) => {
    fieldArrayHelpers.remove(indexToRemove)
  }

  const renderAuthorRows = () => {
    return authors && authors.map((author, index) => {
      return (
        <AuthorRow
          key={index}
          index={index}
          onRemoveAuthorClick={handleRemoveAuthor}
          removable={shouldRenderRemove()}
        />
      )
    })
  }

  const shouldRenderRemove = () => {
    // allow removing authors if there is at least 2
    return authors.length > 1
  }

  const handleAddAuthor = () => {
    fieldArrayHelpers.push(defaultAuthor)
  }

  return (
    <>
      <Grid item container direction='column' spacing={4} alignItems="flex-start">
        <Grid item>
          <Typography variant='h6' align="left">Authors</Typography>
        </Grid>
        <Grid item>
          {renderAuthorRows()}
        </Grid>
        <Grid item>
          <IconButton color="primary" aria-label="add author" onClick={handleAddAuthor}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}