import { ColDef, DataGrid, ValueGetterParams } from '@material-ui/data-grid'
import { ICategoryModel, listCategories } from '../../../Remote/Endpoints/CategoryEndpoint'
import { IDatasetModel, IReference } from "../../../Models/Datasets/IDatasetModel"
import React, { useEffect, useState } from 'react'
import { callGetDatasets, callGetUserFavouriteDatasets } from '../../../Remote/Endpoints/DatasetEndpoint'

import { DatasetFormModal } from '../../DatasetUpload/DatasetViewModal'
import { Grid } from '@material-ui/core'

export const SavedDatasetsTab = () => {

  const [categories, setCategories] = useState<ICategoryModel[]>([])
  const [datasetIds, setDatasetIds] = useState<number[]>([])
  const [datasets, setDatasets] = useState<IDatasetModel[]>([])
  const width = 160

  const getDatasetInfo = async (ids: number[]) => {
    console.log(datasetIds)
    const datasetArray = await callGetDatasets({ datasetId: ids })
    setDatasets(datasetArray)
  }

  useEffect(() => {

    const getDatasetIds = async () => {
      const ids = await callGetUserFavouriteDatasets()
      setDatasetIds(ids)
    }

    const callListCategories = async () => {
      const getCategories = await listCategories()
      setCategories(getCategories || [])
    }

    getDatasetIds()
    callListCategories()
  }, [])

  useEffect(() => {
    if (datasetIds.length > 0) {
      getDatasetInfo(datasetIds)
    }
  }, [datasetIds])


  const getTitle = (params: ValueGetterParams) => {
    const reference = params.getValue('reference') as IReference
    return `${reference.title}`
  }

  const getAuthor = (params: ValueGetterParams) => {
    const reference = params.getValue('reference') as IReference
    if (!reference.authors[0]) {
      return 'N/A'
    }
    return `${reference.authors[0].firstName} ${reference.authors[0].lastName}`
  }

  const getYear = (params: ValueGetterParams) => {
    const reference = params.getValue('reference') as IReference
    return `${reference.year}`
  }

  const getCategoryId = (params: ValueGetterParams) => {
    const categoryId = params.row.category
    const foundCategory = categories.find(category => category.id == categoryId)
    return `${foundCategory.name}`
  }

  const getSubcategoryId = (params: ValueGetterParams) => {
    const subcategoryId = params.row.subcategory
    const categoryId = params.row.category
    const foundCategory = categories.find(category => category.id == categoryId)
    const foundSubcategory = foundCategory.subcategories.find(subcategory => subcategory.id == subcategoryId)
    return `${foundSubcategory.name}`
  }

  const [open, setOpen] = useState(false)

  const getNameLink = (params: ValueGetterParams) => {
    const datasetId = params.getValue('id')
    const datasetName = params.getValue('dataset_name')

    return (<DatasetFormModal datasetId={datasetId.toString()} datasetName={datasetName.toString()} />)
  }

  const columns: ColDef[] = [
    { field: 'dataset_name', headerName: 'Name', width: width, renderCell: getNameLink },
    { field: `title`, headerName: 'Title', valueGetter: getTitle, width: width * 1.2 },
    { field: 'category', headerName: 'Category', width: width, valueGetter: getCategoryId },
    { field: 'subcategory', headerName: 'SubCategory', width: width, valueGetter: getSubcategoryId },
    { field: 'author', headerName: 'Author', width: width, valueGetter: getAuthor },
    { field: 'year', headerName: 'Year', width: width, valueGetter: getYear },
  ]

  return (
    <>
      <Grid container spacing={3}>
        <Grid item container>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={datasets} rowsPerPageOptions={[5, 10, 20, 30, 50]} columns={columns} pageSize={5} />
          </div>
        </Grid>
      </Grid>
    </>
  )
}