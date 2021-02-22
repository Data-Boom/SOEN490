import { Box, Grid, Typography } from "@material-ui/core"

import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'
import { Link } from 'react-router-dom'
import React from 'react'
import { classStyles } from '../../appTheme'

interface IGraphModel {
    graphset: IGraphStateModel,
}

export const ProfileGraphRow = (props: IGraphModel) => {
    const { graphset } = { ...props }

    return (
        <Grid container justify="center" spacing={3}>
            <Grid item xs={3}>
                <Box className={classStyles().fitBorder}>
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
