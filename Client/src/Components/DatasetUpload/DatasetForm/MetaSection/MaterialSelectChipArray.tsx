//todo move views into their corresponding feature folders

import { Grid, TextField, Typography } from '@material-ui/core'

import { ArrayHelpers } from 'formik'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { IMaterial } from '../../../../Models/Datasets/IDatasetModel'
import React from 'react'

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

      if (value.findIndex((material) => materialToString(material) == materialToString(newMaterial)) == -1) {
        fieldArrayHelpers.push(newMaterial)
      }
    })
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
            renderInput={(params) => <TextField {...params} label="Material" variant="outlined" />}
          />
        </Grid>
      </Grid>
    </>
  )
}