import { Box, Grid, Typography } from "@material-ui/core"
import { Link, Route } from 'react-router-dom'

import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'
import React from 'react'
import { classStyles } from '../../appTheme'


interface IGraphModel {
    graphset: IGraphStateModel,
    id: string
}

export const ProfileGraphRow = (props: IGraphModel) => {
    const { graphset } = { ...props }

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={3}>
                <Box className={classStyles().datasetBorder}>
                    <Link to={'/graph/' + graphset.id} >
                        <Typography>
                            {graphset.name}
                        </Typography>
                    </Link>
                </Box>
            </Grid>
        </Grid >
    )
}
