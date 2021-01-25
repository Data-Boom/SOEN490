import { Box, Grid } from "@material-ui/core"

import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'
import { ProfileGraphRow } from '../Profile/ProfileGraphRow'
import React from 'react'
import { toGraphDatasetState } from "../../Models/Graph/IGraphDatasetModel"

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
                    id={graphDSet.id}
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




