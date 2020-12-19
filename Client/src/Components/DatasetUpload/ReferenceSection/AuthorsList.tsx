import { Grid, IconButton, Typography } from "@material-ui/core"

import AddIcon from '@material-ui/icons/Add'
import { AuthorRow } from "./AuthorRow"
import { IAuthor } from "../../../Models/Datasets/IDatasetModel"
import React from 'react'

interface IProps {
  authors: IAuthor[],
  onRemoveAuthorClick: (index: number) => void,
  onAddAuthorClick: () => void,
  onAuthorChange: (changedAuthor: IAuthor, index: number) => void
}

export const AuthorsList = (props: IProps) => {
  const renderAuthorRows = () => {
    return props && props.authors && props.authors.map((author, index) => {
      return (
        <AuthorRow
          author={author}
          key={index}
          index={index}
          onAuthorChange={props.onAuthorChange}
          onRemoveAuthorClick={props.onRemoveAuthorClick}
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
        {renderAuthorRows()}
        <Grid item>
          <IconButton color="primary" aria-label="add author" onClick={props.onAddAuthorClick}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}