import { Box, Button, Grid, Modal, Paper } from "@material-ui/core"
import React, { useState } from 'react'

import { classStyles } from "../../appTheme"

interface IProps {
  title: string,
  description: string,
  acceptButton: string,
  cancelButton: string,
  open: boolean,
  onClose: () => void,
  onSubmit: () => void
}

export const ConfirmationModal = (props: IProps) => {
  const { title, description, acceptButton, cancelButton, open, onClose, onSubmit } = { ...props }

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        className={classStyles().modalsearch}
      >
        <Paper elevation={3}>
          <Box m={5}>
            <Grid container justify="flex-end">
              <Grid item xs={12}>
                {title}
              </Grid>
              <Grid item xs={12}>
                {description}
              </Grid>
            </Grid>

            <Grid container justify="flex-start">
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Button id="cancelConfirmation" onClick={onClose} variant='contained' color="primary" type="reset">{cancelButton}</Button>
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={3}>
                <Button id="submitConfirmation" onClick={onSubmit} variant='contained' color="primary" type="submit">{acceptButton}</Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Modal>
    </>
  )
}
