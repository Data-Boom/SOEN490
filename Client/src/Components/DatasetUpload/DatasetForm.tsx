import { Form, Formik } from 'formik'
import { IData, IDatasetMeta, IDatasetModel, IReference } from '../../Models/Datasets/IDatasetModel'
import React, { useEffect, useState } from 'react'

import { DataForm } from './DataSection/DataForm'
import { Grid } from '@material-ui/core'
import { IFormProps } from '../Forms/IFormikForm'
import { IconButton } from 'material-ui'
import { MetaForm } from './MetaSection/MetaForm'
import { ReferenceForm } from './ReferenceSection/ReferenceForm'
import StarBorderIcon from "@material-ui/icons/StarBorder"
import StarIcon from "@material-ui/icons/Star"
import { datasetValidationSchema } from './DatasetValidationSchema'
import { listCategories } from '../../Remote/Endpoints/CategoryEndpoint'
import { listMaterials } from '../../Remote/Endpoints/MaterialEndpoint'
import { listSubcategories } from '../../Remote/Endpoints/SubcategoryEndpoint'

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

  const [categories, setCategories] = useState([])
  const [subcategories, setSubcategories] = useState([])
  const [materials, setMaterials] = useState([])
  const [savedDataset, setSavedDataset] = useState(false)

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

  const handleSaveDataset = () => {
    setSavedDataset(!savedDataset)

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
        <Grid>
          {savedDataset ? <StarIcon color="primary" fontSize="large" onClick={handleSaveDataset} /> :
            <StarBorderIcon color="primary" fontSize="large" onClick={handleSaveDataset} />
          }
        </Grid>
        <MetaForm materials={materials} editable={editable} categories={categories} subcategories={subcategories} />
        <ReferenceForm editable={editable} />
        <DataForm editable={editable} />
      </Form>
    </Formik>
  )
}