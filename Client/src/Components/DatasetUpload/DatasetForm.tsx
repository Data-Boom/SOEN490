import { Form, Formik } from 'formik'
import { IData, IDatasetMeta, IDatasetModel, IReference } from '../../Models/Datasets/IDatasetModel'
import React, { useEffect, useState } from 'react'

import { DataForm } from './DataSection/DataForm'
import { MetaForm } from './MetaSection/MetaForm'
import { ReferenceForm } from './ReferenceSection/ReferenceForm'
import { datasetValidationSchema } from './DatasetValidationSchema'
import { listCategories } from '../../Remote/Endpoints/CategoryEndpoint'
import { listMaterials } from '../../Remote/Endpoints/MaterialEndpoint'
import { listSubcategories } from '../../Remote/Endpoints/SubcategoryEndpoint'

interface IProps {
  initialDataset: IDatasetModel,
  editable: boolean,
  onSubmit(formDataset: IDatasetModel): void,
  formikReference: any
}

interface DatasetUploadFormValues {
  meta: IDatasetMeta,
  reference: IReference,
  data: IData
}

export const DatasetForm = (props: IProps): any => {
  const { initialDataset, onSubmit, editable, formikReference } = props

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [materials, setMaterials] = useState([])

  useEffect(() => {
    const callListCategories = async () => {
      const categories = await listCategories()
      setCategories(categories)
    }

    const callListSubcategory = async () => {
      const subcategories = await listSubcategories()
      setSubcategories(subcategories)
    }

    const callListMaterials = async () => {
      const materials = await listMaterials()
      setMaterials(materials)
    }

    callListCategories()
    callListSubcategory()
    callListMaterials()
  }, [])

  const handleSubmit = (values: DatasetUploadFormValues) => {
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
        <MetaForm materials={materials} editable={editable} categories={categories} subcategories={subcategories} />
        <ReferenceForm editable={editable} />
        <DataForm editable={editable} />
      </Form>
    </Formik>
  )
}