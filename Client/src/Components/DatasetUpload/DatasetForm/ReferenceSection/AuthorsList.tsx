import { Grid, IconButton } from "@material-ui/core"
import { IAuthor, newAuthor } from "../../../../Models/Datasets/IDatasetModel"

import AddIcon from '@material-ui/icons/Add'
import { ArrayHelpers } from "formik"
import { AuthorRow } from "./AuthorRow"
import React from 'react'

interface IProps {
  authors: IAuthor[],
  fieldArrayHelpers: ArrayHelpers,
  editable: boolean
}

export const AuthorsList = (props: IProps) => {
  const { authors, fieldArrayHelpers, editable } = props

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
          editable={editable}
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
    fieldArrayHelpers.push(newAuthor)
  }

  return (
    <>
      <Grid container direction='column' spacing={2} alignItems="flex-start">
        <Grid item>
          {renderAuthorRows()}
        </Grid>
      </Grid>
      {editable && <Grid container>
        <IconButton color="primary" aria-label="add author" onClick={handleAddAuthor} disabled={!editable}>
          <AddIcon />
        </IconButton>
      </Grid>}
    </>
  )
}