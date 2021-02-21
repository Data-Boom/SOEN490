import { Box, Grid, Typography, IconButton } from "@material-ui/core"
import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { classStyles } from '../../appTheme'
import CancelIcon from '@material-ui/icons/Cancel';
import { ConfirmationModal } from '../Authentication/ConfirmationModal';

interface IGraphModel {
    graphset: IGraphStateModel,
    handleRemoveGraphSet: (graphsetID: string) => void
}

export const ProfileGraphRow = (props: IGraphModel) => {
    const { graphset, handleRemoveGraphSet } = { ...props }
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)

    const onHandleRemoveGraphSet = async (removeGraphSetID: string) => {
        setConfirmModalOpen(true)
        handleRemoveGraphSet(removeGraphSetID)
    }

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
            <Grid>
                <IconButton aria-label="delete" color="secondary" >
                    <CancelIcon onClick={() => setConfirmModalOpen(true)} />
                </IconButton>
                <ConfirmationModal
                    title="Are you sure you want to remove this graph set?"
                    description="By clicking the Remove button the user will no longer be able to view the saved graph set"
                    acceptButton="Remove"
                    cancelButton="Cancel"
                    open={confirmModalOpen}
                    onClose={() => setConfirmModalOpen(false)}
                    onSubmit={() => onHandleRemoveGraphSet(graphset.id)}
                />
            </Grid>
        </Grid >
    )
}
