import { Box, Button, Grid, TextField, Typography, makeStyles, useTheme } from '@material-ui/core'
import { IDatasetModel, IMaterial, defaultDatasetModel } from '../../Models/Datasets/IDatasetModel'
import React, { useState } from 'react'

import { SelectChipArray } from './SelectChipArray'

interface IProps {
  handleSubmit(formDataset: IDatasetModel): void,
  materials: IMaterial[]
}

export const DatasetUploadForm = (props: IProps): any => {
  const theme = useTheme()

  //todo this is copy pasted from Graph/DatasetRow, it should be in the appTheme.js file somehow 
  const classes = makeStyles({
    paperColor: {
      borderColor: theme.palette.primary.light,
      borderRadius: 3,
      borderWidth: '1px',
      border: 'solid',
      padding: '15px',
      margin: '15px 0'
    },
  })()

  const [formValues, setFormValues] = useState<IDatasetModel>(defaultDatasetModel)

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormValues({ ...formValues, [name]: value })
  }

  const materialSelectChange = (materials: string[]) => {
    // todo change the actual materials, maybe wrap the chip array into an actual material chip array

  }

  return (
    <>
      <Typography variant='h4' align="left">New Dataset</Typography>

      <Box className={classes.paperColor}>
        <Grid container>
          <Typography variant='h6' align="left">Meta</Typography>
        </Grid>
        <Grid container spacing={4}>
          <Grid item sm={3}>
            <TextField fullWidth label="Dataset Name" variant="outlined" name="dataset_name" value={formValues.dataset_name} onChange={handleInputChange} />
          </Grid>
          <Grid item sm={3}>
            <TextField fullWidth label="Data Type" variant="outlined" name="data_type" value={formValues.data_type} onChange={handleInputChange} />
          </Grid>
          {/* todo category and subcategory should be a select of available in the db categories, or new???*/}
          <Grid item sm={3}>
            <TextField fullWidth label="Category" variant="outlined" name="category" value={formValues.category} onChange={handleInputChange} />
          </Grid>
          {/* todo category and subcategory should be a select of available in the db categories, or new???*/}
          <Grid item sm={3}>
            <TextField fullWidth label="Subcategory" variant="outlined" name="subcategory" value={formValues.subcategory} onChange={handleInputChange} />
          </Grid>
          {/* todo materials need a specific chip selector thingy, with the ability to create new materials potentially*/}
          {/* todo should we alow "on the fly" creating new materials if they are not in our db?*/}
          <Grid item sm={6}>
            <SelectChipArray value={props.materials.map(material => material.details)} name={"material"} label={"Material"} onChange={materialSelectChange} />
            <TextField fullWidth label="Material" variant="outlined" name="subcategory" value={formValues.subcategory} onChange={handleInputChange} />
          </Grid>
        </Grid>
      </Box>
      <Box className={classes.paperColor}>
        <Typography variant='h6' align="left">Reference</Typography>
      </Box>
      <Box className={classes.paperColor}>
        <Typography variant='h6' align="left">Data</Typography>
      </Box>
      <Button variant="contained" color="primary" onClick={() => props.handleSubmit(formValues)}> Submit Dataset </Button>
    </>
  )
}