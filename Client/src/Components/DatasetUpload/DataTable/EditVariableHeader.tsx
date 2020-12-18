import * as Yup from 'yup'

import { Box, Button, Grid, Modal, Paper, TextField, makeStyles } from '@material-ui/core'

import { IVariable } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'
import { useFormik } from 'formik'

interface IProps {
  variable: IVariable,
  index: number,
  editMode: boolean,
  onHeaderClick: (index: number) => void,
  onEditModalClose: () => void,
  onVariableUpdate: (variable: IVariable, index: number) => void,
  onVariableRemove: (index: number) => void
}

export const EditVariableHeader = (props: IProps) => {
  const handleRemove = () => {
    props.onVariableRemove(props.index)
  }

  const handleClose = () => {
    props.onEditModalClose()
  }

  const openEditVariableModal = () => {
    props.onHeaderClick(props.index)
  }

  //todo make reusable as this is duplicated
  const useStyles = makeStyles(() => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }))

  const classes = useStyles()

  const formik = useFormik({
    initialValues: { ...props.variable },
    validationSchema: Yup.object({
      name: Yup.string().trim().required('required'),
      units: Yup.string().trim().required('required'),
      repr: Yup.string().trim().required('required'),
    }),
    onSubmit: values => {
      props.onVariableUpdate({ ...values }, props.index)
    },
  })

  const getErrorAndFormikProps = (fieldName: string) => {
    const error = formik.touched[fieldName] && !!formik.errors[fieldName]
    const helperText = formik.touched[fieldName] && formik.errors[fieldName]
    return { error: error, helperText: helperText, ...formik.getFieldProps(fieldName) }
  }

  return (
    <div>
      <Modal
        open={props.editMode}
        onClose={handleClose}
        className={classes.modal}
      >
        <Paper elevation={3}>
          <Box m={5}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item sm={4}>
                  <TextField
                    fullWidth
                    label="Name"
                    variant="outlined"
                    {...getErrorAndFormikProps('name')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    fullWidth
                    label="Units"
                    variant="outlined"
                    {...getErrorAndFormikProps('units')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    fullWidth
                    label="Representation"
                    variant="outlined"
                    {...getErrorAndFormikProps('repr')}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={4} justify="flex-end">
                <Grid item>
                  <Button variant="contained" onClick={handleClose}>Close</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" type="submit">Update</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleRemove}>Delete Column</Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Modal>
      <div onClick={openEditVariableModal}>{props.variable.name}</div>
    </div>
  )
}