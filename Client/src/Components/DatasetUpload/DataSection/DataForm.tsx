import { Box } from '@material-ui/core'
import { DatasetDataTable } from './DatasetDataTable'
import { IData } from '../../../Models/Datasets/IDatasetModel'
import React from 'react'
import { classStyles } from '../../../appTheme'
import { useFormik } from 'formik'

interface IProps {
  name: string,
  value: IData,
  setFieldValue: (fieldName: string, newReference: IData) => void
}

export const DataForm = (props: IProps) => {

  const { name, value, setFieldValue } = props

  const formik = useFormik({
    initialValues: value,
    //this is subform and therefore its not submitting, but istead is propagating change up
    onSubmit: () => { }
  })

  //anytime the current reference changes we will call parent component about it
  React.useEffect(() => {
    setFieldValue(name, formik.values)
  }, [formik.values])

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