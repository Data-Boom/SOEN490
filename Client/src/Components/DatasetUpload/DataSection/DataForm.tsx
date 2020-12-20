import { Box } from '@material-ui/core'
import { DatasetDataTable } from './DatasetDataTable'
import { IData } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'
import { classStyles } from '../../../appTheme'

interface IProps {
  name: string,
  value: IData,
  setFieldValue: (fieldName: string, newReference: IData) => void
}

export const DataForm = (props: IProps) => {

  const { name, value, setFieldValue } = props

  const handleDataChange = (newData: IData) => {
    setFieldValue(name, newData)
  }

  return (
    <Box className={classStyles().defaultBorder}>
      <DatasetDataTable
        data={value}
        onDataChange={handleDataChange}
      />
    </Box>
  )
}