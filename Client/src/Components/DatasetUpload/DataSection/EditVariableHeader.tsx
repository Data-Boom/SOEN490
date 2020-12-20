import { Box, Button, Grid, Modal, Paper, TextField } from '@material-ui/core'

import { IVariable } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { getErrorAndFormikProps } from '../../../Util/FormUtil'
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

  const formik = useFormik({
    initialValues: { ...props.variable },
    onSubmit: values => {
      props.onVariableUpdate({ ...values }, props.index)
    },
  })

  return (
    <div>
      <Modal
        open={props.editMode}
        onClose={handleClose}
        className={classStyles().modal}
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
                    {...getErrorAndFormikProps(formik, 'name')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    fullWidth
                    label="Units"
                    variant="outlined"
                    {...getErrorAndFormikProps(formik, 'units')}
                  />
                </Grid>
                <Grid item sm={4}>
                  <TextField
                    fullWidth
                    label="Representation"
                    variant="outlined"
                    {...getErrorAndFormikProps(formik, 'repr')}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={4} justify="flex-end">
                <Grid item>
                  <Button variant="contained" onClick={handleClose} disabled={!formik.isValid}>Close</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" type="submit" disabled={!formik.isValid}>Update</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleRemove}>Delete Column</Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Modal>
      <Box height='35px' onClick={openEditVariableModal}>{props.variable.name}</Box>
    </div>
  )
}