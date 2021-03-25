//todo move views into their corresponding feature folders

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { Button, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import { ArrayHelpers } from 'formik'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText'
import { IMaterial } from '../../../../Models/Datasets/IDatasetModel'

interface IProps {
  value: IMaterial[],
  options: IMaterial[],
  fieldArrayHelpers: ArrayHelpers,
  editable: boolean
}

const materialToString = (material: IMaterial) => {
  return material && material.composition + ', ' + material.details
}

export const MaterialSelectChipArray = (props: IProps) => {
  const { value, options, fieldArrayHelpers, editable } = props

  const filter = createFilterOptions<IMaterial>()
  const [open, toggleOpen] = useState(false)
  const [dialogValue, setDialogValue] = useState<IMaterial>()

  const handleDelete = (materialToDelete: IMaterial) => {
    if (editable) {
      const indexToRemove = value.findIndex(material => materialToString(material) == materialToString(materialToDelete))
      fieldArrayHelpers.remove(indexToRemove)
    }
  }

  const handleAdd = (event, newMaterials: IMaterial[]) => {
    newMaterials.forEach(newMaterial => {
      if (!materialToString(newMaterial)) {
        return
      }
      if (!options.includes(newMaterials[0])) {
        setTimeout(() => {
          toggleOpen(true)
        })
      }
      if (value.findIndex((material) => materialToString(material) == materialToString(newMaterial)) == -1) {
        fieldArrayHelpers.push(newMaterial)
      }
    })
  }

  const handleSubmitMaterial = () => {
    toggleOpen(false)
  }

  const handleCloseMaterialForm = () => {
    toggleOpen(false)
  }
  const handleAddNewMaterial = (newMaterials: IMaterial) => {


    // return (
    //   <Dialog open={open} onClose={handleCloseMaterialForm}>
    //     <form onSubmit={handleSubmitMaterial}>
    //       <DialogTitle> Add a new material</DialogTitle>
    //       <DialogContent>
    //         <TextField
    //           autoFocus
    //           margin="dense"
    //           value={newMaterials.composition}
    //           label="Composition"
    //           type="text"
    //         // onChange={(event)=> setDialogValue({ ...dialogValue, event.target.value})}
    //         />
    //         <TextField
    //           autoFocus
    //           margin="dense"
    //           value={newMaterials.details}
    //           label="details"
    //           type="text"
    //         />
    //       </DialogContent>
    //       <DialogActions>
    //         <Button onClick={handleCloseMaterialForm} color="primary">
    //           Cancel
    //         </Button>
    //         <Button type="submit" color="primary">
    //           Add
    //         </Button>
    //       </DialogActions>
    //     </form>
    //   </Dialog>
    // )
  }

  return (
    <>
      <Typography variant='h6' align="left">Materials</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item sm={6}>
          <Autocomplete
            disabled={!editable}
            onChange={handleAdd}
            options={options}
            multiple
            getOptionLabel={option => materialToString(option)}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)
              if (params.inputValue !== '') {
                filtered.push({
                  composition: params.inputValue,
                  details: params.inputValue,
                  id: 1
                })
              }
              return filtered
            }}
            renderInput={(params) => <TextField {...params} label="Material" variant="outlined" />}
          />
          <Dialog open={open} onClose={handleCloseMaterialForm}>
            <form onSubmit={handleSubmitMaterial}>
              <DialogTitle> Add a new material</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Please provide the composition and the details of the metal you want to add
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  //value={dialogValue.composition}
                  label="Composition"
                  type="text"
                //onChange={(event)=> handleAddNewMaterial({ ...dialogValue, event.target.event})}
                />
                <TextField
                  margin="dense"
                  //value={dialogValue.details}
                  //onChange={(event)=> handleAddNewMaterial({ ...dialogValue, event.target.event})}
                  label="details"
                  type="text"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseMaterialForm} color="primary">
                  Cancel
            </Button>
                <Button onClick={handleSubmitMaterial} color="primary">
                  Add Material
            </Button>
              </DialogActions>
            </form>
          </Dialog>
        </Grid>
      </Grid>
    </>
  )
}