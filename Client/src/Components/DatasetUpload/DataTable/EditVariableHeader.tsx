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

interface IFormFields {
  name: string,
  units: string,
  repr: string
}

const emptyFormValues: IFormFields = {
  name: '',
  units: '',
  repr: ''
}

//todo use formik and the YUP for validation
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

  const useStyles = makeStyles(() => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }))

  const classes = useStyles()

  const validate = (values: IFormFields) => {
    const errors: IFormFields = { ...emptyFormValues }

    if (!values.name.trim()) {
      errors.name = 'Required'
    }

    if (!values.units.trim()) {
      errors.units = 'Required'
    }

    if (!values.repr.trim()) {
      errors.repr = 'Required'
    }

    return errors
  }

  const formik = useFormik({
    initialValues: emptyFormValues,
    initialErrors: emptyFormValues,
    validate: validate,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  const handleUpdateClick = () => {
    console.log("submitting")
    formik.handleSubmit()
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
                    variant="outlined"
                    label="Name"
                    name="name"
                    value={formik.values.name}
                    error={formik.touched.name && formik.errors.name != ''}
                    helperText={formik.touched.name && formik.errors.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    fullWidth
                    label="Units"
                    variant="outlined"
                    name="units"
                    value={formik.values.units}
                    error={formik.touched.units && formik.errors.units != ''}
                    helperText={formik.touched.units && formik.errors.units}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    fullWidth
                    label="Representation"
                    variant="outlined"
                    name="repr"
                    value={formik.values.repr}
                    error={formik.touched.repr && formik.errors.repr != ''}
                    helperText={formik.touched.repr && formik.errors.repr}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={4} justify="flex-end">
                <Grid item>
                  <Button variant="contained" onClick={handleClose}>Close</Button>
                </Grid>
                <Grid item>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleRemove}>Delete Column</Button>
                </Grid>
              </Grid>
              <button type="submit">Update</button>
            </form>
          </Box>
        </Paper>
      </Modal>
      <div onClick={openEditVariableModal}>{props.variable.name}</div>
    </div>
  )
}