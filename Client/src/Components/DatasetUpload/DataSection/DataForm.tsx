import { Box } from '@material-ui/core'
import { DatasetDataTable } from './DatasetDataTable'
import { IData } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'
import { classStyles } from '../../../appTheme'

interface IProps {
  data: IData,
  onDataChanged: (newData: IData) => void
}

export const DataForm = (props: IProps) => {
  const { data, onDataChanged } = { ...props }

  return (
    <Box className={classStyles().defaultBorder}>
      <DatasetDataTable
        data={data}
        onDataChange={onDataChanged}
      />
    </Box>
  )
}