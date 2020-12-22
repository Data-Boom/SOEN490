import * as Yup from 'yup'

import { Button, Typography } from '@material-ui/core'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { IData, IDatasetMeta, IDatasetModel, IMaterial, IReference } from '../../Models/Datasets/IDatasetModel'

import { MetaForm } from './MetaSection/MetaForm'
import React from 'react'
import { ReferenceForm } from './ReferenceSection/ReferenceForm'

interface IProps {
  materials: IMaterial[],
  initialDataset: IDatasetModel,
  onSubmit(formDataset: IDatasetModel): void
}

interface DatasetUploadFormValues {
  meta: IDatasetMeta,
  reference: IReference,
  data: IData
}

export const DatasetUploadForm = (props: IProps): any => {

  const { materials, initialDataset, onSubmit } = props

  const meta: IDatasetMeta = initialDataset
  const reference: IReference = initialDataset.reference
  const data: IData = initialDataset.data

  const initialValues: DatasetUploadFormValues = { meta, reference, data }

  const handleSubmit = (values: DatasetUploadFormValues, actions: unknown) => {
    console.log('submitting');
    const dataset: IDatasetModel = { ...values.meta, reference: values.reference, data: values.data }
    onSubmit(dataset)
  }

  const validationSchema = Yup.object().shape({
    reference: Yup.object().shape({
      title: Yup.string().required(),
      authors: Yup.array().of(
        Yup.object().shape(
          {
            firstname: Yup.string().trim().required('First Name is a required string'),
            middlename: Yup.string(),
            lastname: Yup.string().trim().required('Last Name is a required string')
          }
        )
      ),
    }),
  })

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <MetaForm materials={materials} />
          <ReferenceForm />
          <Button variant="contained" color="primary" type="submit"> Save Dataset </Button>
        </Form>
      </Formik>
    </div>
  );
}