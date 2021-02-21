import { Grid } from "@material-ui/core"
import React from 'react'

import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'
import { ProfileGraphRow } from '../Profile/ProfileGraphRow'

interface IGraphDatasetListProps {
    graphDataset: IGraphStateModel[],
    userID: number,
    handleRemoveGraphSet: (graphState: IGraphStateModel) => void
}

export const ProfileGraphStateList = (props: IGraphDatasetListProps) => {
    const { graphDataset, handleRemoveGraphSet, userID } = { ...props }

    const renderGraphListRows = () => {
        return graphDataset && graphDataset.map(graphDSet => {
            return (
                < ProfileGraphRow
                    graphset={graphDSet}
                    key={graphDSet.id}
                    handleRemoveGraphSet={handleRemoveGraphSet}
                    userID={userID}

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




