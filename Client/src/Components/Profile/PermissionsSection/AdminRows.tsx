import { Button, Grid, Paper, Table, TableContainer } from '@material-ui/core'
import React, { useState } from 'react'
import { classStyles } from '../../../appTheme'

import { ConfirmationModal } from '../../Authentication/ConfirmationModal'

interface IProps {
  adminEmail: string,
  handleRemoveAdmin: (accountEmail: string) => void
}

export const AdminReviewRow = (props: IProps) => {
  const { adminEmail, handleRemoveAdmin } = { ...props }
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const onHandleRemoveAdmin = async (removeAdmin: string) => {
    setConfirmModalOpen(true)
    handleRemoveAdmin(removeAdmin)
  }

  return (
    <Grid item xs={12} >
      <TableContainer component={Paper} style={{ width: "100%" }} className={classStyles().defaultBorder}>
        <Table aria-label="collapsabile table">
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {adminEmail}
            </Grid>
            <Grid item xs={2}>
              <Button variant="outlined" color="secondary" onClick={() => setConfirmModalOpen(true)}>
                X
              </Button>
              <ConfirmationModal
                title="Are you sure you want to remove this Admin?"
                description="By clicking the Remove button the user will no longer have admin rights"
                acceptButton="Remove"
                cancelButton="Cancel"
                open={confirmModalOpen}
                onClose={() => setConfirmModalOpen(false)}
                onSubmit={() => onHandleRemoveAdmin(adminEmail)}
              />
            </Grid>
          </Grid>
        </Table>
      </TableContainer>
    </Grid>
  )
}