import React from 'react'
import { Box, Grid, Typography } from "@material-ui/core"

import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'

interface IGraphModel {
    graphset: IGraphStateModel,
}

export const ProfileGraphRow = (props: IGraphModel) => {
    const { graphset } = { ...props }

    return (
        <Grid item>
            <Box>
                <Typography>
                    {graphset.name}
                </Typography>
            </Box>
        </Grid>
    )
}
