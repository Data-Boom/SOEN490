import { Box, Typography } from '@material-ui/core'
import { getDimensionNameById, getUnitNameById } from '../../../Common/Helpers/DimensionHelpers'

import { IVariable } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'
import { useDimensions } from '../../Utils/Hooks/useDimensions'

interface IProps {
  variable: IVariable,
  index: number,
  onHeaderClick: (index: number) => void
}

export const VariableHeader = (props: IProps) => {
  const { variable, index, onHeaderClick } = { ...props }
  const { dimensions } = useDimensions()
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