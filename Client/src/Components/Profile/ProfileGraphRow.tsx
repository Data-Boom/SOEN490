import { Box, Grid, Typography, IconButton } from "@material-ui/core"
import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'
import { Link } from 'react-router-dom'
import React from 'react'
import { classStyles } from '../../appTheme'
import CancelIcon from '@material-ui/icons/Cancel';
interface IGraphModel {
    graphset: IGraphStateModel,
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
            <IconButton aria-label="delete" disabled color="primary">
                <CancelIcon />
            </IconButton>
        </Grid >
    )
}
