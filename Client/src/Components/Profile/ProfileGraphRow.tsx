import { Box, Grid, Typography, IconButton } from "@material-ui/core"
import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'
import { Link } from 'react-router-dom'
import React, { useState } from 'react'
import { classStyles } from '../../appTheme'
import CancelIcon from '@material-ui/icons/Cancel';
import { ConfirmationModal } from '../Authentication/ConfirmationModal';
import { callDeleteGraphState } from "../../Remote/Endpoints/GraphStateEndpoint"

interface IGraphModel {
    graphset: IGraphStateModel,
    handleRemoveGraphSet: (graphState: IGraphStateModel) => void,
    userID: number
}

export const ProfileGraphRow = (props: IGraphModel) => {
    const { graphset, userID } = { ...props }
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)

    const onHandleRemoveGraphSet = async (removeGraphSetID: IGraphStateModel, userId: number) => {
        setConfirmModalOpen(true)
        console.log(graphset.id + ' returning graph set ' + userId + ' and user id')
        await callDeleteGraphState(graphset, userId)
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
                    onSubmit={() => onHandleRemoveGraphSet(graphset, userID)}
                />
            </Grid>
        </Grid >
    )
}

/**
 * export const submitEditedDataset = async (updatedDataset: IApprovedDatasetModel) => {
  const result = await put(submitEditedDatasetRoute + '/' + updatedDataset.id).withBody(updatedDataset).json()
  if (result == 'Dataset Updated!') {
    SnackbarUtils.success(Dataset ${updatedDataset.id} was updated!)
  }
  else
    SnackbarUtils.error(Dataset ${updatedDataset.id} could not be updated!)
}
 */