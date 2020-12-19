import { Box, Grid, TextField, Typography } from '@material-ui/core'
import { IDatasetModel, IMaterial } from '../../../Models/Datasets/IDatasetModel'

import { MaterialSelectChipArray } from './MaterialSelectChipArray'
import React from 'react'
import { classStyles } from '../../../appTheme'

interface IProps {
  // eslint-disable-next-line no-undef
  meta: Omit<IDatasetModel, 'reference' | 'data'>,
  materials: IMaterial[],
  handleMetaChange: (event) => void
}

export const MetaForm = (props: IProps) => {

  const { meta, materials, handleMetaChange } = props

  const materialSelectChange = (materials: IMaterial[]) => {
    handleMetaChange({ ...meta, material: materials })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    handleMetaChange({ ...meta, [name]: value })
  }

  return (
    <Box className={classStyles().defaultBorder}>
      <Typography variant='h6' align="left">Meta</Typography>
      <Grid container spacing={4}>
        <Grid item sm={3}>
          <TextField fullWidth label="Dataset Name" variant="outlined" name="dataset_name" value={meta.dataset_name} onChange={handleInputChange} />
        </Grid>
        <Grid item sm={3}>
          <TextField fullWidth label="Data Type" variant="outlined" name="data_type" value={meta.data_type} onChange={handleInputChange} />
        </Grid>
        <Grid item sm={3}>
          <TextField fullWidth label="Category" variant="outlined" name="category" value={meta.category} onChange={handleInputChange} />
        </Grid>
        <Grid item sm={3}>
          <TextField fullWidth label="Subcategory" variant="outlined" name="subcategory" value={meta.subcategory} onChange={handleInputChange} />
        </Grid>
        <Grid item sm={12}>
          <MaterialSelectChipArray
            selectedMaterials={meta.material}
            name={"material"}
            label={"Material"}
            onChange={materialSelectChange}
            options={materials}
          />
        </Grid>
      </Grid>
    </Box>
  )
}