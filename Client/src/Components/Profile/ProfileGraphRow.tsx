import { Box, Grid, IconButton, Typography } from "@material-ui/core"
import React, { useState } from 'react'

import CancelIcon from '@material-ui/icons/Cancel'
import { ConfirmationModal } from '../Authentication/ConfirmationModal'
import { IGraphStateModel } from '../../Models/Graph/IGraphStateModel'
import { IRowProps } from "../Utils/List"
import { Link } from 'react-router-dom'
import { callDeleteGraphState } from "../../Remote/Endpoints/GraphStateEndpoint"
import { classStyles } from '../../appTheme'

export const ProfileGraphRow = (props: IRowProps<IGraphStateModel>) => {
  const { row: graphDataset } = { ...props }
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const onHandleRemoveGraphState = async () => {
    setConfirmModalOpen(true)
    await callDeleteGraphState(graphDataset)
    window.location.reload()
  }

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={3}>
        <Box className={classStyles().fitBorder}>
          <Link to={'/graph/' + graphDataset.id} >
            <Typography>
              {graphDataset.name}
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
          onSubmit={onHandleRemoveGraphState} />
      </Grid>
    </Grid >
  )
}
