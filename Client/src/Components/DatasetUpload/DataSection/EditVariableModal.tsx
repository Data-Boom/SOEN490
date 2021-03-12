import { Box, Button, Grid, Modal, Paper } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import { IDimensionModel, IUnitModel } from '../../../Models/Dimensions/IDimensionModel'
import { MuiAutocompleteFormik, MuiSelectFormik } from '../../Forms/FormikFields'
import React, { useState } from 'react'

import { IVariable } from '../../../Models/Datasets/IDatasetModel'
import { IVariableNameModel } from '../../../Models/Variables/IVariableNameModel'
import { classStyles } from '../../../appTheme'
import { useDimensions } from '../../Utils/Hooks/FetchHooks'
import { variableValidationSchema } from '../DatasetValidationSchema'

interface IProps {
  initialValues: IVariable
  onVariableUpdate: (newVariable: IVariable) => void
  onCancel: () => void
  onDelete: () => void
  editable: boolean
  isOpen: boolean
  isNewVariable: boolean
  variables: IVariableNameModel[]
}

export const EditVaraibleModal = (props: IProps) => {
  const { initialValues, onCancel, onDelete, onVariableUpdate, editable, isOpen, isNewVariable, variables } = props
  const [selectedDimensionId, setSelectedDimensionId] = useState<number | null>(null)
  const { dimensions } = useDimensions()


  const getDimensionsOptions = (options: IDimensionModel[]): any => {
    return (
      <>
        <option value={null}></option>
        {options.map(option => <option key={option.id} value={option.id}> {option.name} </option>)}
      </>
    )
  }

  // todo poor duplicated code with options everywhere
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
    <Modal open={isOpen} onClose={onCancel} className={classStyles().modal}>
      <Paper elevation={3}>
        <Box m={5} minWidth='600px'>
          <Formik initialValues={initialValues} validationSchema={variableValidationSchema} onSubmit={onVariableUpdate}>
            {formProps =>
              <Form>
                {console.log(formProps.errors)}
                <Grid container spacing={4}>
                  <Grid item sm={4}>
                    {<Field name="name"
                      label='Name'
                      disabled={!editable}
                      component={MuiAutocompleteFormik}
                      options={variables.map(variable => variable.name)}
                      onChange={(event, newOption) => console.log(newOption, 'eventwow')}
                      disableClearable
                    />}
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
                    <Field name="unitId" label='Units' disabled={!editable || !selectedDimensionId} component={MuiSelectFormik} options={getUnitsOptions(getUnits(selectedDimensionId))} />
                  </Grid>
                </Grid>
                <Grid container spacing={4} justify="flex-end">
                  {isNewVariable
                    ? <>
                      <Grid item>
                        <Button variant="outlined" color="primary" onClick={onCancel}>Cancel</Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary" type="submit">Save</Button>
                      </Grid>
                    </>
                    : <>
                      <Grid item>
                        <Button variant="contained" color="secondary" onClick={onDelete}>Remove Variable</Button>
                      </Grid>
                      <Grid item>
                        <Button variant="outlined" color="primary" onClick={onCancel}>Cancel</Button>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" color="primary" type="submit">Update</Button>
                      </Grid>
                    </>
                  }
                </Grid>
              </Form>
            }
          </Formik>
        </Box>
      </Paper>
    </Modal>
  )
}