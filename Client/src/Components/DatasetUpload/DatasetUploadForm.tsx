import { Button, Typography } from '@material-ui/core'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { IData, IDatasetMeta, IDatasetModel, IMaterial, IReference } from '../../Models/Datasets/IDatasetModel'

import { MetaForm } from './MetaSection/MetaForm'
import React from 'react'

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
    const dataset: IDatasetModel = { ...values.meta, reference: values.reference, data: values.data }
    onSubmit(dataset)
  }

  interface Values {
    firstName: string;
    lastName: string;
    email: string;
  }

  return (
    <div>
      <h1>Signup</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
        }}
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>
        ) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
        }}
      >
        <Form>
          <label htmlFor="firstName">First Name</label>
          <Field id="firstName" name="firstName" placeholder="John" />

          <label htmlFor="lastName">Last Name</label>
          <Field id="lastName" name="lastName" placeholder="Doe" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="john@acme.com"
            type="email"
          />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};
}