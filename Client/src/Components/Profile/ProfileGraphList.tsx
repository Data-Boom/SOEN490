import { Box, Grid } from "@material-ui/core"

import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'
import { ProfileGraphRow } from '../Profile/ProfileGraphRow'
import React from 'react'

interface IGDProps {
    graphDataset: IGraphStateModel[],
}

export const ProfileGraphStateList = (props: IGDProps) => {
    const { graphDataset } = { ...props }

    const renderGraphListRows = () => {
        return graphDataset && graphDataset.map(graphDSet => {
            return (

                < ProfileGraphRow
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




