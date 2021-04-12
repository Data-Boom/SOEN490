import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { IDimensionModel, IUnitModel } from '../../../../../Server/src/models/interfaces/IDimension'
import React, { useEffect, useState } from 'react'
import { callAddDimension, callChangeDimension, callDeleteDimension } from '../../../Remote/Endpoints/DimensionsEndpoint'

import AddIcon from '@material-ui/icons/Add'
import { DimensionForm } from './DimensionForm'
import { callGetAllDimensions } from '../../../Remote/Endpoints/DimensionsEndpoint'
import { classStyles } from '../../../appTheme'

export const DimensionManagementTab = () => {
  const [dimensions, setDimensions] = useState<IDimensionModel[]>()

  const newUnit: IUnitModel = {
    conversionFormula: '{u}',
    name: ''
  }

  const newDimension: IDimensionModel = {
    name: '',
    units: [newUnit]
  }

  const addNewDimension = () => {
    const dimensionsCopy = [...dimensions]
    dimensionsCopy.push(newDimension)
    setDimensions(dimensionsCopy)
  }

  useEffect(() => {
    getDimensions()
  }, [])

  const getDimensions = async () => {
    const databaseDimensions = await callGetAllDimensions()
    setDimensions(databaseDimensions)
  }
  const handleUpdateDimension = async (formValues: IDimensionModel) => {
    await callChangeDimension(formValues)
    getDimensions()
  }

  const handleDeleteDimension = async (id: number) => {
    await callDeleteDimension(id)
    getDimensions()
  }

  const handleCreateDimension = async (formValues: IDimensionModel) => {
    await callAddDimension(formValues)
    getDimensions()
  }

  return (
    <>
      <Box className={classStyles().defaultBorder} style={{ width: "100%" }} >
        <Typography variant='h6' align="left">System Wide Dimensions</Typography>
        {dimensions && dimensions.map((dimension, index) => (
          <DimensionForm key={index} dimension={dimension} onUpdate={handleUpdateDimension} onDelete={handleDeleteDimension} onCreate={handleCreateDimension} />
        ))}
        <Grid item>
          <IconButton color="primary" aria-label="add unit" onClick={addNewDimension}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Box>
    </>
  )
}