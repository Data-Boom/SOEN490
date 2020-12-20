import { Box, Grid, TextField, Typography } from '@material-ui/core'
import { IAuthor, IReference } from '../../../Models/Datasets/IDatasetModel'

import { AuthorsList } from './AuthorsList'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { getErrorAndFormikProps } from '../../../Util/FormUtil'
import { useFormik } from 'formik'

interface IProps {
  reference: IReference,
  onReferenceChange: (newReference: IReference) => void
}

export const ReferenceForm = (props: IProps) => {

  const { reference, onReferenceChange } = props

  const formik = useFormik({
    initialValues: { ...reference },
    onSubmit: values => {
      onReferenceChange({ ...values })
    },
  })

  const handleAuthorChange = (authors: IAuthor[]) => {
    formik.setFieldValue('authors', authors)
    formik.handleSubmit()
  }

  return (
    <Box className={classStyles().defaultBorder} onBlur={() => formik.handleSubmit()} >
      <Typography variant='h6' align="left">Reference</Typography>
      <Grid container spacing={4}>
        <Grid item sm={4}>
          <TextField fullWidth label="Title" variant="outlined" {...getErrorAndFormikProps(formik, 'title')} />
        </Grid>
        <Grid item sm={4}>
          <TextField fullWidth label="Type" variant="outlined" {...getErrorAndFormikProps(formik, 'type')} />
        </Grid>
        <Grid item sm={4}>
          <TextField fullWidth label="Publisher" variant="outlined" {...getErrorAndFormikProps(formik, 'publisher')} />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <AuthorsList
          {...getErrorAndFormikProps(formik, 'authors')}
          authors={reference.authors}
          onAuthorsChange={handleAuthorChange}
        />
      </Grid>
    </Box >
  )
}