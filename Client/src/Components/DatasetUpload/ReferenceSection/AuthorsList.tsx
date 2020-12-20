import { Grid, IconButton, Typography } from "@material-ui/core"
import { IAuthor, defaultAuthor } from "../../../Models/Datasets/IDatasetModel"

import AddIcon from '@material-ui/icons/Add'
import { AuthorRow } from "./AuthorRow"
import React from 'react'

interface IProps {
  authors: IAuthor[],
  onAuthorsChange: (changedAuthors: IAuthor[]) => void
}

export const AuthorsList = (props: IProps) => {
  const { authors, onAuthorsChange } = props

  const handleAuthorChange = (author: IAuthor, index: number) => {
    let newAuthors: IAuthor[] = [...authors]
    newAuthors[index] = author
    onAuthorsChange(newAuthors)
  }

  const handleRemoveAuthor = (indexToRemove: number) => {
    onAuthorsChange(authors.filter((author, index) => index !== indexToRemove))
  }

  const handleAddAuthor = () => {
    onAuthorsChange([...authors, defaultAuthor])
  }

  const renderAuthorRows = () => {
    return authors && authors.map((author, index) => {
      return (
        <AuthorRow
          author={author}
          key={index}
          index={index}
          onAuthorChange={handleAuthorChange}
          onRemoveAuthorClick={handleRemoveAuthor}
          renderRemoveButton={shouldRenderRemove()}
        />
      )
    })
  }

  const shouldRenderRemove = () => {
    return props.authors.length > 1
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