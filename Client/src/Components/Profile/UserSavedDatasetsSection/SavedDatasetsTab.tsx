import { Box, Container, List, ListItem, ListItemText } from '@material-ui/core'
import { ColDef, ValueGetterParams } from '@material-ui/data-grid'
import { IData, IDatasetModel, IReference } from "../../../Models/Datasets/IDatasetModel"
import React, { useEffect, useState } from 'react'
import { callGetDatasets, callGetUserFavouriteDatasets } from '../../../Remote/Endpoints/DatasetEndpoint'

import { DatasetFormModal } from '../../DatasetUpload/DatasetViewModal'
import { ICategoryModel } from '../../../Models/Profile/ICategoryModel'
import { SearchResults } from '../../Search/SearchResults'
import { listCategories } from '../../../Remote/Endpoints/CategoryEndpoint'

export const SavedDatasetsTab = () => {

  const [categories, setCategories] = useState<ICategoryModel[]>([])
  const [datasetIds, setDatasetIds] = useState<number[]>([])
  const [datasets, setDatasets] = useState<IDatasetModel[]>([])

  const getDatasetInfo = async (ids: number[]) => {
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

  return (
    <Container>
      <Box pt={4}>
        <SearchResults
          datasetResults={datasets}
          categories={categories}
          displayCheckbox={false}
        />
      </Box>
    </Container>
  )
}