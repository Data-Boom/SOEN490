import { Box, Button, Grid, Modal, Paper } from '@material-ui/core'
import { FastField, Form, Formik } from 'formik'

import { IVariable } from '../../../Models/Datasets/IDatasetModel'
import { MuiTextFieldFormik } from '../../Forms/FormikFields'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { variableValidationSchema } from '../DatasetValidationSchema'

interface IProps {
  variable: IVariable,
  index: number,
  editMode: boolean,
  editable: boolean,
  onHeaderClick: (index: number) => void,
  onEditModalClose: () => void,
  onVariableUpdate: (variable: IVariable, index: number) => void,
  onVariableRemove: (index: number) => void
}

export const EditVariableHeader = (props: IProps) => {

  const editable = props.editable

  const handleRemove = () => {
    console.log(editable)
    if (editable) {
      props.onVariableRemove(props.index)
    }
  }

  const handleClose = () => {
    console.log(editable)
    if (editable) {
      props.onEditModalClose()
    }
  }

  const openEditVariableModal = () => {
    console.log(editable)
    if (editable) {
      props.onHeaderClick(props.index)
    }
  }

  return (
    <div>
      <Modal open={props.editMode} onClose={handleClose} className={classStyles().modal}>
        <Paper elevation={3}>
          <Box m={5}>
            <Formik initialValues={props.variable} validationSchema={variableValidationSchema} onSubmit={values => { props.onVariableUpdate({ ...values }, props.index) }}>
              <Form>
                <Grid container spacing={4}>
                  <Grid item sm={4}>
                    <FastField name="name" label='Name' component={MuiTextFieldFormik} />
                  </Grid>
                  <Grid item sm={4}>
                    <FastField name="units" label='Units' component={MuiTextFieldFormik} />
                  </Grid>
                  <Grid item sm={4}>
                    <FastField name="repr" label='Representation' component={MuiTextFieldFormik} />
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
              </Form>
            </Formik>
          </Box>
        </Paper>
      </Modal>
      <Box height='35px' onClick={openEditVariableModal}>{props.variable.name}</Box>
    </div>
  )
}