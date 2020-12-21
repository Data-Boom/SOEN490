import * as Yup from 'yup'

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
  removable: boolean
}

export const AuthorRow = (props: IProps) => {
  const { author, index, onAuthorChange, onRemoveAuthorClick, removable } = props

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
    validationSchema: Yup.object().shape({
      firstname: Yup.string().required(),
      middlename: Yup.string(),
      lastname: Yup.string().required(),
    }),
    onSubmit: () => { },
  })

  //todo refactor the whole form with one Formik at the top level, and the children using useFormikContext()
  React.useEffect(() => {
    onAuthorChange({ ...formik.values }, index)
  }, [formik.values])

  return (
    <>
      <Box>
        <Grid item container spacing={4}>
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
            {removable ? removeButton() : null}
          </Grid>
        </Grid>
      </Box>
    </>
  )
}