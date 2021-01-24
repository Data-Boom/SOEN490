import React from 'react'
import { ProfileGraphRow } from '../Profile/ProfileGraphRow'
import { Grid, Box } from "@material-ui/core"
import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'

interface IGDProps {
    graphDataset: IGraphStateModel[],
}

export const ProfileGraphStateList = (props: IGDProps) => {
    const { graphDataset } = { ...props }

    const renderGraphListRows = () => {
        return graphDataset && graphDataset.map(graphDSet => {
            return (
                <ProfileGraphRow
                    graphset={graphDSet}
                    key={graphDSet.id}
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




