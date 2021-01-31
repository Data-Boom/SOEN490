import { Form, Formik } from 'formik'
import { IData, IDatasetMeta, IDatasetModel, IReference } from '../../Models/Datasets/IDatasetModel'
import React, { useEffect, useState } from 'react'

import { Button } from '@material-ui/core'
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
  buttonName: string
}

interface DatasetUploadFormValues {
  meta: IDatasetMeta,
  reference: IReference,
  data: IData
}

export const DatasetUploadForm = (props: IProps): any => {
  const { initialDataset, onSubmit, editable, buttonName } = props

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [materials, setMaterials] = useState([])
  const meta: IDatasetMeta = initialDataset
  const reference: IReference = initialDataset.reference
  const data: IData = initialDataset.data
  const [initialValues, setInitialValues] = useState<DatasetUploadFormValues>({ meta, reference, data })

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
    console.log(initialDataset)
  }, [])

  useEffect(() => {
    setInitialValues(
      {
        meta: {
          category: initialDataset.category,
          data_type: initialDataset.data_type,
          dataset_name: initialDataset.dataset_name,
          material: initialDataset.material,
          subcategory: initialDataset.subcategory,
          id: initialDataset.id
        },
        reference: initialDataset.reference,
        data: initialDataset.data
      }
    )
    console.log(initialValues)
  }, [initialDataset])

  const handleSubmit = (values: DatasetUploadFormValues) => {
    const dataset: IDatasetModel = { ...values.meta, reference: values.reference, data: values.data }
    onSubmit(dataset)
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      //validationSchema={datasetValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <MetaForm materials={materials} editable={editable} categories={categories} subcategories={subcategories} />
        <ReferenceForm editable={editable} />
        <DataForm editable={editable} />
        <Button variant="contained" color="primary" type="submit">{buttonName}</Button>
      </Form>
    </Formik>
  )
}