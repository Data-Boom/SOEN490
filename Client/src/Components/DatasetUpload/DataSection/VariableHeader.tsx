import { Box, Typography } from '@material-ui/core'
import { getDimensionNameById, getUnitNameById } from '../../../Common/Helpers/DimensionHelpers'

import { IDimensionModel } from '../../../Models/Dimensions/IDimensionModel'
import { IVariable } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'

interface IProps {
  variable: IVariable,
  index: number,
  onHeaderClick: (index: number) => void
  dimensions: IDimensionModel[]
}

export const VariableHeader = (props: IProps) => {
  const { variable, index, onHeaderClick, dimensions } = { ...props }
  return (
    <Box onClick={() => onHeaderClick(index)}>
      <Typography>
        {variable.name}
      </Typography>
      <Typography>
        {getDimensionNameById(dimensions, variable.dimensionId)}
      </Typography>
      <Typography>
        {getUnitNameById(dimensions, variable.unitId)}
      </Typography>
    </Box>
  )
}