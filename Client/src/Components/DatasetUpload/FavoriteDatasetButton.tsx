import { IconButton, Tooltip } from '@material-ui/core'
import React, { useContext, useEffect, useState } from 'react'
import { callGetUserFavouriteDatasets, userDeleteFavouriteDataset, userSaveFavouriteDataset } from '../../Remote/Endpoints/DatasetEndpoint'

import StarBorderIcon from "@material-ui/icons/StarBorder"
import StarIcon from "@material-ui/icons/Star"
import { UserContext } from '../../Context/UserContext'

interface IProps {
  datasetId: number
}

export const FavoriteDatasetButton = (props: IProps) => {
  const { datasetId } = { ...props }
  const { user } = useContext(UserContext)
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

  return (
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