import { Grid, IconButton, Typography } from "@material-ui/core"
import { IAuthor, defaultAuthor } from "../../../Models/Datasets/IDatasetModel"
import React, { useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import { AuthorRow } from "./AuthorRow"

interface IProps {
  name: string,
  value: IAuthor[],
  setFieldValue: (fieldName: string, newAuthors: IAuthor[]) => void
}

export const AuthorsList = (props: IProps) => {
  // this is a hack to provide a unique key to the AuthorRow after the author was removed.
  // proper solution would require completely redoing this whole datasetUploadform and sway away from useFormik 
  // hook as it is lacking core functionality from the formik lib
  // and using their <Formik></Formik> element
  const [authorListVersion, setAuthorListVersion] = useState(0)

  const { value, name, setFieldValue } = props

  const handleAuthorChange = (author: IAuthor, index: number) => {
    let newAuthors: IAuthor[] = [...value]
    newAuthors[index] = author
    setFieldValue(name, newAuthors)
  }

  const handleRemoveAuthor = (indexToRemove: number) => {
    setFieldValue(name, value.filter((author, index) => index !== indexToRemove))
    setAuthorListVersion(authorListVersion + 1)
  }

  const renderAuthorRows = () => {
    return value && value.map((author, index) => {
      return (
        <AuthorRow
          author={author}
          key={authorListVersion + '_' + index}
          index={index}
          onAuthorChange={handleAuthorChange}
          onRemoveAuthorClick={handleRemoveAuthor}
          removable={shouldRenderRemove()}
        />
      )
    })
  }

  const shouldRenderRemove = () => {
    // allow removing authors if there is at least 2
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