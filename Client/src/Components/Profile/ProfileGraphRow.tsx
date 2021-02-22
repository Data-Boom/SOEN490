import { Box, Grid, Typography, IconButton } from "@material-ui/core"
import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { classStyles } from '../../appTheme'
import CancelIcon from '@material-ui/icons/Cancel'
import { ConfirmationModal } from '../Authentication/ConfirmationModal'
import { callDeleteGraphState } from "../../Remote/Endpoints/GraphStateEndpoint"
//import SnackbarUtils from '../../Components/Utils/SnackbarUtils'


interface IGraphModel {
    graphset: IGraphStateModel,
    handleRemoveGraphState: (graphState: IGraphStateModel) => void,
    userID: number
}

export const ProfileGraphRow = (props: IGraphModel) => {
    const { graphset, userID } = { ...props }
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)

    const onHandleRemoveGraphState = async (removeGraphSetID: IGraphStateModel, userId: number) => {
        setConfirmModalOpen(true)
        await callDeleteGraphState(graphset, userId)
        //SnackbarUtils.success('Saved graph successfully deleted!')
        window.location.reload()
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
                    onSubmit={() => onHandleRemoveGraphState(graphset, userID)} />
            </Grid>
        </Grid >
    )
}
