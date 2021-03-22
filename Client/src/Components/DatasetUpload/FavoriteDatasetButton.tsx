import { IconButton, Tooltip } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { callGetUserFavouriteDatasets, userDeleteFavouriteDataset, userSaveFavouriteDataset } from '../../Remote/Endpoints/DatasetEndpoint'

import StarBorderIcon from "@material-ui/icons/StarBorder"
import StarIcon from "@material-ui/icons/Star"
import { useUserSelector } from '../../Stores/Slices/UserSlice'

interface IProps {
  datasetId: number
}

export const FavoriteDatasetButton = (props: IProps) => {
  const user = useUserSelector()
  const { datasetId } = { ...props }
  const [isFavorite, setFavorite] = useState(false)

  useEffect(() => {
    const fetchAndUpdateFavorite = async () => {
      if (user.email) {
        const userFavoriteDatasets = await callGetUserFavouriteDatasets() || []
        setFavorite(userFavoriteDatasets.includes(datasetId))
      }
    }

    fetchAndUpdateFavorite()
  }, [])

  const handlefavoriteDataset = async () => {
    if (isFavorite) {
      setFavorite(false)
      userDeleteFavouriteDataset(datasetId)
    } else {
      setFavorite(true)
      userSaveFavouriteDataset(datasetId)
    }
  }

  return user && user.email && (
    <IconButton size="small" onClick={handlefavoriteDataset} > {
      isFavorite ?
        <Tooltip title="Remove dataset from favorites">
          <StarIcon color="primary" />
        </Tooltip> :
        <Tooltip title="Add dataset to favorites">
          <StarBorderIcon color="primary" />
        </Tooltip>
    }</IconButton>
  )
}