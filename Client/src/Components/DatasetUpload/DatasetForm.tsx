import { Button, Grid, Tooltip } from '@material-ui/core'
import { Form, Formik } from 'formik'
import { IData, IDatasetMeta, IDatasetModel, IReference } from '../../Models/Datasets/IDatasetModel'
import React, { useEffect, useState } from 'react'
import { callGetUserFavouriteDatasets, userDeleteFavouriteDataset, userSaveFavouriteDataset } from '../../Remote/Endpoints/DatasetEndpoint'

import { DataForm } from './DataSection/DataForm'
import { IFormProps } from '../Forms/IFormikForm'
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
  const [favoriteDataset, setFavoriteDataset] = useState(false)

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

  const getListFavoriteDatasets = async () => {
    const favoriteList: number[] = await callGetUserFavouriteDatasets()
    return favoriteList
  }

  const checkIfFavorite = async () => {
    const favoritesList = await getListFavoriteDatasets()
    if (favoritesList.includes(initialDataset.id)) {
      setFavoriteDataset(true)
      return true
    } else {
      setFavoriteDataset(false)
      return false
    }
  }

  const handlefavoriteDataset = async () => {
    if (!favoriteDataset) {
      setFavoriteDataset(true)
      userSaveFavouriteDataset(initialDataset.id)
    } else {
      setFavoriteDataset(false)
      userDeleteFavouriteDataset(initialDataset.id)
    }
  }

  const constructFavoriteButton = () => {
    return (<Button onClick={handlefavoriteDataset} > {
      checkIfFavorite() && favoriteDataset ?
        <Tooltip title="Remove dataset from favorites">
          <StarIcon color="primary" fontSize="large" /></Tooltip> :
        <Tooltip title="Add dataset to favorites">
          <StarBorderIcon color="primary" fontSize="large" /></Tooltip>
    }</Button>
    )
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
          {initialDataset.id ?
            constructFavoriteButton() : null
          }
        </Grid>
        <MetaForm materials={materials} editable={editable} categories={categories} subcategories={subcategories} />
        <ReferenceForm editable={editable} />
        <DataForm editable={editable} />
      </Form>
    </Formik>
  )
}