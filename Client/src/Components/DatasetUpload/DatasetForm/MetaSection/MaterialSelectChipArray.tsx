//todo move views into their corresponding feature folders

import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { Button, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from '@material-ui/core'
import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'

import { ArrayHelpers } from 'formik'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText'
import { IMaterial } from '../../../../Models/Datasets/IDatasetModel'
import { MuiTextFieldFormik } from '../../../Forms/FormikFields'
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

interface IMaterialOption extends IMaterial {
  title?: string
}

export const MaterialSelectChipArray = (props: IProps) => {
  const { value, options, fieldArrayHelpers, editable } = props

  const filter = createFilterOptions<IMaterialOption>()
  const [open, toggleOpen] = useState(false)
  const [dialogValue, setDialogValue] = useState<IMaterial>()

  const initialValues = {
    composition: '',
    details: '',
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
    console.log(newMaterials, 'added material just now with the dialog')
  }

  const handleSubmitMaterial = (newMaterial: IMaterial) => {
    const newMaterialAdded: IMaterial[] = [newMaterial]
    fieldArrayHelpers.push(newMaterial)
    console.log(newMaterial, 'pushed new material')
    toggleOpen(false)
  }

  const handleCloseMaterialForm = () => {
    toggleOpen(false)
  }

  const renderInputs = () => {
    return (
      <Grid>
        <DialogTitle> Add a new material</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the composition and the details of the metal you want to add
          </DialogContentText>
          <Field name="composition" label='Composition' component={MuiTextFieldFormik} />
          <Field name="details" label='Details' component={MuiTextFieldFormik} />
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
          <Button color="primary" type="submit">
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
            value={value}
            onChange={handleAdd}
            options={options}
            multiple
            getOptionLabel={(option) => {
              if (option) {
                return materialToString(option)
              }
              return (option as any)?.title
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params)

              if (params.inputValue !== '') {
                filtered.push({
                  composition: params.inputValue,
                  details: '',
                  title: `Add "${params.inputValue}"`,
                  id: 1
                })
              }
              return filtered
            }}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Material" variant="outlined" />}
          />
          <Dialog open={open} onClose={handleCloseMaterialForm}>
            <Formik initialValues={initialValues} validationSchema={materialValidationSchema} onSubmit={handleSubmitMaterial}>
              <Form>
                <Grid container spacing={4}>
                  <Grid item>
                    {renderInputs()}
                  </Grid>
                  <Grid item>
                    {renderButtons()}
                  </Grid>
                </Grid>
              </Form>
            </Formik>
          </Dialog>
        </Grid>
      </Grid>
    </>
  )
}