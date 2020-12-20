import { Box, Grid, IconButton, TextField } from "@material-ui/core"

import ClearIcon from '@material-ui/icons/Clear'
import { IAuthor } from "../../../Models/Datasets/IDatasetModel"
import React from 'react'
import { getErrorAndFormikProps } from "../../../Util/FormUtil"
import { useFormik } from "formik"

interface IProps {
  author: IAuthor,
  index: number,
  onRemoveAuthorClick: (index: number) => void,
  onAuthorChange: (changedAuthor: IAuthor, index: number) => void,
  renderRemoveButton: boolean
}

export const AuthorRow = (props: IProps) => {
  const { author, index, onAuthorChange, onRemoveAuthorClick, renderRemoveButton } = props

  const handleRemoveClick = () => {
    onRemoveAuthorClick(index)
  }

  const removeButton = () => {
    return (
      <IconButton color="primary" aria-label="remove author" onClick={handleRemoveClick}>
        <ClearIcon />
      </IconButton>
    )
  }

  const formik = useFormik({
    initialValues: { ...author },
    onSubmit: () => { },
  })

  React.useEffect(() => {
    onAuthorChange({ ...formik.values }, index)
  }, [formik.values])

  return (
    <>
      <Box>
        <Grid item container spacing={4} alignItems="center">
          <Grid item>
            <TextField fullWidth label="First Name" variant="outlined" {...getErrorAndFormikProps(formik, 'firstname')} />
          </Grid>
          <Grid item>
            <TextField fullWidth label="Middle Name" variant="outlined" {...getErrorAndFormikProps(formik, 'middlename')} />
          </Grid>
          <Grid item>
            <TextField fullWidth label="Last Name" variant="outlined" {...getErrorAndFormikProps(formik, 'lastname')} />
          </Grid>
          <Grid item>
            {renderRemoveButton ? removeButton() : null}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}