//todo move views into their corresponding feature folders

import { Chip, Grid, TextField, Typography } from '@material-ui/core'

import Autocomplete from '@material-ui/lab/Autocomplete'
import { IMaterial } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'

interface IProps {
  name: string,
  value: IMaterial[],
  setFieldValue: (fieldName: string, selectedValues: IMaterial[]) => void,
  options: IMaterial[],
}

const materialToString = (material: IMaterial) => {
  return material && material.composition + ' ' + material.details
}

export const MaterialSelectChipArray = (props: IProps) => {
  const { name, value, setFieldValue, options } = props

  const handleDelete = (materialToDelete: IMaterial) => {
    const newMaterials: IMaterial[] = value.filter((material) => materialToString(material) != materialToString(materialToDelete))
    setFieldValue(name, newMaterials)
  }

  const handleChange = (event, newMaterial: IMaterial) => {
    if (!materialToString(newMaterial)) {
      return
    }

    if (value.findIndex((material) => materialToString(material) == materialToString(newMaterial)) == -1) {
      setFieldValue(name, [...value, newMaterial])
    }
    else {
      //todo notify the user with a snackbar alert, that the material is already there
    }
  }

  return (
    <>
      <Typography variant='h6' align="left">Materials</Typography>
      <Grid container spacing={2} alignItems="center">
        {value.map((material, index) => <Grid item key={index}><Chip label={materialToString(material)} key={index} variant="outlined" onDelete={() => handleDelete(material)} /></Grid>)}
        <Grid item sm={6}>
          <Autocomplete
            onChange={handleChange}
            options={options}
            getOptionLabel={option => materialToString(option)}
            renderInput={(params) => <TextField {...params} label="Material" variant="outlined" size="small" />}
          />
        </Grid>
      </Grid>
    </>
  )
}