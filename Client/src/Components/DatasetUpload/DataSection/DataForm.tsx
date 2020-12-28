import { Box } from '@material-ui/core'
import { DatasetDataTable } from './DatasetDataTable'
import { FastField } from 'formik'
import { IData } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'
import { classStyles } from '../../../appTheme'

interface IProps {
}

export const DataForm = (props: IProps) => {

  const FormikDatasetDataTable = ({ field, form, ...props }) => {
    return <DatasetDataTable data={field.value} onDataChange={(newData: IData) => form.setFieldValue(field.name, newData)} />
  }

  return (
    <Box className={classStyles().defaultBorder}>
      <FastField name="data" label='Dataset Name' component={FormikDatasetDataTable} />
    </Box>
  )
}