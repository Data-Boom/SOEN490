import { Button, Grid, Paper, Table, TableContainer } from '@material-ui/core'
import React, { useState } from 'react'

import { ConfirmationModal } from '../../Authentication/ConfirmationModal'
import { IRowProps } from '../../Utils/List'
import { IUserAccountModel } from '../../../Models/Authentication/IUserAccountModel'
import { classStyles } from '../../../appTheme'

export interface IAdminRowProps {
  handleRemoveAdmin: (accountEmail: string) => void
}

export const AdminRow = (props: IAdminRowProps | IRowProps<IUserAccountModel>) => {
  const { row: adminAccount, handleRemoveAdmin } = { ...props }
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
              {adminAccount.email}
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
                onSubmit={() => onHandleRemoveAdmin(adminAccount.email)}
              />
            </Grid>
          </Grid>
        </Table>
      </TableContainer>
    </Grid>
  )
}