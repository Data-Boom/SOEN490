import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { IDimensionModel, IUnitModel } from '../../../../../Server/src/models/interfaces/IDimension'
import React, { useEffect, useState } from 'react'

import { AddIcon } from '@material-ui/data-grid'
import { ArrayHelpers } from 'formik'
import { DimensionForm } from './DimensionForm'
import { callGetAllDimensions } from '../../../Remote/Endpoints/DimensionsEndpoint'
import { classStyles } from '../../../appTheme'

interface IProps {
  units: IUnitModel[],
  fieldArrayHelpers: ArrayHelpers,
}


export const DimensionManagementTab = () => {

  const [dimensions, setDimensions] = useState<IDimensionModel[]>()
  // TODO: Fetch list of dimensions/units from backend.
  // TODO: For each dimenstionm, render a new Dimension Form using its values as the initial values.
  // TODO: Have a "New" button that renders a Dimenstion Form with no initial values.

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
    const getDimensions = async () => {
      const databaseDimensions = await callGetAllDimensions()
      console.log(databaseDimensions)
      setDimensions(databaseDimensions)
    }
    getDimensions()
  }, [])

  return (
    <>
      <Box className={classStyles().defaultBorder} style={{ width: "100%" }} >
        <Typography variant='h6' align="left">System Wide Dimensions</Typography>
        {dimensions && dimensions.map((dimension, index) => (
          <DimensionForm key={index} dimension={dimension} />
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