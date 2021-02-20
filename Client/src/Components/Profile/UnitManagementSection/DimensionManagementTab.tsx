import { Box, Button, Grid, IconButton, Paper, Table, TableContainer, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

import { AddIcon } from '@material-ui/data-grid'
import { ArrayHelpers } from 'formik'
import { DimensionForm } from './DimensionForm'
import { IExampleDimenstions } from '../../../Models/Profile/IDimensionModel'
import { IUnitModel } from '../../../../../Server/src/models/interfaces/IDimension'
import { callGetAllDimensions } from '../../../Remote/Endpoints/DimensionsEndpoint'
import { classStyles } from '../../../appTheme'

interface IProps {
  units: IUnitModel[],
  fieldArrayHelpers: ArrayHelpers,
}


export const DimensionManagementTab = () => {

  const [dimensions, setDimensions] = useState(IExampleDimenstions)
  // TODO: Fetch list of dimensions/units from backend.
  // TODO: For each dimenstionm, render a new Dimension Form using its values as the initial values.
  // TODO: Have a "New" button that renders a Dimenstion Form with no initial values.


  const addNewDimension = () => {
    console.log("add new dimension")
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
        {dimensions.map(dimension => (
          <DimensionForm dimension={dimension} />
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