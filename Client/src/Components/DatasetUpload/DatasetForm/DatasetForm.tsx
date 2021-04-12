import { Form, Formik } from 'formik'
import { listCategories } from '../../../Remote/Endpoints/CategoryEndpoint'
import { IData, IDatasetMeta, IDatasetModel, IReference } from '../../../Models/Datasets/IDatasetModel'
import React, { useEffect, useState } from 'react'

import { DataForm } from './DataSection/DataForm'
import { IFormProps } from '../../Forms/IFormikForm'
import { MetaForm } from './MetaSection/MetaForm'
import { ReferenceForm } from './ReferenceSection/ReferenceForm'
import { datasetValidationSchema } from '../DatasetValidationSchema'
import { listMaterials } from '../../../Remote/Endpoints/MaterialEndpoint'
import { ICategoryModel } from '../../../Models/Profile/ICategoryModel'

interface IProps extends IFormProps {
  initialDataset: IDatasetModel,
  editable: boolean,
  onSubmit(formDataset: IDatasetModel): void
}

interface DatasetUploadFormValues {
  meta: IDatasetMeta,
  reference: IReference,
  data: IData
}

export const DatasetForm = (props: IProps): any => {
  const { initialDataset, onSubmit, editable, formikReference } = props

  const [categories, setCategories] = useState<ICategoryModel[]>([])
  const [materials, setMaterials] = useState([])

  useEffect(() => {
    const callListCategories = async () => {
      const categories = await listCategories()
      setCategories(categories)
    }

    const callListMaterials = async () => {
      const materials = await listMaterials()
      setMaterials(materials)
    }

    callListCategories()
    callListMaterials()
  }, [])

  const handleSubmit = (values: DatasetUploadFormValues, { resetForm }) => {
    const dataset: IDatasetModel = { ...values.meta, reference: values.reference, data: values.data }
    onSubmit(dataset)
  }

  const meta: IDatasetMeta = initialDataset
  const reference: IReference = initialDataset.reference
  const data: IData = initialDataset.data
  const initialValues: DatasetUploadFormValues = { meta, reference, data }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={datasetValidationSchema}
      onSubmit={handleSubmit}
      innerRef={formikReference}
    >
      <Form>
        <MetaForm materials={materials} editable={editable} categories={categories} />
        <ReferenceForm editable={editable} />
        <DataForm editable={editable} />
      </Form>
    </Formik>
  )
}