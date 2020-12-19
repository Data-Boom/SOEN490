import { Box, Grid, TextField, Typography } from '@material-ui/core'
import { IAuthor, IReference, defaultAuthor } from '../../../Models/Datasets/IDatasetModel'

import { AuthorsList } from './AuthorsList'
import React from 'react'
import { classStyles } from '../../../appTheme'

interface IProps {
  reference: IReference,
  onReferenceChange: (newReference: IReference) => void
}

export const ReferenceForm = (props: IProps) => {

  const { reference, onReferenceChange } = { ...props }

  const handleRemoveAuthor = (index: number) => {
    let newAuthors: IAuthor[] = [...reference.authors]
    newAuthors.splice(index, 1)
    onReferenceChange({ ...reference, authors: newAuthors })
  }

  const handleAddAuthor = () => {
    let newAuthors: IAuthor[] = [...reference.authors]
    newAuthors.push(defaultAuthor)
    onReferenceChange({ ...reference, authors: newAuthors })
  }

  const handleAuthorChanged = (newAuthor: IAuthor, index: number) => {
    let newAuthors: IAuthor[] = [...reference.authors]
    newAuthors[index] = newAuthor
    onReferenceChange({ ...reference, authors: newAuthors })
  }

  const handleInputChanged = (event) => {
    const { name, value } = event.target
    onReferenceChange({ ...reference, [name]: value })
  }

  return (
    <Box className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Reference</Typography>
      <Grid container spacing={4}>
        <Grid item sm={4}>
          <TextField fullWidth label="Title" variant="outlined" name="title" value={reference.title} onChange={handleInputChanged} />
        </Grid>
        <Grid item sm={4}>
          <TextField fullWidth label="Type" variant="outlined" name="type" value={reference.type} onChange={handleInputChanged} />
        </Grid>
        <Grid item sm={4}>
          <TextField fullWidth label="Publisher" variant="outlined" name="publisher" value={reference.publisher} onChange={handleInputChanged} />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <AuthorsList
          authors={reference.authors}
          onRemoveAuthorClick={handleRemoveAuthor}
          onAddAuthorClick={handleAddAuthor}
          onAuthorChange={handleAuthorChanged}
        />
      </Grid>
    </Box>
  )
}