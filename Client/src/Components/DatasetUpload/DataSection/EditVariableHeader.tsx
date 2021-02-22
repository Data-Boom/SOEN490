import { Box, Button, Grid, Modal, Paper } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { IDimensionModel, IUnitModel } from '../../../../../Server/src/models/interfaces/IDimension'
import { MuiSelectFormik, MuiTextFieldFormik } from '../../Forms/FormikFields'
import React, { useState } from 'react'

import { IVariable } from '../../../Models/Datasets/IDatasetModel'
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
  dimensions: IDimensionModel[]
}

export const EditVariableHeader = (props: IProps) => {
  const { variable, editMode, editable, index, onHeaderClick, onEditModalClose, onVariableUpdate, onVariableRemove, dimensions } = { ...props }

  const [selectedDimensionId, setSelectedDimensionId] = useState<number | null>(null)

  const handleRemove = () => {
    if (editable) {
      onVariableRemove(index)
    }
  }

  const handleClose = () => {
    if (editable) {
      onEditModalClose()
    }
  }

  const openEditVariableModal = () => {
    if (editable) {
      onHeaderClick(index)
    }
  }

  const getDimensionsOptions = (options: IDimensionModel[]): any => {
    return (
      <>
        <option value={null}></option>
        {options.map(option => <option key={option.id} value={option.id}> {option.name} </option>)}
      </>
    )
  }

  const getUnitsOptions = (options: IUnitModel[]): any => {
    return (
      <>
        <option value={null}></option>
        {options.map(option => <option key={option.id} value={option.id}> {option.name} </option>)}
      </>
    )
  }

  const getUnits = (dimensionId: number): IUnitModel[] => {
    const foundDimension = dimensions.find(dimension => dimension.id == dimensionId)
    if (!foundDimension) {
      return []
    }
    return foundDimension.units
  }

  const handleDimensionsChanged = (formProps, value: any) => {
    const dimensionId = value.target.value
    formProps.setFieldValue('dimensionId', dimensionId)
    setSelectedDimensionId(dimensionId)
  }

  return (
    <div>
      <Modal open={editMode} onClose={handleClose} className={classStyles().modal}>
        <Paper elevation={3}>
          <Box m={5}>
            <Formik initialValues={variable} validationSchema={variableValidationSchema} onSubmit={values => { onVariableUpdate({ ...values }, index) }}>
              {formProps =>
                <Form>
                  <Grid container spacing={4}>
                    <Grid item sm={4}>
                      <Field name="name" label='Name' component={MuiTextFieldFormik} />
                    </Grid>
                    <Grid item sm={4}>
                      <Field
                        name="dimensionId"
                        label='Dimensions'
                        disabled={!editable}
                        component={MuiSelectFormik}
                        options={getDimensionsOptions(dimensions)}
                        onChange={(value) => handleDimensionsChanged(formProps, value)} />
                    </Grid>
                    <Grid item sm={4}>
                      {/* todo disable if dimensionid not selected */}
                      {/* add an empty option with null value*/}
                      <Field name="unitId" label='Units' disabled={!editable} component={MuiSelectFormik} options={getUnitsOptions(getUnits(selectedDimensionId))} />
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
              }
            </Formik>
          </Box>
        </Paper>
      </Modal>
      <Box height='35px' onClick={openEditVariableModal}>{variable.name}</Box>
    </div >
  )
}