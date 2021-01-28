import { Box } from '@material-ui/core'
import { DatasetDataTable } from './DatasetDataTable'
import { FastField } from 'formik'
import { IData } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { shouldComponentUpdate } from '../../Forms/ComponentUpdate'
import { useEffect } from 'react'
import { useState } from 'react'

interface IProps {
  editable: boolean
}

export const DataForm = (props: IProps) => {
  const { editable } = props

  useEffect(() => {
    console.log(editable)
  }, [props.editable])

  const FormikDatasetDataTable = ({ field, form, ...props }) => {
    console.log(editable)
    return <DatasetDataTable editable={editable} data={field.value} onDataChange={(newData: IData) => form.setFieldValue(field.name, newData)} />
  }

  return (
    <Box className={classStyles().defaultBorder}>
      <FastField name="data" label='Dataset Name' shouldUpdate={shouldComponentUpdate} component={FormikDatasetDataTable} />
    </Box>
  )
}