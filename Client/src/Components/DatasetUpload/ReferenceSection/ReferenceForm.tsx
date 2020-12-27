import * as Yup from 'yup'

import { Box, Grid, TextField, Typography } from '@material-ui/core'

import { AuthorsList } from './AuthorsList'
import { IReference } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { getErrorAndFormikProps } from '../../../Util/FormUtil'
import { useFormik } from 'formik'

interface IProps {
  name: string,
  value: IReference,
  setFieldValue: (fieldName: string, newReference: IReference) => void
}

export const ReferenceForm = (props: IProps) => {

  const { name, value, setFieldValue } = props

  const formik = useFormik({
    initialValues: value,
    validationSchema: Yup.object().shape({
      year: Yup.number().integer().required().test('len', 'Must be exactly 4 characters', val => val && val.toString().length === 4),
      volume: Yup.number().integer().required(),
      pages: Yup.number().integer().required(),
      title: Yup.string().required(),
      type: Yup.string().required(),
      publisher: Yup.string().required(),
    }),
    //this is subform and therefore its not submitting, but isntead is propagating change up
    onSubmit: () => { }
  })

  //anytime the current reference changes we will call parent component about it
  React.useEffect(() => {
    setFieldValue(name, formik.values)
  }, [formik.values])

  return (
    <Box className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Reference</Typography>
      <Grid container spacing={4}>
        <Grid item sm={4}>
          <TextField fullWidth label="Title" variant="outlined" {...getErrorAndFormikProps(formik, "title")} />
        </Grid>
        <Grid item sm={4}>
          <TextField fullWidth label="Type" variant="outlined" {...getErrorAndFormikProps(formik, "type")} />
        </Grid>
        <Grid item sm={4}>
          <TextField fullWidth label="Publisher" variant="outlined" {...getErrorAndFormikProps(formik, "publisher")} />
        </Grid>
        <Grid item sm={4}>
          <TextField fullWidth label="Volume" variant="outlined" type='number' {...getErrorAndFormikProps(formik, "volume")} />
        </Grid>
        <Grid item sm={4}>
          <TextField fullWidth label="Pages" variant="outlined" type='number' {...getErrorAndFormikProps(formik, "pages")} />
        </Grid>
        <Grid item sm={4}>
          <TextField fullWidth label="Year" variant="outlined" type='number' {...getErrorAndFormikProps(formik, "year")} />
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        <AuthorsList
          {...getErrorAndFormikProps(formik, "authors")}
          setFieldValue={formik.setFieldValue}
        />
      </Grid>
    </Box >
  )
} 