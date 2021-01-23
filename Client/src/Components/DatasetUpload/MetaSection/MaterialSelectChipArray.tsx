//todo move views into their corresponding feature folders

import { Chip, Grid, TextField, Typography } from '@material-ui/core'

import { ArrayHelpers } from 'formik'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { IMaterial } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'

interface IProps {
  value: IMaterial[],
  options: IMaterial[],
  fieldArrayHelpers: ArrayHelpers
}

const materialToString = (material: IMaterial) => {
  return material && material.composition + ', ' + material.details
}

export const MaterialSelectChipArray = (props: IProps) => {
  const { value, options, fieldArrayHelpers } = props
  const handleDelete = (materialToDelete: IMaterial) => {
    const indexToRemove = value.findIndex(material => materialToString(material) == materialToString(materialToDelete))
    fieldArrayHelpers.remove(indexToRemove)
  }

  const handleAdd = (event, newMaterial: IMaterial) => {
    //if newMaterial is null or empty
    if (!materialToString(newMaterial)) {
      return
    }

    if (value.findIndex((material) => materialToString(material) == materialToString(newMaterial)) == -1) {
      fieldArrayHelpers.push(newMaterial)
    }
    else {
      //todo notify the user with a snackbar alert, that the material is already there
    }
  }

  const renderMaterials = () => {
    return value && value.map((material, index) =>
      <Grid item key={index}>
        <Chip label={materialToString(material)} key={index} variant="outlined" onDelete={() => handleDelete(material)} />
      </Grid>
    )
  }

  return (
    <>
      <Typography variant='h6' align="left">Materials</Typography>
      <Grid container spacing={2} alignItems="center">
        {renderMaterials()}
        <Grid item sm={6}>
          <Autocomplete
            onChange={handleAdd}
            options={options}
            getOptionLabel={option => materialToString(option)}
            renderInput={(params) => <TextField {...params} label="Material" variant="outlined" size="small" />}
          />
        </Grid>
      </Grid>
    </>
  )
}