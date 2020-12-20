import { Grid, IconButton, Typography } from "@material-ui/core"
import { IAuthor, defaultAuthor } from "../../../Models/Datasets/IDatasetModel"

import AddIcon from '@material-ui/icons/Add'
import { AuthorRow } from "./AuthorRow"
import React from 'react'

interface IProps {
  name: string,
  value: IAuthor[],
  setFieldValue: (fieldName: string, newAuthors: IAuthor[]) => void
}

export const AuthorsList = (props: IProps) => {
  const { value, name, setFieldValue } = props

  const handleAuthorChange = (author: IAuthor, index: number) => {
    let newAuthors: IAuthor[] = [...value]
    newAuthors[index] = author
    setFieldValue(name, newAuthors)
  }

  const handleRemoveAuthor = (indexToRemove: number) => {
    setFieldValue(name, value.filter((author, index) => index !== indexToRemove))
  }

  const renderAuthorRows = () => {
    return value && value.map((author, index) => {
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
    return props.value.length > 1
  }

  const handleAddAuthor = () => {
    setFieldValue(name, [...value, defaultAuthor])
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