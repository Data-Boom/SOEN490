import { Grid } from "@material-ui/core"
import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'
import { ProfileGraphRow } from '../Profile/ProfileGraphRow'
import React from 'react'

interface IGraphDatasetListProps {
  graphDataset: IGraphStateModel[]
}

export const ProfileGraphStateList = (props: IGraphDatasetListProps) => {
  const { graphDataset } = { ...props }

  const renderGraphListRows = () => {
    return graphDataset && graphDataset.map(graphDataset => {
      return (
        <ProfileGraphRow
          graphDataset={graphDataset}
          key={graphDataset.id}
        />
      )
    })
  }
  return (
    <Grid>
      {renderGraphListRows()}
    </Grid>
  )

}




