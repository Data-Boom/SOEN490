import { Box } from '@material-ui/core'
import { DatasetDataTable } from './DatasetDataTable'
import { FastField } from 'formik'
import { IData } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { shouldComponentUpdate } from '../../Forms/ComponentUpdate'

interface IProps {
  editable: boolean
}

export const DataForm = (props: IProps) => {

  const FormikDatasetDataTable = ({ field, form, ...props }) => {
    return <DatasetDataTable editable={props.editable} data={field.value} onDataChange={(newData: IData) => form.setFieldValue(field.name, newData)} />
  }

  return (
    <Box className={classStyles().defaultBorder}>
      <FastField name="data" label='Dataset Name' disabled={!props.editable} shouldUpdate={shouldComponentUpdate} component={FormikDatasetDataTable} />
    </Box>
  )
}