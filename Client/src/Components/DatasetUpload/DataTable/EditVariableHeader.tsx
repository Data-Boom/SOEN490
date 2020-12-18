import { Box, Button, Grid, Modal, Paper, TextField, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

import { IVariable } from '../../../Models/Datasets/IDatasetModel'

interface IProps {
  variable: IVariable,
  index: number,
  editMode: boolean,
  onHeaderClick: (index: number) => void,
  onEditModalClose: () => void,
  onVariableUpdate: (variable: IVariable, index: number) => void,
  onVariableRemove: (index: number) => void
}

interface IValidFieldsState {
  name: boolean,
  units: boolean,
  repr: boolean
}

export const EditVariableHeader = (props: IProps) => {
  const [variableData, setVariableData] = useState<IVariable>(props.variable)
  const handleRemove = () => {
    props.onVariableRemove(props.index)
  }

  const handleClose = () => {
    props.onEditModalClose()
  }

  const handleUpdate = () => {
    props.onVariableUpdate(variableData, props.index)
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setVariableData({ ...variableData, [name]: value })
  }

  const isValidField = (fieldName: string): boolean => {
    return variableData[fieldName].length === 0
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

  const getHelperText = (displayText: boolean) => {
    return displayText ? "field should not be empty" : ""
  }

  const isValidForm = () => {
    return isValidField(variableData.units) && validFields.name && validFields.repr
  }












  //todo  https://stackoverflow.com/questions/4602141/variable-name-as-a-string-in-javascript

  return (
    <div>
      <Modal
        open={props.editMode}
        onClose={handleClose}
        className={classes.modal}
      >
        <Paper elevation={3}>
          <Box m={5}>
            <Grid container spacing={4}>
              <Grid item sm={4}>
                <TextField fullWidth label="Name" variant="outlined" name="name" value={variableData.name} onChange={handleInputChange} helperText={getHelperText(!validFields.name)} error={!validFields.name} />
              </Grid>
              <Grid item sm={4}>
                <TextField fullWidth label="Units" variant="outlined" name="units" value={variableData.units} onChange={handleInputChange} helperText={getHelperText(!validFields.units)} error={!validFields.units} />
              </Grid>
              <Grid item sm={4}>
                <TextField fullWidth label="Representation" variant="outlined" name="repr" value={variableData.repr} onChange={handleInputChange} helperText={getHelperText(!validFields.repr)} error={!validFields.repr} />
              </Grid>
            </Grid>

            <Grid container spacing={4} justify="flex-end">
              <Grid item>
                <Button variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleUpdate} disabled={!isValidForm()}>Update</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleRemove}>Delete Column</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Modal>
      <div onClick={openEditVariableModal}>{props.variable.name}</div>
    </div>
  )
}