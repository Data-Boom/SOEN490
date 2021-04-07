//todo move views into their corresponding feature folders

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { Button, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'

import { ArrayHelpers } from 'formik'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText'
import { IMaterial } from '../../../../Models/Datasets/IDatasetModel'
import { materialValidationSchema } from '../../DatasetValidationSchema'

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

  const initialValues = {
    composition: '',
    details: '',
  }
  const [materialComposition, setMaterialcomposition] = useState<string | null>(initialValues?.composition)
  const [materialDetails, setMaterialDetails] = useState<string | null>(initialValues?.details)



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
      } else {
        toggleOpen(true)
      }
      if (value.findIndex((material) => materialToString(material) == materialToString(newMaterial)) == -1) {
        fieldArrayHelpers.push(newMaterial)
      }
    })
  }

  const handleMaterialChanged = () => {
    const newMaterial: IMaterial = {
      composition: materialComposition,
      details: materialDetails,
      id: 0
    }
    return newMaterial
  }

  const handleSubmitMaterial = () => {
    if (materialComposition) {
      const newMaterialAdded: IMaterial[] = [handleMaterialChanged()]
      handleAdd(toggleOpen(false), newMaterialAdded)
    }

    toggleOpen(false)
  }

  const handleCloseMaterialForm = () => {
    toggleOpen(false)
  }
  const handleAddNewMaterialComposition = (formProps, value: any) => {
    const composition = value.target.value
    setMaterialcomposition(composition)
  }
  const handleAddNewMaterialDetails = (formProps, value: any) => {
    const details = value.target.value
    setMaterialDetails(details)
  }

  const renderInputs = (formProps) => {
    return (
      <Grid>
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
            onChange={(value) => handleAddNewMaterialComposition(formProps, value)}
          />
          <TextField
            margin="dense"
            //value={dialogValue.details}
            onChange={(value) => handleAddNewMaterialDetails(formProps, value)}
            label="details"
            type="text"
          />
        </DialogContent>
      </Grid>
    )
  }

  const renderButtons = () => {
    return (
      <Grid>
        <DialogActions>
          <Button onClick={handleCloseMaterialForm} color="primary">
            Cancel
            </Button>
          <Button onClick={handleSubmitMaterial} color="primary">
            Add Material
            </Button>
        </DialogActions>
      </Grid>
    )
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
            <Formik initialValues={initialValues} validationSchema={materialValidationSchema} onSubmit={handleSubmitMaterial}>
              {formProps =>
                <Form>
                  <Grid container spacing={4}>
                    <Grid item>
                      {renderInputs(formProps)}
                    </Grid>
                    <Grid item>
                      {renderButtons()}
                    </Grid>
                  </Grid>
                </Form>
              }
            </Formik>
          </Dialog>
        </Grid>
      </Grid>
    </>
  )
}