import { Box, Button, Grid, Paper, Table, TableContainer, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import { DimensionForm } from './DimensionForm'
import { IExampleDimenstions } from '../../../Models/Profile/IDimenstionModel'
import { classStyles } from '../../../appTheme'

interface IProps {

}


export const DimensionManagementTab = () => {

  const [dimensions, setDimensions] = useState(IExampleDimenstions)
  // TODO: Fetch list of dimensions/units from backend.
  // TODO: For each dimenstionm, render a new Dimension Form using its values as the initial values.
  // TODO: Have a "New" button that renders a Dimenstion Form with no initial values.

  const handleUpdateDimension = () => {

  }

  const handleDeleteDimension = () => {

  }

  const handleCreateDimenstion = () => {

  }

  return (
    <>
      <Box className={classStyles().defaultBorder} style={{ width: "100%" }} >
        <Typography variant='h6' align="left">System Wide Dimensions</Typography>
        {dimensions.map(dimension => (
          <DimensionForm dimension={dimension} />
        ))}

      </Box>
    </>
  )

}