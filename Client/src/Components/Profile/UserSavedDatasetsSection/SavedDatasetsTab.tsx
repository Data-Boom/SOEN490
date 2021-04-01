import { Box, Container } from '@material-ui/core'
import { listCategories } from '../../../Remote/Endpoints/CategoryEndpoint'
import React, { useEffect, useState } from 'react'
import { callGetDatasets, callGetUserFavouriteDatasets } from '../../../Remote/Endpoints/DatasetEndpoint'

import { IDatasetModel } from "../../../Models/Datasets/IDatasetModel"
import { SearchResults } from '../../Search/SearchResults'
import { ICategoryModel } from '../../../Models/Profile/ICategoryModel'

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