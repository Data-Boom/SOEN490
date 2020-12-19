import { Grid, IconButton, TextField } from "@material-ui/core"

import ClearIcon from '@material-ui/icons/Clear'
import { IAuthor } from "../../../Models/Datasets/IDatasetModel"
import React from 'react'

interface IProps {
  author: IAuthor,
  index: number,
  onRemoveAuthorClick: (index: number) => void,
  onAuthorChange: (changedAuthor: IAuthor, index: number) => void,
  renderRemoveButton: boolean
}

export const AuthorRow = (props: IProps) => {

  const handleInputChange = (event) => {
    const { name, value } = event.target
    const newAuthor: IAuthor = { ...props.author, [name]: value }
    props.onAuthorChange(newAuthor, props.index)
  }

  const handleRemoveClick = () => {
    props.onRemoveAuthorClick(props.index)
  }
  const renderRemoveButton = () => {
    return (
      <IconButton color="primary" aria-label="remove author" onClick={handleRemoveClick}>
        <ClearIcon />
      </IconButton>
    )
  }

  return (
    <>
      <Grid item container spacing={4} alignItems="center">
        <Grid item>
          <TextField fullWidth label="First Name" variant="outlined" name="firstname" value={props.author.firstname} onChange={handleInputChange} />
        </Grid>
        <Grid item>
          <TextField fullWidth label="Middle Name" variant="outlined" name="middlename" value={props.author.middlename} onChange={handleInputChange} />
        </Grid>
        <Grid item>
          <TextField fullWidth label="Last Name" variant="outlined" name="lastname" value={props.author.lastname} onChange={handleInputChange} />
        </Grid>
        <Grid item>
          {props.renderRemoveButton ? renderRemoveButton() : null}
        </Grid>
      </Grid>
    </>
  )
}