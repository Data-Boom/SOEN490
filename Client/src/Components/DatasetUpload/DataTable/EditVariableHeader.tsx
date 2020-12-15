import { Box, Button, Grid, Modal, Paper, TextField, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'

import { IVariable } from '../../../Models/Datasets/IDatasetModel'

interface IProps {
  variable: IVariable,
  index: number,
  editMode: boolean,
  onClick: (index: number) => void,
  onEditModalClose: () => void,
  onVariableUpdate: (variable: IVariable, index: number) => void,
  onVariableRemove: (index: number) => void
}

export const EditVariableHeader = (props: IProps) => {
  const [variableData, setVariableData] = useState(props.variable)

  const handleClick = (event) => {
    props.onClick(props.index)
  }

  const handleRemove = (event) => {
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

  const useStyles = makeStyles(() => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }
  }))

  const classes = useStyles()

  return (
    <>
      <Modal
        open={props.editMode}
        onClose={handleClose}
        className={classes.modal}
      >
        <Paper elevation={3}>
          <Box m={5}>
            <Grid container spacing={4}>
              <Grid item sm={4}>
                {/* todo resolve nesting type problem */}
                <TextField fullWidth label="Name" variant="outlined" name="name" value={variableData.name} onChange={handleInputChange} />
              </Grid>
              <Grid item sm={4}>
                {/* todo resolve nesting type problem */}
                <TextField fullWidth label="Units" variant="outlined" name="units" value={variableData.units} onChange={handleInputChange} />
              </Grid>
              <Grid item sm={4}>
                {/* todo resolve nesting type problem */}
                <TextField fullWidth label="Representation" variant="outlined" name="repr" value={variableData.repr} onChange={handleInputChange} />
              </Grid>
            </Grid>

            <Grid container spacing={4} justify="flex-end">
              <Grid item>
                <Button variant="contained" onClick={handleClose}>Close</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleUpdate}>Update</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={handleRemove}>Delete Column</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Modal>
      <Box onClick={handleClick}>{props.variable.name}</Box>
    </>
  )
}