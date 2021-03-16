import { Form, Formik } from 'formik'
import { ICategoryModel, listCategories } from '../../Remote/Endpoints/CategoryEndpoint'
import { IData, IDatasetMeta, IDatasetModel, IReference } from '../../Models/Datasets/IDatasetModel'
import { IconButton, Tooltip } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { callGetUserFavouriteDatasets, userDeleteFavouriteDataset, userSaveFavouriteDataset } from '../../Remote/Endpoints/DatasetEndpoint'

import { DataForm } from './DataSection/DataForm'
import { IFormProps } from '../Forms/IFormikForm'
import { MetaForm } from './MetaSection/MetaForm'
import { ReferenceForm } from './ReferenceSection/ReferenceForm'
import StarBorderIcon from "@material-ui/icons/StarBorder"
import StarIcon from "@material-ui/icons/Star"
import { UserContext } from '../../App'
import { datasetValidationSchema } from './DatasetValidationSchema'
import { listMaterials } from '../../Remote/Endpoints/MaterialEndpoint'

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
  const { user } = useContext(UserContext)

  const [categories, setCategories] = useState<ICategoryModel[]>([])
  const [materials, setMaterials] = useState([])

  const [favoriteDataset, setFavoriteDataset] = useState(false)

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

  useEffect(() => {
    const setFavourite = async () => {
      const userFavoriteDatasets = await callGetUserFavouriteDatasets() || []
      const isFavorite = userFavoriteDatasets.includes(initialDataset.id)
      setFavoriteDataset(isFavorite)
    }

    if (user.email) {
      setFavourite()
    }
  }, [initialDataset])

  const handleSubmit = (values: DatasetUploadFormValues) => {
    const dataset: IDatasetModel = { ...values.meta, reference: values.reference, data: values.data }
    onSubmit(dataset)
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
    return (
      <IconButton size="small" onClick={handlefavoriteDataset} > {
        favoriteDataset ?
          <Tooltip title="Remove dataset from favorites">
            <StarIcon color="primary" fontSize="large" /></Tooltip> :
          <Tooltip title="Add dataset to favorites">
            <StarBorderIcon color="primary" fontSize="large" /></Tooltip>
      }</IconButton>
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
        {(initialDataset.id && user.email) && constructFavoriteButton()}
        <MetaForm materials={materials} editable={editable} categories={categories} />
        <ReferenceForm editable={editable} />
        <DataForm editable={editable} />
      </Form>

    </Formik>
  )
}