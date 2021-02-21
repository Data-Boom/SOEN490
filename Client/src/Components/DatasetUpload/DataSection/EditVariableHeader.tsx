import { Box, Button, Grid, Modal, Paper } from '@material-ui/core'
import { FastField, Form, Formik } from 'formik'
import { IDimensionModel, IUnitModel } from '../../../../../Server/src/models/interfaces/IDimension'
import { MuiSelectFormik, MuiTextFieldFormik } from '../../Forms/FormikFields'

import { IVariable } from '../../../Models/Datasets/IDatasetModel'
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
  dimensions: IDimensionModel[],
  singleDimension: IDimensionModel
}

export const EditVariableHeader = (props: IProps) => {

  const { dimensions, singleDimension } = { ...props }
  const editable = props.editable

  const handleRemove = () => {
    if (editable) {
      props.onVariableRemove(props.index)
    }
  }

  const handleClose = () => {
    if (editable) {
      props.onEditModalClose()
    }
  }

  const openEditVariableModal = () => {
    if (editable) {
      props.onHeaderClick(props.index)
    }
  }

  const getDimensionsOptions = (options: IDimensionModel[]): any => {
    return (
      <>
        {options.map(option => <option key={option.id} value={option.name}> {option.name} </option>)}
      </>
    )
  }
  const getUnitsOptions = (options: IUnitModel[]): any => {
    return (
      <>
        {options.map(option => <option key={option.id} value={option.name}> {option.name} </option>)}
      </>
    )
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
                    <FastField name="dimensionId" label='Dimensions' disabled={!editable} component={MuiSelectFormik} options={getDimensionsOptions(dimensions)} />
                  </Grid>
                  <Grid item sm={4}>
                    <FastField name="unitsId" label='Units' disabled={!editable} component={MuiSelectFormik} options={getDimensionsOptions(dimensions)} />
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